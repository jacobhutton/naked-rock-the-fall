// Naked Training Privacy Policy — source text.
const C = require('./company');

module.exports = {
  file: 'Naked-Training-Privacy-Policy',
  md: 'privacy-policy',
  title: 'Privacy Policy',
  updated: C.updated,
  intro: [
    `${C.legal}, doing business as ${C.brand} ("${C.brand}," "we," "us," or "our"), runs the ${C.brand} mobile apps, the websites at ${C.site} and its subdomains, and related memberships, challenges, contests, emails, text messages, and community groups (together, the "Services"). This Privacy Policy explains what information we collect, how we use and share it, and the choices you have.`,
    `**The short version:**`,
    { ul: [
      `We collect the information you give us (like your account details, purchases, workouts, and anything you choose to log or post) and information about how you use the Services.`,
      `We use it to run your membership, coach you, run challenges, improve the Services, and market ${C.brand}.`,
      `**We do not sell your information for money.** We do work with advertising partners such as Meta and Google to measure and show ads, and you can opt out of that.`,
      `**We do not use your workout, body, nutrition, or progress photo information for advertising,** and we do not use your name, photos, or results in marketing without your permission.`,
      `You can delete your account at any time from the settings in the app, and you can contact us at ${C.email} about any privacy request.`,
    ] },
    `This policy does not cover services we do not control, such as Facebook, Instagram, app stores, or apps you connect, even when we run a community group or page on them. Their own privacy policies apply there.`,
  ],
  sections: [
    { h: '1. Information we collect', body: [
      { h3: 'Information you give us' },
      { ul: [
        `**Account information:** your name, email address, password, and, if you provide them, your phone number, username, profile photo, and date of birth or age.`,
        `**Purchase information:** the plan or product you bought, the price, dates, and your billing history. Payments are handled by our payment processor or by Apple or Google. We do not store your full card number; we may receive limited details such as card type, last four digits, expiration date, and billing ZIP or postal code.`,
        `**Fitness and body information you choose to add:** workouts you complete, weights, reps, and times, goals, body weight and measurements, progress photos, nutrition and food logs, and notes. We call this "Fitness and Body Information" in this policy. See Section 3.`,
        `**Community content and messages:** posts, comments, check-ins, and messages you send to other members, coaches, or support.`,
        `**Challenge and contest entries:** information and photos you submit to enter, such as before and after photos, the name on your social media profile, and any testimonial you give us.`,
        `**Communications:** emails, texts, survey answers, and support requests you send us, and your marketing preferences.`,
      ] },
      { h3: 'Information we collect automatically' },
      { ul: [
        `**Device and app information:** device type, operating system, app version, language, and device or advertising identifiers.`,
        `**Usage information:** the pages and screens you view, features you use, links you click, the page or ad that brought you to us, and the dates and times of your activity.`,
        `**Log and location information:** IP address and the general location it suggests (city or region). We do not collect precise GPS location. If a feature ever needs it, we will ask for your permission first.`,
        `**Cookies, pixels, and similar technologies:** see Section 5.`,
      ] },
      { h3: 'Information from others' },
      { ul: [
        `**Payment processors and app stores:** confirmation of purchases, renewals, cancellations, and refunds.`,
        `**Sign-in services:** if you sign in with Apple or Google, we receive the name and email address (or private relay address) you authorize.`,
        `**Advertising and analytics partners:** information about which ad or campaign brought you to us and how our ads perform.`,
        `**Health apps and wearables:** only if you choose to connect one, and only the data you authorize. We use that data to provide the Services to you, and we never use it for advertising or share it with advertisers or data brokers.`,
      ] },
    ] },

    { h: '2. How we use information', body: [
      `We use the information we collect to:`,
      { ul: [
        `provide the Services, including your programs, tracking, and progress history;`,
        `personalize your training and recommend programs and content;`,
        `process purchases, renewals, cancellations, and refunds, and prevent fraud and abuse of offers;`,
        `send service messages such as receipts, renewal reminders, and account notices;`,
        `send marketing emails and texts where you have agreed or where the law allows, which you can stop at any time;`,
        `run challenges, contests, and mini-challenges, choose and verify winners, deliver prizes, and meet tax reporting obligations;`,
        `operate and moderate community features and support members;`,
        `understand how the Services are used, fix problems, and build new features;`,
        `measure and improve our advertising, and show ads for ${C.brand} on other sites and apps (see Section 5);`,
        `protect the safety, rights, and property of our members, the public, and ${C.brand}, enforce our Terms of Use, and comply with the law.`,
      ] },
      `If you live in a place where we need a legal basis to use your information (such as the European Economic Area, the United Kingdom, or Switzerland), we rely on: performing our contract with you; our legitimate interests in running, securing, improving, and marketing the Services; your consent, which you can withdraw at any time; and compliance with legal obligations.`,
    ] },

    { h: '3. Fitness and Body Information', body: [
      `Information about your body and your training is personal, so we hold it to a stricter standard:`,
      { ul: [
        `We use Fitness and Body Information to provide the Services to you, for example to track your progress, personalize your training, let coaches support you, and, in aggregated or de-identified form, to improve our programs.`,
        `**We do not sell it, we do not use it to target ads, and we do not share it with advertising partners.**`,
        `Your progress photos and measurements are visible only to you and to our coaching and support team, unless you choose to post them in a community space or submit them to a challenge or contest.`,
        `**We use your name, photos, or results in marketing only with your permission,** for example under the official rules of a contest you choose to enter or a release you sign. You can ask us to stop future use at any time.`,
      ] },
      `Some U.S. states, including Washington and Nevada, give residents specific rights over "consumer health data." To the extent Fitness and Body Information is consumer health data under those laws: the categories we collect, why we collect them, and who we share them with are described in this Section 3 and in Sections 1, 2, and 4; we collect and share it only as needed to provide the Services you ask for, or with your consent; and you may ask us to confirm what we hold, to delete it, or to withdraw your consent, by emailing ${C.email}. If we deny a request, you may appeal by replying to our decision, and if your appeal is denied you may contact your state Attorney General.`,
    ] },

    { h: '4. How we share information', body: [
      `We share information in these ways:`,
      { ul: [
        `**Service providers** that work for us, such as hosting and app platform providers, payment processors, email, text messaging, and customer relationship tools, analytics, video hosting, and customer support. They may use your information only to provide services to us.`,
        `**Advertising and analytics partners,** such as Meta and Google. We share identifiers (such as a hashed email address or phone number, IP address, and cookie or device identifiers) and information about actions on our websites and apps (such as viewing a page or starting a checkout), through cookies, pixels, software development kits, and server-to-server connections. These partners may use this information under their own privacy policies. Some state laws call this a "sale" or "sharing" of personal information or "targeted advertising." You can opt out; see Sections 5 and 7.`,
        `**Apple and Google,** when you purchase through their app stores.`,
        `**Other members and the public,** when you post in a community space. Your username, profile photo, and what you post can be seen by others.`,
        `**Our coaches,** who can see your activity in order to support you.`,
        `**Contest and challenge administration.** Winners' names, photos, and results may be announced as described in the official rules.`,
        `**Legal and safety.** We may disclose information if we believe in good faith that it is necessary to comply with the law or legal process, to enforce our Terms of Use, or to protect the safety, rights, or property of any person. Where we are allowed to, we will try to notify you first.`,
        `**Business transfers.** If we are involved in a merger, acquisition, financing, or sale of all or part of our business, information may be transferred as part of that transaction, and this policy will continue to apply to it unless you are told otherwise.`,
        `**With your consent** or at your direction.`,
      ] },
      `**We do not sell your personal information for money.**`,
      `**Text messaging:** No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Information may be shared with subcontractors that provide support services, such as customer service. All other categories of sharing described in this policy exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.`,
    ] },

    { h: '5. Cookies, pixels, and advertising choices', body: [
      `We and our partners use cookies, pixels, tags, software development kits, and similar technologies to keep you signed in, remember your preferences, understand how the Services are used, measure our advertising, and show you ${C.brand} ads on other sites and apps. Your choices:`,
      { ul: [
        `**Opt out of advertising sharing with us:** email ${C.email} with the subject line "Do Not Share." We will stop sharing your identifiers with advertising partners through our server-side tools and keep you out of the audience lists we provide to them.`,
        `**Browser:** you can block or delete cookies in your browser settings. Some features may not work without them.`,
        `**Mobile device:** on iOS, turn off "Allow Apps to Request to Track" or choose "Ask App Not to Track." On Android, delete or reset your advertising ID in your device settings.`,
        `**Platforms and industry tools:** use the ad settings in your Facebook, Instagram, and Google accounts, and the opt-out tools at optout.aboutads.info and optout.networkadvertising.org.`,
      ] },
      `Our websites do not respond to browser "Do Not Track" signals.`,
    ] },

    { h: '6. Emails and text messages', body: [
      `You can unsubscribe from marketing emails using the link in any marketing email. We will still send messages that are part of the Services, such as receipts and renewal notices.`,
      `We send marketing text messages only to people who sign up for them. When you sign up, you agree to receive recurring automated marketing and informational texts from ${C.brand} at the number you provided. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe or HELP for help, or email ${C.email}. Carriers are not liable for delayed or undelivered messages.`,
    ] },

    { h: '7. Your choices and rights', body: [
      { h3: 'What anyone can do' },
      { ul: [
        `**See and update** your account information in the app.`,
        `**Delete your account** at any time from the settings in the app. See Section 8 for what happens to your information. Remember to cancel your membership first, as explained in our Terms of Use.`,
        `**Stop marketing** emails and texts as described in Section 6, and manage push notifications in your device settings.`,
      ] },
      { h3: 'Privacy requests' },
      `Wherever you live, you can email ${C.email} to ask us to: tell you what personal information we hold about you and give you a copy; correct it; delete it; stop using or sharing it for targeted advertising; or stop using your photos, name, or results in future marketing. We will verify your request using the email address on your account, and we respond within 45 days (or sooner where the law requires). You can have an authorized agent make a request for you if you give them written permission. We will not treat you differently for making a request. If we deny your request, you can appeal by replying to our decision, and we will tell you how to contact your regulator if the appeal is denied.`,
      { h3: 'California' },
      `In the past 12 months we have collected the categories of personal information described in Section 1: identifiers; customer and purchase records; internet and app activity; general location; photos and videos you upload; account log-in details and health-related information you choose to provide (which California treats as sensitive personal information); and inferences about your preferences. We collect it from the sources in Section 1, use it for the purposes in Section 2, and disclose it to the recipients in Section 4. We "share" identifiers and internet and app activity with advertising partners for cross-context behavioral advertising, and you can opt out as described in Section 5. We do not sell personal information for money, we do not use sensitive personal information for purposes that would require a right to limit, and we do not knowingly sell or share the personal information of anyone under 16. California residents may also ask, once a year, for information about our disclosure of personal information to third parties for their direct marketing purposes, by writing to the address in Section 12.`,
      { h3: 'Europe, the United Kingdom, and other regions' },
      `${C.legal} is the controller of your personal information. Depending on where you live, you may have the right to access, correct, delete, restrict, or object to our use of your information, to receive a portable copy, to withdraw consent, and to complain to your local data protection authority. We are based in the United States and process information there. When we transfer personal information from the European Economic Area, the United Kingdom, or Switzerland, we rely on legally recognized safeguards such as standard contractual clauses where required.`,
    ] },

    { h: '8. How long we keep information', body: [
      `We keep personal information for as long as your account is open and for as long as we need it for the purposes in this policy. When you delete your account, we delete or de-identify your personal information within [CONFIRM: 30] days, and it is removed from our backups within [CONFIRM: 90] days, except for what we need to keep for legal, tax, and accounting reasons (such as purchase records, which we keep for up to seven years), to resolve disputes, to prevent fraud and abuse of offers, and to honor your opt-out choices. Posts you made in community spaces may be removed or shown without your name. Photos and testimonials you allowed us to use in marketing may remain in materials already published, and we will stop future use if you ask.`,
    ] },

    { h: '9. Security', body: [
      `We use administrative, technical, and physical safeguards designed to protect your information. No system is completely secure, so we cannot guarantee security. Use a strong, unique password, and tell us right away at ${C.email} if you think your account has been accessed without your permission. If a security incident affects your information, we will notify you as the law requires.`,
    ] },

    { h: '10. Children', body: [
      `The Services are for adults 18 and older. We do not knowingly collect personal information from children. If you believe a child has given us personal information, email ${C.email} and we will delete it.`,
    ] },

    { h: '11. Changes to this policy', body: [
      `We may update this policy from time to time. We will post the updated version with a new "Last updated" date, and if the changes are material we will notify you by email or in the app before they take effect.`,
    ] },

    { h: '12. Contact us', body: [
      `${C.legal}, doing business as ${C.brand}`,
      `${C.address}`,
      `${C.email}`,
    ] },
  ],

  notes: [
    `This is a plain-language draft prepared for attorney review. It is not legal advice and has not been reviewed by a lawyer.`,
    { h3: 'What changed from the published policy' },
    { ul: [
      `Corrected the company name (the published policy reads "Naked Training and DBAB, LLC" throughout) and replaced the P.O. Box in Scotts Valley, CA, which is not the company's address, with the St. George address and a contact email.`,
      `Added the information the app actually collects: workouts, body measurements, progress photos, nutrition logs, contest entries, device and advertising identifiers.`,
      `Removed the statement that we collect "names of your Facebook friends."`,
      `Replaced "you will be notified when your Personal Information may be shared and will be able to prevent the sharing" with an accurate description of Meta and Google advertising sharing (pixel and Conversions API with hashed identifiers) and an opt-out.`,
      `Moved the SMS consent sentence out of the middle of a paragraph. Consent has to be collected at the opt-in form; this policy now only describes the program. The carrier-required "no mobile information will be shared" language is kept in Section 4.`,
      `Replaced "content may be retained indefinitely and remain publicly accessible after deletion" with in-app account deletion and a retention schedule.`,
      `Removed the promise that future changes "will not affect data that was collected under a previous version of this policy."`,
      `Added state privacy rights, a California notice, a Washington/Nevada consumer health data section, international users, children, and security incident language.`,
    ] },
    { h3: 'Must confirm before publishing (facts only the business or product team knows)' },
    { ul: [
      `Section 8: the two bracketed numbers. How quickly does the platform actually delete or de-identify data after in-app account deletion, and how long do backups persist?`,
      `Section 3: confirm that progress photos and measurements are visible only to the member and the coaching/support team by default.`,
      `Section 3 and 4: confirm no workout, body, nutrition, or photo data is sent to Meta, Google, or any other advertising or analytics partner, including through app SDKs and custom events. If any is, stop it or change the text.`,
      `Section 1: confirm the app does not collect precise GPS location, and whether Apple Health / Health Connect or wearable connections exist today. The text is conditional, so it is accurate either way, but Apple requires the HealthKit advertising restriction to be stated if HealthKit is used.`,
      `Section 5: the "Do Not Share" email opt-out needs a real process: a suppression list applied to Meta/Google custom audiences and to Conversions API events.`,
      `The text-message opt-in forms themselves (GoHighLevel) need the consent language and a link to this policy next to the phone number field. This policy does not create consent.`,
    ] },
    { h3: 'Questions for counsel' },
    { ul: [
      `Washington My Health My Data Act and Nevada SB 370: these have no small-business threshold and call for a separately linked "Consumer Health Data Privacy Policy" and, for sharing, separate consent. Section 3 is drafted so it can be republished as that standalone page. Please advise whether progress photos, weight, measurements, and nutrition logs are consumer health data here, and whether a standalone page and consent flow are needed.`,
      `California (CCPA/CPRA) and other state laws: does the business meet any applicability threshold (for example 100,000 California consumers or devices per year, counting website visitors)? If so, a "Do Not Sell or Share My Personal Information" link and honoring Global Privacy Control signals are required, and the email opt-out in Section 5 is not enough on its own. The draft extends core rights to everyone voluntarily to keep one process.`,
      `GDPR / UK GDPR: the Services are offered worldwide and the current contest is open worldwide. Is an EU and/or UK representative (Article 27) needed, and is a cookie consent banner needed for EU/UK visitors to the marketing sites?`,
      `Transition: the published policy promises that changes "will not affect data that was collected under a previous version." Recommend emailing all members about the new policy before it takes effect. Please advise on whether anything more is needed for existing data, particularly for advertising uses.`,
      `Privacy "nutrition label" disclosures in the App Store and the Google Play Data Safety form should be checked against this policy so they match.`,
    ] },
  ],
};
