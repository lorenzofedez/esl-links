// public/static/theme.js
var FONTS = {
  system: { name: "System (no Google Fonts)", q: null, stack: "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" },
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
  raleway: { name: "Raleway", q: "Raleway:wght@400;600;800", stack: "'Raleway',system-ui,sans-serif" },
  lato: { name: "Lato", q: "Lato:wght@400;700;900", stack: "'Lato',system-ui,sans-serif" },
  nunito: { name: "Nunito", q: "Nunito:wght@400;700;800", stack: "'Nunito',system-ui,sans-serif" },
  sora: { name: "Sora", q: "Sora:wght@400;600;800", stack: "'Sora',system-ui,sans-serif" },
  outfit: { name: "Outfit", q: "Outfit:wght@400;600;800", stack: "'Outfit',system-ui,sans-serif" },
  barlow: { name: "Barlow Condensed", q: "Barlow+Condensed:wght@500;700", stack: "'Barlow Condensed',Impact,sans-serif" },
  righteous: { name: "Righteous", q: "Righteous", stack: "'Righteous',Impact,sans-serif" },
  bangers: { name: "Bangers", q: "Bangers", stack: "'Bangers',Impact,sans-serif" },
  abril: { name: "Abril Fatface", q: "Abril+Fatface", stack: "'Abril Fatface',Georgia,serif" },
  pacifico: { name: "Pacifico", q: "Pacifico", stack: "'Pacifico',cursive" },
  marker: { name: "Permanent Marker", q: "Permanent+Marker", stack: "'Permanent Marker',cursive" }
};
var DEFAULT_THEME = {
  bgType: "solid",
  // solid | gradient | pattern | image | blur | video
  bgColor3: "#c98bf5",
  btnHeight: 60,
  thumbCircle: false,
  gradientType: "linear",
  bgPattern: "dots",
  bgVideo: "",
  noise: false,
  titleColor: null,
  btnShadowType: "soft",
  btnShadowColor: "#000000",
  stickers: [],
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
  { id: "aurora", name: "Aurora", theme: { ...DEFAULT_THEME, bgType: "aurora", bgColor: "#07062a", bgColor2: "#2b2185", bgColor3: "#c98bf5", textColor: "#ffffff", font: "poppins", titleSize: 34, btnStyle: "glass", btnColor: "#ffffff", btnTextColor: "#ffffff", btnAccent: "#ffffff", btnRadius: 40, btnBorder: 1, btnShadowType: "soft", btnShadow: 12, btnShadowColor: "#9c87c0", btnUppercase: false, btnFontSize: 15, btnHeight: 78, thumbCircle: true, avatarShape: "square", avatarSize: 150 } },
  { id: "f3dez", name: "F3DEZ Neon", theme: { ...DEFAULT_THEME } },
  { id: "club", name: "Violet Club", theme: { ...DEFAULT_THEME, bgType: "gradient", bgColor: "#160b33", bgColor2: "#5b1a8c", gradientAngle: 160, btnStyle: "glass", btnColor: "#ffffff", btnAccent: "#ffffff", font: "syne", btnRadius: 16, btnUppercase: false } },
  { id: "tramonto", name: "Sunset", theme: { ...DEFAULT_THEME, bgType: "gradient", bgColor: "#ff5e3a", bgColor2: "#ffb347", gradientAngle: 200, textColor: "#2b0f05", btnStyle: "fill", btnColor: "#2b0f05", btnTextColor: "#fff4e6", btnAccent: "#2b0f05", font: "poppins", btnRadius: 40, btnUppercase: false } },
  { id: "mare", name: "Ocean", theme: { ...DEFAULT_THEME, bgColor: "#e8f6fb", textColor: "#06364a", btnStyle: "fill", btnColor: "#0a7ea4", btnTextColor: "#ffffff", btnAccent: "#0a7ea4", font: "rubik", btnRadius: 14, btnUppercase: false } },
  { id: "poster", name: "Poster", theme: { ...DEFAULT_THEME, bgColor: "#ffe600", textColor: "#111111", btnStyle: "hard", btnColor: "#ffffff", btnTextColor: "#111111", btnAccent: "#111111", font: "anton", btnRadius: 0, btnFontSize: 17, titleSize: 34, avatarShape: "square" } },
  { id: "festival", name: "Festival", theme: { ...DEFAULT_THEME, bgType: "gradient", gradientType: "radial", bgColor: "#ff2d78", bgColor2: "#2a0a4a", textColor: "#ffffff", btnStyle: "fill", btnColor: "#ffe14d", btnTextColor: "#20053a", btnAccent: "#ffe14d", font: "righteous", btnRadius: 18 } },
  { id: "erasmus", name: "Erasmus", theme: { ...DEFAULT_THEME, bgColor: "#123a9c", textColor: "#ffffff", btnStyle: "fill", btnColor: "#ffcf33", btnTextColor: "#10245e", btnAccent: "#ffcf33", font: "outfit", btnRadius: 14, btnUppercase: false } },
  { id: "cyber", name: "Cyber", theme: { ...DEFAULT_THEME, bgType: "pattern", bgPattern: "grid", bgColor: "#05060f", bgColor2: "#1fe0ff", textColor: "#d8fbff", btnStyle: "glow", btnColor: "#07101f", btnTextColor: "#d8fbff", btnAccent: "#1fe0ff", font: "unbounded", btnRadius: 6 } },
  { id: "spiaggia", name: "Beach", theme: { ...DEFAULT_THEME, bgType: "gradient", bgColor: "#7fe7dc", bgColor2: "#2a7fd6", gradientAngle: 180, textColor: "#06283f", btnStyle: "glass", btnColor: "#ffffff", btnTextColor: "#06283f", btnAccent: "#ffffff", font: "nunito", btnRadius: 40, btnUppercase: false } },
  { id: "rave", name: "Rave", theme: { ...DEFAULT_THEME, bgColor: "#101010", textColor: "#c8ff2e", btnStyle: "outline", btnColor: "#101010", btnTextColor: "#c8ff2e", btnAccent: "#c8ff2e", font: "bangers", btnRadius: 0, btnFontSize: 18, titleSize: 36 } },
  { id: "gala", name: "Gala", theme: { ...DEFAULT_THEME, bgColor: "#14100a", textColor: "#f3e3bd", btnStyle: "outline", btnColor: "#14100a", btnTextColor: "#f3e3bd", btnAccent: "#c9a24a", font: "playfair", btnRadius: 2, btnUppercase: false } },
  { id: "caramella", name: "Candy", theme: { ...DEFAULT_THEME, bgType: "pattern", bgPattern: "dots", bgColor: "#ffd6e8", bgColor2: "#ff8fbf", textColor: "#5a0f35", btnStyle: "hard", btnColor: "#ffffff", btnTextColor: "#5a0f35", btnAccent: "#5a0f35", font: "poppins", btnRadius: 16, btnUppercase: false } },
  { id: "montagna", name: "Mountain", theme: { ...DEFAULT_THEME, bgColor: "#e7eef2", textColor: "#16323f", btnStyle: "fill", btnColor: "#16323f", btnTextColor: "#ffffff", btnAccent: "#16323f", font: "barlow", btnRadius: 8, btnFontSize: 17 } },
  { id: "pulito", name: "Clean", theme: { ...DEFAULT_THEME, bgColor: "#ffffff", textColor: "#17171c", btnStyle: "outline", btnColor: "#ffffff", btnTextColor: "#17171c", btnAccent: "#17171c", font: "dmsans", btnRadius: 10, btnUppercase: false } }
];
var PRESETS = RAW_PRESETS.map((p) => ({ ...p, theme: { ...p.theme, titleFont: p.theme.font } }));
var COLOR_KEYS = ["bgColor", "bgColor2", "textColor", "btnColor", "btnTextColor", "btnAccent", "btnShadowColor", "bgColor3"];
var ENUMS = {
  bgType: ["solid", "gradient", "aurora", "pattern", "image", "blur", "video"],
  gradientType: ["linear", "radial"],
  bgPattern: ["dots", "grid", "stripes", "checks"],
  btnShadowType: ["none", "soft", "strong", "hard"],
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
  btnShadow: [0, 30],
  btnHeight: [48, 100]
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
  if ((t.bgType === "image" || t.bgType === "blur") && !t.bgImage) t.bgType = "solid";
  t.noise = !!src.noise;
  t.thumbCircle = !!src.thumbCircle;
  t.titleColor = /^#[0-9a-fA-F]{6}$/.test(src.titleColor ?? "") ? src.titleColor.toLowerCase() : null;
  t.bgVideo = /^https:\/\/[^\s"'<>()]+$/.test(src.bgVideo ?? "") ? src.bgVideo.slice(0, 500) : "";
  if (t.bgType === "video" && !t.bgVideo) t.bgType = "solid";
  const num = (v, min, max, d) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : d;
  };
  t.stickers = (Array.isArray(src.stickers) ? src.stickers : []).slice(0, 12).map((k) => ({
    image: IMAGE_ID.test(k?.image ?? "") ? k.image : null,
    emoji: String(k?.emoji ?? "").replace(/[<>&"']/g, "").slice(0, 16),
    x: num(k?.x, 0, 100, 10),
    y: num(k?.y, 0, 100, 10),
    size: num(k?.size, 20, 220, 64),
    rot: num(k?.rot, -180, 180, 0)
  })).filter((k) => k.image || k.emoji);
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
  const n = t.btnShadow;
  const c = t.btnShadowColor;
  const shadow = {
    none: "",
    soft: n ? `box-shadow:0 ${Math.round(n / 3)}px ${n}px ${c}55;` : "",
    strong: n ? `box-shadow:0 ${Math.round(n / 2)}px ${Math.round(n * 1.4)}px ${c}aa;` : "",
    hard: n ? `box-shadow:${Math.max(2, Math.round(n / 3))}px ${Math.max(2, Math.round(n / 3))}px 0 ${c};` : ""
  }[t.btnShadowType];
  switch (t.btnStyle) {
    case "outline":
      return `background:transparent;color:${t.btnTextColor};border:${Math.max(1, w)}px solid ${a};${shadow}`;
    case "glow":
      return `background:${t.btnColor};color:${t.btnTextColor};border:${w}px solid ${a};box-shadow:0 ${Math.round(n / 4)}px ${n}px ${a}99;`;
    case "glass":
      return `background:${t.btnColor}26;color:${t.btnTextColor};border:${w}px solid ${a}55;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);${shadow}`;
    case "hard":
      return `background:${t.btnColor};color:${t.btnTextColor};border:${Math.max(1, w)}px solid ${a};box-shadow:${Math.round(n / 3)}px ${Math.round(n / 3)}px 0 ${a};`;
    default:
      return `background:${t.btnColor};color:${t.btnTextColor};border:${w}px solid ${a};${shadow}`;
  }
}
var NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E")`;
function patternCss(t) {
  const c = `${t.bgColor2}66`;
  return {
    dots: `background-image:radial-gradient(${c} 2.4px,transparent 2.6px);background-size:22px 22px`,
    grid: `background-image:linear-gradient(${c} 1px,transparent 1px),linear-gradient(90deg,${c} 1px,transparent 1px);background-size:28px 28px`,
    stripes: `background-image:repeating-linear-gradient(45deg,${c} 0 6px,transparent 6px 22px)`,
    checks: `background-image:conic-gradient(${c} 25%,transparent 0 50%,${c} 0 75%,transparent 0);background-size:44px 44px`
  }[t.bgPattern];
}
function themeCss(input) {
  const t = sanitizeTheme(input);
  const font = (FONTS[t.font] || FONTS.inter).stack;
  const titleFont = (FONTS[t.titleFont] || FONTS.inter).stack;
  let layers = "";
  if (t.bgType === "gradient") {
    const g = t.gradientType === "radial" ? `radial-gradient(circle at 50% 30%,${t.bgColor},${t.bgColor2})` : `linear-gradient(${t.gradientAngle}deg,${t.bgColor},${t.bgColor2})`;
    layers = `body::before{content:"";position:fixed;inset:0;z-index:-2;background:${g}}`;
  } else if (t.bgType === "aurora") {
    layers = `body::before{content:"";position:fixed;inset:-30%;z-index:-2;background:radial-gradient(38% 30% at 62% 46%,${t.bgColor3}cc,transparent 72%),radial-gradient(60% 46% at 34% 56%,${t.bgColor2},transparent 74%),radial-gradient(52% 40% at 72% 78%,${t.bgColor2}dd,transparent 72%),${t.bgColor};animation:aurora 22s ease-in-out infinite alternate}@keyframes aurora{0%{transform:translate3d(-5%,-3%,0) rotate(0)}50%{transform:translate3d(5%,4%,0) rotate(6deg)}100%{transform:translate3d(-2%,6%,0) rotate(-6deg)}}@media (prefers-reduced-motion:reduce){body::before{animation:none}}`;
  } else if (t.bgType === "pattern") {
    layers = `body::before{content:"";position:fixed;inset:0;z-index:-2;${patternCss(t)}}`;
  } else if (t.bgType === "blur" && t.bgImage) {
    layers = `body::before{content:"";position:fixed;inset:-40px;z-index:-2;background:${t.bgColor} url(/img/${t.bgImage}) center/cover no-repeat;filter:blur(22px)}body::after{content:"";position:fixed;inset:0;z-index:-1;background:#000;opacity:${t.bgOverlay / 100}}`;
  } else if (t.bgType === "video") {
    layers = `body::after{content:"";position:fixed;inset:0;z-index:-1;background:#000;opacity:${t.bgOverlay / 100}}`;
  } else if (t.bgType === "image" && t.bgImage) {
    layers = `body::before{content:"";position:fixed;inset:0;z-index:-2;background:${t.bgColor} url(/img/${t.bgImage}) center/cover no-repeat}body::after{content:"";position:fixed;inset:0;z-index:-1;background:#000;opacity:${t.bgOverlay / 100}}`;
  }
  const thumb = Math.round(t.btnHeight * 0.74);
  const avatarRadius = { circle: "50%", rounded: "22%", square: "0", none: "0" }[t.avatarShape];
  return `:root{--accent:${t.btnAccent}}${t.noise ? `html::after{content:"";position:fixed;inset:0;z-index:5;pointer-events:none;opacity:.14;background-image:${NOISE}}` : ""}html{background:${t.bgColor}}body{color:${t.textColor};font-family:${font}}${layers}.avatar{width:${t.avatarSize}px;height:${t.avatarSize}px;border-radius:${avatarRadius};${t.avatarShape === "none" ? "display:none;" : ""}}h1{font-family:${titleFont};font-size:${t.titleSize}px;${t.titleColor ? `color:${t.titleColor};` : ""}${t.titleUppercase ? "text-transform:uppercase;" : ""}}.socials{order:${t.socialPosition === "bottom" ? 4 : 2}}.links,.link-grid,.link-carousel{gap:${t.btnGap}px}.btn,.event{${buttonCss(t)}border-radius:${t.btnRadius}px;font-size:${t.btnFontSize}px;${t.btnUppercase ? "text-transform:uppercase;" : ""}}.tile,.event{border-radius:${Math.min(t.btnRadius, 24)}px}.thumb{border-radius:${t.thumbCircle ? "50%" : `${Math.max(0, t.btnRadius - 6)}px`};width:${thumb}px;height:${thumb}px;left:${Math.round((t.btnHeight - thumb) / 2 - 2)}px}.btn:not(.tile){min-height:${t.btnHeight}px;padding-inline:${thumb + 16}px}.cta,.badge{background:${t.btnAccent};color:${contrastOn(t.btnAccent)};border-radius:${Math.max(6, t.btnRadius - 8)}px}`;
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
  const needsUrl = item.kind === "link" || item.kind === "event" || item.kind === "embed" && !item.settings?.address;
  if (needsUrl && !item.url && !item.sold_out) return "no-url";
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
function lockActive(lock) {
  return !!(lock && (lock.subscribe || lock.sensitive || lock.dob || lock.code || lock.password || lock.has_code || lock.has_password));
}
var needsGate = (item) => !!item.protected || lockActive(item.settings?.lock);
function applyRules(items, ctx) {
  const out = [];
  for (const item of items) {
    let keep = true;
    let title = item.title;
    for (const rule of item.settings?.rules || []) {
      const hit = (rule.values || []).includes(rule.type === "device" ? ctx.device : ctx.country);
      if (rule.mode === "show" && !hit) keep = false;
      if (rule.mode === "hide" && hit) keep = false;
      if (rule.mode === "title" && hit && rule.title) title = rule.title;
    }
    if (keep) out.push(title === item.title ? item : { ...item, title });
  }
  return out;
}

// src/render.js
var esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
var SOCIAL_ORDER = ["instagram", "tiktok", "facebook", "whatsapp", "youtube", "x", "telegram", "spotify", "snapchat", "linkedin", "website", "email"];
var ANIMATIONS = ["wiggle", "pop", "electric", "glitch", "scramble", "orbit", "emoji", "shimmer"];
function embedSrc(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    let m;
    if (host === "youtube.com" || host === "music.youtube.com") {
      const id = u.searchParams.get("v") || (u.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{6,})/) || [])[1];
      if (id && /^[\w-]+$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (host === "youtu.be" && (m = u.pathname.match(/^\/([\w-]{6,})/))) return `https://www.youtube-nocookie.com/embed/${m[1]}`;
    if (host === "open.spotify.com" && (m = u.pathname.match(/\/(track|album|playlist|show|episode)\/(\w+)/))) return `https://open.spotify.com/embed/${m[1]}/${m[2]}`;
    if (host === "tiktok.com" && (m = u.pathname.match(/\/video\/(\d+)/))) return `https://www.tiktok.com/embed/v2/${m[1]}`;
  } catch {
  }
  return null;
}
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
.section-title{margin:22px 0 4px;text-align:center;font-size:13px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;opacity:.85;overflow-wrap:anywhere}
.btn{position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:60px;padding:10px 62px;text-align:center;text-decoration:none;font-weight:600;line-height:1.2;transition:transform .15s}
.btn:hover{transform:translateY(-2px)}.btn:active{transform:translateY(0)}
.btn span{overflow-wrap:anywhere;text-wrap:balance}.btn small{display:block;margin-top:3px;font-size:.78em;font-weight:400;opacity:.72;text-transform:none}
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
.btn.tile{padding:0;overflow:hidden;align-items:stretch;justify-content:flex-start;min-width:0}.btn.tile.pinned{min-height:0}
.tile-media{display:block;width:100%;aspect-ratio:4/3;object-fit:cover}.tile-icon{display:grid;place-items:center;font-size:42px;padding-top:18px}.tile-icon svg{width:1em;height:1em}
.tile-body{display:flex;flex-direction:column;align-items:stretch;gap:4px;padding:12px 14px 14px}.tile .cta{margin-top:8px;padding:9px 14px}.tile .badge{align-self:center}
.link-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));width:100%}.link-grid .tile-media{aspect-ratio:1}
.link-carousel{display:flex;width:100%;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 4px 16px;-webkit-overflow-scrolling:touch}.link-carousel>*{flex:0 0 46%;scroll-snap-align:start;min-width:0}@media (max-width:420px){.link-carousel>*{flex-basis:47%}}.link-carousel .tile-media{aspect-ratio:1}.link-carousel .tile-body,.link-grid .tile-body{text-align:left;padding:10px 12px 13px;font-size:.92em}.link-carousel .tile-icon,.link-grid .tile-icon{padding-block:26px}
.embed-wrap,.gallery-wrap{display:flex;flex-direction:column;gap:8px;width:100%}.embed-title{margin:0;text-align:center;font-weight:700}.embed{width:100%;border:0;display:block;border-radius:14px;background:#0003}.embed-video{aspect-ratio:16/9}.embed-spotify{height:152px}.embed-tiktok{height:640px}.embed-map{height:280px}
.gallery{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px}.gallery-img{flex:0 0 78%;width:78%;aspect-ratio:1;object-fit:cover;border-radius:14px;scroll-snap-align:center;min-width:0}
.link-form input:not([type=checkbox]),.link-form textarea{width:100%;padding:11px 12px;border-radius:10px;border:1px solid #0003;font:inherit;text-transform:none;background:#fff;color:#111}.link-form .cta{width:100%;border:0;font:inherit;font-weight:800;cursor:pointer}.hp{position:absolute!important;left:-9999px;width:1px;height:1px;opacity:0}.consent{display:flex;gap:8px;align-items:flex-start;font-size:.85em;text-transform:none;line-height:1.3}.form-error{color:inherit;font-weight:700}.link-form{text-align:left}
.stickers{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:1}.sticker{position:absolute;line-height:1;display:block;object-fit:contain}.wrap{position:relative;z-index:2}.bg-video{position:fixed;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}
.spot{border:0;border-radius:18px;padding:0;width:min(420px,calc(100vw - 32px));overflow:hidden;font:inherit}.spot::backdrop{background:#000a}.spot img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover}.spot-body{display:flex;flex-direction:column;gap:10px;padding:18px;text-align:center}.spot h2{margin:0;font-size:20px}.spot p{margin:0}.spot .cta{text-decoration:none;display:block;padding:13px;font-weight:800}.spot-close{position:absolute;top:8px;right:8px;width:36px;height:36px;border-radius:50%;border:0;background:#000a;color:#fff;font-size:18px;cursor:pointer}
@keyframes a-wiggle{0%,86%,100%{transform:rotate(0)}89%{transform:rotate(-2deg)}92%{transform:rotate(2deg)}95%{transform:rotate(-1.4deg)}98%{transform:rotate(1deg)}}.anim-wiggle{animation:a-wiggle 3.6s infinite}
@keyframes a-pop{0%,84%,100%{transform:scale(1)}90%{transform:scale(1.05)}95%{transform:scale(.985)}}.anim-pop{animation:a-pop 3.2s infinite}
@keyframes a-electric{0%,100%{box-shadow:0 0 4px var(--accent)}12%{box-shadow:0 0 20px var(--accent),0 0 2px #fff}16%{box-shadow:0 0 3px var(--accent)}22%{box-shadow:0 0 26px var(--accent),0 0 4px #fff}34%{box-shadow:0 0 6px var(--accent)}}.anim-electric{animation:a-electric 1.8s infinite}
@keyframes a-glitch{0%,88%,100%{transform:none;filter:none}90%{transform:translate(-3px,1px);filter:hue-rotate(40deg)}93%{transform:translate(3px,-1px);filter:hue-rotate(-40deg)}96%{transform:translate(-1px,0)}}.anim-glitch{animation:a-glitch 3s infinite}
@keyframes a-orbit{0%,100%{box-shadow:-6px -6px 12px var(--accent)}25%{box-shadow:6px -6px 12px var(--accent)}50%{box-shadow:6px 6px 12px var(--accent)}75%{box-shadow:-6px 6px 12px var(--accent)}}.anim-orbit{animation:a-orbit 2.4s linear infinite}
@keyframes a-shimmer{0%,62%{transform:translateX(-130%) skewX(-18deg)}100%{transform:translateX(330%) skewX(-18deg)}}.anim-shimmer{overflow:hidden}.anim-shimmer::after{content:"";position:absolute;inset:0;width:34%;background:linear-gradient(90deg,transparent,#ffffff70,transparent);animation:a-shimmer 3s infinite;pointer-events:none}
@keyframes a-emoji{0%{transform:translateY(8px) scale(.6);opacity:0}20%{opacity:1}100%{transform:translateY(-34px) scale(1.2);opacity:0}}.anim-emoji{overflow:visible}.anim-emoji::after{content:attr(data-emoji);position:absolute;right:16px;top:6px;font-size:20px;animation:a-emoji 2.2s infinite;pointer-events:none}.event.anim-shimmer,.event.anim-emoji{position:relative}
a:focus-visible,button:focus-visible{outline:3px solid currentColor;outline-offset:3px}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}@media (max-width:420px){.wrap{padding-block-start:36px}.btn{padding-inline:58px}}`;
var SHARE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';
function renderPage(page, items, { preview = false, timeZone = "Europe/Madrid", origin = "", visitor = null, sent = null, formError = null } = {}) {
  const theme = sanitizeTheme(preview ? page.theme_draft || page.theme : page.theme);
  const socials = page.socials || {};
  const description = page.seo_description || page.bio || page.title;
  const list = visibleItems(visitor ? applyRules(items, visitor) : items);
  const dateFormat = new Intl.DateTimeFormat("en-GB", { timeZone, weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const hrefFor = (item) => preview ? esc(item.url) : needsGate(item) ? `/verify/${item.id}` : `/go/${item.id}`;
  const external = preview ? 'target="_blank" ' : "";
  const fx = (item) => {
    const a = item.settings?.animation;
    if (!a || !ANIMATIONS.includes(a)) return { cls: "", attr: "" };
    return { cls: ` anim-${a}`, attr: a === "emoji" ? ` data-emoji="${esc(item.settings.emoji || "🎉")}"` : "" };
  };
  const eventHtml = (item) => {
    const action = item.sold_out ? '<span class="badge">Sold out</span>' : item.url ? `<a class="cta" href="${hrefFor(item)}" ${external}rel="noopener">${esc(item.cta_label || "Get Tickets")}</a>` : "";
    const f = fx(item);
    return `<article class="event${f.cls}"${f.attr}>${item.thumb_image ? `<img src="/img/${esc(item.thumb_image)}" alt="" loading="lazy">` : ""}<div class="event-body">${item.event_date ? `<div class="event-date">${esc(dateFormat.format(new Date(item.event_date)))}</div>` : ""}<h3>${esc(item.title)}</h3>${item.subtitle ? `<p>${esc(item.subtitle)}</p>` : ""}${action}</div></article>`;
  };
  const tileHtml = (item, icon, withButton) => {
    const media = item.thumb_image ? `<img class="tile-media" src="/img/${esc(item.thumb_image)}" alt="" loading="lazy">` : icon ? `<span class="tile-icon">${ICONS[icon]}</span>` : "";
    const body = `<span class="tile-body"><span>${esc(item.title || item.url)}${item.subtitle ? `<small>${esc(item.subtitle)}</small>` : ""}</span>${item.sold_out ? '<span class="badge">Sold out</span>' : withButton && item.cta_label ? `<span class="cta">${esc(item.cta_label)}</span>` : ""}</span>`;
    const f = fx(item);
    const cls = `btn tile${item.pinned ? " pinned" : ""}${f.cls}`;
    if (item.sold_out) return `<div class="${cls} sold"${f.attr}>${media}${body}</div>`;
    return `<a class="${cls}"${f.attr} href="${hrefFor(item)}" ${external}rel="noopener">${media}${body}</a>`;
  };
  const embedHtml = (item) => {
    const address = item.settings?.address;
    const src = address ? `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed` : embedSrc(item.url);
    if (!src) return null;
    const type = address ? "map" : /spotify/.test(src) ? "spotify" : /tiktok/.test(src) ? "tiktok" : "video";
    return `<div class="embed-wrap">${item.title ? `<p class="embed-title">${esc(item.title)}</p>` : ""}<iframe class="embed embed-${type}" src="${esc(src)}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" title="${esc(item.title || "Embedded content")}"></iframe></div>`;
  };
  const galleryHtml = (item) => {
    const images = (item.settings?.images || []).map((id) => `<img class="gallery-img" src="/img/${esc(id)}" alt="" loading="lazy">`).join("");
    return `<div class="gallery-wrap">${item.title ? `<p class="embed-title">${esc(item.title)}</p>` : ""}<div class="gallery">${images}</div></div>`;
  };
  const formHtml = (item) => {
    const form = item.settings?.form || {};
    if (sent === item.id) return `<div class="event form-done"><div class="event-body"><h3>${esc(form.thanks || "Thank you!")}</h3><p>We received your details.</p></div></div>`;
    return `<form class="event link-form" method="post" action="/form/${item.id}"><div class="event-body"><h3>${esc(item.title)}</h3>${item.subtitle ? `<p>${esc(item.subtitle)}</p>` : ""}${formError === item.id ? '<p class="form-error" role="alert">Please check your details and try again.</p>' : ""}${form.name ? `<input name="name" maxlength="120" placeholder="Your name" autocomplete="name" aria-label="Your name">` : ""}<input name="email" type="email" required maxlength="200" placeholder="Your email" autocomplete="email" aria-label="Your email">${form.message ? `<textarea name="message" maxlength="1000" rows="3" placeholder="Your message" aria-label="Your message"></textarea>` : ""}<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><label class="consent"><input type="checkbox" name="consent" value="yes" required> I agree that ${esc(page.title)} can contact me.</label>${preview ? '<button class="cta" type="button">Send</button>' : `<button class="cta" type="submit">${esc(item.cta_label || "Send")}</button>`}</div></form>`;
  };
  const itemHtml = (item, inGroup) => {
    if (item.kind === "event") return eventHtml(item);
    if (item.kind === "gallery") return galleryHtml(item);
    if (item.kind === "form") return formHtml(item);
    if (item.kind === "embed") {
      const e = embedHtml(item);
      if (e) return e;
      if (!item.url) return "";
    }
    const icon = item.icon === "none" ? null : ICONS[item.icon] ? item.icon : autoIcon(item.url);
    if (inGroup) return tileHtml(item, icon, false);
    if (item.display === "card") return tileHtml(item, icon, true);
    const thumb = item.thumb_image ? `<img class="thumb" src="/img/${esc(item.thumb_image)}" alt="" loading="lazy">` : icon ? `<span class="thumb thumb-icon">${ICONS[icon]}</span>` : "";
    const label = `${thumb}<span>${esc(item.title || item.url)}${item.subtitle ? `<small>${esc(item.subtitle)}</small>` : ""}</span>`;
    const f = fx(item);
    const pinned = `${item.pinned ? " pinned" : ""}${f.cls}`;
    if (item.sold_out) return `<div class="btn sold${pinned}"${f.attr}>${label}<span class="badge">Sold out</span></div>`;
    return `<a class="btn${pinned}"${f.attr} href="${hrefFor(item)}" ${external}rel="noopener">${label}</a>`;
  };
  const parts = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.kind !== "section") {
      parts.push(itemHtml(item, false));
      continue;
    }
    if (item.title) parts.push(`<h2 class="section-title">${esc(item.title)}</h2>`);
    if (item.display !== "grid" && item.display !== "carousel") continue;
    const group = [];
    while (i + 1 < list.length && list[i + 1].kind !== "section") group.push(itemHtml(list[++i], true));
    parts.push(`<div class="link-${item.display}">${group.join("")}</div>`);
  }
  const linksHtml = parts.join("");
  const stickersHtml = theme.stickers.length ? `<div class="stickers" aria-hidden="true">${theme.stickers.map((k) => {
    const style = `left:${k.x}%;top:${k.y}%;transform:rotate(${k.rot}deg);`;
    return k.image ? `<img class="sticker" src="/img/${esc(k.image)}" alt="" style="${style}width:${k.size}px">` : `<span class="sticker" style="${style}font-size:${k.size}px">${esc(k.emoji)}</span>`;
  }).join("")}</div>` : "";
  const videoHtml = theme.bgType === "video" ? `<video class="bg-video" src="${esc(theme.bgVideo)}" autoplay muted loop playsinline aria-hidden="true"></video>` : "";
  const spotItem = preview ? null : list.find((i) => i.settings?.prioritize === "expand" && i.kind !== "section" && i.url && !i.sold_out);
  const spotHtml = spotItem ? `<dialog class="spot" id="spot"><button class="spot-close" type="button" aria-label="Close">×</button>${spotItem.thumb_image ? `<img src="/img/${esc(spotItem.thumb_image)}" alt="">` : ""}<div class="spot-body"><h2>${esc(spotItem.title)}</h2>${spotItem.subtitle ? `<p>${esc(spotItem.subtitle)}</p>` : ""}<a class="cta" href="${hrefFor(spotItem)}" rel="noopener">${esc(spotItem.cta_label || "Open")}</a></div></dialog>` : "";
  const usesScramble = !preview && list.some((i) => i.settings?.animation === "scramble");
  const socialHtml = SOCIAL_ORDER.filter((k) => socials[k]).map((k) => `<a href="${esc(socials[k])}" target="_blank" rel="noopener" aria-label="${esc(k)}">${ICONS[k]}</a>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(page.title)}</title><meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:site_name" content="${esc(page.title)}"><meta name="theme-color" content="${esc(theme.bgColor)}"><meta property="og:url" content="${esc(origin)}/${esc(page.slug)}"><link rel="canonical" href="${esc(origin)}/${esc(page.slug)}"><meta name="twitter:card" content="summary">
${page.avatar_image ? `<meta property="og:image" content="${esc(origin)}/img/${esc(page.avatar_image)}"><link rel="icon" href="/img/${esc(page.avatar_image)}">` : ""}
${preview ? '<meta name="robots" content="noindex">' : ""}
<link id="font" rel="stylesheet" href="${esc(fontHref(theme))}">
<style>${BASE_CSS}</style><style id="theme">${themeCss(theme)}</style></head><body>
${preview ? "" : `<button class="share" type="button" aria-label="Share">${SHARE_ICON}</button>`}
${stickersHtml}${videoHtml}<main class="wrap"><header class="profile">
${page.avatar_image ? `<img class="avatar" src="/img/${esc(page.avatar_image)}" alt="${esc(page.title)}">` : ""}
<h1>${esc(page.title)}</h1>${page.bio ? `<p class="bio">${esc(page.bio)}</p>` : ""}</header>
${socialHtml ? `<nav class="socials" aria-label="Social">${socialHtml}</nav>` : ""}
<section class="links">${linksHtml}</section></main>${spotHtml}
${preview ? "" : `<script>document.querySelector('.share').addEventListener('click',async()=>{const u=location.href;try{if(navigator.share){await navigator.share({title:document.title,url:u});return}await navigator.clipboard.writeText(u);const t=document.createElement('div');t.className='toast';t.textContent='Link copied';document.body.append(t);setTimeout(()=>t.remove(),1800)}catch(e){}})${spotHtml ? ";(function(){var d=document.getElementById('spot');try{if(sessionStorage.getItem('spot'))return;sessionStorage.setItem('spot','1')}catch(e){}if(d.showModal)d.showModal();d.querySelector('.spot-close').addEventListener('click',function(){d.close()})})()" : ""}${usesScramble ? ";document.querySelectorAll('.anim-scramble').forEach(function(el){var t=el.querySelector('span');if(!t||t.children.length)return;var o=t.textContent,c='#%&*@$?!';setInterval(function(){var n=0,i=setInterval(function(){t.textContent=o.split('').map(function(ch,x){return x<n||ch===' '?ch:c[Math.floor(Math.random()*c.length)]}).join('');n+=2;if(n>o.length){clearInterval(i);t.textContent=o}},40)},4200)})" : ""}<\/script>`}
</body></html>`;
}
function renderVerifyPage(page, item, { siteKey, action, error, values = {} }) {
  const theme = sanitizeTheme(page.theme);
  const label = item.title || "this link";
  const lock = item.settings?.lock || {};
  const hasFields = !!(lock.code || lock.password || lock.dob || lock.sensitive || lock.subscribe);
  const useCheck = !!(item.protected && siteKey);
  const fields = [
    lock.code ? '<label class="gate-field">Access code<input name="code" required autocomplete="off" maxlength="100"></label>' : "",
    lock.password ? '<label class="gate-field">Password<input name="password" type="password" required autocomplete="off" maxlength="200"></label>' : "",
    lock.dob ? `<label class="gate-field">Date of birth<input name="dob" type="date" required value="${esc(values.dob || "")}"></label><p class="check-note">You must be at least ${Number(lock.dob.minAge) || 18} years old.</p>` : "",
    lock.subscribe ? `<label class="gate-field">Email<input name="email" type="email" required maxlength="200" autocomplete="email" value="${esc(values.email || "")}"></label><label class="consent"><input type="checkbox" name="consent" value="yes" required> I agree that ${esc(page.title)} can contact me.</label>` : "",
    lock.sensitive ? '<label class="consent"><input type="checkbox" name="sensitive" value="yes" required> I understand this link may contain sensitive content.</label>' : ""
  ].join("");
  const widget = useCheck ? `<div class="cf-turnstile" data-sitekey="${esc(siteKey)}" data-action="${esc(action)}" data-callback="onCheckPassed" data-error-callback="onCheckFailed" data-expired-callback="onCheckExpired"></div>` : "";
  const canSubmit = !useCheck;
  const form = useCheck || hasFields ? `<form method="post" id="check" class="check-form">${fields}${widget}<button class="btn" id="go" type="submit"${canSubmit ? "" : " disabled"}>Continue</button></form>
<p class="check-note" id="note" role="status" hidden></p>${useCheck ? `<noscript><p class="check-note">Turn on JavaScript to complete this check.</p></noscript>
<script>
var form=document.getElementById('check'),go=document.getElementById('go'),note=document.getElementById('note'),auto=${hasFields ? "false" : "true"};
function say(t){note.textContent=t;note.hidden=false}
function onCheckPassed(){go.disabled=false;if(auto){go.textContent='Opening…';form.submit()}}
function onCheckFailed(){go.disabled=true;say('The check could not finish. Reload the page, or open this link in your phone browser.')}
function onCheckExpired(){go.disabled=true;go.textContent='Continue';say('The check expired. Please complete it again.')}
setTimeout(function(){if(!window.turnstile)say('The check did not load. Reload the page, or open this link in your phone browser.')},8000);
<\/script><script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer><\/script>` : ""}` : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex">
<title>${hasFields ? "One more step" : "Quick check"} · ${esc(page.title)}</title><link id="font" rel="stylesheet" href="${esc(fontHref(theme))}">
<style>${BASE_CSS}
.check{display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;width:100%;margin:auto 0}.check h1{margin:0}.check p{margin:0;font-size:15px;line-height:1.45;overflow-wrap:anywhere}
.check-form{display:flex;flex-direction:column;align-items:stretch;gap:14px;width:100%;max-width:340px;margin-top:8px}.check-form .cf-turnstile{align-self:center}.check-form .btn{width:100%;min-height:52px;padding-inline:16px;cursor:pointer;font:inherit;font-weight:600}.check-form .btn[disabled]{opacity:.55;cursor:default;transform:none}
.gate-field{display:flex;flex-direction:column;gap:5px;text-align:left;font-size:14px;font-weight:600}.gate-field input{padding:12px;border-radius:10px;border:1px solid #0003;font:inherit;background:#fff;color:#111}.consent{display:flex;gap:8px;text-align:left;font-size:13px;line-height:1.35}
.check-note{opacity:.9;font-size:14px}.check-error{font-weight:600}.back{color:inherit;font-size:14px}</style><style id="theme">${themeCss(theme)}</style></head><body>
<main class="wrap"><section class="check"><h1>${hasFields ? "One more step" : "Quick check"}</h1><p>${hasFields ? "Complete this to open" : "Confirm you are not a bot to open"} <strong>${esc(label)}</strong>.</p>
${error ? `<p class="check-error" role="alert">${esc(error)}</p>` : ""}${form}
<a class="back" href="/${item.is_home ? "" : esc(item.slug)}">Back to ${esc(page.title)}</a></section></main></body></html>`;
}
function renderNotFound() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0d17;color:#fff;font:16px system-ui,sans-serif;text-align:center;padding:24px}</style></head><body><p>This page does not exist or is no longer available.</p></body></html>`;
}
function renderAdminShell() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow">
<title>ESL Links</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap"><link rel="stylesheet" href="/static/admin.css">
</head><body><div id="app"></div><div id="toasts" aria-live="polite"></div><script type="module" src="/static/admin.js"><\/script></body></html>`;
}

// src/index.js
var SCHEMA = [
  `CREATE TABLE IF NOT EXISTS pages (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, bio TEXT NOT NULL DEFAULT '', avatar_image TEXT, theme TEXT NOT NULL, theme_draft TEXT, socials TEXT NOT NULL DEFAULT '{}', seo_description TEXT NOT NULL DEFAULT '', published INTEGER NOT NULL DEFAULT 1, is_home INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, page_id INTEGER NOT NULL, kind TEXT NOT NULL DEFAULT 'link', title TEXT NOT NULL DEFAULT '', subtitle TEXT NOT NULL DEFAULT '', url TEXT NOT NULL DEFAULT '', thumb_image TEXT, icon TEXT NOT NULL DEFAULT 'auto', position INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1, pinned INTEGER NOT NULL DEFAULT 0, sold_out INTEGER NOT NULL DEFAULT 0, protected INTEGER NOT NULL DEFAULT 0, display TEXT NOT NULL DEFAULT 'classic', settings TEXT NOT NULL DEFAULT '{}', starts_at TEXT, ends_at TEXT, event_date TEXT, cta_label TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS items_page ON items (page_id, position)`,
  `CREATE TABLE IF NOT EXISTS stats_daily (day TEXT NOT NULL, page_id INTEGER NOT NULL, item_id INTEGER NOT NULL, hits INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (day, page_id, item_id))`,
  `CREATE TABLE IF NOT EXISTS stats_dim (day TEXT NOT NULL, page_id INTEGER NOT NULL, dim TEXT NOT NULL, key TEXT NOT NULL, hits INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (day, page_id, dim, key))`,
  `CREATE TABLE IF NOT EXISTS visitors (day TEXT NOT NULL, page_id INTEGER NOT NULL, hash TEXT NOT NULL, PRIMARY KEY (day, page_id, hash))`,
  `CREATE TABLE IF NOT EXISTS salts (day TEXT PRIMARY KEY, salt TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS images (id TEXT PRIMARY KEY, mime TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, page_id INTEGER NOT NULL, item_id INTEGER, email TEXT NOT NULL, name TEXT NOT NULL DEFAULT '', message TEXT NOT NULL DEFAULT '', source TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL)`,
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
  const columns = (await db.prepare("PRAGMA table_info(items)").all()).results.map((c) => c.name);
  const added = { protected: "INTEGER NOT NULL DEFAULT 0", display: "TEXT NOT NULL DEFAULT 'classic'", settings: "TEXT NOT NULL DEFAULT '{}'" };
  for (const [name, type] of Object.entries(added)) {
    if (columns.includes(name)) continue;
    await db.prepare(`ALTER TABLE items ADD COLUMN ${name} ${type}`).run().catch((e) => {
      if (!/duplicate column/i.test(String(e))) throw e;
    });
  }
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
var parseItem = (row) => {
  if (!row) return row;
  let settings = {};
  try {
    settings = JSON.parse(row.settings || "{}");
  } catch {
  }
  return { ...row, settings };
};
var cleanItem = (item) => {
  const lock = { ...item.settings?.lock || {} };
  const out = { ...lock, has_code: !!lock.code, has_password: !!lock.password };
  delete out.code;
  delete out.password;
  return { ...item, settings: { ...item.settings, lock: out } };
};
var getItems = async (env, pageId) => (await env.DB.prepare("SELECT * FROM items WHERE page_id=? ORDER BY position, id").bind(pageId).all()).results.map(parseItem);
async function removeImageIfUnused(env, id) {
  if (!id || !IMAGE_ID.test(id)) return;
  const like = `%${id}%`;
  const used = await env.DB.prepare(
    "SELECT (SELECT COUNT(*) FROM items WHERE thumb_image=?1 OR settings LIKE ?2) + (SELECT COUNT(*) FROM pages WHERE avatar_image=?1 OR theme LIKE ?2 OR theme_draft LIKE ?2) AS n"
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
    throw new HttpError(400, "This address is not valid. Check that you copied all of it.");
  }
  if (!SAFE_SCHEMES.includes(parsed.protocol)) throw new HttpError(400, "This type of address is not allowed.");
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
  if (Number.isNaN(t)) throw new HttpError(400, "One of the dates is not valid.");
  return new Date(t).toISOString();
}
var RESERVED_SLUGS = /* @__PURE__ */ new Set(["admin", "api", "go", "img", "static", "verify", "form", "favicon.ico", "robots.txt"]);
function validSlug(value) {
  const slug = text(value, 60).toLowerCase();
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new HttpError(400, "The address can contain only lowercase letters, numbers and hyphens.");
  if (RESERVED_SLUGS.has(slug)) throw new HttpError(400, "This address is reserved. Choose another one.");
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
    throw new HttpError(503, "The password is missing or too short. Set the ADMIN_PASSWORD secret on Cloudflare with at least 10 characters.", "no_password");
  }
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const now = Date.now();
  const row = await env.DB.prepare("SELECT fails, first_at FROM login_attempts WHERE ip=?").bind(ip).first();
  const inWindow = row && now - row.first_at < FAIL_WINDOW_MS;
  if (inWindow && row.fails >= MAX_FAILS) throw new HttpError(429, "Too many attempts. Try again in 15 minutes.");
  const body = await request.json().catch(() => ({}));
  const key = await hmacKey(`${env.ADMIN_PASSWORD}:login`);
  const ok = safeEqual(await sign(key, String(body.password ?? "")), await sign(key, env.ADMIN_PASSWORD));
  if (!ok) {
    await env.DB.prepare("INSERT INTO login_attempts (ip,fails,first_at) VALUES (?,1,?) ON CONFLICT(ip) DO UPDATE SET fails=?,first_at=?").bind(ip, now, inWindow ? row.fails + 1 : 1, inWindow ? row.first_at : now).run();
    throw new HttpError(401, "Incorrect password.");
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
  return host ? host.slice(0, 40) : "direct";
}
var deviceType = (request) => {
  const ua = request.headers.get("User-Agent") || "";
  if (/iPad|Tablet|PlayBook|Silk|Android(?!.*Mobi)/i.test(ua)) return "tablet";
  return /Mobi|Android|iPhone|iPod/i.test(ua) ? "mobile" : "desktop";
};
var visitorCountry = (request) => {
  const c = String(request.cf?.country || request.headers.get("CF-IPCountry") || "").toUpperCase();
  return /^[A-Z]{2}$/.test(c) && c !== "XX" && c !== "T1" ? c : "";
};
var visitorOf = (request) => ({ country: visitorCountry(request), device: deviceType(request) });
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
    incDim(env, day, pageId, "device", deviceType(request)),
    ...visitorCountry(request) ? [incDim(env, day, pageId, "country", visitorCountry(request))] : []
  ]);
  const salt = await dailySalt(env, day);
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const ua = request.headers.get("User-Agent") || "";
  const hash = hex(await crypto.subtle.digest("SHA-256", enc.encode(`${salt}|${pageId}|${ip}|${ua}`)));
  const res = await env.DB.prepare("INSERT OR IGNORE INTO visitors (day,page_id,hash) VALUES (?,?,?)").bind(day, pageId, hash).run();
  if (res.meta.changes > 0) await incDim(env, day, pageId, "uniques", "").run();
}
async function recordClick(request, env, item) {
  const day = dayIn(zoned(env));
  await env.DB.batch([incDaily(env, day, item.page_id, item.id), incDim(env, day, item.page_id, `click:${item.id}`, trafficSource(request))]);
}
async function statsReport(env, url) {
  const today = dayIn(zoned(env));
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  const to = dateRe.test(url.searchParams.get("to") || "") ? url.searchParams.get("to") : today;
  const from = dateRe.test(url.searchParams.get("from") || "") ? url.searchParams.get("from") : to;
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) throw new HttpError(400, "Invalid date range.");
  const count = Math.round((end - start) / 864e5) + 1;
  if (count > 800) throw new HttpError(400, "The range can cover at most 800 days.");
  const pageParam = url.searchParams.get("page") || "all";
  const all = pageParam === "all";
  const pageId = Number(pageParam);
  if (!all && !Number.isInteger(pageId)) throw new HttpError(400, "Invalid brand.");
  const filter = all ? "" : " AND s.page_id=?3";
  const q = (sql) => {
    const st = env.DB.prepare(sql);
    return all ? st.bind(from, to) : st.bind(from, to, pageId);
  };
  const [daily, uniques, items, dims] = await env.DB.batch([
    q(`SELECT s.day, SUM(CASE WHEN s.item_id=0 THEN s.hits ELSE 0 END) AS views, SUM(CASE WHEN s.item_id<>0 THEN s.hits ELSE 0 END) AS clicks FROM stats_daily s WHERE s.day BETWEEN ?1 AND ?2${filter} GROUP BY s.day`),
    q(`SELECT s.day, SUM(s.hits) AS uniques FROM stats_dim s WHERE s.dim='uniques' AND s.day BETWEEN ?1 AND ?2${filter} GROUP BY s.day`),
    q(`SELECT s.item_id AS id, MAX(i.title) AS title, MAX(p.title) AS page, SUM(s.hits) AS clicks FROM stats_daily s LEFT JOIN items i ON i.id=s.item_id LEFT JOIN pages p ON p.id=s.page_id WHERE s.item_id<>0 AND s.day BETWEEN ?1 AND ?2${filter} GROUP BY s.item_id ORDER BY clicks DESC`),
    q(`SELECT s.dim, s.key, SUM(s.hits) AS hits FROM stats_dim s WHERE s.dim IN ('source','device','country') AND s.day BETWEEN ?1 AND ?2${filter} GROUP BY s.dim, s.key ORDER BY hits DESC`)
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
    items: items.results.map((r) => ({ id: r.id, title: r.title || "Deleted link", page: r.page || "", clicks: r.clicks })),
    sources: dims.results.filter((r) => r.dim === "source").map(({ key, hits }) => ({ key, hits })),
    devices: dims.results.filter((r) => r.dim === "device").map(({ key, hits }) => ({ key, hits })),
    countries: dims.results.filter((r) => r.dim === "country").map(({ key, hits }) => ({ key, hits }))
  };
}
var TURNSTILE_ACTION = "open-link";
var turnstileConfigured = (env) => !!(env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY);
async function turnstilePasses(request, env, token) {
  if (!token || token.length > 2048) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: request.headers.get("CF-Connecting-IP") || void 0 })
  });
  const data = await res.json();
  return data.success === true && data.action === TURNSTILE_ACTION;
}
async function protectedTarget(env, id) {
  return parseItem(await env.DB.prepare("SELECT i.*, p.slug, p.published, p.is_home, p.title AS page_title, p.theme AS page_theme FROM items i JOIN pages p ON p.id=i.page_id WHERE i.id=?").bind(id).first());
}
var pagePath = (url, item) => `${url.origin}/${item.is_home ? "" : item.slug}`;
var isOpenable = (item) => !!item.url && !item.sold_out && !!item.published && isVisible(item);
var EMAIL_RE = /^[^\s@<>"']{1,100}@[^\s@<>"']{1,100}\.[^\s@<>"']{2,}$/;
var sha256Hex = async (text2) => hex(await crypto.subtle.digest("SHA-256", enc.encode(text2)));
async function makeSecret(value) {
  const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
  return { s: salt, h: await sha256Hex(`${salt}:${value}`) };
}
var secretMatches = async (secret, value) => !!secret && safeEqual(await sha256Hex(`${secret.s}:${value}`), secret.h);
function ageFrom(dob, now = /* @__PURE__ */ new Date()) {
  const d = /* @__PURE__ */ new Date(`${dob}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob) || Number.isNaN(d.getTime()) || d > now) return -1;
  let age = now.getUTCFullYear() - d.getUTCFullYear();
  const m = now.getUTCMonth() - d.getUTCMonth();
  if (m < 0 || m === 0 && now.getUTCDate() < d.getUTCDate()) age -= 1;
  return age;
}
async function tooManyAttempts(request, env, purpose, limit) {
  const key = `${purpose}:${request.headers.get("CF-Connecting-IP") || "local"}`;
  const now = Date.now();
  const row = await env.DB.prepare("SELECT fails, first_at FROM login_attempts WHERE ip=?").bind(key).first();
  const inWindow = row && now - row.first_at < FAIL_WINDOW_MS;
  if (inWindow && row.fails >= limit) return true;
  await env.DB.prepare("INSERT INTO login_attempts (ip,fails,first_at) VALUES (?,1,?) ON CONFLICT(ip) DO UPDATE SET fails=?,first_at=?").bind(key, now, inWindow ? row.fails + 1 : 1, inWindow ? row.first_at : now).run();
  return false;
}
async function addContact(env, { pageId, itemId, email, name = "", message = "", source }) {
  await env.DB.prepare("INSERT INTO contacts (page_id,item_id,email,name,message,source,created_at) VALUES (?,?,?,?,?,?,?)").bind(pageId, itemId, email.slice(0, 200), name.slice(0, 120), message.slice(0, 1e3), source, (/* @__PURE__ */ new Date()).toISOString()).run();
}
async function serveVerify(request, env, ctx, url, id) {
  const item = await protectedTarget(env, id);
  if (!item) return Response.redirect(`${url.origin}/`, 302);
  if (!isOpenable(item)) return Response.redirect(pagePath(url, item), 302);
  if (!needsGate(item)) return Response.redirect(`${url.origin}/go/${item.id}`, 302);
  const lock = item.settings.lock || {};
  const show = (error, status = 200, values2 = {}) => html(renderVerifyPage(
    { title: item.page_title, theme: JSON.parse(item.page_theme) },
    item,
    { siteKey: env.TURNSTILE_SITE_KEY, action: TURNSTILE_ACTION, error, values: values2 }
  ), status, { "X-Robots-Tag": "noindex" });
  if (item.protected && !turnstileConfigured(env)) return show("This link is temporarily unavailable. Please try again later.", 503);
  if (request.method !== "POST") return show("");
  const origin = request.headers.get("Origin");
  if (origin && origin !== url.origin) return show("This request could not be verified. Please try again.", 403);
  const form = await request.formData().catch(() => null);
  const field = (name) => String(form?.get(name) || "").trim();
  const values = { dob: field("dob"), email: field("email") };
  if ((lock.code || lock.password) && await tooManyAttempts(request, env, `gate:${item.id}`, 10)) {
    return show("Too many attempts. Please try again in 15 minutes.", 429, values);
  }
  if (lock.code && !await secretMatches(lock.code, field("code"))) return show("That code is not correct.", 403, values);
  if (lock.password && !await secretMatches(lock.password, field("password"))) return show("That password is not correct.", 403, values);
  if (lock.dob) {
    const min = Number(lock.dob.minAge) || 18;
    const age = ageFrom(values.dob);
    if (age < 0) return show("Please enter a valid date of birth.", 400, values);
    if (age < min) return show(`You must be at least ${min} years old to open this link.`, 403, {});
  }
  if (lock.sensitive && field("sensitive") !== "yes") return show("Please confirm to continue.", 400, values);
  if (lock.subscribe && (!EMAIL_RE.test(values.email) || field("consent") !== "yes")) return show("Please enter a valid email and accept to continue.", 400, values);
  if (item.protected) {
    let passed = false;
    try {
      passed = await turnstilePasses(request, env, field("cf-turnstile-response"));
    } catch (e) {
      console.error("turnstile", e);
      return show("The check is not responding right now. Please try again in a moment.", 503, values);
    }
    if (!passed) return show("The check did not pass. Please try again.", 403, values);
  }
  if (lock.subscribe) await addContact(env, { pageId: item.page_id, itemId: item.id, email: values.email, source: item.title });
  if (isCountable(request) && !await getSession(request, env)) {
    ctx.waitUntil(recordClick(request, env, item).catch((e) => console.error("stats", e)));
  }
  return new Response(null, { status: 303, headers: { Location: item.url, "Cache-Control": "no-store", "Referrer-Policy": "origin" } });
}
async function serveForm(request, env, url, id) {
  const item = parseItem(await env.DB.prepare("SELECT i.*, p.slug, p.published, p.is_home FROM items i JOIN pages p ON p.id=i.page_id WHERE i.id=? AND i.kind='form'").bind(id).first());
  if (!item || !item.published || !isVisible(item)) return Response.redirect(`${url.origin}/`, 302);
  const back = pagePath(url, item);
  const form = await request.formData().catch(() => null);
  const field = (name) => String(form?.get(name) || "").trim();
  const origin = request.headers.get("Origin");
  if (field("website")) return Response.redirect(`${back}?sent=${item.id}`, 303);
  if (origin && origin !== url.origin || !EMAIL_RE.test(field("email")) || field("consent") !== "yes") return Response.redirect(`${back}?formerror=${item.id}`, 303);
  if (await tooManyAttempts(request, env, "form", 20)) return Response.redirect(`${back}?formerror=${item.id}`, 303);
  await addContact(env, { pageId: item.page_id, itemId: item.id, email: field("email"), name: field("name"), message: field("message"), source: item.title });
  return Response.redirect(`${back}?sent=${item.id}`, 303);
}
var ITEM_KINDS = ["link", "section", "event", "embed", "gallery", "form"];
var ITEM_DISPLAYS = ["classic", "card", "list", "grid", "carousel"];
async function mergeSettings(current, patch) {
  const next = { ...current };
  if ("animation" in patch) next.animation = ANIMATIONS.includes(patch.animation) ? patch.animation : "";
  if ("emoji" in patch) next.emoji = text(patch.emoji, 16).replace(/[<>&"']/g, "");
  if ("prioritize" in patch) next.prioritize = ["expand", "redirect"].includes(patch.prioritize) ? patch.prioritize : "";
  if ("address" in patch) next.address = text(patch.address, 300);
  if ("images" in patch) next.images = (Array.isArray(patch.images) ? patch.images : []).filter((i) => IMAGE_ID.test(i ?? "")).slice(0, 12);
  if ("form" in patch) next.form = { name: !!patch.form?.name, message: !!patch.form?.message, thanks: text(patch.form?.thanks, 120) };
  if ("rules" in patch) {
    next.rules = (Array.isArray(patch.rules) ? patch.rules : []).slice(0, 6).map((r) => ({
      type: r?.type === "device" ? "device" : "country",
      mode: ["show", "hide", "title"].includes(r?.mode) ? r.mode : "show",
      values: (Array.isArray(r?.values) ? r.values : []).map((v) => text(v, 10)).filter(Boolean).slice(0, 40),
      title: text(r?.title, 200)
    })).map((r) => ({ ...r, values: r.type === "device" ? r.values.filter((v) => ["mobile", "tablet", "desktop"].includes(v)) : r.values.map((v) => v.toUpperCase()).filter((v) => /^[A-Z]{2}$/.test(v)) }));
  }
  if ("lock" in patch) {
    const lock = { ...current.lock || {} };
    const l = patch.lock || {};
    if ("subscribe" in l) lock.subscribe = !!l.subscribe;
    if ("sensitive" in l) lock.sensitive = !!l.sensitive;
    if ("dob" in l) {
      if (l.dob) lock.dob = { minAge: Math.min(99, Math.max(13, Number(l.dob.minAge) || 18)) };
      else delete lock.dob;
    }
    for (const k of ["code", "password"]) {
      if (!(k in l)) continue;
      const value = text(l[k], k === "code" ? 100 : 200);
      if (value) lock[k] = await makeSecret(value);
      else delete lock[k];
    }
    next.lock = lock;
  }
  return next;
}
async function clearOtherPriorities(env, item) {
  const others = (await getItems(env, item.page_id)).filter((i) => i.id !== item.id && i.settings.prioritize);
  if (others.length) await env.DB.batch(others.map((o) => env.DB.prepare("UPDATE items SET settings=? WHERE id=?").bind(JSON.stringify({ ...o.settings, prioritize: "" }), o.id)));
}
function requireCheckAvailable(env, fields) {
  if (fields.protected && !turnstileConfigured(env)) {
    throw new HttpError(400, "Add the TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY secrets on Cloudflare to turn on the check.");
  }
}
function itemPatch(body) {
  const f = {};
  if ("title" in body) f.title = text(body.title, 200);
  if ("subtitle" in body) f.subtitle = text(body.subtitle, 300);
  if ("url" in body) f.url = normalizeUrl(body.url);
  if ("thumb_image" in body) f.thumb_image = IMAGE_ID.test(body.thumb_image ?? "") ? body.thumb_image : null;
  if ("icon" in body) f.icon = text(body.icon, 20) || "auto";
  if ("cta_label" in body) f.cta_label = text(body.cta_label, 40);
  if ("display" in body) f.display = ITEM_DISPLAYS.includes(body.display) ? body.display : "classic";
  for (const k of ["active", "pinned", "sold_out", "protected"]) if (k in body) f[k] = body[k] ? 1 : 0;
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
  ...items ? { items: items.map(cleanItem) } : {}
});
async function requirePage(env, id) {
  const page = await getPageById(env, Number(id));
  if (!page) throw new HttpError(404, "Page not found.");
  return page;
}
async function requireItem(env, id) {
  const item = parseItem(await env.DB.prepare("SELECT * FROM items WHERE id=?").bind(Number(id)).first());
  if (!item) throw new HttpError(404, "Item not found.");
  return item;
}
var themeImage = (theme) => theme?.bgImage || null;
async function handleApi(request, env, url) {
  const path = url.pathname.slice(4);
  const method = request.method;
  if (method !== "GET") {
    const origin = request.headers.get("Origin");
    if (origin && origin !== url.origin) throw new HttpError(403, "Request not allowed.");
    if (!(request.headers.get("Content-Type") || "").includes("application/json")) throw new HttpError(415, "Invalid request format.");
  }
  if (path === "/login" && method === "POST") return login(request, env);
  if (path === "/logout" && method === "POST") return json({ ok: true }, 200, { "Set-Cookie": sessionCookie(request, "", 0) });
  const session = await getSession(request, env);
  if (path === "/me") return json({ authenticated: !!session, passwordConfigured: passwordConfigured(env), ...session ? { turnstileConfigured: turnstileConfigured(env) } : {} });
  if (!session) throw new HttpError(401, "Sign in again to continue.");
  if (!can(session, "manage")) throw new HttpError(403, "You do not have permission to do this.");
  const body = method === "GET" || method === "DELETE" ? {} : await request.json().catch(() => {
    throw new HttpError(400, "Invalid data.");
  });
  let m;
  if (path === "/pages" && method === "GET") {
    const { results } = await env.DB.prepare("SELECT * FROM pages ORDER BY is_home DESC, id").all();
    return json({ pages: results.map((r) => publicPage(parsePage(r))) });
  }
  if (path === "/pages" && method === "POST") {
    const title = text(body.title, 120);
    if (!title) throw new HttpError(400, "Enter the brand name.");
    const slug = validSlug(body.slug);
    if (await slugTaken(env, slug)) throw new HttpError(409, "Another brand already uses this address.");
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
        if (!f.title) throw new HttpError(400, "The name cannot be empty.");
      }
      if ("bio" in body) f.bio = text(body.bio, 500);
      if ("seo_description" in body) f.seo_description = text(body.seo_description, 300);
      if ("published" in body) f.published = body.published ? 1 : 0;
      if ("avatar_image" in body) f.avatar_image = IMAGE_ID.test(body.avatar_image ?? "") ? body.avatar_image : null;
      if ("socials" in body) f.socials = JSON.stringify(normalizeSocials(body.socials));
      if ("slug" in body) {
        f.slug = validSlug(body.slug);
        if (await slugTaken(env, f.slug, page.id)) throw new HttpError(409, "Another brand already uses this address.");
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
      if (page.is_home) throw new HttpError(400, "This is the home page. Choose another brand as home first.");
      const items = await getItems(env, page.id);
      await env.DB.batch([
        env.DB.prepare("DELETE FROM items WHERE page_id=?").bind(page.id),
        env.DB.prepare("DELETE FROM stats_daily WHERE page_id=?").bind(page.id),
        env.DB.prepare("DELETE FROM stats_dim WHERE page_id=?").bind(page.id),
        env.DB.prepare("DELETE FROM visitors WHERE page_id=?").bind(page.id),
        env.DB.prepare("DELETE FROM contacts WHERE page_id=?").bind(page.id),
        env.DB.prepare("DELETE FROM pages WHERE id=?").bind(page.id)
      ]);
      const images = /* @__PURE__ */ new Set([page.avatar_image, themeImage(page.theme), themeImage(page.theme_draft), ...items.map((i) => i.thumb_image)]);
      for (const it of items) for (const img of it.settings.images || []) images.add(img);
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
    requireCheckAvailable(env, f);
    const top = await env.DB.prepare("SELECT MIN(position) AS p FROM items WHERE page_id=?").bind(page.id).first();
    const res = await env.DB.prepare("INSERT INTO items (page_id,kind,position,created_at) VALUES (?,?,?,?)").bind(page.id, kind, (top.p ?? 1) - 1, (/* @__PURE__ */ new Date()).toISOString()).run();
    if (body.settings) f.settings = JSON.stringify(await mergeSettings({}, body.settings));
    await updateRow(env, "items", res.meta.last_row_id, f);
    return json(cleanItem(await requireItem(env, res.meta.last_row_id)), 201);
  }
  if ((m = path.match(/^\/pages\/(\d+)\/order$/)) && method === "PUT") {
    const page = await requirePage(env, m[1]);
    const ids = Array.isArray(body.ids) ? body.ids.map(Number) : [];
    const current = new Set((await getItems(env, page.id)).map((i) => i.id));
    if (ids.length !== current.size || !ids.every((id) => current.has(id))) throw new HttpError(409, "The list changed. Reload the page and try again.");
    if (ids.length) await env.DB.prepare("UPDATE items SET position=(SELECT j.key FROM json_each(?1) j WHERE j.value=items.id) WHERE page_id=?2").bind(JSON.stringify(ids), page.id).run();
    return json({ ok: true });
  }
  if (m = path.match(/^\/items\/(\d+)$/)) {
    const item = await requireItem(env, m[1]);
    if (method === "PUT") {
      const f = itemPatch(body);
      requireCheckAvailable(env, f);
      const start = "starts_at" in f ? f.starts_at : item.starts_at;
      const end = "ends_at" in f ? f.ends_at : item.ends_at;
      if (start && end && Date.parse(end) <= Date.parse(start)) throw new HttpError(400, "The end date must be after the start date.");
      let settingsChanged = false;
      const before = item.settings.images || [];
      if (body.settings) {
        const merged = await mergeSettings(item.settings, body.settings);
        if (merged.prioritize && merged.prioritize !== item.settings.prioritize) await clearOtherPriorities(env, item);
        f.settings = JSON.stringify(merged);
        settingsChanged = true;
      }
      await updateRow(env, "items", item.id, f);
      if ("thumb_image" in f && f.thumb_image !== item.thumb_image) await removeImageIfUnused(env, item.thumb_image);
      if (settingsChanged) {
        for (const img of before) if (!JSON.parse(f.settings).images?.includes(img)) await removeImageIfUnused(env, img);
      }
      return json(cleanItem(await requireItem(env, item.id)));
    }
    if (method === "DELETE") {
      await env.DB.prepare("DELETE FROM items WHERE id=?").bind(item.id).run();
      await removeImageIfUnused(env, item.thumb_image);
      for (const img of item.settings.images || []) await removeImageIfUnused(env, img);
      return json({ ok: true });
    }
  }
  if ((m = path.match(/^\/items\/(\d+)\/duplicate$/)) && method === "POST") {
    const item = await requireItem(env, m[1]);
    await env.DB.prepare("UPDATE items SET position=position+1 WHERE page_id=? AND position>?").bind(item.page_id, item.position).run();
    const res = await env.DB.prepare(
      `INSERT INTO items (page_id,kind,title,subtitle,url,thumb_image,icon,position,active,pinned,sold_out,protected,display,settings,starts_at,ends_at,event_date,cta_label,created_at)
       VALUES (?,?,?,?,?,?,?,?,?,0,?,?,?,?,?,?,?,?,?)`
    ).bind(
      item.page_id,
      item.kind,
      `${item.title} (copy)`.slice(0, 200),
      item.subtitle,
      item.url,
      item.thumb_image,
      item.icon,
      item.position + 1,
      item.active,
      item.sold_out,
      item.protected,
      item.display,
      JSON.stringify({ ...item.settings, prioritize: "" }),
      item.starts_at,
      item.ends_at,
      item.event_date,
      item.cta_label,
      (/* @__PURE__ */ new Date()).toISOString()
    ).run();
    return json(cleanItem(await requireItem(env, res.meta.last_row_id)), 201);
  }
  if ((m = path.match(/^\/items\/(\d+)\/stats$/)) && method === "GET") {
    const item = await requireItem(env, m[1]);
    const day = dayIn(zoned(env));
    const from7 = new Date(Date.parse(`${day}T00:00:00Z`) - 6 * 864e5).toISOString().slice(0, 10);
    const [all, week, sources] = await env.DB.batch([
      env.DB.prepare("SELECT COALESCE(SUM(hits),0) AS n FROM stats_daily WHERE item_id=?").bind(item.id),
      env.DB.prepare("SELECT COALESCE(SUM(hits),0) AS n FROM stats_daily WHERE item_id=? AND day>=?").bind(item.id, from7),
      env.DB.prepare("SELECT key, SUM(hits) AS hits FROM stats_dim WHERE dim=? GROUP BY key ORDER BY hits DESC LIMIT 8").bind(`click:${item.id}`)
    ]);
    return json({ total: all.results[0].n, last7: week.results[0].n, sources: sources.results });
  }
  if ((m = path.match(/^\/pages\/(\d+)\/contacts$/)) && method === "GET") {
    const page = await requirePage(env, m[1]);
    const { results } = await env.DB.prepare("SELECT id,email,name,message,source,created_at FROM contacts WHERE page_id=? ORDER BY id DESC LIMIT 2000").bind(page.id).all();
    return json({ contacts: results });
  }
  if ((m = path.match(/^\/contacts\/(\d+)$/)) && method === "DELETE") {
    await env.DB.prepare("DELETE FROM contacts WHERE id=?").bind(Number(m[1])).run();
    return json({ ok: true });
  }
  if ((m = path.match(/^\/pages\/(\d+)\/protect-groups$/)) && method === "POST") {
    const page = await requirePage(env, m[1]);
    const value = body.protected ? 1 : 0;
    requireCheckAvailable(env, { protected: value });
    const res = await env.DB.prepare("UPDATE items SET protected=? WHERE page_id=? AND protected<>? AND (url LIKE 'https://chat.whatsapp.com/%' OR url LIKE 'https://whatsapp.com/channel/%' OR url LIKE 'https://www.whatsapp.com/channel/%')").bind(value, page.id, value).run();
    return json({ changed: res.meta.changes || 0 });
  }
  if ((m = path.match(/^\/pages\/(\d+)\/import$/)) && method === "POST") {
    const page = await requirePage(env, m[1]);
    const incoming = Array.isArray(body.items) ? body.items.slice(0, 400) : [];
    if (!incoming.length) throw new HttpError(400, "This file has no content to import.");
    const rows = [];
    let skipped = 0;
    for (const raw of incoming) {
      const kind = raw?.kind === "section" ? "section" : "link";
      let url2 = "";
      if (kind === "link") {
        try {
          url2 = normalizeUrl(raw.url);
        } catch {
          skipped += 1;
          continue;
        }
        if (!url2) {
          skipped += 1;
          continue;
        }
      }
      rows.push({ kind, title: text(raw.title, 200), subtitle: text(raw.subtitle, 300), url: url2, display: ITEM_DISPLAYS.includes(raw.display) ? raw.display : "classic", position: rows.length, image_url: raw.image_url || null });
    }
    const old = await getItems(env, page.id);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const statements = [];
    if (body.replace) statements.push(env.DB.prepare("DELETE FROM items WHERE page_id=?").bind(page.id));
    statements.push(env.DB.prepare(
      `INSERT INTO items (page_id,kind,title,subtitle,url,display,position,created_at)
       SELECT ?1, json_extract(value,'$.kind'), json_extract(value,'$.title'), json_extract(value,'$.subtitle'), json_extract(value,'$.url'), json_extract(value,'$.display'), json_extract(value,'$.position'), ?2 FROM json_each(?3)`
    ).bind(page.id, now, JSON.stringify(rows)));
    const p = body.profile || {};
    const f = {};
    if (p.title) f.title = text(p.title, 120);
    if ("bio" in p) f.bio = text(p.bio, 500);
    if (p.socials) f.socials = JSON.stringify(normalizeSocials(p.socials));
    if (body.theme) {
      f.theme = JSON.stringify(sanitizeTheme(body.theme));
      f.theme_draft = null;
    }
    const keys = Object.keys(f);
    if (keys.length) statements.push(env.DB.prepare(`UPDATE pages SET ${keys.map((k) => `${k}=?`).join(",")} WHERE id=?`).bind(...keys.map((k) => f[k]), page.id));
    await env.DB.batch(statements);
    if (body.replace) {
      const images2 = new Set(old.flatMap((i) => [i.thumb_image, ...i.settings.images || []]));
      let n = 0;
      for (const id of images2) {
        if (id && n < 20) {
          await removeImageIfUnused(env, id);
          n += 1;
        }
      }
    }
    const { results } = await env.DB.prepare("SELECT id, position FROM items WHERE page_id=? AND created_at=? ORDER BY position").bind(page.id, now).all();
    const images = results.map((r) => ({ id: r.id, image_url: rows[r.position]?.image_url })).filter((r) => r.image_url);
    return json({ created: results.length, skipped, images });
  }
  if (path === "/import/image" && method === "GET") {
    let source;
    try {
      source = new URL(url.searchParams.get("url") || "");
    } catch {
      throw new HttpError(400, "Invalid image address.");
    }
    if (source.protocol !== "https:" || source.hostname !== "ugc.production.linktr.ee") throw new HttpError(400, "Image source not allowed.");
    const res = await fetch(source.href, { redirect: "manual" }).catch((e) => {
      console.error("import image", e);
      return null;
    });
    const type = res?.headers.get("content-type") || "";
    if (!res?.ok || !type.startsWith("image/") || type.includes("svg")) {
      console.error("import image refused", res?.status, type);
      throw new HttpError(502, `Image unavailable (response ${res?.status ?? "none"}).`);
    }
    return new Response(res.body, { headers: { "Content-Type": type, "Cache-Control": "no-store", ...SECURITY_HEADERS } });
  }
  if (path === "/images" && method === "POST") {
    const mime = String(body.mime || "");
    const data = String(body.data || "");
    if (!["image/webp", "image/jpeg", "image/png"].includes(mime)) throw new HttpError(400, "Unsupported format. Use JPG, PNG or WebP.");
    if (!data || !/^[A-Za-z0-9+/]+=*$/.test(data)) throw new HttpError(400, "The image is not valid.");
    if (data.length > 15e5) throw new HttpError(413, "The image is still too large after compression. Try a lighter one.");
    const id = crypto.randomUUID();
    await env.DB.prepare("INSERT INTO images (id,mime,data,created_at) VALUES (?,?,?,?)").bind(id, mime, data, (/* @__PURE__ */ new Date()).toISOString()).run();
    return json({ id }, 201);
  }
  if (path === "/stats" && method === "GET") return json(await statsReport(env, url));
  throw new HttpError(404, "Not found.");
}
async function servePublicPage(request, env, ctx, page, url) {
  const session = await getSession(request, env);
  const countable = !session && request.method === "GET" && isCountable(request);
  const visitor = visitorOf(request);
  const items = await getItems(env, page.id);
  if (countable) ctx.waitUntil(recordView(request, env, page.id).catch((e) => console.error("stats", e)));
  if (!session) {
    const target = applyRules(items, visitor).find((i) => i.settings.prioritize === "redirect" && i.url && !i.sold_out && isVisible(i));
    if (target) {
      if (needsGate(target)) return Response.redirect(`${url.origin}/verify/${target.id}`, 302);
      if (countable) ctx.waitUntil(recordClick(request, env, target).catch((e) => console.error("stats", e)));
      return new Response(null, { status: 302, headers: { Location: target.url, "Cache-Control": "no-store" } });
    }
  }
  const body = renderPage(page, items, {
    timeZone: zoned(env),
    origin: url.origin,
    visitor,
    sent: Number(url.searchParams.get("sent")) || null,
    formError: Number(url.searchParams.get("formerror")) || null
  });
  return html(request.method === "HEAD" ? null : body);
}
async function route(request, env, ctx) {
  const url = new URL(request.url);
  const { pathname } = url;
  const isRead = request.method === "GET" || request.method === "HEAD";
  if (pathname.startsWith("/api/")) return handleApi(request, env, url);
  const verify = pathname.match(/^\/verify\/(\d+)$/);
  if (verify && (isRead || request.method === "POST")) return serveVerify(request, env, ctx, url, Number(verify[1]));
  const formRoute = pathname.match(/^\/form\/(\d+)$/);
  if (formRoute && request.method === "POST") return serveForm(request, env, url, Number(formRoute[1]));
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
    const item = parseItem(await env.DB.prepare("SELECT i.*, p.slug, p.published, p.is_home FROM items i JOIN pages p ON p.id=i.page_id WHERE i.id=?").bind(Number(m[1])).first());
    if (!item) return Response.redirect(`${url.origin}/`, 302);
    if (!item.url || item.sold_out || !isVisible(item) || !item.published) {
      return Response.redirect(`${url.origin}/${item.is_home ? "" : item.slug}`, 302);
    }
    if (needsGate(item)) return Response.redirect(`${url.origin}/verify/${item.id}`, 302);
    if (isCountable(request) && !await getSession(request, env)) {
      ctx.waitUntil(recordClick(request, env, item).catch((e) => console.error("stats", e)));
    }
    return new Response(null, { status: 302, headers: { Location: item.url, "Cache-Control": "no-store", "Referrer-Policy": "origin" } });
  }
  if (pathname === "/robots.txt") return new Response("User-agent: *\nDisallow: /admin\nDisallow: /api/\nDisallow: /go/\nDisallow: /verify/\n", { headers: { "Content-Type": "text/plain" } });
  if (pathname === "/" || pathname === "") {
    const page = parsePage(await env.DB.prepare("SELECT * FROM pages WHERE is_home=1 AND published=1 LIMIT 1").first());
    return page ? servePublicPage(request, env, ctx, page, url) : html(renderNotFound(), 404);
  }
  if (m = pathname.match(/^\/([a-zA-Z0-9-]+)\/?$/)) {
    const page = parsePage(await env.DB.prepare("SELECT * FROM pages WHERE slug=? AND published=1").bind(m[1].toLowerCase()).first());
    if (page) return servePublicPage(request, env, ctx, page, url);
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
      if (new URL(request.url).pathname.startsWith("/api/")) return json({ error: "Something went wrong. Please try again shortly." }, 500);
      return html(renderNotFound(), 500);
    }
  }
};

// scripts/single-entry.js
var STATIC = {
  "/static/admin.js": ['// public/static/theme.js\nvar FONTS = {\n  system: { name: "System (no Google Fonts)", q: null, stack: "system-ui,-apple-system,\'Segoe UI\',Roboto,sans-serif" },\n  inter: { name: "Inter", q: "Inter:wght@400;600;800", stack: "\'Inter\',system-ui,sans-serif" },\n  poppins: { name: "Poppins", q: "Poppins:wght@400;600;800", stack: "\'Poppins\',system-ui,sans-serif" },\n  montserrat: { name: "Montserrat", q: "Montserrat:wght@400;600;800", stack: "\'Montserrat\',system-ui,sans-serif" },\n  rubik: { name: "Rubik", q: "Rubik:wght@400;600;800", stack: "\'Rubik\',system-ui,sans-serif" },\n  dmsans: { name: "DM Sans", q: "DM+Sans:wght@400;600;800", stack: "\'DM Sans\',system-ui,sans-serif" },\n  syne: { name: "Syne", q: "Syne:wght@400;600;800", stack: "\'Syne\',system-ui,sans-serif" },\n  unbounded: { name: "Unbounded", q: "Unbounded:wght@400;600;800", stack: "\'Unbounded\',system-ui,sans-serif" },\n  archivo: { name: "Archivo Black", q: "Archivo+Black", stack: "\'Archivo Black\',Impact,sans-serif" },\n  anton: { name: "Anton", q: "Anton", stack: "\'Anton\',Impact,sans-serif" },\n  bebas: { name: "Bebas Neue", q: "Bebas+Neue", stack: "\'Bebas Neue\',Impact,sans-serif" },\n  oswald: { name: "Oswald", q: "Oswald:wght@400;600", stack: "\'Oswald\',Impact,sans-serif" },\n  playfair: { name: "Playfair Display", q: "Playfair+Display:wght@400;700", stack: "\'Playfair Display\',Georgia,serif" },\n  caveat: { name: "Caveat", q: "Caveat:wght@500;700", stack: "\'Caveat\',cursive" },\n  raleway: { name: "Raleway", q: "Raleway:wght@400;600;800", stack: "\'Raleway\',system-ui,sans-serif" },\n  lato: { name: "Lato", q: "Lato:wght@400;700;900", stack: "\'Lato\',system-ui,sans-serif" },\n  nunito: { name: "Nunito", q: "Nunito:wght@400;700;800", stack: "\'Nunito\',system-ui,sans-serif" },\n  sora: { name: "Sora", q: "Sora:wght@400;600;800", stack: "\'Sora\',system-ui,sans-serif" },\n  outfit: { name: "Outfit", q: "Outfit:wght@400;600;800", stack: "\'Outfit\',system-ui,sans-serif" },\n  barlow: { name: "Barlow Condensed", q: "Barlow+Condensed:wght@500;700", stack: "\'Barlow Condensed\',Impact,sans-serif" },\n  righteous: { name: "Righteous", q: "Righteous", stack: "\'Righteous\',Impact,sans-serif" },\n  bangers: { name: "Bangers", q: "Bangers", stack: "\'Bangers\',Impact,sans-serif" },\n  abril: { name: "Abril Fatface", q: "Abril+Fatface", stack: "\'Abril Fatface\',Georgia,serif" },\n  pacifico: { name: "Pacifico", q: "Pacifico", stack: "\'Pacifico\',cursive" },\n  marker: { name: "Permanent Marker", q: "Permanent+Marker", stack: "\'Permanent Marker\',cursive" }\n};\nvar DEFAULT_THEME = {\n  bgType: "solid",\n  // solid | gradient | pattern | image | blur | video\n  bgColor3: "#c98bf5",\n  btnHeight: 60,\n  thumbCircle: false,\n  gradientType: "linear",\n  bgPattern: "dots",\n  bgVideo: "",\n  noise: false,\n  titleColor: null,\n  btnShadowType: "soft",\n  btnShadowColor: "#000000",\n  stickers: [],\n  bgColor: "#0b0d17",\n  bgColor2: "#2a0d16",\n  gradientAngle: 180,\n  bgImage: null,\n  bgOverlay: 40,\n  textColor: "#ffffff",\n  font: "inter",\n  titleFont: "inter",\n  titleSize: 26,\n  titleUppercase: false,\n  avatarShape: "circle",\n  // circle | rounded | square | none\n  avatarSize: 96,\n  socialPosition: "top",\n  // top | bottom\n  btnStyle: "glow",\n  // fill | outline | glow | glass | hard\n  btnColor: "#0f1120",\n  btnTextColor: "#ffffff",\n  btnAccent: "#e5322d",\n  btnRadius: 28,\n  btnUppercase: true,\n  btnGap: 12,\n  btnFontSize: 14,\n  btnBorder: 2,\n  btnShadow: 14\n};\nvar RAW_PRESETS = [\n  { id: "aurora", name: "Aurora", theme: { ...DEFAULT_THEME, bgType: "aurora", bgColor: "#07062a", bgColor2: "#2b2185", bgColor3: "#c98bf5", textColor: "#ffffff", font: "poppins", titleSize: 34, btnStyle: "glass", btnColor: "#ffffff", btnTextColor: "#ffffff", btnAccent: "#ffffff", btnRadius: 40, btnBorder: 1, btnShadowType: "soft", btnShadow: 12, btnShadowColor: "#9c87c0", btnUppercase: false, btnFontSize: 15, btnHeight: 78, thumbCircle: true, avatarShape: "square", avatarSize: 150 } },\n  { id: "f3dez", name: "F3DEZ Neon", theme: { ...DEFAULT_THEME } },\n  { id: "club", name: "Violet Club", theme: { ...DEFAULT_THEME, bgType: "gradient", bgColor: "#160b33", bgColor2: "#5b1a8c", gradientAngle: 160, btnStyle: "glass", btnColor: "#ffffff", btnAccent: "#ffffff", font: "syne", btnRadius: 16, btnUppercase: false } },\n  { id: "tramonto", name: "Sunset", theme: { ...DEFAULT_THEME, bgType: "gradient", bgColor: "#ff5e3a", bgColor2: "#ffb347", gradientAngle: 200, textColor: "#2b0f05", btnStyle: "fill", btnColor: "#2b0f05", btnTextColor: "#fff4e6", btnAccent: "#2b0f05", font: "poppins", btnRadius: 40, btnUppercase: false } },\n  { id: "mare", name: "Ocean", theme: { ...DEFAULT_THEME, bgColor: "#e8f6fb", textColor: "#06364a", btnStyle: "fill", btnColor: "#0a7ea4", btnTextColor: "#ffffff", btnAccent: "#0a7ea4", font: "rubik", btnRadius: 14, btnUppercase: false } },\n  { id: "poster", name: "Poster", theme: { ...DEFAULT_THEME, bgColor: "#ffe600", textColor: "#111111", btnStyle: "hard", btnColor: "#ffffff", btnTextColor: "#111111", btnAccent: "#111111", font: "anton", btnRadius: 0, btnFontSize: 17, titleSize: 34, avatarShape: "square" } },\n  { id: "festival", name: "Festival", theme: { ...DEFAULT_THEME, bgType: "gradient", gradientType: "radial", bgColor: "#ff2d78", bgColor2: "#2a0a4a", textColor: "#ffffff", btnStyle: "fill", btnColor: "#ffe14d", btnTextColor: "#20053a", btnAccent: "#ffe14d", font: "righteous", btnRadius: 18 } },\n  { id: "erasmus", name: "Erasmus", theme: { ...DEFAULT_THEME, bgColor: "#123a9c", textColor: "#ffffff", btnStyle: "fill", btnColor: "#ffcf33", btnTextColor: "#10245e", btnAccent: "#ffcf33", font: "outfit", btnRadius: 14, btnUppercase: false } },\n  { id: "cyber", name: "Cyber", theme: { ...DEFAULT_THEME, bgType: "pattern", bgPattern: "grid", bgColor: "#05060f", bgColor2: "#1fe0ff", textColor: "#d8fbff", btnStyle: "glow", btnColor: "#07101f", btnTextColor: "#d8fbff", btnAccent: "#1fe0ff", font: "unbounded", btnRadius: 6 } },\n  { id: "spiaggia", name: "Beach", theme: { ...DEFAULT_THEME, bgType: "gradient", bgColor: "#7fe7dc", bgColor2: "#2a7fd6", gradientAngle: 180, textColor: "#06283f", btnStyle: "glass", btnColor: "#ffffff", btnTextColor: "#06283f", btnAccent: "#ffffff", font: "nunito", btnRadius: 40, btnUppercase: false } },\n  { id: "rave", name: "Rave", theme: { ...DEFAULT_THEME, bgColor: "#101010", textColor: "#c8ff2e", btnStyle: "outline", btnColor: "#101010", btnTextColor: "#c8ff2e", btnAccent: "#c8ff2e", font: "bangers", btnRadius: 0, btnFontSize: 18, titleSize: 36 } },\n  { id: "gala", name: "Gala", theme: { ...DEFAULT_THEME, bgColor: "#14100a", textColor: "#f3e3bd", btnStyle: "outline", btnColor: "#14100a", btnTextColor: "#f3e3bd", btnAccent: "#c9a24a", font: "playfair", btnRadius: 2, btnUppercase: false } },\n  { id: "caramella", name: "Candy", theme: { ...DEFAULT_THEME, bgType: "pattern", bgPattern: "dots", bgColor: "#ffd6e8", bgColor2: "#ff8fbf", textColor: "#5a0f35", btnStyle: "hard", btnColor: "#ffffff", btnTextColor: "#5a0f35", btnAccent: "#5a0f35", font: "poppins", btnRadius: 16, btnUppercase: false } },\n  { id: "montagna", name: "Mountain", theme: { ...DEFAULT_THEME, bgColor: "#e7eef2", textColor: "#16323f", btnStyle: "fill", btnColor: "#16323f", btnTextColor: "#ffffff", btnAccent: "#16323f", font: "barlow", btnRadius: 8, btnFontSize: 17 } },\n  { id: "pulito", name: "Clean", theme: { ...DEFAULT_THEME, bgColor: "#ffffff", textColor: "#17171c", btnStyle: "outline", btnColor: "#ffffff", btnTextColor: "#17171c", btnAccent: "#17171c", font: "dmsans", btnRadius: 10, btnUppercase: false } }\n];\nvar PRESETS = RAW_PRESETS.map((p) => ({ ...p, theme: { ...p.theme, titleFont: p.theme.font } }));\nvar COLOR_KEYS = ["bgColor", "bgColor2", "textColor", "btnColor", "btnTextColor", "btnAccent", "btnShadowColor", "bgColor3"];\nvar ENUMS = {\n  bgType: ["solid", "gradient", "aurora", "pattern", "image", "blur", "video"],\n  gradientType: ["linear", "radial"],\n  bgPattern: ["dots", "grid", "stripes", "checks"],\n  btnShadowType: ["none", "soft", "strong", "hard"],\n  avatarShape: ["circle", "rounded", "square", "none"],\n  socialPosition: ["top", "bottom"],\n  btnStyle: ["fill", "outline", "glow", "glass", "hard"]\n};\nvar RANGES = {\n  gradientAngle: [0, 360],\n  bgOverlay: [0, 85],\n  titleSize: [18, 48],\n  avatarSize: [56, 160],\n  btnRadius: [0, 40],\n  btnGap: [4, 28],\n  btnFontSize: [12, 22],\n  btnBorder: [0, 6],\n  btnShadow: [0, 30],\n  btnHeight: [48, 100]\n};\nvar IMAGE_ID = /^[a-f0-9-]{36}$/;\nfunction sanitizeTheme(input) {\n  const t = { ...DEFAULT_THEME };\n  const src = input && typeof input === "object" ? input : {};\n  for (const k of COLOR_KEYS) if (/^#[0-9a-fA-F]{6}$/.test(src[k] ?? "")) t[k] = src[k].toLowerCase();\n  for (const k in ENUMS) if (ENUMS[k].includes(src[k])) t[k] = src[k];\n  for (const k in RANGES) {\n    const n = Number(src[k]);\n    if (src[k] !== void 0 && src[k] !== null && src[k] !== "" && Number.isFinite(n)) {\n      t[k] = Math.min(RANGES[k][1], Math.max(RANGES[k][0], Math.round(n)));\n    }\n  }\n  if (FONTS[src.font]) t.font = src.font;\n  if (FONTS[src.titleFont]) t.titleFont = src.titleFont;\n  else if (FONTS[src.font]) t.titleFont = src.font;\n  t.titleUppercase = !!src.titleUppercase;\n  t.btnUppercase = src.btnUppercase === void 0 ? t.btnUppercase : !!src.btnUppercase;\n  t.bgImage = IMAGE_ID.test(src.bgImage ?? "") ? src.bgImage : null;\n  if ((t.bgType === "image" || t.bgType === "blur") && !t.bgImage) t.bgType = "solid";\n  t.noise = !!src.noise;\n  t.thumbCircle = !!src.thumbCircle;\n  t.titleColor = /^#[0-9a-fA-F]{6}$/.test(src.titleColor ?? "") ? src.titleColor.toLowerCase() : null;\n  t.bgVideo = /^https:\\/\\/[^\\s"\'<>()]+$/.test(src.bgVideo ?? "") ? src.bgVideo.slice(0, 500) : "";\n  if (t.bgType === "video" && !t.bgVideo) t.bgType = "solid";\n  const num = (v, min, max, d) => {\n    const n = Number(v);\n    return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : d;\n  };\n  t.stickers = (Array.isArray(src.stickers) ? src.stickers : []).slice(0, 12).map((k) => ({\n    image: IMAGE_ID.test(k?.image ?? "") ? k.image : null,\n    emoji: String(k?.emoji ?? "").replace(/[<>&"\']/g, "").slice(0, 16),\n    x: num(k?.x, 0, 100, 10),\n    y: num(k?.y, 0, 100, 10),\n    size: num(k?.size, 20, 220, 64),\n    rot: num(k?.rot, -180, 180, 0)\n  })).filter((k) => k.image || k.emoji);\n  return t;\n}\nfunction fontHref(theme) {\n  const keys = [.../* @__PURE__ */ new Set([theme.font, theme.titleFont])].filter((k) => FONTS[k]?.q);\n  if (!keys.length) return "data:text/css,";\n  const families = keys.map((k) => `family=${FONTS[k].q}`).join("&");\n  return `https://fonts.googleapis.com/css2?${families}&display=swap`;\n}\nfunction contrastOn(hex) {\n  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);\n  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? "#111111" : "#ffffff";\n}\nfunction buttonCss(t) {\n  const a = t.btnAccent;\n  const w = t.btnBorder;\n  const n = t.btnShadow;\n  const c = t.btnShadowColor;\n  const shadow = {\n    none: "",\n    soft: n ? `box-shadow:0 ${Math.round(n / 3)}px ${n}px ${c}55;` : "",\n    strong: n ? `box-shadow:0 ${Math.round(n / 2)}px ${Math.round(n * 1.4)}px ${c}aa;` : "",\n    hard: n ? `box-shadow:${Math.max(2, Math.round(n / 3))}px ${Math.max(2, Math.round(n / 3))}px 0 ${c};` : ""\n  }[t.btnShadowType];\n  switch (t.btnStyle) {\n    case "outline":\n      return `background:transparent;color:${t.btnTextColor};border:${Math.max(1, w)}px solid ${a};${shadow}`;\n    case "glow":\n      return `background:${t.btnColor};color:${t.btnTextColor};border:${w}px solid ${a};box-shadow:0 ${Math.round(n / 4)}px ${n}px ${a}99;`;\n    case "glass":\n      return `background:${t.btnColor}26;color:${t.btnTextColor};border:${w}px solid ${a}55;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);${shadow}`;\n    case "hard":\n      return `background:${t.btnColor};color:${t.btnTextColor};border:${Math.max(1, w)}px solid ${a};box-shadow:${Math.round(n / 3)}px ${Math.round(n / 3)}px 0 ${a};`;\n    default:\n      return `background:${t.btnColor};color:${t.btnTextColor};border:${w}px solid ${a};${shadow}`;\n  }\n}\nvar NOISE = `url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'2\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.55\'/%3E%3C/svg%3E")`;\nfunction patternCss(t) {\n  const c = `${t.bgColor2}66`;\n  return {\n    dots: `background-image:radial-gradient(${c} 2.4px,transparent 2.6px);background-size:22px 22px`,\n    grid: `background-image:linear-gradient(${c} 1px,transparent 1px),linear-gradient(90deg,${c} 1px,transparent 1px);background-size:28px 28px`,\n    stripes: `background-image:repeating-linear-gradient(45deg,${c} 0 6px,transparent 6px 22px)`,\n    checks: `background-image:conic-gradient(${c} 25%,transparent 0 50%,${c} 0 75%,transparent 0);background-size:44px 44px`\n  }[t.bgPattern];\n}\nfunction themeCss(input) {\n  const t = sanitizeTheme(input);\n  const font = (FONTS[t.font] || FONTS.inter).stack;\n  const titleFont = (FONTS[t.titleFont] || FONTS.inter).stack;\n  let layers = "";\n  if (t.bgType === "gradient") {\n    const g = t.gradientType === "radial" ? `radial-gradient(circle at 50% 30%,${t.bgColor},${t.bgColor2})` : `linear-gradient(${t.gradientAngle}deg,${t.bgColor},${t.bgColor2})`;\n    layers = `body::before{content:"";position:fixed;inset:0;z-index:-2;background:${g}}`;\n  } else if (t.bgType === "aurora") {\n    layers = `body::before{content:"";position:fixed;inset:-30%;z-index:-2;background:radial-gradient(38% 30% at 62% 46%,${t.bgColor3}cc,transparent 72%),radial-gradient(60% 46% at 34% 56%,${t.bgColor2},transparent 74%),radial-gradient(52% 40% at 72% 78%,${t.bgColor2}dd,transparent 72%),${t.bgColor};animation:aurora 22s ease-in-out infinite alternate}@keyframes aurora{0%{transform:translate3d(-5%,-3%,0) rotate(0)}50%{transform:translate3d(5%,4%,0) rotate(6deg)}100%{transform:translate3d(-2%,6%,0) rotate(-6deg)}}@media (prefers-reduced-motion:reduce){body::before{animation:none}}`;\n  } else if (t.bgType === "pattern") {\n    layers = `body::before{content:"";position:fixed;inset:0;z-index:-2;${patternCss(t)}}`;\n  } else if (t.bgType === "blur" && t.bgImage) {\n    layers = `body::before{content:"";position:fixed;inset:-40px;z-index:-2;background:${t.bgColor} url(/img/${t.bgImage}) center/cover no-repeat;filter:blur(22px)}body::after{content:"";position:fixed;inset:0;z-index:-1;background:#000;opacity:${t.bgOverlay / 100}}`;\n  } else if (t.bgType === "video") {\n    layers = `body::after{content:"";position:fixed;inset:0;z-index:-1;background:#000;opacity:${t.bgOverlay / 100}}`;\n  } else if (t.bgType === "image" && t.bgImage) {\n    layers = `body::before{content:"";position:fixed;inset:0;z-index:-2;background:${t.bgColor} url(/img/${t.bgImage}) center/cover no-repeat}body::after{content:"";position:fixed;inset:0;z-index:-1;background:#000;opacity:${t.bgOverlay / 100}}`;\n  }\n  const thumb = Math.round(t.btnHeight * 0.74);\n  const avatarRadius = { circle: "50%", rounded: "22%", square: "0", none: "0" }[t.avatarShape];\n  return `:root{--accent:${t.btnAccent}}${t.noise ? `html::after{content:"";position:fixed;inset:0;z-index:5;pointer-events:none;opacity:.14;background-image:${NOISE}}` : ""}html{background:${t.bgColor}}body{color:${t.textColor};font-family:${font}}${layers}.avatar{width:${t.avatarSize}px;height:${t.avatarSize}px;border-radius:${avatarRadius};${t.avatarShape === "none" ? "display:none;" : ""}}h1{font-family:${titleFont};font-size:${t.titleSize}px;${t.titleColor ? `color:${t.titleColor};` : ""}${t.titleUppercase ? "text-transform:uppercase;" : ""}}.socials{order:${t.socialPosition === "bottom" ? 4 : 2}}.links,.link-grid,.link-carousel{gap:${t.btnGap}px}.btn,.event{${buttonCss(t)}border-radius:${t.btnRadius}px;font-size:${t.btnFontSize}px;${t.btnUppercase ? "text-transform:uppercase;" : ""}}.tile,.event{border-radius:${Math.min(t.btnRadius, 24)}px}.thumb{border-radius:${t.thumbCircle ? "50%" : `${Math.max(0, t.btnRadius - 6)}px`};width:${thumb}px;height:${thumb}px;left:${Math.round((t.btnHeight - thumb) / 2 - 2)}px}.btn:not(.tile){min-height:${t.btnHeight}px;padding-inline:${thumb + 16}px}.cta,.badge{background:${t.btnAccent};color:${contrastOn(t.btnAccent)};border-radius:${Math.max(6, t.btnRadius - 8)}px}`;\n}\n\n// public/static/icons.js\nvar ICONS = {\n  "instagram": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"></path></svg>\',\n  "tiktok": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>\',\n  "facebook": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"></path></svg>\',\n  "whatsapp": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>\',\n  "youtube": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>\',\n  "x": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"></path></svg>\',\n  "telegram": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path></svg>\',\n  "spotify": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path></svg>\',\n  "snapchat": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"></path></svg>\',\n  "linkedin": \'<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>\',\n  "website": \'<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>\',\n  "email": \'<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>\'\n};\n\n// public/static/visibility.js\nvar EVENT_GRACE_MS = 12 * 60 * 60 * 1e3;\nfunction effectiveEnd(item) {\n  if (item.ends_at) return Date.parse(item.ends_at);\n  if (item.kind === "event" && item.event_date) return Date.parse(item.event_date) + EVENT_GRACE_MS;\n  return null;\n}\nfunction itemStatus(item, now = Date.now()) {\n  if (!item.active) return "off";\n  if (item.starts_at && Date.parse(item.starts_at) > now) return "scheduled";\n  const end = effectiveEnd(item);\n  if (end !== null && end <= now) return "expired";\n  const needsUrl = item.kind === "link" || item.kind === "event" || item.kind === "embed" && !item.settings?.address;\n  if (needsUrl && !item.url && !item.sold_out) return "no-url";\n  return "live";\n}\n\n// public/static/admin.js\nfunction h(tag, props = {}, ...kids) {\n  const el = document.createElement(tag);\n  for (const [k, v] of Object.entries(props || {})) {\n    if (v === null || v === void 0 || v === false) continue;\n    if (k === "class") el.className = v;\n    else if (k === "html") el.innerHTML = v;\n    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);\n    else if (k === "value" || k === "checked" || k === "disabled" || k === "hidden" || k === "open") el[k] = v;\n    else el.setAttribute(k, v === true ? "" : v);\n  }\n  el.append(...kids.flat().filter((c) => c !== null && c !== void 0 && c !== false));\n  return el;\n}\nvar svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;\nvar UI = {\n  star: \'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.5 7.1.7-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.7z"/></svg>\',\n  links: svg(\'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>\'),\n  brush: svg(\'<path d="M18.4 2.6a2 2 0 0 1 3 3L12 15l-4-4z"/><path d="M7 14c-2 0-3 1.5-3 3 0 1.5-1 2.5-2 3 1 .7 3 1 5 1 2.5 0 4-1.5 4-3.5 0-2-1.8-3.5-4-3.5z"/>\'),\n  chart: svg(\'<path d="M3 3v18h18"/><path d="M7 15l4-5 4 3 5-7"/>\'),\n  gear: svg(\'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3.1 14H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.1a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>\'),\n  plus: svg(\'<path d="M12 5v14M5 12h14"/>\'),\n  grip: svg(\'<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>\'),\n  copy: svg(\'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>\'),\n  open: svg(\'<path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/>\'),\n  trash: svg(\'<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>\'),\n  image: svg(\'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>\'),\n  logout: svg(\'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>\'),\n  phone: svg(\'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>\'),\n  close: svg(\'<path d="M18 6L6 18M6 6l12 12"/>\'),\n  calendar: svg(\'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>\'),\n  section: svg(\'<path d="M4 6h16M4 12h10M4 18h7"/>\'),\n  people: svg(\'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>\'),\n  play: svg(\'<polygon points="6 3 20 12 6 21 6 3"/>\'),\n  pin: svg(\'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>\'),\n  form: svg(\'<path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/>\')\n};\nvar raw = (markup) => {\n  const s = document.createElement("span");\n  s.style.display = "contents";\n  s.innerHTML = markup;\n  return s;\n};\nvar $ = (sel, root = document) => root.querySelector(sel);\nfunction toast(message, kind = "") {\n  const el = h("div", { class: `toast ${kind}`, role: kind === "error" ? "alert" : "status" }, message);\n  $("#toasts").append(el);\n  setTimeout(() => el.remove(), kind === "error" ? 6e3 : 2600);\n}\nvar store = {\n  get(k) {\n    try {\n      return localStorage.getItem(k);\n    } catch {\n      return null;\n    }\n  },\n  set(k, v) {\n    try {\n      localStorage.setItem(k, v);\n    } catch {\n    }\n  }\n};\nasync function copyText(value) {\n  try {\n    await navigator.clipboard.writeText(value);\n    toast("Link copied");\n  } catch {\n    toast(`Copy it manually: ${value}`);\n  }\n}\nasync function api(path, method = "GET", body) {\n  let res;\n  try {\n    res = await fetch(`/api${path}`, {\n      method,\n      headers: method === "GET" ? {} : { "Content-Type": "application/json" },\n      body: body === void 0 ? void 0 : JSON.stringify(body)\n    });\n  } catch {\n    throw new Error("No connection. Check your internet and try again.");\n  }\n  const data = await res.json().catch(() => ({}));\n  if (res.status === 401 && path !== "/login") {\n    S.authenticated = false;\n    showLogin("Your session expired. Please sign in again.");\n    throw new Error("Session expired.");\n  }\n  if (!res.ok) {\n    const e = new Error(data.error || "Something went wrong. Please try again.");\n    e.code = data.code;\n    throw e;\n  }\n  return data;\n}\nvar S = { turnstile: false, pages: [], page: null, tab: "content", expanded: /* @__PURE__ */ new Set(), clicks: {}, bgMode: null, stats: null, statsQ: null, authenticated: false };\nvar pending = /* @__PURE__ */ new Map();\nfunction schedule(key, fn, ms = 650) {\n  clearTimeout(pending.get(key)?.timer);\n  setSaveState("pending");\n  pending.set(key, { fn, timer: setTimeout(() => runPending(key), ms) });\n}\nasync function runPending(key) {\n  const job = pending.get(key);\n  if (!job) return;\n  clearTimeout(job.timer);\n  pending.delete(key);\n  await job.fn();\n}\nvar flushAll = () => Promise.all([...pending.keys()].map(runPending));\nwindow.addEventListener("beforeunload", (e) => {\n  if (pending.size) {\n    flushAll();\n    e.preventDefault();\n  }\n});\nvar inFlight = 0;\nfunction setSaveState(state, message) {\n  const el = $("#save-state");\n  if (!el) return;\n  el.className = `save-state ${state === "error" ? "error" : ""}`;\n  el.textContent = { pending: "Editing…", saving: "Saving…", saved: "All changes saved", error: message || "Not saved" }[state] || "";\n}\nasync function saving(fn) {\n  inFlight += 1;\n  setSaveState("saving");\n  try {\n    const out = await fn();\n    inFlight -= 1;\n    if (!inFlight && !pending.size) setSaveState("saved");\n    return out;\n  } catch (e) {\n    inFlight -= 1;\n    setSaveState("error", "Not saved");\n    toast(e.message, "error");\n    throw e;\n  }\n}\nvar app = () => $("#app");\nfunction showLogin(notice) {\n  let error = notice || "";\n  const errorEl = h("p", { class: "form-error", hidden: !error, role: "alert" }, error);\n  const pwd = h("input", { type: "password", id: "login-password", autocomplete: "current-password", required: true });\n  const submit = h("button", { class: "btn primary", type: "submit" }, "Sign in");\n  const form = h(\n    "form",\n    {\n      class: "login",\n      onsubmit: async (e) => {\n        e.preventDefault();\n        submit.disabled = true;\n        submit.textContent = "Signing in…";\n        errorEl.hidden = true;\n        try {\n          await api("/login", "POST", { password: pwd.value });\n          await startApp();\n        } catch (err) {\n          errorEl.textContent = err.message;\n          errorEl.hidden = false;\n          submit.disabled = false;\n          submit.textContent = "Sign in";\n          pwd.select();\n        }\n      }\n    },\n    h("div", { class: "wordmark" }, raw(UI.star), h("span", {}, "ESL Links")),\n    h("p", { class: "hint" }, "Manage the link pages of all your brands."),\n    h("div", { class: "field" }, h("label", { for: "login-password" }, "Password"), pwd),\n    errorEl,\n    submit\n  );\n  app().replaceChildren(h("div", { class: "center-screen" }, form));\n  pwd.focus();\n}\nasync function startApp() {\n  app().replaceChildren(h("div", { class: "center-screen" }, h("div", { class: "loading" }, "Loading…")));\n  S.authenticated = true;\n  const [{ pages }, me] = await Promise.all([api("/pages"), api("/me")]);\n  S.turnstile = !!me.turnstileConfigured;\n  S.pages = pages;\n  const saved = Number(store.get("page"));\n  const start = pages.find((p) => p.id === saved) || pages[0];\n  renderShell();\n  await selectPage(start.id);\n}\nasync function boot() {\n  try {\n    const me = await api("/me");\n    if (me.authenticated) await startApp();\n    else showLogin(me.passwordConfigured ? "" : "The password is missing or too short. Set the ADMIN_PASSWORD secret on Cloudflare with at least 10 characters.");\n  } catch (e) {\n    app().replaceChildren(h("div", { class: "center-screen" }, h(\n      "div",\n      { class: "login" },\n      h("p", { class: "form-error" }, e.message),\n      h("button", { class: "btn primary", onclick: boot }, "Try again")\n    )));\n  }\n}\nvar TABS = [\n  { id: "content", label: "Content", icon: UI.links, wide: false },\n  { id: "design", label: "Design", icon: UI.brush, wide: false },\n  { id: "stats", label: "Analytics", icon: UI.chart, wide: true },\n  { id: "contacts", label: "Contacts", icon: UI.people, wide: true },\n  { id: "settings", label: "Settings", icon: UI.gear, wide: false }\n];\nfunction renderShell() {\n  const select = h("select", { id: "brand-select", "aria-label": "Brand", onchange: (e) => selectPage(Number(e.target.value)) });\n  const nav = h("nav", { class: "nav", "aria-label": "Sections" }, TABS.map((t) => h("button", { type: "button", "data-tab": t.id, onclick: () => setTab(t.id) }, raw(t.icon), h("span", {}, t.label))));\n  const shell = h(\n    "div",\n    { class: "shell" },\n    h(\n      "aside",\n      { class: "rail" },\n      h("div", { class: "wordmark" }, raw(UI.star), h("span", {}, "ESL Links")),\n      h("div", { class: "brand-switch" }, h("label", { for: "brand-select" }, "Brand"), select),\n      nav,\n      h(\n        "div",\n        { class: "rail-foot" },\n        h("button", { type: "button", title: "New brand", "aria-label": "New brand", onclick: newBrandDialog }, raw(UI.plus), h("span", {}, "New brand")),\n        h("button", { type: "button", title: "Sign out", "aria-label": "Sign out", onclick: logout }, raw(UI.logout), h("span", {}, "Sign out"))\n      )\n    ),\n    h("main", { class: "main" }, h("div", { class: "main-inner", id: "panel" })),\n    h(\n      "aside",\n      { class: "preview", id: "preview", "aria-label": "Preview" },\n      h("div", { class: "preview-label" }, "Live preview"),\n      h("div", { class: "phone", id: "phone" }, h("div", { class: "phone-screen", id: "phone-screen" }, h("iframe", { id: "preview-frame", title: "Page preview" }))),\n      h("button", { class: "btn preview-close", type: "button", onclick: () => togglePreview(false) }, raw(UI.close), "Close")\n    ),\n    h("button", { class: "btn primary preview-fab", type: "button", onclick: () => togglePreview(true) }, raw(UI.phone), "Preview")\n  );\n  app().replaceChildren(shell);\n  $("#preview-frame").addEventListener("load", applyThemeToPreview);\n  sizePhone();\n  syncBrandSelect();\n}\nfunction syncBrandSelect() {\n  const select = $("#brand-select");\n  if (!select) return;\n  select.replaceChildren(...S.pages.map((p) => h("option", { value: p.id }, `${p.title}${p.published ? "" : " (not live)"}`)));\n  if (S.page) select.value = S.page.id;\n}\nfunction togglePreview(open) {\n  $("#preview").classList.toggle("open", open);\n  sizePhone();\n}\nfunction sizePhone() {\n  const screen = $("#phone-screen");\n  const frame = $("#preview-frame");\n  if (!screen || !frame) return;\n  const FRAME_W = 390;\n  const FRAME_H = 800;\n  const overlay = $("#preview").classList.contains("open");\n  const availH = window.innerHeight - (overlay ? 124 : 76);\n  const availW = overlay ? window.innerWidth - 48 : 300;\n  const scale = Math.min(availH / FRAME_H, availW / FRAME_W, 1);\n  frame.style.height = `${FRAME_H}px`;\n  frame.style.transform = `scale(${scale})`;\n  screen.style.width = `${Math.round(FRAME_W * scale)}px`;\n  screen.style.height = `${Math.round(FRAME_H * scale)}px`;\n}\nvar resizeTimer;\nwindow.addEventListener("resize", () => {\n  sizePhone();\n  clearTimeout(resizeTimer);\n  resizeTimer = setTimeout(() => {\n    if (S.tab === "stats" && S.stats) drawChartInto();\n  }, 150);\n});\nasync function selectPage(id) {\n  await flushAll();\n  const panel = $("#panel");\n  panel.replaceChildren(h("div", { class: "loading" }, "Loading…"));\n  try {\n    S.page = await api(`/pages/${id}`);\n  } catch (e) {\n    panel.replaceChildren(h("div", { class: "empty" }, e.message, " ", h("button", { class: "btn", onclick: () => selectPage(id) }, "Try again")));\n    return;\n  }\n  store.set("page", String(id));\n  S.expanded.clear();\n  S.clicks = {};\n  S.bgMode = null;\n  S.statsQ = null;\n  syncBrandSelect();\n  $("#preview-frame").src = `/admin/preview/${id}`;\n  renderTab();\n  loadClicks(id);\n}\nasync function loadClicks(id) {\n  const to = /* @__PURE__ */ new Date();\n  const from = new Date(Date.now() - 29 * 864e5);\n  try {\n    const r = await api(`/stats?page=${id}&from=${isoDay(from)}&to=${isoDay(to)}`);\n    if (S.page?.id !== id) return;\n    S.clicks = Object.fromEntries(r.items.map((i) => [i.id, i.clicks]));\n    S.page.items.forEach(refreshItemRow);\n  } catch {\n  }\n}\nasync function setTab(id) {\n  await flushAll();\n  S.tab = id;\n  togglePreview(false);\n  renderTab();\n  window.scrollTo(0, 0);\n}\nfunction renderTab() {\n  document.querySelectorAll(".nav button").forEach((b) => {\n    if (b.dataset.tab === S.tab) b.setAttribute("aria-current", "page");\n    else b.removeAttribute("aria-current");\n  });\n  const tab = TABS.find((t) => t.id === S.tab);\n  const panel = $("#panel");\n  panel.classList.toggle("main-wide", tab.wide);\n  $(".shell").style.gridTemplateColumns = tab.wide ? "var(--stats-cols, 232px minmax(0,1fr))" : "";\n  $("#preview").style.visibility = tab.wide ? "hidden" : "";\n  $("#preview").style.width = tab.wide ? "0" : "";\n  $("#preview").style.padding = tab.wide ? "0" : "";\n  $(".preview-fab").hidden = tab.wide;\n  panel.replaceChildren(...{ content: contentTab, design: designTab, stats: statsTab, contacts: contactsTab, settings: settingsTab }[S.tab]());\n}\nvar pageUrl = (p) => `${location.origin}/${p.slug}`;\nfunction topline(title) {\n  const p = S.page;\n  return h(\n    "div",\n    { class: "topline" },\n    h("div", {}, h("h1", {}, title), h("div", { class: "save-state", id: "save-state", role: "status" }, "All changes saved")),\n    h(\n      "div",\n      { class: "url-box" },\n      h("code", {}, pageUrl(p).replace(/^https?:\\/\\//, "")),\n      h("button", { class: "icon-btn", type: "button", title: "Copy link", "aria-label": "Copy link", onclick: () => copyText(pageUrl(p)) }, raw(UI.copy)),\n      h("a", { class: "icon-btn", href: pageUrl(p), target: "_blank", rel: "noopener", title: "Open public page", "aria-label": "Open public page" }, raw(UI.open))\n    )\n  );\n}\nfunction offlineBanner() {\n  if (S.page.published) return null;\n  return h(\n    "div",\n    { class: "banner" },\n    h("span", {}, "This brand is not live yet. Only you can see it in the preview."),\n    h("button", { class: "btn primary", type: "button", onclick: async () => {\n      await savePageNow({ published: true });\n      renderTab();\n      toast("The brand is live");\n    } }, "Go live")\n  );\n}\nvar previewTimer;\nfunction reloadPreview() {\n  clearTimeout(previewTimer);\n  previewTimer = setTimeout(() => {\n    const frame = $("#preview-frame");\n    try {\n      frame.contentWindow.location.reload();\n    } catch {\n      frame.src = frame.src;\n    }\n  }, 250);\n}\nfunction applyThemeToPreview() {\n  const frame = $("#preview-frame");\n  const doc = frame?.contentDocument;\n  if (!S.page) return;\n  $("#phone-screen").style.background = S.page.theme.bgColor;\n  if (!doc) return;\n  const style = doc.getElementById("theme");\n  const font = doc.getElementById("font");\n  if (style) style.textContent = themeCss(S.page.theme);\n  const href = fontHref(S.page.theme);\n  if (font && font.getAttribute("href") !== href) font.setAttribute("href", href);\n}\nvar pagePatch = {};\nfunction savePageSoon(patch) {\n  Object.assign(S.page, patch);\n  Object.assign(pagePatch, patch);\n  const id = S.page.id;\n  schedule(`page${id}`, async () => {\n    const body = pagePatch;\n    pagePatch = {};\n    try {\n      const saved = await saving(() => api(`/pages/${id}`, "PUT", body));\n      if (S.page?.id === id) {\n        if (body.socials) S.page.socials = saved.socials;\n        mergePageSummary(saved);\n        reloadPreview();\n      }\n    } catch {\n    }\n  });\n}\nasync function savePageNow(patch) {\n  await flushAll();\n  const saved = await saving(() => api(`/pages/${S.page.id}`, "PUT", patch));\n  Object.assign(S.page, saved, { items: S.page.items });\n  mergePageSummary(saved);\n  reloadPreview();\n  return saved;\n}\nfunction mergePageSummary(saved) {\n  const i = S.pages.findIndex((p) => p.id === saved.id);\n  if (i >= 0) S.pages[i] = saved;\n  syncBrandSelect();\n}\nasync function compressImage(file, { size, square, ratio, lossless }) {\n  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") throw new Error("Choose a JPG, PNG or WebP image.");\n  let bitmap;\n  try {\n    bitmap = await createImageBitmap(file);\n  } catch {\n    throw new Error("This image could not be read. Try another one.");\n  }\n  let sx = 0;\n  let sy = 0;\n  let sw = bitmap.width;\n  let sh = bitmap.height;\n  const target = square ? 1 : ratio;\n  if (target) {\n    if (sw / sh > target) {\n      const w = sh * target;\n      sx = (sw - w) / 2;\n      sw = w;\n    } else {\n      const hh = sw / target;\n      sy = (sh - hh) / 2;\n      sh = hh;\n    }\n  }\n  const scale = Math.min(1, size / Math.max(sw, sh));\n  const canvas = document.createElement("canvas");\n  canvas.width = Math.round(sw * scale);\n  canvas.height = Math.round(sh * scale);\n  canvas.getContext("2d").drawImage(bitmap, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);\n  const toBlob = (type, q) => new Promise((res) => canvas.toBlob(res, type, q));\n  let blob = await toBlob("image/webp", 0.82);\n  if (!blob || blob.type !== "image/webp") blob = await toBlob(lossless ? "image/png" : "image/jpeg", 0.82);\n  const data = await new Promise((res, rej) => {\n    const r = new FileReader();\n    r.onload = () => res(String(r.result).split(",")[1]);\n    r.onerror = () => rej(new Error("The image could not be read."));\n    r.readAsDataURL(blob);\n  });\n  return { mime: blob.type, data };\n}\nfunction imageField({ id, label, value, options, wide, onChange }) {\n  const box = h("div", { class: `thumb-box ${wide ? "wide" : ""}` });\n  const setBox = (v) => {\n    box.classList.toggle("filled", !!v);\n    box.style.backgroundImage = v ? `url(/img/${v})` : "";\n    box.replaceChildren(...v ? [] : [raw(UI.image)]);\n  };\n  setBox(value);\n  let current = value;\n  const input = h("input", { type: "file", id, accept: "image/jpeg,image/png,image/webp,image/heic" });\n  const upload = h("label", { class: "btn", for: id }, current ? "Replace" : "Upload");\n  const remove = h("button", { class: "btn", type: "button", hidden: !current, onclick: async () => {\n    current = null;\n    setBox(null);\n    remove.hidden = true;\n    upload.textContent = "Upload";\n    await onChange(null);\n  } }, "Remove");\n  input.addEventListener("change", async () => {\n    const file = input.files[0];\n    if (!file) return;\n    upload.textContent = "Loading…";\n    try {\n      const payload = await compressImage(file, options);\n      const { id: imageId } = await saving(() => api("/images", "POST", payload));\n      current = imageId;\n      setBox(imageId);\n      remove.hidden = false;\n      await onChange(imageId);\n    } catch (e) {\n      if (!/salvat/i.test(e.message)) toast(e.message, "error");\n    }\n    upload.textContent = current ? "Replace" : "Upload";\n    input.value = "";\n  });\n  return h(\n    "div",\n    { class: "field" },\n    h("span", { class: "field-label" }, label),\n    h("div", { class: "image-field" }, box, h("div", { class: "ctrl" }, input, upload, remove))\n  );\n}\nvar SOCIAL_LABELS = { instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook", whatsapp: "WhatsApp", youtube: "YouTube", x: "X", telegram: "Telegram", spotify: "Spotify", snapchat: "Snapchat", linkedin: "LinkedIn", website: "Website", email: "Email" };\nfunction contentTab() {\n  const p = S.page;\n  const list = h("div", { class: "items", id: "items" });\n  const socials = { ...p.socials };\n  const unprotected = p.items.filter((i) => isGroupLink(i.url) && !i.protected).length;\n  const out = [\n    topline("Content"),\n    offlineBanner(),\n    unprotected ? h(\n      "div",\n      { class: "banner" },\n      h("span", {}, `${unprotected} WhatsApp links are visible to bots. `, S.turnstile ? "" : "Anti-bot protection is not connected."),\n      S.turnstile ? h("button", { class: "btn primary", type: "button", onclick: () => protectGroups(true).catch(() => {\n      }) }, "Protect them") : h("button", { class: "btn", type: "button", onclick: () => setTab("settings") }, "Set up")\n    ) : null,\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Profile"),\n      imageField({\n        id: "avatar-upload",\n        label: "Logo or photo",\n        value: p.avatar_image,\n        options: { size: 512, square: true, lossless: true },\n        onChange: (v) => savePageNow({ avatar_image: v })\n      }),\n      h(\n        "div",\n        { class: "field" },\n        h("label", { for: "page-title" }, "Brand name"),\n        h("input", { id: "page-title", type: "text", value: p.title, maxlength: 120, oninput: (e) => {\n          if (e.target.value.trim()) savePageSoon({ title: e.target.value });\n        } })\n      ),\n      h(\n        "div",\n        { class: "field" },\n        h("label", { for: "page-bio" }, "Description"),\n        h("textarea", { id: "page-bio", maxlength: 500, value: p.bio, oninput: (e) => savePageSoon({ bio: e.target.value }) })\n      ),\n      h(\n        "details",\n        {},\n        h("summary", { id: "social-count" }, `Social icons (${Object.keys(p.socials).length})`),\n        h("div", { class: "socials-grid" }, Object.keys(SOCIAL_LABELS).map((key) => h(\n          "div",\n          { class: "social-field" },\n          raw(ICONS[key]),\n          h("input", {\n            id: `social-${key}`,\n            type: "text",\n            "aria-label": SOCIAL_LABELS[key],\n            placeholder: SOCIAL_LABELS[key],\n            value: socials[key] || "",\n            oninput: (e) => {\n              socials[key] = e.target.value;\n              savePageSoon({ socials: { ...socials } });\n              $("#social-count").textContent = `Social icons (${Object.values(socials).filter((v) => String(v).trim()).length})`;\n            }\n          })\n        ))),\n        h("p", { class: "hint", style: "margin-top:10px" }, "Enter @username or paste the full link. Social icons skip the anti-bot check, so add WhatsApp groups as protected links.")\n      )\n    ),\n    h(\n      "div",\n      { class: "add-row" },\n      h("button", { class: "btn primary", type: "button", id: "add-link", onclick: () => addItem("link") }, raw(UI.plus), "Link"),\n      h("button", { class: "btn", type: "button", id: "add-event", onclick: () => addItem("event") }, raw(UI.calendar), "Event"),\n      h("button", { class: "btn", type: "button", id: "add-section", onclick: () => addItem("section") }, raw(UI.section), "Section")\n    ),\n    h(\n      "div",\n      { class: "add-row add-row-more" },\n      h("button", { class: "btn", type: "button", id: "add-embed", onclick: () => addItem("embed") }, raw(UI.play), "Video or music"),\n      h("button", { class: "btn", type: "button", id: "add-map", onclick: () => addItem("map") }, raw(UI.pin), "Map"),\n      h("button", { class: "btn", type: "button", id: "add-gallery", onclick: () => addItem("gallery") }, raw(UI.image), "Gallery"),\n      h("button", { class: "btn", type: "button", id: "add-form", onclick: () => addItem("form") }, raw(UI.form), "Form")\n    ),\n    list\n  ];\n  renderItems(list);\n  return out.filter(Boolean);\n}\nfunction renderItems(list = $("#items")) {\n  if (!list) return;\n  const items = S.page.items;\n  if (!items.length) {\n    list.replaceChildren(h("div", { class: "empty" }, "No links yet. Add your first one with the Link button."));\n    return;\n  }\n  list.replaceChildren(...items.map(itemRow));\n}\nasync function addItem(kind) {\n  await flushAll();\n  const extra = {\n    embed: { kind: "embed", title: "" },\n    map: { kind: "embed", title: "Find us", settings: { address: "Barcelona" } },\n    gallery: { kind: "gallery", title: "Our photos", settings: { images: [] } },\n    form: { kind: "form", title: "Join our list", cta_label: "Send", settings: { form: { name: true, message: false, thanks: "Thank you!" } } }\n  }[kind];\n  const defaults = extra ? extra : kind === "event" ? { kind, title: "New event", pinned: true, cta_label: "Get Tickets" } : kind === "section" ? { kind, title: "New section" } : { kind, title: "New link" };\n  try {\n    const item = await saving(() => api(`/pages/${S.page.id}/items`, "POST", defaults));\n    S.page.items.unshift(item);\n    S.expanded.add(item.id);\n    renderItems();\n    reloadPreview();\n    const first = $(`#item-${item.id}-title`);\n    if (first) {\n      first.focus();\n      first.select();\n    }\n  } catch {\n  }\n}\nvar STATUS = {\n  live: ["Online", "live"],\n  off: ["Off", ""],\n  scheduled: ["Scheduled", "info"],\n  expired: ["Ended", "warn"],\n  "no-url": ["Link missing", "bad"]\n};\nfunction itemSummary(item) {\n  if (item.kind === "section") return "Section";\n  if (item.kind === "gallery") return `Gallery · ${(item.settings?.images || []).length} images`;\n  if (item.kind === "form") return "Contact form";\n  if (item.kind === "embed") return item.settings?.address ? `Map · ${item.settings.address}` : item.url || "Video or music";\n  if (item.kind === "event" && item.event_date) return `${new Date(item.event_date).toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`;\n  return item.url || item.subtitle || "";\n}\nfunction refreshItemRow(item) {\n  const row = document.querySelector(`.item[data-id="${item.id}"]`);\n  if (!row) return;\n  row.classList.toggle("off", !item.active);\n  $(".item-title", row).textContent = item.title || "Untitled";\n  $(".item-sub", row).textContent = itemSummary(item);\n  const [label, cls] = STATUS[itemStatus(item)];\n  const chips = [h("span", { class: `chip ${cls}` }, label)];\n  if (item.pinned) chips.push(h("span", { class: "chip plain info" }, "Featured"));\n  if (item.sold_out) chips.push(h("span", { class: "chip plain bad" }, "Sold out"));\n  if (item.display === "card") chips.push(h("span", { class: "chip plain" }, "Card"));\n  if (item.display === "grid") chips.push(h("span", { class: "chip plain" }, "Grid"));\n  if (item.display === "carousel") chips.push(h("span", { class: "chip plain" }, "Carousel"));\n  if (item.settings?.animation) chips.push(h("span", { class: "chip plain" }, "Animated"));\n  if (item.settings?.prioritize === "redirect") chips.push(h("span", { class: "chip plain warn" }, "Redirects the whole page"));\n  if (item.settings?.prioritize === "expand") chips.push(h("span", { class: "chip plain info" }, "Opens on arrival"));\n  if ((item.settings?.rules || []).length) chips.push(h("span", { class: "chip plain" }, "Rules"));\n  const l = item.settings?.lock || {};\n  if (l.subscribe || l.sensitive || l.dob || l.has_code || l.has_password) chips.push(h("span", { class: "chip plain info" }, "Locked"));\n  if (item.protected) chips.push(h("span", { class: "chip plain info" }, S.turnstile ? "Anti-bot" : "Anti-bot needs setup"));\n  if (item.kind === "link" || item.kind === "event") chips.push(h("span", {}, `${S.clicks[item.id] || 0} clicks in 30 days`));\n  $(".item-meta", row).replaceChildren(...chips);\n  const thumb = $(".item-thumb", row);\n  if (thumb) {\n    thumb.style.backgroundImage = item.thumb_image ? `url(/img/${item.thumb_image})` : "";\n    thumb.replaceChildren(...item.thumb_image ? [] : [raw({ event: UI.calendar, embed: item.settings?.address ? UI.pin : UI.play, gallery: UI.image, form: UI.form }[item.kind] || UI.links)]);\n  }\n}\nfunction itemRow(item) {\n  const row = h("article", { class: `item ${item.kind === "section" ? "section-item" : ""}`, "data-id": item.id });\n  const handle = h("button", { class: "handle", type: "button", "aria-label": `Move ${item.title}. Use the up and down arrows.`, title: "Drag to reorder" }, raw(UI.grip));\n  enableDrag(handle, row);\n  const toggle = h(\n    "label",\n    { class: "switch", title: "Turn on or off" },\n    h("input", { type: "checkbox", checked: !!item.active, "aria-label": `Turn on ${item.title}`, onchange: (e) => saveItemSoon(item, { active: e.target.checked ? 1 : 0 }, 0) }),\n    h("span", {})\n  );\n  const body = h(\n    "button",\n    { class: "item-body", type: "button", "aria-expanded": S.expanded.has(item.id) ? "true" : "false", onclick: () => toggleEditor(item, row) },\n    h("span", { class: "item-title" }),\n    h("span", { class: "item-sub" }),\n    h("span", { class: "item-meta" })\n  );\n  row.append(h("div", { class: "item-head" }, handle, item.kind === "section" ? null : h("div", { class: "item-thumb" }), body, toggle));\n  if (S.expanded.has(item.id)) row.append(itemEditor(item));\n  queueMicrotask(() => refreshItemRow(item));\n  return row;\n}\nfunction toggleEditor(item, row) {\n  const open = S.expanded.has(item.id);\n  $(".item-body", row).setAttribute("aria-expanded", String(!open));\n  if (open) {\n    S.expanded.delete(item.id);\n    $(".item-editor", row)?.remove();\n    return;\n  }\n  S.expanded.add(item.id);\n  row.append(itemEditor(item));\n}\nvar itemPatches = /* @__PURE__ */ new Map();\nfunction saveItemSoon(item, patch, ms = 650) {\n  Object.assign(item, patch);\n  refreshItemRow(item);\n  itemPatches.set(item.id, { ...itemPatches.get(item.id) || {}, ...patch });\n  schedule(`item${item.id}`, async () => {\n    const body = itemPatches.get(item.id);\n    itemPatches.delete(item.id);\n    try {\n      const saved = await saving(() => api(`/items/${item.id}`, "PUT", body));\n      if ("url" in body && !itemPatches.get(item.id)?.url) {\n        item.url = saved.url;\n        const urlInput = document.getElementById(`item-${item.id}-url`);\n        if (urlInput && document.activeElement !== urlInput) urlInput.value = saved.url;\n      }\n      refreshItemRow(item);\n      reloadPreview();\n    } catch {\n    }\n  }, ms);\n}\nfunction toLocalInput(iso) {\n  if (!iso) return "";\n  const d = new Date(iso);\n  const pad = (n) => String(n).padStart(2, "0");\n  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;\n}\nvar fromLocalInput = (v) => v ? new Date(v).toISOString() : null;\nfunction dateField(item, key, label) {\n  const id = `item-${item.id}-${key}`;\n  return h(\n    "div",\n    { class: "field" },\n    h("label", { for: id }, label),\n    h("input", { id, type: "datetime-local", value: toLocalInput(item[key]), onchange: (e) => saveItemSoon(item, { [key]: fromLocalInput(e.target.value) }, 0) })\n  );\n}\nfunction textField(item, key, label, placeholder = "", inputType = "text") {\n  const id = `item-${item.id}-${key === "title" ? "title" : key === "url" ? "url" : key}`;\n  return h(\n    "div",\n    { class: "field" },\n    h("label", { for: id }, label),\n    h("input", { id, type: inputType, placeholder, value: item[key] || "", oninput: (e) => saveItemSoon(item, { [key]: e.target.value }), onblur: () => flushAll() })\n  );\n}\nfunction switchRow(item, key, title, hint) {\n  return h(\n    "div",\n    { class: "toggle-row" },\n    h("div", {}, h("strong", {}, title), hint ? h("p", { class: "hint" }, hint) : null),\n    h("label", { class: "switch" }, h("input", { type: "checkbox", "aria-label": title, id: `item-${item.id}-${key}`, checked: !!item[key], onchange: (e) => saveItemSoon(item, { [key]: e.target.checked ? 1 : 0 }, 0) }), h("span", {}))\n  );\n}\nvar MINI = {\n  classic: \'<i class="m-row"></i><i class="m-row"></i>\',\n  card: \'<i class="m-img"></i><i class="m-line"></i>\',\n  list: \'<i class="m-row"></i><i class="m-row"></i>\',\n  grid: \'<span class="m-two"><i class="m-img"></i><i class="m-img"></i></span><span class="m-two"><i class="m-img"></i><i class="m-img"></i></span>\',\n  carousel: \'<span class="m-slide"><i class="m-img"></i><i class="m-img"></i><i class="m-img"></i></span>\'\n};\nfunction layoutPicker(item, options) {\n  const current = item.display && options.some(([v]) => v === item.display) ? item.display : options[0][0];\n  const row = h("div", { class: "layouts", role: "group", "aria-label": "Layout" });\n  const paint = (v) => row.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === v)));\n  options.forEach(([v, label]) => row.append(h("button", {\n    type: "button",\n    "data-v": v,\n    id: `item-${item.id}-layout-${v}`,\n    onclick: () => {\n      paint(v);\n      saveItemSoon(item, { display: v }, 0);\n      const row2 = document.querySelector(`.item[data-id="${item.id}"]`);\n      $(".item-editor", row2)?.replaceWith(itemEditor(item));\n    }\n  }, h("span", { class: "mini", html: MINI[v] }), h("span", {}, label))));\n  paint(current);\n  return h("div", { class: "field" }, h("span", { class: "field-label" }, "Layout"), row);\n}\nasync function saveSettings(item, patch) {\n  try {\n    const saved = await saving(() => api(`/items/${item.id}`, "PUT", { settings: patch }));\n    item.settings = saved.settings;\n    if (patch.prioritize) {\n      const fresh = await api(`/pages/${S.page.id}`);\n      for (const other of S.page.items) {\n        const f = fresh.items.find((x) => x.id === other.id);\n        if (f && other !== item) other.settings = f.settings;\n      }\n      S.page.items.forEach(refreshItemRow);\n    }\n    refreshItemRow(item);\n    reloadPreview();\n    return true;\n  } catch {\n    return false;\n  }\n}\nvar debouncers = /* @__PURE__ */ new Map();\nfunction saveSettingsSoon(item, key, patch) {\n  clearTimeout(debouncers.get(`${item.id}:${key}`));\n  debouncers.set(`${item.id}:${key}`, setTimeout(() => saveSettings(item, patch), 600));\n}\nvar ANIM_LABELS = [["", "None"], ["wiggle", "Wiggle"], ["pop", "Pop"], ["electric", "Electric"], ["glitch", "Glitch"], ["scramble", "Scramble"], ["orbit", "Orbit"], ["emoji", "Emoji"], ["shimmer", "Shimmer"]];\nfunction animationPanel(item) {\n  const emojiId = `item-${item.id}-emoji`;\n  const emoji = h(\n    "div",\n    { class: "field", hidden: item.settings?.animation !== "emoji" },\n    h("label", { for: emojiId }, "Emoji"),\n    h("input", { id: emojiId, type: "text", maxlength: 8, value: item.settings?.emoji || "🎉", oninput: (e) => saveSettingsSoon(item, "emoji", { emoji: e.target.value }) })\n  );\n  const pick = segment("Effect", item.settings?.animation || "", ANIM_LABELS, (v) => {\n    emoji.hidden = v !== "emoji";\n    saveSettings(item, { animation: v });\n  });\n  return h("details", { class: "power" }, h("summary", {}, "Animation"), pick, emoji);\n}\nfunction priorityPanel(item) {\n  return h(\n    "details",\n    { class: "power" },\n    h("summary", {}, "Priority"),\n    segment("When a visitor arrives", item.settings?.prioritize || "", [["", "Normal"], ["expand", "Open automatically"], ["redirect", "Redirect immediately"]], (v) => saveSettings(item, { prioritize: v })),\n    h("p", { class: "hint" }, "Only one link per page can have priority. With Redirect immediately, visitors skip the page, so set dates on the link to end it automatically. You still see the page while signed in.")\n  );\n}\nfunction rulesPanel(item) {\n  const rules = (item.settings?.rules || []).map((r) => ({ ...r, values: [...r.values || []] }));\n  const list = h("div", { class: "rules" });\n  const commit = () => saveSettingsSoon(item, "rules", { rules });\n  const draw = () => {\n    list.replaceChildren(...rules.map((r, i) => {\n      const type = h("select", { "aria-label": "Rule type", onchange: (e) => {\n        r.type = e.target.value;\n        r.values = [];\n        commit();\n        draw();\n      } }, h("option", { value: "country" }, "Country"), h("option", { value: "device" }, "Device"));\n      type.value = r.type;\n      const mode = h("select", { "aria-label": "Action", onchange: (e) => {\n        r.mode = e.target.value;\n        commit();\n        draw();\n      } }, h("option", { value: "show" }, "Show only to"), h("option", { value: "hide" }, "Hide from"), h("option", { value: "title" }, "Change title for"));\n      mode.value = r.mode;\n      const values = r.type === "device" ? h("div", { class: "checks" }, [["mobile", "Phone"], ["tablet", "Tablet"], ["desktop", "Desktop"]].map(([v, label]) => h("label", {}, h("input", { type: "checkbox", checked: r.values.includes(v), onchange: (e) => {\n        r.values = e.target.checked ? [...r.values, v] : r.values.filter((x) => x !== v);\n        commit();\n      } }), ` ${label}`))) : h("input", { type: "text", "aria-label": "Country codes", placeholder: "ES, IT, FR", value: r.values.join(", "), oninput: (e) => {\n        r.values = e.target.value.split(/[\\s,;]+/).map((x) => x.toUpperCase()).filter((x) => /^[A-Z]{2}$/.test(x));\n        commit();\n      } });\n      return h(\n        "div",\n        { class: "rule" },\n        h("div", { class: "grid-2" }, type, mode),\n        values,\n        r.mode === "title" ? h("input", { type: "text", "aria-label": "Alternative title", placeholder: "Title for these visitors", value: r.title || "", oninput: (e) => {\n          r.title = e.target.value;\n          commit();\n        } }) : null,\n        h("button", { class: "btn", type: "button", onclick: () => {\n          rules.splice(i, 1);\n          commit();\n          draw();\n        } }, "Remove rule")\n      );\n    }));\n  };\n  draw();\n  return h(\n    "details",\n    { class: "power" },\n    h("summary", {}, "Visitor rules"),\n    h("p", { class: "hint" }, "Show, hide or rename this link by country or device. Use two-letter country codes."),\n    list,\n    h("div", {}, h("button", { class: "btn", type: "button", id: `item-${item.id}-add-rule`, onclick: () => {\n      rules.push({ type: "country", mode: "show", values: [], title: "" });\n      draw();\n    } }, raw(UI.plus), "Add rule"))\n  );\n}\nfunction secretLockRow(item, key, title, isPassword) {\n  const has = () => !!item.settings?.lock?.[`has_${key}`];\n  const status = h("p", { class: "hint" });\n  const input = h("input", { id: `item-${item.id}-lock-${key}`, type: isPassword ? "password" : "text", autocomplete: "off", maxlength: 100, "aria-label": title });\n  const remove = h("button", { class: "btn", type: "button", onclick: async () => {\n    if (await saveSettings(item, { lock: { [key]: "" } })) paint();\n  } }, "Remove");\n  const paint = () => {\n    status.textContent = has() ? "Active. Enter a new one to change it." : "Not active.";\n    remove.hidden = !has();\n    input.value = "";\n  };\n  paint();\n  return h(\n    "div",\n    { class: "field" },\n    h("span", { class: "field-label" }, title),\n    status,\n    h(\n      "div",\n      { class: "inline-row" },\n      input,\n      h("button", { class: "btn", type: "button", id: `item-${item.id}-save-${key}`, onclick: async () => {\n        if (input.value.trim() && await saveSettings(item, { lock: { [key]: input.value } })) paint();\n      } }, "Save"),\n      remove\n    )\n  );\n}\nfunction lockPanel(item) {\n  const lock = item.settings?.lock || {};\n  const age = h(\n    "div",\n    { class: "field", hidden: !lock.dob },\n    h("label", { for: `item-${item.id}-minage` }, "Minimum age"),\n    h("input", { id: `item-${item.id}-minage`, type: "number", min: 13, max: 99, value: lock.dob?.minAge || 18, oninput: (e) => saveSettingsSoon(item, "age", { lock: { dob: { minAge: Number(e.target.value) } } }) })\n  );\n  const toggle = (key, title, hint, on, value) => h(\n    "div",\n    { class: "toggle-row" },\n    h("div", {}, h("strong", {}, title), h("p", { class: "hint" }, hint)),\n    h("label", { class: "switch" }, h("input", { type: "checkbox", "aria-label": title, id: `item-${item.id}-lock-${key}`, checked: on, onchange: (e) => {\n      if (key === "dob") age.hidden = !e.target.checked;\n      saveSettings(item, { lock: { [key]: e.target.checked ? value : false } });\n    } }), h("span", {}))\n  );\n  return h(\n    "details",\n    { class: "power" },\n    h("summary", {}, "Locks"),\n    h("p", { class: "hint" }, "You can combine them. The destination stays hidden until the visitor passes them."),\n    secretLockRow(item, "code", "Access code", false),\n    secretLockRow(item, "password", "Password", true),\n    toggle("dob", "Date of birth", "Visitors enter their date. It is not stored and is not an ID check.", !!lock.dob, { minAge: 18 }),\n    age,\n    toggle("sensitive", "Sensitive content", "Visitors confirm before continuing.", !!lock.sensitive, true),\n    toggle("subscribe", "Collect email", "Requires an email and consent. You will find it under Contacts.", !!lock.subscribe, true)\n  );\n}\nfunction insightPanel(item) {\n  const body = h("div", { class: "bars" }, h("p", { class: "hint" }, "Loading…"));\n  let loaded = false;\n  return h("details", {\n    class: "power",\n    ontoggle: async (e) => {\n      if (!e.target.open || loaded) return;\n      loaded = true;\n      try {\n        const r = await api(`/items/${item.id}/stats`);\n        const max = Math.max(1, ...r.sources.map((x) => x.hits));\n        body.replaceChildren(\n          h("p", { class: "hint" }, `${fmt.format(r.total)} clicks in total, ${fmt.format(r.last7)} in the last 7 days.`),\n          ...r.sources.map((x) => h("div", { class: "bar-row" }, h("div", { class: "name" }, SOURCE_NAMES[x.key] || x.key), h("div", { class: "val" }, fmt.format(x.hits)), h("div", { class: "bar-track" }, h("i", { style: `width:${x.hits / max * 100}%` }))))\n        );\n      } catch (err) {\n        body.replaceChildren(h("p", { class: "hint" }, err.message));\n      }\n    }\n  }, h("summary", {}, "Link analytics"), body);\n}\nfunction galleryEditor(item) {\n  const grid = h("div", { class: "gallery-admin" });\n  const id = `item-${item.id}-gallery`;\n  const input = h("input", { type: "file", id, accept: "image/jpeg,image/png,image/webp", multiple: true, style: "position:absolute;width:1px;height:1px;opacity:0" });\n  const label = h("label", { class: "btn", for: id }, raw(UI.plus), "Add images");\n  const draw = () => grid.replaceChildren(...(item.settings?.images || []).map((img) => h(\n    "div",\n    { class: "gallery-thumb", style: `background-image:url(/img/${img})` },\n    h("button", { class: "icon-btn", type: "button", "aria-label": "Remove image", onclick: async () => {\n      await saveSettings(item, { images: item.settings.images.filter((x) => x !== img) });\n      draw();\n    } }, raw(UI.close))\n  )));\n  input.addEventListener("change", async () => {\n    const files = [...input.files].slice(0, 12 - (item.settings?.images || []).length);\n    label.textContent = "Loading…";\n    const added = [];\n    for (const file of files) {\n      try {\n        const payload = await compressImage(file, { size: 1e3 });\n        const up = await saving(() => api("/images", "POST", payload));\n        added.push(up.id);\n      } catch (e) {\n        toast(e.message, "error");\n      }\n    }\n    if (added.length) await saveSettings(item, { images: [...item.settings?.images || [], ...added] });\n    label.replaceChildren(raw(UI.plus), "Add images");\n    input.value = "";\n    draw();\n  });\n  draw();\n  return h("div", { class: "field" }, h("span", { class: "field-label" }, "Images (up to 12)"), grid, h("div", {}, input, label));\n}\nfunction formEditor(item) {\n  const form = { name: false, message: false, thanks: "", ...item.settings?.form || {} };\n  const save = () => saveSettingsSoon(item, "form", { form });\n  const toggle = (key, title) => h("div", { class: "toggle-row" }, h("strong", {}, title), h("label", { class: "switch" }, h("input", { type: "checkbox", "aria-label": title, id: `item-${item.id}-form-${key}`, checked: !!form[key], onchange: (e) => {\n    form[key] = e.target.checked;\n    save();\n  } }), h("span", {})));\n  return [\n    toggle("name", "Ask for name"),\n    toggle("message", "Ask for a message"),\n    h("div", { class: "field" }, h("label", { for: `item-${item.id}-thanks` }, "Thank-you message"), h("input", { id: `item-${item.id}-thanks`, type: "text", maxlength: 120, value: form.thanks, oninput: (e) => {\n      form.thanks = e.target.value;\n      save();\n    } })),\n    h("p", { class: "hint" }, "Email and consent are always required. Responses appear under Contacts.")\n  ];\n}\nfunction protectRow(item) {\n  const hint = S.turnstile ? "Visitors must pass the check to open this link. The destination is not in the page code." : "Connect Cloudflare Turnstile first. Setup steps are in Settings.";\n  return h(\n    "div",\n    { class: "toggle-row" },\n    h("div", {}, h("strong", {}, "Anti-bot check"), h("p", { class: "hint" }, hint)),\n    h("label", { class: "switch" }, h("input", {\n      type: "checkbox",\n      "aria-label": "Anti-bot check",\n      id: `item-${item.id}-protected`,\n      checked: !!item.protected,\n      disabled: !S.turnstile && !item.protected,\n      onchange: (e) => saveItemSoon(item, { protected: e.target.checked ? 1 : 0 }, 0)\n    }), h("span", {}))\n  );\n}\nfunction itemEditor(item) {\n  const parts = [];\n  if (item.kind === "section") {\n    parts.push(textField(item, "title", "Section title (optional)"));\n    parts.push(layoutPicker(item, [["list", "List"], ["grid", "Grid"], ["carousel", "Carousel"]]));\n    parts.push(h("p", { class: "hint" }, "Links listed after this section belong to it. If none are visible, the title hides automatically."));\n    parts.push(h("div", { class: "grid-2" }, dateField(item, "starts_at", "Show from"), dateField(item, "ends_at", "Hide from")));\n  } else if (item.kind === "event") {\n    parts.push(textField(item, "title", "Event name"));\n    parts.push(textField(item, "subtitle", "Description", "Venue, line-up, details"));\n    parts.push(h("div", { class: "grid-2" }, dateField(item, "event_date", "Event date and time"), dateField(item, "ends_at", "Event end (then hides)")));\n    parts.push(h("p", { class: "hint" }, "Without an end time, the event hides 12 hours after it starts."));\n    parts.push(textField(item, "url", "Button link", "https://…"));\n    const ctaId = `item-${item.id}-cta_label`;\n    parts.push(h(\n      "div",\n      { class: "field" },\n      h("label", { for: ctaId }, "Button text"),\n      h("input", { id: ctaId, type: "text", list: "cta-options", maxlength: 40, value: item.cta_label || "", placeholder: "Get Tickets", oninput: (e) => saveItemSoon(item, { cta_label: e.target.value }) }),\n      h("datalist", { id: "cta-options" }, ["Get Tickets", "Join WhatsApp", "Register Now"].map((v) => h("option", { value: v })))\n    ));\n    parts.push(imageField({ id: `item-${item.id}-image`, label: "Event image", wide: true, value: item.thumb_image, options: { size: 1200, ratio: 16 / 9 }, onChange: async (v) => {\n      saveItemSoon(item, { thumb_image: v }, 0);\n      await flushAll();\n    } }));\n    parts.push(dateField(item, "starts_at", "Show on page from (optional)"));\n    parts.push(switchRow(item, "pinned", "Feature at the top", "Appears above all other links."));\n    parts.push(switchRow(item, "sold_out", "SOLD OUT", "Shows the badge and disables the button."));\n    parts.push(protectRow(item));\n  } else if (item.kind === "embed") {\n    parts.push(textField(item, "title", "Title (optional)"));\n    if (item.settings?.address !== void 0 && item.settings?.address !== "") {\n      parts.push(h("div", { class: "field" }, h("label", { for: `item-${item.id}-address` }, "Address"), h("input", { id: `item-${item.id}-address`, type: "text", value: item.settings.address, oninput: (e) => saveSettingsSoon(item, "address", { address: e.target.value }) })));\n    } else {\n      parts.push(textField(item, "url", "YouTube, Spotify or TikTok link", "https://…"));\n    }\n    parts.push(h("p", { class: "hint" }, "The content loads from the external service when a visitor reaches it."));\n    parts.push(h("div", { class: "grid-2" }, dateField(item, "starts_at", "Show from"), dateField(item, "ends_at", "Hide from")));\n  } else if (item.kind === "gallery") {\n    parts.push(textField(item, "title", "Title (optional)"));\n    parts.push(galleryEditor(item));\n    parts.push(h("div", { class: "grid-2" }, dateField(item, "starts_at", "Show from"), dateField(item, "ends_at", "Hide from")));\n  } else if (item.kind === "form") {\n    parts.push(textField(item, "title", "Title"));\n    parts.push(textField(item, "subtitle", "Description (optional)"));\n    parts.push(textField(item, "cta_label", "Button text", "Send"));\n    parts.push(...formEditor(item));\n  } else {\n    parts.push(layoutPicker(item, [["classic", "Classic"], ["card", "Card"]]));\n    parts.push(textField(item, "title", "Title"));\n    parts.push(textField(item, "subtitle", "Description (optional)"));\n    parts.push(textField(item, "url", "Link", "https://…"));\n    if (item.display === "card") {\n      const ctaInput = `item-${item.id}-cta_label`;\n      parts.push(h(\n        "div",\n        { class: "field" },\n        h("label", { for: ctaInput }, "Button text (optional)"),\n        h("input", { id: ctaInput, type: "text", maxlength: 40, value: item.cta_label || "", placeholder: "Follow on Instagram", oninput: (e) => saveItemSoon(item, { cta_label: e.target.value }) })\n      ));\n    }\n    const iconId = `item-${item.id}-icon`;\n    parts.push(\n      h(\n        "div",\n        { class: "grid-2" },\n        imageField({ id: `item-${item.id}-image`, label: "Image or thumbnail", value: item.thumb_image, options: { size: 900 }, onChange: async (v) => {\n          saveItemSoon(item, { thumb_image: v }, 0);\n          await flushAll();\n        } }),\n        h(\n          "div",\n          { class: "field" },\n          h("label", { for: iconId }, "Icon (without thumbnail)"),\n          h(\n            "select",\n            { id: iconId, onchange: (e) => saveItemSoon(item, { icon: e.target.value }, 0) },\n            h("option", { value: "auto" }, "Automatic from link"),\n            h("option", { value: "none" }, "None"),\n            Object.keys(SOCIAL_LABELS).map((k) => h("option", { value: k }, SOCIAL_LABELS[k]))\n          )\n        )\n      )\n    );\n    parts.push(h("div", { class: "grid-2" }, dateField(item, "starts_at", "Show from"), dateField(item, "ends_at", "Hide from")));\n    parts.push(switchRow(item, "pinned", "Feature at the top", "Larger button above all other links."));\n    parts.push(switchRow(item, "sold_out", "SOLD OUT", "Shows the badge and disables the link."));\n    parts.push(protectRow(item));\n  }\n  if (item.kind === "link" || item.kind === "event") parts.push(animationPanel(item), priorityPanel(item), rulesPanel(item), lockPanel(item), insightPanel(item));\n  parts.push(h(\n    "div",\n    { class: "item-tools" },\n    h("button", { class: "btn", type: "button", onclick: () => duplicateItem(item) }, raw(UI.copy), "Duplicate"),\n    h("button", { class: "btn danger", type: "button", onclick: () => deleteItem(item) }, raw(UI.trash), "Delete")\n  ));\n  const editor = h("div", { class: "item-editor" }, parts);\n  const icon = editor.querySelector(`#item-${item.id}-icon`);\n  if (icon) icon.value = item.icon || "auto";\n  return editor;\n}\nasync function duplicateItem(item) {\n  await flushAll();\n  try {\n    const copy = await saving(() => api(`/items/${item.id}/duplicate`, "POST", {}));\n    S.page.items.splice(S.page.items.indexOf(item) + 1, 0, copy);\n    S.expanded.add(copy.id);\n    renderItems();\n    reloadPreview();\n    toast("Copy created");\n  } catch {\n  }\n}\nasync function deleteItem(item) {\n  const yes = await confirmDialog(`Delete “${item.title || "this item"}”?`, "This cannot be undone. Collected analytics stay in your totals.", "Delete");\n  if (!yes) return;\n  clearTimeout(pending.get(`item${item.id}`)?.timer);\n  pending.delete(`item${item.id}`);\n  itemPatches.delete(item.id);\n  try {\n    await saving(() => api(`/items/${item.id}`, "DELETE"));\n    S.page.items = S.page.items.filter((i) => i !== item);\n    S.expanded.delete(item.id);\n    renderItems();\n    reloadPreview();\n  } catch {\n  }\n}\nfunction saveOrder() {\n  const list = $("#items");\n  const ids = [...list.querySelectorAll(".item")].map((r) => Number(r.dataset.id));\n  S.page.items = ids.map((id) => S.page.items.find((i) => i.id === id));\n  saving(() => api(`/pages/${S.page.id}/order`, "PUT", { ids })).then(reloadPreview).catch(() => {\n  });\n}\nfunction enableDrag(handle, row) {\n  const onMove = (e) => {\n    const list = row.parentElement;\n    if (e.clientY < 70) window.scrollBy(0, -12);\n    if (e.clientY > window.innerHeight - 70) window.scrollBy(0, 12);\n    const prev = row.previousElementSibling;\n    const next = row.nextElementSibling;\n    if (prev) {\n      const box = prev.getBoundingClientRect();\n      if (e.clientY < box.top + box.height / 2) {\n        row.after(prev);\n        return;\n      }\n    }\n    if (next) {\n      const box = next.getBoundingClientRect();\n      if (e.clientY > box.top + box.height / 2) list.insertBefore(next, row);\n    }\n  };\n  const onEnd = () => {\n    window.removeEventListener("pointermove", onMove);\n    window.removeEventListener("pointerup", onEnd);\n    window.removeEventListener("pointercancel", onEnd);\n    row.classList.remove("dragging");\n    const before = S.page.items.map((i) => i.id).join();\n    const after = [...row.parentElement.children].map((r) => r.dataset.id).join();\n    if (before !== after) saveOrder();\n  };\n  handle.addEventListener("pointerdown", (e) => {\n    if (e.button) return;\n    e.preventDefault();\n    row.classList.add("dragging");\n    window.addEventListener("pointermove", onMove);\n    window.addEventListener("pointerup", onEnd);\n    window.addEventListener("pointercancel", onEnd);\n  });\n  handle.addEventListener("keydown", (e) => {\n    const list = row.parentElement;\n    if (e.key === "ArrowUp" && row.previousElementSibling) list.insertBefore(row, row.previousElementSibling);\n    else if (e.key === "ArrowDown" && row.nextElementSibling) list.insertBefore(row.nextElementSibling, row);\n    else return;\n    e.preventDefault();\n    handle.focus();\n    saveOrder();\n  });\n}\nfunction designTab() {\n  const out = [topline("Design"), offlineBanner(), h("div", { id: "draft-bar" })];\n  const controls = h("div", { id: "design-controls", style: "display:flex;flex-direction:column;gap:16px" });\n  out.push(controls);\n  renderDesignControls(controls);\n  queueMicrotask(renderDraftBar);\n  return out.filter(Boolean);\n}\nfunction renderDraftBar() {\n  const bar = $("#draft-bar");\n  if (!bar) return;\n  if (!S.page.has_draft) {\n    bar.replaceChildren(h("div", { class: "banner clean" }, h("span", {}, "This design is live. Changes stay in draft until you publish them.")));\n    return;\n  }\n  const act = (label, cls, path, msg) => {\n    const b = h("button", {\n      class: `btn ${cls}`,\n      type: "button",\n      id: `draft-${path}`,\n      onclick: async () => {\n        b.disabled = true;\n        try {\n          await flushAll();\n          const saved = await saving(() => api(`/pages/${S.page.id}/${path}`, "POST", {}));\n          Object.assign(S.page, saved, { items: S.page.items });\n          S.bgMode = null;\n          reloadPreview();\n          renderTab();\n          toast(msg);\n        } catch {\n          b.disabled = false;\n        }\n      }\n    }, label);\n    return b;\n  };\n  bar.replaceChildren(h(\n    "div",\n    { class: "banner sticky" },\n    h("span", {}, h("strong", {}, "Unpublished draft. "), "Only visible in the preview."),\n    h("div", { class: "actions" }, act("Discard changes", "", "discard", "Changes discarded"), act("Publish", "primary", "publish", "Design published"))\n  ));\n}\nfunction setTheme(patch) {\n  S.page.theme = sanitizeTheme({ ...S.page.theme, ...patch });\n  S.page.has_draft = true;\n  applyThemeToPreview();\n  if (!document.querySelector("#draft-publish")) renderDraftBar();\n  const id = S.page.id;\n  const structural = "stickers" in patch || "bgVideo" in patch || "bgType" in patch;\n  schedule(`theme${id}`, async () => {\n    try {\n      await saving(() => api(`/pages/${id}`, "PUT", { theme: S.page.theme }));\n      if (structural) reloadPreview();\n    } catch {\n    }\n  }, 400);\n}\nvar segment = (label, value, options, onPick) => {\n  const row = h("div", { class: "seg", role: "group", "aria-label": label });\n  const paint = (v) => row.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === String(v))));\n  options.forEach(([v, text]) => row.append(h("button", { type: "button", "data-v": v, onclick: () => {\n    paint(v);\n    onPick(v);\n  } }, text)));\n  paint(value);\n  return h("div", { class: "field" }, h("span", { class: "field-label" }, label), row);\n};\nvar colorField = (id, label, key) => {\n  const value = S.page.theme[key] || (key === "titleColor" ? S.page.theme.textColor : "#000000");\n  const hex = h("input", {\n    id: `${id}-hex`,\n    type: "text",\n    "aria-label": `${label}, color code`,\n    value,\n    maxlength: 7,\n    oninput: (e) => {\n      if (/^#[0-9a-f]{6}$/i.test(e.target.value)) {\n        pick.value = e.target.value;\n        setTheme({ [key]: e.target.value });\n      }\n    }\n  });\n  const pick = h("input", { id, type: "color", value, oninput: (e) => {\n    hex.value = e.target.value;\n    setTheme({ [key]: e.target.value });\n  } });\n  return h("div", { class: "field" }, h("label", { for: id }, label), h("div", { class: "color" }, pick, hex));\n};\nvar rangeField = (id, label, key, min, max, unit = "px") => {\n  const out = h("output", { for: id }, `${S.page.theme[key]}${unit}`);\n  return h(\n    "div",\n    { class: "field" },\n    h("div", { class: "range-head" }, h("label", { for: id }, label), out),\n    h("input", { id, type: "range", min, max, value: S.page.theme[key], oninput: (e) => {\n      out.textContent = `${e.target.value}${unit}`;\n      setTheme({ [key]: Number(e.target.value) });\n    } })\n  );\n};\nvar fontSelect = (id, label, key) => {\n  const sel = h("select", { id, onchange: (e) => setTheme({ [key]: e.target.value }) }, Object.entries(FONTS).map(([k, f]) => h("option", { value: k }, f.name)));\n  sel.value = S.page.theme[key];\n  return h("div", { class: "field" }, h("label", { for: id }, label), sel);\n};\nvar themeSwitch = (id, title, key) => h(\n  "div",\n  { class: "toggle-row" },\n  h("strong", {}, title),\n  h("label", { class: "switch" }, h("input", { id, type: "checkbox", "aria-label": title, checked: !!S.page.theme[key], onchange: (e) => setTheme({ [key]: e.target.checked }) }), h("span", {}))\n);\nfunction renderDesignControls(root = $("#design-controls")) {\n  const t = S.page.theme;\n  const bgMode = S.bgMode || t.bgType;\n  const rerender = () => renderDesignControls();\n  const presets = h("div", { class: "presets" }, PRESETS.map((p) => {\n    const pt = p.theme;\n    const bg = pt.bgType === "gradient" ? `linear-gradient(${pt.gradientAngle}deg,${pt.bgColor},${pt.bgColor2})` : pt.bgColor;\n    const btn = (w) => h("i", { style: `width:${w};align-self:center;border-radius:${Math.min(pt.btnRadius, 8)}px;background:${pt.btnStyle === "outline" ? "transparent" : pt.btnStyle === "glass" ? "#ffffff40" : pt.btnColor};border:1.5px solid ${pt.btnAccent}` });\n    return h("button", {\n      class: "preset",\n      type: "button",\n      "data-preset": p.id,\n      "aria-pressed": "false",\n      onclick: () => {\n        S.bgMode = null;\n        setTheme({ ...pt, stickers: S.page.theme.stickers });\n        rerender();\n      }\n    }, h("div", { class: "swatch", style: `background:${bg}` }, btn("90%"), btn("90%")), h("b", {}, p.name));\n  }));\n  const needsImage = (v) => v === "image" || v === "blur";\n  const bgControls = [segment("Background type", bgMode, [["solid", "Solid"], ["gradient", "Gradient"], ["aurora", "Animated aurora"], ["pattern", "Pattern"], ["image", "Image"], ["blur", "Blurred"], ["video", "Video"]], (v) => {\n    S.bgMode = v;\n    if (!needsImage(v) && v !== "video" || needsImage(v) && t.bgImage || v === "video" && t.bgVideo) setTheme({ bgType: v });\n    rerender();\n  })];\n  if (bgMode === "solid") bgControls.push(colorField("bg-color", "Color", "bgColor"));\n  if (bgMode === "gradient") {\n    bgControls.push(segment("Shape", t.gradientType, [["linear", "Linear"], ["radial", "Radial"]], (v) => {\n      setTheme({ gradientType: v });\n      rerender();\n    }));\n    bgControls.push(h("div", { class: "grid-2" }, colorField("bg-color", "First color", "bgColor"), colorField("bg-color2", "Second color", "bgColor2")));\n    if (t.gradientType === "linear") bgControls.push(rangeField("bg-angle", "Direction", "gradientAngle", 0, 360, "°"));\n  }\n  if (bgMode === "aurora") {\n    bgControls.push(h("div", { class: "grid-2" }, colorField("bg-color", "Base color", "bgColor"), colorField("bg-color2", "Second color", "bgColor2")));\n    bgControls.push(colorField("bg-color3", "Light color", "bgColor3"));\n  }\n  if (bgMode === "pattern") {\n    bgControls.push(segment("Pattern", t.bgPattern, [["dots", "Dots"], ["grid", "Grid"], ["stripes", "Stripes"], ["checks", "Checks"]], (v) => setTheme({ bgPattern: v })));\n    bgControls.push(h("div", { class: "grid-2" }, colorField("bg-color", "Base color", "bgColor"), colorField("bg-color2", "Pattern color", "bgColor2")));\n  }\n  if (needsImage(bgMode)) {\n    bgControls.push(imageField({\n      id: "bg-upload",\n      label: "Background image",\n      wide: true,\n      value: t.bgImage,\n      options: { size: 1600 },\n      onChange: (v) => {\n        setTheme({ bgImage: v, bgType: v ? bgMode : "solid" });\n        if (!v) S.bgMode = "solid";\n        rerender();\n      }\n    }));\n    bgControls.push(rangeField("bg-overlay", "Darken", "bgOverlay", 0, 85, "%"));\n  }\n  if (bgMode === "video") {\n    bgControls.push(h(\n      "div",\n      { class: "field" },\n      h("label", { for: "bg-video" }, "Video link (.mp4 file on https)"),\n      h("input", { id: "bg-video", type: "text", placeholder: "https://…/video.mp4", value: t.bgVideo, onchange: (e) => {\n        const v = e.target.value.trim();\n        setTheme({ bgVideo: v, bgType: v ? "video" : "solid" });\n        if (v && !S.page.theme.bgVideo) toast("The link must start with https://", "error");\n      } })\n    ));\n    bgControls.push(h("p", { class: "hint" }, "Host the video elsewhere, because the site database cannot store it. Keep it short and light for phones."));\n    bgControls.push(rangeField("bg-overlay", "Darken", "bgOverlay", 0, 85, "%"));\n  }\n  bgControls.push(themeSwitch("bg-noise", "Subtle grain", "noise"));\n  const stickerList = h("div", { class: "rules" });\n  const saveStickers = (list) => {\n    setTheme({ stickers: list });\n  };\n  const drawStickers = () => {\n    const list = S.page.theme.stickers;\n    stickerList.replaceChildren(...list.map((k, i) => {\n      const update = (patch) => {\n        saveStickers(S.page.theme.stickers.map((x, j) => j === i ? { ...x, ...patch } : x));\n      };\n      const slider = (label, key, min, max) => {\n        const out = h("output", {}, String(k[key]));\n        return h("div", { class: "field" }, h("div", { class: "range-head" }, h("span", {}, label), out), h("input", { type: "range", min, max, value: k[key], "aria-label": label, oninput: (e) => {\n          out.textContent = e.target.value;\n          update({ [key]: Number(e.target.value) });\n        } }));\n      };\n      return h(\n        "div",\n        { class: "rule" },\n        k.image ? h("div", { class: "gallery-thumb", style: `background-image:url(/img/${k.image})` }) : h("input", { type: "text", "aria-label": "Emoji", maxlength: 8, value: k.emoji, oninput: (e) => update({ emoji: e.target.value }) }),\n        h("div", { class: "grid-2" }, slider("Horizontal", "x", 0, 100), slider("Vertical", "y", 0, 100), slider("Size", "size", 20, 220), slider("Rotation", "rot", -180, 180)),\n        h("button", { class: "btn", type: "button", onclick: () => {\n          saveStickers(S.page.theme.stickers.filter((_, j) => j !== i));\n          drawStickers();\n        } }, "Remove")\n      );\n    }));\n  };\n  drawStickers();\n  const stickerFile = h("input", { type: "file", id: "sticker-upload", accept: "image/png,image/webp,image/jpeg", style: "position:absolute;width:1px;height:1px;opacity:0", onchange: async (e) => {\n    const file = e.target.files[0];\n    if (!file) return;\n    try {\n      const payload = await compressImage(file, { size: 400, lossless: true });\n      const up = await saving(() => api("/images", "POST", payload));\n      saveStickers([...S.page.theme.stickers, { image: up.id, emoji: "", x: 12, y: 12, size: 90, rot: 0 }]);\n      drawStickers();\n    } catch (err) {\n      toast(err.message, "error");\n    }\n    e.target.value = "";\n  } });\n  root.replaceChildren(\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Themes"),\n      h("p", { class: "hint" }, "Start from a theme, then customize every detail for this brand."),\n      presets,\n      h("div", {}, h("button", { class: "btn", type: "button", id: "shuffle-theme", onclick: () => {\n        const p = PRESETS[Math.floor(Math.random() * PRESETS.length)];\n        S.bgMode = null;\n        setTheme({ ...p.theme, stickers: S.page.theme.stickers });\n        rerender();\n      } }, "Random theme"))\n    ),\n    h("section", { class: "card" }, h("h2", {}, "Background"), ...bgControls),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Text"),\n      h("div", { class: "grid-2" }, fontSelect("title-font", "Title font", "titleFont"), fontSelect("body-font", "Text and button font", "font")),\n      h("div", { class: "grid-2" }, colorField("text-color", "Text color", "textColor"), colorField("title-color", "Title color", "titleColor")),\n      rangeField("title-size", "Title size", "titleSize", 18, 48),\n      themeSwitch("title-upper", "Uppercase title", "titleUppercase")\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Logo and social icons"),\n      segment("Logo shape", t.avatarShape, [["circle", "Circle"], ["rounded", "Rounded"], ["square", "Square"], ["none", "Hidden"]], (v) => setTheme({ avatarShape: v })),\n      rangeField("avatar-size", "Logo size", "avatarSize", 56, 160),\n      segment("Social icon position", t.socialPosition, [["top", "Above links"], ["bottom", "Below links"]], (v) => setTheme({ socialPosition: v }))\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Buttons"),\n      segment("Style", t.btnStyle, [["fill", "Filled"], ["outline", "Outline"], ["glow", "Neon"], ["glass", "Glass"], ["hard", "Poster"]], (v) => setTheme({ btnStyle: v })),\n      h("div", { class: "grid-2" }, colorField("btn-color", "Button color", "btnColor"), colorField("btn-text", "Text color", "btnTextColor")),\n      colorField("btn-accent", "Border and accent color", "btnAccent"),\n      rangeField("btn-height", "Button height", "btnHeight", 48, 100),\n      themeSwitch("thumb-circle", "Round thumbnails", "thumbCircle"),\n      rangeField("btn-radius", "Corner radius", "btnRadius", 0, 40),\n      rangeField("btn-border", "Border width", "btnBorder", 0, 6),\n      segment("Shadow type", t.btnShadowType, [["none", "None"], ["soft", "Soft"], ["strong", "Strong"], ["hard", "Hard"]], (v) => setTheme({ btnShadowType: v })),\n      rangeField("btn-shadow", "Shadow intensity", "btnShadow", 0, 30),\n      colorField("btn-shadow-color", "Shadow color", "btnShadowColor"),\n      rangeField("btn-gap", "Button spacing", "btnGap", 4, 28),\n      rangeField("btn-font", "Text size", "btnFontSize", 12, 22),\n      themeSwitch("btn-upper", "Uppercase text", "btnUppercase")\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Sticker"),\n      h("p", { class: "hint" }, "Add emoji or your own images and position them on the page. They appear in the preview after saving."),\n      stickerList,\n      h(\n        "div",\n        { class: "inline-row" },\n        h("button", { class: "btn", type: "button", id: "add-sticker", onclick: () => {\n          saveStickers([...S.page.theme.stickers, { image: null, emoji: "🎉", x: 12, y: 12, size: 64, rot: 0 }]);\n          drawStickers();\n        } }, raw(UI.plus), "Emoji"),\n        stickerFile,\n        h("label", { class: "btn", for: "sticker-upload" }, raw(UI.image), "Image")\n      )\n    )\n  );\n}\nvar isoDay = (d) => {\n  const pad = (n) => String(n).padStart(2, "0");\n  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;\n};\nvar daysAgo = (n) => isoDay(new Date(Date.now() - n * 864e5));\nvar fmt = new Intl.NumberFormat("en-GB");\nfunction statsTab() {\n  S.statsQ || (S.statsQ = { page: String(S.page.id), range: "30", from: daysAgo(29), to: isoDay(/* @__PURE__ */ new Date()), gran: "day" });\n  const q = S.statsQ;\n  const body = h("div", { id: "stats-body", style: "display:flex;flex-direction:column;gap:16px" }, h("div", { class: "loading" }, "Loading analytics…"));\n  const brand = h(\n    "select",\n    { id: "stats-brand", onchange: (e) => {\n      q.page = e.target.value;\n      loadStats();\n    } },\n    h("option", { value: "all" }, "All brands"),\n    S.pages.map((p) => h("option", { value: p.id }, p.title))\n  );\n  brand.value = q.page;\n  const custom = h(\n    "div",\n    { class: "grid-2", style: "flex:1 1 280px", hidden: q.range !== "custom" },\n    h("div", { class: "field" }, h("label", { for: "stats-from" }, "From"), h("input", { id: "stats-from", type: "date", value: q.from, onchange: (e) => {\n      q.from = e.target.value;\n      loadStats();\n    } })),\n    h("div", { class: "field" }, h("label", { for: "stats-to" }, "To"), h("input", { id: "stats-to", type: "date", value: q.to, onchange: (e) => {\n      q.to = e.target.value;\n      loadStats();\n    } }))\n  );\n  const out = [\n    topline("Analytics"),\n    h("section", { class: "card" }, h(\n      "div",\n      { class: "filters" },\n      h("div", { class: "field" }, h("label", { for: "stats-brand" }, "Brand"), brand),\n      segment("Period", q.range, [["7", "7 days"], ["30", "30 days"], ["90", "90 days"], ["custom", "Custom"]], (v) => {\n        q.range = v;\n        custom.hidden = v !== "custom";\n        if (v !== "custom") {\n          q.from = daysAgo(Number(v) - 1);\n          q.to = isoDay(/* @__PURE__ */ new Date());\n        }\n        loadStats();\n      }),\n      segment("Group by", q.gran, [["day", "Day"], ["week", "Week"], ["month", "Month"]], (v) => {\n        q.gran = v;\n        if (S.stats) renderStats();\n      }),\n      custom\n    )),\n    body\n  ];\n  queueMicrotask(loadStats);\n  return out;\n}\nvar statsRequest = 0;\nasync function loadStats() {\n  const q = S.statsQ;\n  const body = $("#stats-body");\n  if (!body) return;\n  const ticket = ++statsRequest;\n  body.style.opacity = S.stats ? ".5" : "1";\n  try {\n    const params = new URLSearchParams({ page: q.page, from: q.from, to: q.to });\n    const data = await api(`/stats?${params}`);\n    if (ticket !== statsRequest) return;\n    S.stats = data;\n    renderStats();\n  } catch (e) {\n    body.replaceChildren(h("div", { class: "empty" }, e.message, " ", h("button", { class: "btn", onclick: loadStats }, "Try again")));\n  }\n  body.style.opacity = "1";\n}\nfunction bucketKey(day, gran) {\n  if (gran === "month") return day.slice(0, 7);\n  if (gran === "week") {\n    const d = /* @__PURE__ */ new Date(`${day}T00:00:00Z`);\n    d.setUTCDate(d.getUTCDate() - (d.getUTCDay() + 6) % 7);\n    return d.toISOString().slice(0, 10);\n  }\n  return day;\n}\nfunction bucketLabel(key, gran, long = false) {\n  if (gran === "month") return (/* @__PURE__ */ new Date(`${key}-01T00:00:00Z`)).toLocaleDateString("en-GB", { month: long ? "long" : "short", year: long ? "numeric" : "2-digit", timeZone: "UTC" });\n  const text = (/* @__PURE__ */ new Date(`${key}T00:00:00Z`)).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });\n  return gran === "week" && long ? `Week of ${text}` : text;\n}\nfunction buckets() {\n  const map = /* @__PURE__ */ new Map();\n  for (const d of S.stats.days) {\n    const key = bucketKey(d.day, S.statsQ.gran);\n    const b = map.get(key) || { key, views: 0, clicks: 0, uniques: 0 };\n    b.views += d.views;\n    b.clicks += d.clicks;\n    b.uniques += d.uniques;\n    map.set(key, b);\n  }\n  return [...map.values()];\n}\nfunction barList(rows, labelFn) {\n  const max = Math.max(1, ...rows.map((r) => r.value));\n  return h("div", { class: "bars" }, rows.map((r) => h(\n    "div",\n    { class: "bar-row" },\n    h("div", { class: "name", title: r.title }, labelFn(r)),\n    h("div", { class: "val" }, fmt.format(r.value)),\n    h("div", { class: "bar-track" }, h("i", { style: `width:${r.value / max * 100}%` }))\n  )));\n}\nvar SOURCE_NAMES = { diretto: "Direct or saved link", instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook", whatsapp: "WhatsApp", telegram: "Telegram", youtube: "YouTube", google: "Google", bing: "Bing", x: "X" };\nvar regionNames = (() => {\n  try {\n    return new Intl.DisplayNames(["en"], { type: "region" });\n  } catch {\n    return null;\n  }\n})();\nvar countryName = (code) => {\n  try {\n    return regionNames?.of(code) || code;\n  } catch {\n    return code;\n  }\n};\nfunction renderStats() {\n  const r = S.stats;\n  const body = $("#stats-body");\n  if (!body) return;\n  const ctr = r.totals.views ? r.totals.clicks / r.totals.views * 100 : 0;\n  const tile = (label, value, title) => h("div", { class: "tile", title }, h("span", {}, label), h("strong", {}, value));\n  const list = buckets();\n  const multi = S.statsQ.page === "all";\n  const empty = !r.totals.views && !r.totals.clicks;\n  const deviceTotal = r.devices.reduce((a, d) => a + d.hits, 0) || 1;\n  const blocks = [\n    h(\n      "div",\n      { class: "tiles" },\n      tile("Views", fmt.format(r.totals.views)),\n      tile("Unique visitors", fmt.format(r.totals.uniques), "Estimate: returning visitors count once per day."),\n      tile("Link clicks", fmt.format(r.totals.clicks)),\n      tile("Click rate", `${ctr.toLocaleString("en-GB", { maximumFractionDigits: 1 })}%`)\n    ),\n    empty ? h("div", { class: "empty" }, "No data for this period. Numbers appear when someone opens the public page.") : null,\n    empty ? null : h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Trend"),\n      h("div", { class: "legend" }, h("span", {}, h("i", { style: "background:var(--cobalt)" }), "Views"), h("span", {}, h("i", { style: "background:var(--red)" }), "Clicks")),\n      h("div", { class: "chart-wrap", id: "chart" }),\n      h("details", {}, h("summary", {}, "View as table"), h("div", { class: "table-wrap" }, h(\n        "table",\n        {},\n        h("thead", {}, h("tr", {}, h("th", {}, "Period"), h("th", {}, "Views"), h("th", {}, "Unique"), h("th", {}, "Clicks"), h("th", {}, "Rate"))),\n        h("tbody", {}, list.map((b) => h(\n          "tr",\n          {},\n          h("td", {}, bucketLabel(b.key, S.statsQ.gran, true)),\n          h("td", {}, fmt.format(b.views)),\n          h("td", {}, fmt.format(b.uniques)),\n          h("td", {}, fmt.format(b.clicks)),\n          h("td", {}, b.views ? `${(b.clicks / b.views * 100).toLocaleString("en-GB", { maximumFractionDigits: 1 })}%` : "–")\n        )))\n      )))\n    ),\n    empty ? null : h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Top links"),\n      r.items.length ? barList(r.items.slice(0, 15).map((i) => ({ title: i.title, page: i.page, value: i.clicks })), (i) => [i.title, multi ? h("small", {}, ` · ${i.page}`) : null].flat()) : h("p", { class: "hint" }, "No clicks in this period yet.")\n    ),\n    empty ? null : h(\n      "div",\n      { class: "two-col" },\n      h(\n        "section",\n        { class: "card" },\n        h("h2", {}, "Traffic sources"),\n        barList(r.sources.slice(0, 8).map((s) => ({ title: s.key, value: s.hits })), (s) => SOURCE_NAMES[s.title] || s.title),\n        h("p", { class: "hint" }, "Apps do not always report their source, so some visits may appear as Direct.")\n      ),\n      h(\n        "section",\n        { class: "card" },\n        h("h2", {}, "Devices"),\n        barList(r.devices.map((d) => ({ title: d.key, value: d.hits })), (d) => `${{ mobile: "Phone", tablet: "Tablet", desktop: "Desktop" }[d.title] || d.title} · ${Math.round(d.value / deviceTotal * 100)}%`)\n      )\n    ),\n    empty || !r.countries?.length ? null : h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Countries"),\n      barList(r.countries.slice(0, 12).map((c) => ({ title: c.key, value: c.hits })), (c) => countryName(c.title))\n    ),\n    h("p", { class: "hint" }, "Cookie-free analytics: IP addresses are not stored, and unique visitors use an anonymous code deleted daily. Your visits from this browser are not counted.")\n  ];\n  body.replaceChildren(...blocks.filter(Boolean));\n  if (!empty) drawChartInto();\n}\nfunction niceMax(v) {\n  if (v <= 4) return 4;\n  const mag = 10 ** Math.floor(Math.log10(v));\n  const n = v / mag;\n  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 4 ? 4 : n <= 5 ? 5 : 10) * mag;\n}\nfunction drawChartInto() {\n  const wrap = $("#chart");\n  if (!wrap) return;\n  const list = buckets();\n  const width = Math.max(280, wrap.clientWidth);\n  const height = 240;\n  const m = { top: 12, right: 12, bottom: 26, left: 40 };\n  const iw = width - m.left - m.right;\n  const ih = height - m.top - m.bottom;\n  const max = niceMax(Math.max(1, ...list.map((b) => Math.max(b.views, b.clicks))));\n  const x = (i) => m.left + (list.length < 2 ? iw / 2 : i / (list.length - 1) * iw);\n  const y = (v) => m.top + ih - v / max * ih;\n  const path = (k) => list.map((b, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(b[k]).toFixed(1)}`).join("");\n  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);\n  const labelEvery = Math.max(1, Math.ceil(list.length / Math.max(2, Math.floor(iw / 72))));\n  const showLabel = (i) => i === list.length - 1 ? (list.length - 1) % labelEvery === 0 || labelEvery === 1 : i % labelEvery === 0;\n  const dots = (k, color) => list.length <= 45 ? list.map((b, i) => `<circle cx="${x(i)}" cy="${y(b[k])}" r="${list.length > 14 ? 2 : 3.5}" fill="${color}" stroke="#fff" stroke-width="1.5"/>`).join("") : "";\n  const textColor = "#5a6078";\n  const grid = ticks.map((t) => `<line x1="${m.left}" x2="${width - m.right}" y1="${y(t)}" y2="${y(t)}" stroke="#e7e9f2"/><text x="${m.left - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11.5" fill="${textColor}">${fmt.format(Math.round(t))}</text>`).join("");\n  const labels = list.map((b, i) => !showLabel(i) ? "" : `<text x="${x(i)}" y="${height - 7}" text-anchor="${i === 0 && list.length > 1 ? "start" : i === list.length - 1 && list.length > 1 ? "end" : "middle"}" font-size="11.5" fill="${textColor}">${bucketLabel(b.key, S.statsQ.gran)}</text>`).join("");\n  wrap.innerHTML = `<svg viewBox="0 0 ${width} ${height}" height="${height}" role="img" aria-label="Andamento di visite e clic">${grid}${labels}\n    <path d="${path("views")}" fill="none" stroke="#2f4bc7" stroke-width="2" stroke-linejoin="round"/><path d="${path("clicks")}" fill="none" stroke="#d92b27" stroke-width="2" stroke-linejoin="round"/>\n    ${dots("views", "#2f4bc7")}${dots("clicks", "#d92b27")}\n    <line id="cross" y1="${m.top}" y2="${m.top + ih}" stroke="#12162b" stroke-opacity=".35" visibility="hidden"/>\n    <rect id="hit" x="${m.left}" y="${m.top}" width="${iw}" height="${ih}" fill="transparent"/></svg>`;\n  const tip = h("div", { class: "chart-tip", hidden: true });\n  wrap.append(tip);\n  const svgEl = wrap.querySelector("svg");\n  const cross = wrap.querySelector("#cross");\n  const move = (e) => {\n    const box = svgEl.getBoundingClientRect();\n    const px = (e.clientX - box.left) / box.width * width;\n    const i = list.length < 2 ? 0 : Math.max(0, Math.min(list.length - 1, Math.round((px - m.left) / iw * (list.length - 1))));\n    const b = list[i];\n    cross.setAttribute("x1", x(i));\n    cross.setAttribute("x2", x(i));\n    cross.setAttribute("visibility", "visible");\n    tip.hidden = false;\n    tip.replaceChildren(h("strong", {}, bucketLabel(b.key, S.statsQ.gran, true)), h("br"), `${fmt.format(b.views)} views · ${fmt.format(b.uniques)} unique · ${fmt.format(b.clicks)} clicks`);\n    const left = x(i) / width * box.width;\n    tip.style.left = `${Math.max(0, Math.min(box.width - tip.offsetWidth, left - tip.offsetWidth / 2))}px`;\n  };\n  const hit = wrap.querySelector("#hit");\n  hit.addEventListener("pointermove", move);\n  hit.addEventListener("pointerdown", move);\n  hit.addEventListener("pointerleave", () => {\n    tip.hidden = true;\n    cross.setAttribute("visibility", "hidden");\n  });\n}\nfunction contactsTab() {\n  const body = h("div", { id: "contacts-body", style: "display:flex;flex-direction:column;gap:16px" }, h("div", { class: "loading" }, "Loading contacts…"));\n  const load = async () => {\n    try {\n      const { contacts } = await api(`/pages/${S.page.id}/contacts`);\n      if (!contacts.length) {\n        body.replaceChildren(h("div", { class: "empty" }, "No contacts yet. Add a Form, or the Collect email lock on a link."));\n        return;\n      }\n      const csvCell = (v) => {\n        let x = String(v ?? "");\n        if (/^[=+\\-@\\t\\r]/.test(x)) x = `\'${x}`;\n        return `"${x.replace(/"/g, \'""\')}"`;\n      };\n      const exportBtn = h("button", { class: "btn primary", type: "button", id: "contacts-export", onclick: () => {\n        const rows = [["Email", "Name", "Message", "Source", "Date"], ...contacts.map((c) => [c.email, c.name, c.message, c.source, c.created_at])];\n        const blob = new Blob([`\\uFEFF${rows.map((r) => r.map(csvCell).join(",")).join("\\r\\n")}`], { type: "text/csv;charset=utf-8" });\n        const a = h("a", { href: URL.createObjectURL(blob), download: `contatti-${S.page.slug}.csv` });\n        a.click();\n        setTimeout(() => URL.revokeObjectURL(a.href), 2e3);\n      } }, "Export CSV");\n      body.replaceChildren(\n        h("div", { class: "topline" }, h("p", { class: "hint" }, `${fmt.format(contacts.length)} contacts`), exportBtn),\n        h("section", { class: "card" }, h("div", { class: "table-wrap" }, h(\n          "table",\n          {},\n          h("thead", {}, h("tr", {}, h("th", {}, "Email"), h("th", {}, "Name"), h("th", {}, "Message"), h("th", {}, "Source"), h("th", {}, "Date"), h("th", {}, ""))),\n          h("tbody", {}, contacts.map((c) => h(\n            "tr",\n            {},\n            h("td", {}, c.email),\n            h("td", {}, c.name),\n            h("td", { class: "wrap-cell" }, c.message),\n            h("td", {}, c.source),\n            h("td", {}, new Date(c.created_at).toLocaleDateString("en-GB")),\n            h("td", {}, h("button", { class: "icon-btn", type: "button", "aria-label": `Delete ${c.email}`, onclick: async () => {\n              if (!await confirmDialog(`Delete ${c.email}?`, "This contact will be permanently deleted.", "Delete")) return;\n              try {\n                await api(`/contacts/${c.id}`, "DELETE");\n                load();\n              } catch (e) {\n                toast(e.message, "error");\n              }\n            } }, raw(UI.trash)))\n          )))\n        ))),\n        h("p", { class: "hint" }, "This is personal data. Use it only for the stated purpose and delete anyone who asks.")\n      );\n    } catch (e) {\n      body.replaceChildren(h("div", { class: "empty" }, e.message));\n    }\n  };\n  queueMicrotask(load);\n  return [topline("Contacts"), body];\n}\nfunction settingsTab() {\n  const p = S.page;\n  const slug = h("input", { id: "page-slug", type: "text", value: p.slug, maxlength: 60, autocapitalize: "off", spellcheck: "false" });\n  const slugError = h("p", { class: "form-error", hidden: true, role: "alert" });\n  const saveSlug = h("button", {\n    class: "btn",\n    type: "button",\n    id: "save-slug",\n    onclick: async () => {\n      slugError.hidden = true;\n      saveSlug.disabled = true;\n      try {\n        const saved = await api(`/pages/${p.id}`, "PUT", { slug: slug.value });\n        Object.assign(S.page, saved, { items: S.page.items });\n        mergePageSummary(saved);\n        renderTab();\n        toast("Address updated. Links with the old address no longer work.");\n      } catch (e) {\n        slugError.textContent = e.message;\n        slugError.hidden = false;\n        saveSlug.disabled = false;\n      }\n    }\n  }, "Save address");\n  const homeBtn = p.is_home ? h("p", { class: "hint" }, "This brand opens at the main site address.") : h("button", { class: "btn", type: "button", onclick: async () => {\n    try {\n      await saving(() => api(`/pages/${p.id}/home`, "POST", {}));\n      S.pages = (await api("/pages")).pages;\n      Object.assign(S.page, S.pages.find((x) => x.id === p.id), { items: S.page.items });\n      syncBrandSelect();\n      renderTab();\n      toast("Home page updated");\n    } catch {\n    }\n  } }, "Use as home page");\n  const trackingUrl = `${pageUrl(p)}?utm_source=instagram`;\n  return [\n    topline("Settings"),\n    antibotCard(),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Publishing"),\n      h(\n        "div",\n        { class: "toggle-row" },\n        h("div", {}, h("strong", {}, "Page is live"), h("p", { class: "hint" }, "When off, visitors see a page-unavailable message.")),\n        h("label", { class: "switch" }, h("input", { id: "page-published", type: "checkbox", "aria-label": "Page is live", checked: !!p.published, disabled: !!p.is_home, onchange: async (e) => {\n          try {\n            await savePageNow({ published: e.target.checked });\n          } catch {\n            e.target.checked = !e.target.checked;\n          }\n        } }), h("span", {}))\n      ),\n      homeBtn\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Page address"),\n      h("div", { class: "field" }, h("label", { for: "page-slug" }, `${location.host}/`), slug),\n      slugError,\n      h("div", {}, saveSlug)\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Search and social preview"),\n      h(\n        "div",\n        { class: "field" },\n        h("label", { for: "page-seo" }, "Description"),\n        h("textarea", { id: "page-seo", maxlength: 300, placeholder: p.bio, value: p.seo_description, oninput: (e) => savePageSoon({ seo_description: e.target.value }) })\n      ),\n      h("p", { class: "hint" }, "If empty, the profile description is used. The shared image is the logo.")\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Track a campaign"),\n      h("p", { class: "hint" }, "Add utm_source to a link to see where visits come from. Example for an Instagram bio:"),\n      h("div", { class: "url-box" }, h("code", {}, trackingUrl), h("button", { class: "icon-btn", type: "button", "aria-label": "Copy tracking link", onclick: () => copyText(trackingUrl) }, raw(UI.copy)))\n    ),\n    importCard(),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Access"),\n      h("p", { class: "hint" }, "There is one administrator for now. Change the password in the ADMIN_PASSWORD secret on Cloudflare. All devices must then sign in again.")\n    ),\n    h(\n      "section",\n      { class: "card" },\n      h("h2", {}, "Delete this brand"),\n      h("p", { class: "hint" }, p.is_home ? "This is the home page. Choose another brand as home first." : "Permanently deletes this brand’s page, links, images and analytics."),\n      h("div", {}, h("button", { class: "btn danger", type: "button", disabled: !!p.is_home, onclick: deleteBrand }, raw(UI.trash), "Delete brand"))\n    )\n  ];\n}\nvar isGroupLink = (url) => /^https?:\\/\\/(chat\\.whatsapp\\.com|(www\\.)?whatsapp\\.com\\/channel)\\//i.test(url || "");\nasync function protectGroups(on) {\n  await flushAll();\n  const r = await saving(() => api(`/pages/${S.page.id}/protect-groups`, "POST", { protected: on }));\n  S.page = await api(`/pages/${S.page.id}`);\n  reloadPreview();\n  renderTab();\n  toast(`${r.changed} WhatsApp links ${on ? "protected" : "unprotected"}.`);\n}\nfunction antibotCard() {\n  const groups = S.page.items.filter((i) => isGroupLink(i.url));\n  const open = groups.filter((i) => !i.protected).length;\n  if (!S.turnstile) {\n    return h(\n      "section",\n      { class: "card antibot off", id: "antibot" },\n      h("div", { class: "antibot-head" }, h("h2", {}, "Anti-bot protection"), h("span", { class: "chip warn" }, "Not connected")),\n      h("p", { class: "hint" }, "Add a human check before visitors can see your WhatsApp group links. It keeps automated scanners out, but it cannot remove people already inside a group."),\n      h(\n        "ol",\n        { class: "steps" },\n        h("li", {}, "On Cloudflare, open Turnstile and choose Add widget."),\n        h("li", {}, `Use ${location.host} as the hostname and Managed as the mode.`),\n        h("li", {}, "In the esl-links project, open Settings, then Variables and Secrets."),\n        h("li", {}, "Add both keys as secrets: TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY."),\n        h("li", {}, "Reload this page. The protection button appears here.")\n      )\n    );\n  }\n  return h(\n    "section",\n    { class: "card antibot on", id: "antibot" },\n    h("div", { class: "antibot-head" }, h("h2", {}, "Anti-bot protection"), h("span", { class: "chip live" }, "Connected")),\n    h("p", { class: "hint" }, open ? `${open} of ${groups.length} WhatsApp links on this page are not protected.` : `All ${groups.length} WhatsApp links on this page are protected.`),\n    h(\n      "div",\n      { class: "inline-row" },\n      open ? h("button", { class: "btn primary", type: "button", id: "protect-groups", onclick: () => protectGroups(true).catch(() => {\n      }) }, "Protect all WhatsApp links") : null,\n      groups.length && !open ? h("button", { class: "btn", type: "button", id: "unprotect-groups", onclick: () => protectGroups(false).catch(() => {\n      }) }, "Remove protection") : null\n    )\n  );\n}\nfunction importCard() {\n  const status = h("p", { class: "hint", role: "status", id: "import-status" }, "Upload an import file. It replaces this brand’s current content.");\n  const input = h("input", { type: "file", id: "import-file", accept: "application/json,.json", style: "position:absolute;width:1px;height:1px;opacity:0" });\n  const copyImage = async (imageUrl, opts) => {\n    const res = await fetch(`/api/import/image?url=${encodeURIComponent(imageUrl)}`);\n    if (!res.ok) {\n      const info = await res.json().catch(() => ({}));\n      throw new Error(info.error || `Error ${res.status}`);\n    }\n    const payload = await compressImage(new File([await res.blob()], "image", { type: res.headers.get("content-type") || "image/png" }), opts);\n    return (await api("/images", "POST", payload)).id;\n  };\n  const importOne = async (pageId, label, data, totals) => {\n    status.textContent = `${label}: importing links…`;\n    const r = await saving(() => api(`/pages/${pageId}/import`, "POST", { replace: true, profile: data.profile, theme: data.theme, items: data.items }));\n    totals.created += r.created;\n    totals.skipped += r.skipped;\n    if (data.profile?.avatar_url) {\n      status.textContent = `${label}: importing logo…`;\n      try {\n        const id = await copyImage(data.profile.avatar_url, { size: 512, lossless: true });\n        await api(`/pages/${pageId}`, "PUT", { avatar_image: id });\n      } catch (e) {\n        totals.failed += 1;\n        totals.error = e.message;\n      }\n    }\n    const queue = [...r.images];\n    let done = 0;\n    const worker = async () => {\n      while (queue.length) {\n        const job = queue.shift();\n        try {\n          const id = await copyImage(job.image_url, { size: 700 });\n          await api(`/items/${job.id}`, "PUT", { thumb_image: id });\n        } catch (e) {\n          totals.failed += 1;\n          totals.error = e.message;\n        }\n        done += 1;\n        status.textContent = `${label}: importing images, ${done} of ${r.images.length}…`;\n      }\n    };\n    await Promise.all([worker(), worker(), worker()]);\n  };\n  input.addEventListener("change", async () => {\n    const file = input.files[0];\n    input.value = "";\n    if (!file) return;\n    let data;\n    try {\n      data = JSON.parse(await file.text());\n    } catch {\n      toast("This is not a valid import file.", "error");\n      return;\n    }\n    const brands = Array.isArray(data.brands) ? data.brands : Array.isArray(data.items) ? [{ ...data, slug: null }] : null;\n    if (!brands?.length) {\n      toast("This is not a valid import file.", "error");\n      return;\n    }\n    const names = brands.map((b) => b.profile?.title || S.page.title).join(", ");\n    const count = brands.reduce((n, b) => n + b.items.length, 0);\n    if (!await confirmDialog(`Import ${count} items into ${names}?`, "Links, sections and design of these brands will be replaced. Analytics stay. Brands that do not exist yet are created.", "Import")) return;\n    await flushAll();\n    const totals = { created: 0, skipped: 0, failed: 0, error: "" };\n    try {\n      let last = S.page.id;\n      for (const brand of brands) {\n        let target = brand.slug ? S.pages.find((p) => p.slug === brand.slug) : S.page;\n        if (!target) {\n          target = await api("/pages", "POST", { title: brand.profile.title, slug: brand.slug });\n          S.pages.push(target);\n        }\n        await importOne(target.id, brand.profile?.title || target.title, brand, totals);\n        if (brand.publish) await api(`/pages/${target.id}`, "PUT", { published: true });\n        last = target.id;\n      }\n      S.pages = (await api("/pages")).pages;\n      await selectPage(last);\n      toast(`Imported ${totals.created} items${totals.skipped ? `, ${totals.skipped} skipped` : ""}${totals.failed ? `. ${totals.failed} images not copied: ${totals.error}` : ""}.`, totals.failed ? "error" : "");\n    } catch (e) {\n      status.textContent = e.message;\n    }\n  });\n  return h(\n    "section",\n    { class: "card" },\n    h("h2", {}, "Import content"),\n    status,\n    h("div", {}, input, h("label", { class: "btn", for: "import-file" }, "Choose file"))\n  );\n}\nasync function deleteBrand() {\n  const p = S.page;\n  const yes = await confirmDialog(`Delete ${p.title}?`, "The page, links, images and analytics will be permanently deleted.", "Delete permanently");\n  if (!yes) return;\n  try {\n    await saving(() => api(`/pages/${p.id}`, "DELETE"));\n    S.pages = S.pages.filter((x) => x.id !== p.id);\n    S.tab = "content";\n    await selectPage(S.pages[0].id);\n    toast("Brand deleted");\n  } catch {\n  }\n}\nfunction confirmDialog(title, message, action) {\n  return new Promise((resolve) => {\n    const finish = (v) => {\n      d.close();\n      d.remove();\n      resolve(v);\n    };\n    const d = h(\n      "dialog",\n      { oncancel: (e) => {\n        e.preventDefault();\n        finish(false);\n      } },\n      h(\n        "div",\n        { class: "dialog-body" },\n        h("h2", {}, title),\n        h("p", { class: "hint" }, message),\n        h(\n          "div",\n          { class: "dialog-actions" },\n          h("button", { class: "btn", type: "button", onclick: () => finish(false) }, "Cancel"),\n          h("button", { class: "btn danger", type: "button", id: "confirm-yes", onclick: () => finish(true) }, action)\n        )\n      )\n    );\n    document.body.append(d);\n    d.showModal();\n  });\n}\nvar slugify = (v) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 40);\nfunction newBrandDialog() {\n  let edited = false;\n  const title = h("input", { id: "new-title", type: "text", required: true, maxlength: 120, oninput: () => {\n    if (!edited) slug.value = slugify(title.value);\n  } });\n  const slug = h("input", { id: "new-slug", type: "text", required: true, maxlength: 60, autocapitalize: "off", spellcheck: "false", oninput: () => {\n    edited = true;\n  } });\n  const error = h("p", { class: "form-error", hidden: true, role: "alert" });\n  const submit = h("button", { class: "btn primary", type: "submit", id: "new-submit" }, "Create brand");\n  const d = h(\n    "dialog",\n    {},\n    h(\n      "form",\n      {\n        method: "dialog",\n        onsubmit: async (e) => {\n          e.preventDefault();\n          submit.disabled = true;\n          error.hidden = true;\n          try {\n            const page = await api("/pages", "POST", { title: title.value, slug: slug.value });\n            S.pages.push(page);\n            d.close();\n            d.remove();\n            S.tab = "content";\n            await selectPage(page.id);\n            toast("Brand created. Add content and go live when ready.");\n          } catch (err) {\n            error.textContent = err.message;\n            error.hidden = false;\n            submit.disabled = false;\n          }\n        }\n      },\n      h("h2", {}, "New brand"),\n      h("div", { class: "field" }, h("label", { for: "new-title" }, "Name"), title),\n      h("div", { class: "field" }, h("label", { for: "new-slug" }, `Address: ${location.host}/`), slug),\n      error,\n      h(\n        "div",\n        { class: "dialog-actions" },\n        h("button", { class: "btn", type: "button", onclick: () => {\n          d.close();\n          d.remove();\n        } }, "Cancel"),\n        submit\n      )\n    )\n  );\n  document.body.append(d);\n  d.showModal();\n  title.focus();\n}\nasync function logout() {\n  await flushAll();\n  try {\n    await api("/logout", "POST", {});\n  } catch {\n  }\n  S.page = null;\n  showLogin();\n}\nboot();\n', "text/javascript; charset=utf-8"],
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

/* Anti-bot */
.antibot-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.antibot.off { border-color: #f0dc9b; }
.steps { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 6px; font-size: 14px; }

/* Power-ups */
.power { border-top: 1px solid var(--line); padding-top: 12px; display: block; }
.power > summary { margin-bottom: 0; }
.power[open] > summary { margin-bottom: 12px; }
.power > *:not(summary) + *:not(summary) { margin-top: 12px; }
.rules { display: flex; flex-direction: column; gap: 10px; }
.rule { display: flex; flex-direction: column; gap: 10px; padding: 12px; background: var(--paper); border-radius: 10px; }
.rule .btn { align-self: flex-start; }
.checks { display: flex; flex-wrap: wrap; gap: 12px; font-size: 14px; }
.inline-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.inline-row input { flex: 1 1 160px; min-width: 0; }
input[type=number] { width: 100%; min-height: 40px; padding: 8px 11px; border: 1px solid var(--line); border-radius: 8px; background: #fff; }
.gallery-admin { display: grid; grid-template-columns: repeat(auto-fill, minmax(88px, 1fr)); gap: 8px; }
.gallery-thumb { position: relative; aspect-ratio: 1; border-radius: 8px; background: var(--paper) center/cover no-repeat; min-height: 72px; }
.gallery-thumb .icon-btn { position: absolute; top: 4px; right: 4px; width: 28px; height: 28px; background: #fff; }
.add-row-more { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: -8px; }
.add-row-more .btn { padding-inline: 6px; font-size: 13.5px; white-space: normal; }
.wrap-cell { white-space: normal; min-width: 180px; text-align: left !important; }

/* Link layouts */
.layouts { display: grid; grid-template-columns: repeat(auto-fit, minmax(92px, 1fr)); gap: 8px; }
.layouts button { display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 10px 8px 8px; background: #fff; border: 2px solid var(--line); border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 600; }
.layouts button[aria-pressed="true"] { border-color: var(--cobalt); background: var(--cobalt-soft); }
.mini { display: flex; flex-direction: column; gap: 3px; width: 52px; height: 40px; justify-content: center; overflow: hidden; }
.mini i { display: block; background: #8d94ad; border-radius: 3px; }
.mini .m-row { height: 11px; }
.mini .m-img { flex: 1 1 0; min-height: 16px; }
.mini .m-line { height: 6px; }
.mini .m-two { display: flex; gap: 3px; flex: 1; }
.mini .m-slide { display: flex; gap: 3px; height: 34px; margin-left: -10px; width: 74px; }

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
.center-screen { min-height: 100vh; display: grid; place-items: center; padding: 24px 16px; background: var(--rail); }
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
  .add-row-more { grid-template-columns: repeat(2, minmax(0, 1fr)); }
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
