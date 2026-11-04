import { renderPage, renderNotFound, renderAdminShell, SOCIAL_ORDER } from './render.js';
import { sanitizeTheme, PRESETS, IMAGE_ID } from '../public/static/theme.js';
import { isVisible } from '../public/static/visibility.js';

/* ---------- Database ---------- */

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS pages (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, bio TEXT NOT NULL DEFAULT '', avatar_image TEXT, theme TEXT NOT NULL, theme_draft TEXT, socials TEXT NOT NULL DEFAULT '{}', seo_description TEXT NOT NULL DEFAULT '', published INTEGER NOT NULL DEFAULT 1, is_home INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, page_id INTEGER NOT NULL, kind TEXT NOT NULL DEFAULT 'link', title TEXT NOT NULL DEFAULT '', subtitle TEXT NOT NULL DEFAULT '', url TEXT NOT NULL DEFAULT '', thumb_image TEXT, icon TEXT NOT NULL DEFAULT 'auto', position INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1, pinned INTEGER NOT NULL DEFAULT 0, sold_out INTEGER NOT NULL DEFAULT 0, starts_at TEXT, ends_at TEXT, event_date TEXT, cta_label TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS items_page ON items (page_id, position)`,
  `CREATE TABLE IF NOT EXISTS stats_daily (day TEXT NOT NULL, page_id INTEGER NOT NULL, item_id INTEGER NOT NULL, hits INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (day, page_id, item_id))`,
  `CREATE TABLE IF NOT EXISTS stats_dim (day TEXT NOT NULL, page_id INTEGER NOT NULL, dim TEXT NOT NULL, key TEXT NOT NULL, hits INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (day, page_id, dim, key))`,
  `CREATE TABLE IF NOT EXISTS visitors (day TEXT NOT NULL, page_id INTEGER NOT NULL, hash TEXT NOT NULL, PRIMARY KEY (day, page_id, hash))`,
  `CREATE TABLE IF NOT EXISTS salts (day TEXT PRIMARY KEY, salt TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS images (id TEXT PRIMARY KEY, mime TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS login_attempts (ip TEXT PRIMARY KEY, fails INTEGER NOT NULL, first_at INTEGER NOT NULL)`,
];

const preset = (id) => PRESETS.find((p) => p.id === id).theme;

const SEED_PAGES = [
  {
    slug: 'f3dez', title: 'F3DEZ GUESTLIST', home: 1, published: 1, theme: preset('f3dez'),
    bio: '🎉 Join the party with exclusive events & discount ticket in Barcelona with F3DEZ GUESTLIST!',
    items: [
      ['SKI TRIP', 'WhatsApp Community • Free to join'],
      ['FREE PARTIES EVERYDAY IN BARCELONA F3DEZ CHANNEL', ''],
      ['YOUR VACATION IN BARCELONA WITH F3DEZ (we plan your stay)', ''],
      ['FREE PARTIES EVERYDAY IN BARCELONA (Whatsapp group)', ''],
      ['Girls Community', 'WhatsApp Community • Free to join'],
      ['BOOK A VIP TABLE & INFO', ''],
    ],
  },
  { slug: 'erasmusbarcelona', title: 'Erasmus Exchange Barcelona', home: 0, published: 0, theme: preset('mare'), bio: '', items: [] },
  { slug: 'studentlife', title: 'Exchange Student Life', home: 0, published: 0, theme: preset('pulito'), bio: '', items: [] },
];

let dbReady = null;

async function initDb(db) {
  await db.batch(SCHEMA.map((sql) => db.prepare(sql)));
  const { n } = await db.prepare('SELECT COUNT(*) AS n FROM pages').first();
  if (n > 0) return;
  const now = new Date().toISOString();
  for (const p of SEED_PAGES) {
    const res = await db.prepare('INSERT INTO pages (slug,title,bio,theme,published,is_home,created_at) VALUES (?,?,?,?,?,?,?)')
      .bind(p.slug, p.title, p.bio, JSON.stringify(p.theme), p.published, p.home, now).run();
    const pageId = res.meta.last_row_id;
    if (p.items.length) {
      await db.batch(p.items.map(([title, subtitle], i) =>
        db.prepare("INSERT INTO items (page_id,kind,title,subtitle,position,created_at) VALUES (?,'link',?,?,?,?)").bind(pageId, title, subtitle, i, now)));
    }
  }
}

function ready(env) {
  if (!dbReady) dbReady = initDb(env.DB).catch((e) => { dbReady = null; throw e; });
  return dbReady;
}

const parsePage = (row) => row && { ...row, theme: JSON.parse(row.theme), theme_draft: row.theme_draft ? JSON.parse(row.theme_draft) : null, socials: JSON.parse(row.socials || '{}') };

const getPageById = async (env, id) => parsePage(await env.DB.prepare('SELECT * FROM pages WHERE id=?').bind(id).first());
const getItems = async (env, pageId) => (await env.DB.prepare('SELECT * FROM items WHERE page_id=? ORDER BY position, id').bind(pageId).all()).results;

// An image is removed only when nothing refers to it any more, because duplicated links share theirs.
async function removeImageIfUnused(env, id) {
  if (!id || !IMAGE_ID.test(id)) return;
  const like = `%${id}%`;
  const used = await env.DB.prepare(
    'SELECT (SELECT COUNT(*) FROM items WHERE thumb_image=?1) + (SELECT COUNT(*) FROM pages WHERE avatar_image=?1 OR theme LIKE ?2 OR theme_draft LIKE ?2) AS n',
  ).bind(id, like).first();
  if (!used.n) await env.DB.prepare('DELETE FROM images WHERE id=?').bind(id).run();
}

/* ---------- Helpers ---------- */

class HttpError extends Error {
  constructor(status, message, code) { super(message); this.status = status; this.code = code; }
}

const SECURITY_HEADERS = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' };

const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...SECURITY_HEADERS, ...headers },
});

const html = (body, status = 200, headers = {}) => new Response(body, {
  status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...SECURITY_HEADERS, ...headers },
});

const text = (v, max) => String(v ?? '').trim().slice(0, max);

const SAFE_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:', 'sms:', 'whatsapp:'];

function normalizeUrl(value) {
  let v = text(value, 2000);
  if (!v) return '';
  if (/^[^\s/@:]+@[^\s/@]+\.[^\s/@]+$/.test(v)) v = `mailto:${v}`;
  else if (!/^[a-z][a-z0-9+.-]*:/i.test(v)) v = `https://${v}`;
  let parsed;
  try { parsed = new URL(v); } catch { throw new HttpError(400, 'Questo indirizzo non è valido. Controlla di averlo copiato per intero.'); }
  if (!SAFE_SCHEMES.includes(parsed.protocol)) throw new HttpError(400, 'Questo tipo di indirizzo non è consentito.');
  return parsed.href;
}

const SOCIAL_BASE = {
  instagram: 'https://instagram.com/', tiktok: 'https://tiktok.com/@', facebook: 'https://facebook.com/', youtube: 'https://youtube.com/@',
  x: 'https://x.com/', telegram: 'https://t.me/', snapchat: 'https://snapchat.com/add/', spotify: null, linkedin: null, whatsapp: null, website: null, email: null,
};

function normalizeSocials(input) {
  const out = {};
  for (const key of SOCIAL_ORDER) {
    const raw = text(input?.[key], 500);
    if (!raw) continue;
    const handle = raw.replace(/^@/, '');
    const isHandle = /^[\w.-]+$/.test(handle) && !/\.[a-z]{2,}$/i.test(handle);
    if (SOCIAL_BASE[key] && isHandle) out[key] = SOCIAL_BASE[key] + handle;
    else if (key === 'whatsapp' && /^\+?[\d\s-]{7,}$/.test(raw)) out[key] = `https://wa.me/${raw.replace(/\D/g, '')}`;
    else if (key === 'email') out[key] = normalizeUrl(raw.includes(':') ? raw : `mailto:${raw}`);
    else out[key] = normalizeUrl(raw);
  }
  return out;
}

function isoOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  const t = Date.parse(value);
  if (Number.isNaN(t)) throw new HttpError(400, 'Una delle date non è valida.');
  return new Date(t).toISOString();
}

const RESERVED_SLUGS = new Set(['admin', 'api', 'go', 'img', 'static', 'favicon.ico', 'robots.txt']);

function validSlug(value) {
  const slug = text(value, 60).toLowerCase();
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new HttpError(400, "L'indirizzo può contenere solo lettere minuscole, numeri e trattini.");
  if (RESERVED_SLUGS.has(slug)) throw new HttpError(400, 'Questo indirizzo è riservato, scegline un altro.');
  return slug;
}

async function slugTaken(env, slug, exceptId = 0) {
  return !!(await env.DB.prepare('SELECT id FROM pages WHERE slug=? AND id<>?').bind(slug, exceptId).first());
}

function b64Bytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const enc = new TextEncoder();

const zoned = (env) => env.TIMEZONE || 'Europe/Madrid';
const dayIn = (timeZone, date = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);

/* ---------- Authentication ---------- */

const SESSION_DAYS = 30;

const hmacKey = (secret) => crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
const sign = async (key, msg) => hex(await crypto.subtle.sign('HMAC', key, enc.encode(msg)));

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const passwordConfigured = (env) => typeof env.ADMIN_PASSWORD === 'string' && env.ADMIN_PASSWORD.length >= 10;

async function createSession(env) {
  const key = await hmacKey(`${env.ADMIN_PASSWORD}:session`);
  const payload = `owner.${Date.now() + SESSION_DAYS * 86400000}`;
  return `${payload}.${await sign(key, payload)}`;
}

function cookieValue(request, name) {
  const match = (request.headers.get('Cookie') || '').match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? match[1] : null;
}

// Returns the signed-in user, or null. "owner" is the single administrator today.
async function getSession(request, env) {
  if (!passwordConfigured(env)) return null;
  const token = cookieValue(request, 'sid');
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3 || Number(parts[1]) < Date.now()) return null;
  const key = await hmacKey(`${env.ADMIN_PASSWORD}:session`);
  const expected = await sign(key, `${parts[0]}.${parts[1]}`);
  return safeEqual(expected, parts[2]) ? { user: parts[0], role: 'super_admin' } : null;
}

