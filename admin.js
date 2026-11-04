import { PRESETS, FONTS, sanitizeTheme, themeCss, fontHref } from './theme.js';
import { ICONS } from './icons.js';
import { itemStatus } from './visibility.js';

/* ---------- Small DOM toolkit ---------- */

function h(tag, props = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'value' || k === 'checked' || k === 'disabled' || k === 'hidden' || k === 'open') el[k] = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  el.append(...kids.flat().filter((c) => c !== null && c !== undefined && c !== false));
  return el;
}

const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const UI = {
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.5 7.1.7-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.7z"/></svg>',
  links: svg('<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>'),
  brush: svg('<path d="M18.4 2.6a2 2 0 0 1 3 3L12 15l-4-4z"/><path d="M7 14c-2 0-3 1.5-3 3 0 1.5-1 2.5-2 3 1 .7 3 1 5 1 2.5 0 4-1.5 4-3.5 0-2-1.8-3.5-4-3.5z"/>'),
  chart: svg('<path d="M3 3v18h18"/><path d="M7 15l4-5 4 3 5-7"/>'),
  gear: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3.1 14H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.1a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  plus: svg('<path d="M12 5v14M5 12h14"/>'),
  grip: svg('<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>'),
  copy: svg('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
  open: svg('<path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/>'),
  trash: svg('<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>'),
  image: svg('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>'),
  logout: svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>'),
  phone: svg('<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>'),
  close: svg('<path d="M18 6L6 18M6 6l12 12"/>'),
  calendar: svg('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
  section: svg('<path d="M4 6h16M4 12h10M4 18h7"/>'),
};
const raw = (markup) => { const s = document.createElement('span'); s.style.display = 'contents'; s.innerHTML = markup; return s; };
const $ = (sel, root = document) => root.querySelector(sel);

function toast(message, kind = '') {
  const el = h('div', { class: `toast ${kind}`, role: kind === 'error' ? 'alert' : 'status' }, message);
  $('#toasts').append(el);
  setTimeout(() => el.remove(), kind === 'error' ? 6000 : 2600);
}

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* private window */ } },
};

async function copyText(value) {
  try { await navigator.clipboard.writeText(value); toast('Link copiato'); }
  catch { toast(`Copia manualmente: ${value}`); }
}

/* ---------- Server ---------- */

async function api(path, method = 'GET', body) {
  let res;
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers: method === 'GET' ? {} : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error('Connessione assente. Controlla internet e riprova.');
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && path !== '/login') {
    S.authenticated = false;
    showLogin('Sessione scaduta. Accedi di nuovo.');
    throw new Error('Sessione scaduta.');
  }
  if (!res.ok) { const e = new Error(data.error || 'Si è verificato un problema. Riprova.'); e.code = data.code; throw e; }
  return data;
}

/* ---------- State and autosave ---------- */

const S = { pages: [], page: null, tab: 'content', expanded: new Set(), clicks: {}, bgMode: null, stats: null, statsQ: null, authenticated: false };
const pending = new Map();

function schedule(key, fn, ms = 650) {
  clearTimeout(pending.get(key)?.timer);
  setSaveState('pending');
  pending.set(key, { fn, timer: setTimeout(() => runPending(key), ms) });
}
async function runPending(key) {
  const job = pending.get(key);
  if (!job) return;
  clearTimeout(job.timer);
  pending.delete(key);
  await job.fn();
}
const flushAll = () => Promise.all([...pending.keys()].map(runPending));
window.addEventListener('beforeunload', (e) => { if (pending.size) { flushAll(); e.preventDefault(); } });

let inFlight = 0;
function setSaveState(state, message) {
  const el = $('#save-state');
  if (!el) return;
  el.className = `save-state ${state === 'error' ? 'error' : ''}`;
  el.textContent = { pending: 'Modifiche in corso…', saving: 'Salvataggio…', saved: 'Tutto salvato', error: message || 'Non salvato' }[state] || '';
}
async function saving(fn) {
  inFlight += 1;
  setSaveState('saving');
  try {
    const out = await fn();
    inFlight -= 1;
    if (!inFlight && !pending.size) setSaveState('saved');
    return out;
  } catch (e) {
    inFlight -= 1;
    setSaveState('error', 'Non salvato');
    toast(e.message, 'error');
    throw e;
  }
}

/* ---------- Boot and login ---------- */

const app = () => $('#app');

function showLogin(notice) {
  let error = notice || '';
  const errorEl = h('p', { class: 'form-error', hidden: !error, role: 'alert' }, error);
  const pwd = h('input', { type: 'password', id: 'login-password', autocomplete: 'current-password', required: true });
  const submit = h('button', { class: 'btn primary', type: 'submit' }, 'Accedi');
  const form = h('form', {
    class: 'login',
    onsubmit: async (e) => {
      e.preventDefault();
      submit.disabled = true; submit.textContent = 'Accesso…'; errorEl.hidden = true;
      try { await api('/login', 'POST', { password: pwd.value }); await startApp(); }
      catch (err) { errorEl.textContent = err.message; errorEl.hidden = false; submit.disabled = false; submit.textContent = 'Accedi'; pwd.select(); }
    },
  },
  h('div', { class: 'wordmark' }, raw(UI.star), h('span', {}, 'ESL Links')),
  h('p', { class: 'hint' }, 'Gestisci le pagine di tutti i tuoi brand.'),
  h('div', { class: 'field' }, h('label', { for: 'login-password' }, 'Password'), pwd),
  errorEl, submit);
  app().replaceChildren(h('div', { class: 'center-screen' }, form));
  pwd.focus();
}

async function startApp() {
  app().replaceChildren(h('div', { class: 'center-screen' }, h('div', { class: 'loading' }, 'Caricamento…')));
  S.authenticated = true;
  const { pages } = await api('/pages');
  S.pages = pages;
  const saved = Number(store.get('page'));
  const start = pages.find((p) => p.id === saved) || pages[0];
  renderShell();
  await selectPage(start.id);
}

async function boot() {
  try {
    const me = await api('/me');
    if (me.authenticated) await startApp();
    else showLogin(me.passwordConfigured ? '' : 'Password non ancora impostata. Aggiungi il secret ADMIN_PASSWORD su Cloudflare, con almeno 10 caratteri.');
  } catch (e) {
    app().replaceChildren(h('div', { class: 'center-screen' }, h('div', { class: 'login' },
      h('p', { class: 'form-error' }, e.message), h('button', { class: 'btn primary', onclick: boot }, 'Riprova'))));
  }
}

/* ---------- Shell ---------- */

const TABS = [
  { id: 'content', label: 'Contenuti', icon: UI.links, wide: false },
  { id: 'design', label: 'Aspetto', icon: UI.brush, wide: false },
  { id: 'stats', label: 'Statistiche', icon: UI.chart, wide: true },
  { id: 'settings', label: 'Impostazioni', icon: UI.gear, wide: false },
];

function renderShell() {
  const select = h('select', { id: 'brand-select', 'aria-label': 'Brand', onchange: (e) => selectPage(Number(e.target.value)) });
  const nav = h('nav', { class: 'nav', 'aria-label': 'Sezioni' }, TABS.map((t) =>
    h('button', { type: 'button', 'data-tab': t.id, onclick: () => setTab(t.id) }, raw(t.icon), h('span', {}, t.label))));
  const shell = h('div', { class: 'shell' },
    h('aside', { class: 'rail' },
      h('div', { class: 'wordmark' }, raw(UI.star), h('span', {}, 'ESL Links')),
      h('div', { class: 'brand-switch' }, h('label', { for: 'brand-select' }, 'Brand'), select),
      nav,
      h('div', { class: 'rail-foot' },
        h('button', { type: 'button', title: 'Nuovo brand', 'aria-label': 'Nuovo brand', onclick: newBrandDialog }, raw(UI.plus), h('span', {}, 'Nuovo brand')),
        h('button', { type: 'button', title: 'Esci', 'aria-label': 'Esci', onclick: logout }, raw(UI.logout), h('span', {}, 'Esci')))),
    h('main', { class: 'main' }, h('div', { class: 'main-inner', id: 'panel' })),
    h('aside', { class: 'preview', id: 'preview', 'aria-label': 'Anteprima' },
      h('div', { class: 'preview-label' }, 'Anteprima dal vivo'),
      h('div', { class: 'phone', id: 'phone' }, h('div', { class: 'phone-screen', id: 'phone-screen' }, h('iframe', { id: 'preview-frame', title: 'Anteprima della pagina' }))),
      h('button', { class: 'btn preview-close', type: 'button', onclick: () => togglePreview(false) }, raw(UI.close), 'Chiudi')),
    h('button', { class: 'btn primary preview-fab', type: 'button', onclick: () => togglePreview(true) }, raw(UI.phone), 'Anteprima'));
  app().replaceChildren(shell);
  $('#preview-frame').addEventListener('load', applyThemeToPreview);
  sizePhone();
  syncBrandSelect();
}

