// public/static/theme.js
var FONTS = {
  system: { name: "Sistema (senza Google Fonts)", q: null, stack: "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" },
  inter: { name: "Inter", q: "Inter:wght@400;600;800", stack: "'Inter',system-ui,sans-serif" },
  poppins: { name: "Poppins", q: "Poppins:wght@400;600;800", stack: "'Poppins',system-ui,sans-serif" },
  montserrat: { name: "Montserrat", q: "Montserrat:wght@400;600;800", stack: "'Montserrat',system-ui,sans-serif" },
  rubik: { name: "Rubik", q: "Rubik:wght@400;600;800", stack: "'Rubik',system-ui,sans-serif" },
  dmsans: { name: "DM Sans", q: "DM+Sans:wght@400;600;800", stack: "'DM Sans',system-ui,sans-serif" },
  syne: { name: "Syne", q: "Syne:wght@400;600;800", stack: "'Syne',system-ui,sans-serif" },
  unbounded: { name: "Unbounded", q: "Unbounded:wght@400;600;800", stack: "'Unbounded',system-ui,sans-serif" },
  archivo: { name: "Archivo Black", q: "Archivo+Black", stack: "'Archivo Black',Impact,sans-serif" },
  anton: { name: "Anton", q: "Anton", stack: "'Anton',Impact,sans-serif" },
  bebas: { name: "Bebas Neue", q: "Bebas+Neue", stack: "'Bebas Neue',Impact,sans-serif" },
  oswald: { name: "Oswald", q: "Oswald:wght@400;600", stack: "'Oswald',Impact,sans-serif" },
  playfair: { name: "Playfair Display", q: "Playfair+Display:wght@400;700", stack: "'Playfair Display',Georgia,serif" },
  caveat: { name: "Caveat", q: "Caveat:wght@500;700", stack: "'Caveat',cursive" },
  marker: { name: "Permanent Marker", q: "Permanent+Marker", stack: "'Permanent Marker',cursive" }
};
var DEFAULT_THEME = {
  bgType: "solid",
  // solid | gradient | image
  bgColor: "#0b0d17",
  bgColor2: "#2a0d16",
  gradientAngle: 180,
  bgImage: null,
  bgOverlay: 40,
  textColor: "#ffffff",
  font: "inter",
  titleFont: "inter",
  titleSize: 26,
  titleUppercase: false,
  avatarShape: "circle",
  // circle | rounded | square | none
  avatarSize: 96,
  socialPosition: "top",
  // top | bottom
  btnStyle: "glow",
  // fill | outline | glow | glass | hard
  btnColor: "#0f1120",
  btnTextColor: "#ffffff",
  btnAccent: "#e5322d",
  btnRadius: 28,
  btnUppercase: true,
  btnGap: 12,
  btnFontSize: 14,
  btnBorder: 2,
  btnShadow: 14
};
var RAW_PRESETS = [
  { id: "f3dez", name: "F3DEZ Neon", theme: { ...DEFAULT_THEME } },
  { id: "club", name: "Club viola", theme: { ...DEFAULT_THEME, bgType: "gradient", bgColor: "#160b33", bgColor2: "#5b1a8c", gradientAngle: 160, btnStyle: "glass", btnColor: "#ffffff", btnAccent: "#ffffff", font: "syne", btnRadius: 16, btnUppercase: false } },
  { id: "tramonto", name: "Tramonto", theme: { ...DEFAULT_THEME, bgType: "gradient", bgColor: "#ff5e3a", bgColor2: "#ffb347", gradientAngle: 200, textColor: "#2b0f05", btnStyle: "fill", btnColor: "#2b0f05", btnTextColor: "#fff4e6", btnAccent: "#2b0f05", font: "poppins", btnRadius: 40, btnUppercase: false } },
  { id: "mare", name: "Mare", theme: { ...DEFAULT_THEME, bgColor: "#e8f6fb", textColor: "#06364a", btnStyle: "fill", btnColor: "#0a7ea4", btnTextColor: "#ffffff", btnAccent: "#0a7ea4", font: "rubik", btnRadius: 14, btnUppercase: false } },
  { id: "poster", name: "Poster", theme: { ...DEFAULT_THEME, bgColor: "#ffe600", textColor: "#111111", btnStyle: "hard", btnColor: "#ffffff", btnTextColor: "#111111", btnAccent: "#111111", font: "anton", btnRadius: 0, btnFontSize: 17, titleSize: 34, avatarShape: "square" } },
  { id: "pulito", name: "Pulito", theme: { ...DEFAULT_THEME, bgColor: "#ffffff", textColor: "#17171c", btnStyle: "outline", btnColor: "#ffffff", btnTextColor: "#17171c", btnAccent: "#17171c", font: "dmsans", btnRadius: 10, btnUppercase: false } }
];
var PRESETS = RAW_PRESETS.map((p) => ({ ...p, theme: { ...p.theme, titleFont: p.theme.font } }));
var COLOR_KEYS = ["bgColor", "bgColor2", "textColor", "btnColor", "btnTextColor", "btnAccent"];
var ENUMS = {
  bgType: ["solid", "gradient", "image"],
  avatarShape: ["circle", "rounded", "square", "none"],
  socialPosition: ["top", "bottom"],
  btnStyle: ["fill", "outline", "glow", "glass", "hard"]
};
var RANGES = {
  gradientAngle: [0, 360],
  bgOverlay: [0, 85],
  titleSize: [18, 48],
  avatarSize: [56, 160],
  btnRadius: [0, 40],
  btnGap: [4, 28],
  btnFontSize: [12, 22],
  btnBorder: [0, 6],
  btnShadow: [0, 30]
};
var IMAGE_ID = /^[a-f0-9-]{36}$/;
function sanitizeTheme(input) {
  const t = { ...DEFAULT_THEME };
  const src = input && typeof input === "object" ? input : {};
  for (const k of COLOR_KEYS) if (/^#[0-9a-fA-F]{6}$/.test(src[k] ?? "")) t[k] = src[k].toLowerCase();
  for (const k in ENUMS) if (ENUMS[k].includes(src[k])) t[k] = src[k];
  for (const k in RANGES) {
    const n = Number(src[k]);
    if (src[k] !== void 0 && src[k] !== null && src[k] !== "" && Number.isFinite(n)) {
      t[k] = Math.min(RANGES[k][1], Math.max(RANGES[k][0], Math.round(n)));
    }
  }
  if (FONTS[src.font]) t.font = src.font;
  if (FONTS[src.titleFont]) t.titleFont = src.titleFont;
  else if (FONTS[src.font]) t.titleFont = src.font;
  t.titleUppercase = !!src.titleUppercase;
  t.btnUppercase = src.btnUppercase === void 0 ? t.btnUppercase : !!src.btnUppercase;
  t.bgImage = IMAGE_ID.test(src.bgImage ?? "") ? src.bgImage : null;
  if (t.bgType === "image" && !t.bgImage) t.bgType = "solid";
  return t;
}
function fontHref(theme) {
  const keys = [.../* @__PURE__ */ new Set([theme.font, theme.titleFont])].filter((k) => FONTS[k]?.q);
  if (!keys.length) return "data:text/css,";
  const families = keys.map((k) => `family=${FONTS[k].q}`).join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
function contrastOn(hex2) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex2.slice(i, i + 2), 16) / 255).map((c) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? "#111111" : "#ffffff";
}
function buttonCss(t) {
  const a = t.btnAccent;
  const w = t.btnBorder;
  const soft = t.btnShadow ? `box-shadow:0 ${Math.round(t.btnShadow / 3)}px ${t.btnShadow}px #00000055;` : "";
  switch (t.btnStyle) {
    case "outline":
      return `background:transparent;color:${t.btnTextColor};border:${Math.max(1, w)}px solid ${a};${soft}`;
    case "glow":
      return `background:${t.btnColor};color:${t.btnTextColor};border:${w}px solid ${a};box-shadow:0 ${Math.round(t.btnShadow / 4)}px ${t.btnShadow}px ${a}99;`;
    case "glass":
      return `background:${t.btnColor}26;color:${t.btnTextColor};border:${w}px solid ${a}55;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);${soft}`;
    case "hard":
      return `background:${t.btnColor};color:${t.btnTextColor};border:${Math.max(1, w)}px solid ${a};box-shadow:${Math.round(t.btnShadow / 3)}px ${Math.round(t.btnShadow / 3)}px 0 ${a};`;
    default:
      return `background:${t.btnColor};color:${t.btnTextColor};border:${w}px solid ${a};${soft}`;
  }
}
function themeCss(input) {
  const t = sanitizeTheme(input);
  const font = (FONTS[t.font] || FONTS.inter).stack;
  const titleFont = (FONTS[t.titleFont] || FONTS.inter).stack;
  let layers = "";
  if (t.bgType === "gradient") {
    layers = `body::before{content:"";position:fixed;inset:0;z-index:-2;background:linear-gradient(${t.gradientAngle}deg,${t.bgColor},${t.bgColor2})}`;
  } else if (t.bgType === "image" && t.bgImage) {
    layers = `body::before{content:"";position:fixed;inset:0;z-index:-2;background:${t.bgColor} url(/img/${t.bgImage}) center/cover no-repeat}body::after{content:"";position:fixed;inset:0;z-index:-1;background:#000;opacity:${t.bgOverlay / 100}}`;
  }
  const avatarRadius = { circle: "50%", rounded: "22%", square: "0", none: "0" }[t.avatarShape];
  return `html{background:${t.bgColor}}body{color:${t.textColor};font-family:${font}}${layers}.avatar{width:${t.avatarSize}px;height:${t.avatarSize}px;border-radius:${avatarRadius};${t.avatarShape === "none" ? "display:none;" : ""}}h1{font-family:${titleFont};font-size:${t.titleSize}px;${t.titleUppercase ? "text-transform:uppercase;" : ""}}.socials{order:${t.socialPosition === "bottom" ? 4 : 2}}.links{gap:${t.btnGap}px}.btn,.event{${buttonCss(t)}border-radius:${t.btnRadius}px;font-size:${t.btnFontSize}px;${t.btnUppercase ? "text-transform:uppercase;" : ""}}.thumb{border-radius:${Math.max(0, t.btnRadius - 6)}px}.cta,.badge{background:${t.btnAccent};color:${contrastOn(t.btnAccent)};border-radius:${Math.max(6, t.btnRadius - 8)}px}`;
}

// public/static/icons.js
var ICONS = {
  "instagram": '<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"></path></svg>',
  "tiktok": '<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>',
  "facebook": '<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"></path></svg>',
  "whatsapp": '<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>',
  "youtube": '<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>',
  "x": '<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"></path></svg>',
  "telegram": '<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path></svg>',
  "spotify": '<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path></svg>',
  "snapchat": '<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"></path></svg>',
  "linkedin": '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>',
  "website": '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>',
  "email": '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>'
};

// public/static/visibility.js
var EVENT_GRACE_MS = 12 * 60 * 60 * 1e3;
function effectiveEnd(item) {
  if (item.ends_at) return Date.parse(item.ends_at);
  if (item.kind === "event" && item.event_date) return Date.parse(item.event_date) + EVENT_GRACE_MS;
  return null;
}
function itemStatus(item, now = Date.now()) {
  if (!item.active) return "off";
  if (item.starts_at && Date.parse(item.starts_at) > now) return "scheduled";
  const end = effectiveEnd(item);
  if (end !== null && end <= now) return "expired";
  if (item.kind !== "section" && !item.url && !item.sold_out) return "no-url";
  return "live";
}
var isVisible = (item, now = Date.now()) => itemStatus(item, now) === "live";
function visibleItems(items, now = Date.now()) {
  const pinned = [];
  const rest = [];
  let pendingSection = null;
  for (const item of items) {
    if (item.kind === "section") {
      pendingSection = isVisible(item, now) ? item : null;
      continue;
    }
    if (!isVisible(item, now)) continue;
    if (item.pinned) {
      pinned.push(item);
      continue;
    }
    if (pendingSection) {
      rest.push(pendingSection);
      pendingSection = null;
    }
    rest.push(item);
  }
  return [...pinned, ...rest];
}

// src/render.js
var esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
var SOCIAL_ORDER = ["instagram", "tiktok", "facebook", "whatsapp", "youtube", "x", "telegram", "spotify", "snapchat", "linkedin", "website", "email"];
function autoIcon(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (u.protocol === "whatsapp:" || host === "wa.me" || host.endsWith("whatsapp.com")) return "whatsapp";
    if (host === "t.me" || host === "telegram.me") return "telegram";
    if (host.endsWith("instagram.com")) return "instagram";
    if (host.endsWith("tiktok.com")) return "tiktok";
    if (host.endsWith("facebook.com")) return "facebook";
    if (host.endsWith("youtube.com") || host === "youtu.be") return "youtube";
    if (host.endsWith("spotify.com")) return "spotify";
  } catch {
  }
  return null;
}
var BASE_CSS = `*{box-sizing:border-box}html,body{margin:0;min-height:100%}body{-webkit-font-smoothing:antialiased;position:relative;z-index:0}
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
var SHARE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';
function renderPage(page, items, { preview = false, timeZone = "Europe/Madrid", origin = "" } = {}) {
  const theme = sanitizeTheme(preview ? page.theme_draft || page.theme : page.theme);
  const socials = page.socials || {};
  const description = page.seo_description || page.bio || page.title;
  const list = visibleItems(items);
  const dateFormat = new Intl.DateTimeFormat("en-GB", { timeZone, weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const linksHtml = list.map((item) => {
    if (item.kind === "section") return `<h2 class="section-title">${esc(item.title)}</h2>`;
    const href = preview ? esc(item.url) : `/go/${item.id}`;
    const external = preview ? 'target="_blank" ' : "";
    if (item.kind === "event") {
      const action = item.sold_out ? '<span class="badge">Sold out</span>' : item.url ? `<a class="cta" href="${href}" ${external}rel="noopener">${esc(item.cta_label || "Get Tickets")}</a>` : "";
      return `<article class="event">${item.thumb_image ? `<img src="/img/${esc(item.thumb_image)}" alt="" loading="lazy">` : ""}<div class="event-body">${item.event_date ? `<div class="event-date">${esc(dateFormat.format(new Date(item.event_date)))}</div>` : ""}<h3>${esc(item.title)}</h3>${item.subtitle ? `<p>${esc(item.subtitle)}</p>` : ""}${action}</div></article>`;
    }
    const icon = item.icon === "none" ? null : ICONS[item.icon] ? item.icon : autoIcon(item.url);
    const thumb = item.thumb_image ? `<img class="thumb" src="/img/${esc(item.thumb_image)}" alt="" loading="lazy">` : icon ? `<span class="thumb thumb-icon">${ICONS[icon]}</span>` : "";
    const label = `${thumb}<span>${esc(item.title || item.url)}${item.subtitle ? `<small>${esc(item.subtitle)}</small>` : ""}</span>`;
    const pinned = item.pinned ? " pinned" : "";
    if (item.sold_out) return `<div class="btn sold${pinned}">${label}<span class="badge">Sold out</span></div>`;
    return `<a class="btn${pinned}" href="${href}" ${external}rel="noopener">${label}</a>`;
  }).join("");
  const socialHtml = SOCIAL_ORDER.filter((k) => socials[k]).map((k) => `<a href="${esc(socials[k])}" target="_blank" rel="noopener" aria-label="${esc(k)}">${ICONS[k]}</a>`).join("");
  return `<!doctype html><html lang="it"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(page.title)}</title><meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:url" content="${esc(origin)}/${esc(page.slug)}"><link rel="canonical" href="${esc(origin)}/${esc(page.slug)}"><meta name="twitter:card" content="summary">
${page.avatar_image ? `<meta property="og:image" content="${esc(origin)}/img/${esc(page.avatar_image)}"><link rel="icon" href="/img/${esc(page.avatar_image)}">` : ""}
${preview ? '<meta name="robots" content="noindex">' : ""}
<link id="font" rel="stylesheet" href="${esc(fontHref(theme))}">
<style>${BASE_CSS}</style><style id="theme">${themeCss(theme)}</style></head><body>
${preview ? "" : `<button class="share" type="button" aria-label="Condividi">${SHARE_ICON}</button>`}
<main class="wrap"><header class="profile">
${page.avatar_image ? `<img class="avatar" src="/img/${esc(page.avatar_image)}" alt="${esc(page.title)}">` : ""}
<h1>${esc(page.title)}</h1>${page.bio ? `<p class="bio">${esc(page.bio)}</p>` : ""}</header>
${socialHtml ? `<nav class="socials" aria-label="Social">${socialHtml}</nav>` : ""}
<section class="links">${linksHtml}</section></main>
${preview ? "" : `<script>document.querySelector('.share').addEventListener('click',async()=>{const u=location.href;try{if(navigator.share){await navigator.share({title:document.title,url:u});return}await navigator.clipboard.writeText(u);const t=document.createElement('div');t.className='toast';t.textContent='Link copiato';document.body.append(t);setTimeout(()=>t.remove(),1800)}catch(e){}})<\/script>`}
</body></html>`;
}
function renderNotFound() {
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pagina non trovata</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0d17;color:#fff;font:16px system-ui,sans-serif;text-align:center;padding:24px}</style></head><body><p>Questa pagina non esiste o non è più disponibile.</p></body></html>`;
}
function renderAdminShell() {
  return `<!doctype html><html lang="it"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow">
<title>ESL Links</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap"><link rel="stylesheet" href="/static/admin.css">
</head><body><div id="app"></div><div id="toasts" aria-live="polite"></div><script type="module" src="/static/admin.js"><\/script></body></html>`;
}

