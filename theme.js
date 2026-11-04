// Shared by the server (public page) and the dashboard (live preview).
export const FONTS = {
  system: { name: 'Sistema (senza Google Fonts)', q: null, stack: "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" },
  inter: { name: 'Inter', q: 'Inter:wght@400;600;800', stack: "'Inter',system-ui,sans-serif" },
  poppins: { name: 'Poppins', q: 'Poppins:wght@400;600;800', stack: "'Poppins',system-ui,sans-serif" },
  montserrat: { name: 'Montserrat', q: 'Montserrat:wght@400;600;800', stack: "'Montserrat',system-ui,sans-serif" },
  rubik: { name: 'Rubik', q: 'Rubik:wght@400;600;800', stack: "'Rubik',system-ui,sans-serif" },
  dmsans: { name: 'DM Sans', q: 'DM+Sans:wght@400;600;800', stack: "'DM Sans',system-ui,sans-serif" },
  syne: { name: 'Syne', q: 'Syne:wght@400;600;800', stack: "'Syne',system-ui,sans-serif" },
  unbounded: { name: 'Unbounded', q: 'Unbounded:wght@400;600;800', stack: "'Unbounded',system-ui,sans-serif" },
  archivo: { name: 'Archivo Black', q: 'Archivo+Black', stack: "'Archivo Black',Impact,sans-serif" },
  anton: { name: 'Anton', q: 'Anton', stack: "'Anton',Impact,sans-serif" },
  bebas: { name: 'Bebas Neue', q: 'Bebas+Neue', stack: "'Bebas Neue',Impact,sans-serif" },
  oswald: { name: 'Oswald', q: 'Oswald:wght@400;600', stack: "'Oswald',Impact,sans-serif" },
  playfair: { name: 'Playfair Display', q: 'Playfair+Display:wght@400;700', stack: "'Playfair Display',Georgia,serif" },
  caveat: { name: 'Caveat', q: 'Caveat:wght@500;700', stack: "'Caveat',cursive" },
  marker: { name: 'Permanent Marker', q: 'Permanent+Marker', stack: "'Permanent Marker',cursive" },
};

export const DEFAULT_THEME = {
  bgType: 'solid', // solid | gradient | image
  bgColor: '#0b0d17',
  bgColor2: '#2a0d16',
  gradientAngle: 180,
  bgImage: null,
  bgOverlay: 40,
  textColor: '#ffffff',
  font: 'inter',
  titleFont: 'inter',
  titleSize: 26,
  titleUppercase: false,
  avatarShape: 'circle', // circle | rounded | square | none
  avatarSize: 96,
  socialPosition: 'top', // top | bottom
  btnStyle: 'glow', // fill | outline | glow | glass | hard
  btnColor: '#0f1120',
  btnTextColor: '#ffffff',
  btnAccent: '#e5322d',
  btnRadius: 28,
  btnUppercase: true,
  btnGap: 12,
  btnFontSize: 14,
  btnBorder: 2,
  btnShadow: 14,
};

const RAW_PRESETS = [
  { id: 'f3dez', name: 'F3DEZ Neon', theme: { ...DEFAULT_THEME } },
  { id: 'club', name: 'Club viola', theme: { ...DEFAULT_THEME, bgType: 'gradient', bgColor: '#160b33', bgColor2: '#5b1a8c', gradientAngle: 160, btnStyle: 'glass', btnColor: '#ffffff', btnAccent: '#ffffff', font: 'syne', btnRadius: 16, btnUppercase: false } },
  { id: 'tramonto', name: 'Tramonto', theme: { ...DEFAULT_THEME, bgType: 'gradient', bgColor: '#ff5e3a', bgColor2: '#ffb347', gradientAngle: 200, textColor: '#2b0f05', btnStyle: 'fill', btnColor: '#2b0f05', btnTextColor: '#fff4e6', btnAccent: '#2b0f05', font: 'poppins', btnRadius: 40, btnUppercase: false } },
  { id: 'mare', name: 'Mare', theme: { ...DEFAULT_THEME, bgColor: '#e8f6fb', textColor: '#06364a', btnStyle: 'fill', btnColor: '#0a7ea4', btnTextColor: '#ffffff', btnAccent: '#0a7ea4', font: 'rubik', btnRadius: 14, btnUppercase: false } },
  { id: 'poster', name: 'Poster', theme: { ...DEFAULT_THEME, bgColor: '#ffe600', textColor: '#111111', btnStyle: 'hard', btnColor: '#ffffff', btnTextColor: '#111111', btnAccent: '#111111', font: 'anton', btnRadius: 0, btnFontSize: 17, titleSize: 34, avatarShape: 'square' } },
  { id: 'pulito', name: 'Pulito', theme: { ...DEFAULT_THEME, bgColor: '#ffffff', textColor: '#17171c', btnStyle: 'outline', btnColor: '#ffffff', btnTextColor: '#17171c', btnAccent: '#17171c', font: 'dmsans', btnRadius: 10, btnUppercase: false } },
];

export const PRESETS = RAW_PRESETS.map((p) => ({ ...p, theme: { ...p.theme, titleFont: p.theme.font } }));

