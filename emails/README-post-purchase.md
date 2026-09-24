# Rock the Fall post-purchase emails

The ten emails in the Drip automation **[CHALLENGE] 2026 Rock the Fall – Post Purchase Sign Up – First Time & Returning**, redesigned to match the lander and the launch emails. Same wording as the originals. The design and structure changed, plus the fixes listed below.

- **Review:** open `dist/post-purchase/preview.html`. Every email at desktop and phone width.
- **Send:** paste the files from `dist/post-purchase/drip/` into each Drip automation email (HTML builder, replace everything). The `ghl/` folder is the same set with HighLevel merge tags, for later.
- **Edit:** copy is in `content-post-purchase.js`, the look is in `build.js`. Run `node emails/build.js` afterwards. It rebuilds both sets, and the launch emails come out unchanged.

## The ten emails

| # | Drip email | File | Suggested subject |
|---|---|---|---|
| 1 | What's Next | `01-whats-next.html` | You're in. Here's what's next. |
| 2 | Downloads, new | `02-welcome-new.html` | Your guides are here |
| 3 | Downloads, returning | `03-welcome-returning.html` | Welcome back. Your guides are here. |
| 4 | Member Concierge, new | `04-concierge-new.html` | Anything you need, just ask |
| 5 | Member Concierge, returning | `05-concierge-returning.html` | Anything you need, just ask |
| 6 | Community, new | `06-community-new.html` | Ask questions, get coached |
| 7 | Community, returning | `07-community-returning.html` | Get coached, ask questions, help others |
| 8 | Coaching Offer | `08-coaching-offer.html` | 50% off 1-on-1 coaching, challengers only |
| 9 | Heidi Lloyd Coaching Offer | `09-heidi-coaching.html` | What six months of coaching did for Heidi |
| 10 | Final Coaching Offer | `10-final-coaching.html` | If you want results faster, read this |

The Drip preview links don't include subject lines, so these are suggestions. If the current subjects are performing, keep them and replace only the body. Preview text is built into each file. If Drip has its own preview-text field, paste the same line from `preview.html` there.

Emails 4 and 5 are identical, as they were in Drip.

## Before these go live

1. **Push the two new images.** Emails 9 and 10 use `images/email/heidi-coaching.jpg` and `images/email/brittany-coaching.jpg`. They are cropped from the before/afters in the original emails, and they show as broken until they're pushed to main. Every other image is already live.
2. **Footer address.** In Drip the footer prints `{{ inline_postal_address }}` from your Drip account settings. The current emails show **P.O. Box 66435, Scotts Valley, CA 95067**. The launch emails' HighLevel version uses **314 N 3050 E, Suite B1, St. George, UT 84790**. Check that the Drip account setting is the address you want on DBAB LLC mail.
3. **Paula.** Emails 4 and 5 come from "Paula and the Naked Success Team" and tell people to hit reply. Check that she's still on the team and that replies reach someone.
4. **Rules email on October 3.** Email 1 still says the official rules email goes out October 3, as the original did. It now also links the live rules page, since `rules.html` is already public. Make sure that October 3 email is actually scheduled.
5. **Send yourself a test** of each and tap every button on a phone.

## What changed from the originals

**Fixes**
- **Dead support link.** "support@nakedprogram.com" linked to `nakedtraining.app/pages/contact`, which returns a 404, so the live emails have this bug today. It's now a `mailto:` link to the same address the lander and rules use.
- **Buyers no longer land on the sales page.** Every link goes to the app, the Facebook group, a guide PDF, the coaching application, or the rules. The NAKED TRAINING logo links to nakedtraining.app. The lander shows "Enrollment is closed" after October 5, and that would confuse someone who's in the challenge.
- **Guide names match the lander:** "Recipe Book" is now "Macro Recipe Book" and "Perfect Week" is now "Perfect Week Workbook". The one-line descriptions come from the lander. The PDF links are unchanged, and all six were checked.
- **Heidi's photo** is her coaching before/after from the original email. It is not the lander's `heidi.jpg`, which shows her challenge result. Using that one under a coaching claim would credit the wrong product.

**Design**
- Same system as the lander and the launch emails: cream card, Fraunces and Figtree, orange accents, pill buttons that go full width on phones.
- The guides appear as the same book covers the lander uses, each with its own download link.
- The three "Time to show it off" member posts are set as quote cards instead of Facebook screenshots. The words are unchanged, emoji are dropped, and names are shortened to first name plus last initial, as on the lander (Colissa N., Kar B., Michelle F.).
- The old-brand "JOIN OUR TRAIN NAKED COMMUNITY" graphics are replaced with the community photo from the lander.
- Emoji numbering (1️⃣ 2️⃣ 3️⃣) is replaced with numbered steps.
- Store badges are replaced with one "Download the App" button (onelink.to, which routes to the right store), plus text links to each store.

**Tracking**
- Every link carries `utm_source=email&utm_medium=email&utm_campaign=rock-the-fall-post-purchase&utm_content=<email id>`. Drip's own UTMs used a long campaign name with brackets and spaces. If Drip is set to add its own, turn that off for these emails so links don't carry two sets.
