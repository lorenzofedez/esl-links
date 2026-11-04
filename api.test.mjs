// Run with: node --test test/api.test.mjs
import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer } from './dev-server.mjs';

const PASSWORD = 'password-di-prova-123';
const BASE = 'http://localhost:8799';
const MOBILE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Instagram 300.0';
const DESKTOP = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0 Safari/537.36';
let srv; let cookie = '';

const api = (p, method = 'GET', body) => fetch(`${BASE}/api${p}`, {
  method, redirect: 'manual',
  headers: { 'Content-Type': 'application/json', Cookie: cookie },
  body: body === undefined ? undefined : JSON.stringify(body),
});
const visit = (p, ua = DESKTOP, headers = {}) => fetch(`${BASE}${p}`, { redirect: 'manual', headers: { 'User-Agent': ua, ...headers } });
const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date());

before(async () => { srv = await startServer({ port: 8799, env: { ADMIN_PASSWORD: PASSWORD } }); });
after(() => srv.server.close());

test('dashboard data stays private until login', async () => {
  assert.equal((await api('/pages')).status, 401);
  assert.equal((await visit('/admin/preview/1')).status, 401);
  assert.equal((await api('/login', 'POST', { password: 'sbagliata' })).status, 401);
  const ok = await api('/login', 'POST', { password: PASSWORD });
  assert.equal(ok.status, 200);
  cookie = ok.headers.get('set-cookie').split(';')[0];
  assert.match(ok.headers.get('set-cookie'), /HttpOnly/);
  assert.equal((await api('/pages')).status, 200);
});

