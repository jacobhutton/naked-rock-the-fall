# Rock the Fall Landing Page — Build Brief

Build a single, fast, mobile-first sales page for **Rock the Fall**, Naked Training's 8-week challenge coached by Brooke Ence. The approved desktop design is in `reference/`. Match it closely, then make it fully responsive.

---

## 1. Context

- **Brand:** Naked Training (coach: Brooke Ence)
- **Audience:** women 35–55, mostly arriving from Meta ads on their phones
- **Offer:** 8-week challenge starting October 5. Buyers get app access immediately. Enrollment closes October 5.
- **Prize:** 5 winners, $2,000 each, chosen by transformation and community participation. Yearly members are fully eligible.
- **Pricing:** $50 challenge (10 weeks of app access) or $149 yearly membership (includes 3 challenges)
- **Primary CTA:** "Join the Challenge" — use this exact wording on every button
- **Do not mention the end date** of the challenge anywhere.

---

## 2. Deliverable and stack

- A single static page deployed to Vercel on a subdomain (see section 11): `index.html` with one CSS file and one small JS file (or everything inlined, if that's easier to embed).
- No framework and no build step unless there's a clear reason. It should be simple to host or paste into a page builder.
- All images in `/images`, all videos loaded from external hosting (see section 7).
- Keep every placeholder in `[brackets]` visible so they're easy to find and replace.

---

## 3. Reference files

`reference/` contains the approved design as three HTML files, split only because the page was too tall for one canvas frame. Read them top to bottom as one page:

1. `1-hero-to-brooke.html` — nav, hero, marquee, transformations, problem/plan, meet Brooke
2. `2-programs-reels-included.html` — train your way (with reels), everything included, app
3. `3-prize-to-final-cta.html` — prize, mini-challenges, how it works, more results, pricing, guarantee, FAQ, final CTA, footer

**How to use them:**
- They are the **visual source of truth** for layout, spacing, color, type, and copy.
- They are **not production code**. They use fixed 1440px widths, inline styles, and a design-tool wrapper (`<x-dc>`, `support.js`, `data-dc-script`). Rebuild the page cleanly with semantic HTML, reusable classes, and responsive CSS. Do not copy the wrapper or the fixed sizes.
- `reference/images/` contains low-resolution crops from a screenshot. Use them during the build, and swap in full-resolution originals before launch.

---

## 4. Design system

### Colors (CSS custom properties)

```css
:root {
  --bg: #FBF6EF;            /* page background */
  --bg-alt: #F4EBDF;        /* alternating sections, tinted cards */
  --ink: #1F1712;           /* headlines, dark sections */
  --ink-card: #2B211B;      /* cards inside dark sections */
  --ink-border: #4A3B31;    /* borders inside dark sections */
  --text: #5A4A40;          /* body text */
  --text-muted: #8A776A;    /* captions, disclaimers */
  --border: #E3D3C1;        /* light borders */
  --border-soft: #EDE2D4;   /* nav divider, subtle card borders */
  --orange: #C24E12;        /* buttons, accents, eyebrows */
  --orange-hover: #9E3F0E;
  --orange-light: #F08A4B;  /* accents on dark backgrounds only */
  --tag-bg: #F6E2D3;        /* light orange tags and pills */
  --on-dark: #FBF6EF;       /* headline text on dark */
  --on-dark-body: #D8CABD;  /* body text on dark */
}
```

Do not add other colors, gradients, or purple. Keep all text at 4.5:1 contrast or better.

### Typography

Load from Google Fonts: **Fraunces** (500, 600, and 500 italic) and **Figtree** (400, 500, 600, 700).

| Role | Font | Desktop | Mobile |
|---|---|---|---|
| Hero headline | Fraunces 600, line-height 0.98, letter-spacing -0.03em | 92px | 48px |
| Section headline (h2) | Fraunces 600, line-height 1.05, letter-spacing -0.02em | 58px | 38px |
| Card/sub headline (h3) | Fraunces 600 | 28–44px | 26–32px |
| Intro paragraph | Figtree 400, line-height 1.55 | 21px | 18px |
| Body | Figtree 400, line-height 1.6 | 18px | 17px |
| Eyebrow label | Figtree 700, uppercase, letter-spacing 0.14em | 14px | 13px |
| Button | Figtree 700 | 18px | 17px |

- **Accent words:** inside headlines, key phrases are Fraunces *italic 500* in `--orange` (or `--orange-light` on dark). Examples: "Let's get to *work.*", "You need a plan." Follow the reference for which words are accented.
- Use fluid sizing (`clamp()`) between the mobile and desktop values.
- **Never** use body text smaller than 16px on any screen.

### Spacing and shape

- Content max width: **1160px**, centered. Side padding: 140px desktop, 20–24px mobile.
- Section padding: **112px** top and bottom desktop, 64–72px mobile.
- Corner radius: cards 20–24px, large cards 28–32px, buttons and pills fully rounded.
- Light cards: white or `--bg` background with a 1px `--border` border. Minimal shadows, only where shown in the reference.

### Components

- **Primary button:** pill, 62px tall, 34px horizontal padding, `--orange` background, white text, `--orange-hover` on hover. On dark orange backgrounds the button is `--ink`. Minimum tap target 44px.
- **Date badge:** pill with a 1.5px `--border` outline, calendar icon, "Starts October 5".
- **Eyebrow:** small uppercase orange label above each section headline.
- **Check list:** orange stroke checkmark icon + text. The "without" list uses a muted X icon.
- **Tag:** `--tag-bg` background, `--orange-hover` text, 700 weight, small rounded rectangle.
- **Icons:** simple inline stroke SVGs. No emoji, no icon fonts.

---

## 5. Page sections and copy

Build the sections in this order. Copy below is final unless it's in [brackets].

### 5.1 Nav
- Left: "NAKED TRAINING" wordmark (Figtree 700, letter-spacing 0.2em). Replace with the logo file if provided.
- Right: small "Join the Challenge" button that scrolls to pricing.
- Sticky on scroll, with a thin bottom border and the page background color.

### 5.2 Hero
Two columns on desktop (text left, photo right). On mobile: headline, subhead, and buttons first, photo below.

- Pill: **Rock the Fall · 8-Week Challenge**
- Headline: **Fall is here. Let's get to *work.***
- Subhead: Eight weeks of training with Brooke Ence, a community that shows up with you, and a chance to win $2,000. Finish the year stronger than you started it.
- Buttons: **Join the Challenge →** + date badge **Starts October 5**
- Proof line: small overlapping avatar circles + "Join **[X,000+] women** who've trained with Brooke"
- Photo: `images/hero.jpg`, rounded 28px, with a small white label card overlapping the bottom-left corner: "Your coach / **Brooke Ence**"

### 5.3 Marquee
Dark `--ink` band, uppercase text scrolling slowly right to left, orange ✦ separators:
"5 winners, $2,000 each ✦ Starts October 5 ✦ Train with any program ✦" (repeat). Pause the animation for `prefers-reduced-motion`.

### 5.4 Transformations
- Eyebrow: Real results
- Headline: **What eight weeks *actually* looks like.**
- Subhead: Real women. Real programs. Real change.
- Three cards (swipeable row on mobile). Each: before/after photo, result tag, quote in Fraunces, name.
  1. `images/r1.jpg` · Tag: Lost 10 lbs and set new PRs · "I've tried a million programs, but this was the first one I actually finished. The daily structure took all the guesswork out." · **Kadee Blair**
  2. `images/r2.jpg` · Tag: [Result label] · "[Quote]" · **Heidi Lloyd**
  3. `images/r3.jpg` · Tag: [Result label] · "[Quote]" · **Elena R.**
- Disclaimer below (small, muted, centered): Individual results vary and depend on consistency with training and nutrition.

### 5.5 Problem and plan
Background `--bg-alt`.
- Eyebrow: The truth
- Headline: **You don't need more motivation. *You need a plan.***
- Body: Fall is when routines slip. Back to school, shorter days, and a hundred reasons to skip. Rock the Fall gives you eight weeks of structure, so all you have to do is show up.
- Two boxes side by side (stacked on mobile):
  - **Without a plan** (muted, X icons): Start strong, then fall off by October · Guess at workouts and nutrition · Jump from program to program · Drift into the holidays off track
  - **With the challenge** (white card, 2px orange border, soft orange shadow, check icons): A daily training plan to follow · Simple nutrition guidance, no extremes · Short, effective sessions that fit real life · Everything in one app

### 5.6 Meet Brooke
Two columns: portrait left, text right.
- Portrait: [Portrait of Brooke, coaching or training]
- Eyebrow: Your coach
- Headline: **Train with *Brooke Ence.***
- Body: [Two or three sentences on Brooke's background.]
- Quote box (`--bg-alt`): "[One or two lines from Brooke on why she built this challenge.]" — Brooke Ence

### 5.7 Train your way
Background `--bg-alt`.
- Eyebrow: Your training, your way
- Headline: **Pick your program. *Every one counts.***
- Subhead: Enter the challenge with any program in the Naked Training app. Train in a full gym, at home, or on the road.

**Featured program card** (dark `--ink`, radius 28px):
- Tag: Recommended (orange pill)
- Title: **The Rock the Fall Program**
- Intro: Built around two techniques that make every set count, so you build strength and muscle in less time.
- **Row 1** (`--ink-card`): reel on the left, text on the right
  - Eyebrow: Watch Brooke break it down
  - Title: The 6-12-25 method
  - Body: Three exercises for the same muscle, back to back. [Confirm wording.]
  - Diagram: three rows — **6** Heavy (short bar), **12** Moderate (medium bar), **25** Light (long bar)
- **Row 2** (`--ink-card`): text on the left, reel on the right
  - Eyebrow: See it in action
  - Title: Mechanical advantage training
  - Body: When a movement gets too hard, you switch to an easier variation and keep going. You push further without breaking form.
  - Diagram: Hardest variation → Easier → **Keep going** (last step filled orange)
- On mobile, each row stacks: reel on top, text below.

**Other programs** — "Or choose any of these:" then a 3×2 grid of cards (2 columns tablet, 1 column or swipeable on mobile):
- **Functional Gym** — Build strength, power, and real-world fitness with barbells, kettlebells, and turf work.
- **Home Workouts** — Minimal equipment, maximum results. All you need is dumbbells and bands.
- **Bodybuilding** — Focused routines to build muscle and change your shape.
- **Travel & Bodyweight** — No gym, no problem. Short, intense sessions you can do anywhere.
- **Peaches** — Our glute-focused program to grow and shape your lower body.
- **Lifestyle** — A balanced approach to fitness that fits into your everyday routine.

### 5.8 Everything included
- Eyebrow: What you get
- Headline: **Everything you need. *All included.***
- Subhead: Over $300 in guides, plus full access to the Naked Training app.
- Six guide cards (3×2 desktop, 2 columns tablet, 1 column mobile). Each: cover image on a `--bg-alt` tile, title, value, description. Use the CSS book-cover mockups from the reference until real cover images are provided.
  - Flexible Dieting Guide · [$value] · Fuel your body without cutting out the foods you love.
  - Fast Food Guide · [$value] · Smart orders for busy days, without derailing your progress.
  - Macro Recipe Book · [$value] · Simple, macro-friendly recipes that take the guesswork out of eating well.
  - Supplement Guide · [$value] · What's worth taking, what isn't, and how to save your money.
  - Perfect Week Workbook · [$value] · Plan your workouts, meals, and recovery so every week stays on track.
  - Muscle Building Guide · [$value] · How to train and eat to build strength and muscle.
- **App block** (`--bg-alt`, radius 28px): text left, phone right
  - Eyebrow: Plus
  - Title: Full access to the *Naked Training app*
  - Checks: Step-by-step workouts with coaching videos · Built-in mobility and recovery sessions · Simple daily nutrition guidance · Progress tracking and a community to keep you accountable
  - Button: Join the Challenge
  - Phone frame: [App screenshot]

### 5.9 The prize
Dark `--ink` section.
- Eyebrow: The prize (`--orange-light`)
- Headline (84px desktop): **5 winners.** / ***$2,000 each.*** (second line italic, `--orange-light`)
- Body: Five challengers will each take home $2,000. Winners are chosen based on two things: your transformation and how active you are in the community. You don't have to be the most advanced person in the challenge. You just have to show up.
- Three numbered step cards (`--ink-card`, orange number circles):
  1. **Take your starting photos** — [Confirm when and how challengers submit them.]
  2. **Train and show up in the community** — Post, check in, and support other women along the way.
  3. **Submit your final photos** — Send your after photos at the end of week 8.
- Bottom row: Join the Challenge button (left) + "Official challenge rules" link (right) → [rules URL]

### 5.10 Mini-challenges
Short `--bg-alt` strip, two columns.
- Eyebrow: Bonus
- Title: New mini-challenges every two weeks
- Body: Stay engaged all season, with prizes for those who take part. [Confirm prize types.]
- Four tiles: Hydration & sleep · Daily steps · Protein goals · Mobility & recovery

### 5.11 How it works
- Eyebrow: How it works
- Headline: **Follow the plan. *That's it.***
- Three steps, large italic orange numbers (01, 02, 03):
  1. **Join the challenge** — Get instant access to the app, the community, and all the guides.
  2. **Pick your program** — Start Rock the Fall or choose any program. Use the time before kickoff to get comfortable.
  3. **Kick off October 5** — Take your starting photos and begin your eight weeks.

### 5.12 More results
- Headline (44px): **More women. *More results.*** with "Individual results vary." on the right
- Three before/after photos with "[Name] · [Result]" captions. Swipeable on mobile.

### 5.13 Pricing (`id="pricing"`)
Background `--bg-alt`.
- Eyebrow: Pricing
- Headline: **Ready to *commit?***
- Subhead: Enrollment closes October 5.
- **Live countdown** (four dark tiles: Days, Hours, Mins, Secs) to enrollment close. See section 6.
- Two cards (stacked on mobile, yearly card first on mobile):

**Rock the Fall — $50** (white card) · strikethrough [$value]
- 8-week challenge
- 10 weeks of app access
- Every program, workout, and coaching video
- Mobility and recovery sessions
- Simple nutrition guidance
- $300+ in guides and ebooks
- **Eligible for the $2,000 prize**
- Button (dark): Join the Challenge → [$50 checkout URL]

**Yearly Membership — $149** (dark card, "Best value" orange tag on the top edge) · strikethrough [$value]
- Everything in the challenge, plus:
- 12 months of full app access
- Rock the Fall plus 2 more challenges (3 total)
- **Eligible for the $2,000 prize**
- Support all year long
- No re-enrolling
- Button (orange): Join the Challenge → [$149 checkout URL]

### 5.14 Guarantee
Centered: shield-check icon in a light orange circle.
- Title: **Try it risk-free for 7 days.**
- Body: If you're not happy with Rock the Fall in the first 7 days, we'll refund you in full. No questions asked.

### 5.15 FAQ
Background `--bg-alt`. Two columns on desktop, one on mobile. Build as accessible accordions (`<details>`/`<summary>` or buttons with `aria-expanded`). Open the first item by default on mobile; show all open on desktop if it matches the reference better.
- Eyebrow: Questions
- Headline: **Good questions. *Straight answers.***

| Question | Answer |
|---|---|
| I'm out of shape. Is this for me? | Yes. [Confirm scaling/beginner detail.] Winners are chosen by transformation and participation, not by who's already fittest. |
| Do I need a gym? | No. Choose Home Workouts or Travel & Bodyweight, or train with any program that fits your setup. Every program counts. |
| Do I have to do the Rock the Fall program? | No. It's our recommended program, but you can enter the challenge with any program in the app. |
| How are winners chosen? | By your transformation and how active you are in the community. See the official rules for details. |
| Are yearly members eligible for the prize? | Yes, yearly members are fully eligible. |
| When does it start? | The challenge starts October 5. You'll get app access as soon as you join, so you can settle in before kickoff. |
| When does enrollment close? | October 5. |
| What if I miss a day? | [Confirm answer.] |
| What happens after the challenge? | [Confirm what $50 buyers keep after 10 weeks, and any upgrade offer.] |
| What's your refund policy? | If you're not happy in the first 7 days, we'll refund you in full. |

### 5.16 Final CTA and footer
- Large `--orange` card, radius 32px, centered:
  - Headline (76px desktop, white): **Fall doesn't wait.** / ***Neither should you.*** (second line italic, #FBE3D2)
  - Body: A clear plan, a community in your corner, and $2,000 on the line. Enrollment closes October 5.
  - Buttons: dark "Join the Challenge" + outlined "Starts October 5" badge
- Footer: wordmark left · Official rules / Privacy / Terms links center · © 2026 Naked Training right

---

## 6. Behavior

- **CTA buttons:** every "Join the Challenge" outside the pricing section smooth-scrolls to `#pricing`. The two pricing buttons go to their checkout URLs. Keep checkout URLs in one config object at the top of the JS file.
- **Countdown:** counts down to **October 5, 2026, [time and time zone — confirm, e.g. 11:59 PM MT]**. Keep the deadline in the same config object. When it reaches zero, replace the tiles with "Enrollment is closed" and swap the buttons for [confirm: waitlist link or hide].
- **Sticky mobile CTA:** on screens under 768px, after the user scrolls past the hero, show a slim bar fixed to the bottom with "Join the Challenge" (scrolls to pricing). Hide it while the pricing section is on screen.
- **Marquee:** CSS animation, pauses on hover and for `prefers-reduced-motion`.
- **Swipeable rows:** use CSS scroll-snap (no carousel library). Show a partial next card so it's obvious they scroll.

---

## 7. Reels (6-12-25 and mechanical advantage)

- **Placement:** inside the featured program card, per 5.7.
- **Frame:** vertical 9:16, about 300×533px on desktop, radius 24px. Full content width (max ~360px, centered) on mobile.
- **Playback:** `autoplay muted loop playsinline`, no controls by default.
- **Unmute button:** round button in the bottom-right corner, toggles sound, `aria-label="Unmute video"` / `"Mute video"`.
- **Poster image:** a still frame shows until the video is ready.
- **Lazy loading:** don't load either video until its section is near the viewport (IntersectionObserver). Pause videos that scroll out of view.
- **Hosting:** load from external hosting ([video URLs — Vimeo, Wistia, GHL media, or a CDN MP4]). Don't commit large video files. If using MP4, aim for 720p, under ~5MB, 15–30 seconds.
- **Placeholders:** until URLs are provided, render a dark `--ink-card` frame with an orange play circle and the label "[6-12-25 reel]" / "[Mechanical advantage reel]".

---

## 8. Responsive rules

Breakpoints: **≥1200px** desktop · **768–1199px** tablet · **<768px** mobile. Build mobile-first.

- All two-column layouts stack into one column on mobile.
- Hero: text and buttons first, photo second. The Join button must be visible without scrolling on a 390×844 screen.
- Buttons go full width on mobile.
- Card grids: 3 columns desktop → 2 columns tablet → 1 column or swipeable row on mobile (testimonials, more results, programs).
- Pricing: yearly card first on mobile.
- Test at 390px, 768px, 1024px, and 1440px. No horizontal scrolling at any width.

---

## 9. Performance, tracking, accessibility

- **Speed:** target a Lighthouse mobile performance score of 90+. Serve images as WebP with `srcset`, `loading="lazy"` for everything below the hero, and explicit width/height to prevent layout shift. Preload the hero image and fonts.
- **Tracking:** leave a clearly marked spot in `<head>` for the Meta Pixel / GTM snippet. Fire `ViewContent` on page load and `InitiateCheckout` on pricing button clicks. Do **not** fire `Purchase` on this page (it belongs on the checkout confirmation, and firing it here causes double-counting with CAPI). Add UTM pass-through from the page URL to the checkout links.
- **SEO/social:** title "Rock the Fall 8-Week Challenge with Brooke Ence | Naked Training", a meta description, and Open Graph image [OG image].
- **Accessibility:** semantic landmarks and one `h1`; real `<a>` and `<button>` elements; visible focus styles; alt text on every image; 4.5:1 text contrast; respect `prefers-reduced-motion`.

---

## 10. Placeholders to fill before launch

- [X,000+] number of women who've trained with Brooke
- Quotes and result labels for Heidi and Elena; three more before/after photos with names and results
- Brooke portrait, bio, and quote
- 6-12-25 wording confirmation
- Reel video URLs and poster frames
- App screenshot
- Guide cover images and dollar values; anchor prices for both plans
- How and when starting photos are submitted
- Mini-challenge prize types
- FAQ answers marked [Confirm]
- Checkout URLs ($50 and $149), official rules URL, privacy and terms URLs
- Countdown deadline time and time zone, and what shows after enrollment closes
- Full-resolution hero and transformation photos
- Logo file and OG image
- Meta Pixel / GTM snippet

---

## 11. Deployment

The page is hosted on Vercel, on a subdomain of the Naked Training site, and moves onto the main site later.

- **Repo:** a single Git repo containing the page, `/images`, and this brief. Do not commit video files or the low-resolution reference crops to production.
- **Project setup:** a static site with no build step. If a build tool is used, it must produce plain static output in a single output folder.
- **Domain:** [subdomain — e.g. challenge.nakedtraining.com]. Add it in the Vercel project's domain settings and add the DNS record Vercel provides at the registrar. HTTPS is automatic.
- **Plan:** Vercel Pro (the free Hobby plan is for non-commercial projects).
- **Config file:** include a `vercel.json` with security headers (`X-Content-Type-Options`, `Referrer-Policy`, a sensible `Permissions-Policy`), long cache headers on `/images` and static assets, and a redirect placeholder for when the page moves to the main site.
- **404:** a simple styled 404 page that links back to the landing page.
- **Preview links:** every push gets a preview deploy. Keep the page free of anything that would break on a preview URL (no hardcoded absolute links to the production domain except canonical and OG tags).
- **Analytics:** leave Vercel Web Analytics optional and off unless asked.

### UTM and attribution pass-through

Traffic arrives from Meta ads and leaves to checkout on a different domain, so tracking has to survive both hops.

- On page load, read the query string and persist the ad parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `gclid`) to `sessionStorage`.
- Append those parameters to both checkout URLs at click time, preserving any parameters already on those URLs.
- Fire `InitiateCheckout` before navigating, and make sure the click still works if the pixel fails to load.
- Keep all of this in one small, well-commented module so the parameter list is easy to change.
- Confirm with whoever manages checkout that the destination accepts and stores these parameters. [Confirm checkout platform and domain.]

---

## 12. How to build it

1. Read this brief and the three reference files. Summarize the plan and list any questions before writing code.
2. Set up the design tokens, fonts, and base components (buttons, eyebrow, tags, check lists, cards) first.
3. Build the sections in order, checking each against the reference at 1440px and 390px before moving on.
4. Add behaviors: scroll-to-pricing, countdown, sticky mobile CTA, reels, FAQ accordions.
5. Run a final pass on responsiveness, Lighthouse, accessibility, and the placeholder list.

## 13. Done when

- [ ] Desktop matches the reference files in layout, color, type, and copy
- [ ] Every button says "Join the Challenge"; no end date appears anywhere
- [ ] Mobile layout works cleanly at 390px with no horizontal scroll
- [ ] Countdown, reels, sticky mobile CTA, and FAQ all work
- [ ] All placeholders are bracketed and easy to find
- [ ] Lighthouse mobile performance 90+ and no accessibility errors
- [ ] Deploys cleanly to Vercel and UTM parameters carry through to checkout
