/* ==========================================================================
   Rock the Fall post-purchase emails — the copy

   Ten emails that go out AFTER someone buys. Redesigned from the existing Drip
   automation ("[CHALLENGE] 2026 Rock the Fall - Post Purchase Sign Up - First
   Time & Returning") to match the lander and the launch emails.

   The wording is the original wording. What changed is the design, the
   structure, and a handful of facts pulled straight off the live lander
   (the six guides and their descriptions, the mini-challenge prize examples,
   Heidi's photo). Anything added is listed in README-post-purchase.md.

     node emails/build.js

   Rules for this set (different from the launch set):
   - These people already bought. Never sell them the challenge again.
   - Buttons go off-site: the app, the Facebook group, a guide PDF, the
     coaching application. h.buttonExt() / h.aExt() carry the UTMs across.
   - Senders differ per email. h.sign(name, subtitle) takes both.

   `h` is the set of components from build.js.
   ========================================================================== */
'use strict';

const GROUP = 'https://www.facebook.com/groups/214000755857200';
const COACHING = 'https://www.nakedtraining.app/1-on-1-coaching-application';

/* Shared closing for the app + group + guides trio in the welcome emails. */
const supportNote = (h) =>
  h.note({
    title: 'Support at your fingertips',
    body: `Have any questions about the training, or just need help with your membership? We have coaches ready to help. Email us at ${h.mailto()}.`,
  });

/* The welcome email body, shared by the new and returning versions. Only the
   opening line differs, so it is passed in. */
const welcomeBody = (h, intro) => [
  h.pill('Rock the Fall &middot; 8-Week Challenge'),
  h.h1(`Welcome to the ${h.em('8-week challenge.')}`),
  h.img({ src: 'email/hero.jpg', alt: 'Brooke Ence stretching on a running track with red rock cliffs behind her', to: 'https://onelink.to/nakedtraining' }),
  h.hi(),
  h.p(intro),
  h.appDownload(),

  h.h2('Join a program'),
  h.p('The official challenge workouts go live on October 5. Until then, there are onboarding workouts waiting for you in the Rock the Fall program.'),
  h.p(`And remember: you can pick ${h.b('any')} program in the app and it still counts toward the challenge.`),

  h.h2('Download your guides'),
  h.p('Learn flexible dieting, get your personalized macros, and start accelerating your results. All six are yours.'),
  h.guides(),

  h.h2('Join the group'),
  h.p('Much like skinny dipping, you just have to dive in. Introduce yourself to the community and get help from our members and coaches whenever you need it.'),
  h.buttonExt(GROUP, 'Join the member-only group'),

  supportNote(h),
  h.sign('Brooke', 'and the Naked Training team'),
];

/* Community email body. The headline and button label differ between the new
   and returning versions; everything else is shared. */
const communityBody = (h, { title, button }) => [
  h.pill('Members only'),
  h.h1(title),
  h.img({ src: 'community.jpg', alt: 'Naked Training members training together', to: GROUP }),
  h.p('We believe everyone should feel confident in and out of their clothes. With the right plan and a community of like-minded people, we can all get there. Be a part of that community.'),
  h.p(`Plus, we host ${h.b('mini-challenges only inside the group')}, where you can win some pretty amazing prizes.`),
  h.buttonExt(GROUP, button),

  /* Real posts from the member group, typeset instead of screenshotted.
     Names follow the lander: first name + last initial. */
  h.h2('Time to show it off'),
  h.quoteCard({
    compact: true,
    quote: "Y'all... I'm literally crying. This has been the most rewarding experience and I feel so supported and encouraged to keep going! Being a part of this group hasn't only been helpful, it's been reliable and something that pushed me to do what I had put off for a long time.",
    name: 'Colissa N.',
  }),
  h.quoteCard({
    compact: true,
    quote: 'I am proud of myself for finishing this challenge! I have started many in the past but never followed through to the end. Thank you Naked community for the encouragement and support.',
    name: 'Kar B.',
  }),
  h.quoteCard({
    compact: true,
    quote: "Thank you to everyone in this group & to the folks in charge. I just competed in my first strongman event this weekend as a solo competitor, novice division. If it hadn't been for giving me an organized program & all of your posts popping up in my feed to remind me to work out, I really don't think I would have been even remotely ready for this. So while I'm not 100% compliant food wise or programming wise, I'm 100% further than I would've been without it.",
    name: 'Michelle F.',
  }),
  h.spacer(12),
  h.sign('Brooke', 'and the Naked Training team'),
];

