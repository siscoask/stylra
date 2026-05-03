/* ============================================================
   Stylra — transforms.js
   All Unicode name transformation logic
   ============================================================ */

'use strict';

// ── Unicode Character Maps ──────────────────────────────────────
const CHAR_MAPS = {
  bold: {
    upper: [...'𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭'],
    lower: [...'𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇'],
    digits:[...'𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'],
  },
  italic: {
    upper: [...'𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡'],
    lower: [...'𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻'],
    digits:[...'0123456789'],
  },
  boldItalic: {
    upper: [...'𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕'],
    lower: [...'𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯'],
    digits:[...'0123456789'],
  },
  cursive: {
    upper: [...'𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'],
    lower: [...'𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'],
    digits:[...'0123456789'],
  },
  cursiveBold: {
    upper: [...'𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩'],
    lower: [...'𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'],
    digits:[...'0123456789'],
  },
  fraktur: {
    upper: [...'𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ'],
    lower: [...'𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'],
    digits:[...'0123456789'],
  },
  double: {
    upper: [...'𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ'],
    lower: [...'𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'],
    digits:[...'𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡'],
  },
  circled: {
    upper: [...'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'],
    lower: [...'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'],
    digits:[...'⓪①②③④⑤⑥⑦⑧⑨'],
  },
  squared: {
    upper: [...'🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉'],
    lower: [...'🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉'],
    digits:[...'0123456789'],
  },
  smallcaps: {
    upper: [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
    lower: [...'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'],
    digits:[...'0123456789'],
  },
  fullwidth: {
    upper: [...'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'],
    lower: [...'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'],
    digits:[...'０１２３４５６７８９'],
  },
  flip: {
    upper: [...'∀qƆpƎℲפHIſʞ˥WNOdQɹS┴∩ΛMXʎZ'],
    lower: [...'ɐqɔpǝɟɓɥᴉɾʞlɯuodbɹsʇnʌʍxʎz'],
    digits:[...'0ƖᄅƐㄣϛ9ㄥ86'],
  },
};

const ALPHA_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHA_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS      = '0123456789';

// Zalgo combining characters
const ZALGO_UP   = ['̍','̎','̄','̅','̿','̑','̆','̐','͒','͗','͑','̇','̈','̊','͂','̓'];
const ZALGO_MID  = ['̣','̤','̥','̦','̩','̪','̫','̬','̭','̮','̯','̰','̱','̲','̳'];
const ZALGO_DOWN = ['̖','̗','̘','̙','̜','̝','̞','̟','̠','̤','̥','̦','̩','̪'];

function randArr(arr, n = 1) {
  let s = '';
  for (let i = 0; i < n; i++) s += arr[Math.floor(Math.random() * arr.length)];
  return s;
}

// ── Core Transform Engine ───────────────────────────────────────
function applyMap(text, mapKey) {
  const map = CHAR_MAPS[mapKey];
  if (!map) return text;

  return [...text].map(ch => {
    const ui = ALPHA_UPPER.indexOf(ch.toUpperCase());
    if (ui === -1) {
      // Try digit
      const di = DIGITS.indexOf(ch);
      if (di !== -1 && map.digits) return map.digits[di] || ch;
      return ch; // passthrough (handles ọ, ẹ, ṣ etc. gracefully)
    }
    const isUpper = ch === ch.toUpperCase() && ch !== ch.toLowerCase();
    return (isUpper ? map.upper : map.lower)[ui] || ch;
  }).join('');
}

// ── Individual Transforms ───────────────────────────────────────
function transformNormal(text)      { return text; }
function transformBold(text)        { return applyMap(text, 'bold'); }
function transformItalic(text)      { return applyMap(text, 'italic'); }
function transformBoldItalic(text)  { return applyMap(text, 'boldItalic'); }
function transformCursive(text)     { return applyMap(text, 'cursive'); }
function transformCursiveBold(text) { return applyMap(text, 'cursiveBold'); }
function transformFraktur(text)     { return applyMap(text, 'fraktur'); }
function transformDouble(text)      { return applyMap(text, 'double'); }
function transformCircled(text)     { return applyMap(text, 'circled'); }
function transformSquared(text)     { return applyMap(text, 'squared'); }
function transformSmallcaps(text)   { return applyMap(text, 'smallcaps'); }
function transformFullwidth(text)   { return applyMap(text, 'fullwidth'); }
function transformFlip(text)        { return applyMap(text, 'flip').split('').reverse().join(''); }

function transformZalgo(text, intensity = 'medium') {
  const counts = { low: [1,0,1], medium: [1,1,1], high: [2,2,2] };
  const [u, m, d] = counts[intensity] || counts.medium;
  return [...text].map(ch => {
    if (ch === ' ') return ch;
    return ch + randArr(ZALGO_UP, u) + randArr(ZALGO_MID, m) + randArr(ZALGO_DOWN, d);
  }).join('');
}

// Aesthetic spacing — adds thin spaces between chars
function transformSpaced(text) {
  return [...text].join('\u2009');
}

// Strikethrough — combining strikethrough
function transformStrike(text) {
  return [...text].map(ch => ch + (ch !== ' ' ? '̶' : '')).join('');
}

// Underline — combining underline
function transformUnderline(text) {
  return [...text].map(ch => ch + (ch !== ' ' ? '̲' : '')).join('');
}

// Wave — alternates upper/lower case
function transformWave(text) {
  return [...text].map((ch, i) =>
    i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
  ).join('');
}

// Dots — adds middle dot between chars
function transformDots(text) {
  return [...text].join('·');
}

// Vaporwave aesthetic — fullwidth + spaces
function transformVaporwave(text) {
  return [...text.toUpperCase()].map(ch => {
    const ui = ALPHA_UPPER.indexOf(ch);
    if (ui !== -1) return CHAR_MAPS.fullwidth.upper[ui];
    return ch;
  }).join('\u3000');
}

// ── Transform Registry ──────────────────────────────────────────
const TRANSFORMS = {
  normal:     { fn: transformNormal,     label: 'Normal',       preview: 'Aa' },
  bold:       { fn: transformBold,       label: 'Bold',         preview: '𝗔𝗮' },
  italic:     { fn: transformItalic,     label: 'Italic',       preview: '𝘈𝘢' },
  boldItalic: { fn: transformBoldItalic, label: 'Bold Italic',  preview: '𝘼𝙖' },
  cursive:    { fn: transformCursive,    label: 'Cursive',      preview: '𝒜𝒶' },
  cursiveBold:{ fn: transformCursiveBold,label: 'Script Bold',  preview: '𝓐𝓪' },
  fraktur:    { fn: transformFraktur,    label: 'Fraktur',      preview: '𝔄𝔞' },
  double:     { fn: transformDouble,     label: 'Double',       preview: '𝔸𝕒' },
  circled:    { fn: transformCircled,    label: 'Circled',      preview: 'Ⓐⓐ' },
  squared:    { fn: transformSquared,    label: 'Squared',      preview: '🄰' },
  smallcaps:  { fn: transformSmallcaps,  label: 'Small Caps',   preview: 'ᴀʙ' },
  fullwidth:  { fn: transformFullwidth,  label: 'Fullwidth',    preview: 'Ａ' },
  flip:       { fn: transformFlip,       label: 'Flipped',      preview: 'ɐq' },
  spaced:     { fn: transformSpaced,     label: 'Spaced',       preview: 'A a' },
  wave:       { fn: transformWave,       label: 'Wave',         preview: 'aAbB' },
  dots:       { fn: transformDots,       label: 'Dots',         preview: 'A·B' },
  vaporwave:  { fn: transformVaporwave,  label: 'Vaporwave',    preview: 'Ａ Ｂ' },
  strike:     { fn: transformStrike,     label: 'Strike',       preview: 'Ā̶B̶' },
  underline:  { fn: transformUnderline,  label: 'Underline',    preview: 'A̲B̲' },
  zalgo:      { fn: t => transformZalgo(t, 'medium'), label: 'Zalgo', preview: 'Z̷a̴' },
};

// ── Main export ──────────────────────────────────────────────────
function applyTransform(text, transformKey) {
  if (!text) return '';
  const t = TRANSFORMS[transformKey];
  if (!t) return text;
  return t.fn(text);
}

// Username-friendly slug (strips diacritics for availability check)
function toUsernameSlug(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .toLowerCase()
    .slice(0, 30);
}

// Generate handle variants
function generateVariants(name) {
  const base = toUsernameSlug(name);
  if (!base) return [];
  return [
    base,
    `${base}_`,
    `_${base}`,
    `its${base}`,
    `x${base}`,
    `${base}x`,
    `${base}hq`,
    `the${base}`,
    `${base}official`,
    `${base}00`,
  ].slice(0, 8);
}

export {
  TRANSFORMS,
  applyTransform,
  toUsernameSlug,
  generateVariants,
  transformZalgo,
};