// Single place for permission decisions, ready for team roles to be added per brand later.
function can(session, _action, _pageId) {
  return session?.role === 'super_admin';
}

function sessionCookie(request, value, maxAge) {
  const secure = new URL(request.url).protocol === 'https:' ? ' Secure;' : '';
  return `sid=${value}; Path=/; HttpOnly;${secure} SameSite=Lax; Max-Age=${maxAge}`;
}

const MAX_FAILS = 8;
const FAIL_WINDOW_MS = 15 * 60 * 1000;

async function login(request, env) {
  if (!passwordConfigured(env)) {
    throw new HttpError(503, 'Password non ancora impostata. Aggiungi il secret ADMIN_PASSWORD su Cloudflare, con almeno 10 caratteri.', 'no_password');
  }
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  const now = Date.now();
  const row = await env.DB.prepare('SELECT fails, first_at FROM login_attempts WHERE ip=?').bind(ip).first();
  const inWindow = row && now - row.first_at < FAIL_WINDOW_MS;
  if (inWindow && row.fails >= MAX_FAILS) throw new HttpError(429, 'Troppi tentativi. Riprova tra 15 minuti.');

  const body = await request.json().catch(() => ({}));
  const key = await hmacKey(`${env.ADMIN_PASSWORD}:login`);
  const ok = safeEqual(await sign(key, String(body.password ?? '')), await sign(key, env.ADMIN_PASSWORD));
  if (!ok) {
    await env.DB.prepare('INSERT INTO login_attempts (ip,fails,first_at) VALUES (?,1,?) ON CONFLICT(ip) DO UPDATE SET fails=?,first_at=?')
      .bind(ip, now, inWindow ? row.fails + 1 : 1, inWindow ? row.first_at : now).run();
    throw new HttpError(401, 'Password errata.');
  }
  await env.DB.prepare('DELETE FROM login_attempts WHERE ip=?').bind(ip).run();
  return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(request, await createSession(env), SESSION_DAYS * 86400) });
}

