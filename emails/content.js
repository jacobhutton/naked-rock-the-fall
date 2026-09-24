/* ==========================================================================
   Rock the Fall launch emails — the copy

   Eight emails to the main list (leads + lapsed members), in Brooke's voice.
   Every fact here comes from the live lander or rules.html. If one of those
   changes (price, dates, prize, guarantee), change it here too, then run:

     node emails/build.js

   Rules carried over from the lander:
   - Every button says "Join the Challenge" (the button helper does this).
   - No end date for the challenge anywhere.
   - No mention of what happens after the 10 weeks. That lives in the lander FAQ only.

   `h` is the set of components from build.js: h.p() is a paragraph, h.h1() a
   headline, h.em() the orange italic accent, h.b() bold, h.button() the CTA.
   ========================================================================== */
'use strict';

module.exports = [
  /* ------------------------------------------------------------------ 1 */
  {
    n: 1,
    id: 'e1-launch',
    file: '01-launch.html',
    name: 'Launch',
    send: 'Tue Sep 22 · 6:30 AM MT',
    subject: 'Win $2,000 in my 8-week fall challenge',
    altSubjects: ["Don't wait until January", 'I want you in this one'],
    preview: "We start October 5. Train at home or the gym. You don't have to be the fittest to win.",
    body: (h) => [
      h.pill('Rock the Fall &middot; 8-Week Challenge'),
      h.h1(`Fall is here. Let's get to ${h.em('work.')}`),
      h.img({ src: 'email/hero.jpg', alt: 'Brooke Ence stretching on a running track with red rock cliffs behind her' }),
      h.hi(),
      h.p("Rock the Fall is officially open, and I want you in it."),
      h.p('8 weeks. Kicking off Monday, October 5.'),
      h.p('Here\'s how fall usually goes. School starts, the days get shorter, and suddenly there are a hundred reasons to skip a workout. Then the holidays hit, and everyone throws in the towel and says, "I\'ll start fresh in January."'),
      h.p('Not this year.'),
      h.p("I built Rock the Fall so you walk into the holidays already strong, already confident, and already ahead. No starting over. No New Year's scramble."),
      h.p("Here's what you're getting:", { bold: true, pb: 14 }),
      h.checklist([
        `${h.b('A daily training plan.')} Run the Rock the Fall program or any program in the app. Full gym, home, or hotel room, every workout counts.`,
        `${h.b('Nutrition that actually fits your life.')} Simple guidance, no extremes. Plus over $300 in guides, included.`,
        `${h.b('A community that shows up with you.')} New mini-challenges and prizes every two weeks to keep you fired up.`,
        `${h.b('A shot at $2,000.')} Five winners. $2,000 each.`,
      ]),
      h.p("And you don't have to be the fittest person in the room to win. Winners are chosen on two things: your transformation and how active you are in the community. Show up, put in the work, and you're in the running."),
      h.p('Join for $50, or grab a full year in the app for $149. You get access the second you sign up, so you can settle in before kickoff.'),
      h.button(),
      h.facts(),
      h.p("Let's get to work.", { pb: 10 }),
      h.sign(),
      h.ps(`${h.b('P.S.')} Try it risk-free for 7 days. If you're not happy, we'll refund you in full. No questions asked.`),
    ],
  },

  /* ------------------------------------------------------------------ 2 */
  {
    n: 2,
    id: 'e2-program',
    file: '02-program.html',
    variant: 'method', // the lander only shows the 6-12-25 block when asked; this email is about it

    name: 'The program',
    send: 'Thu Sep 24 · 6:30 AM MT',
    subject: 'How 6-12-25 works',
    altSubjects: ['The two methods behind Rock the Fall', 'Build more in less time'],
    preview: "One muscle group. Three exercises. No rest. Here's what the training in Rock the Fall looks like.",
    body: (h) => [
      h.eyebrow('The training'),
      h.h1(`Two methods that make ${h.em('every set count.')}`),
      h.hi(),
      h.p("Here's what the training in Rock the Fall actually looks like."),
      h.p('I built the program around two techniques. Both help you build strength and muscle in less time, which matters when your schedule is already full.', { pb: 24 }),
      h.method({
        src: 'email/reel-6-12-25.jpg',
        alt: 'Play video: Brooke explains the 6-12-25 method',
        eyebrow: 'Watch me break it down',
        title: 'The 6-12-25 method',
        body: 'One muscle group. Three exercises. No rest in between. You start heavy, finish light, and get more done in less time.',
        diagram: h.repsDiagram(),
      }),
      h.method({
        src: 'email/reel-mechanical.jpg',
        alt: 'Play video: mechanical advantage training in action',
        eyebrow: 'See it in action',
        title: 'Mechanical advantage training',
        body: 'When a movement gets too hard, you switch to an easier variation and keep going. You push further without breaking form.',
        diagram: h.flowDiagram(),
      }),
      h.p(`Both videos are on the challenge page. ${h.a('Watch them here.', '#programs-title')}`, { pb: 22 }),
      h.h2('Not your style? Pick any program.'),
      h.p("You don't have to do the Rock the Fall program. You can enter the challenge with any program in the Naked Training app, and every one counts toward the prize:"),
      h.checklist([
        `${h.b('Functional Gym.')} Barbells, kettlebells, and turf work.`,
        `${h.b('Home Workouts.')} All you need is dumbbells and bands.`,
        `${h.b('Bodybuilding.')} Build muscle and change your shape.`,
        `${h.b('Travel &amp; Bodyweight.')} No gym, no problem.`,
        `${h.b('Peaches.')} Glute-focused, to grow and shape your lower body.`,
        `${h.b('Lifestyle.')} A balanced approach that fits your everyday routine.`,
      ]),
      h.p('We start October 5. You get app access as soon as you join, so you can pick your program and get comfortable before kickoff.'),
      h.button(),
      h.sign(),
    ],
  },

  /* ------------------------------------------------------------------ 3 */
  {
    n: 3,
    id: 'e3-results',
    file: '03-results.html',
    name: 'Results',
    send: 'Sun Sep 27 · 7:00 AM MT',
    subject: '"The first one I actually finished"',
    altSubjects: ['What eight weeks actually looks like', 'Meet Kadee, Heidi and Elena'],
    preview: "Kadee lost 10 lbs and set new PRs. Here's what she says made the difference.",
    body: (h) => [
      h.eyebrow('Real results'),
      h.h1(`What eight weeks ${h.em('actually')} looks like.`),
      h.hi(),
      h.p('More than 15,000 challengers have come through my challenges. I want you to meet three of them.', { pb: 24 }),
      h.result({
        src: 'kadee.jpg',
        alt: 'Kadee B. before and after the challenge',
        tag: 'Lost 10 lbs and set new PRs',
        quote: "I've tried a million programs, but this was the first one I actually finished. The daily structure took all the guesswork out.",
        name: 'Kadee B.',
      }),
      h.result({
        src: 'heidi.jpg',
        alt: 'Heidi L. before and after the challenge',
        tag: 'Found true confidence',
        quote: 'For the first time in my entire life, I can truly say I love my body, not just for how it looks, but for how it feels and what it can do.',
        name: 'Heidi L.',
      }),
      h.result({
        src: 'elena.jpg',
        alt: 'Elena R. before and after the challenge',
        tag: 'Gained strength and confidence',
        quote: 'While I LOVE the workouts, especially since there are videos for each exercise, I loved getting on the FB feed every day to see what everyone was up to.',
        name: 'Elena R.',
      }),
      h.spacer(8),
      h.p('Notice what they talk about. Kadee talks about structure. Heidi talks about what her body can do. Elena talks about the community.'),
      h.p("Nobody says they finally found more willpower. You don't need more motivation. You need a plan, and people in your corner. That's what Rock the Fall is."),
      h.p('We start October 5.'),
      h.button(),
      h.sign(),
      h.spacer(14),
      h.fine('Individual results vary and depend on consistency with training and nutrition.'),
    ],
  },

  /* ------------------------------------------------------------------ 4 */
  {
    n: 4,
    id: 'e4-prize',
    file: '04-prize.html',
    name: 'The prize',
    send: 'Tue Sep 29 · 6:30 AM MT',
    subject: '5 winners. $2,000 each.',
    altSubjects: ["You don't have to be the fittest one here", 'How the $2,000 winners are chosen'],
    preview: "You don't have to be the most advanced person in the challenge. Here's exactly how winners are chosen.",
    body: (h) => [
      h.prizePanel(),
      h.hi(),
      h.p('Five challengers in Rock the Fall will each take home $2,000.'),
      h.p("Here's exactly how winners are chosen, because it's probably not what you'd guess.", { pb: 22 }),
      h.stats([
        { num: '70%', label: 'Your transformation', text: 'The change between your starting and final photos, judged against where you began. Not against anyone else.' },
        { num: '30%', label: 'Showing up', text: 'How consistently you show up in our private community. Check-ins, posts, and supporting other women.' },
      ]),
      h.p('My coaching team and I score every entry, and the five highest scores win.'),
      h.p("So you don't have to be the most advanced person in the challenge. You just have to show up."),
      h.p("Here's how it works:", { bold: true, pb: 16 }),
      h.steps([
        { title: 'Take your starting photos', text: 'Front, side, and back, during kickoff week. Hold onto them.' },
        { title: 'Train and show up in the community', text: 'Any program counts. Post, check in, and support other women along the way.' },
        { title: 'Submit your final photos', text: 'Send in your before and after photos at the end of week 8.' },
      ]),
      h.p("There's more to win along the way, too. Every two weeks we drop a new mini-challenge, like hydration and sleep, daily steps, or protein goals, with prizes like a Stanley cup, a $50 Lululemon gift card, or a Theragun Mini."),
      h.p('Both ways in are eligible for the $2,000: the $50 challenge and the $149 yearly membership.'),
      h.button(),
      h.p(`The full details are in the ${h.rulesLink('official rules')}.`, { size: 15 }),
      h.sign(),
    ],
  },

  /* ------------------------------------------------------------------ 5 */
  {
    n: 5,
    id: 'e5-faq',
    file: '05-faq.html',
    name: 'Questions',
    send: 'Thu Oct 1 · 6:30 AM MT',
    subject: '"I\'m out of shape. Is this for me?"',
    altSubjects: ['Do I need a gym?', 'Straight answers before Monday'],
    preview: "Yes. Also: you don't need a gym, missing a day is fine, and you have 7 days to change your mind.",
    body: (h) => [
      h.eyebrow('Questions'),
      h.h1(`Good questions. ${h.em('Straight answers.')}`),
      h.hi(),
      h.p("Enrollment for Rock the Fall closes Monday night. If you're on the fence, one of these is probably why.", { pb: 24 }),
      h.qa("I'm out of shape. Is this for me?", "Yes. There are beginner-friendly programs, and every workout can be scaled to your level. Winners are chosen by transformation and participation, not by who's already fittest."),
      h.qa('Do I need a gym?', 'No. Choose Home Workouts or Travel &amp; Bodyweight, or train with any program that fits your setup. Every program counts.'),
      h.qa('What if I miss a day?', 'Nothing happens. Pick back up the next day. Winners are chosen on their overall transformation and how they show up in the community, not on a perfect streak.'),
      h.qa('What do I actually get?', 'Every program, workout, and coaching video in the app. Mobility and recovery sessions. Simple nutrition guidance. And over $300 in guides: the Flexible Dieting Guide, Fast Food Guide, Macro Recipe Book, Supplement Guide, Perfect Week Workbook, and Muscle Building Guide.'),
      h.qa('Should I do the $50 or the $149?', 'The $50 challenge gets you Rock the Fall and 10 weeks of app access. The $149 yearly membership gets you 12 months and three challenges, including this one. That works out to less than $13 a month. Both are eligible for the $2,000 prize.'),
      h.qa("What if it's not for me?", "If you're not happy in the first 7 days, we'll refund you in full. No questions asked."),
      h.pricing(),
      h.button('#pricing'),
      h.sign(),
    ],
  },

  /* ------------------------------------------------------------------ 6 */
  {
    n: 6,
    id: 'e6-tomorrow',
    file: '06-closes-tomorrow.html',
    name: 'Closes tomorrow',
    send: 'Sun Oct 4 · 7:00 AM MT',
    subject: 'Enrollment closes tomorrow night',
    altSubjects: ['We start tomorrow', 'One day left to join Rock the Fall'],
    preview: 'Rock the Fall kicks off tomorrow. Enrollment closes at 11:59 PM Mountain.',
    body: (h) => [
      h.eyebrow('One day left'),
      h.h1(`We start ${h.em('tomorrow.')}`),
      h.img({ src: 'email/brooke.jpg', alt: 'Brooke Ence smiling and flexing her arm in the gym', hash: '#pricing' }),
      h.hi(),
      h.p('Rock the Fall kicks off tomorrow, and enrollment closes tomorrow night at 11:59 PM Mountain Time. After that, enrollment is closed.'),
      h.p("Here's what you're joining:", { bold: true, pb: 14 }),
      h.checklist([
        'Eight weeks of training with me, using any program in the app',
        'Simple nutrition guidance and over $300 in guides',
        'A community that keeps you accountable, with mini-challenges every two weeks',
        'A chance at one of five $2,000 prizes',
        '7 days to try it risk-free',
      ]),
      h.p("If you've been going back and forth, here's how I see it. Most people wait until January. I built Rock the Fall so you can walk into the holidays already feeling strong, not starting over."),
      h.p('$50 for the challenge. $149 for the full year. You get app access as soon as you join.'),
      h.button('#pricing'),
      h.sign(),
      h.ps(`${h.b('P.S.')} Worried you're not ready? You don't have to be. There are beginner-friendly programs, and every workout can be scaled to your level.`),
    ],
  },

  /* ------------------------------------------------------------------ 7 */
  {
    n: 7,
    id: 'e7-last-day',
    file: '07-last-day.html',
    name: 'Last day (morning)',
    send: 'Mon Oct 5 · 6:30 AM MT',
    subject: 'We start today',
    altSubjects: ['Last day to join Rock the Fall', "Today's the day"],
    preview: 'Rock the Fall kicks off this morning. Enrollment closes tonight at 11:59 PM Mountain.',
    body: (h) => [
      h.eyebrow('Last day to join'),
      h.h1(`Today's ${h.em('the day.')}`),
      h.hi(),
      h.p('Rock the Fall starts today.'),
      h.p("If you join today, you're not behind. Here's what day one looks like:", { pb: 20 }),
      h.steps([
        { title: 'Join the challenge', text: 'You get instant access to the app, the community, and all the guides.' },
        { title: 'Pick your program', text: 'Start Rock the Fall or choose any program in the app.' },
        { title: 'Take your starting photos', text: 'Front, side, and back, any time this week. Then begin your eight weeks.' },
      ]),
      h.p("Follow the plan. That's it."),
      h.p(`${h.b('Enrollment closes tonight at 11:59 PM Mountain Time.')}`),
      h.pricing(),
      h.button('#pricing'),
      h.sign(),
      h.ps(`${h.b('P.S.')} Try it risk-free for 7 days. If you're not happy, we'll refund you in full.`),
    ],
  },

  /* ------------------------------------------------------------------ 8 */
  {
    n: 8,
    id: 'e8-final-hours',
    file: '08-final-hours.html',
    name: 'Last day (evening)',
    send: 'Mon Oct 5 · 6:00 PM MT',
    subject: 'Closing tonight',
    altSubjects: ['Last call for Rock the Fall', "Fall doesn't wait"],
    preview: 'Last call. Enrollment for Rock the Fall closes at 11:59 PM Mountain.',
    body: (h) => [
      h.closingPanel({ line: 'Enrollment closes tonight at 11:59 PM Mountain.' }),
      h.hi(),
      h.p('This is my last email about Rock the Fall.'),
      h.p("Enrollment closes tonight at 11:59 PM Mountain Time. That's 10:59 PM Pacific and 1:59 AM Eastern."),
      h.p('A clear plan, a community in your corner, and $2,000 on the line. $50 for the challenge, or $149 for the full year.'),
      h.p("If you're in, I'll see you inside. If now isn't the time, no hard feelings. I'm glad you're here either way."),
      h.button('#pricing'),
      h.sign(),
      h.ps(`${h.b('P.S.')} You have 7 days to try it. If you're not happy, we'll refund you in full.`),
    ],
  },
];
