import { themeCss, fontHref, sanitizeTheme } from '../public/static/theme.js';
import { ICONS } from '../public/static/icons.js';
import { visibleItems } from '../public/static/visibility.js';

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const SOCIAL_ORDER = ['instagram', 'tiktok', 'facebook', 'whatsapp', 'youtube', 'x', 'telegram', 'spotify', 'snapchat', 'linkedin', 'website', 'email'];

function autoIcon(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (u.protocol === 'whatsapp:' || host === 'wa.me' || host.endsWith('whatsapp.com')) return 'whatsapp';
    if (host === 't.me' || host === 'telegram.me') return 'telegram';
    if (host.endsWith('instagram.com')) return 'instagram';
    if (host.endsWith('tiktok.com')) return 'tiktok';
    if (host.endsWith('facebook.com')) return 'facebook';
    if (host.endsWith('youtube.com') || host === 'youtu.be') return 'youtube';
    if (host.endsWith('spotify.com')) return 'spotify';
  } catch { /* the stored URL may be a mailto: or similar */ }
  return null;
}

const BASE_CSS = `*{box-sizing:border-box}html,body{margin:0;min-height:100%}body{-webkit-font-smoothing:antialiased;position:relative;z-index:0}
.wrap{display:flex;flex-direction:column;align-items:center;width:100%;max-width:600px;margin:0 auto;padding-block:48px 56px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));min-height:100vh}
.profile{order:1;display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;width:100%}
.avatar{object-fit:cover;display:block}h1{margin:6px 0 0;line-height:1.15;font-weight:800;text-wrap:balance;overflow-wrap:anywhere}
.bio{margin:0;font-size:15px;line-height:1.45;max-width:46ch;white-space:pre-line;opacity:.92;overflow-wrap:anywhere}
.socials{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-top:14px;width:100%}
.socials a{display:grid;place-items:center;width:44px;height:44px;color:inherit;font-size:24px;border-radius:50%;transition:transform .15s}
.socials a:hover{transform:scale(1.12)}.socials svg{display:block;width:1em;height:1em}
.links{order:3;display:flex;flex-direction:column;width:100%;margin-top:24px}
.section-title{margin:14px 0 2px;text-align:center;font-size:14px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;opacity:.85;overflow-wrap:anywhere}
.btn{position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:60px;padding:10px 62px;text-align:center;text-decoration:none;font-weight:600;line-height:1.2;transition:transform .15s}
.btn:hover{transform:translateY(-2px)}.btn:active{transform:translateY(0)}
.btn span{overflow-wrap:anywhere}.btn small{display:block;margin-top:3px;font-size:.78em;font-weight:400;opacity:.72;text-transform:none}
.thumb{position:absolute;left:7px;top:50%;width:44px;height:44px;transform:translateY(-50%);object-fit:cover;display:block}
.thumb-icon{display:grid;place-items:center;font-size:27px}.thumb-icon svg{width:1em;height:1em}
.share{position:fixed;top:max(12px,env(safe-area-inset-top,0px));right:max(12px,env(safe-area-inset-right,0px));width:42px;height:42px;border:0;border-radius:50%;background:#00000059;color:#fff;cursor:pointer;display:grid;place-items:center;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.share svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#000c;color:#fff;font-size:14px;padding:9px 16px;border-radius:99px}
.btn.pinned{min-height:74px;font-weight:800;font-size:1.08em}.btn.sold{cursor:default;opacity:.78}.btn.sold:hover{transform:none}
.badge{display:inline-block;padding:3px 9px;font-size:11px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap}.btn .badge{margin-top:5px}
.event{overflow:hidden;display:flex;flex-direction:column;text-align:left;font-weight:400}.event img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}
.event-body{display:flex;flex-direction:column;gap:6px;padding:14px 16px 16px}.event-date{font-size:.86em;font-weight:600;opacity:.8}.event h3{margin:0;font-size:1.3em;line-height:1.15;font-weight:800;overflow-wrap:anywhere}.event p{margin:0;font-size:.95em;line-height:1.35;opacity:.85;text-transform:none;overflow-wrap:anywhere}
.cta{display:block;margin-top:8px;padding:12px;text-align:center;text-decoration:none;font-weight:800;transition:transform .15s}a.cta:hover{transform:translateY(-1px)}.event .badge{align-self:flex-start;margin-top:8px;padding:8px 14px;font-size:13px}
a:focus-visible,button:focus-visible{outline:3px solid currentColor;outline-offset:3px}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}@media (max-width:420px){.wrap{padding-block-start:36px}.btn{padding-inline:58px}}`;

const SHARE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';

