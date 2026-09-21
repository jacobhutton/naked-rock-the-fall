# Rock the Fall launch emails

Eight emails to the main list (leads + lapsed members), in Brooke's voice, designed to match the lander.

- **Review them:** open `dist/preview.html` in a browser. Every email at desktop and phone width, with subject and preview text.
- **Send them:** paste the files from `dist/drip/` or `dist/ghl/` into the platform's HTML/code editor. Same emails, different merge tags.
- **Change them:** copy lives in `content.js`, the look lives in `build.js`. Then run `node emails/build.js`.

## Schedule

Enrollment closes Mon Oct 5 at 11:59 PM Mountain. Times are suggestions.

| # | Send | File | Subject | Preview text |
|---|---|---|---|---|
| 1 | Tue Sep 22, 6:30 AM MT | `01-launch.html` | Rock the Fall is open | Eight weeks of training with me, starting October 5. Five challengers win $2,000 each. |
| 2 | Thu Sep 24, 6:30 AM MT | `02-program.html` | How 6-12-25 works | One muscle group. Three exercises. No rest. Here's what the training in Rock the Fall looks like. |
| 3 | Sun Sep 27, 7:00 AM MT | `03-results.html` | "The first one I actually finished" | Kadee lost 10 lbs and set new PRs. Here's what she says made the difference. |
| 4 | Tue Sep 29, 6:30 AM MT | `04-prize.html` | 5 winners. $2,000 each. | You don't have to be the most advanced person in the challenge. Here's exactly how winners are chosen. |
| 5 | Thu Oct 1, 6:30 AM MT | `05-faq.html` | "I'm out of shape. Is this for me?" | Yes. Also: you don't need a gym, missing a day is fine, and you have 7 days to change your mind. |
| 6 | Sun Oct 4, 7:00 AM MT | `06-closes-tomorrow.html` | Enrollment closes tomorrow night | Rock the Fall kicks off tomorrow. Enrollment closes at 11:59 PM Mountain. |
| 7 | Mon Oct 5, 6:30 AM MT | `07-last-day.html` | We start today | Rock the Fall kicks off this morning. Enrollment closes tonight at 11:59 PM Mountain. |
| 8 | Mon Oct 5, 6:00 PM MT | `08-final-hours.html` | Closing tonight | Last call. Enrollment for Rock the Fall closes at 11:59 PM Mountain. |

Two backup subject lines per email are in `content.js` and on the preview page, for A/B tests or resends to non-openers.

The preview text is already built into each file as hidden text. If the platform has its own preview-text field, paste the same line there.

## Before the first send

1. **Push the email images live.** Emails 1, 2 and 6 use new images in `images/email/`. They only load once that folder is deployed to rockthefall.nakedtraining.app (commit + push to main). Everything else uses images already on the live lander.
2. **Brooke signs off.** All eight are first person in her name. Email 6 reuses her draft quote from the lander ("Most people wait until January...").
3. **Exclude buyers.** Suppress anyone who has bought the challenge or yearly from emails 2 through 8, or they'll get "last chance" emails for something they own. Also leave out active members. They need a different message (monthly members aren't prize-eligible, yearly members already are).
4. **Send yourself a test of each** and tap every button on a phone.

## Loading into the platform

**Drip:** new Single Email Campaign, choose the HTML builder, paste the whole file. Tags used: `{{ subscriber.first_name | default: "there" }}`, `{{ unsubscribe_url }}`, `{{ inline_postal_address }}` (Drip rejects custom HTML without the last two). To see the name render in a test, pick a person under "Preview as" first.

**GoHighLevel:** Marketing > Emails > Campaigns > New > Code editor (not drag and drop), paste the whole file. Tags used: `{{contact.first_name}}` and `{{unsubscribe}}`. GHL has no fallback for a missing first name, so contacts without one get "Hi ,". If a lot of the list has no first name, change `firstName` for `ghl` in `build.js` and rebuild. GHL also adds its own unsubscribe footer by default. Turn that off in Settings > Business Profile if you don't want two.

If either platform auto-appends its own UTM parameters to links, turn that off for these sends. The links already carry them.

## How the links work

- Every link goes to the lander, never straight to checkout. After October 5 the lander shows "Enrollment is closed", so someone opening an old email can't buy a closed challenge.
- Emails 5 through 8 link to `#pricing`. Earlier ones link to the top of the page.
- Every link carries `utm_source=email&utm_medium=email&utm_campaign=rock-the-fall&utm_content=e1-launch` (through `e8-final-hours`). The lander already passes UTMs through to the Stackt checkout, so sales can be traced to the specific email.

## Where the facts come from

Every claim matches the live lander or `rules.html`: $50 / $149, 10 weeks of app access, 5 winners at $2,000, judging 70% transformation and 30% community, 7-day refund, the October 5 start and 11:59 PM Mountain close. If any of those change on the site, change `content.js` too.

Carried over from the lander: every button says "Join the Challenge", no challenge end date anywhere, and nothing about what happens after the 10 weeks.

## Email client notes

- Fraunces and Figtree load in Apple Mail (most of this audience). Gmail and Outlook fall back to Georgia and Arial.
- All files are under 21 KB. Gmail clips at 102 KB.
- Two-column sections stack on phones. Buttons go full width.
- Emails are set to light mode only. The Gmail app may still darken them on phones set to dark mode. They stay readable.