function syncBrandSelect() {
  const select = $('#brand-select');
  if (!select) return;
  select.replaceChildren(...S.pages.map((p) => h('option', { value: p.id }, `${p.title}${p.published ? '' : ' (non online)'}`)));
  if (S.page) select.value = S.page.id;
}

function togglePreview(open) {
  $('#preview').classList.toggle('open', open);
  sizePhone();
}

function sizePhone() {
  const screen = $('#phone-screen');
  const frame = $('#preview-frame');
  if (!screen || !frame) return;
  const FRAME_W = 390; const FRAME_H = 800;
  const overlay = $('#preview').classList.contains('open');
  const availH = window.innerHeight - (overlay ? 124 : 76);
  const availW = overlay ? window.innerWidth - 48 : 300;
  const scale = Math.min(availH / FRAME_H, availW / FRAME_W, 1);
  frame.style.height = `${FRAME_H}px`;
  frame.style.transform = `scale(${scale})`;
  screen.style.width = `${Math.round(FRAME_W * scale)}px`;
  screen.style.height = `${Math.round(FRAME_H * scale)}px`;
}
let resizeTimer;
window.addEventListener('resize', () => {
  sizePhone();
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { if (S.tab === 'stats' && S.stats) drawChartInto(); }, 150);
});

async function selectPage(id) {
  await flushAll();
  const panel = $('#panel');
  panel.replaceChildren(h('div', { class: 'loading' }, 'Caricamento…'));
  try {
    S.page = await api(`/pages/${id}`);
  } catch (e) {
    panel.replaceChildren(h('div', { class: 'empty' }, e.message, ' ', h('button', { class: 'btn', onclick: () => selectPage(id) }, 'Riprova')));
    return;
  }
  store.set('page', String(id));
  S.expanded.clear(); S.clicks = {}; S.bgMode = null;
  S.statsQ = null;
  syncBrandSelect();
  $('#preview-frame').src = `/admin/preview/${id}`;
  renderTab();
  loadClicks(id);
}

async function loadClicks(id) {
  const to = new Date();
  const from = new Date(Date.now() - 29 * 86400000);
  try {
    const r = await api(`/stats?page=${id}&from=${isoDay(from)}&to=${isoDay(to)}`);
    if (S.page?.id !== id) return;
    S.clicks = Object.fromEntries(r.items.map((i) => [i.id, i.clicks]));
    S.page.items.forEach(refreshItemRow);
  } catch { /* the counters are a convenience */ }
}

async function setTab(id) {
  await flushAll();
  S.tab = id;
  togglePreview(false);
  renderTab();
  window.scrollTo(0, 0);
}