/* ---------- Privacy-conscious analytics ---------- */

const BOT_RE = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp\/|telegram|preview|headless|lighthouse|pingdom|monitor|curl|wget|python-requests|node-fetch/i;

const isCountable = (request) => {
  const ua = request.headers.get('User-Agent') || '';
  const purpose = request.headers.get('Sec-Purpose') || request.headers.get('Purpose') || '';
  return ua && !BOT_RE.test(ua) && !/prefetch/i.test(purpose);
};

const KNOWN_SOURCES = [
  [/instagram/, 'instagram'], [/tiktok|musical_ly|bytedance/, 'tiktok'], [/facebook|fban|fbav|fb\.com/, 'facebook'],
  [/whatsapp|wa\.me/, 'whatsapp'], [/t\.me|telegram/, 'telegram'], [/youtube|youtu\.be/, 'youtube'],
  [/google\./, 'google'], [/bing\./, 'bing'], [/twitter|t\.co|x\.com/, 'x'],
];

function trafficSource(request) {
  const url = new URL(request.url);
  const utm = (url.searchParams.get('utm_source') || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 30);
  if (utm) return utm;
  let host = '';
  try { host = new URL(request.headers.get('Referer') || '').hostname.replace(/^www\./, ''); } catch { /* no referrer */ }
  if (host === url.hostname) host = '';
  const ua = (request.headers.get('User-Agent') || '').toLowerCase();
  for (const [re, name] of KNOWN_SOURCES) if ((host && re.test(host)) || (!host && re.test(ua))) return name;
  return host ? host.slice(0, 40) : 'diretto';
}