const COLOR_KEYS = ['bgColor', 'bgColor2', 'textColor', 'btnColor', 'btnTextColor', 'btnAccent'];
const ENUMS = {
  bgType: ['solid', 'gradient', 'image'],
  avatarShape: ['circle', 'rounded', 'square', 'none'],
  socialPosition: ['top', 'bottom'],
  btnStyle: ['fill', 'outline', 'glow', 'glass', 'hard'],
};
const RANGES = {
  gradientAngle: [0, 360], bgOverlay: [0, 85], titleSize: [18, 48], avatarSize: [56, 160],
  btnRadius: [0, 40], btnGap: [4, 28], btnFontSize: [12, 22], btnBorder: [0, 6], btnShadow: [0, 30],
};
export const IMAGE_ID = /^[a-f0-9-]{36}$/;

// Every value reaches a <style> tag, so anything unexpected falls back to the default.
export function sanitizeTheme(input) {
  const t = { ...DEFAULT_THEME };
  const src = input && typeof input === 'object' ? input : {};
  for (const k of COLOR_KEYS) if (/^#[0-9a-fA-F]{6}$/.test(src[k] ?? '')) t[k] = src[k].toLowerCase();
  for (const k in ENUMS) if (ENUMS[k].includes(src[k])) t[k] = src[k];
  for (const k in RANGES) {
    const n = Number(src[k]);
    if (src[k] !== undefined && src[k] !== null && src[k] !== '' && Number.isFinite(n)) {
      t[k] = Math.min(RANGES[k][1], Math.max(RANGES[k][0], Math.round(n)));
    }
  }
  if (FONTS[src.font]) t.font = src.font;
  if (FONTS[src.titleFont]) t.titleFont = src.titleFont;
  else if (FONTS[src.font]) t.titleFont = src.font;
  t.titleUppercase = !!src.titleUppercase;
  t.btnUppercase = src.btnUppercase === undefined ? t.btnUppercase : !!src.btnUppercase;
  t.bgImage = IMAGE_ID.test(src.bgImage ?? '') ? src.bgImage : null;
  if (t.bgType === 'image' && !t.bgImage) t.bgType = 'solid';
  return t;
}

export function fontHref(theme) {
  const keys = [...new Set([theme.font, theme.titleFont])].filter((k) => FONTS[k]?.q);
  if (!keys.length) return 'data:text/css,'; // system fonts only: nothing is requested from Google
  const families = keys.map((k) => `family=${FONTS[k].q}`).join('&');
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

function contrastOn(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? '#111111' : '#ffffff';
}

function buttonCss(t) {
  const a = t.btnAccent;
  const w = t.btnBorder;
  const soft = t.btnShadow ? `box-shadow:0 ${Math.round(t.btnShadow / 3)}px ${t.btnShadow}px #00000055;` : '';
  switch (t.btnStyle) {
    case 'outline':
      return `background:transparent;color:${t.btnTextColor};border:${Math.max(1, w)}px solid ${a};${soft}`;
    case 'glow':
      return `background:${t.btnColor};color:${t.btnTextColor};border:${w}px solid ${a};box-shadow:0 ${Math.round(t.btnShadow / 4)}px ${t.btnShadow}px ${a}99;`;
    case 'glass':
      return `background:${t.btnColor}26;color:${t.btnTextColor};border:${w}px solid ${a}55;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);${soft}`;
    case 'hard':
      return `background:${t.btnColor};color:${t.btnTextColor};border:${Math.max(1, w)}px solid ${a};box-shadow:${Math.round(t.btnShadow / 3)}px ${Math.round(t.btnShadow / 3)}px 0 ${a};`;
    default:
      return `background:${t.btnColor};color:${t.btnTextColor};border:${w}px solid ${a};${soft}`;
  }
}

export function themeCss(input) {
  const t = sanitizeTheme(input);
  const font = (FONTS[t.font] || FONTS.inter).stack;
  const titleFont = (FONTS[t.titleFont] || FONTS.inter).stack;
  let layers = '';
  if (t.bgType === 'gradient') {
    layers = `body::before{content:"";position:fixed;inset:0;z-index:-2;background:linear-gradient(${t.gradientAngle}deg,${t.bgColor},${t.bgColor2})}`;
  } else if (t.bgType === 'image' && t.bgImage) {
    layers = `body::before{content:"";position:fixed;inset:0;z-index:-2;background:${t.bgColor} url(/img/${t.bgImage}) center/cover no-repeat}` +
      `body::after{content:"";position:fixed;inset:0;z-index:-1;background:#000;opacity:${t.bgOverlay / 100}}`;
  }
  const avatarRadius = { circle: '50%', rounded: '22%', square: '0', none: '0' }[t.avatarShape];
  return `html{background:${t.bgColor}}body{color:${t.textColor};font-family:${font}}${layers}` +
    `.avatar{width:${t.avatarSize}px;height:${t.avatarSize}px;border-radius:${avatarRadius};${t.avatarShape === 'none' ? 'display:none;' : ''}}` +
    `h1{font-family:${titleFont};font-size:${t.titleSize}px;${t.titleUppercase ? 'text-transform:uppercase;' : ''}}.socials{order:${t.socialPosition === 'bottom' ? 4 : 2}}` +
    `.links{gap:${t.btnGap}px}` +
    `.btn,.event{${buttonCss(t)}border-radius:${t.btnRadius}px;font-size:${t.btnFontSize}px;${t.btnUppercase ? 'text-transform:uppercase;' : ''}}` +
    `.thumb{border-radius:${Math.max(0, t.btnRadius - 6)}px}` +
    `.cta,.badge{background:${t.btnAccent};color:${contrastOn(t.btnAccent)};border-radius:${Math.max(6, t.btnRadius - 8)}px}`;
}