function renderTab() {
  document.querySelectorAll('.nav button').forEach((b) => {
    if (b.dataset.tab === S.tab) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  const tab = TABS.find((t) => t.id === S.tab);
  const panel = $('#panel');
  panel.classList.toggle('main-wide', tab.wide);
  $('.shell').style.gridTemplateColumns = tab.wide ? 'var(--stats-cols, 232px minmax(0,1fr))' : '';
  $('#preview').style.visibility = tab.wide ? 'hidden' : '';
  $('#preview').style.width = tab.wide ? '0' : '';
  $('#preview').style.padding = tab.wide ? '0' : '';
  $('.preview-fab').hidden = tab.wide;
  panel.replaceChildren(...({ content: contentTab, design: designTab, stats: statsTab, settings: settingsTab }[S.tab])());
}

const pageUrl = (p) => `${location.origin}/${p.slug}`;

function topline(title) {
  const p = S.page;
  return h('div', { class: 'topline' },
    h('div', {}, h('h1', {}, title), h('div', { class: 'save-state', id: 'save-state', role: 'status' }, 'Tutto salvato')),
    h('div', { class: 'url-box' },
      h('code', {}, pageUrl(p).replace(/^https?:\/\//, '')),
      h('button', { class: 'icon-btn', type: 'button', title: 'Copia link', 'aria-label': 'Copia link', onclick: () => copyText(pageUrl(p)) }, raw(UI.copy)),
      h('a', { class: 'icon-btn', href: pageUrl(p), target: '_blank', rel: 'noopener', title: 'Apri pagina pubblica', 'aria-label': 'Apri pagina pubblica' }, raw(UI.open))));
}

function offlineBanner() {
  if (S.page.published) return null;
  return h('div', { class: 'banner' },
    h('span', {}, 'Questo brand non è ancora online. Solo tu puoi vederlo in anteprima.'),
    h('button', { class: 'btn primary', type: 'button', onclick: async () => { await savePageNow({ published: true }); renderTab(); toast('Il brand è online'); } }, 'Metti online'));
}

/* ---------- Preview ---------- */

let previewTimer;
function reloadPreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(() => {
    const frame = $('#preview-frame');
    try { frame.contentWindow.location.reload(); } catch { frame.src = frame.src; }
  }, 250);
}

function applyThemeToPreview() {
  const frame = $('#preview-frame');
  const doc = frame?.contentDocument;
  if (!S.page) return;
  $('#phone-screen').style.background = S.page.theme.bgColor;
  if (!doc) return;
  const style = doc.getElementById('theme');
  const font = doc.getElementById('font');
  if (style) style.textContent = themeCss(S.page.theme);
  const href = fontHref(S.page.theme);
  if (font && font.getAttribute('href') !== href) font.setAttribute('href', href);
}

/* ---------- Saving pages ---------- */

let pagePatch = {};
function savePageSoon(patch) {
  Object.assign(S.page, patch);
  Object.assign(pagePatch, patch);
  const id = S.page.id;
  schedule(`page${id}`, async () => {
    const body = pagePatch; pagePatch = {};
    try {
      const saved = await saving(() => api(`/pages/${id}`, 'PUT', body));
      if (S.page?.id === id) {
        if (body.socials) S.page.socials = saved.socials;
        mergePageSummary(saved);
        reloadPreview();
      }
    } catch { /* reported */ }
  });
}

async function savePageNow(patch) {
  await flushAll();
  const saved = await saving(() => api(`/pages/${S.page.id}`, 'PUT', patch));
  Object.assign(S.page, saved, { items: S.page.items });
  mergePageSummary(saved);
  reloadPreview();
  return saved;
}

function mergePageSummary(saved) {
  const i = S.pages.findIndex((p) => p.id === saved.id);
  if (i >= 0) S.pages[i] = saved;
  syncBrandSelect();
}

/* ---------- Image handling ---------- */

// Photos are resized in the browser, so a 5 MB phone picture becomes a light file before upload.
async function compressImage(file, { size, square, ratio, lossless }) {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') throw new Error('Scegli una foto in formato JPG, PNG o WebP.');
  let bitmap;
  try { bitmap = await createImageBitmap(file); } catch { throw new Error('Non riesco a leggere questa immagine. Provane un’altra.'); }
  let sx = 0; let sy = 0; let sw = bitmap.width; let sh = bitmap.height;
  const target = square ? 1 : ratio;
  if (target) {
    if (sw / sh > target) { const w = sh * target; sx = (sw - w) / 2; sw = w; } else { const hh = sw / target; sy = (sh - hh) / 2; sh = hh; }
  }
  const scale = Math.min(1, size / Math.max(sw, sh));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(sw * scale);
  canvas.height = Math.round(sh * scale);
  canvas.getContext('2d').drawImage(bitmap, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  const toBlob = (type, q) => new Promise((res) => canvas.toBlob(res, type, q));
  let blob = await toBlob('image/webp', 0.82);
  if (!blob || blob.type !== 'image/webp') blob = await toBlob(lossless ? 'image/png' : 'image/jpeg', 0.82);
  const data = await new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(',')[1]);
    r.onerror = () => rej(new Error('Lettura dell’immagine non riuscita.'));
    r.readAsDataURL(blob);
  });
  return { mime: blob.type, data };
}

function imageField({ id, label, value, options, wide, onChange }) {
  const box = h('div', { class: `thumb-box ${wide ? 'wide' : ''}` });
  const setBox = (v) => {
    box.classList.toggle('filled', !!v);
    box.style.backgroundImage = v ? `url(/img/${v})` : '';
    box.replaceChildren(...(v ? [] : [raw(UI.image)]));
  };
  setBox(value);
  let current = value;
  const input = h('input', { type: 'file', id, accept: 'image/jpeg,image/png,image/webp,image/heic' });
  const upload = h('label', { class: 'btn', for: id }, current ? 'Sostituisci' : 'Carica');
  const remove = h('button', { class: 'btn', type: 'button', hidden: !current, onclick: async () => { current = null; setBox(null); remove.hidden = true; upload.textContent = 'Carica'; await onChange(null); } }, 'Rimuovi');
  input.addEventListener('change', async () => {
    const file = input.files[0];
    if (!file) return;
    upload.textContent = 'Caricamento…';
    try {
      const payload = await compressImage(file, options);
      const { id: imageId } = await saving(() => api('/images', 'POST', payload));
      current = imageId; setBox(imageId); remove.hidden = false;
      await onChange(imageId);
    } catch (e) { if (!/salvat/i.test(e.message)) toast(e.message, 'error'); }
    upload.textContent = current ? 'Sostituisci' : 'Carica';
    input.value = '';
  });
  return h('div', { class: 'field' }, h('span', { class: 'field-label' }, label),
    h('div', { class: 'image-field' }, box, h('div', { class: 'ctrl' }, input, upload, remove)));
}

/* ---------- Content tab ---------- */

const SOCIAL_LABELS = { instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook', whatsapp: 'WhatsApp', youtube: 'YouTube', x: 'X', telegram: 'Telegram', spotify: 'Spotify', snapchat: 'Snapchat', linkedin: 'LinkedIn', website: 'Sito web', email: 'Email' };

function contentTab() {
  const p = S.page;
  const list = h('div', { class: 'items', id: 'items' });
  const socials = { ...p.socials };

  const out = [
    topline('Contenuti'),
    offlineBanner(),
    h('section', { class: 'card' },
      h('h2', {}, 'Profilo'),
      imageField({
        id: 'avatar-upload', label: 'Logo o foto', value: p.avatar_image, options: { size: 512, square: true, lossless: true },
        onChange: (v) => savePageNow({ avatar_image: v }),
      }),
      h('div', { class: 'field' }, h('label', { for: 'page-title' }, 'Nome del brand'),
        h('input', { id: 'page-title', type: 'text', value: p.title, maxlength: 120, oninput: (e) => { if (e.target.value.trim()) savePageSoon({ title: e.target.value }); } })),
      h('div', { class: 'field' }, h('label', { for: 'page-bio' }, 'Descrizione'),
        h('textarea', { id: 'page-bio', maxlength: 500, value: p.bio, oninput: (e) => savePageSoon({ bio: e.target.value }) })),
      h('details', {},
        h('summary', { id: 'social-count' }, `Social (${Object.keys(p.socials).length})`),
        h('div', { class: 'socials-grid' }, Object.keys(SOCIAL_LABELS).map((key) =>
          h('div', { class: 'social-field' }, raw(ICONS[key]),
            h('input', {
              id: `social-${key}`, type: 'text', 'aria-label': SOCIAL_LABELS[key], placeholder: SOCIAL_LABELS[key], value: socials[key] || '',
              oninput: (e) => { socials[key] = e.target.value; savePageSoon({ socials: { ...socials } }); $('#social-count').textContent = `Social (${Object.values(socials).filter((v) => String(v).trim()).length})`; },
            })))),
        h('p', { class: 'hint', style: 'margin-top:10px' }, 'Puoi scrivere @nomeutente oppure incollare il link completo.'))),
    h('div', { class: 'add-row' },
      h('button', { class: 'btn primary', type: 'button', id: 'add-link', onclick: () => addItem('link') }, raw(UI.plus), 'Link'),
      h('button', { class: 'btn', type: 'button', id: 'add-event', onclick: () => addItem('event') }, raw(UI.calendar), 'Evento'),
      h('button', { class: 'btn', type: 'button', id: 'add-section', onclick: () => addItem('section') }, raw(UI.section), 'Sezione')),
    list,
  ];
  renderItems(list);
  return out.filter(Boolean);
}

function renderItems(list = $('#items')) {
  if (!list) return;
  const items = S.page.items;
  if (!items.length) {
    list.replaceChildren(h('div', { class: 'empty' }, 'Nessun link per ora. Aggiungi il primo con il pulsante Link.'));
    return;
  }
  list.replaceChildren(...items.map(itemRow));
}

async function addItem(kind) {
  await flushAll();
  const defaults = kind === 'event' ? { kind, title: 'Nuovo evento', pinned: true, cta_label: 'Get Tickets' } : kind === 'section' ? { kind, title: 'Nuova sezione' } : { kind, title: 'Nuovo link' };
  try {
    const item = await saving(() => api(`/pages/${S.page.id}/items`, 'POST', defaults));
    S.page.items.unshift(item);
    S.expanded.add(item.id);
    renderItems();
    reloadPreview();
    const first = $(`#item-${item.id}-title`);
    if (first) { first.focus(); first.select(); }
  } catch { /* reported */ }
}

const STATUS = {
  live: ['Online', 'live'], off: ['Disattivato', ''], scheduled: ['Programmato', 'info'], expired: ['Terminato', 'warn'], 'no-url': ['Manca il link', 'bad'],
};

function itemSummary(item) {
  if (item.kind === 'section') return 'Sezione';
  if (item.kind === 'event' && item.event_date) return `${new Date(item.event_date).toLocaleString('it-IT', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`;
  return item.url || item.subtitle || '';
}

function refreshItemRow(item) {
  const row = document.querySelector(`.item[data-id="${item.id}"]`);
  if (!row) return;
  row.classList.toggle('off', !item.active);
  $('.item-title', row).textContent = item.title || 'Senza titolo';
  $('.item-sub', row).textContent = itemSummary(item);
  const [label, cls] = STATUS[itemStatus(item)];
  const chips = [h('span', { class: `chip ${cls}` }, label)];
  if (item.pinned) chips.push(h('span', { class: 'chip plain info' }, 'In evidenza'));
  if (item.sold_out) chips.push(h('span', { class: 'chip plain bad' }, 'Sold out'));
  if (item.kind !== 'section') chips.push(h('span', {}, `${S.clicks[item.id] || 0} clic in 30 giorni`));
  $('.item-meta', row).replaceChildren(...chips);
  const thumb = $('.item-thumb', row);
  if (thumb) {
    thumb.style.backgroundImage = item.thumb_image ? `url(/img/${item.thumb_image})` : '';
    thumb.replaceChildren(...(item.thumb_image ? [] : [raw(item.kind === 'event' ? UI.calendar : UI.links)]));
  }
}

function itemRow(item) {
  const row = h('article', { class: `item ${item.kind === 'section' ? 'section-item' : ''}`, 'data-id': item.id });
  const handle = h('button', { class: 'handle', type: 'button', 'aria-label': `Sposta ${item.title}. Usa le frecce su e giù.`, title: 'Trascina per riordinare' }, raw(UI.grip));
  enableDrag(handle, row);
  const toggle = h('label', { class: 'switch', title: 'Attiva o disattiva' },
    h('input', { type: 'checkbox', checked: !!item.active, 'aria-label': `Attiva ${item.title}`, onchange: (e) => saveItemSoon(item, { active: e.target.checked ? 1 : 0 }, 0) }), h('span', {}));
  const body = h('button', { class: 'item-body', type: 'button', 'aria-expanded': S.expanded.has(item.id) ? 'true' : 'false', onclick: () => toggleEditor(item, row) },
    h('span', { class: 'item-title' }), h('span', { class: 'item-sub' }), h('span', { class: 'item-meta' }));
  row.append(h('div', { class: 'item-head' }, handle, item.kind === 'section' ? null : h('div', { class: 'item-thumb' }), body, toggle));
  if (S.expanded.has(item.id)) row.append(itemEditor(item));
  queueMicrotask(() => refreshItemRow(item));
  return row;
}

function toggleEditor(item, row) {
  const open = S.expanded.has(item.id);
  $('.item-body', row).setAttribute('aria-expanded', String(!open));
  if (open) { S.expanded.delete(item.id); $('.item-editor', row)?.remove(); return; }
  S.expanded.add(item.id);
  row.append(itemEditor(item));
}

const itemPatches = new Map();
function saveItemSoon(item, patch, ms = 650) {
  Object.assign(item, patch);
  refreshItemRow(item);
  itemPatches.set(item.id, { ...(itemPatches.get(item.id) || {}), ...patch });
  schedule(`item${item.id}`, async () => {
    const body = itemPatches.get(item.id);
    itemPatches.delete(item.id);
    try {
      const saved = await saving(() => api(`/items/${item.id}`, 'PUT', body));
      if ('url' in body && !itemPatches.get(item.id)?.url) {
        item.url = saved.url;
        const urlInput = document.getElementById(`item-${item.id}-url`);
        if (urlInput && document.activeElement !== urlInput) urlInput.value = saved.url;
      }
      refreshItemRow(item);
      reloadPreview();
    } catch { /* reported */ }
  }, ms);
}

function toLocalInput(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
const fromLocalInput = (v) => (v ? new Date(v).toISOString() : null);

function dateField(item, key, label) {
  const id = `item-${item.id}-${key}`;
  return h('div', { class: 'field' }, h('label', { for: id }, label),
    h('input', { id, type: 'datetime-local', value: toLocalInput(item[key]), onchange: (e) => saveItemSoon(item, { [key]: fromLocalInput(e.target.value) }, 0) }));
}

function textField(item, key, label, placeholder = '', inputType = 'text') {
  const id = `item-${item.id}-${key === 'title' ? 'title' : key === 'url' ? 'url' : key}`;
  return h('div', { class: 'field' }, h('label', { for: id }, label),
    h('input', { id, type: inputType, placeholder, value: item[key] || '', oninput: (e) => saveItemSoon(item, { [key]: e.target.value }), onblur: () => flushAll() }));
}

function switchRow(item, key, title, hint) {
  return h('div', { class: 'toggle-row' },
    h('div', {}, h('strong', {}, title), hint ? h('p', { class: 'hint' }, hint) : null),
    h('label', { class: 'switch' }, h('input', { type: 'checkbox', 'aria-label': title, id: `item-${item.id}-${key}`, checked: !!item[key], onchange: (e) => saveItemSoon(item, { [key]: e.target.checked ? 1 : 0 }, 0) }), h('span', {})));
}

function itemEditor(item) {
  const parts = [];
  if (item.kind === 'section') {
    parts.push(textField(item, 'title', 'Titolo della sezione'));
    parts.push(h('p', { class: 'hint' }, 'I link che seguono questa sezione nell’elenco appartengono a lei. Se nessuno è visibile, il titolo si nasconde da solo.'));
    parts.push(h('div', { class: 'grid-2' }, dateField(item, 'starts_at', 'Mostra dal'), dateField(item, 'ends_at', 'Nascondi dal')));
  } else if (item.kind === 'event') {
    parts.push(textField(item, 'title', 'Nome dell’evento'));
    parts.push(textField(item, 'subtitle', 'Descrizione', 'Luogo, line-up, dettagli'));
    parts.push(h('div', { class: 'grid-2' }, dateField(item, 'event_date', 'Data e ora dell’evento'), dateField(item, 'ends_at', 'Fine evento (poi si nasconde)')));
    parts.push(h('p', { class: 'hint' }, 'Senza una fine, l’evento si nasconde 12 ore dopo l’inizio.'));
    parts.push(textField(item, 'url', 'Link del pulsante', 'https://…'));
    const ctaId = `item-${item.id}-cta_label`;
    parts.push(h('div', { class: 'field' }, h('label', { for: ctaId }, 'Testo del pulsante'),
      h('input', { id: ctaId, type: 'text', list: 'cta-options', maxlength: 40, value: item.cta_label || '', placeholder: 'Get Tickets', oninput: (e) => saveItemSoon(item, { cta_label: e.target.value }) }),
      h('datalist', { id: 'cta-options' }, ['Get Tickets', 'Join WhatsApp', 'Register Now'].map((v) => h('option', { value: v })))));
    parts.push(imageField({ id: `item-${item.id}-image`, label: 'Immagine dell’evento', wide: true, value: item.thumb_image, options: { size: 1200, ratio: 16 / 9 }, onChange: async (v) => { saveItemSoon(item, { thumb_image: v }, 0); await flushAll(); } }));
    parts.push(dateField(item, 'starts_at', 'Mostra sulla pagina dal (facoltativo)'));
    parts.push(switchRow(item, 'pinned', 'In evidenza in cima', 'Appare sopra tutti gli altri link.'));
    parts.push(switchRow(item, 'sold_out', 'SOLD OUT', 'Mostra il badge e blocca il pulsante.'));
  } else {
    parts.push(textField(item, 'title', 'Titolo'));
    parts.push(textField(item, 'subtitle', 'Descrizione (facoltativa)'));
    parts.push(textField(item, 'url', 'Link', 'https://…'));
    const iconId = `item-${item.id}-icon`;
    parts.push(h('div', { class: 'grid-2' },
      imageField({ id: `item-${item.id}-image`, label: 'Miniatura', value: item.thumb_image, options: { size: 240, square: true, lossless: true }, onChange: async (v) => { saveItemSoon(item, { thumb_image: v }, 0); await flushAll(); } }),
      h('div', { class: 'field' }, h('label', { for: iconId }, 'Icona (senza miniatura)'),
        h('select', { id: iconId, onchange: (e) => saveItemSoon(item, { icon: e.target.value }, 0) },
          h('option', { value: 'auto' }, 'Automatica dal link'), h('option', { value: 'none' }, 'Nessuna'),
          Object.keys(SOCIAL_LABELS).map((k) => h('option', { value: k }, SOCIAL_LABELS[k])))))
    );
    parts.push(h('div', { class: 'grid-2' }, dateField(item, 'starts_at', 'Mostra dal'), dateField(item, 'ends_at', 'Nascondi dal')));
    parts.push(switchRow(item, 'pinned', 'In evidenza in cima', 'Pulsante più grande, sopra tutti gli altri link.'));
    parts.push(switchRow(item, 'sold_out', 'SOLD OUT', 'Mostra il badge e blocca il link.'));
  }
  parts.push(h('div', { class: 'item-tools' },
    h('button', { class: 'btn', type: 'button', onclick: () => duplicateItem(item) }, raw(UI.copy), 'Duplica'),
    h('button', { class: 'btn danger', type: 'button', onclick: () => deleteItem(item) }, raw(UI.trash), 'Elimina')));
  const editor = h('div', { class: 'item-editor' }, parts);
  const icon = editor.querySelector(`#item-${item.id}-icon`);
  if (icon) icon.value = item.icon || 'auto';
  return editor;
}

async function duplicateItem(item) {
  await flushAll();
  try {
    const copy = await saving(() => api(`/items/${item.id}/duplicate`, 'POST', {}));
    S.page.items.splice(S.page.items.indexOf(item) + 1, 0, copy);
    S.expanded.add(copy.id);
    renderItems();
    reloadPreview();
    toast('Copia creata');
  } catch { /* reported */ }
}

async function deleteItem(item) {
  const yes = await confirmDialog(`Eliminare “${item.title || 'questo elemento'}”?`, 'L’azione non si può annullare. Le statistiche già raccolte restano nel totale.', 'Elimina');
  if (!yes) return;
  clearTimeout(pending.get(`item${item.id}`)?.timer);
  pending.delete(`item${item.id}`);
  itemPatches.delete(item.id);
  try {
    await saving(() => api(`/items/${item.id}`, 'DELETE'));
    S.page.items = S.page.items.filter((i) => i !== item);
    S.expanded.delete(item.id);
    renderItems();
    reloadPreview();
  } catch { /* reported */ }
}

/* Drag and drop, with touch and keyboard support */

function saveOrder() {
  const list = $('#items');
  const ids = [...list.querySelectorAll('.item')].map((r) => Number(r.dataset.id));
  S.page.items = ids.map((id) => S.page.items.find((i) => i.id === id));
  saving(() => api(`/pages/${S.page.id}/order`, 'PUT', { ids })).then(reloadPreview).catch(() => {});
}

function enableDrag(handle, row) {
  // Only the neighbours move in the DOM: moving the dragged row itself would cancel the pointer on touch screens.
  const onMove = (e) => {
    const list = row.parentElement;
    if (e.clientY < 70) window.scrollBy(0, -12);
    if (e.clientY > window.innerHeight - 70) window.scrollBy(0, 12);
    const prev = row.previousElementSibling;
    const next = row.nextElementSibling;
    if (prev) {
      const box = prev.getBoundingClientRect();
      if (e.clientY < box.top + box.height / 2) { row.after(prev); return; }
    }
    if (next) {
      const box = next.getBoundingClientRect();
      if (e.clientY > box.top + box.height / 2) list.insertBefore(next, row);
    }
  };
  const onEnd = () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onEnd);
    window.removeEventListener('pointercancel', onEnd);
    row.classList.remove('dragging');
    const before = S.page.items.map((i) => i.id).join();
    const after = [...row.parentElement.children].map((r) => r.dataset.id).join();
    if (before !== after) saveOrder();
  };
  handle.addEventListener('pointerdown', (e) => {
    if (e.button) return;
    e.preventDefault();
    row.classList.add('dragging');
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onEnd);
    window.addEventListener('pointercancel', onEnd);
  });
  handle.addEventListener('keydown', (e) => {
    const list = row.parentElement;
    if (e.key === 'ArrowUp' && row.previousElementSibling) list.insertBefore(row, row.previousElementSibling);
    else if (e.key === 'ArrowDown' && row.nextElementSibling) list.insertBefore(row.nextElementSibling, row);
    else return;
    e.preventDefault();
    handle.focus();
    saveOrder();
  });
}