const deviceType = (request) => (/Mobi|Android|iPhone|iPad|iPod/i.test(request.headers.get('User-Agent') || '') ? 'mobile' : 'desktop');

const incDaily = (env, day, pageId, itemId) => env.DB.prepare(
  'INSERT INTO stats_daily (day,page_id,item_id,hits) VALUES (?,?,?,1) ON CONFLICT(day,page_id,item_id) DO UPDATE SET hits=hits+1',
).bind(day, pageId, itemId);

const incDim = (env, day, pageId, dim, key) => env.DB.prepare(
  'INSERT INTO stats_dim (day,page_id,dim,key,hits) VALUES (?,?,?,?,1) ON CONFLICT(day,page_id,dim,key) DO UPDATE SET hits=hits+1',
).bind(day, pageId, dim, key);

// The salt is random and lives for one day, so a visitor cannot be recognised across days and
// the IP address is never stored. Yesterday's hashes and salt are deleted when a new day starts.
async function dailySalt(env, day) {
  const row = await env.DB.prepare('SELECT salt FROM salts WHERE day=?').bind(day).first();
  if (row) return row.salt;
  const salt = hex(crypto.getRandomValues(new Uint8Array(32)));
  await env.DB.batch([
    env.DB.prepare('INSERT OR IGNORE INTO salts (day,salt) VALUES (?,?)').bind(day, salt),
    env.DB.prepare('DELETE FROM salts WHERE day<>?').bind(day),
    env.DB.prepare('DELETE FROM visitors WHERE day<>?').bind(day),
  ]);
  return (await env.DB.prepare('SELECT salt FROM salts WHERE day=?').bind(day).first()).salt;
}

async function recordView(request, env, pageId) {
  const day = dayIn(zoned(env));
  await env.DB.batch([
    incDaily(env, day, pageId, 0),
    incDim(env, day, pageId, 'source', trafficSource(request)),
    incDim(env, day, pageId, 'device', deviceType(request)),
  ]);
  const salt = await dailySalt(env, day);
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  const ua = request.headers.get('User-Agent') || '';
  const hash = hex(await crypto.subtle.digest('SHA-256', enc.encode(`${salt}|${pageId}|${ip}|${ua}`)));
  const res = await env.DB.prepare('INSERT OR IGNORE INTO visitors (day,page_id,hash) VALUES (?,?,?)').bind(day, pageId, hash).run();
  if (res.meta.changes > 0) await incDim(env, day, pageId, 'uniques', '').run();
}

async function statsReport(env, url) {
  const today = dayIn(zoned(env));
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  const to = dateRe.test(url.searchParams.get('to') || '') ? url.searchParams.get('to') : today;
  const from = dateRe.test(url.searchParams.get('from') || '') ? url.searchParams.get('from') : to;
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) throw new HttpError(400, 'Intervallo di date non valido.');
  const count = Math.round((end - start) / 86400000) + 1;
  if (count > 800) throw new HttpError(400, "L'intervallo può coprire al massimo 800 giorni.");

  const pageParam = url.searchParams.get('page') || 'all';
  const all = pageParam === 'all';
  const pageId = Number(pageParam);
  if (!all && !Number.isInteger(pageId)) throw new HttpError(400, 'Brand non valido.');
  const filter = all ? '' : ' AND s.page_id=?3';
  const q = (sql) => { const st = env.DB.prepare(sql); return all ? st.bind(from, to) : st.bind(from, to, pageId); };

  const [daily, uniques, items, dims] = await env.DB.batch([
    q(`SELECT s.day, SUM(CASE WHEN s.item_id=0 THEN s.hits ELSE 0 END) AS views, SUM(CASE WHEN s.item_id<>0 THEN s.hits ELSE 0 END) AS clicks FROM stats_daily s WHERE s.day BETWEEN ?1 AND ?2${filter} GROUP BY s.day`),
    q(`SELECT s.day, SUM(s.hits) AS uniques FROM stats_dim s WHERE s.dim='uniques' AND s.day BETWEEN ?1 AND ?2${filter} GROUP BY s.day`),
    q(`SELECT s.item_id AS id, MAX(i.title) AS title, MAX(p.title) AS page, SUM(s.hits) AS clicks FROM stats_daily s LEFT JOIN items i ON i.id=s.item_id LEFT JOIN pages p ON p.id=s.page_id WHERE s.item_id<>0 AND s.day BETWEEN ?1 AND ?2${filter} GROUP BY s.item_id ORDER BY clicks DESC`),
    q(`SELECT s.dim, s.key, SUM(s.hits) AS hits FROM stats_dim s WHERE s.dim IN ('source','device') AND s.day BETWEEN ?1 AND ?2${filter} GROUP BY s.dim, s.key ORDER BY hits DESC`),
  ]);

  const byDay = new Map(daily.results.map((r) => [r.day, r]));
  const uniquesByDay = new Map(uniques.results.map((r) => [r.day, r.uniques]));
  const days = [];
  for (let i = 0; i < count; i++) {
    const day = new Date(start + i * 86400000).toISOString().slice(0, 10);
    const r = byDay.get(day);
    days.push({ day, views: r?.views || 0, clicks: r?.clicks || 0, uniques: uniquesByDay.get(day) || 0 });
  }
  const sum = (k) => days.reduce((a, d) => a + d[k], 0);
  return {
    from, to, days,
    totals: { views: sum('views'), clicks: sum('clicks'), uniques: sum('uniques') },
    items: items.results.map((r) => ({ id: r.id, title: r.title || 'Link eliminato', page: r.page || '', clicks: r.clicks })),
    sources: dims.results.filter((r) => r.dim === 'source').map(({ key, hits }) => ({ key, hits })),
    devices: dims.results.filter((r) => r.dim === 'device').map(({ key, hits }) => ({ key, hits })),
  };
}

