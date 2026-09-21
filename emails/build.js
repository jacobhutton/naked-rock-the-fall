#!/usr/bin/env node
/* ==========================================================================
   Rock the Fall launch emails — build script

     node emails/build.js

   Reads the copy from content.js, wraps it in one shared email template, and
   writes a ready-to-paste HTML file per email, per platform:

     emails/dist/drip/01-launch.html ...     Drip merge tags
     emails/dist/ghl/01-launch.html ...      GoHighLevel merge tags
     emails/dist/preview.html                all 8 side by side, desktop + mobile

   Edit copy in content.js. Edit the look (colors, spacing, components) here.
   No dependencies.
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const emails = require('./content.js');

const CONFIG = {
  site: 'https://rockthefall.nakedtraining.app',
  // Images are served by the live lander, so there is nothing to upload to the email platform.
  images: 'https://rockthefall.nakedtraining.app/images',
  // Appended to every link. The lander carries these through to the Stackt checkout.
  utm: { utm_source: 'email', utm_medium: 'email', utm_campaign: 'rock-the-fall' },
  address: 'Naked Training, 314 N 3050 E, Suite B1, St. George, UT 84790',
  links: {
    privacy: 'https://app.nakedtraining.app/privacy-policy',
  },
};

// Merge tags differ per platform. Everything else in the emails is identical.
const PLATFORMS = {
  drip: {
    firstName: '{{ subscriber.first_name | default: "there" }}',
    address: '{{ inline_postal_address }}',
    unsubscribe: (style) => `<a href="{{ unsubscribe_url }}" style="${style}">Unsubscribe</a>`,
  },
  ghl: {
    firstName: '{{contact.first_name}}',
    address: CONFIG.address,
    unsubscribe: () => '{{unsubscribe}}', // HighLevel swaps this for a full link
  },
  // Sample data, only used by dist/preview.html
  preview: {
    images: '../../../images', // local files, so the preview works before the new images are pushed live
    firstName: 'Sarah',
    address: CONFIG.address,
    unsubscribe: (style) => `<a href="#" style="${style}">Unsubscribe</a>`,
  },
};

/* ---------- Design tokens (same values as styles.css) ---------- */
const C = {
  page: '#F4EBDF',
  card: '#FBF6EF',
  white: '#FFFFFF',
  ink: '#1F1712',
  inkCard: '#2B211B',
  inkBorder: '#4A3B31',
  text: '#5A4A40',
  muted: '#6F5D52',
  border: '#E3D3C1',
  orange: '#C24E12',
  orangeText: '#9E3F0E',
  orangeLight: '#F08A4B',
  tagBg: '#F6E2D3',
  onDark: '#FBF6EF',
  onDarkBody: '#D8CABD',
  barMid: '#D9713A',
  barLow: '#A9552B',
  ctaAccent: '#FBE3D2',
};
// Fraunces + Figtree load in Apple Mail and a few others. Gmail and Outlook get Georgia / Arial.
const SERIF = "'Fraunces', Georgia, 'Times New Roman', serif";
const SANS = "'Figtree', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ==========================================================================
   Components. Each one returns a <tr> that drops into the 600px card.
   content.js gets these as `h`.
   ========================================================================== */