test('forged session and cross-site writes are refused', async () => {
  const forged = await fetch(`${BASE}/api/pages`, { headers: { Cookie: `sid=owner.${Date.now() + 1e9}.${'a'.repeat(64)}` } });
  assert.equal(forged.status, 401);
  const cross = await fetch(`${BASE}/api/pages`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://evil.example', Cookie: cookie }, body: '{"title":"x","slug":"xx"}' });
  assert.equal(cross.status, 403);
});

test('three brands are seeded and only published ones are public', async () => {
  const { pages } = await (await api('/pages')).json();
  assert.deepEqual(pages.map((p) => p.slug).sort(), ['erasmusbarcelona', 'f3dez', 'studentlife']);
  assert.equal((await visit('/f3dez')).status, 200);
  assert.equal((await visit('/studentlife')).status, 404);
  assert.match(await (await visit('/')).text(), /F3DEZ GUESTLIST/);
});

test('links: add, escape output, block dangerous URLs, disable, duplicate, delete, reorder', async () => {
  const add = await (await api('/pages/1/items', 'POST', { kind: 'link', title: '<script>alert(1)</script>', url: 'example.com/biglietti' })).json();
  assert.equal(add.url, 'https://example.com/biglietti');
  let html = await (await visit('/f3dez')).text();
  assert.ok(!html.includes('<script>alert(1)'));
  assert.ok(html.includes('&lt;script&gt;alert(1)'));
  assert.ok(html.includes(`/go/${add.id}`));

  assert.equal((await api(`/items/${add.id}`, 'PUT', { url: 'javascript:alert(1)' })).status, 400);

  await api(`/items/${add.id}`, 'PUT', { active: false });
  assert.ok(!(await (await visit('/f3dez')).text()).includes(`/go/${add.id}`));
  await api(`/items/${add.id}`, 'PUT', { active: true });

  const dup = await (await api(`/items/${add.id}/duplicate`, 'POST', {})).json();
  assert.match(dup.title, /\(copia\)$/);

  const { items } = await (await api('/pages/1')).json();
  const reversed = items.map((i) => i.id).reverse();
  assert.equal((await api('/pages/1/order', 'PUT', { ids: reversed })).status, 200);
  const after2 = await (await api('/pages/1')).json();
  assert.deepEqual(after2.items.map((i) => i.id), reversed);
  assert.equal((await api('/pages/1/order', 'PUT', { ids: [1] })).status, 409);

  assert.equal((await api(`/items/${dup.id}`, 'DELETE')).status, 200);
  await api(`/items/${add.id}`, 'DELETE');
});

test('links without a URL stay hidden; scheduling and expiry work', async () => {
  const noUrl = await (await api('/pages/1/items', 'POST', { title: 'SenzaUrlVisibile' })).json();
  assert.ok(!(await (await visit('/f3dez')).text()).includes('SenzaUrlVisibile'));
  await api(`/items/${noUrl.id}`, 'DELETE');

  const hour = 3600000;
  const iso = (d) => new Date(Date.now() + d).toISOString();
  const future = await (await api('/pages/1/items', 'POST', { title: 'FuturoLink', url: 'https://a.example', starts_at: iso(hour) })).json();
  const past = await (await api('/pages/1/items', 'POST', { title: 'ScadutoLink', url: 'https://a.example', ends_at: iso(-hour) })).json();
  const now = await (await api('/pages/1/items', 'POST', { title: 'AttivoOraLink', url: 'https://a.example', starts_at: iso(-hour), ends_at: iso(hour) })).json();
  const html = await (await visit('/f3dez')).text();
  assert.ok(!html.includes('FuturoLink'));
  assert.ok(!html.includes('ScadutoLink'));
  assert.ok(html.includes('AttivoOraLink'));
  assert.notEqual((await visit(`/go/${future.id}`)).headers.get('location'), 'https://a.example/');
  for (const i of [future, past, now]) await api(`/items/${i.id}`, 'DELETE');
});

test('sections hide when empty; pinned goes first', async () => {
  const sec = await (await api('/pages/1/items', 'POST', { kind: 'section', title: 'SezioneVuota' })).json();
  assert.ok(!(await (await visit('/f3dez')).text()).includes('SezioneVuota'));
  const inside = await (await api('/pages/1/items', 'POST', { title: 'DentroSezione', url: 'https://a.example' })).json();
  const ids = (await (await api('/pages/1')).json()).items.map((i) => i.id).filter((i) => i !== sec.id && i !== inside.id);
  await api('/pages/1/order', 'PUT', { ids: [sec.id, inside.id, ...ids] });
  assert.ok((await (await visit('/f3dez')).text()).includes('SezioneVuota'));
  const pin = await (await api('/pages/1/items', 'POST', { title: 'FissatoLink', url: 'https://a.example', pinned: true })).json();
  const all = (await (await api('/pages/1')).json()).items.map((i) => i.id).filter((i) => i !== pin.id);
  await api('/pages/1/order', 'PUT', { ids: [...all, pin.id] });
  const html = await (await visit('/f3dez')).text();
  assert.ok(html.indexOf('FissatoLink') < html.indexOf('SezioneVuota'));
  for (const i of [sec, inside, pin]) await api(`/items/${i.id}`, 'DELETE');
});

test('events: date, CTA, sold out and automatic hiding', async () => {
  const iso = (d) => new Date(Date.now() + d).toISOString();
  const ev = await (await api('/pages/1/items', 'POST', { kind: 'event', title: 'FestaOpium', url: 'https://tickets.example/x', event_date: iso(86400000), cta_label: 'Join WhatsApp' })).json();
  let html = await (await visit('/f3dez')).text();
  assert.ok(html.includes('FestaOpium') && html.includes('Join WhatsApp') && html.includes(`/go/${ev.id}`));

  await api(`/items/${ev.id}`, 'PUT', { sold_out: true });
  html = await (await visit('/f3dez')).text();
  assert.ok(html.includes('Sold out') && !html.includes(`/go/${ev.id}`));
  assert.notEqual((await visit(`/go/${ev.id}`)).headers.get('location'), 'https://tickets.example/x');

  await api(`/items/${ev.id}`, 'PUT', { sold_out: false, event_date: iso(-13 * 3600000) });
  assert.ok(!(await (await visit('/f3dez')).text()).includes('FestaOpium'));
  await api(`/items/${ev.id}`, 'DELETE');
});

test('design changes stay in draft until published, and can be discarded', async () => {
  const before2 = await (await visit('/f3dez')).text();
  assert.ok(before2.includes('#e5322d'));
  const page = await (await api('/pages/1')).json();
  const res = await (await api('/pages/1', 'PUT', { theme: { ...page.theme, btnAccent: '#00ff00', bgColor: 'red;}body{display:none' } })).json();
  assert.equal(res.has_draft, true);
  assert.equal(res.theme.bgColor, '#0b0d17', 'unsafe values fall back to the default');
  assert.ok(!(await (await visit('/f3dez')).text()).includes('#00ff00'), 'public page unchanged');
  await api('/login', 'POST', { password: PASSWORD });
  assert.ok((await (await fetch(`${BASE}/admin/preview/1`, { headers: { Cookie: cookie } })).text()).includes('#00ff00'), 'preview shows draft');
  const discarded = await (await api('/pages/1/discard', 'POST', {})).json();
  assert.equal(discarded.theme.btnAccent, '#e5322d');
  await api('/pages/1', 'PUT', { theme: { ...page.theme, btnAccent: '#00ff00' } });
  await api('/pages/1/publish', 'POST', {});
  assert.ok((await (await visit('/f3dez')).text()).includes('#00ff00'));
  await api('/pages/1', 'PUT', { theme: page.theme });
  await api('/pages/1/publish', 'POST', {});
});

test('images: upload, serve, refuse SVG, remove when unused', async () => {
  const png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAEBgIApD5fRAAAAABJRU5ErkJggg==';
  assert.equal((await api('/images', 'POST', { mime: 'image/svg+xml', data: png })).status, 400);
  const { id } = await (await api('/images', 'POST', { mime: 'image/png', data: png })).json();
  await api('/pages/1', 'PUT', { avatar_image: id });
  const img = await visit(`/img/${id}`);
  assert.equal(img.headers.get('content-type'), 'image/png');
  assert.equal((await img.arrayBuffer()).byteLength > 50, true);
  await api('/pages/1', 'PUT', { avatar_image: null });
  assert.equal((await visit(`/img/${id}`)).status, 404);
});

test('brands: create, slug rules, delete; home page protected', async () => {
  assert.equal((await api('/pages', 'POST', { title: 'X', slug: 'admin' })).status, 400);
  assert.equal((await api('/pages', 'POST', { title: 'X', slug: 'f3dez' })).status, 409);
  const page = await (await api('/pages', 'POST', { title: 'Erasmus Sicilia', slug: 'erasmussicilia' })).json();
  assert.equal((await visit('/erasmussicilia')).status, 404, 'new brands start unpublished');
  await api(`/pages/${page.id}`, 'PUT', { published: true, socials: { instagram: '@erasmussicilia', whatsapp: '+39 333 1234567' } });
  const html = await (await visit('/erasmussicilia')).text();
  assert.ok(html.includes('https://instagram.com/erasmussicilia') && html.includes('https://wa.me/393331234567'));
  assert.equal((await api('/pages/1', 'DELETE')).status, 400);
  assert.equal((await api(`/pages/${page.id}`, 'DELETE')).status, 200);
  assert.equal((await visit('/erasmussicilia')).status, 404);
});

test('analytics: views, unique visitors, clicks, source, device; bots ignored; no IP stored', async () => {
  const link = await (await api('/pages/2/items', 'POST', { title: 'Biglietti', url: 'https://t.example/' })).json();
  await api('/pages/2', 'PUT', { published: true });
  const ip = { 'CF-Connecting-IP': '203.0.113.9' };
  await visit('/erasmusbarcelona', MOBILE, ip);
  await visit('/erasmusbarcelona', MOBILE, ip);
  await visit('/erasmusbarcelona?utm_source=flyer', DESKTOP, { 'CF-Connecting-IP': '203.0.113.10' });
  await visit('/erasmusbarcelona', 'Googlebot/2.1');
  await visit('/erasmusbarcelona', 'facebookexternalhit/1.1');
  const go = await visit(`/go/${link.id}`, MOBILE, ip);
  assert.equal(go.status, 302);
  assert.equal(go.headers.get('location'), 'https://t.example/');
  await visit(`/go/${link.id}`, 'Googlebot/2.1');
  await srv.settle();

  const d = today();
  const r = await (await api(`/stats?page=2&from=${d}&to=${d}`)).json();
  assert.deepEqual(r.totals, { views: 3, clicks: 1, uniques: 2 });
  assert.equal(r.items[0].title, 'Biglietti');
  assert.equal(r.sources.find((s) => s.key === 'instagram').hits, 2);
  assert.equal(r.sources.find((s) => s.key === 'flyer').hits, 1);
  assert.equal(r.devices.find((s) => s.key === 'mobile').hits, 2);
  assert.equal(r.devices.find((s) => s.key === 'desktop').hits, 1);

  const allBrands = await (await api(`/stats?page=all&from=${d}&to=${d}`)).json();
  assert.ok(allBrands.totals.views >= 3);

  const raw = await srv.env.DB.prepare('SELECT * FROM visitors').all();
  assert.ok(raw.results.length >= 2);
  assert.ok(!JSON.stringify(raw.results).includes('203.0.113'), 'IP never stored');

  await api(`/items/${link.id}`, 'DELETE');
  const kept = await (await api(`/stats?page=2&from=${d}&to=${d}`)).json();
  assert.equal(kept.totals.clicks, 1, 'history survives deleting a link');
  assert.equal(kept.items[0].title, 'Link eliminato');
  await api('/pages/2', 'PUT', { published: false });
});

test('the administrator browsing while logged in does not inflate stats', async () => {
  const d = today();
  const before3 = (await (await api(`/stats?page=1&from=${d}&to=${d}`)).json()).totals.views;
  await fetch(`${BASE}/f3dez`, { headers: { Cookie: cookie, 'User-Agent': DESKTOP } });
  await srv.settle();
  assert.equal((await (await api(`/stats?page=1&from=${d}&to=${d}`)).json()).totals.views, before3);
});

test('login is locked after repeated failures', async () => {
  const ip = { 'CF-Connecting-IP': '198.51.100.7', 'Content-Type': 'application/json' };
  let last;
  for (let i = 0; i < 9; i++) last = await fetch(`${BASE}/api/login`, { method: 'POST', headers: ip, body: '{"password":"no"}' });
  assert.equal(last.status, 429);
  const right = await fetch(`${BASE}/api/login`, { method: 'POST', headers: ip, body: JSON.stringify({ password: PASSWORD }) });
  assert.equal(right.status, 429);
});