/* ---------- Dashboard API ---------- */

const ITEM_KINDS = ['link', 'section', 'event'];

function itemPatch(body) {
  const f = {};
  if ('title' in body) f.title = text(body.title, 200);
  if ('subtitle' in body) f.subtitle = text(body.subtitle, 300);
  if ('url' in body) f.url = normalizeUrl(body.url);
  if ('thumb_image' in body) f.thumb_image = IMAGE_ID.test(body.thumb_image ?? '') ? body.thumb_image : null;
  if ('icon' in body) f.icon = text(body.icon, 20) || 'auto';
  if ('cta_label' in body) f.cta_label = text(body.cta_label, 40);
  for (const k of ['active', 'pinned', 'sold_out']) if (k in body) f[k] = body[k] ? 1 : 0;
  for (const k of ['starts_at', 'ends_at', 'event_date']) if (k in body) f[k] = isoOrNull(body[k]);
  return f;
}

async function updateRow(env, table, id, fields) {
  const keys = Object.keys(fields);
  if (!keys.length) return;
  await env.DB.prepare(`UPDATE ${table} SET ${keys.map((k) => `${k}=?`).join(',')} WHERE id=?`).bind(...keys.map((k) => fields[k]), id).run();
}

const publicPage = (p, items) => ({
  id: p.id, slug: p.slug, title: p.title, bio: p.bio, avatar_image: p.avatar_image, socials: p.socials,
  seo_description: p.seo_description, published: p.published, is_home: p.is_home,
  theme: sanitizeTheme(p.theme_draft || p.theme), has_draft: !!p.theme_draft, ...(items ? { items } : {}),
});

async function requirePage(env, id) {
  const page = await getPageById(env, Number(id));
  if (!page) throw new HttpError(404, 'Pagina non trovata.');
  return page;
}

async function requireItem(env, id) {
  const item = await env.DB.prepare('SELECT * FROM items WHERE id=?').bind(Number(id)).first();
  if (!item) throw new HttpError(404, 'Elemento non trovato.');
  return item;
}

const themeImage = (theme) => theme?.bgImage || null;

