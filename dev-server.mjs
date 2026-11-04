// Local stand-in for Cloudflare: runs the real Worker code on Node with SQLite behind the D1 API.
// Usage: ADMIN_PASSWORD=... node test/dev-server.mjs [port] [dbfile]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import worker from '../src/index.js';

class Stmt {
  constructor(db, sql, args = []) { this.db = db; this.sql = sql; this.args = args; }
  bind(...args) { return new Stmt(this.db, this.sql, args); }
  async all() { return { results: this.db.prepare(this.sql).all(...this.args).map((r) => ({ ...r })), success: true, meta: {} }; }
  async first() { const r = this.db.prepare(this.sql).get(...this.args); return r ? { ...r } : null; }
  async run() {
    const r = this.db.prepare(this.sql).run(...this.args);
    return { success: true, meta: { last_row_id: Number(r.lastInsertRowid), changes: Number(r.changes) } };
  }
}

export function makeD1(file = ':memory:') {
  const db = new DatabaseSync(file);
  return {
    prepare: (sql) => new Stmt(db, sql),
    batch: async (stmts) => {
      db.exec('BEGIN');
      try {
        const out = [];
        for (const s of stmts) out.push(/^\s*(select)/i.test(s.sql) ? await s.all() : await s.run());
        db.exec('COMMIT');
        return out;
      } catch (e) { db.exec('ROLLBACK'); throw e; }
    },
  };
}

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };

export function startServer({ port = 8787, dbFile = ':memory:', env: extraEnv = {} } = {}) {
  const env = { DB: makeD1(dbFile), ADMIN_PASSWORD: process.env.ADMIN_PASSWORD, TIMEZONE: 'Europe/Madrid', ...extraEnv };
  const waits = [];
  const server = createServer(async (req, res) => {
    const url = `http://${req.headers.host}${req.url}`;
    if (req.url.startsWith('/static/')) {
      try {
        const clean = path.normalize(req.url.split('?')[0]).replace(/^(\.\.[/\\])+/, '');
        const data = await readFile(new URL(`../public${clean}`, import.meta.url));
        res.writeHead(200, { 'Content-Type': MIME[path.extname(clean)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
        return res.end(data);
      } catch { res.writeHead(404); return res.end(); }
    }
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const body = chunks.length && !['GET', 'HEAD'].includes(req.method) ? Buffer.concat(chunks) : undefined;
    const request = new Request(url, { method: req.method, headers: req.headers, body });
    const response = await worker.fetch(request, env, { waitUntil: (p) => waits.push(p) });
    const headers = Object.fromEntries(response.headers);
    res.writeHead(response.status, headers);
    res.end(Buffer.from(await response.arrayBuffer()));
  });
  return new Promise((resolve) => server.listen(port, () => resolve({ server, env, settle: () => Promise.all(waits.splice(0)) })));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.argv[2] || 8787);
  await startServer({ port, dbFile: process.argv[3] || ':memory:' });
  console.log(`http://localhost:${port}/admin`);
}