function helpers(email, platform) {
  const images = platform.images || CONFIG.images;
  const url = (hash = '') => {
    const params = new URLSearchParams({ ...CONFIG.utm, utm_content: email.id });
    return `${CONFIG.site}/?${params}${hash}`;
  };
  const href = (hash) => esc(url(hash));

  const row = (inner, { pt = 0, pb = 0, align = 'left' } = {}) =>
    `<tr><td class="px" align="${align}" style="padding:${pt}px 32px ${pb}px 32px;">${inner}</td></tr>`;

  const text = (size, color, extra = '') =>
    `margin:0;font-family:${SANS};font-size:${size}px;line-height:1.6;color:${color};${extra}`;

  const eyebrowStyle = (color = C.orangeText) =>
    `margin:0;font-family:${SANS};font-size:13px;line-height:1.4;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${color};`;

  const h = {
    url,

    /* Inline bits for use inside paragraphs */
    b: (t) => `<strong style="font-weight:700;color:${C.ink};">${t}</strong>`,
    em: (t, color = C.orange) => `<em style="font-style:italic;font-weight:500;color:${color};">${t}</em>`,
    a: (t, hash = '') => `<a href="${href(hash)}" style="color:${C.orangeText};font-weight:600;text-decoration:underline;">${t}</a>`,
    rulesLink: (t) => `<a href="${esc(CONFIG.site + '/rules.html')}" style="color:${C.orangeText};font-weight:600;text-decoration:underline;">${t}</a>`,

    /* Text blocks */
    hi: () => h.p(`Hi ${platform.firstName},`),
    p: (html, { pb = 18, size = 17, color = C.text, align = 'left', bold = false } = {}) =>
      row(`<p style="${text(size, bold ? C.ink : color, `text-align:${align};${bold ? 'font-weight:700;' : ''}`)}">${html}</p>`, { pb, align }),
    fine: (html) => h.p(html, { size: 13, color: C.muted, align: 'center', pb: 0 }),
    eyebrow: (t, { align = 'left', pb = 12 } = {}) => row(`<p style="${eyebrowStyle()}text-align:${align};">${t}</p>`, { pb, align }),
    pill: (t, { align = 'left' } = {}) =>
      row(`<span style="display:inline-block;padding:8px 15px;border-radius:999px;background:${C.tagBg};font-family:${SANS};font-size:12px;line-height:1.3;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${C.orangeText};">${t}</span>`, { pb: 18, align }),
    h1: (html, { align = 'left', pb = 24 } = {}) =>
      row(`<h1 class="h1" style="margin:0;font-family:${SERIF};font-size:40px;line-height:1.05;font-weight:600;letter-spacing:-0.02em;color:${C.ink};text-align:${align};">${html}</h1>`, { pb, align }),
    h2: (html, { pb = 12, pt = 10 } = {}) =>
      row(`<h2 style="margin:0;font-family:${SERIF};font-size:26px;line-height:1.15;font-weight:600;letter-spacing:-0.01em;color:${C.ink};">${html}</h2>`, { pb, pt }),
    sign: () =>
      row(`<p style="margin:0;font-family:${SERIF};font-size:30px;line-height:1.2;font-style:italic;font-weight:500;color:${C.ink};">Brooke</p>`, { pt: 6, pb: 8 }),
    ps: (html) =>
      row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-top:20px;border-top:1px solid ${C.border};"><p style="${text(16, C.text)}">${html}</p></td></tr></table>`, { pt: 16 }),
    spacer: (px = 16) => `<tr><td style="height:${px}px;line-height:${px}px;font-size:0;">&nbsp;</td></tr>`,

    /* Button. Always says "Join the Challenge". Outlook gets its padding from the mso spans. */
    buttonHtml: (hash = '', { dark = false, label = 'Join the Challenge' } = {}) => {
      const bg = dark ? C.ink : C.orange;
      return `<a class="btn" href="${href(hash)}" style="display:inline-block;padding:19px 36px;border-radius:999px;background:${bg};font-family:${SANS};font-size:17px;line-height:22px;font-weight:700;color:${C.white};text-decoration:none;text-align:center;mso-padding-alt:0;text-underline-color:${bg};"><!--[if mso]><i style="mso-font-width:250%;mso-text-raise:28pt" hidden>&emsp;</i><span style="mso-text-raise:14pt;"><![endif]-->${label}&nbsp;&rarr;<!--[if mso]></span><i style="mso-font-width:250%;" hidden>&emsp;&#8203;</i><![endif]--></a>`;
    },
    button: (hash = '', o = {}) => row(h.buttonHtml(hash, o), { pt: 8, pb: 26, align: o.align || 'left' }),

    /* Three outlined pills: the dates and the prize */
    facts: (items = ['Starts October 5', '5 winners, $2,000 each', 'Enrollment closes October 5']) =>
      row(items.map((t) =>
        `<span style="display:inline-block;margin:0 6px 8px 0;padding:8px 14px;border:1.5px solid ${C.border};border-radius:999px;font-family:${SANS};font-size:13px;line-height:1.3;font-weight:600;color:${C.ink};white-space:nowrap;">${t}</span>`).join(''), { pb: 18 }),

    img: ({ src, alt, w = 536, hash = '', radius = 24, pb = 28 }) =>
      row(`<a href="${href(hash)}" style="text-decoration:none;"><img src="${images}/${src}" width="${w}" alt="${esc(alt)}" style="display:block;width:100%;max-width:${w}px;height:auto;border:0;border-radius:${radius}px;"></a>`, { pb }),

    checklist: (items, { pb = 22 } = {}) =>
      row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${items.map((t) =>
        `<tr><td width="30" valign="top" style="padding:1px 0 12px 0;font-family:${SANS};font-size:17px;line-height:1.6;font-weight:700;color:${C.orange};">&#10003;</td><td valign="top" style="padding:0 0 12px 0;"><p style="${text(17, C.text)}">${t}</p></td></tr>`).join('')}</table>`, { pb }),

    steps: (items, { pb = 14 } = {}) =>
      row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${items.map((s, i) =>
        `<tr><td width="52" valign="top" style="padding:0 0 18px 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="38" height="38" align="center" valign="middle" bgcolor="${C.orange}" style="border-radius:999px;font-family:${SANS};font-size:16px;line-height:38px;font-weight:700;color:${C.white};">${i + 1}</td></tr></table></td><td valign="top" style="padding:0 0 18px 0;"><p style="margin:0 0 4px 0;font-family:${SERIF};font-size:21px;line-height:1.2;font-weight:600;color:${C.ink};">${s.title}</p><p style="${text(16, C.text)}">${s.text}</p></td></tr>`).join('')}</table>`, { pb }),

    /* Before/after card: photo, result tag, quote, name */
    result: ({ src, alt, tag, quote, name }) =>
      row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.white}" style="background:${C.white};border:1px solid ${C.border};border-radius:24px;">
<tr><td style="padding:12px 12px 0 12px;"><a href="${href()}" style="text-decoration:none;"><img src="${images}/${src}" width="510" alt="${esc(alt)}" style="display:block;width:100%;max-width:510px;height:auto;border:0;border-radius:14px;"></a></td></tr>
<tr><td style="padding:20px 24px 24px 24px;">
<span style="display:inline-block;padding:6px 12px;border-radius:8px;background:${C.tagBg};font-family:${SANS};font-size:14px;line-height:1.3;font-weight:700;color:${C.orangeText};">${tag}</span>
<p style="margin:14px 0 12px 0;font-family:${SERIF};font-size:20px;line-height:1.4;font-weight:500;color:${C.ink};">&ldquo;${quote}&rdquo;</p>
<p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.4;font-weight:700;color:${C.ink};">${name}</p>
</td></tr></table>`, { pb: 20 }),

    /* Dark card with a reel thumbnail on the left. Columns stack on phones. */
    method: ({ src, alt, eyebrow, title, body, diagram, hash = '#programs-title' }) =>
      row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.ink}" style="background:${C.ink};border-radius:24px;"><tr>
<td class="stack stack-img" width="42%" valign="top" style="padding:20px 0 20px 20px;"><a href="${href(hash)}" style="text-decoration:none;"><img src="${images}/${src}" width="205" alt="${esc(alt)}" style="display:block;width:100%;max-width:300px;height:auto;border:0;border-radius:16px;"></a></td>
<td class="stack" valign="middle" style="padding:22px 24px 24px 24px;">
<p style="${eyebrowStyle(C.orangeLight)}font-size:12px;">${eyebrow}</p>
<p style="margin:8px 0 10px 0;font-family:${SERIF};font-size:24px;line-height:1.15;font-weight:600;color:${C.onDark};">${title}</p>
<p style="${text(16, C.onDarkBody)}">${body}</p>
${diagram}
</td></tr></table>`, { pb: 16 }),

    repsDiagram: () => {
      const bar = (num, label, w, color) =>
        `<tr><td width="40" valign="middle" style="padding:5px 0;font-family:${SERIF};font-size:24px;line-height:1;font-weight:600;color:${C.orangeLight};">${num}</td><td valign="middle" style="padding:5px 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td width="${w}%" style="width:${w}%;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td height="12" bgcolor="${color}" style="height:12px;line-height:12px;font-size:0;border-radius:99px;background:${color};">&nbsp;</td></tr></table></td><td style="padding-left:10px;font-family:${SANS};font-size:14px;line-height:1.2;font-weight:600;color:${C.onDark};white-space:nowrap;">${label}</td></tr></table></td></tr>`;
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">${bar(6, 'Heavy', 25, C.orangeLight)}${bar(12, 'Moderate', 42, C.barMid)}${bar(25, 'Light', 60, C.barLow)}</table>`;
    },

    flowDiagram: () => {
      const step = (t, go) =>
        `<span style="display:inline-block;margin:0 0 6px 0;padding:8px 12px;border:1.5px solid ${go ? C.orange : C.inkBorder};border-radius:12px;background:${go ? C.orange : C.ink};font-family:${SANS};font-size:13px;line-height:1.2;font-weight:${go ? 700 : 600};color:${go ? C.white : C.onDark};white-space:nowrap;">${t}</span>`;
      const arrow = `<span style="display:inline-block;padding:0 5px;font-family:${SANS};font-size:14px;color:${C.orangeLight};">&rarr;</span>`;
      return `<p style="margin:16px 0 0 0;line-height:1.2;">${step('Hardest variation')}${arrow}${step('Easier')}${arrow}${step('Keep going', true)}</p>`;
    },

    /* Two side-by-side stat boxes that stack on phones */
    stats: (items) =>
      row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${items.map((s, i) =>
        `<td class="stack ${i === 0 ? 'gap-r' : 'gap-l'}" width="50%" valign="top" style="padding:${i === 0 ? '0 8px 0 0' : '0 0 0 8px'};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.tagBg}" style="background:${C.tagBg};border-radius:20px;"><tr><td style="padding:22px 22px 24px 22px;"><p style="margin:0;font-family:${SERIF};font-size:46px;line-height:1;font-weight:600;color:${C.orange};">${s.num}</p><p style="margin:8px 0 6px 0;font-family:${SANS};font-size:17px;line-height:1.3;font-weight:700;color:${C.ink};">${s.label}</p><p style="${text(15, C.text)}">${s.text}</p></td></tr></table></td>`).join('')}</tr></table>`, { pb: 24 }),

    /* Dark "5 winners" hero, same as the prize section on the lander */
    prizePanel: () =>
      row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.ink}" style="background:${C.ink};border-radius:28px;"><tr><td align="center" style="padding:44px 24px 46px 24px;">
<p style="${eyebrowStyle(C.orangeLight)}text-align:center;">The prize</p>
<p class="big" style="margin:14px 0 0 0;font-family:${SERIF};font-size:56px;line-height:1;font-weight:600;letter-spacing:-0.03em;color:${C.onDark};text-align:center;">5 winners.<br><em style="font-style:italic;font-weight:500;color:${C.orangeLight};">$2,000 each.</em></p>
</td></tr></table>`, { pb: 30 }),

    /* Orange closing card, same as the final CTA on the lander */
    closingPanel: ({ line }) =>
      row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.orange}" style="background:${C.orange};border-radius:28px;"><tr><td align="center" style="padding:44px 24px 40px 24px;">