async function handleApi(request, env, url) {
  const path = url.pathname.slice(4); // strip "/api"
  const method = request.method;

  if (method !== 'GET') {
    const origin = request.headers.get('Origin');
    if (origin && origin !== url.origin) throw new HttpError(403, 'Richiesta non consentita.');
    if (!(request.headers.get('Content-Type') || '').includes('application/json')) throw new HttpError(415, 'Formato della richiesta non valido.');
  }

  if (path === '/login' && method === 'POST') return login(request, env);
  if (path === '/logout' && method === 'POST') return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(request, '', 0) });

  const session = await getSession(request, env);
  if (path === '/me') return json({ authenticated: !!session, passwordConfigured: passwordConfigured(env) });
  if (!session) throw new HttpError(401, 'Accedi di nuovo per continuare.');
  if (!can(session, 'manage')) throw new HttpError(403, 'Non hai i permessi per questa azione.');

  const body = method === 'GET' || method === 'DELETE' ? {} : await request.json().catch(() => { throw new HttpError(400, 'Dati non validi.'); });
  let m;

  if (path === '/pages' && method === 'GET') {
    const { results } = await env.DB.prepare('SELECT * FROM pages ORDER BY is_home DESC, id').all();
    return json({ pages: results.map((r) => publicPage(parsePage(r))) });
  }

  if (path === '/pages' && method === 'POST') {
    const title = text(body.title, 120);
    if (!title) throw new HttpError(400, 'Scrivi il nome del brand.');
    const slug = validSlug(body.slug);
    if (await slugTaken(env, slug)) throw new HttpError(409, 'Questo indirizzo è già usato da un altro brand.');
    const res = await env.DB.prepare('INSERT INTO pages (slug,title,theme,published,created_at) VALUES (?,?,?,0,?)')
      .bind(slug, title, JSON.stringify(preset('pulito')), new Date().toISOString()).run();
    return json(publicPage(await getPageById(env, res.meta.last_row_id), []), 201);
  }

  if ((m = path.match(/^\/pages\/(\d+)$/))) {
    const page = await requirePage(env, m[1]);
    if (method === 'GET') return json(publicPage(page, await getItems(env, page.id)));

    if (method === 'PUT') {
      const f = {};
      if ('title' in body) { f.title = text(body.title, 120); if (!f.title) throw new HttpError(400, 'Il nome non può essere vuoto.'); }
      if ('bio' in body) f.bio = text(body.bio, 500);
      if ('seo_description' in body) f.seo_description = text(body.seo_description, 300);
      if ('published' in body) f.published = body.published ? 1 : 0;
      if ('avatar_image' in body) f.avatar_image = IMAGE_ID.test(body.avatar_image ?? '') ? body.avatar_image : null;
      if ('socials' in body) f.socials = JSON.stringify(normalizeSocials(body.socials));
      if ('slug' in body) {
        f.slug = validSlug(body.slug);
        if (await slugTaken(env, f.slug, page.id)) throw new HttpError(409, 'Questo indirizzo è già usato da un altro brand.');
      }
      if ('theme' in body) f.theme_draft = JSON.stringify(sanitizeTheme(body.theme)); // design changes wait for "Publish"
      await updateRow(env, 'pages', page.id, f);
      if ('avatar_image' in f && page.avatar_image !== f.avatar_image) await removeImageIfUnused(env, page.avatar_image);
      if ('theme_draft' in f) {
        const previous = themeImage(page.theme_draft);
        if (previous !== JSON.parse(f.theme_draft).bgImage) await removeImageIfUnused(env, previous);
      }
      return json(publicPage(await getPageById(env, page.id)));
    }

    if (method === 'DELETE') {
      if (page.is_home) throw new HttpError(400, 'Questa è la pagina principale. Scegli prima un altro brand come principale.');
      const items = await getItems(env, page.id);
      await env.DB.batch([
        env.DB.prepare('DELETE FROM items WHERE page_id=?').bind(page.id),
        env.DB.prepare('DELETE FROM stats_daily WHERE page_id=?').bind(page.id),
        env.DB.prepare('DELETE FROM stats_dim WHERE page_id=?').bind(page.id),
        env.DB.prepare('DELETE FROM visitors WHERE page_id=?').bind(page.id),
        env.DB.prepare('DELETE FROM pages WHERE id=?').bind(page.id),
      ]);
      const images = new Set([page.avatar_image, themeImage(page.theme), themeImage(page.theme_draft), ...items.map((i) => i.thumb_image)]);
      for (const id of images) await removeImageIfUnused(env, id);
      return json({ ok: true });
    }
  }

  if ((m = path.match(/^\/pages\/(\d+)\/publish$/)) && method === 'POST') {
    const page = await requirePage(env, m[1]);
    if (page.theme_draft) {
      await env.DB.prepare('UPDATE pages SET theme=theme_draft, theme_draft=NULL WHERE id=?').bind(page.id).run();
      await removeImageIfUnused(env, themeImage(page.theme));
    }
    return json(publicPage(await getPageById(env, page.id)));
  }

  if ((m = path.match(/^\/pages\/(\d+)\/discard$/)) && method === 'POST') {
    const page = await requirePage(env, m[1]);
    await env.DB.prepare('UPDATE pages SET theme_draft=NULL WHERE id=?').bind(page.id).run();
    await removeImageIfUnused(env, themeImage(page.theme_draft));
    return json(publicPage(await getPageById(env, page.id)));
  }

  if ((m = path.match(/^\/pages\/(\d+)\/home$/)) && method === 'POST') {
    const page = await requirePage(env, m[1]);
    await env.DB.batch([
      env.DB.prepare('UPDATE pages SET is_home=0'),
      env.DB.prepare('UPDATE pages SET is_home=1, published=1 WHERE id=?').bind(page.id),
    ]);
    return json(publicPage(await getPageById(env, page.id)));
  }

  if ((m = path.match(/^\/pages\/(\d+)\/items$/)) && method === 'POST') {
    const page = await requirePage(env, m[1]);
    const kind = ITEM_KINDS.includes(body.kind) ? body.kind : 'link';
    const f = itemPatch(body);
    const top = await env.DB.prepare('SELECT MIN(position) AS p FROM items WHERE page_id=?').bind(page.id).first();
    const res = await env.DB.prepare('INSERT INTO items (page_id,kind,position,created_at) VALUES (?,?,?,?)')
      .bind(page.id, kind, (top.p ?? 1) - 1, new Date().toISOString()).run();
    await updateRow(env, 'items', res.meta.last_row_id, f);
    return json(await requireItem(env, res.meta.last_row_id), 201);
  }

  if ((m = path.match(/^\/pages\/(\d+)\/order$/)) && method === 'PUT') {
    const page = await requirePage(env, m[1]);
    const ids = Array.isArray(body.ids) ? body.ids.map(Number) : [];
    const current = new Set((await getItems(env, page.id)).map((i) => i.id));
    if (ids.length !== current.size || !ids.every((id) => current.has(id))) throw new HttpError(409, "L'elenco è cambiato. Ricarica la pagina e riprova.");
    if (ids.length) await env.DB.batch(ids.map((id, i) => env.DB.prepare('UPDATE items SET position=? WHERE id=?').bind(i, id)));
    return json({ ok: true });
  }

  if ((m = path.match(/^\/items\/(\d+)$/))) {
    const item = await requireItem(env, m[1]);
    if (method === 'PUT') {
      const f = itemPatch(body);
      const start = 'starts_at' in f ? f.starts_at : item.starts_at;
      const end = 'ends_at' in f ? f.ends_at : item.ends_at;
      if (start && end && Date.parse(end) <= Date.parse(start)) throw new HttpError(400, 'La data di fine deve essere successiva a quella di inizio.');
      await updateRow(env, 'items', item.id, f);
      if ('thumb_image' in f && f.thumb_image !== item.thumb_image) await removeImageIfUnused(env, item.thumb_image);
      return json(await requireItem(env, item.id));
    }
    if (method === 'DELETE') {
      await env.DB.prepare('DELETE FROM items WHERE id=?').bind(item.id).run();
      await removeImageIfUnused(env, item.thumb_image);
      return json({ ok: true });
    }
  }

  if ((m = path.match(/^\/items\/(\d+)\/duplicate$/)) && method === 'POST') {
    const item = await requireItem(env, m[1]);
    await env.DB.prepare('UPDATE items SET position=position+1 WHERE page_id=? AND position>?').bind(item.page_id, item.position).run();
    const res = await env.DB.prepare(
      `INSERT INTO items (page_id,kind,title,subtitle,url,thumb_image,icon,position,active,pinned,sold_out,starts_at,ends_at,event_date,cta_label,created_at)
       VALUES (?,?,?,?,?,?,?,?,?,0,?,?,?,?,?,?)`,
    ).bind(item.page_id, item.kind, `${item.title} (copia)`.slice(0, 200), item.subtitle, item.url, item.thumb_image, item.icon, item.position + 1, item.active,
      item.sold_out, item.starts_at, item.ends_at, item.event_date, item.cta_label, new Date().toISOString()).run();
    return json(await requireItem(env, res.meta.last_row_id), 201);
  }

  if (path === '/images' && method === 'POST') {
    const mime = String(body.mime || '');
    const data = String(body.data || '');
    if (!['image/webp', 'image/jpeg', 'image/png'].includes(mime)) throw new HttpError(400, 'Formato non supportato. Usa JPG, PNG o WebP.');
    if (!data || !/^[A-Za-z0-9+/]+=*$/.test(data)) throw new HttpError(400, "L'immagine non è valida.");
    if (data.length > 1_500_000) throw new HttpError(413, "L'immagine è troppo grande anche dopo la compressione. Provane una più leggera.");
    const id = crypto.randomUUID();
    await env.DB.prepare('INSERT INTO images (id,mime,data,created_at) VALUES (?,?,?,?)').bind(id, mime, data, new Date().toISOString()).run();
    return json({ id }, 201);
  }

  if (path === '/stats' && method === 'GET') return json(await statsReport(env, url));

  throw new HttpError(404, 'Risorsa non trovata.');
}

