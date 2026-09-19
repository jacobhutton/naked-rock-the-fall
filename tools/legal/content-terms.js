// Naked Training Terms of Use — source text.
// Strings are paragraphs (**bold** supported). { ul: [] } = bullets, { ol: [] } = numbered list, { h3: '' } = sub-heading.
const C = require('./company');

module.exports = {
  file: 'Naked-Training-Terms-of-Use',
  md: 'terms-of-use',
  title: 'Terms of Use',
  updated: C.updated,
  intro: [
    `These Terms of Use ("Terms") are an agreement between you and ${C.legal}, doing business as ${C.brand} ("${C.brand}," "we," "us," or "our"). They apply to the ${C.brand} mobile apps, our websites (including ${C.site} and its subdomains), and our memberships, programs, challenges, guides, and community features (together, the "Services"). Our Privacy Policy explains how we handle your information.`,
    `By creating an account, making a purchase, or using the Services, you agree to these Terms. If you do not agree, please do not use the Services.`,
    `**Two things to know up front:**`,
    { ul: [
      `**Memberships renew automatically and you will be charged each billing period until you cancel.** Free trials and fixed-term offers roll into a paid recurring membership unless you cancel first. See Section 5.`,
      `**Most disputes are resolved by individual arbitration, not in court, and you waive class actions and jury trials.** You can opt out within 30 days. See Section 16.`,
    ] },
  ],
  sections: [
    { h: '1. Who can use the Services', body: [
      `You must be at least 18 years old and able to enter into a binding contract to create an account or make a purchase. The Services are not intended for children.`,
      `You agree to give us accurate information, keep it up to date, keep your login details private, and tell us right away at ${C.email} if you think someone else has accessed your account. Accounts are for one person and may not be shared, sold, or transferred. You are responsible for activity on your account.`,
    ] },

    { h: '2. Health and safety', body: [
      `**${C.brand} is not a medical provider.** Our workouts, programs, nutrition guidance, guides, and coaching are general fitness and wellness information for educational purposes. They are not medical advice, diagnosis, or treatment, and using the Services does not create a doctor-patient or similar professional relationship.`,
      `**Talk to your doctor before you start** this or any exercise or nutrition program, especially if you are pregnant or postpartum, are recovering from an injury or surgery, take medication, have a history of disordered eating, or have a heart, blood pressure, joint, or other medical condition.`,
      `Exercise involves risk, including the risk of serious injury. **You take part voluntarily and at your own risk.** You are responsible for choosing appropriate weights and movements, using safe equipment and a safe space, and using proper form. Stop immediately and seek medical attention if you feel pain, dizziness, faintness, chest discomfort, or shortness of breath.`,
      `Results vary from person to person. Testimonials and before and after photos show individual experiences and are not a promise or guarantee that you will get the same results.`,
    ] },

    { h: '3. Your account', body: [
      `You can delete your account at any time from the settings in the app. **Cancel your membership before you delete your account (see Section 5).** Deleting your account does not cancel a subscription purchased through Apple or Google; you must cancel that with Apple or Google. Our Privacy Policy explains what happens to your information when you delete your account.`,
    ] },

    { h: '4. Memberships and what is included', body: [
      `We offer different ways to access the Services, which may include recurring memberships (for example, monthly or yearly), free trials, and fixed-term passes or promotional offers (for example, access connected to a challenge). What is included, the price, and the length of each option are shown at the time of purchase.`,
      `When you have an active membership or pass, we give you a personal, non-exclusive, non-transferable right to use the Services for your own non-commercial use for the period you have paid for. Guides, ebooks, and other downloads are licensed to you for personal use only.`,
      `We regularly add, update, and retire programs, workouts, features, and content. If we make a change that substantially reduces what a paid membership includes during a period you have already paid for, we will tell you, and you may cancel and ask for a prorated refund of the unused part of that period.`,
    ] },

    { h: '5. Billing, automatic renewal, cancellation, and refunds', body: [
      { h3: '5.1 Payment' },
      `Prices are shown at checkout and are in U.S. dollars unless we say otherwise. Taxes may be added where they apply. When you make a purchase, you authorize us, our payment processor, or the app store you purchased through to charge your payment method for the amounts due, including renewals. Please keep your payment information current. If a charge fails, we may try again and may pause your access until payment goes through.`,
      { h3: '5.2 Automatic renewal' },
      `**Recurring memberships renew automatically.** At the end of each billing period (for example, each month or each year), your membership renews for another period of the same length, and your payment method is charged the then-current price for your plan on the renewal date. **This continues until you cancel.**`,
      { h3: '5.3 Free trials, passes, and promotional offers' },
      `Some offers start with a free trial, a discounted period, or a one-time payment that covers a fixed period, such as a challenge pass. **Unless the offer says otherwise at the time of purchase, when that initial period ends your access continues as a recurring membership, and your payment method is charged the price, and at the billing interval, shown to you at checkout, until you cancel.** To avoid being charged, cancel before the trial or initial period ends.`,
      `The offer terms shown to you at checkout, including the price, the length of any trial or initial period, and the renewal price and interval, are part of these Terms. If they differ from this Section 5, the terms shown at checkout apply to that purchase.`,
      { h3: '5.4 How to cancel' },
      `You can cancel at any time. How you cancel depends on where you purchased:`,
      { ul: [
        `**Purchases on our website:** email ${C.email} from the email address on your account, or message support in the app, and tell us you want to cancel. **Your cancellation takes effect on the date we receive your request, even if we reply later,** and we will confirm by email. To avoid your next charge, send your request before your renewal date.`,
        `**Apple App Store purchases:** cancel in your Apple ID settings under Subscriptions. We cannot cancel an Apple subscription for you.`,
        `**Google Play purchases:** cancel in Google Play under Payments and subscriptions. We cannot cancel a Google Play subscription for you.`,
      ] },
      `When you cancel, you will not be charged again, and you keep access until the end of the period you have already paid for.`,
      { h3: '5.5 Reminders and price changes' },
      `Where the law requires it, we will send a reminder to the email address on your account before a trial converts to a paid membership or before a yearly membership renews. If we change the price of your membership, we will email you at least 30 days before the new price applies to you, and you can cancel before it takes effect.`,
      { h3: '5.6 Refunds' },
      `**Payments are non-refundable, and we do not give refunds or credits for partly used billing periods,** except (a) where the law requires it, (b) as described in Sections 4 and 12, or (c) where we offer a specific money-back guarantee with an offer at the time of purchase, in which case we will honor that guarantee on its terms. Purchases made through Apple or Google are subject to their refund policies, and refund requests for those purchases go to Apple or Google.`,
      `If you think you were charged by mistake, email ${C.email} within 60 days of the charge and we will look into it. Please contact us before disputing a charge with your bank so we have the chance to fix it.`,
      { h3: '5.7 Fair use of offers' },
      `Trials, promotional prices, and guarantees are limited to one per person unless we say otherwise. Creating multiple accounts or using false information to reuse an offer is a breach of these Terms, and we may cancel the offer or close the accounts involved.`,
    ] },

    { h: '6. Challenges, contests, and promotions', body: [
      `From time to time we run challenges, contests, giveaways, and other promotions. Each one may have its own official rules, which apply together with these Terms. If the official rules conflict with these Terms, the official rules apply to that promotion.`,
    ] },

    { h: '7. Community and your content', body: [
      `The Services may let you post or send content such as comments, check-ins, photos, and messages, both in the app and in official community groups we run on other platforms (for example, a private Facebook group). On other platforms, that platform's own terms and privacy policy also apply.`,
      `**You own your content.** You give us a non-exclusive, worldwide, royalty-free license to host, store, reproduce, display, and distribute your content for the purpose of operating, providing, and improving the Services. **We will not use your name, photos, or results in advertising unless you give us permission,** for example through the official rules of a contest you choose to enter or a separate written release.`,
      `If you send us ideas or feedback, we may use them without restriction or payment.`,
      `When you use the Services or our community groups, you agree not to:`,
      { ul: [
        `harass, threaten, shame, or discriminate against anyone;`,
        `post content that is sexually explicit, hateful, violent, or illegal;`,
        `share another person's private information, messages, or photos (including another member's progress photos) without their permission;`,
        `give medical advice, or promote extreme dieting, disordered eating, or unsafe training practices;`,
        `advertise, solicit, or spam other members;`,
        `impersonate anyone or misrepresent who you are;`,
        `share your account, or copy, record, redistribute, or resell our programs, workouts, videos, or guides;`,
        `scrape, reverse engineer, interfere with, or get around the security or access controls of the Services.`,
      ] },
      `You are responsible for what you post. We do not endorse member content. We may remove content or suspend or close accounts that we reasonably believe break these Terms or put other members at risk.`,
    ] },

    { h: '8. Our content and intellectual property', body: [
      `The Services, including all programs, workouts, videos, guides, recipes, text, graphics, software, and the ${C.brand} name and logos, are owned by us or our licensors and are protected by intellectual property laws. Except for the limited personal-use rights in Section 4, no rights are granted to you. You may not use our content to coach or train others commercially, to create a competing product or service, or for any other commercial purpose without our written permission.`,
    ] },

    { h: '9. Third-party services', body: [
      `The Services may work with or link to services we do not control, such as app stores, payment processors, social platforms, video hosts, and health apps or wearables you choose to connect. Your use of those services is governed by their terms and privacy policies, and we are not responsible for them.`,
    ] },

    { h: '10. App store terms', body: [
      `If you download our app from the Apple App Store, you and we agree that: these Terms are between you and us, not Apple; Apple is not responsible for the app or its content and has no obligation to provide maintenance or support; if the app fails to meet any applicable warranty, you may notify Apple and Apple will refund the purchase price (if any) of the app, and to the fullest extent permitted by law Apple has no other warranty obligation; Apple is not responsible for addressing any claims relating to the app, including product liability, legal compliance, consumer protection, or intellectual property claims; you may use the app only on Apple-branded devices you own or control, as permitted by Apple's Usage Rules; you confirm that you are not located in a country subject to a U.S. government embargo and are not on any U.S. government list of prohibited or restricted parties; and Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce them against you.`,
      `If you download our app from Google Play, your use is also subject to the Google Play Terms of Service. Google is not responsible for the app and has no obligation to provide support for it.`,
    ] },

    { h: '11. Emails and text messages', body: [
      `We send emails that are part of the Services, such as receipts, renewal reminders, and account notices. You can unsubscribe from marketing emails at any time using the link in the email.`,
      `If you sign up for text messages, you agree to receive recurring automated marketing and informational texts from ${C.brand} at the number you gave us. Consent is not a condition of any purchase. Message frequency varies. Message and data rates may apply. Reply STOP to cancel or HELP for help. Carriers are not liable for delayed or undelivered messages. See our Privacy Policy for more detail.`,
    ] },

    { h: '12. Suspension and termination', body: [
      `You may stop using the Services at any time by cancelling your membership and deleting your account. We may suspend or end your access if you break these Terms, if we reasonably suspect fraud or abuse, or if your conduct puts other members or us at risk, and we will give you notice where it is reasonable to do so. If we end a paid membership for a reason other than your breach of these Terms, we will refund the unused part of the period you paid for. Sections that by their nature should continue after termination (including Sections 2, 7, 8, and 13 through 20) will continue to apply.`,
    ] },

    { h: '13. Disclaimers', body: [
      `**THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT PROMISE THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT YOU WILL ACHIEVE ANY PARTICULAR FITNESS, HEALTH, OR BODY COMPOSITION RESULT.**`,
    ] },

    { h: '14. Limitation of liability', body: [
      `**TO THE FULLEST EXTENT PERMITTED BY LAW: (A) WE AND OUR OWNERS, EMPLOYEES, COACHES, CONTRACTORS, AND LICENSORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS OR LOST DATA, ARISING OUT OF OR RELATING TO THE SERVICES OR THESE TERMS; AND (B) OUR TOTAL LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THE SERVICES OR THESE TERMS WILL NOT EXCEED THE GREATER OF (I) THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM AROSE OR (II) $100.**`,
      `Some places do not allow certain limits on liability, so some of these limits may not apply to you. Nothing in these Terms limits liability that cannot be limited under the law that applies to you.`,
    ] },

    { h: '15. Indemnification', body: [
      `If someone brings a claim against us because of content you posted, your misuse of the Services, or your violation of these Terms or of the law, you agree to cover the resulting losses and reasonable costs, including reasonable attorneys' fees. We will tell you about any such claim promptly.`,
    ] },

    { h: '16. Dispute resolution: arbitration and class action waiver', body: [
      `**Please read this section carefully. It affects your legal rights.**`,
      { h3: '16.1 Talk to us first' },
      `Most concerns can be fixed quickly by emailing ${C.email}. Before either of us starts a formal proceeding, the party with the dispute must send the other a written notice that includes their name, the email address on the account (if any), a description of the dispute, and what they are asking for. Send notices to us at ${C.email} with the subject line "Dispute Notice." We will send notices to the email address on your account. We will each try in good faith to resolve the dispute for 60 days after the notice is received.`,
      { h3: '16.2 Agreement to arbitrate' },
      `If we cannot resolve it, **you and we agree that any dispute, claim, or controversy arising out of or relating to these Terms or the Services will be resolved by binding individual arbitration and not in court,** except that (a) either of us may bring an individual claim in small claims court if it qualifies, and (b) either of us may go to court to stop infringement or misuse of intellectual property.`,
      { h3: '16.3 How arbitration works' },
      `The arbitration will be administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules, available at adr.org. The Federal Arbitration Act governs this Section 16. The arbitration may be conducted by phone, by video, on written submissions, or in person in the county where you live or another location we both agree on. Payment of filing, administration, and arbitrator fees is governed by the AAA's rules. If your claim is for less than $10,000 and is not frivolous, we will reimburse your filing fee. The arbitrator may award the same individual relief that a court could award. Judgment on the award may be entered in any court with jurisdiction.`,
      { h3: '16.4 Class action and jury trial waiver' },
      `**YOU AND WE EACH WAIVE THE RIGHT TO A JURY TRIAL AND THE RIGHT TO BRING OR PARTICIPATE IN ANY CLASS, COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE ACTION OR ARBITRATION. CLAIMS MAY BE BROUGHT ONLY ON AN INDIVIDUAL BASIS.** If a court decides that this waiver cannot be enforced for a particular claim, then that claim (and only that claim) must be brought in court, and the rest of this Section 16 continues to apply.`,
      { h3: '16.5 Your right to opt out' },
      `**You can opt out of this agreement to arbitrate.** Email ${C.email} with the subject line "Arbitration Opt-Out" and include your name and the email address on your account, within 30 days after you first accept these Terms. If you were already a member when this version of the Terms took effect, you have 30 days from the date it took effect. If you opt out, Sections 16.2 through 16.4 will not apply to you, and disputes will be resolved in court under Section 17. Opting out does not affect any other part of these Terms.`,
      { h3: '16.6 Changes to this section' },
      `If we change this Section 16 in a material way, we will give you at least 30 days' notice, and you may reject the change by emailing us within that time, in which case the previous version of this section will continue to apply to you.`,
      { h3: '16.7 If you live outside the United States' },
      `Nothing in these Terms takes away consumer protection rights that you have under the mandatory laws of the country where you live.`,
    ] },

    { h: '17. Governing law and courts', body: [
      `These Terms are governed by the laws of the State of Utah, without regard to its conflict of laws rules, and by the Federal Arbitration Act where it applies. Any dispute that is not subject to arbitration will be heard only in the state or federal courts located in the State of Utah, and you and we consent to those courts.`,
    ] },

    { h: '18. Changes to these Terms', body: [
      `We may update these Terms from time to time. If a change is material, we will let you know by email or in the app at least 30 days before it takes effect, unless the law requires something different. If you keep using the Services after an update takes effect, you accept the updated Terms. If you do not agree, cancel your membership before the update takes effect. Updates do not apply to disputes that arose before the update took effect.`,
    ] },

    { h: '19. Copyright complaints', body: [
      `If you believe content on the Services infringes your copyright, send a notice to our copyright agent: ${C.legal}, Attn: Copyright Agent, ${C.address}, or ${C.email}. Your notice must include: your signature (physical or electronic); the work you believe was infringed; the content you believe is infringing and where it is located; your contact information; a statement that you have a good faith belief the use is not authorized by the copyright owner, its agent, or the law; and a statement, under penalty of perjury, that the information in your notice is accurate and that you are the owner or are authorized to act for the owner. We may remove content and close the accounts of repeat infringers. If your content was removed and you believe that was a mistake, you may send us a counter-notice with the information required by 17 U.S.C. 512(g)(3).`,
    ] },

    { h: '20. General', body: [
      `These Terms, together with our Privacy Policy, the offer terms shown at checkout, and any official rules for a promotion you enter, are the entire agreement between you and us about the Services. If any part of these Terms is found unenforceable, the rest remains in effect. If we do not enforce a provision, that is not a waiver of it. You may not transfer your rights under these Terms. We may transfer ours as part of a merger, acquisition, or sale of our business. We are not responsible for delays or failures caused by events outside our reasonable control. We may send you notices at the email address on your account, and you may send notices to us at the contact details below.`,
    ] },

    { h: '21. Contact us', body: [
      `${C.legal}, doing business as ${C.brand}`,
      `${C.address}`,
      `${C.email}`,
      `California residents: under California Civil Code Section 1789.3, you may contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, CA 95834, or by phone at (800) 952-5210.`,
    ] },
  ],

  notes: [
    `This is a plain-language draft prepared for attorney review. It is not legal advice and has not been reviewed by a lawyer.`,
    { h3: 'Decisions made by the business (Sept 19, 2026)' },
    { ul: [
      `Minimum age raised from 14 to 18.`,
      `Sold three ways: web checkout, Apple in-app purchase, Google Play.`,
      `Web cancellation is by email to support or by messaging support in the app. There is no self-serve cancel button today. Section 5.4 makes cancellation effective on the date the request is received.`,
      `Refunds: non-refundable except where required by law or where a specific money-back guarantee is offered at purchase (for example, the 7-day guarantee on the Rock the Fall challenge).`,
      `Disputes: AAA consumer arbitration, class waiver, small claims carve-out, 30-day opt-out. Utah law and courts for anything not arbitrated.`,
      `Written to cover every membership type, including fixed-term passes that convert to a recurring membership (Section 5.3), rather than any one promotion.`,
    ] },
    { h3: 'Questions for counsel' },
    { ul: [
      `Auto-renewal compliance (ROSCA, California ARL, and similar state laws): the enforceable disclosure and consent happen at checkout, not here. Please review the web checkout screen for the fixed-term pass that converts to a monthly membership: clear and conspicuous renewal terms next to the purchase button, affirmative consent, and a confirmation email with the terms and how to cancel.`,
      `Online cancellation: several states expect a member who signed up online to be able to cancel online without delay. Is email plus in-app messaging sufficient, or should a self-serve cancel button be added to the account page? (The business is open to building one.)`,
      `Section 5.5 commits to renewal and trial-conversion reminders only "where the law requires it." Confirm which reminders are required for these plans so the platform can send them.`,
      `Section 16: consider whether a mass-arbitration protocol is wanted, and confirm the $10,000 filing-fee reimbursement.`,
      `Existing members: the prior Terms were a partial template (one sentence per section, and an arbitration notice with no arbitration clause). Recommend the rollout: email notice to all members with 30 days' notice and the opt-out window.`,
      `Section 19: DMCA safe harbor requires registering the copyright agent with the U.S. Copyright Office. Not yet done as far as we know.`,
      `Contest rules (Rock the Fall) currently point disputes to Utah courts. They have been updated to defer to the dispute resolution section of these Terms once published.`,
    ] },
    { h3: 'Operational items for the product team' },
    { ul: [
      `Section 3: confirm what the platform does to an active web subscription when a member deletes their account in the app. If deletion does not cancel billing, consider making it do so, or blocking deletion until the membership is cancelled.`,
      `Section 5.4: support needs a process to log the date a cancellation request is received and to stop the next renewal even if the reply goes out later.`,
      `Publish with a visible "Last updated" date, and keep prior versions on file.`,
    ] },
  ],
};