/* ---------- Design tab ---------- */

function designTab() {
  const out = [topline('Aspetto'), offlineBanner(), h('div', { id: 'draft-bar' })];
  const controls = h('div', { id: 'design-controls', style: 'display:flex;flex-direction:column;gap:16px' });
  out.push(controls);
  renderDesignControls(controls);
  queueMicrotask(renderDraftBar);
  return out.filter(Boolean);
}

function renderDraftBar() {
  const bar = $('#draft-bar');
  if (!bar) return;
  if (!S.page.has_draft) {
    bar.replaceChildren(h('div', { class: 'banner clean' }, h('span', {}, 'Il design è online. Le modifiche resteranno in bozza finché non le pubblichi.')));
    return;
  }
  const act = (label, cls, path, msg) => {
    const b = h('button', {
      class: `btn ${cls}`, type: 'button', id: `draft-${path}`,
      onclick: async () => {
        b.disabled = true;
        try {
          await flushAll();
          const saved = await saving(() => api(`/pages/${S.page.id}/${path}`, 'POST', {}));
          Object.assign(S.page, saved, { items: S.page.items });
          S.bgMode = null;
          reloadPreview();
          renderTab();
          toast(msg);
        } catch { b.disabled = false; }
      },
    }, label);
    return b;
  };
  bar.replaceChildren(h('div', { class: 'banner sticky' },
    h('span', {}, h('strong', {}, 'Bozza non pubblicata. '), 'La vedi solo nell’anteprima.'),
    h('div', { class: 'actions' }, act('Annulla modifiche', '', 'discard', 'Modifiche annullate'), act('Pubblica', 'primary', 'publish', 'Design pubblicato'))));
}