// src/index.js
var SCHEMA = [
  `CREATE TABLE IF NOT EXISTS pages (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, bio TEXT NOT NULL DEFAULT '', avatar_image TEXT, theme TEXT NOT NULL, theme_draft TEXT, socials TEXT NOT NULL DEFAULT '{}', seo_description TEXT NOT NULL DEFAULT '', published INTEGER NOT NULL DEFAULT 1, is_home INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, page_id INTEGER NOT NULL, kind TEXT NOT NULL DEFAULT 'link', title TEXT NOT NULL DEFAULT '', subtitle TEXT NOT NULL DEFAULT '', url TEXT NOT NULL DEFAULT '', thumb_image TEXT, icon TEXT NOT NULL DEFAULT 'auto', position INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1, pinned INTEGER NOT NULL DEFAULT 0, sold_out INTEGER NOT NULL DEFAULT 0, starts_at TEXT, ends_at TEXT, event_date TEXT, cta_label TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS items_page ON items (page_id, position)`,
  `CREATE TABLE IF NOT EXISTS stats_daily (day TEXT NOT NULL, page_id INTEGER NOT NULL, item_id INTEGER NOT NULL, hits INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (day, page_id, item_id))`,
  `CREATE TABLE IF NOT EXISTS stats_dim (day TEXT NOT NULL, page_id INTEGER NOT NULL, dim TEXT NOT NULL, key TEXT NOT NULL, hits INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (day, page_id, dim, key))`,
  `CREATE TABLE IF NOT EXISTS visitors (day TEXT NOT NULL, page_id INTEGER NOT NULL, hash TEXT NOT NULL, PRIMARY KEY (day, page_id, hash))`,
  `CREATE TABLE IF NOT EXISTS salts (day TEXT PRIMARY KEY, salt TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS images (id TEXT PRIMARY KEY, mime TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS login_attempts (ip TEXT PRIMARY KEY, fails INTEGER NOT NULL, first_at INTEGER NOT NULL)`
];
var preset = (id) => PRESETS.find((p) => p.id === id).theme;
var SEED_PAGES = [
  {
    slug: "f3dez",
    title: "F3DEZ GUESTLIST",
    home: 1,
    published: 1,
    theme: preset("f3dez"),
    bio: "🎉 Join the party with exclusive events & discount ticket in Barcelona with F3DEZ GUESTLIST!",
    items: [
      ["SKI TRIP", "WhatsApp Community • Free to join"],
      ["FREE PARTIES EVERYDAY IN BARCELONA F3DEZ CHANNEL", ""],
      ["YOUR VACATION IN BARCELONA WITH F3DEZ (we plan your stay)", ""],
      ["FREE PARTIES EVERYDAY IN BARCELONA (Whatsapp group)", ""],
      ["Girls Community", "WhatsApp Community • Free to join"],
      ["BOOK A VIP TABLE & INFO", ""]
    ]
  },
  { slug: "erasmusbarcelona", title: "Erasmus Exchange Barcelona", home: 0, published: 0, theme: preset("mare"), bio: "", items: [] },
  { slug: "studentlife", title: "Exchange Student Life", home: 0, published: 0, theme: preset("pulito"), bio: "", items: [] }
];
var dbReady = null;
async function initDb(db) {
  await db.batch(SCHEMA.map((sql) => db.prepare(sql)));
  const { n } = await db.prepare("SELECT COUNT(*) AS n FROM pages").first();
  if (n > 0) return;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  for (const p of SEED_PAGES) {
    const res = await db.prepare("INSERT INTO pages (slug,title,bio,theme,published,is_home,created_at) VALUES (?,?,?,?,?,?,?)").bind(p.slug, p.title, p.bio, JSON.stringify(p.theme), p.published, p.home, now).run();
    const pageId = res.meta.last_row_id;
    if (p.items.length) {
      await db.batch(p.items.map(([title, subtitle], i) => db.prepare("INSERT INTO items (page_id,kind,title,subtitle,position,created_at) VALUES (?,'link',?,?,?,?)").bind(pageId, title, subtitle, i, now)));
    }
  }
}
function ready(env) {
  if (!dbReady) dbReady = initDb(env.DB).catch((e) => {
    dbReady = null;
    throw e;
  });
  return dbReady;
}
var parsePage = (row) => row && { ...row, theme: JSON.parse(row.theme), theme_draft: row.theme_draft ? JSON.parse(row.theme_draft) : null, socials: JSON.parse(row.socials || "{}") };
var getPageById = async (env, id) => parsePage(await env.DB.prepare("SELECT * FROM pages WHERE id=?").bind(id).first());
var getItems = async (env, pageId) => (await env.DB.prepare("SELECT * FROM items WHERE page_id=? ORDER BY position, id").bind(pageId).all()).results;
async function removeImageIfUnused(env, id) {
  if (!id || !IMAGE_ID.test(id)) return;
  const like = `%${id}%`;
  const used = await env.DB.prepare(
    "SELECT (SELECT COUNT(*) FROM items WHERE thumb_image=?1) + (SELECT COUNT(*) FROM pages WHERE avatar_image=?1 OR theme LIKE ?2 OR theme_draft LIKE ?2) AS n"
  ).bind(id, like).first();
  if (!used.n) await env.DB.prepare("DELETE FROM images WHERE id=?").bind(id).run();
}
var HttpError = class extends Error {
  constructor(status, message, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
};
var SECURITY_HEADERS = { "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" };
var json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...SECURITY_HEADERS, ...headers }
});
var html = (body, status = 200, headers = {}) => new Response(body, {
  status,
  headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", ...SECURITY_HEADERS, ...headers }
});
var text = (v, max) => String(v ?? "").trim().slice(0, max);
var SAFE_SCHEMES = ["http:", "https:", "mailto:", "tel:", "sms:", "whatsapp:"];
function normalizeUrl(value) {
  let v = text(value, 2e3);
  if (!v) return "";
  if (/^[^\s/@:]+@[^\s/@]+\.[^\s/@]+$/.test(v)) v = `mailto:${v}`;
  else if (!/^[a-z][a-z0-9+.-]*:/i.test(v)) v = `https://${v}`;
  let parsed;
  try {
    parsed = new URL(v);
  } catch {
    throw new HttpError(400, "Questo indirizzo non è valido. Controlla di averlo copiato per intero.");
  }
  if (!SAFE_SCHEMES.includes(parsed.protocol)) throw new HttpError(400, "Questo tipo di indirizzo non è consentito.");
  return parsed.href;
}
var SOCIAL_BASE = {
  instagram: "https://instagram.com/",
  tiktok: "https://tiktok.com/@",
  facebook: "https://facebook.com/",
  youtube: "https://youtube.com/@",
  x: "https://x.com/",
  telegram: "https://t.me/",
  snapchat: "https://snapchat.com/add/",
  spotify: null,
  linkedin: null,
  whatsapp: null,
  website: null,
  email: null
};
function normalizeSocials(input) {
  const out = {};
  for (const key of SOCIAL_ORDER) {
    const raw = text(input?.[key], 500);
    if (!raw) continue;
    const handle = raw.replace(/^@/, "");
    const isHandle = /^[\w.-]+$/.test(handle) && !/\.[a-z]{2,}$/i.test(handle);
    if (SOCIAL_BASE[key] && isHandle) out[key] = SOCIAL_BASE[key] + handle;
    else if (key === "whatsapp" && /^\+?[\d\s-]{7,}$/.test(raw)) out[key] = `https://wa.me/${raw.replace(/\D/g, "")}`;
    else if (key === "email") out[key] = normalizeUrl(raw.includes(":") ? raw : `mailto:${raw}`);
    else out[key] = normalizeUrl(raw);
  }
  return out;
}
function isoOrNull(value) {
  if (value === null || value === void 0 || value === "") return null;
  const t = Date.parse(value);
  if (Number.isNaN(t)) throw new HttpError(400, "Una delle date non è valida.");
  return new Date(t).toISOString();
}
var RESERVED_SLUGS = /* @__PURE__ */ new Set(["admin", "api", "go", "img", "static", "favicon.ico", "robots.txt"]);
function validSlug(value) {
  const slug = text(value, 60).toLowerCase();
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new HttpError(400, "L'indirizzo può contenere solo lettere minuscole, numeri e trattini.");
  if (RESERVED_SLUGS.has(slug)) throw new HttpError(400, "Questo indirizzo è riservato, scegline un altro.");
  return slug;
}
async function slugTaken(env, slug, exceptId = 0) {
  return !!await env.DB.prepare("SELECT id FROM pages WHERE slug=? AND id<>?").bind(slug, exceptId).first();
}
function b64Bytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
var hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
var enc = new TextEncoder();
var zoned = (env) => env.TIMEZONE || "Europe/Madrid";
var dayIn = (timeZone, date = /* @__PURE__ */ new Date()) => new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
var SESSION_DAYS = 30;
var hmacKey = (secret) => crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
var sign = async (key, msg) => hex(await crypto.subtle.sign("HMAC", key, enc.encode(msg)));
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
var passwordConfigured = (env) => typeof env.ADMIN_PASSWORD === "string" && env.ADMIN_PASSWORD.length >= 10;
async function createSession(env) {
  const key = await hmacKey(`${env.ADMIN_PASSWORD}:session`);
  const payload = `owner.${Date.now() + SESSION_DAYS * 864e5}`;
  return `${payload}.${await sign(key, payload)}`;
}
function cookieValue(request, name) {
  const match = (request.headers.get("Cookie") || "").match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? match[1] : null;
}
async function getSession(request, env) {
  if (!passwordConfigured(env)) return null;
  const token = cookieValue(request, "sid");
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3 || Number(parts[1]) < Date.now()) return null;
  const key = await hmacKey(`${env.ADMIN_PASSWORD}:session`);
  const expected = await sign(key, `${parts[0]}.${parts[1]}`);
  return safeEqual(expected, parts[2]) ? { user: parts[0], role: "super_admin" } : null;
}
function can(session, _action, _pageId) {
  return session?.role === "super_admin";
}
function sessionCookie(request, value, maxAge) {
  const secure = new URL(request.url).protocol === "https:" ? " Secure;" : "";
  return `sid=${value}; Path=/; HttpOnly;${secure} SameSite=Lax; Max-Age=${maxAge}`;
}
var MAX_FAILS = 8;
var FAIL_WINDOW_MS = 15 * 60 * 1e3;
async function login(request, env) {
  if (!passwordConfigured(env)) {
    throw new HttpError(503, "Password non ancora impostata. Aggiungi il secret ADMIN_PASSWORD su Cloudflare, con almeno 10 caratteri.", "no_password");
  }
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const now = Date.now();
  const row = await env.DB.prepare("SELECT fails, first_at FROM login_attempts WHERE ip=?").bind(ip).first();
  const inWindow = row && now - row.first_at < FAIL_WINDOW_MS;
  if (inWindow && row.fails >= MAX_FAILS) throw new HttpError(429, "Troppi tentativi. Riprova tra 15 minuti.");
  const body = await request.json().catch(() => ({}));
  const key = await hmacKey(`${env.ADMIN_PASSWORD}:login`);
  const ok = safeEqual(await sign(key, String(body.password ?? "")), await sign(key, env.ADMIN_PASSWORD));
  if (!ok) {
    await env.DB.prepare("INSERT INTO login_attempts (ip,fails,first_at) VALUES (?,1,?) ON CONFLICT(ip) DO UPDATE SET fails=?,first_at=?").bind(ip, now, inWindow ? row.fails + 1 : 1, inWindow ? row.first_at : now).run();
    throw new HttpError(401, "Password errata.");
  }
  await env.DB.prepare("DELETE FROM login_attempts WHERE ip=?").bind(ip).run();
  return json({ ok: true }, 200, { "Set-Cookie": sessionCookie(request, await createSession(env), SESSION_DAYS * 86400) });
}
var BOT_RE = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp\/|telegram|preview|headless|lighthouse|pingdom|monitor|curl|wget|python-requests|node-fetch/i;
var isCountable = (request) => {
  const ua = request.headers.get("User-Agent") || "";
  const purpose = request.headers.get("Sec-Purpose") || request.headers.get("Purpose") || "";
  return ua && !BOT_RE.test(ua) && !/prefetch/i.test(purpose);
};
var KNOWN_SOURCES = [
  [/instagram/, "instagram"],
  [/tiktok|musical_ly|bytedance/, "tiktok"],
  [/facebook|fban|fbav|fb\.com/, "facebook"],
  [/whatsapp|wa\.me/, "whatsapp"],
  [/t\.me|telegram/, "telegram"],
  [/youtube|youtu\.be/, "youtube"],
  [/google\./, "google"],
  [/bing\./, "bing"],
  [/twitter|t\.co|x\.com/, "x"]
];
function trafficSource(request) {
  const url = new URL(request.url);
  const utm = (url.searchParams.get("utm_source") || "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 30);
  if (utm) return utm;
  let host = "";
  try {
    host = new URL(request.headers.get("Referer") || "").hostname.replace(/^www\./, "");
  } catch {
  }
  if (host === url.hostname) host = "";
  const ua = (request.headers.get("User-Agent") || "").toLowerCase();
  for (const [re, name] of KNOWN_SOURCES) if (host && re.test(host) || !host && re.test(ua)) return name;
  return host ? host.slice(0, 40) : "diretto";
}
var deviceType = (request) => /Mobi|Android|iPhone|iPad|iPod/i.test(request.headers.get("User-Agent") || "") ? "mobile" : "desktop";
var incDaily = (env, day, pageId, itemId) => env.DB.prepare(
  "INSERT INTO stats_daily (day,page_id,item_id,hits) VALUES (?,?,?,1) ON CONFLICT(day,page_id,item_id) DO UPDATE SET hits=hits+1"
).bind(day, pageId, itemId);
var incDim = (env, day, pageId, dim, key) => env.DB.prepare(
  "INSERT INTO stats_dim (day,page_id,dim,key,hits) VALUES (?,?,?,?,1) ON CONFLICT(day,page_id,dim,key) DO UPDATE SET hits=hits+1"
).bind(day, pageId, dim, key);
async function dailySalt(env, day) {
  const row = await env.DB.prepare("SELECT salt FROM salts WHERE day=?").bind(day).first();
  if (row) return row.salt;
  const salt = hex(crypto.getRandomValues(new Uint8Array(32)));
  await env.DB.batch([
    env.DB.prepare("INSERT OR IGNORE INTO salts (day,salt) VALUES (?,?)").bind(day, salt),
    env.DB.prepare("DELETE FROM salts WHERE day<>?").bind(day),
    env.DB.prepare("DELETE FROM visitors WHERE day<>?").bind(day)
  ]);
  return (await env.DB.prepare("SELECT salt FROM salts WHERE day=?").bind(day).first()).salt;
}
async function recordView(request, env, pageId) {
  const day = dayIn(zoned(env));
  await env.DB.batch([
    incDaily(env, day, pageId, 0),
    incDim(env, day, pageId, "source", trafficSource(request)),
    incDim(env, day, pageId, "device", deviceType(request))
  ]);
  const salt = await dailySalt(env, day);
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const ua = request.headers.get("User-Agent") || "";
  const hash = hex(await crypto.subtle.digest("SHA-256", enc.encode(`${salt}|${pageId}|${ip}|${ua}`)));
  const res = await env.DB.prepare("INSERT OR IGNORE INTO visitors (day,page_id,hash) VALUES (?,?,?)").bind(day, pageId, hash).run();
  if (res.meta.changes > 0) await incDim(env, day, pageId, "uniques", "").run();
}
async function statsReport(env, url) {
  const today = dayIn(zoned(env));
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  const to = dateRe.test(url.searchParams.get("to") || "") ? url.searchParams.get("to") : today;
  const from = dateRe.test(url.searchParams.get("from") || "") ? url.searchParams.get("from") : to;
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) throw new HttpError(400, "Intervallo di date non valido.");
  const count = Math.round((end - start) / 864e5) + 1;
  if (count > 800) throw new HttpError(400, "L'intervallo può coprire al massimo 800 giorni.");
  const pageParam = url.searchParams.get("page") || "all";
  const all = pageParam === "all";
  const pageId = Number(pageParam);
  if (!all && !Number.isInteger(pageId)) throw new HttpError(400, "Brand non valido.");
  const filter = all ? "" : " AND s.page_id=?3";
  const q = (sql) => {
    const st = env.DB.prepare(sql);
    return all ? st.bind(from, to) : st.bind(from, to, pageId);
  };
  const [daily, uniques, items, dims] = await env.DB.batch([
    q(`SELECT s.day, SUM(CASE WHEN s.item_id=0 THEN s.hits ELSE 0 END) AS views, SUM(CASE WHEN s.item_id<>0 THEN s.hits ELSE 0 END) AS clicks FROM stats_daily s WHERE s.day BETWEEN ?1 AND ?2${filter} GROUP BY s.day`),
    q(`SELECT s.day, SUM(s.hits) AS uniques FROM stats_dim s WHERE s.dim='uniques' AND s.day BETWEEN ?1 AND ?2${filter} GROUP BY s.day`),
    q(`SELECT s.item_id AS id, MAX(i.title) AS title, MAX(p.title) AS page, SUM(s.hits) AS clicks FROM stats_daily s LEFT JOIN items i ON i.id=s.item_id LEFT JOIN pages p ON p.id=s.page_id WHERE s.item_id<>0 AND s.day BETWEEN ?1 AND ?2${filter} GROUP BY s.item_id ORDER BY clicks DESC`),
    q(`SELECT s.dim, s.key, SUM(s.hits) AS hits FROM stats_dim s WHERE s.dim IN ('source','device') AND s.day BETWEEN ?1 AND ?2${filter} GROUP BY s.dim, s.key ORDER BY hits DESC`)
  ]);
  const byDay = new Map(daily.results.map((r) => [r.day, r]));
  const uniquesByDay = new Map(uniques.results.map((r) => [r.day, r.uniques]));
  const days = [];
  for (let i = 0; i < count; i++) {
    const day = new Date(start + i * 864e5).toISOString().slice(0, 10);
    const r = byDay.get(day);
    days.push({ day, views: r?.views || 0, clicks: r?.clicks || 0, uniques: uniquesByDay.get(day) || 0 });
  }
  const sum = (k) => days.reduce((a, d) => a + d[k], 0);
  return {
    from,
    to,
    days,
    totals: { views: sum("views"), clicks: sum("clicks"), uniques: sum("uniques") },
    items: items.results.map((r) => ({ id: r.id, title: r.title || "Link eliminato", page: r.page || "", clicks: r.clicks })),
    sources: dims.results.filter((r) => r.dim === "source").map(({ key, hits }) => ({ key, hits })),
    devices: dims.results.filter((r) => r.dim === "device").map(({ key, hits }) => ({ key, hits }))
  };
}
var ITEM_KINDS = ["link", "section", "event"];
function itemPatch(body) {
  const f = {};
  if ("title" in body) f.title = text(body.title, 200);
  if ("subtitle" in body) f.subtitle = text(body.subtitle, 300);
  if ("url" in body) f.url = normalizeUrl(body.url);
  if ("thumb_image" in body) f.thumb_image = IMAGE_ID.test(body.thumb_image ?? "") ? body.thumb_image : null;
  if ("icon" in body) f.icon = text(body.icon, 20) || "auto";
  if ("cta_label" in body) f.cta_label = text(body.cta_label, 40);
  for (const k of ["active", "pinned", "sold_out"]) if (k in body) f[k] = body[k] ? 1 : 0;
  for (const k of ["starts_at", "ends_at", "event_date"]) if (k in body) f[k] = isoOrNull(body[k]);
  return f;
}
async function updateRow(env, table, id, fields) {
  const keys = Object.keys(fields);
  if (!keys.length) return;
  await env.DB.prepare(`UPDATE ${table} SET ${keys.map((k) => `${k}=?`).join(",")} WHERE id=?`).bind(...keys.map((k) => fields[k]), id).run();
}
var publicPage = (p, items) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  bio: p.bio,
  avatar_image: p.avatar_image,
  socials: p.socials,
  seo_description: p.seo_description,
  published: p.published,
  is_home: p.is_home,
  theme: sanitizeTheme(p.theme_draft || p.theme),
  has_draft: !!p.theme_draft,
  ...items ? { items } : {}
});
async function requirePage(env, id) {
  const page = await getPageById(env, Number(id));
  if (!page) throw new HttpError(404, "Pagina non trovata.");
  return page;
}
async function requireItem(env, id) {
  const item = await env.DB.prepare("SELECT * FROM items WHERE id=?").bind(Number(id)).first();
  if (!item) throw new HttpError(404, "Elemento non trovato.");
  return item;
}
var themeImage = (theme) => theme?.bgImage || null;
async function handleApi(request, env, url) {
  const path = url.pathname.slice(4);
  const method = request.method;
  if (method !== "GET") {
    const origin = request.headers.get("Origin");
    if (origin && origin !== url.origin) throw new HttpError(403, "Richiesta non consentita.");
    if (!(request.headers.get("Content-Type") || "").includes("application/json")) throw new HttpError(415, "Formato della richiesta non valido.");
  }
  if (path === "/login" && method === "POST") return login(request, env);
  if (path === "/logout" && method === "POST") return json({ ok: true }, 200, { "Set-Cookie": sessionCookie(request, "", 0) });
  const session = await getSession(request, env);
  if (path === "/me") return json({ authenticated: !!session, passwordConfigured: passwordConfigured(env) });
  if (!session) throw new HttpError(401, "Accedi di nuovo per continuare.");
  if (!can(session, "manage")) throw new HttpError(403, "Non hai i permessi per questa azione.");
  const body = method === "GET" || method === "DELETE" ? {} : await request.json().catch(() => {
    throw new HttpError(400, "Dati non validi.");
  });
  let m;
  if (path === "/pages" && method === "GET") {
    const { results } = await env.DB.prepare("SELECT * FROM pages ORDER BY is_home DESC, id").all();
    return json({ pages: results.map((r) => publicPage(parsePage(r))) });
  }
  if (path === "/pages" && method === "POST") {
    const title = text(body.title, 120);
    if (!title) throw new HttpError(400, "Scrivi il nome del brand.");
    const slug = validSlug(body.slug);
    if (await slugTaken(env, slug)) throw new HttpError(409, "Questo indirizzo è già usato da un altro brand.");
    const res = await env.DB.prepare("INSERT INTO pages (slug,title,theme,published,created_at) VALUES (?,?,?,0,?)").bind(slug, title, JSON.stringify(preset("pulito")), (/* @__PURE__ */ new Date()).toISOString()).run();
    return json(publicPage(await getPageById(env, res.meta.last_row_id), []), 201);
  }
  if (m = path.match(/^\/pages\/(\d+)$/)) {
    const page = await requirePage(env, m[1]);
    if (method === "GET") return json(publicPage(page, await getItems(env, page.id)));
    if (method === "PUT") {
      const f = {};
      if ("title" in body) {
        f.title = text(body.title, 120);
        if (!f.title) throw new HttpError(400, "Il nome non può essere vuoto.");
      }
      if ("bio" in body) f.bio = text(body.bio, 500);
      if ("seo_description" in body) f.seo_description = text(body.seo_description, 300);
      if ("published" in body) f.published = body.published ? 1 : 0;
      if ("avatar_image" in body) f.avatar_image = IMAGE_ID.test(body.avatar_image ?? "") ? body.avatar_image : null;
      if ("socials" in body) f.socials = JSON.stringify(normalizeSocials(body.socials));
      if ("slug" in body) {
        f.slug = validSlug(body.slug);
        if (await slugTaken(env, f.slug, page.id)) throw new HttpError(409, "Questo indirizzo è già usato da un altro brand.");
      }
      if ("theme" in body) f.theme_draft = JSON.stringify(sanitizeTheme(body.theme));
      await updateRow(env, "pages", page.id, f);
      if ("avatar_image" in f && page.avatar_image !== f.avatar_image) await removeImageIfUnused(env, page.avatar_image);
      if ("theme_draft" in f) {
        const previous = themeImage(page.theme_draft);
        if (previous !== JSON.parse(f.theme_draft).bgImage) await removeImageIfUnused(env, previous);
      }
      return json(publicPage(await getPageById(env, page.id)));
    }
    if (method === "DELETE") {
      if (page.is_home) throw new HttpError(400, "Questa è la pagina principale. Scegli prima un altro brand come principale.");
      const items = await getItems(env, page.id);
      await env.DB.batch([
        env.DB.prepare("DELETE FROM items WHERE page_id=?").bind(page.id),
        env.DB.prepare("DELETE FROM stats_daily WHERE page_id=?").bind(page.id),
        env.DB.prepare("DELETE FROM stats_dim WHERE page_id=?").bind(page.id),
        env.DB.prepare("DELETE FROM visitors WHERE page_id=?").bind(page.id),
        env.DB.prepare("DELETE FROM pages WHERE id=?").bind(page.id)
      ]);
      const images = /* @__PURE__ */ new Set([page.avatar_image, themeImage(page.theme), themeImage(page.theme_draft), ...items.map((i) => i.thumb_image)]);
      for (const id of images) await removeImageIfUnused(env, id);
      return json({ ok: true });
    }
  }
  if ((m = path.match(/^\/pages\/(\d+)\/publish$/)) && method === "POST") {
    const page = await requirePage(env, m[1]);
    if (page.theme_draft) {
      await env.DB.prepare("UPDATE pages SET theme=theme_draft, theme_draft=NULL WHERE id=?").bind(page.id).run();
      await removeImageIfUnused(env, themeImage(page.theme));
    }
    return json(publicPage(await getPageById(env, page.id)));
  }
  if ((m = path.match(/^\/pages\/(\d+)\/discard$/)) && method === "POST") {
    const page = await requirePage(env, m[1]);
    await env.DB.prepare("UPDATE pages SET theme_draft=NULL WHERE id=?").bind(page.id).run();
    await removeImageIfUnused(env, themeImage(page.theme_draft));
    return json(publicPage(await getPageById(env, page.id)));
  }
  if ((m = path.match(/^\/pages\/(\d+)\/home$/)) && method === "POST") {
    const page = await requirePage(env, m[1]);
    await env.DB.batch([
      env.DB.prepare("UPDATE pages SET is_home=0"),
      env.DB.prepare("UPDATE pages SET is_home=1, published=1 WHERE id=?").bind(page.id)
    ]);
    return json(publicPage(await getPageById(env, page.id)));
  }
  if ((m = path.match(/^\/pages\/(\d+)\/items$/)) && method === "POST") {
    const page = await requirePage(env, m[1]);
    const kind = ITEM_KINDS.includes(body.kind) ? body.kind : "link";
    const f = itemPatch(body);
    const top = await env.DB.prepare("SELECT MIN(position) AS p FROM items WHERE page_id=?").bind(page.id).first();
    const res = await env.DB.prepare("INSERT INTO items (page_id,kind,position,created_at) VALUES (?,?,?,?)").bind(page.id, kind, (top.p ?? 1) - 1, (/* @__PURE__ */ new Date()).toISOString()).run();
    await updateRow(env, "items", res.meta.last_row_id, f);
    return json(await requireItem(env, res.meta.last_row_id), 201);
  }
  if ((m = path.match(/^\/pages\/(\d+)\/order$/)) && method === "PUT") {
    const page = await requirePage(env, m[1]);
    const ids = Array.isArray(body.ids) ? body.ids.map(Number) : [];
    const current = new Set((await getItems(env, page.id)).map((i) => i.id));
    if (ids.length !== current.size || !ids.every((id) => current.has(id))) throw new HttpError(409, "L'elenco è cambiato. Ricarica la pagina e riprova.");
    if (ids.length) await env.DB.batch(ids.map((id, i) => env.DB.prepare("UPDATE items SET position=? WHERE id=?").bind(i, id)));
    return json({ ok: true });
  }
  if (m = path.match(/^\/items\/(\d+)$/)) {
    const item = await requireItem(env, m[1]);
    if (method === "PUT") {
      const f = itemPatch(body);
      const start = "starts_at" in f ? f.starts_at : item.starts_at;
      const end = "ends_at" in f ? f.ends_at : item.ends_at;
      if (start && end && Date.parse(end) <= Date.parse(start)) throw new HttpError(400, "La data di fine deve essere successiva a quella di inizio.");
      await updateRow(env, "items", item.id, f);
      if ("thumb_image" in f && f.thumb_image !== item.thumb_image) await removeImageIfUnused(env, item.thumb_image);
      return json(await requireItem(env, item.id));
    }
    if (method === "DELETE") {
      await env.DB.prepare("DELETE FROM items WHERE id=?").bind(item.id).run();
      await removeImageIfUnused(env, item.thumb_image);
      return json({ ok: true });
    }
  }
  if ((m = path.match(/^\/items\/(\d+)\/duplicate$/)) && method === "POST") {
    const item = await requireItem(env, m[1]);
    await env.DB.prepare("UPDATE items SET position=position+1 WHERE page_id=? AND position>?").bind(item.page_id, item.position).run();
    const res = await env.DB.prepare(
      `INSERT INTO items (page_id,kind,title,subtitle,url,thumb_image,icon,position,active,pinned,sold_out,starts_at,ends_at,event_date,cta_label,created_at)
       VALUES (?,?,?,?,?,?,?,?,?,0,?,?,?,?,?,?)`
    ).bind(
      item.page_id,
      item.kind,
      `${item.title} (copia)`.slice(0, 200),
      item.subtitle,
      item.url,
      item.thumb_image,
      item.icon,
      item.position + 1,
      item.active,
      item.sold_out,
      item.starts_at,
      item.ends_at,
      item.event_date,
      item.cta_label,
      (/* @__PURE__ */ new Date()).toISOString()
    ).run();
    return json(await requireItem(env, res.meta.last_row_id), 201);
  }
  if (path === "/images" && method === "POST") {
    const mime = String(body.mime || "");
    const data = String(body.data || "");
    if (!["image/webp", "image/jpeg", "image/png"].includes(mime)) throw new HttpError(400, "Formato non supportato. Usa JPG, PNG o WebP.");
    if (!data || !/^[A-Za-z0-9+/]+=*$/.test(data)) throw new HttpError(400, "L'immagine non è valida.");
    if (data.length > 15e5) throw new HttpError(413, "L'immagine è troppo grande anche dopo la compressione. Provane una più leggera.");
    const id = crypto.randomUUID();
    await env.DB.prepare("INSERT INTO images (id,mime,data,created_at) VALUES (?,?,?,?)").bind(id, mime, data, (/* @__PURE__ */ new Date()).toISOString()).run();
    return json({ id }, 201);
  }
  if (path === "/stats" && method === "GET") return json(await statsReport(env, url));
  throw new HttpError(404, "Risorsa non trovata.");
}
async function servePublicPage(request, env, ctx, page) {
  const session = await getSession(request, env);
  if (!session && request.method === "GET" && isCountable(request)) {
    ctx.waitUntil(recordView(request, env, page.id).catch((e) => console.error("stats", e)));
  }
  const body = renderPage(page, await getItems(env, page.id), { timeZone: zoned(env), origin: new URL(request.url).origin });
  return html(request.method === "HEAD" ? null : body);
}
async function route(request, env, ctx) {
  const url = new URL(request.url);
  const { pathname } = url;
  const isRead = request.method === "GET" || request.method === "HEAD";
  if (pathname.startsWith("/api/")) return handleApi(request, env, url);
  if (!isRead) return new Response("Method not allowed", { status: 405 });
  if (pathname === "/admin" || pathname === "/admin/") {
    return html(renderAdminShell(), 200, { "X-Frame-Options": "DENY", "Content-Security-Policy": "frame-ancestors 'none'" });
  }
  let m;
  if (m = pathname.match(/^\/admin\/preview\/(\d+)$/)) {
    if (!await getSession(request, env)) return html(renderNotFound(), 401);
    const page = await getPageById(env, Number(m[1]));
    if (!page) return html(renderNotFound(), 404);
    return html(renderPage(page, await getItems(env, page.id), { preview: true, timeZone: zoned(env) }), 200, { "X-Frame-Options": "SAMEORIGIN" });
  }
  if (m = pathname.match(/^\/img\/([a-f0-9-]{36})$/)) {
    const img = await env.DB.prepare("SELECT mime, data FROM images WHERE id=?").bind(m[1]).first();
    if (!img) return new Response("Not found", { status: 404 });
    return new Response(b64Bytes(img.data), { headers: { "Content-Type": img.mime, "Cache-Control": "public, max-age=31536000, immutable", ...SECURITY_HEADERS } });
  }
  if (m = pathname.match(/^\/go\/(\d+)$/)) {
    const item = await env.DB.prepare("SELECT i.*, p.slug, p.published, p.is_home FROM items i JOIN pages p ON p.id=i.page_id WHERE i.id=?").bind(Number(m[1])).first();
    if (!item) return Response.redirect(`${url.origin}/`, 302);
    if (!item.url || item.sold_out || !isVisible(item) || !item.published) {
      return Response.redirect(`${url.origin}/${item.is_home ? "" : item.slug}`, 302);
    }
    if (isCountable(request) && !await getSession(request, env)) {
      ctx.waitUntil(incDaily(env, dayIn(zoned(env)), item.page_id, item.id).run().catch((e) => console.error("stats", e)));
    }
    return new Response(null, { status: 302, headers: { Location: item.url, "Cache-Control": "no-store", "Referrer-Policy": "origin" } });
  }
  if (pathname === "/robots.txt") return new Response("User-agent: *\nDisallow: /admin\nDisallow: /api/\nDisallow: /go/\n", { headers: { "Content-Type": "text/plain" } });
  if (pathname === "/" || pathname === "") {
    const page = parsePage(await env.DB.prepare("SELECT * FROM pages WHERE is_home=1 AND published=1 LIMIT 1").first());
    return page ? servePublicPage(request, env, ctx, page) : html(renderNotFound(), 404);
  }
  if (m = pathname.match(/^\/([a-zA-Z0-9-]+)\/?$/)) {
    const page = parsePage(await env.DB.prepare("SELECT * FROM pages WHERE slug=? AND published=1").bind(m[1].toLowerCase()).first());
    if (page) return servePublicPage(request, env, ctx, page);
  }
  return html(renderNotFound(), 404);
}
var src_default = {
  async fetch(request, env, ctx) {
    try {
      await ready(env);
      return await route(request, env, ctx);
    } catch (err) {
      if (err instanceof HttpError) return json({ error: err.message, code: err.code }, err.status);
      console.error(err);
      if (new URL(request.url).pathname.startsWith("/api/")) return json({ error: "Si è verificato un problema. Riprova tra poco." }, 500);
      return html(renderNotFound(), 500);
    }
  }
};

