# Rock the Fall landing page

Static page for the Rock the Fall 8-week challenge. No framework, no build step.
Live at `rockthefall.nakedtraining.app` (Vercel).

## Files

| File | What it is |
|---|---|
| `index.html` | The page. All copy lives here. |
| `styles.css` | All styling. Design tokens (colors, type, spacing) are at the top. |
| `main.js` | Behavior. **`CONFIG` at the top is the only part you should need to edit.** |
| `rules.html` | Official challenge rules (sponsor: DBAB LLC). Filled in with Jake on Sep 19, 2026. Not yet reviewed by a lawyer. |
| `404.html` | Not-found page. |
| `vercel.json` | Security headers, cache headers, redirect placeholder. |
| `fonts/` | Fraunces + Figtree, self-hosted (latin subset, variable). |
| `images/` | Page images. WebP with a JPG fallback. |
| `legal/` | Rewritten Terms of Use and Privacy Policy for the app: `.docx` for attorney review (with a notes page), `.md` for pasting into the app. Built from `tools/legal/` (`npm i docx && node tools/legal/build.js`). Not deployed. |
| `tools/covers.sh`, `tools/covers/` | Builds the six guide cover images in `images/guides/` (see Images). Not deployed. |
| `rock-the-fall-brief.md`, `rock-the-fall-build-kit/` | The brief and design reference. Not deployed (see `.vercelignore`). |

## Preview locally

```
python3 -m http.server 4173
```

Then open http://localhost:4173

Useful URLs while reviewing:

- `?placeholders=1` highlights every `[bracketed]` placeholder still on the page
- `?preview=closed` shows the page as it looks after enrollment closes
- `?v=method` / `?v=simple` forces the programs-section variant (see below)

## Programs section variants

The "Programs for every goal and setting" section has two versions. **Simple** (the default) is the six-card grid. **Method** adds the dark 6-12-25 and mechanical advantage block with the two reels above the grid. Method is shown only to clicks from the reel ads and the "How 6-12-25 works" email: when `utm_content` or `utm_term` matches `reel`, `_RL_`, `61225`, `mech` or `e2-program` (the ads are named `RTF_RL_61225` and `RTF_RL_MechanicalAdvantage`; the email id is `e2-program`). Emails can also ask for it explicitly: set `variant: 'method'` on the email in `emails/content.js` and the build adds `v=method` to its lander links. The rule lives in the small inline `<script>` in the `<head>` of `index.html`; it runs before the page paints, sets `data-programs` on `<html>`, and the choice sticks for the tab in `sessionStorage` (`rtf_programs`). `main.js` removes the other variant's elements at boot, so the reels never load for simple.

## Before launch: fill in `CONFIG` (top of `main.js`)

- `checkout.challenge` / `checkout.yearly`: the two Stackt checkout URLs. Until these are real URLs the pricing buttons just stay on the page.
- `tracking.gtmId` **or** `tracking.pixelId`: fill in one. If the GTM container already loads the Meta Pixel, leave `pixelId` alone or events double-fire.
- `reels.*.src` and `.poster`: either a direct MP4 URL (720p, under ~5MB; lightest option) or a Vimeo link like `https://vimeo.com/123456789`. Export the reels as 9:16. Until set, the dark placeholder frames show.
- `deadline`: currently 11:59 PM Mountain, Oct 5, 2026.

Everything else still to fill is `[bracketed]` in `index.html`. Search for `[` or use `?placeholders=1`.

## Tracking

- `ViewContent` fires on page load. `InitiateCheckout` fires on the two pricing buttons (with plan, value, currency). Both carry `rtf_variant` (`simple` or `method`), so the programs-section variant can be reported from GTM later without touching the page.
- Both go to the GTM `dataLayer` as custom events named exactly `ViewContent` and `InitiateCheckout`. If `pixelId` is set they also go straight to `fbq`.
- `Purchase` is never fired here. It belongs on the checkout confirmation (firing it here double-counts with CAPI).
- `utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid, gclid` are saved for the session and appended to the checkout URLs on click. Params already on the checkout URL are never overwritten. Stackt checkout needs to read and store them for attribution to survive.

## After enrollment closes

Automatic at the deadline: the countdown becomes "Enrollment is closed", the $50 button is replaced with a closed notice, and the $149 yearly card stays live with the prize line removed. The replacement copy is in `data-closed-text` attributes in `index.html`.

## Images

Current images are low-res crops from the design. To swap in originals: drop them in `images/originals/` (not deployed) and re-export as WebP + JPG at the same filenames. Hero wants ~1200px wide, before/afters ~800px wide. Add an `images/og.jpg` at 1200x630 for link previews.

**Guide covers.** The six book covers in "Everything you need" are `images/guides/<slug>-260.webp`, `<slug>-520.webp` and `<slug>.jpg`, built by `tools/covers.sh`. Four are page 1 of the guide PDFs. The Fast Food Guide PDF has no cover page and the Perfect Week Workbook is a landscape slide, so those two are HTML pages in `tools/covers/` (the guide's drive-thru photo for Fast Food, a Brooke shoot photo for Perfect Week, Naked purple, the Mac's Futura Condensed ExtraBold) rendered by headless Chrome. To rebuild: copy the PDFs (named as at the top of the script) and the two photos into `images/originals/guides/` (gitignored, not deployed), `brew install poppler webp`, then run `tools/covers.sh`. The post-purchase emails use the same JPGs from the live site.

## Deploy

1. Push this folder to a Git repo and import it in Vercel (Framework preset: **Other**, no build command, output directory: root).
2. Vercel project → Settings → Domains → add `rockthefall.nakedtraining.app`, then add the CNAME record Vercel shows you at the DNS host for nakedtraining.app.
3. Every push gets a preview URL. `main` is production.

When the page moves onto the main site, add a redirect to `vercel.json`:

```json
"redirects": [
  { "source": "/(.*)", "destination": "https://nakedtraining.app/rock-the-fall", "permanent": false }
]
```

## Design notes

Three colors differ from the brief on purpose, because the brief's values failed its own 4.5:1 contrast rule:

- Muted text: `#8A776A` → `#6F5D52`
- Small orange text on cream (eyebrows, labels): `#C24E12` → `#9E3F0E`. Buttons and headline accents are still `#C24E12`.
- Body text on the orange final CTA card: `#FDEEE4` → `#FFFFFF`