<h1 class="h1" style="margin:0;font-family:${SERIF};font-size:42px;line-height:1.02;font-weight:600;letter-spacing:-0.02em;color:${C.white};text-align:center;">Fall doesn't wait.<br><em style="font-style:italic;font-weight:500;color:${C.ctaAccent};">Neither should you.</em></h1>
<p style="margin:18px 0 24px 0;font-family:${SANS};font-size:17px;line-height:1.5;font-weight:600;color:${C.white};text-align:center;">${line}</p>
${h.buttonHtml('#pricing', { dark: true })}
</td></tr></table>`, { pb: 30 }),

    qa: (q, a) =>
      row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:20px 0 2px 0;border-top:1px solid ${C.border};"><p style="margin:0 0 8px 0;font-family:${SERIF};font-size:22px;line-height:1.2;font-weight:600;color:${C.ink};">${q}</p><p style="${text(17, C.text)}">${a}</p></td></tr></table>`, { pb: 18 }),

    /* Both plans, stacked. Links go to the lander's pricing section, not straight to checkout,
       so anyone clicking an old email after October 5 sees "Enrollment is closed". */
    pricing: () => {
      const plan = ({ dark, kicker, name, price, intro, items }) => {
        const fg = dark ? C.onDark : C.ink;
        const body = dark ? C.onDarkBody : C.text;
        const check = dark ? C.orangeLight : C.orange;
        return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${dark ? C.ink : C.white}" style="background:${dark ? C.ink : C.white};border:1px solid ${dark ? C.ink : C.border};border-radius:24px;"><tr><td style="padding:26px 26px 22px 26px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="top"><p style="margin:0;font-family:${SANS};font-size:13px;line-height:1.4;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${dark ? C.orangeLight : C.muted};">${kicker}</p><p style="margin:6px 0 0 0;font-family:${SERIF};font-size:25px;line-height:1.15;font-weight:600;color:${fg};">${name}</p></td>
<td valign="top" align="right"><p style="margin:0;font-family:${SERIF};font-size:46px;line-height:1;font-weight:600;color:${fg};">${price}</p></td>
</tr></table>
${dark ? `<p style="margin:10px 0 0 0;"><span style="display:inline-block;padding:6px 12px;border-radius:999px;background:${C.orange};font-family:${SANS};font-size:11px;line-height:1.3;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${C.white};">Best value</span></p>` : ''}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
${intro ? `<tr><td colspan="2" style="padding:0 0 8px 0;"><p style="${text(16, fg, 'font-weight:600;')}">${intro}</p></td></tr>` : ''}
${items.map((t) => `<tr><td width="28" valign="top" style="padding:0 0 8px 0;font-family:${SANS};font-size:16px;line-height:1.5;font-weight:700;color:${check};">&#10003;</td><td valign="top" style="padding:0 0 8px 0;"><p style="${text(16, body, 'line-height:1.5;')}">${t}</p></td></tr>`).join('')}
</table></td></tr></table>`;
      };
      return row(
        plan({
          kicker: 'Challenge', name: 'Rock the Fall', price: '$50',
          items: ['8-week challenge', '10 weeks of app access', 'Every program, workout, and coaching video', '$300+ in guides and ebooks', `<strong style="font-weight:700;color:${C.ink};">Eligible for the $2,000 prize</strong>`],
        }) +
        `<div style="height:14px;line-height:14px;font-size:0;">&nbsp;</div>` +
        plan({
          dark: true, kicker: 'Yearly', name: 'Yearly Membership', price: '$149', intro: 'Everything in the challenge, plus:',
          items: ['12 months of full app access', 'Rock the Fall plus 2 more challenges (3 total)', `<strong style="font-weight:700;color:${C.onDark};">Eligible for the $2,000 prize</strong>`, 'Support all year long'],
        }), { pt: 6, pb: 24 });
    },
  };
  return h;
}

/* ==========================================================================
   Shared template
   ========================================================================== */
function render(email, platform) {
  const h = helpers(email, platform);
  const blocks = email.body(h).join('\n');
  // Pads the preview so inbox previews don't pull in body copy after the preview text.
  const pad = '&#847;&zwnj;&nbsp;'.repeat(90);
  const footLink = `color:${C.muted};text-decoration:underline;`;

  return `<!doctype html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(email.subject)}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<!-- Web fonts are hidden from Outlook, which otherwise drops the whole font stack to Times New Roman -->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&amp;family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&amp;display=swap" rel="stylesheet">
<!--<![endif]-->
<style>
  :root { color-scheme: light; supported-color-schemes: light; }
  body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table { border-collapse: separate; mso-table-lspace: 0; mso-table-rspace: 0; }
  img { -ms-interpolation-mode: bicubic; }
  a { color: ${C.orangeText}; }
  @media (max-width: 620px) {
    .outer { padding: 0 !important; }
    .card { border-radius: 0 !important; }
    .px { padding-left: 22px !important; padding-right: 22px !important; }
    .h1 { font-size: 34px !important; }
    .big { font-size: 44px !important; }
    .btn { display: block !important; padding-left: 12px !important; padding-right: 12px !important; }
    .stack { display: block !important; width: 100% !important; box-sizing: border-box !important; }
    .stack-img { padding: 20px 20px 0 20px !important; }
    .stack-img img { max-width: 100% !important; }
    .gap-r { padding: 0 0 12px 0 !important; }
    .gap-l { padding: 0 !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;font-size:1px;line-height:1px;color:${C.page};">${esc(email.preview)}${pad}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page};">
<tr><td class="outer" align="center" style="padding:28px 12px 0 12px;">
<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table class="card" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.card}" style="width:100%;max-width:600px;background:${C.card};border-radius:28px;">
<tr><td class="px" align="left" style="padding:30px 32px 26px 32px;"><a href="${esc(h.url())}" style="font-family:${SANS};font-size:13px;line-height:1.4;font-weight:700;letter-spacing:0.18em;color:${C.ink};text-decoration:none;">NAKED TRAINING</a></td></tr>
${blocks}
<tr><td style="height:30px;line-height:30px;font-size:0;">&nbsp;</td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
<tr><td align="center" style="padding:26px 24px 40px 24px;">
<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td align="center"><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:536px;">
<tr><td align="center" style="font-family:${SANS};font-size:13px;line-height:1.7;color:${C.muted};text-align:center;">
<p style="margin:0 0 10px 0;font-size:12px;font-weight:700;letter-spacing:0.18em;color:${C.ink};">NAKED TRAINING</p>
<p style="margin:0 0 10px 0;">You're getting this email because you signed up with Naked Training.<br>${platform.address}</p>
<p style="margin:0;">${platform.unsubscribe(footLink)} &nbsp;&middot;&nbsp; <a href="${esc(CONFIG.site + '/rules.html')}" style="${footLink}">Official rules</a> &nbsp;&middot;&nbsp; <a href="${esc(CONFIG.links.privacy)}" style="${footLink}">Privacy</a></p>
</td></tr></table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</body>
</html>
`;
}

/* ==========================================================================
   Preview page: every email at desktop and phone width, with its send details
   ========================================================================== */
function renderPreview() {
  const cards = emails.map((e) => `
<section>
  <div class="meta">
    <p class="when">${esc(e.send)}</p>
    <h2>${esc(e.n)}. ${esc(e.name)}</h2>
    <dl>
      <dt>Subject</dt><dd>${esc(e.subject)}</dd>
      <dt>Preview text</dt><dd>${esc(e.preview)}</dd>
      <dt>Backup subjects</dt><dd>${e.altSubjects.map(esc).join('<br>')}</dd>
      <dt>Files</dt><dd><a href="drip/${e.file}">drip/${e.file}</a> &nbsp; <a href="ghl/${e.file}">ghl/${e.file}</a></dd>
    </dl>
  </div>
  <div class="frames">
    <iframe title="${esc(e.name)} desktop" src="preview/${e.file}" width="660" height="900" loading="lazy"></iframe>
    <iframe title="${esc(e.name)} phone" src="preview/${e.file}" width="390" height="900" loading="lazy"></iframe>
  </div>
</section>`).join('\n');

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rock the Fall emails — preview</title>
<style>
  body { margin: 0; padding: 32px; background: #1F1712; color: #FBF6EF; font: 16px/1.5 -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; }
  h1 { margin: 0 0 4px; font: 600 32px/1.1 Georgia, serif; }
  .intro { margin: 0 0 40px; color: #D8CABD; }
  section { margin: 0 0 56px; padding-top: 32px; border-top: 1px solid #4A3B31; }
  .when { margin: 0; color: #F08A4B; font-weight: 700; font-size: 13px; letter-spacing: .12em; text-transform: uppercase; }
  h2 { margin: 4px 0 16px; font: 600 26px/1.15 Georgia, serif; }
  dl { display: grid; grid-template-columns: 150px 1fr; gap: 6px 16px; margin: 0 0 24px; max-width: 900px; }
  dt { color: #D8CABD; } dd { margin: 0; }
  a { color: #F08A4B; }
  .frames { display: flex; gap: 24px; align-items: flex-start; overflow-x: auto; }
  iframe { flex: none; border: 0; border-radius: 12px; background: #F4EBDF; }
</style></head>
<body>
<h1>Rock the Fall launch emails</h1>
<p class="intro">Sample name "Sarah" is for preview only. The files in drip/ and ghl/ carry the real merge tags.</p>
${cards}
</body></html>
`;
}

/* ---------- Build ---------- */
const dist = path.join(__dirname, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
for (const [name, platform] of Object.entries(PLATFORMS)) {
  const dir = path.join(dist, name);
  fs.mkdirSync(dir, { recursive: true });
  for (const email of emails) {
    const html = render(email, platform);
    fs.writeFileSync(path.join(dir, email.file), html);
    if (name === 'drip') console.log(`${email.file.padEnd(28)} ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB`);
  }
}
fs.writeFileSync(path.join(dist, 'preview.html'), renderPreview());
console.log(`\nBuilt ${emails.length} emails x ${Object.keys(PLATFORMS).length - 1} platforms -> emails/dist/  (open dist/preview.html to review)`);