/* ---------- Public routes ---------- */

async function servePublicPage(request, env, ctx, page) {
  const session = await getSession(request, env);
  if (!session && request.method === 'GET' && isCountable(request)) {
    ctx.waitUntil(recordView(request, env, page.id).catch((e) => console.error('stats', e)));
  }
  const body = renderPage(page, await getItems(env, page.id), { timeZone: zoned(env), origin: new URL(request.url).origin });
  return html(request.method === 'HEAD' ? null : body);
}

async function route(request, env, ctx) {
  const url = new URL(request.url);
  const { pathname } = url;
  const isRead = request.method === 'GET' || request.method === 'HEAD';

  if (pathname.startsWith('/api/')) return handleApi(request, env, url);
  if (!isRead) return new Response('Method not allowed', { status: 405 });

  if (pathname === '/admin' || pathname === '/admin/') {
    return html(renderAdminShell(), 200, { 'X-Frame-Options': 'DENY', 'Content-Security-Policy': "frame-ancestors 'none'" });
  }

  let m;
  if ((m = pathname.match(/^\/admin\/preview\/(\d+)$/))) {
    if (!(await getSession(request, env))) return html(renderNotFound(), 401);
    const page = await getPageById(env, Number(m[1]));
    if (!page) return html(renderNotFound(), 404);
    return html(renderPage(page, await getItems(env, page.id), { preview: true, timeZone: zoned(env) }), 200, { 'X-Frame-Options': 'SAMEORIGIN' });
  }

  if ((m = pathname.match(/^\/img\/([a-f0-9-]{36})$/))) {
    const img = await env.DB.prepare('SELECT mime, data FROM images WHERE id=?').bind(m[1]).first();
    if (!img) return new Response('Not found', { status: 404 });
    return new Response(b64Bytes(img.data), { headers: { 'Content-Type': img.mime, 'Cache-Control': 'public, max-age=31536000, immutable', ...SECURITY_HEADERS } });
  }

  if ((m = pathname.match(/^\/go\/(\d+)$/))) {
    const item = await env.DB.prepare('SELECT i.*, p.slug, p.published, p.is_home FROM items i JOIN pages p ON p.id=i.page_id WHERE i.id=?').bind(Number(m[1])).first();
    if (!item) return Response.redirect(`${url.origin}/`, 302);
    if (!item.url || item.sold_out || !isVisible(item) || !item.published) {
      return Response.redirect(`${url.origin}/${item.is_home ? '' : item.slug}`, 302);
    }
    if (isCountable(request) && !(await getSession(request, env))) {
      ctx.waitUntil(incDaily(env, dayIn(zoned(env)), item.page_id, item.id).run().catch((e) => console.error('stats', e)));
    }
    return new Response(null, { status: 302, headers: { Location: item.url, 'Cache-Control': 'no-store', 'Referrer-Policy': 'origin' } });
  }

  if (pathname === '/robots.txt') return new Response('User-agent: *\nDisallow: /admin\nDisallow: /api/\nDisallow: /go/\n', { headers: { 'Content-Type': 'text/plain' } });

  if (pathname === '/' || pathname === '') {
    const page = parsePage(await env.DB.prepare('SELECT * FROM pages WHERE is_home=1 AND published=1 LIMIT 1').first());
    return page ? servePublicPage(request, env, ctx, page) : html(renderNotFound(), 404);
  }

  if ((m = pathname.match(/^\/([a-zA-Z0-9-]+)\/?$/))) {
    const page = parsePage(await env.DB.prepare('SELECT * FROM pages WHERE slug=? AND published=1').bind(m[1].toLowerCase()).first());
    if (page) return servePublicPage(request, env, ctx, page);
  }
  return html(renderNotFound(), 404);
}

export default {
  async fetch(request, env, ctx) {
    try {
      await ready(env);
      return await route(request, env, ctx);
    } catch (err) {
      if (err instanceof HttpError) return json({ error: err.message, code: err.code }, err.status);
      console.error(err);
      if (new URL(request.url).pathname.startsWith('/api/')) return json({ error: 'Si è verificato un problema. Riprova tra poco.' }, 500);
      return html(renderNotFound(), 500);
    }
  },
};