export function renderPage(page, items, { preview = false, timeZone = 'Europe/Madrid', origin = '' } = {}) {
  const theme = sanitizeTheme(preview ? (page.theme_draft || page.theme) : page.theme);
  const socials = page.socials || {};
  const description = page.seo_description || page.bio || page.title;
  const list = visibleItems(items);
  const dateFormat = new Intl.DateTimeFormat('en-GB', { timeZone, weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  const linksHtml = list.map((item) => {
    if (item.kind === 'section') return `<h2 class="section-title">${esc(item.title)}</h2>`;
    const href = preview ? esc(item.url) : `/go/${item.id}`;
    const external = preview ? 'target="_blank" ' : '';

    if (item.kind === 'event') {
      const action = item.sold_out
        ? '<span class="badge">Sold out</span>'
        : item.url ? `<a class="cta" href="${href}" ${external}rel="noopener">${esc(item.cta_label || 'Get Tickets')}</a>` : '';
      return `<article class="event">${item.thumb_image ? `<img src="/img/${esc(item.thumb_image)}" alt="" loading="lazy">` : ''}<div class="event-body">` +
        `${item.event_date ? `<div class="event-date">${esc(dateFormat.format(new Date(item.event_date)))}</div>` : ''}` +
        `<h3>${esc(item.title)}</h3>${item.subtitle ? `<p>${esc(item.subtitle)}</p>` : ''}${action}</div></article>`;
    }

    const icon = item.icon === 'none' ? null : (ICONS[item.icon] ? item.icon : autoIcon(item.url));
    const thumb = item.thumb_image
      ? `<img class="thumb" src="/img/${esc(item.thumb_image)}" alt="" loading="lazy">`
      : icon ? `<span class="thumb thumb-icon">${ICONS[icon]}</span>` : '';
    const label = `${thumb}<span>${esc(item.title || item.url)}${item.subtitle ? `<small>${esc(item.subtitle)}</small>` : ''}</span>`;
    const pinned = item.pinned ? ' pinned' : '';
    if (item.sold_out) return `<div class="btn sold${pinned}">${label}<span class="badge">Sold out</span></div>`;
    return `<a class="btn${pinned}" href="${href}" ${external}rel="noopener">${label}</a>`;
  }).join('');

  const socialHtml = SOCIAL_ORDER.filter((k) => socials[k]).map((k) =>
    `<a href="${esc(socials[k])}" target="_blank" rel="noopener" aria-label="${esc(k)}">${ICONS[k]}</a>`).join('');

  return `<!doctype html><html lang="it"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(page.title)}</title><meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:url" content="${esc(origin)}/${esc(page.slug)}"><link rel="canonical" href="${esc(origin)}/${esc(page.slug)}"><meta name="twitter:card" content="summary">
${page.avatar_image ? `<meta property="og:image" content="${esc(origin)}/img/${esc(page.avatar_image)}"><link rel="icon" href="/img/${esc(page.avatar_image)}">` : ''}
${preview ? '<meta name="robots" content="noindex">' : ''}
<link id="font" rel="stylesheet" href="${esc(fontHref(theme))}">
<style>${BASE_CSS}</style><style id="theme">${themeCss(theme)}</style></head><body>
${preview ? '' : `<button class="share" type="button" aria-label="Condividi">${SHARE_ICON}</button>`}
<main class="wrap"><header class="profile">
${page.avatar_image ? `<img class="avatar" src="/img/${esc(page.avatar_image)}" alt="${esc(page.title)}">` : ''}
<h1>${esc(page.title)}</h1>${page.bio ? `<p class="bio">${esc(page.bio)}</p>` : ''}</header>
${socialHtml ? `<nav class="socials" aria-label="Social">${socialHtml}</nav>` : ''}
<section class="links">${linksHtml}</section></main>
${preview ? '' : `<script>document.querySelector('.share').addEventListener('click',async()=>{const u=location.href;try{if(navigator.share){await navigator.share({title:document.title,url:u});return}await navigator.clipboard.writeText(u);const t=document.createElement('div');t.className='toast';t.textContent='Link copiato';document.body.append(t);setTimeout(()=>t.remove(),1800)}catch(e){}})</script>`}
</body></html>`;
}

export function renderNotFound() {
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pagina non trovata</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0d17;color:#fff;font:16px system-ui,sans-serif;text-align:center;padding:24px}</style></head><body><p>Questa pagina non esiste o non è più disponibile.</p></body></html>`;
}

export function renderAdminShell() {
  return `<!doctype html><html lang="it"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow">
<title>ESL Links</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap"><link rel="stylesheet" href="/static/admin.css">
</head><body><div id="app"></div><div id="toasts" aria-live="polite"></div><script type="module" src="/static/admin.js"></script></body></html>`;
}