module.exports = [
  /* ------------------------------------------------------------------ 1 */
  {
    n: 1,
    id: 'p1-whats-next',
    file: '01-whats-next.html',
    name: "What's Next",
    audience: 'Everyone who buys (new and returning)',
    send: 'Immediately after purchase',
    subject: "You're in. Here's what's next.",
    altSubjects: ['Welcome to Rock the Fall', 'Three things to do first'],
    preview: "Download the app, join the group, grab your guides. Takes about five minutes.",
    body: (h) => [
      h.pill("Rock the Fall &middot; You're in"),
      h.h1(`You're in. Here's ${h.em("what's next.")}`),
      h.hi(),
      h.p('Thank you for joining the 2026 Rock the Fall Challenge.'),
      h.p("This fall is going to be a good one, and we're crushing these workouts together. Before we get started, let's get you set up."),
      h.nextSteps([
        {
          title: 'Download the app',
          text: `Get the app ${h.aExt('here', 'https://onelink.to/nakedtraining')}. Join the official Rock the Fall program, or pick any program in the app. Every one counts toward the challenge.`,
        },
        {
          title: 'Join the group',
          text: `Jump into the ${h.aExt('community group', GROUP)}, where our coaches are at your fingertips. It's your go-to space for tips, motivation, and support from people who get it.`,
        },
        {
          title: 'Download your guides',
          text: "In a few minutes you'll get another email with all your guides: flexible dieting, supplements, recipes, and more. Grab them and get set for progress.",
        },
      ]),
      h.appDownload(),
      h.p('See you soon.', { pb: 10 }),
      h.sign('Brooke', 'and the Naked Training team'),
      h.ps(`${h.b('P.S.')} The official rules of entry email goes out on October 3. You can also read the full rules any time on the ${h.rulesLink('rules page')}.`),
    ],
  },

  /* ------------------------------------------------------------------ 2 */
  {
    n: 2,
    id: 'p2-welcome-new',
    file: '02-welcome-new.html',
    name: 'Welcome & Downloads — New',
    audience: 'First-time members',
    send: 'A few minutes after email 1',
    subject: 'Your guides are here',
    altSubjects: ['Welcome to the #NakedFam', 'Everything you just unlocked'],
    preview: 'Your six guides, the app, and the members-only group. All in one place.',
    body: (h) => welcomeBody(
      h,
      `Welcome to Naked Training and the 8-Week Rock the Fall Challenge. The road to new PRs and more confidence taking those clothes off starts today.`,
    ),
  },

  /* ------------------------------------------------------------------ 3 */
  {
    n: 3,
    id: 'p3-welcome-returning',
    file: '03-welcome-returning.html',
    name: 'Welcome & Downloads — Returning',
    audience: 'Returning members',
    send: 'A few minutes after email 1',
    subject: 'Welcome back. Your guides are here.',
    altSubjects: ['Round two starts now', 'Good to have you back'],
    preview: 'Your six guides, the app, and the members-only group. All in one place.',
    body: (h) => welcomeBody(
      h,
      `Welcome back to Naked Training and the 8-Week Rock the Fall Challenge. We're glad to have you back for another round of Naked. Let's get started.`,
    ),
  },

  /* ------------------------------------------------------------------ 4 */
  {
    n: 4,
    id: 'p4-concierge-new',
    file: '04-concierge-new.html',
    name: 'Member Concierge — New',
    audience: 'First-time members',
    send: 'Day 2',
    subject: 'Anything you need, just ask',
    altSubjects: ["I'm your person for the next 8 weeks", 'Questions? Hit reply.'],
    preview: "Paula from the Naked Success Team. Reply to this email and ask me literally anything.",
    body: (h) => [
      h.pill('Naked Success Team'),
      h.h1(`Anything you need, ${h.em('just ask.')}`),
      h.hi(),
      h.p("Paula here from the Naked Success Team. I know the first couple of days are always a little crazy getting settled in, so I just want you to know I'm here to help."),
      h.p(`Need help navigating the app or finding the right program? ${h.b('Just hit reply and ask away.')} Like literally, you can ask me anything. Want to know:`),
      h.asks([
        'How do I combine these workouts with my CrossFit box workouts?',
        'What shoes is everyone in the community rocking?',
      ]),
      h.p("Anything! I'm here to support you and make sure you have a smooth ride through this challenge."),
      h.p('Cheers,', { pb: 10 }),
      h.sign('Paula', 'and the Naked Success Team'),
    ],
  },

  /* ------------------------------------------------------------------ 5 */
  {
    n: 5,
    id: 'p5-concierge-returning',
    file: '05-concierge-returning.html',
    name: 'Member Concierge — Returning',
    audience: 'Returning members',
    send: 'Day 2',
    subject: 'Anything you need, just ask',
    altSubjects: ["I'm your person for the next 8 weeks", 'Questions? Hit reply.'],
    preview: "Paula from the Naked Success Team. Reply to this email and ask me literally anything.",
    body: (h) => [
      h.pill('Naked Success Team'),
      h.h1(`Anything you need, ${h.em('just ask.')}`),
      h.hi(),
      h.p("Paula here from the Naked Success Team. I know the first couple of days are always a little crazy getting settled in, so I just want you to know I'm here to help."),
      h.p(`Need help navigating the app or finding the right program? ${h.b('Just hit reply and ask away.')} Like literally, you can ask me anything. Want to know:`),
      h.asks([
        'How do I combine these workouts with my CrossFit box workouts?',
        'What shoes is everyone in the community rocking?',
      ]),
      h.p("Anything! I'm here to support you and make sure you have a smooth ride through this challenge."),
      h.p('Cheers,', { pb: 10 }),
      h.sign('Paula', 'and the Naked Success Team'),
    ],
  },

  /* ------------------------------------------------------------------ 6 */
  {
    n: 6,
    id: 'p6-community-new',
    file: '06-community-new.html',
    name: 'Community — New',
    audience: 'First-time members',
    send: 'Day 3',
    subject: 'Ask questions, get coached',
    altSubjects: ['Come say hi in the group', "Don't do this one alone"],
    preview: 'Ask questions, get coached, and help other members. Plus group-only mini-challenges with prizes.',
    body: (h) => communityBody(h, {
      title: `Ask questions. ${h.em('Get coached.')}`,
      button: 'Join our members-only group',
    }),
  },

  /* ------------------------------------------------------------------ 7 */
  {
    n: 7,
    id: 'p7-community-returning',
    file: '07-community-returning.html',
    name: 'Community — Returning',
    audience: 'Returning members',
    send: 'Day 3',
    subject: 'Get coached, ask questions, help others',
    altSubjects: ['Back in the group', 'Your people are in here'],
    preview: 'Get coached, ask questions, and help other members. Plus group-only mini-challenges with prizes.',
    body: (h) => communityBody(h, {
      title: `Get coached. ${h.em('Help others.')}`,
      button: 'Join members-only group',
    }),
  },

  /* ------------------------------------------------------------------ 8 */
  {
    n: 8,
    id: 'p8-coaching-offer',
    file: '08-coaching-offer.html',
    name: 'Coaching Offer',
    audience: 'All challengers',
    send: 'Week 1',
    subject: '50% off 1-on-1 coaching, challengers only',
    altSubjects: ['Imagine how much further you could go', 'Want a coach in your corner?'],
    preview: "You've already committed. A coach makes it stick. 50% off for Rock the Fall challengers.",
    body: (h) => [
      h.pill('Challengers only &middot; 50% off'),
      h.h1(`You've committed. ${h.em('Now go further.')}`),
      h.hi(),
      h.p("If you've ever asked yourself:"),
      h.asks([
        'Am I eating enough to actually make progress?',
        'Why do I always fall off when life gets busy?',
        'How do I stay consistent when nothing feels easy?',
      ]),
      h.p('This is the answer.', { bold: true }),
      h.p("You're already in the 8-Week Challenge. You've committed. You're showing up. Now imagine how much further you could go with a coach by your side."),
      h.offerPanel({
        eyebrow: 'Challengers only',
        title: `50% off<br><em style="font-style:italic;font-weight:500;color:#F08A4B;">1-on-1 coaching.</em>`,
        sub: "We're opening up 1-on-1 coaching exclusively for Rock the Fall challengers.",
      }),
      h.buttonExt(COACHING, 'Book your free goal assessment call'),

      h.h2("With 1-on-1 coaching, you'll get"),
      h.checklist([
        `${h.b('A custom nutrition plan')} made for your body and your goals.`,
        `${h.b('Weekly check-ins')} and direct support from your coach.`,
        `${h.b('Help staying on track')} when motivation disappears.`,
        `${h.b('Real answers')} to your questions about food, training, and life.`,
      ]),
      h.p('Our coaches are certified, experienced, and all-in on helping you win. They hold credentials like Precision Nutrition, NASM, and CSCS. More importantly, they have helped thousands of people like you make real, lasting change.'),
      h.p("You'll be matched with someone who understands what you're working toward and knows how to help you get there."),
      h.note({
        eyebrow: 'Limited spots',
        title: 'This offer is for challengers only.',
        body: "Spots are limited. Once they're full, they're full. If you want this to be the time it finally clicks, now is the time to make it personal.",
      }),
      h.buttonExt(COACHING, 'Grab your spot at 50% off'),
      h.p("You've already started. Let's take it all the way.", { pb: 10 }),
      h.sign('Team Naked'),
    ],
  },

  /* ------------------------------------------------------------------ 9 */
  {
    n: 9,
    id: 'p9-heidi-coaching',
    file: '09-heidi-coaching.html',
    name: 'Coaching Offer — Heidi',
    audience: 'All challengers',
    send: 'Week 2',
    subject: 'What six months of coaching did for Heidi',
    altSubjects: ['"Just a better version of her"', 'Imagine where you could be in six months'],
    preview: 'Better strength, better sleep, balanced hormones, energy through the roof. Then she said the part that matters.',
    body: (h) => [
      h.pill('Member spotlight'),
      h.h1(`What if you ${h.em('locked in?')}`),
      h.quoteCard({
        // Her coaching before/after, cropped from the original Drip email. NOT the
        // lander's heidi.jpg, which is her challenge result.
        src: 'email/heidi-coaching.jpg',
        imgW: 360,
        alt: 'Heidi L. doing kettlebell swings, before and after starting 1-on-1 coaching',
        quote: 'This is about so much more than just physical appearance. In the last 6 months I have gained better strength, improved endurance, better sleep, balanced hormones, proper hydration, energy through the roof, and regained my self-confidence. I am still the same beautiful person I have always been, just a better version of her.',
        name: 'Heidi L.',
        role: 'Naked Coaching client',
      }),
      h.p("Imagine where you'd be if you fully committed for the next six months, just like Heidi did."),
      h.p('With her 1-on-1 coach, she dialed in her nutrition, trained consistently, and followed a plan built for real progress.'),
      h.p('The result was a total transformation. Not just on the outside, but in how she felt every single day.'),
      h.p("Now it's your turn.", { bold: true }),
      h.p('Apply for coaching today and get 50% off for being part of the challenge.'),
      h.buttonExt(COACHING, 'Apply today'),
      h.p("You already know what happens when you put this off. So let's find out what happens when you go all in.", { pb: 10 }),
      h.sign('Brooke'),
    ],
  },

  /* ----------------------------------------------------------------- 10 */
  {
    n: 10,
    id: 'p10-final-coaching',
    file: '10-final-coaching.html',
    name: 'Coaching Offer — Final',
    audience: 'All challengers',
    send: 'Week 3',
    subject: 'If you want results faster, read this',
    altSubjects: ['Last chance for 50% off coaching', 'Consistency beats perfection'],
    preview: "You shouldn't have to choose between progress and living your life. Spots are almost full.",
    body: (h) => [
      h.pill('Last call &middot; 50% off'),
      h.h1(`Consistency beats ${h.em('perfection.')}`),
      h.hi(),
      h.p("You shouldn't have to choose between progress and living your life."),
      h.p('1-on-1 coaching helps you stay consistent without giving up the stuff you enjoy. The dinners out, the weekend trips, the drinks with friends.'),
      h.p("Because here's the truth: consistency beats perfection. And having a coach makes consistency easier. Which means better results. Period."),
      h.p('You get weekly check-ins, a custom plan built around your schedule, and someone who actually knows how to adjust when life hits.'),

      h.h2("Here's how to get started"),
      h.nextSteps([
        { title: 'Fill out the quick application' },
        { title: 'Book a short blueprint call', text: 'Find out your goals.' },
        { title: 'Get matched with your coach' },
      ]),
      h.note({
        eyebrow: 'Almost full',
        title: 'This is your last chance at 50% off.',
        body: 'Spots are nearly gone. The discount is only for Rock the Fall challengers.',
      }),
      h.buttonExt(COACHING, 'Apply now and lock in your spot'),
      h.p("You can have the life you want and the results you're after. Coaching just makes it easier to do both.", { pb: 10 }),
      h.sign('Brooke'),
      h.ps(`${h.b('P.S.')} Here's a win from one of our coaching clients, Brittany. She already knew how to track macros. All she needed was that little push a coach can give you.`),
      h.spacer(14),
      h.img({ src: 'email/brittany-coaching.jpg', alt: 'Brittany before and after 1-on-1 coaching', to: COACHING, pb: 8 }),
    ],
  },
];