// scripts/single-entry.js
var STATIC = {
  "/static/admin.js": ['// public/static/theme.js\nvar FONTS = {\n  system: { name: "Sistema (senza Google Fonts)", q: null, stack: "system-ui,-apple-system,\'Segoe UI\',Roboto,sans-serif" },\n  inter: { name: "Inter", q: "Inter:wght@400;600;800", stack: "\'Inter\',system-ui,sans-serif" },\n  poppins: { name: "Poppins", q: "Poppins:wght@400;600;800", stack: "\'Poppins\',system-ui,sans-serif" },\n  montserrat: { name: "Montserrat", q: "Montserrat:wght@400;600;800", stack: "\'Montserrat\',system-ui,sans-serif" },\n  rubik: { name: "Rubik", q: "Rubik:wght@400;600;800", stack: "\'Rubik\',system-ui,sans-serif" },\n  dmsans: { name: "DM Sans", q: "DM+Sans:wght@400;600;800", stack: "\'DM Sans\',system-ui,sans-serif" },\n  syne: { name: "Syne", q: "Syne:wght@400;600;800", stack: "\'Syne\',system-ui,sans-serif" },\n  unbounded: { name: "Unbounded", q: "Unbounded:wght@400;600;800", stack: "\'Unbounded\',system-ui,sans-serif" },\n  archivo: { name: "Archivo Black", q: "Archivo+Black", stack: "\'Archivo Black\',Impact,sans-serif" },\n  anton: { name: "Anton", q: "Anton", stack: "\'Anton\',Impact,sans-serif" },\n  bebas: { name: "Bebas Neue", q: "Bebas+Neue", stack: "\'Bebas Neue\',Impact,sans-serif" },\n  oswald: { name: "Oswald", q: "Oswald:wght@400;600", stack: "\'Oswald\',Impact,sans-serif" },\n  playfair: { name: "Playfair Display", q: "Playfair+Display:wght@400;700", stack: "\'Playfair Display\',Georgia,serif" },\n  caveat: { name: "Caveat", q: "Caveat:wght@500;700", stack: "\'Caveat\',cursive" },\n  marker: { name: "Permanent Marker", q: "Permanent+Marker", stack: "\'Permanent Marker\',cursive" }\n};\nvar DEFAULT_THEME = {\n  bgType: "solid",\n  // solid | gradient | image\n  bgColor: "#0b0d17",\n  bgColor2: "#2a0d16",\n  gradientAngle: 180,\n  bgImage: null,\n  bgOverlay: 40,\n  textColor: "#ffffff",\n  font: "inter",\n  titleFont: "inter",\n  titleSize: 26,\n  titleUppercase: false,\n  avatarShape: "circle",\n  // circle | rounded | square | none\n  avatarSize: 96,\n  socialPosition: "top",\n  // top | bottom\n  btnStyle: "glow",\n  // fill | outline | glow | glass | hard\n  btnColor: "#0f1120",\n  btnTextColor: "#ffffff",\n  btnAccent: "#e5322d",\n  btnRadius: 28,\n  btnUppercase: true,\n  btnGap: 12,\n  btnFontSize: 14,\n  btnBorder: 2,\n  btnShadow: 14\n};\nvar RAW_PRESETS = [\n  { id: "f3dez", name: "F3DEZ Neon", theme: { ...DEFAULT_THEME } },\n  { id: "club", name: "Club viola", theme: { ...DEFAULT_THEME, bgType: "gradient", bgColor: "#160b33", bgColor2: "#5b1a8c", gradientAngle: 160, btnStyle: "glass", btnColor: "#ffffff", btnAccent: "#ffffff", font: "syne", btnRadius: 16, btnUppercase: false } },\n  { id: "tramonto", name: "Tramonto", theme: { ...DEFAULT_THEME, bgType: "gradient", bgColor: "#ff5e3a", bgColor2: "#ffb347", gradientAngle: 200, textColor: "#2b0f05", btnStyle: "fill", btnColor: "#2b0f05", btnTextColor: "#fff4e6", btnAccent: "#2b0f05", font: "poppins", btnRadius: 40, btnUppercase: false } },\n  { id: "mare", name: "Mare", theme: { ...DEFAULT_THEME, bgColor: "#e8f6fb", textColor: "#06364a", btnStyle: "fill", btnColor: "#0a7ea4", btnTextColor: "#ffffff", btnAccent: "#0a7ea4", font: "rubik", btnRadius: 14, btnUppercase: false } },\n  { id: "poster", name: "Poster", theme: { ...DEFAULT_THEME, bgColor: "#ffe600", textColor: "#111111", btnStyle: "hard", btnColor: "#ffffff", btnTextColor: "#111111", btnAccent: "#111111", font: "anton", btnRadius: 0, btnFontSize: 17, titleSize: 34, avatarShape: "square" } },\n  { id: "pulito", name: "Pulito", theme: { ...DEFAULT_THEME, bgColor: "#ffffff", textColor: "#17171c", btnStyle: "outline", btnColor: "#ffffff", btnTextColor: "#17171c", btnAccent: "#17171c", font: "dmsans", btnRadius: 10, btnUppercase: false } }\n];\nvar PRESETS = RAW_PRESETS.map((p) => ({ ...p, theme: { ...p.theme, titleFont: p.theme.font } }));\nvar COLOR_KEYS = ["bgColor", "bgColor2", "textColor", "btnColor", "btnTextColor", "btnAccent"];\nvar ENUMS = {\n  bgType: ["solid", "gradient", "image"],\n  avatarShape: ["circle", "rounded", "square", "none"],\n  socialPosition: ["top", "bottom"],\n  btnStyle: ["fill", "outline", "glow", "glass", "hard"]\n};\nvar RANGES = {\n  gradientAngle: [0, 360],\n  bgOverlay: [0, 85],\n  titleSize: [18, 48],\n  avatarSize: [56, 160],\n  btnRadius: [0, 40],\n  btnGap: [4, 28],\n  btnFontSize: [12, 22],\n  btnBorder: [0, 6],\n  btnShadow: [0, 30]\n};\nvar IMAGE_ID = /^[a-f0-9-]{36}$/;\nfunction sanitizeTheme(input) {\n  const t = { ...DEFAULT_THEME };\n  const src = input && typeof input === "object" ? input : {};\n  for (const k of COLOR_KEYS) if (/^#[0-9a-fA-F]{6}$/.test(src[k] ?? "")) t[k] = src[k].toLowerCase();\n  for (const k in ENUMS) if (ENUMS[k].includes(src[k])) t[k] = src[k];\n  for (const k in RANGES) {\n    const n = Number(src[k]);\n    if (src[k] !== void 0 && src[k] !== null && src[k] !== "" && Number.isFinite(n)) {\n      t[k] = Math.min(RANGES[k][1], Math.max(RANGES[k][0], Math.round(n)));\n    }\n  }\n  if (FONTS[src.font]) t.font = src.font;\n  if (FONTS[src.titleFont]) t.titleFont = src.titleFont;\n  else if (FONTS[src.font]) t.titleFont = src.font;\n  t.titleUppercase = !!src.titleUppercase;\n  t.btnUppercase = src.btnUppercase === void 0 ? t.btnUppercase : !!src.btnUppercase;\n  t.bgImage = IMAGE_ID.test(src.bgImage ?? "") ? src.bgImage : null;\n  if (t.bgType === "image" && !t.bgImage) t.bgType = "solid";\n  return t;\n}\nfunction fontHref(theme) {\n  const keys = [.../* @__PURE__ */ new Set([theme.font, theme.titleFont])].filter((k) => FONTS[k]?.q);\n  if (!keys.length) return "data:text/css,";\n  const families = keys.map((k) => `family=${FONTS[k].q}`).join("&");\n  return `https://fonts.googleapis.com/css2?${families}&display=swap`;\n}\nfunction contrastOn(hex) {\n  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);\n  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? "#111111" : "#ffffff";\n}\nfunction buttonCss(t) {\n  const a = t.btnAccent;\n  const w = t.btnBorder;\n  const soft = t.btnShadow ? `box-shadow:0 ${Math.round(t.btnShadow / 3)}px ${t.btnShadow}px #00000055;` : "";\n  switch (t.btnStyle) {\n    case "outline":\n      return `background:transparent;color:${t.btnTextColor};border:${Math.max(1, w)}px solid ${a};${soft}`;\n    case "glow":\n      return `background:${t.btnColor};color:${t.btnTextColor};border:${w}px solid ${a};box-shadow:0 ${Math.round(t.btnShadow / 4)}px ${t.btnShadow}px ${a}99;`;\n    case "glass":\n      return `background:${t.btnColor}26;color:${t.btnTextColor};border:${w}px solid ${a}55;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);${soft}`;\n    case "hard":\n      return `background:${t.btnColor};color:${t.btnTextColor};border:${Math.max(1, w)}px solid ${a};box-shadow:${Math.round(t.btnShadow / 3)}px ${Math.round(t.btnShadow / 3)}px 0 ${a};`;\n    default:\n      return `background:${t.btnColor};color:${t.btnTextColor};border:${w}px solid ${a};${soft}`;\n  }\n}\nfunction themeCss(input) {\n  const t = sanitizeTheme(input);\n  const font = (FONTS[t.font] || FONTS.inter).stack;\n  const titleFont = (FONTS[t.titleFont] || FONTS.inter).stack;\n  let layers = "";\n  if (t.bgType === "gradient") {\n    layers = `body::before{content:"";position:fixed;inset:0;z-index:-2;background:linear-gradient(${t.gradientAngle}deg,${t.bgColor},${t.bgColor2})}`;\n  } else if (t.bgType === "image" && t.bgImage) {\n    layers = `body::before{content:"";position:fixed;inset:0;z-index:-2;background:${t.bgColor} url(/img/${t.bgImage}) center/cover no-repeat}body::after{content:"";position:fixed;inset:0;z-index:-1;background:#000;opacity:${t.bgOverlay / 100}}`;\n  }\n  const avatarRadius = { circle: "50%", rounded: "22%", square: "0", none: "0" }[t.avatarShape];\n  return `html{background:${t.bgColor}}body{color:${t.textColor};font-family:${font}}${layers}.avatar{width:${t.avatarSize}px;height:${t.avatarSize}px;border-radius:${avatarRadius};${t.avatarShape === "none" ? "display:none;" : ""}}h1{font-family:${titleFont};font-size:${t.titleSize}px;${t.titleUppercase ? "text-transform:uppercase;" : ""}}.socials{order:${t.socialPosition === "bottom" ? 4 : 2}}.links{gap:${t.btnGap}px}.btn,.event{${buttonCss(t)}border-radius:${t.btnRadius}px;font-size:${t.btnFontSize}px;${t.btnUppercase ? "text-transform:uppercase;" : ""}}.thumb{border-radius:${Math.max(0, t.btnRadius - 6)}px}.cta,.badge{background:${t.btnAccent};color:${contrastOn(t.btnAccent)};border-radius:${Math.max(6, t.btnRadius - 8)}px}`;\n}\n\n// public/static/icons.js\nvar ICONS = {\n  "instagram": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"></path></svg>\',\n  "tiktok": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>\',\n  "facebook": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"></path></svg>\',\n  "whatsapp": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>\',\n  "youtube": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>\',\n  "x": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"></path></svg>\',\n  "telegram": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path></svg>\',\n  "spotify": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path></svg>\',\n  "snapchat": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"></path></svg>\',\n  "linkedin": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>\',\n  "website": \'<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>\',\n  "email": \'<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>\'\n};\n\n// public/static/visibility.js\nvar EVENT_GRACE_MS = 12 * 60 * 60 * 1e3;\nfunction effectiveEnd(item) {\n  if (item.ends_at) return Date.parse(item.ends_at);\n  if (item.kind === "event" && item.event_date) return Date.parse(item.event_date) + EVENT_GRACE_MS;\n  return null;\n}\nfunction itemStatus(item, now = Date.now()) {\n  if (!item.active) return "off";\n  if (item.starts_at && Date.parse(item.starts_at) > now) return "scheduled";\n  const end = effectiveEnd(item);\n  if (end !== null && end <= now) return "expired";\n  if (item.kind !== "section" && !item.url && !item.sold_out) return "no-url";\n  return "live";\n}\n\n// public/static/admin.js\nfunction h(tag, props = {}, ...kids) {\n  const el = document.createElement(tag);\n  for (const [k, v] of Object.entries(props || {})) {\n    if (v === null || v === void 0 || v === false) continue;\n    if (k === "class") el.className = v;\n    else if (k === "html") el.innerHTML = v;\n    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);\n    else if (k === "value" || k === "checked" || k === "disabled" || k === "hidden" || k === "open") el[k] = v;\n    else el.setAttribute(k, v === true ? "" : v);\n  }\n  el.append(...kids.flat().filter((c) => c !== null && c !== void 0 && c !== false));\n  return el;\n}\nvar svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;\nvar UI = {\n  star: \'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.5 7.1.7-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.7z"/></svg>\',\n  links: svg(\'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>\'),\n  brush: svg(\'<path d="M18.4 2.6a2 2 0 0 1 3 3L12 15l-4-4z"/><path d="M7 14c-2 0-3 1.5-3 3 0 1.5-1 2.5-2 3 1 .7 3 1 5 1 2.5 0 4-1.5 4-3.5 0-2-1.8-3.5-4-3.5z"/>\'),\n  chart: svg(\'<path d="M3 3v18h18"/><path d="M7 15l4-5 4 3 5-7"/>\'),\n  gear: svg(\'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3.1 14H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.1a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>\'),\n  plus: svg(\'<path d="M12 5v14M5 12h14"/>\'),\n  grip: svg(\'<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>\'),\n  copy: svg(\'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>\'),\n  open: svg(\'<path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/>\'),\n  trash: svg(\'<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>\'),\n  image: svg(\'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>\'),\n  logout: svg(\'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>\'),\n  phone: svg(\'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>\'),\n  close: svg(\'<path d="M18 6L6 18M6 6l12 12"/>\'),\n  calendar: svg(\'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>\'),\n  section: svg(\'<path d="M4 6h16M4 12h10M4 18h7"/>\')\n};\nvar raw = (markup) => {\n  const s = document.createElement("span");\n  s.style.display = "contents";\n  s.innerHTML = markup;\n  return s;\n};\nvar $ = (sel, root = document) => root.querySelector(sel);\nfunction toast(message, kind = "") {\n  const el = h("div", { class: `toast ${kind}`, role: kind === "error" ? "alert" : "status" }, message);\n  $("#toasts").append(el);\n  setTimeout(() => el.remove(), kind === "error" ? 6e3 : 2600);\n}\nvar store = {\n  get(k) {\n    try {\n      return localStorage.getItem(k);\n    } catch {\n      return null;\n    }\n  },\n  set(k, v) {\n    try {\n      localStorage.setItem(k, v);\n    } catch {\n    }\n  }\n};\nasync function copyText(value) {\n  try {\n    await navigator.clipboard.writeText(value);\n    toast("Link copiato");\n  } catch {\n    toast(`Copia manualmente: ${value}`);\n  }\n}\nasync function api(path, method = "GET", body) {\n  let res;\n  try {\n    res = await fetch(`/api${path}`, {\n      method,\n      headers: method === "GET" ? {} : { "Content-Type": "application/json" },\n      body: body === void 0 ? void 0 : JSON.stringify(body)\n    });\n  } catch {\n    throw new Error("Connessione assente. Controlla internet e riprova.");\n  }\n  const data = await res.json().catch(() => ({}));\n  if (res.status === 401 && path !== "/login") {\n    S.authenticated = false;\n    showLogin("Sessione scaduta. Accedi di nuovo.");\n    throw new Error("Sessione scaduta.");\n  }\n  if (!res.ok) {\n    const e = new Error(data.error || "Si è verificato un problema. Riprova.");\n    e.code = data.code;\n    throw e;\n  }\n  return data;\n}\nvar S = { pages: [], page: null, tab: "content", expanded: /* @__PURE__ */ new Set(), clicks: {}, bgMode: null, stats: null, statsQ: null, authenticated: false };\nvar pending = /* @__PURE__ */ new Map();\nfunction schedule(key, fn, ms = 650) {\n  clearTimeout(pending.get(key)?.timer);\n  setSaveState("pending");\n  pending.set(key, { fn, timer: setTimeout(() => runPending(key), ms) });\n}\nasync function runPending(key) {\n  const job = pending.get(key);\n  if (!job) return;\n  clearTimeout(job.timer);\n  pending.delete(key);\n  await job.fn();\n}\nvar flushAll = () => Promise.all([...pending.keys()].map(runPending));\nwindow.addEventListener("beforeunload", (e) => {\n  if (pending.size) {\n    flushAll();\n    e.preventDefault();\n  }\n});\nvar inFlight = 0;\nfunction setSaveState(state, message) {\n  const el = $("#save-state");\n  if (!el) return;\n  el.className = `save-state ${state === "error" ? "error" : ""}`;\n  el.textContent = { pending: "Modifiche in corso…", saving: "Salvataggio…", saved: "Tutto salvato", error: message || "Non salvato" }[state] || "";\n}\nasync function saving(fn) {\n  inFlight += 1;\n  setSaveState("saving");\n  try {\n    const out = await fn();\n    inFlight -= 1;\n    if (!inFlight && !pending.size) setSaveState("saved");\n    return out;\n  } catch (e) {\n    inFlight -= 1;\n    setSaveState("error", "Non salvato");\n    toast(e.message, "error");\n    throw e;\n  }\n}\nvar app = () => $("#app");\nfunction showLogin(notice) {\n  let error = notice || "";\n  const errorEl = h("p", { class: "form-error", hidden: !error, role: "alert" }, error);\n  const pwd = h("input", { type: "password", id: "login-password", autocomplete: "current-password", required: true });\n  const submit = h("button", { class: "btn primary", type: "submit" }, "Accedi");\n  const form = h(\n    "form",\n    {\n      class: "login",\n      onsubmit: async (e) => {\n        e.preventDefault();\n        submit.disabled = true;\n        submit.textContent = "Accesso…";\n        errorEl.hidden = true;\n        try {\n          await api("/login", "POST", { password: pwd.value });\n          await startApp();\n        } catch (err) {\n          errorEl.textContent = err.message;\n          errorEl.hidden = false;\n          submit.disabled = false;\n          submit.textContent = "Accedi";\n          pwd.select();\n        }\n      }\n    },\n    h("div", { class: "wordmark" }, raw(UI.star), h("span", {}, "ESL Links")),\n    h("p", { class: "hint" }, "Gestisci le pagine di tutti i tuoi brand."),\n    h("div", { class: "field" }, h("label", { for: "login-password" }, "Password"), pwd),\n    errorEl,\n    submit\n  );\n  app().replaceChildren(h("div", { class: "center-screen" }, form));\n  pwd.focus();\n}\nasync function startApp() {\n  app().replaceChildren(h("div", { class: "center-screen" }, h("div", { class: "loading" }, "Caricamento…")));\n  S.authenticated = true;\n  const { pages } = await api("/pages");\n  S.pages = pages;\n  const saved = Number(store.get("page"));\n  const start = pages.find((p) => p.id === saved) || pages[0];\n  renderShell();\n  await selectPage(start.id);\n}\nasync function boot() {\n  try {\n    const me = await api("/me");\n    if (me.authenticated) await startApp();\n    else showLogin(me.passwordConfigured ? "" : "Password non ancora impostata. Aggiungi il secret ADMIN_PASSWORD su Cloudflare, con almeno 10 caratteri.");\n  } catch (e) {\n    app().replaceChildren(h("div", { class: "center-screen" }, h(\n      "div",\n      { class: "login" },\n      h("p", { class: "form-error" }, e.message),\n      h("button", { class: "btn primary", onclick: boot }, "Riprova")\n    )));\n  }\n}\nvar TABS = [\n  { id: "content", label: "Contenuti", icon: UI.links, wide: false },\n  { id: "design", label: "Aspetto", icon: UI.brush, wide: false },\n  { id: "stats", label: "Statistiche", icon: UI.chart, wide: true },\n  { id: "settings", label: "Impostazioni", icon: UI.gear, wide: false }\n];\nfunction renderShell() {\n  const select = h("select", { id: "brand-select", "aria-label": "Brand", onchange: (e) => selectPage(Number(e.target.value)) });\n  const nav = h("nav", { class: "nav", "aria-label": "Sezioni" }, TABS.map((t) => h("button", { type: "button", "data-tab": t.id, onclick: () => setTab(t.id) }, raw(t.icon), h("span", {}, t.label))));\n  const shell = h(\n    "div",\n    { class: "shell" },\n    h(\n      "aside",\n      { class: "rail" },\n      h("div", { class: "wordmark" }, raw(UI.star), h("span", {}, "ESL Links")),\n      h("div", { class: "brand-switch" }, h("label", { for: "brand-select" }, "Brand"), select),\n      nav,\n      h(\n        "div",\n        { class: "rail-foot" },\n        h("button", { type: "button", title: "Nuovo brand", "aria-label": "Nuovo brand", onclick: newBrandDialog }, raw(UI.plus), h("span", {}, "Nuovo brand")),\n        h("button", { type: "button", title: "Esci", "aria-label": "Esci", onclick: logout }, raw(UI.logout), h("span", {}, "Esci"))\n      )\n    ),\n    h("main", { class: "main" }, h("div", { class: "main-inner", id: "panel" })),\n    h(\n      "aside",\n      { class: "preview", id: "preview", "aria-label": "Anteprima" },\n      h("div", { class: "preview-label" }, "Anteprima dal vivo"),\n      h("div", { class: "phone", id: "phone" }, h("div", { class: "phone-screen", id: "phone-screen" }, h("iframe", { id: "preview-frame", title: "Anteprima della pagina" }))),\n      h("button", { class: "btn preview-close", type: "button", onclick: () => togglePreview(false) }, raw(UI.close), "Chiudi")\n    ),\n    h("button", { class: "btn primary preview-fab", type: "button", onclick: () => togglePreview(true) }, raw(UI.phone), "Anteprima")\n  );\n  app().replaceChildren(shell);\n  $("#preview-frame").addEventListener("load", applyThemeToPreview);\n  sizePhone();\n  syncBrandSelect();\n}\nfunction syncBrandSelect() {\n  const select = $("#brand-select");\n  if (!select) return;\n  select.replaceChildren(...S.pages.map((p) => h("option", { value: p.id }, `${p.title}${p.published ? "" : " (non online)"}`)));\n  if (S.page) select.value = S.page.id;\n}\nfunction togglePreview(open) {\n  $("#preview").classList.toggle("open", open);\n  sizePhone();\n}\nfunction sizePhone() {\n  const screen = $("#phone-screen");\n  const frame = $("#preview-frame");\n  if (!screen || !frame) return;\n  const FRAME_W = 390;\n  const FRAME_H = 800;\n  const overlay = $("#preview").classList.contains("open");\n  const availH = window.innerHeight - (overlay ? 124 : 76);\n  const availW = overlay ? window.innerWidth - 48 : 300;\n  const scale = Math.min(availH / FRAME_H, availW / FRAME_W, 1);\n  frame.style.height = `${FRAME_H}px`;\n  frame.style.transform = `scale(${scale})`;\n  screen.style.width = `${Math.round(FRAME_W * scale)}px`;\n  screen.style.height = `${Math.round(FRAME_H * scale)}px`;\n}\nvar resizeTimer;\nwindow.addEventListener("resize", () => {\n  sizePhone();\n  clearTimeout(resizeTimer);\n  resizeTimer = setTimeout(() => {\n    if (S.tab === "stats" && S.stats) drawChartInto();\n  }, 150);\n});\nasync function selectPage(id) {\n  await flushAll();\n  const panel = $("#panel");\n  panel.replaceChildren(h("div", { class: "loading" }, "Caricamento…"));\n  try {\n    S.page = await api(`/pages/${id}`);\n  } catch (e) {\n    panel.replaceChildren(h("div", { class: "empty" }, e.message, " ", h("button", { class: "btn", onclick: () => selectPage(id) }, "Riprova")));\n    return;\n  }\n  store.set("page", String(id));\n  S.expanded.clear();\n  S.clicks = {};\n  S.bgMode = null;\n  S.statsQ = null;\n  syncBrandSelect();\n  $("#preview-frame").src = `/admin/preview/${id}`;\n  renderTab();\n  loadClicks(id);\n}\nasync function loadClicks(id) {\n  const to = /* @__PURE__ */ new Date();\n  const from = new Date(Date.now() - 29 * 864e5);\n  try {\n    const r = await api(`/stats?page=${id}&from=${isoDay(from)}&to=${isoDay(to)}`);\n    if (S.page?.id !== id) return;\n    S.clicks = Object.fromEntries(r.items.map((i) => [i.id, i.clicks]));\n    S.page.items.forEach(refreshItemRow);\n  } catch {\n  }\n}\nasync function setTab(id) {\n  await flushAll();\n  S.tab = id;\n  togglePreview(false);\n  renderTab();\n  window.scrollTo(0, 0);\n}\nfunction renderTab() {\n  document.querySelectorAll(".nav button").forEach((b) => {\n    if (b.dataset.tab === S.tab) b.setAttribute("aria-current", "page");\n    else b.removeAttribute("aria-current");\n  });\n  const tab = TABS.find((t) => t.id === S.tab);\n  const panel = $("#panel");\n  panel.classList.toggle("main-wide", tab.wide);\n  $(".shell").style.gridTemplateColumns = tab.wide ? "var(--stats-cols, 232px minmax(0,1fr))" : "";\n  $("#preview").style.visibility = tab.wide ? "hidden" : "";\n  $("#preview").style.width = tab.wide ? "0" : "";\n  $("#preview").style.padding = tab.wide ? "0" : "";\n  $(".preview-fab").hidden = tab.wide;\n  panel.replaceChildren(...{ content: contentTab, design: designTab, stats: statsTab, settings: settingsTab }[S.tab]());\n}\nvar pageUrl = (p) => `${location.origin}/${p.slug}`;\nfunction topline(title) {\n  const p = S.page;\n  return h(\n    "div",\n    { class: "topline" },\n    h("div", {}, h("h1", {}, title), h("div", { class: "save-state", id: "save-state", role: "status" }, "Tutto salvato")),\n    h(\n      "div",\n      { class: "url-box" },\n      h("code", {}, pageUrl(p).replace(/^https?:\\/\\//, "")),\n      h("button", { class: "icon-btn", type: "button", title: "Copia link", "aria-label": "Copia link", onclick: () => copyText(pageUrl(p)) }, raw(UI.copy)),\n      h("a", { class: "icon-btn", href: pageUrl(p), target: "_blank", rel: "noopener", title: "Apri pagina pubblica", "aria-label": "Apri pagina pubblica" }, raw(UI.open))\n    )\n  );\n}\nfunction offlineBanner() {\n  if (S.page.published) return null;\n  return h(\n    "div",\n    { class: "banner" },\n    h("span", {}, "Questo brand non è ancora online. Solo tu puoi vederlo in anteprima."),\n    h("button", { class: "btn primary", type: "button", onclick: async () => {\n      await savePageNow({ published: true });\n      renderTab();\n      toast("Il brand è online");\n    } }, "Metti online")\n  );\n}\nvar previewTimer;\nfunction reloadPreview() {\n  clearTimeout(previewTimer);\n  previewTimer = setTimeout(() => {\n    const frame = $("#preview-frame");\n    try {\n      frame.contentWindow.location.reload();\n    } catch {\n      frame.src = frame.src;\n    }\n  }, 250);\n}\nfunction applyThemeToPreview() {\n  const frame = $("#preview-frame");\n  const doc = frame?.contentDocument;\n  if (!S.page) return;\n  $("#phone-screen").style.background = S.page.theme.bgColor;\n  if (!doc) return;\n  const style = doc.getElementById("theme");\n  const font = doc.getElementById("font");\n  if (style) style.textContent = themeCss(S.page.theme);\n  const href = fontHref(S.page.theme);\n  if (font && font.getAttribute("href") !== href) font.setAttribute("href", href);\n}\nvar pagePatch = {};\nfunction savePageSoon(patch) {\n  Object.assign(S.page, patch);\n  Object.assign(pagePatch, patch);\n  const id = S.page.id;\n  schedule(`page${id}`, async () => {\n    const body = pagePatch;\n    pagePatch = {};\n    try {\n      const saved = await saving(() => api(`/pages/${id}`, "PUT", body));\n      if (S.page?.id === id) {\n        if (body.socials) S.page.socials = saved.socials;\n        mergePageSummary(saved);\n        reloadPreview();\n      }\n    } catch {\n    }\n  });\n}\nasync function savePageNow(patch) {\n  await flushAll();\n  const saved = await saving(() => api(`/pages/${S.page.id}`, "PUT", patch));\n  Object.assign(S.page, saved, { items: S.page.items });\n  mergePageSummary(saved);\n  reloadPreview();\n  return saved;\n}\nfunction mergePageSummary(saved) {\n  const i = S.pages.findIndex((p) => p.id === saved.id);\n  if (i >= 0) S.pages[i] = saved;\n  syncBrandSelect();\n}\nasync function compressImage(file, { size, square, ratio, lossless }) {\n  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") throw new Error("Scegli una foto in formato JPG, PNG o WebP.");\n  let bitmap;\n  try {\n    bitmap = await createImageBitmap(file);\n  } catch {\n    throw new Error("Non riesco a leggere questa immagine. Provane un’altra.");\n  }\n  let sx = 0;\n  let sy = 0;\n  let sw = bitmap.width;\n  let sh = bitmap.height;\n  const target = square ? 1 : ratio;\n  if (target) {\n    if (sw / sh > target) {\n      const w = sh * target;\n      sx = (sw - w) / 2;\n      sw = w;\n    } else {\n      const hh = sw / target;\n      sy = (sh - hh) / 2;\n      sh = hh;\n    }\n  }\n  const scale = Math.min(1, size / Math.max(sw, sh));\n  const canvas = document.createElement("canvas");\n  canvas.width = Math.round(sw * scale);\n  canvas.height = Math.round(sh * scale);\n  canvas.getContext("2d").drawImage(bitmap, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);\n  const toBlob = (type, q) => new Promise((res) => canvas.toBlob(res, type, q));\n  let blob = await toBlob("image/webp", 0.82);\n  if (!blob || blob.type !== "image/webp") blob = await toBlob(lossless ? "image/png" : "image/jpeg", 0.82);\n  const data = await new Promise((res, rej) => {\n    const r = new FileReader();\n    r.onload = () => res(String(r.result).split(",")[1]);\n    r.onerror = () => rej(new Error("Lettura dell’immagine non riuscita."));\n    r.readAsDataURL(blob);\n  });\n  return { mime: blob.type, data };\n}\nfunction imageField({ id, label, value, options, wide, onChange }) {\n  const box = h("div", { class: `thumb-box ${wide ? "wide" : ""}` });\n  const setBox = (v) => {\n    box.classList.toggle("filled", !!v);\n    box.style.backgroundImage = v ? `url(/img/${v})` : "";\n    box.replaceChildren(...v ? [] : [raw(UI.image)]);\n  };\n  setBox(value);\n  let current = value;\n  const input = h("input", { type: "file", id, accept: "image/jpeg,image/png,image/webp,image/heic" });\n  const upload = h("label", { class: "btn", for: id }, current ? "Sostituisci" : "Carica");\n  const remove = h("button", { class: "btn", type: "button", hidden: !current, onclick: async () => {\n    current = null;\n    setBox(null);\n    remove.hidden = true;\n    upload.textContent = "Carica";\n    await onChange(null);\n  } }, "Rimuovi");\n  input.addEventListener("change", async () => {\n    const file = input.files[0];\n    if (!file) return;\n    upload.textContent = "Caricamento…";\n    try {\n      const payload = await compressImage(file, options);\n      const { id: imageId } = await saving(() => api("/images", "POST", payload));\n      current = imageId;\n      setBox(imageId);\n      remove.hidden = false;\n      await onChange(imageId);\n    } catch (e) {\n      if (!/salvat/i.test(e.message)) toast(e.message, "error");\n    }\n    upload.textContent = current ? "Sostituisci" : "Carica";\n    input.value = "";\n  });\n  return h(\n    "div",\n    { class: "field" },\n    h("span", { class: "field-label" }, label),\n    h("div", { class: "image-field" }, box, h("div", { class: "ctrl" }, input, upload, remove))\n  );\n}\nvar SOCIAL_LABELS = { instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook", whatsapp: "WhatsApp", youtube: "YouTube", x: "X", telegram: "Telegram", spotify: "Spotify", snapchat: "Snapchat", linkedin: "LinkedIn", website: "Sito web", email: "Email" };\nfunction contentTab() {\n  const p = S.page;\n  const list = h("div", { class: "items", id: "items" });\n  const socials = { ...p.socials };\n  const out = [\n    topline("Contenuti"),\n    offlineBanner(),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Profilo"),\n      imageField({\n        id: "avatar-upload",\n        label: "Logo o foto",\n        value: p.avatar_image,\n        options: { size: 512, square: true, lossless: true },\n        onChange: (v) => savePageNow({ avatar_image: v })\n      }),\n      h(\n        "div",\n        { class: "field" },\n        h("label", { for: "page-title" }, "Nome del brand"),\n        h("input", { id: "page-title", type: "text", value: p.title, maxlength: 120, oninput: (e) => {\n          if (e.target.value.trim()) savePageSoon({ title: e.target.value });\n        } })\n      ),\n      h(\n        "div",\n        { class: "field" },\n        h("label", { for: "page-bio" }, "Descrizione"),\n        h("textarea", { id: "page-bio", maxlength: 500, value: p.bio, oninput: (e) => savePageSoon({ bio: e.target.value }) })\n      ),\n      h(\n        "details",\n        {},\n        h("summary", { id: "social-count" }, `Social (${Object.keys(p.socials).length})`),\n        h("div", { class: "socials-grid" }, Object.keys(SOCIAL_LABELS).map((key) => h(\n          "div",\n          { class: "social-field" },\n          raw(ICONS[key]),\n          h("input", {\n            id: `social-${key}`,\n            type: "text",\n            "aria-label": SOCIAL_LABELS[key],\n            placeholder: SOCIAL_LABELS[key],\n            value: socials[key] || "",\n            oninput: (e) => {\n              socials[key] = e.target.value;\n              savePageSoon({ socials: { ...socials } });\n              $("#social-count").textContent = `Social (${Object.values(socials).filter((v) => String(v).trim()).length})`;\n            }\n          })\n        ))),\n        h("p", { class: "hint", style: "margin-top:10px" }, "Puoi scrivere @nomeutente oppure incollare il link completo.")\n      )\n    ),\n    h(\n      "div",\n      { class: "add-row" },\n      h("button", { class: "btn primary", type: "button", id: "add-link", onclick: () => addItem("link") }, raw(UI.plus), "Link"),\n      h("button", { class: "btn", type: "button", id: "add-event", onclick: () => addItem("event") }, raw(UI.calendar), "Evento"),\n      h("button", { class: "btn", type: "button", id: "add-section", onclick: () => addItem("section") }, raw(UI.section), "Sezione")\n    ),\n    list\n  ];\n  renderItems(list);\n  return out.filter(Boolean);\n}\nfunction renderItems(list = $("#items")) {\n  if (!list) return;\n  const items = S.page.items;\n  if (!items.length) {\n    list.replaceChildren(h("div", { class: "empty" }, "Nessun link per ora. Aggiungi il primo con il pulsante Link."));\n    return;\n  }\n  list.replaceChildren(...items.map(itemRow));\n}\nasync function addItem(kind) {\n  await flushAll();\n  const defaults = kind === "event" ? { kind, title: "Nuovo evento", pinned: true, cta_label: "Get Tickets" } : kind === "section" ? { kind, title: "Nuova sezione" } : { kind, title: "Nuovo link" };\n  try {\n    const item = await saving(() => api(`/pages/${S.page.id}/items`, "POST", defaults));\n    S.page.items.unshift(item);\n    S.expanded.add(item.id);\n    renderItems();\n    reloadPreview();\n    const first = $(`#item-${item.id}-title`);\n    if (first) {\n      first.focus();\n      first.select();\n    }\n  } catch {\n  }\n}\nvar STATUS = {\n  live: ["Online", "live"],\n  off: ["Disattivato", ""],\n  scheduled: ["Programmato", "info"],\n  expired: ["Terminato", "warn"],\n  "no-url": ["Manca il link", "bad"]\n};\nfunction itemSummary(item) {\n  if (item.kind === "section") return "Sezione";\n  if (item.kind === "event" && item.event_date) return `${new Date(item.event_date).toLocaleString("it-IT", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`;\n  return item.url || item.subtitle || "";\n}\nfunction refreshItemRow(item) {\n  const row = document.querySelector(`.item[data-id="${item.id}"]`);\n  if (!row) return;\n  row.classList.toggle("off", !item.active);\n  $(".item-title", row).textContent = item.title || "Senza titolo";\n  $(".item-sub", row).textContent = itemSummary(item);\n  const [label, cls] = STATUS[itemStatus(item)];\n  const chips = [h("span", { class: `chip ${cls}` }, label)];\n  if (item.pinned) chips.push(h("span", { class: "chip plain info" }, "In evidenza"));\n  if (item.sold_out) chips.push(h("span", { class: "chip plain bad" }, "Sold out"));\n  if (item.kind !== "section") chips.push(h("span", {}, `${S.clicks[item.id] || 0} clic in 30 giorni`));\n  $(".item-meta", row).replaceChildren(...chips);\n  const thumb = $(".item-thumb", row);\n  if (thumb) {\n    thumb.style.backgroundImage = item.thumb_image ? `url(/img/${item.thumb_image})` : "";\n    thumb.replaceChildren(...item.thumb_image ? [] : [raw(item.kind === "event" ? UI.calendar : UI.links)]);\n  }\n}\nfunction itemRow(item) {\n  const row = h("article", { class: `item ${item.kind === "section" ? "section-item" : ""}`, "data-id": item.id });\n  const handle = h("button", { class: "handle", type: "button", "aria-label": `Sposta ${item.title}. Usa le frecce su e giù.`, title: "Trascina per riordinare" }, raw(UI.grip));\n  enableDrag(handle, row);\n  const toggle = h(\n    "label",\n    { class: "switch", title: "Attiva o disattiva" },\n    h("input", { type: "checkbox", checked: !!item.active, "aria-label": `Attiva ${item.title}`, onchange: (e) => saveItemSoon(item, { active: e.target.checked ? 1 : 0 }, 0) }),\n    h("span", {})\n  );\n  const body = h(\n    "button",\n    { class: "item-body", type: "button", "aria-expanded": S.expanded.has(item.id) ? "true" : "false", onclick: () => toggleEditor(item, row) },\n    h("span", { class: "item-title" }),\n    h("span", { class: "item-sub" }),\n    h("span", { class: "item-meta" })\n  );\n  row.append(h("div", { class: "item-head" }, handle, item.kind === "section" ? null : h("div", { class: "item-thumb" }), body, toggle));\n  if (S.expanded.has(item.id)) row.append(itemEditor(item));\n  queueMicrotask(() => refreshItemRow(item));\n  return row;\n}\nfunction toggleEditor(item, row) {\n  const open = S.expanded.has(item.id);\n  $(".item-body", row).setAttribute("aria-expanded", String(!open));\n  if (open) {\n    S.expanded.delete(item.id);\n    $(".item-editor", row)?.remove();\n    return;\n  }\n  S.expanded.add(item.id);\n  row.append(itemEditor(item));\n}\nvar itemPatches = /* @__PURE__ */ new Map();\nfunction saveItemSoon(item, patch, ms = 650) {\n  Object.assign(item, patch);\n  refreshItemRow(item);\n  itemPatches.set(item.id, { ...itemPatches.get(item.id) || {}, ...patch });\n  schedule(`item${item.id}`, async () => {\n    const body = itemPatches.get(item.id);\n    itemPatches.delete(item.id);\n    try {\n      const saved = await saving(() => api(`/items/${item.id}`, "PUT", body));\n      if ("url" in body && !itemPatches.get(item.id)?.url) {\n        item.url = saved.url;\n        const urlInput = document.getElementById(`item-${item.id}-url`);\n        if (urlInput && document.activeElement !== urlInput) urlInput.value = saved.url;\n      }\n      refreshItemRow(item);\n      reloadPreview();\n    } catch {\n    }\n  }, ms);\n}\nfunction toLocalInput(iso) {\n  if (!iso) return "";\n  const d = new Date(iso);\n  const pad = (n) => String(n).padStart(2, "0");\n  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;\n}\nvar fromLocalInput = (v) => v ? new Date(v).toISOString() : null;\nfunction dateField(item, key, label) {\n  const id = `item-${item.id}-${key}`;\n  return h(\n    "div",\n    { class: "field" },\n    h("label", { for: id }, label),\n    h("input", { id, type: "datetime-local", value: toLocalInput(item[key]), onchange: (e) => saveItemSoon(item, { [key]: fromLocalInput(e.target.value) }, 0) })\n  );\n}\nfunction textField(item, key, label, placeholder = "", inputType = "text") {\n  const id = `item-${item.id}-${key === "title" ? "title" : key === "url" ? "url" : key}`;\n  return h(\n    "div",\n    { class: "field" },\n    h("label", { for: id }, label),\n    h("input", { id, type: inputType, placeholder, value: item[key] || "", oninput: (e) => saveItemSoon(item, { [key]: e.target.value }), onblur: () => flushAll() })\n  );\n}\nfunction switchRow(item, key, title, hint) {\n  return h(\n    "div",\n    { class: "toggle-row" },\n    h("div", {}, h("strong", {}, title), hint ? h("p", { class: "hint" }, hint) : null),\n    h("label", { class: "switch" }, h("input", { type: "checkbox", "aria-label": title, id: `item-${item.id}-${key}`, checked: !!item[key], onchange: (e) => saveItemSoon(item, { [key]: e.target.checked ? 1 : 0 }, 0) }), h("span", {}))\n  );\n}\nfunction itemEditor(item) {\n  const parts = [];\n  if (item.kind === "section") {\n    parts.push(textField(item, "title", "Titolo della sezione"));\n    parts.push(h("p", { class: "hint" }, "I link che seguono questa sezione nell’elenco appartengono a lei. Se nessuno è visibile, il titolo si nasconde da solo."));\n    parts.push(h("div", { class: "grid-2" }, dateField(item, "starts_at", "Mostra dal"), dateField(item, "ends_at", "Nascondi dal")));\n  } else if (item.kind === "event") {\n    parts.push(textField(item, "title", "Nome dell’evento"));\n    parts.push(textField(item, "subtitle", "Descrizione", "Luogo, line-up, dettagli"));\n    parts.push(h("div", { class: "grid-2" }, dateField(item, "event_date", "Data e ora dell’evento"), dateField(item, "ends_at", "Fine evento (poi si nasconde)")));\n    parts.push(h("p", { class: "hint" }, "Senza una fine, l’evento si nasconde 12 ore dopo l’inizio."));\n    parts.push(textField(item, "url", "Link del pulsante", "https://…"));\n    const ctaId = `item-${item.id}-cta_label`;\n    parts.push(h(\n      "div",\n      { class: "field" },\n      h("label", { for: ctaId }, "Testo del pulsante"),\n      h("input", { id: ctaId, type: "text", list: "cta-options", maxlength: 40, value: item.cta_label || "", placeholder: "Get Tickets", oninput: (e) => saveItemSoon(item, { cta_label: e.target.value }) }),\n      h("datalist", { id: "cta-options" }, ["Get Tickets", "Join WhatsApp", "Register Now"].map((v) => h("option", { value: v })))\n    ));\n    parts.push(imageField({ id: `item-${item.id}-image`, label: "Immagine dell’evento", wide: true, value: item.thumb_image, options: { size: 1200, ratio: 16 / 9 }, onChange: async (v) => {\n      saveItemSoon(item, { thumb_image: v }, 0);\n      await flushAll();\n    } }));\n    parts.push(dateField(item, "starts_at", "Mostra sulla pagina dal (facoltativo)"));\n    parts.push(switchRow(item, "pinned", "In evidenza in cima", "Appare sopra tutti gli altri link."));\n    parts.push(switchRow(item, "sold_out", "SOLD OUT", "Mostra il badge e blocca il pulsante."));\n  } else {\n    parts.push(textField(item, "title", "Titolo"));\n    parts.push(textField(item, "subtitle", "Descrizione (facoltativa)"));\n    parts.push(textField(item, "url", "Link", "https://…"));\n    const iconId = `item-${item.id}-icon`;\n    parts.push(\n      h(\n        "div",\n        { class: "grid-2" },\n        imageField({ id: `item-${item.id}-image`, label: "Miniatura", value: item.thumb_image, options: { size: 240, square: true, lossless: true }, onChange: async (v) => {\n          saveItemSoon(item, { thumb_image: v }, 0);\n          await flushAll();\n        } }),\n        h(\n          "div",\n          { class: "field" },\n          h("label", { for: iconId }, "Icona (senza miniatura)"),\n          h(\n            "select",\n            { id: iconId, onchange: (e) => saveItemSoon(item, { icon: e.target.value }, 0) },\n            h("option", { value: "auto" }, "Automatica dal link"),\n            h("option", { value: "none" }, "Nessuna"),\n            Object.keys(SOCIAL_LABELS).map((k) => h("option", { value: k }, SOCIAL_LABELS[k]))\n          )\n        )\n      )\n    );\n    parts.push(h("div", { class: "grid-2" }, dateField(item, "starts_at", "Mostra dal"), dateField(item, "ends_at", "Nascondi dal")));\n    parts.push(switchRow(item, "pinned", "In evidenza in cima", "Pulsante più grande, sopra tutti gli altri link."));\n    parts.push(switchRow(item, "sold_out", "SOLD OUT", "Mostra il badge e blocca il link."));\n  }\n  parts.push(h(\n    "div",\n    { class: "item-tools" },\n    h("button", { class: "btn", type: "button", onclick: () => duplicateItem(item) }, raw(UI.copy), "Duplica"),\n    h("button", { class: "btn danger", type: "button", onclick: () => deleteItem(item) }, raw(UI.trash), "Elimina")\n  ));\n  const editor = h("div", { class: "item-editor" }, parts);\n  const icon = editor.querySelector(`#item-${item.id}-icon`);\n  if (icon) icon.value = item.icon || "auto";\n  return editor;\n}\nasync function duplicateItem(item) {\n  await flushAll();\n  try {\n    const copy = await saving(() => api(`/items/${item.id}/duplicate`, "POST", {}));\n    S.page.items.splice(S.page.items.indexOf(item) + 1, 0, copy);\n    S.expanded.add(copy.id);\n    renderItems();\n    reloadPreview();\n    toast("Copia creata");\n  } catch {\n  }\n}\nasync function deleteItem(item) {\n  const yes = await confirmDialog(`Eliminare “${item.title || "questo elemento"}”?`, "L’azione non si può annullare. Le statistiche già raccolte restano nel totale.", "Elimina");\n  if (!yes) return;\n  clearTimeout(pending.get(`item${item.id}`)?.timer);\n  pending.delete(`item${item.id}`);\n  itemPatches.delete(item.id);\n  try {\n    await saving(() => api(`/items/${item.id}`, "DELETE"));\n    S.page.items = S.page.items.filter((i) => i !== item);\n    S.expanded.delete(item.id);\n    renderItems();\n    reloadPreview();\n  } catch {\n  }\n}\nfunction saveOrder() {\n  const list = $("#items");\n  const ids = [...list.querySelectorAll(".item")].map((r) => Number(r.dataset.id));\n  S.page.items = ids.map((id) => S.page.items.find((i) => i.id === id));\n  saving(() => api(`/pages/${S.page.id}/order`, "PUT", { ids })).then(reloadPreview).catch(() => {\n  });\n}\nfunction enableDrag(handle, row) {\n  const onMove = (e) => {\n    const list = row.parentElement;\n    if (e.clientY < 70) window.scrollBy(0, -12);\n    if (e.clientY > window.innerHeight - 70) window.scrollBy(0, 12);\n    const prev = row.previousElementSibling;\n    const next = row.nextElementSibling;\n    if (prev) {\n      const box = prev.getBoundingClientRect();\n      if (e.clientY < box.top + box.height / 2) {\n        row.after(prev);\n        return;\n      }\n    }\n    if (next) {\n      const box = next.getBoundingClientRect();\n      if (e.clientY > box.top + box.height / 2) list.insertBefore(next, row);\n    }\n  };\n  const onEnd = () => {\n    window.removeEventListener("pointermove", onMove);\n    window.removeEventListener("pointerup", onEnd);\n    window.removeEventListener("pointercancel", onEnd);\n    row.classList.remove("dragging");\n    const before = S.page.items.map((i) => i.id).join();\n    const after = [...row.parentElement.children].map((r) => r.dataset.id).join();\n    if (before !== after) saveOrder();\n  };\n  handle.addEventListener("pointerdown", (e) => {\n    if (e.button) return;\n    e.preventDefault();\n    row.classList.add("dragging");\n    window.addEventListener("pointermove", onMove);\n    window.addEventListener("pointerup", onEnd);\n    window.addEventListener("pointercancel", onEnd);\n  });\n  handle.addEventListener("keydown", (e) => {\n    const list = row.parentElement;\n    if (e.key === "ArrowUp" && row.previousElementSibling) list.insertBefore(row, row.previousElementSibling);\n    else if (e.key === "ArrowDown" && row.nextElementSibling) list.insertBefore(row.nextElementSibling, row);\n    else return;\n    e.preventDefault();\n    handle.focus();\n    saveOrder();\n  });\n}\nfunction designTab() {\n  const out = [topline("Aspetto"), offlineBanner(), h("div", { id: "draft-bar" })];\n  const controls = h("div", { id: "design-controls", style: "display:flex;flex-direction:column;gap:16px" });\n  out.push(controls);\n  renderDesignControls(controls);\n  queueMicrotask(renderDraftBar);\n  return out.filter(Boolean);\n}\nfunction renderDraftBar() {\n  const bar = $("#draft-bar");\n  if (!bar) return;\n  if (!S.page.has_draft) {\n    bar.replaceChildren(h("div", { class: "banner clean" }, h("span", {}, "Il design è online. Le modifiche resteranno in bozza finché non le pubblichi.")));\n    return;\n  }\n  const act = (label, cls, path, msg) => {\n    const b = h("button", {\n      class: `btn ${cls}`,\n      type: "button",\n      id: `draft-${path}`,\n      onclick: async () => {\n        b.disabled = true;\n        try {\n          await flushAll();\n          const saved = await saving(() => api(`/pages/${S.page.id}/${path}`, "POST", {}));\n          Object.assign(S.page, saved, { items: S.page.items });\n          S.bgMode = null;\n          reloadPreview();\n          renderTab();\n          toast(msg);\n        } catch {\n          b.disabled = false;\n        }\n      }\n    }, label);\n    return b;\n  };\n  bar.replaceChildren(h(\n    "div",\n    { class: "banner sticky" },\n    h("span", {}, h("strong", {}, "Bozza non pubblicata. "), "La vedi solo nell’anteprima."),\n    h("div", { class: "actions" }, act("Annulla modifiche", "", "discard", "Modifiche annullate"), act("Pubblica", "primary", "publish", "Design pubblicato"))\n  ));\n}\nfunction setTheme(patch) {\n  S.page.theme = sanitizeTheme({ ...S.page.theme, ...patch });\n  S.page.has_draft = true;\n  applyThemeToPreview();\n  if (!document.querySelector("#draft-publish")) renderDraftBar();\n  const id = S.page.id;\n  schedule(`theme${id}`, async () => {\n    try {\n      await saving(() => api(`/pages/${id}`, "PUT", { theme: S.page.theme }));\n    } catch {\n    }\n  }, 400);\n}\nvar segment = (label, value, options, onPick) => {\n  const row = h("div", { class: "seg", role: "group", "aria-label": label });\n  const paint = (v) => row.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === String(v))));\n  options.forEach(([v, text]) => row.append(h("button", { type: "button", "data-v": v, onclick: () => {\n    paint(v);\n    onPick(v);\n  } }, text)));\n  paint(value);\n  return h("div", { class: "field" }, h("span", { class: "field-label" }, label), row);\n};\nvar colorField = (id, label, key) => {\n  const value = S.page.theme[key];\n  const hex = h("input", {\n    id: `${id}-hex`,\n    type: "text",\n    "aria-label": `${label}, codice colore`,\n    value,\n    maxlength: 7,\n    oninput: (e) => {\n      if (/^#[0-9a-f]{6}$/i.test(e.target.value)) {\n        pick.value = e.target.value;\n        setTheme({ [key]: e.target.value });\n      }\n    }\n  });\n  const pick = h("input", { id, type: "color", value, oninput: (e) => {\n    hex.value = e.target.value;\n    setTheme({ [key]: e.target.value });\n  } });\n  return h("div", { class: "field" }, h("label", { for: id }, label), h("div", { class: "color" }, pick, hex));\n};\nvar rangeField = (id, label, key, min, max, unit = "px") => {\n  const out = h("output", { for: id }, `${S.page.theme[key]}${unit}`);\n  return h(\n    "div",\n    { class: "field" },\n    h("div", { class: "range-head" }, h("label", { for: id }, label), out),\n    h("input", { id, type: "range", min, max, value: S.page.theme[key], oninput: (e) => {\n      out.textContent = `${e.target.value}${unit}`;\n      setTheme({ [key]: Number(e.target.value) });\n    } })\n  );\n};\nvar fontSelect = (id, label, key) => {\n  const sel = h("select", { id, onchange: (e) => setTheme({ [key]: e.target.value }) }, Object.entries(FONTS).map(([k, f]) => h("option", { value: k }, f.name)));\n  sel.value = S.page.theme[key];\n  return h("div", { class: "field" }, h("label", { for: id }, label), sel);\n};\nvar themeSwitch = (id, title, key) => h(\n  "div",\n  { class: "toggle-row" },\n  h("strong", {}, title),\n  h("label", { class: "switch" }, h("input", { id, type: "checkbox", "aria-label": title, checked: !!S.page.theme[key], onchange: (e) => setTheme({ [key]: e.target.checked }) }), h("span", {}))\n);\nfunction renderDesignControls(root = $("#design-controls")) {\n  const t = S.page.theme;\n  const bgMode = S.bgMode || t.bgType;\n  const rerender = () => renderDesignControls();\n  const presets = h("div", { class: "presets" }, PRESETS.map((p) => {\n    const pt = p.theme;\n    const bg = pt.bgType === "gradient" ? `linear-gradient(${pt.gradientAngle}deg,${pt.bgColor},${pt.bgColor2})` : pt.bgColor;\n    const btn = (w) => h("i", { style: `width:${w};align-self:center;border-radius:${Math.min(pt.btnRadius, 8)}px;background:${pt.btnStyle === "outline" ? "transparent" : pt.btnStyle === "glass" ? "#ffffff40" : pt.btnColor};border:1.5px solid ${pt.btnAccent}` });\n    return h("button", {\n      class: "preset",\n      type: "button",\n      "data-preset": p.id,\n      "aria-pressed": "false",\n      onclick: () => {\n        S.bgMode = null;\n        setTheme({ ...pt });\n        rerender();\n      }\n    }, h("div", { class: "swatch", style: `background:${bg}` }, btn("90%"), btn("90%")), h("b", {}, p.name));\n  }));\n  const bgControls = [segment("Tipo di sfondo", bgMode, [["solid", "Tinta unita"], ["gradient", "Sfumatura"], ["image", "Immagine"]], (v) => {\n    S.bgMode = v;\n    if (v !== "image" || t.bgImage) setTheme({ bgType: v });\n    rerender();\n  })];\n  if (bgMode === "solid") bgControls.push(colorField("bg-color", "Colore", "bgColor"));\n  if (bgMode === "gradient") {\n    bgControls.push(h("div", { class: "grid-2" }, colorField("bg-color", "Primo colore", "bgColor"), colorField("bg-color2", "Secondo colore", "bgColor2")));\n    bgControls.push(rangeField("bg-angle", "Direzione", "gradientAngle", 0, 360, "°"));\n  }\n  if (bgMode === "image") {\n    bgControls.push(imageField({\n      id: "bg-upload",\n      label: "Immagine di sfondo",\n      wide: true,\n      value: t.bgImage,\n      options: { size: 1600 },\n      onChange: (v) => {\n        setTheme({ bgImage: v, bgType: v ? "image" : "solid" });\n        if (!v) S.bgMode = "solid";\n        rerender();\n      }\n    }));\n    bgControls.push(rangeField("bg-overlay", "Oscuramento", "bgOverlay", 0, 85, "%"));\n  }\n  root.replaceChildren(\n    h("section", { class: "card" }, h("h2", {}, "Temi pronti"), h("p", { class: "hint" }, "Parti da un tema e poi personalizza ogni dettaglio per questo brand."), presets),\n    h("section", { class: "card" }, h("h2", {}, "Sfondo"), ...bgControls),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Testi"),\n      h("div", { class: "grid-2" }, fontSelect("title-font", "Carattere del titolo", "titleFont"), fontSelect("body-font", "Carattere di testi e pulsanti", "font")),\n      colorField("text-color", "Colore del testo", "textColor"),\n      rangeField("title-size", "Dimensione del titolo", "titleSize", 18, 48),\n      themeSwitch("title-upper", "Titolo in maiuscolo", "titleUppercase")\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Logo e social"),\n      segment("Forma del logo", t.avatarShape, [["circle", "Cerchio"], ["rounded", "Arrotondato"], ["square", "Quadrato"], ["none", "Nascosto"]], (v) => setTheme({ avatarShape: v })),\n      rangeField("avatar-size", "Dimensione del logo", "avatarSize", 56, 160),\n      segment("Posizione dei social", t.socialPosition, [["top", "Sopra i link"], ["bottom", "Sotto i link"]], (v) => setTheme({ socialPosition: v }))\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Pulsanti"),\n      segment("Stile", t.btnStyle, [["fill", "Pieno"], ["outline", "Contorno"], ["glow", "Neon"], ["glass", "Vetro"], ["hard", "Poster"]], (v) => setTheme({ btnStyle: v })),\n      h("div", { class: "grid-2" }, colorField("btn-color", "Colore del pulsante", "btnColor"), colorField("btn-text", "Colore del testo", "btnTextColor")),\n      colorField("btn-accent", "Colore di bordo e accento", "btnAccent"),\n      rangeField("btn-radius", "Arrotondamento", "btnRadius", 0, 40),\n      rangeField("btn-border", "Spessore del bordo", "btnBorder", 0, 6),\n      rangeField("btn-shadow", "Ombra", "btnShadow", 0, 30),\n      rangeField("btn-gap", "Spazio tra i pulsanti", "btnGap", 4, 28),\n      rangeField("btn-font", "Dimensione del testo", "btnFontSize", 12, 22),\n      themeSwitch("btn-upper", "Testo in maiuscolo", "btnUppercase")\n    )\n  );\n}\nvar isoDay = (d) => {\n  const pad = (n) => String(n).padStart(2, "0");\n  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;\n};\nvar daysAgo = (n) => isoDay(new Date(Date.now() - n * 864e5));\nvar fmt = new Intl.NumberFormat("it-IT");\nfunction statsTab() {\n  S.statsQ || (S.statsQ = { page: String(S.page.id), range: "30", from: daysAgo(29), to: isoDay(/* @__PURE__ */ new Date()), gran: "day" });\n  const q = S.statsQ;\n  const body = h("div", { id: "stats-body", style: "display:flex;flex-direction:column;gap:16px" }, h("div", { class: "loading" }, "Caricamento delle statistiche…"));\n  const brand = h(\n    "select",\n    { id: "stats-brand", onchange: (e) => {\n      q.page = e.target.value;\n      loadStats();\n    } },\n    h("option", { value: "all" }, "Tutti i brand"),\n    S.pages.map((p) => h("option", { value: p.id }, p.title))\n  );\n  brand.value = q.page;\n  const custom = h(\n    "div",\n    { class: "grid-2", style: "flex:1 1 280px", hidden: q.range !== "custom" },\n    h("div", { class: "field" }, h("label", { for: "stats-from" }, "Dal"), h("input", { id: "stats-from", type: "date", value: q.from, onchange: (e) => {\n      q.from = e.target.value;\n      loadStats();\n    } })),\n    h("div", { class: "field" }, h("label", { for: "stats-to" }, "Al"), h("input", { id: "stats-to", type: "date", value: q.to, onchange: (e) => {\n      q.to = e.target.value;\n      loadStats();\n    } }))\n  );\n  const out = [\n    topline("Statistiche"),\n    h("section", { class: "card" }, h(\n      "div",\n      { class: "filters" },\n      h("div", { class: "field" }, h("label", { for: "stats-brand" }, "Brand"), brand),\n      segment("Periodo", q.range, [["7", "7 giorni"], ["30", "30 giorni"], ["90", "90 giorni"], ["custom", "Date"]], (v) => {\n        q.range = v;\n        custom.hidden = v !== "custom";\n        if (v !== "custom") {\n          q.from = daysAgo(Number(v) - 1);\n          q.to = isoDay(/* @__PURE__ */ new Date());\n        }\n        loadStats();\n      }),\n      segment("Raggruppa per", q.gran, [["day", "Giorno"], ["week", "Settimana"], ["month", "Mese"]], (v) => {\n        q.gran = v;\n        if (S.stats) renderStats();\n      }),\n      custom\n    )),\n    body\n  ];\n  queueMicrotask(loadStats);\n  return out;\n}\nvar statsRequest = 0;\nasync function loadStats() {\n  const q = S.statsQ;\n  const body = $("#stats-body");\n  if (!body) return;\n  const ticket = ++statsRequest;\n  body.style.opacity = S.stats ? ".5" : "1";\n  try {\n    const params = new URLSearchParams({ page: q.page, from: q.from, to: q.to });\n    const data = await api(`/stats?${params}`);\n    if (ticket !== statsRequest) return;\n    S.stats = data;\n    renderStats();\n  } catch (e) {\n    body.replaceChildren(h("div", { class: "empty" }, e.message, " ", h("button", { class: "btn", onclick: loadStats }, "Riprova")));\n  }\n  body.style.opacity = "1";\n}\nfunction bucketKey(day, gran) {\n  if (gran === "month") return day.slice(0, 7);\n  if (gran === "week") {\n    const d = /* @__PURE__ */ new Date(`${day}T00:00:00Z`);\n    d.setUTCDate(d.getUTCDate() - (d.getUTCDay() + 6) % 7);\n    return d.toISOString().slice(0, 10);\n  }\n  return day;\n}\nfunction bucketLabel(key, gran, long = false) {\n  if (gran === "month") return (/* @__PURE__ */ new Date(`${key}-01T00:00:00Z`)).toLocaleDateString("it-IT", { month: long ? "long" : "short", year: long ? "numeric" : "2-digit", timeZone: "UTC" });\n  const text = (/* @__PURE__ */ new Date(`${key}T00:00:00Z`)).toLocaleDateString("it-IT", { day: "numeric", month: "short", timeZone: "UTC" });\n  return gran === "week" && long ? `Settimana dal ${text}` : text;\n}\nfunction buckets() {\n  const map = /* @__PURE__ */ new Map();\n  for (const d of S.stats.days) {\n    const key = bucketKey(d.day, S.statsQ.gran);\n    const b = map.get(key) || { key, views: 0, clicks: 0, uniques: 0 };\n    b.views += d.views;\n    b.clicks += d.clicks;\n    b.uniques += d.uniques;\n    map.set(key, b);\n  }\n  return [...map.values()];\n}\nfunction barList(rows, labelFn) {\n  const max = Math.max(1, ...rows.map((r) => r.value));\n  return h("div", { class: "bars" }, rows.map((r) => h(\n    "div",\n    { class: "bar-row" },\n    h("div", { class: "name", title: r.title }, labelFn(r)),\n    h("div", { class: "val" }, fmt.format(r.value)),\n    h("div", { class: "bar-track" }, h("i", { style: `width:${r.value / max * 100}%` }))\n  )));\n}\nvar SOURCE_NAMES = { diretto: "Diretto o link salvato", instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook", whatsapp: "WhatsApp", telegram: "Telegram", youtube: "YouTube", google: "Google", bing: "Bing", x: "X" };\nfunction renderStats() {\n  const r = S.stats;\n  const body = $("#stats-body");\n  if (!body) return;\n  const ctr = r.totals.views ? r.totals.clicks / r.totals.views * 100 : 0;\n  const tile = (label, value, title) => h("div", { class: "tile", title }, h("span", {}, label), h("strong", {}, value));\n  const list = buckets();\n  const multi = S.statsQ.page === "all";\n  const empty = !r.totals.views && !r.totals.clicks;\n  const deviceTotal = r.devices.reduce((a, d) => a + d.hits, 0) || 1;\n  const blocks = [\n    h(\n      "div",\n      { class: "tiles" },\n      tile("Visite", fmt.format(r.totals.views)),\n      tile("Visitatori unici", fmt.format(r.totals.uniques), "Stima: chi torna in giorni diversi conta una volta per ogni giorno."),\n      tile("Clic sui link", fmt.format(r.totals.clicks)),\n      tile("Tasso di clic", `${ctr.toLocaleString("it-IT", { maximumFractionDigits: 1 })}%`)\n    ),\n    empty ? h("div", { class: "empty" }, "Nessun dato in questo periodo. I numeri appaiono quando qualcuno apre la pagina pubblica.") : null,\n    empty ? null : h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Andamento"),\n      h("div", { class: "legend" }, h("span", {}, h("i", { style: "background:var(--cobalt)" }), "Visite"), h("span", {}, h("i", { style: "background:var(--red)" }), "Clic")),\n      h("div", { class: "chart-wrap", id: "chart" }),\n      h("details", {}, h("summary", {}, "Vedi come tabella"), h("div", { class: "table-wrap" }, h(\n        "table",\n        {},\n        h("thead", {}, h("tr", {}, h("th", {}, "Periodo"), h("th", {}, "Visite"), h("th", {}, "Unici"), h("th", {}, "Clic"), h("th", {}, "Tasso"))),\n        h("tbody", {}, list.map((b) => h(\n          "tr",\n          {},\n          h("td", {}, bucketLabel(b.key, S.statsQ.gran, true)),\n          h("td", {}, fmt.format(b.views)),\n          h("td", {}, fmt.format(b.uniques)),\n          h("td", {}, fmt.format(b.clicks)),\n          h("td", {}, b.views ? `${(b.clicks / b.views * 100).toLocaleString("it-IT", { maximumFractionDigits: 1 })}%` : "–")\n        )))\n      )))\n    ),\n    empty ? null : h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "I link più cliccati"),\n      r.items.length ? barList(r.items.slice(0, 15).map((i) => ({ title: i.title, page: i.page, value: i.clicks })), (i) => [i.title, multi ? h("small", {}, ` · ${i.page}`) : null].flat()) : h("p", { class: "hint" }, "Ancora nessun clic in questo periodo.")\n    ),\n    empty ? null : h(\n      "div",\n      { class: "two-col" },\n      h(\n        "section",\n        { class: "card" },\n        h("h2", {}, "Da dove arrivano"),\n        barList(r.sources.slice(0, 8).map((s) => ({ title: s.key, value: s.hits })), (s) => SOURCE_NAMES[s.title] || s.title),\n        h("p", { class: "hint" }, "Le app non segnalano sempre la provenienza, quindi una parte può risultare come Diretto.")\n      ),\n      h(\n        "section",\n        { class: "card" },\n        h("h2", {}, "Dispositivi"),\n        barList(r.devices.map((d) => ({ title: d.key, value: d.hits })), (d) => `${d.title === "mobile" ? "Telefono e tablet" : "Computer"} · ${Math.round(d.value / deviceTotal * 100)}%`)\n      )\n    ),\n    h("p", { class: "hint" }, "Statistiche senza cookie: gli indirizzi IP non vengono salvati e i visitatori unici si calcolano con un codice anonimo cancellato ogni giorno. Le tue visite da questo browser non vengono contate.")\n  ];\n  body.replaceChildren(...blocks.filter(Boolean));\n  if (!empty) drawChartInto();\n}\nfunction niceMax(v) {\n  if (v <= 4) return 4;\n  const mag = 10 ** Math.floor(Math.log10(v));\n  const n = v / mag;\n  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 4 ? 4 : n <= 5 ? 5 : 10) * mag;\n}\nfunction drawChartInto() {\n  const wrap = $("#chart");\n  if (!wrap) return;\n  const list = buckets();\n  const width = Math.max(280, wrap.clientWidth);\n  const height = 240;\n  const m = { top: 12, right: 12, bottom: 26, left: 40 };\n  const iw = width - m.left - m.right;\n  const ih = height - m.top - m.bottom;\n  const max = niceMax(Math.max(1, ...list.map((b) => Math.max(b.views, b.clicks))));\n  const x = (i) => m.left + (list.length < 2 ? iw / 2 : i / (list.length - 1) * iw);\n  const y = (v) => m.top + ih - v / max * ih;\n  const path = (k) => list.map((b, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(b[k]).toFixed(1)}`).join("");\n  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);\n  const labelEvery = Math.max(1, Math.ceil(list.length / Math.max(2, Math.floor(iw / 72))));\n  const showLabel = (i) => i === list.length - 1 ? (list.length - 1) % labelEvery === 0 || labelEvery === 1 : i % labelEvery === 0;\n  const dots = (k, color) => list.length <= 45 ? list.map((b, i) => `<circle cx="${x(i)}" cy="${y(b[k])}" r="${list.length > 14 ? 2 : 3.5}" fill="${color}" stroke="#fff" stroke-width="1.5"/>`).join("") : "";\n  const textColor = "#5a6078";\n  const grid = ticks.map((t) => `<line x1="${m.left}" x2="${width - m.right}" y1="${y(t)}" y2="${y(t)}" stroke="#e7e9f2"/><text x="${m.left - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11.5" fill="${textColor}">${fmt.format(Math.round(t))}</text>`).join("");\n  const labels = list.map((b, i) => !showLabel(i) ? "" : `<text x="${x(i)}" y="${height - 7}" text-anchor="${i === 0 && list.length > 1 ? "start" : i === list.length - 1 && list.length > 1 ? "end" : "middle"}" font-size="11.5" fill="${textColor}">${bucketLabel(b.key, S.statsQ.gran)}</text>`).join("");\n  wrap.innerHTML = `<svg viewBox="0 0 ${width} ${height}" height="${height}" role="img" aria-label="Andamento di visite e clic">${grid}${labels}\n    <path d="${path("views")}" fill="none" stroke="#2f4bc7" stroke-width="2" stroke-linejoin="round"/><path d="${path("clicks")}" fill="none" stroke="#d92b27" stroke-width="2" stroke-linejoin="round"/>\n    ${dots("views", "#2f4bc7")}${dots("clicks", "#d92b27")}\n    <line id="cross" y1="${m.top}" y2="${m.top + ih}" stroke="#12162b" stroke-opacity=".35" visibility="hidden"/>\n    <rect id="hit" x="${m.left}" y="${m.top}" width="${iw}" height="${ih}" fill="transparent"/></svg>`;\n  const tip = h("div", { class: "chart-tip", hidden: true });\n  wrap.append(tip);\n  const svgEl = wrap.querySelector("svg");\n  const cross = wrap.querySelector("#cross");\n  const move = (e) => {\n    const box = svgEl.getBoundingClientRect();\n    const px = (e.clientX - box.left) / box.width * width;\n    const i = list.length < 2 ? 0 : Math.max(0, Math.min(list.length - 1, Math.round((px - m.left) / iw * (list.length - 1))));\n    const b = list[i];\n    cross.setAttribute("x1", x(i));\n    cross.setAttribute("x2", x(i));\n    cross.setAttribute("visibility", "visible");\n    tip.hidden = false;\n    tip.replaceChildren(h("strong", {}, bucketLabel(b.key, S.statsQ.gran, true)), h("br"), `${fmt.format(b.views)} visite · ${fmt.format(b.uniques)} unici · ${fmt.format(b.clicks)} clic`);\n    const left = x(i) / width * box.width;\n    tip.style.left = `${Math.max(0, Math.min(box.width - tip.offsetWidth, left - tip.offsetWidth / 2))}px`;\n  };\n  const hit = wrap.querySelector("#hit");\n  hit.addEventListener("pointermove", move);\n  hit.addEventListener("pointerdown", move);\n  hit.addEventListener("pointerleave", () => {\n    tip.hidden = true;\n    cross.setAttribute("visibility", "hidden");\n  });\n}\nfunction settingsTab() {\n  const p = S.page;\n  const slug = h("input", { id: "page-slug", type: "text", value: p.slug, maxlength: 60, autocapitalize: "off", spellcheck: "false" });\n  const slugError = h("p", { class: "form-error", hidden: true, role: "alert" });\n  const saveSlug = h("button", {\n    class: "btn",\n    type: "button",\n    id: "save-slug",\n    onclick: async () => {\n      slugError.hidden = true;\n      saveSlug.disabled = true;\n      try {\n        const saved = await api(`/pages/${p.id}`, "PUT", { slug: slug.value });\n        Object.assign(S.page, saved, { items: S.page.items });\n        mergePageSummary(saved);\n        renderTab();\n        toast("Indirizzo aggiornato. I vecchi link con il nome precedente non funzionano più.");\n      } catch (e) {\n        slugError.textContent = e.message;\n        slugError.hidden = false;\n        saveSlug.disabled = false;\n      }\n    }\n  }, "Salva indirizzo");\n  const homeBtn = p.is_home ? h("p", { class: "hint" }, "Questo brand si apre quando qualcuno visita l’indirizzo principale del sito.") : h("button", { class: "btn", type: "button", onclick: async () => {\n    try {\n      await saving(() => api(`/pages/${p.id}/home`, "POST", {}));\n      S.pages = (await api("/pages")).pages;\n      Object.assign(S.page, S.pages.find((x) => x.id === p.id), { items: S.page.items });\n      syncBrandSelect();\n      renderTab();\n      toast("Pagina principale aggiornata");\n    } catch {\n    }\n  } }, "Usa come pagina principale");\n  const trackingUrl = `${pageUrl(p)}?utm_source=instagram`;\n  return [\n    topline("Impostazioni"),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Pubblicazione"),\n      h(\n        "div",\n        { class: "toggle-row" },\n        h("div", {}, h("strong", {}, "Pagina online"), h("p", { class: "hint" }, "Se è spenta, chi apre il link vede un messaggio di pagina non disponibile.")),\n        h("label", { class: "switch" }, h("input", { id: "page-published", type: "checkbox", "aria-label": "Pagina online", checked: !!p.published, disabled: !!p.is_home, onchange: async (e) => {\n          try {\n            await savePageNow({ published: e.target.checked });\n          } catch {\n            e.target.checked = !e.target.checked;\n          }\n        } }), h("span", {}))\n      ),\n      homeBtn\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Indirizzo della pagina"),\n      h("div", { class: "field" }, h("label", { for: "page-slug" }, `${location.host}/`), slug),\n      slugError,\n      h("div", {}, saveSlug)\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Anteprima su Google e social"),\n      h(\n        "div",\n        { class: "field" },\n        h("label", { for: "page-seo" }, "Descrizione"),\n        h("textarea", { id: "page-seo", maxlength: 300, placeholder: p.bio, value: p.seo_description, oninput: (e) => savePageSoon({ seo_description: e.target.value }) })\n      ),\n      h("p", { class: "hint" }, "Se la lasci vuota viene usata la descrizione del profilo. L’immagine condivisa è il logo.")\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Misurare una campagna"),\n      h("p", { class: "hint" }, "Aggiungi utm_source al link per vedere nelle statistiche da dove arrivano le visite. Esempio per la bio di Instagram:"),\n      h("div", { class: "url-box" }, h("code", {}, trackingUrl), h("button", { class: "icon-btn", type: "button", "aria-label": "Copia link con tracciamento", onclick: () => copyText(trackingUrl) }, raw(UI.copy)))\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Accesso"),\n      h("p", { class: "hint" }, "Oggi esiste un solo amministratore. La password si cambia su Cloudflare, nel secret ADMIN_PASSWORD. Dopo il cambio tutti i dispositivi devono accedere di nuovo.")\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Elimina questo brand"),\n      h("p", { class: "hint" }, p.is_home ? "Questa è la pagina principale. Scegli prima un altro brand come principale." : "Cancella definitivamente la pagina, i link, le immagini e le statistiche di questo brand."),\n      h("div", {}, h("button", { class: "btn danger", type: "button", disabled: !!p.is_home, onclick: deleteBrand }, raw(UI.trash), "Elimina brand"))\n    )\n  ];\n}\nasync function deleteBrand() {\n  const p = S.page;\n  const yes = await confirmDialog(`Eliminare ${p.title}?`, "La pagina, i link, le immagini e le statistiche verranno cancellati definitivamente.", "Elimina definitivamente");\n  if (!yes) return;\n  try {\n    await saving(() => api(`/pages/${p.id}`, "DELETE"));\n    S.pages = S.pages.filter((x) => x.id !== p.id);\n    S.tab = "content";\n    await selectPage(S.pages[0].id);\n    toast("Brand eliminato");\n  } catch {\n  }\n}\nfunction confirmDialog(title, message, action) {\n  return new Promise((resolve) => {\n    const finish = (v) => {\n      d.close();\n      d.remove();\n      resolve(v);\n    };\n    const d = h(\n      "dialog",\n      { oncancel: (e) => {\n        e.preventDefault();\n        finish(false);\n      } },\n      h(\n        "div",\n        { class: "dialog-body" },\n        h("h2", {}, title),\n        h("p", { class: "hint" }, message),\n        h(\n          "div",\n          { class: "dialog-actions" },\n          h("button", { class: "btn", type: "button", onclick: () => finish(false) }, "Annulla"),\n          h("button", { class: "btn danger", type: "button", id: "confirm-yes", onclick: () => finish(true) }, action)\n        )\n      )\n    );\n    document.body.append(d);\n    d.showModal();\n  });\n}\nvar slugify = (v) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 40);\nfunction newBrandDialog() {\n  let edited = false;\n  const title = h("input", { id: "new-title", type: "text", required: true, maxlength: 120, oninput: () => {\n    if (!edited) slug.value = slugify(title.value);\n  } });\n  const slug = h("input", { id: "new-slug", type: "text", required: true, maxlength: 60, autocapitalize: "off", spellcheck: "false", oninput: () => {\n    edited = true;\n  } });\n  const error = h("p", { class: "form-error", hidden: true, role: "alert" });\n  const submit = h("button", { class: "btn primary", type: "submit", id: "new-submit" }, "Crea brand");\n  const d = h(\n    "dialog",\n    {},\n    h(\n      "form",\n      {\n        method: "dialog",\n        onsubmit: async (e) => {\n          e.preventDefault();\n          submit.disabled = true;\n          error.hidden = true;\n          try {\n            const page = await api("/pages", "POST", { title: title.value, slug: slug.value });\n            S.pages.push(page);\n            d.close();\n            d.remove();\n            S.tab = "content";\n            await selectPage(page.id);\n            toast("Brand creato. Aggiungi i contenuti e mettilo online quando è pronto.");\n          } catch (err) {\n            error.textContent = err.message;\n            error.hidden = false;\n            submit.disabled = false;\n          }\n        }\n      },\n      h("h2", {}, "Nuovo brand"),\n      h("div", { class: "field" }, h("label", { for: "new-title" }, "Nome"), title),\n      h("div", { class: "field" }, h("label", { for: "new-slug" }, `Indirizzo: ${location.host}/`), slug),\n      error,\n      h(\n        "div",\n        { class: "dialog-actions" },\n        h("button", { class: "btn", type: "button", onclick: () => {\n          d.close();\n          d.remove();\n        } }, "Annulla"),\n        submit\n      )\n    )\n  );\n  document.body.append(d);\n  d.showModal();\n  title.focus();\n}\nasync function logout() {\n  await flushAll();\n  try {\n    await api("/logout", "POST", {});\n  } catch {\n  }\n  S.page = null;\n  showLogin();\n}\nboot();\n', "text/javascript; charset=utf-8"],
  "/static/admin.css": [`/* Layout: cobalt rail on the left, working panel in the centre, phone preview on the right. */
:root {
  --rail: #16246e; --rail-2: #22338c; --rail-text: #dfe4ff; --star: #ffcf33;
  --paper: #f2f4fa; --card: #ffffff; --line: #dde1ee; --ink: #12162b; --muted: #5a6078;
  --cobalt: #2f4bc7; --cobalt-soft: #e8ecfb; --red: #d92b27; --green: #14795a; --amber: #8a5a00;
  --radius: 12px; --font: 'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  color-scheme: light;
}
* { box-sizing: border-box; }
html, body { margin: 0; height: 100%; }
body { background: var(--paper); color: var(--ink); font: 15px/1.45 var(--font); -webkit-font-smoothing: antialiased; }
button, input, select, textarea { font: inherit; color: inherit; }
h1, h2, h3 { margin: 0; line-height: 1.2; text-wrap: balance; }
:focus-visible { outline: 3px solid var(--cobalt); outline-offset: 2px; }
.rail :focus-visible { outline-color: var(--star); }
[hidden] { display: none !important; }

/* Shell */
.shell { display: grid; grid-template-columns: 232px minmax(0, 1fr) auto; min-height: 100%; }
.rail { background: var(--rail); color: var(--rail-text); display: flex; flex-direction: column; gap: 20px; padding: 20px 14px; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
.wordmark { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; color: #fff; padding-inline: 6px; letter-spacing: -.01em; }
.wordmark svg { width: 20px; height: 20px; fill: var(--star); flex: none; }
.rail label { display: block; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; margin: 0 6px 6px; opacity: .75; }
.rail select { width: 100%; background: var(--rail-2); border: 1px solid #ffffff2e; color: #fff; border-radius: 9px; padding: 9px 10px; font-weight: 600; }
.rail select option { color: var(--ink); background: #fff; }
.nav { display: flex; flex-direction: column; gap: 3px; }
.nav button { display: flex; align-items: center; gap: 11px; width: 100%; text-align: left; background: none; border: 0; color: inherit; padding: 10px; border-radius: 9px; cursor: pointer; font-weight: 500; }
.nav button svg, .rail-foot svg { width: 18px; height: 18px; flex: none; }
.nav button:hover { background: #ffffff14; }
.nav button[aria-current="page"] { background: #fff; color: var(--rail); font-weight: 700; }
.rail-foot { margin-top: auto; display: flex; flex-direction: column; gap: 3px; }
.rail-foot button { display: flex; gap: 11px; align-items: center; background: none; border: 0; color: inherit; padding: 9px 10px; border-radius: 9px; cursor: pointer; text-align: left; }
.rail-foot button:hover { background: #ffffff14; }

.main { min-width: 0; padding-block: 22px 90px; padding-left: max(16px, 2.2vw); padding-right: max(16px, 2.2vw); }
.main-inner { max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
.main-wide { max-width: 980px; }
.topline { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 16px; }
.topline h1 { font-size: 23px; font-weight: 700; letter-spacing: -.015em; }
.url-box { display: flex; align-items: center; gap: 2px; background: var(--card); border: 1px solid var(--line); border-radius: 9px; padding: 3px 3px 3px 11px; min-width: 0; max-width: 100%; }
.url-box code { font: 500 13px var(--font); color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.save-state { font-size: 13px; color: var(--muted); min-height: 19px; }
.save-state.error { color: var(--red); font-weight: 600; }

/* Primitives */
.card { background: var(--card); border: 1px solid var(--line); border-radius: var(--radius); padding: 18px; display: flex; flex-direction: column; gap: 14px; }
.card > h2 { font-size: 15px; font-weight: 700; }
.hint { font-size: 13px; color: var(--muted); margin: 0; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; min-height: 40px; padding: 8px 15px; border-radius: 9px; border: 1px solid var(--line); background: var(--card); font-weight: 600; cursor: pointer; text-decoration: none; color: var(--ink); white-space: nowrap; }
.btn:hover { background: var(--paper); }
.btn svg { width: 16px; height: 16px; flex: none; }
.btn.primary { background: var(--cobalt); border-color: var(--cobalt); color: #fff; }
.btn.primary:hover { background: #253ca5; }
.btn.danger { color: var(--red); border-color: #efc4c3; }
.btn.danger:hover { background: #fdf0f0; }
.btn[disabled] { opacity: .55; cursor: progress; }
.icon-btn { display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 8px; background: none; cursor: pointer; color: var(--muted); flex: none; text-decoration: none; }
.icon-btn:hover { background: var(--paper); color: var(--ink); }
.icon-btn svg { width: 17px; height: 17px; }
.field { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.field > label, .field-label { font-size: 13px; font-weight: 600; }
input[type=text], input[type=url], input[type=password], input[type=datetime-local], input[type=date], textarea, select { width: 100%; min-height: 40px; padding: 8px 11px; border: 1px solid var(--line); border-radius: 8px; background: #fff; }
textarea { resize: vertical; min-height: 74px; }
input:focus, textarea:focus, select:focus { border-color: var(--cobalt); outline: 2px solid var(--cobalt-soft); outline-offset: 0; }
.grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.seg { display: flex; flex-wrap: wrap; gap: 4px; background: var(--paper); border-radius: 9px; padding: 3px; }
.seg button { flex: 1 1 auto; border: 0; background: none; border-radius: 7px; padding: 6px 11px; min-height: 34px; cursor: pointer; font-size: 13.5px; font-weight: 500; color: var(--muted); white-space: nowrap; }
.seg button[aria-pressed="true"] { background: #fff; color: var(--ink); font-weight: 700; box-shadow: 0 1px 2px #12162b26; }
.switch { position: relative; display: inline-flex; flex: none; width: 40px; height: 24px; cursor: pointer; }
.switch input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; width: 100%; height: 100%; }
.switch span { position: absolute; inset: 0; background: #c3c8d9; border-radius: 99px; transition: background .15s; pointer-events: none; }
.switch span::after { content: ""; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; background: #fff; border-radius: 50%; transition: transform .15s; }
.switch input:checked + span { background: var(--cobalt); }
.switch input:checked + span::after { transform: translateX(16px); }
.switch input:focus-visible + span { outline: 3px solid var(--cobalt); outline-offset: 2px; }
.toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.toggle-row > div { min-width: 0; }
.toggle-row strong { font-size: 14px; font-weight: 600; display: block; }
.color { display: flex; gap: 7px; align-items: center; }
.color input[type=color] { width: 40px; height: 40px; padding: 2px; border: 1px solid var(--line); border-radius: 8px; background: #fff; flex: none; cursor: pointer; }
.range-head { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; }
.range-head output { color: var(--muted); font-variant-numeric: tabular-nums; font-weight: 500; }
input[type=range] { width: 100%; accent-color: var(--cobalt); height: 24px; margin: 0; }

/* Notice */
.banner { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px; padding: 11px 14px; border-radius: 10px; background: #fff7dc; border: 1px solid #f0dc9b; font-size: 14px; }
.banner.sticky { position: sticky; top: 8px; z-index: 5; box-shadow: 0 6px 16px #12162b1f; }
.banner .actions { display: flex; gap: 8px; flex-wrap: wrap; }
.banner.clean { background: #e7f5ef; border-color: #bfe3d3; }

/* Image field */
.image-field { display: flex; align-items: center; gap: 12px; }
.image-field .thumb-box { width: 64px; height: 64px; border-radius: 10px; background: var(--paper) center/cover no-repeat; border: 1px dashed #b9bfd3; flex: none; display: grid; place-items: center; color: var(--muted); }
.image-field .thumb-box.filled { border-style: solid; border-color: var(--line); }
.image-field .thumb-box svg { width: 22px; height: 22px; }
.image-field .thumb-box.wide { width: 112px; }
.image-field .ctrl { display: flex; flex-wrap: wrap; gap: 6px; }
.image-field input[type=file] { position: absolute; width: 1px; height: 1px; opacity: 0; }

/* Items */
.add-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 8px; }
.items { display: flex; flex-direction: column; gap: 8px; }
.item { background: var(--card); border: 1px solid var(--line); border-radius: var(--radius); }
.item.section-item { background: var(--cobalt-soft); border-color: #c9d2f4; }
.item.dragging { box-shadow: 0 12px 26px #12162b33; position: relative; z-index: 3; border-color: var(--cobalt); }
.item.off .item-title, .item.off .item-sub { opacity: .55; }
.item-head { display: flex; align-items: center; gap: 8px; padding: 9px 11px 9px 3px; min-height: 62px; }
.handle { display: grid; place-items: center; width: 32px; height: 44px; border: 0; background: none; color: #8a90a8; cursor: grab; touch-action: none; border-radius: 7px; flex: none; }
.handle:active { cursor: grabbing; }
.handle svg { width: 18px; height: 18px; }
.item-thumb { width: 40px; height: 40px; border-radius: 9px; background: var(--paper) center/cover no-repeat; flex: none; display: grid; place-items: center; font-size: 19px; color: var(--muted); }
.item-thumb svg { width: 19px; height: 19px; }
.item-body { flex: 1; min-width: 0; background: none; border: 0; text-align: left; cursor: pointer; padding: 2px 0; display: flex; flex-direction: column; gap: 2px; border-radius: 6px; }
.item-title { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block; }
.item-sub { font-size: 12.5px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block; }
.item-meta { display: flex; gap: 5px; flex-wrap: wrap; align-items: center; margin-top: 2px; font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; }
.chip { display: inline-flex; gap: 4px; align-items: center; padding: 1px 7px; border-radius: 99px; font-size: 11.5px; font-weight: 600; background: var(--paper); color: var(--muted); white-space: nowrap; }
.chip::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.chip.live { background: #e0f3ea; color: var(--green); }
.chip.warn { background: #fff0cf; color: var(--amber); }
.chip.bad { background: #fde7e6; color: #b3201c; }
.chip.info { background: var(--cobalt-soft); color: var(--cobalt); }
.chip.plain::before { display: none; }
.item-editor { border-top: 1px solid var(--line); padding: 14px; display: flex; flex-direction: column; gap: 13px; }
.item-tools { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; border-top: 1px solid var(--line); padding-top: 12px; }
.empty { text-align: center; color: var(--muted); padding: 30px 18px; border: 1px dashed #b9bfd3; border-radius: var(--radius); }
.socials-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 12px; }
.social-field { display: flex; align-items: center; gap: 8px; min-width: 0; }
.social-field svg { width: 18px; height: 18px; flex: none; color: var(--muted); }
details > summary { cursor: pointer; font-weight: 600; font-size: 14px; }
details[open] > summary { margin-bottom: 12px; }

/* Presets */
.presets { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.preset { border: 2px solid var(--line); border-radius: 11px; background: none; padding: 0; cursor: pointer; overflow: hidden; text-align: center; }
.preset[aria-pressed="true"] { border-color: var(--cobalt); }
.preset .swatch { display: flex; flex-direction: column; gap: 5px; padding: 15px 14px; height: 84px; justify-content: center; }
.preset .swatch i { display: block; height: 15px; }
.preset b { display: block; font-size: 12.5px; padding: 6px 2px; font-weight: 600; background: #fff; }

/* Preview */
.preview { position: sticky; top: 0; height: 100vh; padding: 20px 22px 20px 6px; display: flex; flex-direction: column; align-items: center; gap: 9px; }
.preview-label { font-size: 12px; font-weight: 600; color: var(--muted); }
.phone { background: #12162b; border-radius: 34px; padding: 8px; box-shadow: 0 18px 40px #12162b33; flex: none; }
.phone-screen { overflow: hidden; border-radius: 27px; background: #000; position: relative; }
.phone iframe { border: 0; display: block; width: 390px; transform-origin: top left; }
.preview-fab { display: none; }
.preview-close { display: none; }

/* Stats */
.filters { display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-end; }
.filters .field { flex: 1 1 150px; }
.tiles { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
.tile { background: var(--card); border: 1px solid var(--line); border-radius: var(--radius); padding: 13px 14px; min-width: 0; }
.tile span { font-size: 12.5px; color: var(--muted); font-weight: 500; display: block; }
.tile strong { display: block; font-size: 25px; font-weight: 700; letter-spacing: -.02em; margin-top: 2px; font-variant-numeric: tabular-nums; }
.legend { display: flex; flex-wrap: wrap; gap: 14px; font-size: 13px; color: var(--muted); }
.legend i { display: inline-block; width: 14px; height: 3px; border-radius: 2px; vertical-align: middle; margin-right: 5px; }
.chart-wrap { position: relative; width: 100%; }
.chart-wrap svg { display: block; width: 100%; touch-action: pan-y; }
.chart-tip { position: absolute; top: 4px; pointer-events: none; background: var(--ink); color: #fff; font-size: 12.5px; padding: 7px 10px; border-radius: 8px; white-space: nowrap; font-variant-numeric: tabular-nums; z-index: 2; }
.bars { display: flex; flex-direction: column; gap: 10px; }
.bar-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 3px 10px; font-size: 14px; }
.bar-row .name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bar-row .name small { color: var(--muted); }
.bar-row .val { font-variant-numeric: tabular-nums; font-weight: 600; }
.bar-track { grid-column: 1 / -1; height: 6px; }
.bar-track i { display: block; height: 100%; min-width: 3px; background: var(--cobalt); border-radius: 0 3px 3px 0; }
.two-col { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.table-wrap { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; font-size: 13.5px; font-variant-numeric: tabular-nums; }
th, td { padding: 6px 9px; text-align: right; border-bottom: 1px solid var(--line); white-space: nowrap; }
th:first-child, td:first-child { text-align: left; }
th { font-size: 12px; color: var(--muted); font-weight: 600; }

/* Login, dialogs, toasts, loading */
.center-screen { min-height: 100%; display: grid; place-items: center; padding: 24px 16px; background: var(--rail); }
.login { background: #fff; border-radius: 16px; padding: 28px; width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 14px; }
.login .wordmark { color: var(--rail); padding: 0; }
.login .wordmark svg { fill: var(--cobalt); }
.form-error { color: #b3201c; font-size: 14px; margin: 0; font-weight: 500; }
.loading { color: var(--muted); padding: 36px; text-align: center; }
.center-screen .loading { color: #fff; }
dialog { border: 0; border-radius: 14px; padding: 22px; width: min(430px, calc(100vw - 32px)); box-shadow: 0 24px 60px #12162b59; color: var(--ink); }
dialog::backdrop { background: #12162b8c; }
dialog form, .dialog-body { display: flex; flex-direction: column; gap: 13px; }
dialog h2 { font-size: 18px; }
.dialog-actions { display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; }
#toasts { position: fixed; left: 50%; bottom: 22px; transform: translateX(-50%); display: flex; flex-direction: column; gap: 7px; z-index: 50; width: min(440px, calc(100vw - 32px)); pointer-events: none; }
.toast { background: var(--ink); color: #fff; padding: 10px 14px; border-radius: 10px; font-size: 14px; text-align: center; }
.toast.error { background: #b3201c; }

/* Tablet: preview becomes an overlay opened by a button. */
@media (max-width: 1120px) {
  .shell { grid-template-columns: 208px minmax(0, 1fr); }
  .preview { display: none; }
  .preview.open { display: flex; position: fixed; inset: 0; z-index: 40; height: 100%; background: #12162bf2; padding: 14px 16px; justify-content: center; }
  .preview.open .preview-label { color: #fff; }
  .preview-close { display: inline-flex; flex: none; }
  .preview-fab { display: inline-flex; position: fixed; right: 16px; bottom: 76px; z-index: 30; box-shadow: 0 8px 22px #12162b4d; }
}
@media (min-width: 761px) and (max-width: 1120px) { .preview-fab { bottom: 20px; } }

/* Phone: rail turns into a top brand bar plus bottom navigation. */
@media (max-width: 760px) {
  .shell { display: block; }
  .rail { position: sticky; top: 0; height: auto; z-index: 20; flex-direction: row; align-items: center; padding: 8px 12px; padding-left: max(12px, env(safe-area-inset-left, 0px)); padding-right: max(12px, env(safe-area-inset-right, 0px)); gap: 10px; overflow: visible; }
  .wordmark span { display: none; }
  .wordmark { padding: 0; }
  .rail .brand-switch { flex: 1; min-width: 0; }
  .rail label { display: none; }
  .nav { position: fixed; left: 0; right: 0; bottom: 0; flex-direction: row; background: var(--rail); padding: 5px 6px calc(5px + env(safe-area-inset-bottom, 0px)); z-index: 20; }
  .nav button { flex: 1; flex-direction: column; gap: 2px; font-size: 11px; padding: 6px 2px; align-items: center; }
  .nav button[aria-current="page"] { background: #ffffff1f; color: #fff; }
  .rail-foot { margin: 0; flex-direction: row; flex: none; }
  .rail-foot button { padding: 8px; }
  .rail-foot button span { display: none; }
  .tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .two-col, .socials-grid { grid-template-columns: minmax(0, 1fr); }
  .add-row { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .add-row .btn { padding-inline: 6px; font-size: 14px; }
  .main { padding-bottom: 130px; }
  .preview-fab { width: 50px; height: 50px; padding: 0; border-radius: 50%; font-size: 0; gap: 0; }
  .preview-fab svg { width: 21px; height: 21px; }
}
@media (max-width: 460px) {
  .grid-2 { grid-template-columns: minmax(0, 1fr); }
  .presets { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
`, "text/css; charset=utf-8"]
};
var single_entry_default = {
  fetch(request, env, ctx) {
    const file = STATIC[new URL(request.url).pathname];
    if (file) return new Response(file[0], { headers: { "Content-Type": file[1], "Cache-Control": "public, max-age=300", "X-Content-Type-Options": "nosniff" } });
    return src_default.fetch(request, env, ctx);
  }
};
export {
  single_entry_default as default
};