function setTheme(patch) {
  S.page.theme = sanitizeTheme({ ...S.page.theme, ...patch });
  S.page.has_draft = true;
  applyThemeToPreview();
  if (!document.querySelector('#draft-publish')) renderDraftBar();
  const id = S.page.id;
  schedule(`theme${id}`, async () => {
    try { await saving(() => api(`/pages/${id}`, 'PUT', { theme: S.page.theme })); } catch { /* reported */ }
  }, 400);
}

const segment = (label, value, options, onPick) => {
  const row = h('div', { class: 'seg', role: 'group', 'aria-label': label });
  const paint = (v) => row.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === String(v))));
  options.forEach(([v, text]) => row.append(h('button', { type: 'button', 'data-v': v, onclick: () => { paint(v); onPick(v); } }, text)));
  paint(value);
  return h('div', { class: 'field' }, h('span', { class: 'field-label' }, label), row);
};

const colorField = (id, label, key) => {
  const value = S.page.theme[key];
  const hex = h('input', {
    id: `${id}-hex`, type: 'text', 'aria-label': `${label}, codice colore`, value, maxlength: 7,
    oninput: (e) => { if (/^#[0-9a-f]{6}$/i.test(e.target.value)) { pick.value = e.target.value; setTheme({ [key]: e.target.value }); } },
  });
  const pick = h('input', { id, type: 'color', value, oninput: (e) => { hex.value = e.target.value; setTheme({ [key]: e.target.value }); } });
  return h('div', { class: 'field' }, h('label', { for: id }, label), h('div', { class: 'color' }, pick, hex));
};

const rangeField = (id, label, key, min, max, unit = 'px') => {
  const out = h('output', { for: id }, `${S.page.theme[key]}${unit}`);
  return h('div', { class: 'field' },
    h('div', { class: 'range-head' }, h('label', { for: id }, label), out),
    h('input', { id, type: 'range', min, max, value: S.page.theme[key], oninput: (e) => { out.textContent = `${e.target.value}${unit}`; setTheme({ [key]: Number(e.target.value) }); } }));
};

const fontSelect = (id, label, key) => {
  const sel = h('select', { id, onchange: (e) => setTheme({ [key]: e.target.value }) }, Object.entries(FONTS).map(([k, f]) => h('option', { value: k }, f.name)));
  sel.value = S.page.theme[key];
  return h('div', { class: 'field' }, h('label', { for: id }, label), sel);
};

const themeSwitch = (id, title, key) => h('div', { class: 'toggle-row' }, h('strong', {}, title),
  h('label', { class: 'switch' }, h('input', { id, type: 'checkbox', 'aria-label': title, checked: !!S.page.theme[key], onchange: (e) => setTheme({ [key]: e.target.checked }) }), h('span', {})));

function renderDesignControls(root = $('#design-controls')) {
  const t = S.page.theme;
  const bgMode = S.bgMode || t.bgType;
  const rerender = () => renderDesignControls();

  const presets = h('div', { class: 'presets' }, PRESETS.map((p) => {
    const pt = p.theme;
    const bg = pt.bgType === 'gradient' ? `linear-gradient(${pt.gradientAngle}deg,${pt.bgColor},${pt.bgColor2})` : pt.bgColor;
    const btn = (w) => h('i', { style: `width:${w};align-self:center;border-radius:${Math.min(pt.btnRadius, 8)}px;background:${pt.btnStyle === 'outline' ? 'transparent' : pt.btnStyle === 'glass' ? '#ffffff40' : pt.btnColor};border:1.5px solid ${pt.btnAccent}` });
    return h('button', {
      class: 'preset', type: 'button', 'data-preset': p.id, 'aria-pressed': 'false',
      onclick: () => { S.bgMode = null; setTheme({ ...pt }); rerender(); },
    }, h('div', { class: 'swatch', style: `background:${bg}` }, btn('90%'), btn('90%')), h('b', {}, p.name));
  }));

  const bgControls = [segment('Tipo di sfondo', bgMode, [['solid', 'Tinta unita'], ['gradient', 'Sfumatura'], ['image', 'Immagine']], (v) => {
    S.bgMode = v;
    if (v !== 'image' || t.bgImage) setTheme({ bgType: v });
    rerender();
  })];
  if (bgMode === 'solid') bgControls.push(colorField('bg-color', 'Colore', 'bgColor'));
  if (bgMode === 'gradient') {
    bgControls.push(h('div', { class: 'grid-2' }, colorField('bg-color', 'Primo colore', 'bgColor'), colorField('bg-color2', 'Secondo colore', 'bgColor2')));
    bgControls.push(rangeField('bg-angle', 'Direzione', 'gradientAngle', 0, 360, '°'));
  }
  if (bgMode === 'image') {
    bgControls.push(imageField({
      id: 'bg-upload', label: 'Immagine di sfondo', wide: true, value: t.bgImage, options: { size: 1600 },
      onChange: (v) => { setTheme({ bgImage: v, bgType: v ? 'image' : 'solid' }); if (!v) S.bgMode = 'solid'; rerender(); },
    }));
    bgControls.push(rangeField('bg-overlay', 'Oscuramento', 'bgOverlay', 0, 85, '%'));
  }

  root.replaceChildren(
    h('section', { class: 'card' }, h('h2', {}, 'Temi pronti'), h('p', { class: 'hint' }, 'Parti da un tema e poi personalizza ogni dettaglio per questo brand.'), presets),
    h('section', { class: 'card' }, h('h2', {}, 'Sfondo'), ...bgControls),
    h('section', { class: 'card' }, h('h2', {}, 'Testi'),
      h('div', { class: 'grid-2' }, fontSelect('title-font', 'Carattere del titolo', 'titleFont'), fontSelect('body-font', 'Carattere di testi e pulsanti', 'font')),
      colorField('text-color', 'Colore del testo', 'textColor'),
      rangeField('title-size', 'Dimensione del titolo', 'titleSize', 18, 48),
      themeSwitch('title-upper', 'Titolo in maiuscolo', 'titleUppercase')),
    h('section', { class: 'card' }, h('h2', {}, 'Logo e social'),
      segment('Forma del logo', t.avatarShape, [['circle', 'Cerchio'], ['rounded', 'Arrotondato'], ['square', 'Quadrato'], ['none', 'Nascosto']], (v) => setTheme({ avatarShape: v })),
      rangeField('avatar-size', 'Dimensione del logo', 'avatarSize', 56, 160),
      segment('Posizione dei social', t.socialPosition, [['top', 'Sopra i link'], ['bottom', 'Sotto i link']], (v) => setTheme({ socialPosition: v }))),
    h('section', { class: 'card' }, h('h2', {}, 'Pulsanti'),
      segment('Stile', t.btnStyle, [['fill', 'Pieno'], ['outline', 'Contorno'], ['glow', 'Neon'], ['glass', 'Vetro'], ['hard', 'Poster']], (v) => setTheme({ btnStyle: v })),
      h('div', { class: 'grid-2' }, colorField('btn-color', 'Colore del pulsante', 'btnColor'), colorField('btn-text', 'Colore del testo', 'btnTextColor')),
      colorField('btn-accent', 'Colore di bordo e accento', 'btnAccent'),
      rangeField('btn-radius', 'Arrotondamento', 'btnRadius', 0, 40),
      rangeField('btn-border', 'Spessore del bordo', 'btnBorder', 0, 6),
      rangeField('btn-shadow', 'Ombra', 'btnShadow', 0, 30),
      rangeField('btn-gap', 'Spazio tra i pulsanti', 'btnGap', 4, 28),
      rangeField('btn-font', 'Dimensione del testo', 'btnFontSize', 12, 22),
      themeSwitch('btn-upper', 'Testo in maiuscolo', 'btnUppercase')),
  );
}

/* ---------- Stats tab ---------- */

const isoDay = (d) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const daysAgo = (n) => isoDay(new Date(Date.now() - n * 86400000));
const fmt = new Intl.NumberFormat('it-IT');

function statsTab() {
  S.statsQ ||= { page: String(S.page.id), range: '30', from: daysAgo(29), to: isoDay(new Date()), gran: 'day' };
  const q = S.statsQ;
  const body = h('div', { id: 'stats-body', style: 'display:flex;flex-direction:column;gap:16px' }, h('div', { class: 'loading' }, 'Caricamento delle statistiche…'));

  const brand = h('select', { id: 'stats-brand', onchange: (e) => { q.page = e.target.value; loadStats(); } },
    h('option', { value: 'all' }, 'Tutti i brand'), S.pages.map((p) => h('option', { value: p.id }, p.title)));
  brand.value = q.page;

  const custom = h('div', { class: 'grid-2', style: 'flex:1 1 280px', hidden: q.range !== 'custom' },
    h('div', { class: 'field' }, h('label', { for: 'stats-from' }, 'Dal'), h('input', { id: 'stats-from', type: 'date', value: q.from, onchange: (e) => { q.from = e.target.value; loadStats(); } })),
    h('div', { class: 'field' }, h('label', { for: 'stats-to' }, 'Al'), h('input', { id: 'stats-to', type: 'date', value: q.to, onchange: (e) => { q.to = e.target.value; loadStats(); } })));

  const out = [
    topline('Statistiche'),
    h('section', { class: 'card' }, h('div', { class: 'filters' },
      h('div', { class: 'field' }, h('label', { for: 'stats-brand' }, 'Brand'), brand),
      segment('Periodo', q.range, [['7', '7 giorni'], ['30', '30 giorni'], ['90', '90 giorni'], ['custom', 'Date']], (v) => {
        q.range = v; custom.hidden = v !== 'custom';
        if (v !== 'custom') { q.from = daysAgo(Number(v) - 1); q.to = isoDay(new Date()); }
        loadStats();
      }),
      segment('Raggruppa per', q.gran, [['day', 'Giorno'], ['week', 'Settimana'], ['month', 'Mese']], (v) => { q.gran = v; if (S.stats) renderStats(); }),
      custom)),
    body,
  ];
  queueMicrotask(loadStats);
  return out;
}

let statsRequest = 0;
async function loadStats() {
  const q = S.statsQ;
  const body = $('#stats-body');
  if (!body) return;
  const ticket = ++statsRequest;
  body.style.opacity = S.stats ? '.5' : '1';
  try {
    const params = new URLSearchParams({ page: q.page, from: q.from, to: q.to });
    const data = await api(`/stats?${params}`);
    if (ticket !== statsRequest) return;
    S.stats = data;
    renderStats();
  } catch (e) {
    body.replaceChildren(h('div', { class: 'empty' }, e.message, ' ', h('button', { class: 'btn', onclick: loadStats }, 'Riprova')));
  }
  body.style.opacity = '1';
}

function bucketKey(day, gran) {
  if (gran === 'month') return day.slice(0, 7);
  if (gran === 'week') {
    const d = new Date(`${day}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
    return d.toISOString().slice(0, 10);
  }
  return day;
}

function bucketLabel(key, gran, long = false) {
  if (gran === 'month') return new Date(`${key}-01T00:00:00Z`).toLocaleDateString('it-IT', { month: long ? 'long' : 'short', year: long ? 'numeric' : '2-digit', timeZone: 'UTC' });
  const text = new Date(`${key}T00:00:00Z`).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  return gran === 'week' && long ? `Settimana dal ${text}` : text;
}

function buckets() {
  const map = new Map();
  for (const d of S.stats.days) {
    const key = bucketKey(d.day, S.statsQ.gran);
    const b = map.get(key) || { key, views: 0, clicks: 0, uniques: 0 };
    b.views += d.views; b.clicks += d.clicks; b.uniques += d.uniques;
    map.set(key, b);
  }
  return [...map.values()];
}

function barList(rows, labelFn) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return h('div', { class: 'bars' }, rows.map((r) => h('div', { class: 'bar-row' },
    h('div', { class: 'name', title: r.title }, labelFn(r)), h('div', { class: 'val' }, fmt.format(r.value)),
    h('div', { class: 'bar-track' }, h('i', { style: `width:${(r.value / max) * 100}%` })))));
}

const SOURCE_NAMES = { diretto: 'Diretto o link salvato', instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook', whatsapp: 'WhatsApp', telegram: 'Telegram', youtube: 'YouTube', google: 'Google', bing: 'Bing', x: 'X' };

function renderStats() {
  const r = S.stats;
  const body = $('#stats-body');
  if (!body) return;
  const ctr = r.totals.views ? (r.totals.clicks / r.totals.views) * 100 : 0;
  const tile = (label, value, title) => h('div', { class: 'tile', title }, h('span', {}, label), h('strong', {}, value));
  const list = buckets();
  const multi = S.statsQ.page === 'all';

  const empty = !r.totals.views && !r.totals.clicks;
  const deviceTotal = r.devices.reduce((a, d) => a + d.hits, 0) || 1;

  const blocks = [
    h('div', { class: 'tiles' },
      tile('Visite', fmt.format(r.totals.views)),
      tile('Visitatori unici', fmt.format(r.totals.uniques), 'Stima: chi torna in giorni diversi conta una volta per ogni giorno.'),
      tile('Clic sui link', fmt.format(r.totals.clicks)),
      tile('Tasso di clic', `${ctr.toLocaleString('it-IT', { maximumFractionDigits: 1 })}%`)),
    empty ? h('div', { class: 'empty' }, 'Nessun dato in questo periodo. I numeri appaiono quando qualcuno apre la pagina pubblica.') : null,
    empty ? null : h('section', { class: 'card' },
      h('h2', {}, 'Andamento'),
      h('div', { class: 'legend' }, h('span', {}, h('i', { style: 'background:var(--cobalt)' }), 'Visite'), h('span', {}, h('i', { style: 'background:var(--red)' }), 'Clic')),
      h('div', { class: 'chart-wrap', id: 'chart' }),
      h('details', {}, h('summary', {}, 'Vedi come tabella'), h('div', { class: 'table-wrap' }, h('table', {},
        h('thead', {}, h('tr', {}, h('th', {}, 'Periodo'), h('th', {}, 'Visite'), h('th', {}, 'Unici'), h('th', {}, 'Clic'), h('th', {}, 'Tasso'))),
        h('tbody', {}, list.map((b) => h('tr', {}, h('td', {}, bucketLabel(b.key, S.statsQ.gran, true)), h('td', {}, fmt.format(b.views)), h('td', {}, fmt.format(b.uniques)), h('td', {}, fmt.format(b.clicks)),
          h('td', {}, b.views ? `${((b.clicks / b.views) * 100).toLocaleString('it-IT', { maximumFractionDigits: 1 })}%` : '–')))))))),
    empty ? null : h('section', { class: 'card' }, h('h2', {}, 'I link più cliccati'),
      r.items.length
        ? barList(r.items.slice(0, 15).map((i) => ({ title: i.title, page: i.page, value: i.clicks })), (i) => [i.title, multi ? h('small', {}, ` · ${i.page}`) : null].flat())
        : h('p', { class: 'hint' }, 'Ancora nessun clic in questo periodo.')),
    empty ? null : h('div', { class: 'two-col' },
      h('section', { class: 'card' }, h('h2', {}, 'Da dove arrivano'),
        barList(r.sources.slice(0, 8).map((s) => ({ title: s.key, value: s.hits })), (s) => SOURCE_NAMES[s.title] || s.title),
        h('p', { class: 'hint' }, 'Le app non segnalano sempre la provenienza, quindi una parte può risultare come Diretto.')),
      h('section', { class: 'card' }, h('h2', {}, 'Dispositivi'),
        barList(r.devices.map((d) => ({ title: d.key, value: d.hits })), (d) => `${d.title === 'mobile' ? 'Telefono e tablet' : 'Computer'} · ${Math.round((d.value / deviceTotal) * 100)}%`))),
    h('p', { class: 'hint' }, 'Statistiche senza cookie: gli indirizzi IP non vengono salvati e i visitatori unici si calcolano con un codice anonimo cancellato ogni giorno. Le tue visite da questo browser non vengono contate.'),
  ];
  body.replaceChildren(...blocks.filter(Boolean));
  if (!empty) drawChartInto();
}

function niceMax(v) {
  if (v <= 4) return 4;
  const mag = 10 ** Math.floor(Math.log10(v));
  const n = v / mag;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 4 ? 4 : n <= 5 ? 5 : 10) * mag;
}

function drawChartInto() {
  const wrap = $('#chart');
  if (!wrap) return;
  const list = buckets();
  const width = Math.max(280, wrap.clientWidth);
  const height = 240;
  const m = { top: 12, right: 12, bottom: 26, left: 40 };
  const iw = width - m.left - m.right;
  const ih = height - m.top - m.bottom;
  const max = niceMax(Math.max(1, ...list.map((b) => Math.max(b.views, b.clicks))));
  const x = (i) => m.left + (list.length < 2 ? iw / 2 : (i / (list.length - 1)) * iw);
  const y = (v) => m.top + ih - (v / max) * ih;
  const path = (k) => list.map((b, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(b[k]).toFixed(1)}`).join('');
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const labelEvery = Math.max(1, Math.ceil(list.length / Math.max(2, Math.floor(iw / 72))));
  const showLabel = (i) => i === list.length - 1 ? (list.length - 1) % labelEvery === 0 || labelEvery === 1 : i % labelEvery === 0;
  const dots = (k, color) => (list.length <= 45 ? list.map((b, i) => `<circle cx="${x(i)}" cy="${y(b[k])}" r="${list.length > 14 ? 2 : 3.5}" fill="${color}" stroke="#fff" stroke-width="1.5"/>`).join('') : '');
  const textColor = '#5a6078';
  const grid = ticks.map((t) => `<line x1="${m.left}" x2="${width - m.right}" y1="${y(t)}" y2="${y(t)}" stroke="#e7e9f2"/><text x="${m.left - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11.5" fill="${textColor}">${fmt.format(Math.round(t))}</text>`).join('');
  const labels = list.map((b, i) => (!showLabel(i) ? '' : `<text x="${x(i)}" y="${height - 7}" text-anchor="${i === 0 && list.length > 1 ? 'start' : i === list.length - 1 && list.length > 1 ? 'end' : 'middle'}" font-size="11.5" fill="${textColor}">${bucketLabel(b.key, S.statsQ.gran)}</text>`)).join('');
  wrap.innerHTML = `<svg viewBox="0 0 ${width} ${height}" height="${height}" role="img" aria-label="Andamento di visite e clic">${grid}${labels}
    <path d="${path('views')}" fill="none" stroke="#2f4bc7" stroke-width="2" stroke-linejoin="round"/><path d="${path('clicks')}" fill="none" stroke="#d92b27" stroke-width="2" stroke-linejoin="round"/>
    ${dots('views', '#2f4bc7')}${dots('clicks', '#d92b27')}
    <line id="cross" y1="${m.top}" y2="${m.top + ih}" stroke="#12162b" stroke-opacity=".35" visibility="hidden"/>
    <rect id="hit" x="${m.left}" y="${m.top}" width="${iw}" height="${ih}" fill="transparent"/></svg>`;
  const tip = h('div', { class: 'chart-tip', hidden: true });
  wrap.append(tip);
  const svgEl = wrap.querySelector('svg');
  const cross = wrap.querySelector('#cross');
  const move = (e) => {
    const box = svgEl.getBoundingClientRect();
    const px = ((e.clientX - box.left) / box.width) * width;
    const i = list.length < 2 ? 0 : Math.max(0, Math.min(list.length - 1, Math.round(((px - m.left) / iw) * (list.length - 1))));
    const b = list[i];
    cross.setAttribute('x1', x(i)); cross.setAttribute('x2', x(i)); cross.setAttribute('visibility', 'visible');
    tip.hidden = false;
    tip.replaceChildren(h('strong', {}, bucketLabel(b.key, S.statsQ.gran, true)), h('br'), `${fmt.format(b.views)} visite · ${fmt.format(b.uniques)} unici · ${fmt.format(b.clicks)} clic`);
    const left = (x(i) / width) * box.width;
    tip.style.left = `${Math.max(0, Math.min(box.width - tip.offsetWidth, left - tip.offsetWidth / 2))}px`;
  };
  const hit = wrap.querySelector('#hit');
  hit.addEventListener('pointermove', move);
  hit.addEventListener('pointerdown', move);
  hit.addEventListener('pointerleave', () => { tip.hidden = true; cross.setAttribute('visibility', 'hidden'); });
}

/* ---------- Settings tab ---------- */

function settingsTab() {
  const p = S.page;
  const slug = h('input', { id: 'page-slug', type: 'text', value: p.slug, maxlength: 60, autocapitalize: 'off', spellcheck: 'false' });
  const slugError = h('p', { class: 'form-error', hidden: true, role: 'alert' });
  const saveSlug = h('button', {
    class: 'btn', type: 'button', id: 'save-slug',
    onclick: async () => {
      slugError.hidden = true; saveSlug.disabled = true;
      try {
        const saved = await api(`/pages/${p.id}`, 'PUT', { slug: slug.value });
        Object.assign(S.page, saved, { items: S.page.items });
        mergePageSummary(saved);
        renderTab();
        toast('Indirizzo aggiornato. I vecchi link con il nome precedente non funzionano più.');
      } catch (e) { slugError.textContent = e.message; slugError.hidden = false; saveSlug.disabled = false; }
    },
  }, 'Salva indirizzo');

  const homeBtn = p.is_home
    ? h('p', { class: 'hint' }, 'Questo brand si apre quando qualcuno visita l’indirizzo principale del sito.')
    : h('button', { class: 'btn', type: 'button', onclick: async () => {
      try {
        await saving(() => api(`/pages/${p.id}/home`, 'POST', {}));
        S.pages = (await api('/pages')).pages;
        Object.assign(S.page, S.pages.find((x) => x.id === p.id), { items: S.page.items });
        syncBrandSelect(); renderTab(); toast('Pagina principale aggiornata');
      } catch { /* reported */ }
    } }, 'Usa come pagina principale');

  const trackingUrl = `${pageUrl(p)}?utm_source=instagram`;

  return [
    topline('Impostazioni'),
    h('section', { class: 'card' }, h('h2', {}, 'Pubblicazione'),
      h('div', { class: 'toggle-row' },
        h('div', {}, h('strong', {}, 'Pagina online'), h('p', { class: 'hint' }, 'Se è spenta, chi apre il link vede un messaggio di pagina non disponibile.')),
        h('label', { class: 'switch' }, h('input', { id: 'page-published', type: 'checkbox', 'aria-label': 'Pagina online', checked: !!p.published, disabled: !!p.is_home, onchange: async (e) => { try { await savePageNow({ published: e.target.checked }); } catch { e.target.checked = !e.target.checked; } } }), h('span', {}))),
      homeBtn),
    h('section', { class: 'card' }, h('h2', {}, 'Indirizzo della pagina'),
      h('div', { class: 'field' }, h('label', { for: 'page-slug' }, `${location.host}/`), slug),
      slugError,
      h('div', {}, saveSlug)),
    h('section', { class: 'card' }, h('h2', {}, 'Anteprima su Google e social'),
      h('div', { class: 'field' }, h('label', { for: 'page-seo' }, 'Descrizione'),
        h('textarea', { id: 'page-seo', maxlength: 300, placeholder: p.bio, value: p.seo_description, oninput: (e) => savePageSoon({ seo_description: e.target.value }) })),
      h('p', { class: 'hint' }, 'Se la lasci vuota viene usata la descrizione del profilo. L’immagine condivisa è il logo.')),
    h('section', { class: 'card' }, h('h2', {}, 'Misurare una campagna'),
      h('p', { class: 'hint' }, 'Aggiungi utm_source al link per vedere nelle statistiche da dove arrivano le visite. Esempio per la bio di Instagram:'),
      h('div', { class: 'url-box' }, h('code', {}, trackingUrl), h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Copia link con tracciamento', onclick: () => copyText(trackingUrl) }, raw(UI.copy)))),
    h('section', { class: 'card' }, h('h2', {}, 'Accesso'),
      h('p', { class: 'hint' }, 'Oggi esiste un solo amministratore. La password si cambia su Cloudflare, nel secret ADMIN_PASSWORD. Dopo il cambio tutti i dispositivi devono accedere di nuovo.')),
    h('section', { class: 'card' }, h('h2', {}, 'Elimina questo brand'),
      h('p', { class: 'hint' }, p.is_home ? 'Questa è la pagina principale. Scegli prima un altro brand come principale.' : 'Cancella definitivamente la pagina, i link, le immagini e le statistiche di questo brand.'),
      h('div', {}, h('button', { class: 'btn danger', type: 'button', disabled: !!p.is_home, onclick: deleteBrand }, raw(UI.trash), 'Elimina brand'))),
  ];
}

async function deleteBrand() {
  const p = S.page;
  const yes = await confirmDialog(`Eliminare ${p.title}?`, 'La pagina, i link, le immagini e le statistiche verranno cancellati definitivamente.', 'Elimina definitivamente');
  if (!yes) return;
  try {
    await saving(() => api(`/pages/${p.id}`, 'DELETE'));
    S.pages = S.pages.filter((x) => x.id !== p.id);
    S.tab = 'content';
    await selectPage(S.pages[0].id);
    toast('Brand eliminato');
  } catch { /* reported */ }
}

/* ---------- Dialogs ---------- */

function confirmDialog(title, message, action) {
  return new Promise((resolve) => {
    const finish = (v) => { d.close(); d.remove(); resolve(v); };
    const d = h('dialog', { oncancel: (e) => { e.preventDefault(); finish(false); } },
      h('div', { class: 'dialog-body' }, h('h2', {}, title), h('p', { class: 'hint' }, message),
        h('div', { class: 'dialog-actions' },
          h('button', { class: 'btn', type: 'button', onclick: () => finish(false) }, 'Annulla'),
          h('button', { class: 'btn danger', type: 'button', id: 'confirm-yes', onclick: () => finish(true) }, action))));
    document.body.append(d);
    d.showModal();
  });
}

const slugify = (v) => v.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 40);

function newBrandDialog() {
  let edited = false;
  const title = h('input', { id: 'new-title', type: 'text', required: true, maxlength: 120, oninput: () => { if (!edited) slug.value = slugify(title.value); } });
  const slug = h('input', { id: 'new-slug', type: 'text', required: true, maxlength: 60, autocapitalize: 'off', spellcheck: 'false', oninput: () => { edited = true; } });
  const error = h('p', { class: 'form-error', hidden: true, role: 'alert' });
  const submit = h('button', { class: 'btn primary', type: 'submit', id: 'new-submit' }, 'Crea brand');
  const d = h('dialog', {},
    h('form', {
      method: 'dialog',
      onsubmit: async (e) => {
        e.preventDefault();
        submit.disabled = true; error.hidden = true;
        try {
          const page = await api('/pages', 'POST', { title: title.value, slug: slug.value });
          S.pages.push(page);
          d.close(); d.remove();
          S.tab = 'content';
          await selectPage(page.id);
          toast('Brand creato. Aggiungi i contenuti e mettilo online quando è pronto.');
        } catch (err) { error.textContent = err.message; error.hidden = false; submit.disabled = false; }
      },
    },
    h('h2', {}, 'Nuovo brand'),
    h('div', { class: 'field' }, h('label', { for: 'new-title' }, 'Nome'), title),
    h('div', { class: 'field' }, h('label', { for: 'new-slug' }, `Indirizzo: ${location.host}/`), slug),
    error,
    h('div', { class: 'dialog-actions' },
      h('button', { class: 'btn', type: 'button', onclick: () => { d.close(); d.remove(); } }, 'Annulla'), submit)));
  document.body.append(d);
  d.showModal();
  title.focus();
}

async function logout() {
  await flushAll();
  try { await api('/logout', 'POST', {}); } catch { /* still leave */ }
  S.page = null;
  showLogin();
}

boot();
