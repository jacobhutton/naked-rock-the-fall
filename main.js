/* ==========================================================================
   Rock the Fall — page behavior
   Everything you're likely to change is in CONFIG. Values still in [brackets]
   are treated as "not set yet" and the page degrades safely around them.
   ========================================================================== */
(() => {
  'use strict';

  const CONFIG = {
    // Stackt web checkout. Any query params already on these URLs are kept.
    checkout: {
      challenge: '[$50 checkout URL]',
      yearly: '[$149 checkout URL]',
    },

    // Used for the InitiateCheckout event value.
    plans: {
      challenge: { name: 'Rock the Fall Challenge', id: 'rtf-challenge', value: 50 },
      yearly: { name: 'Yearly Membership', id: 'rtf-yearly', value: 149 },
    },

    // Enrollment close: 11:59 PM Mountain Time, October 5, 2026 (MDT = UTC-6).
    deadline: '2026-10-05T23:59:59-06:00',

    links: {
      rules: '', // blank = the built-in rules.html page. Set a URL only if the rules live somewhere else.
      privacy: 'https://app.nakedtraining.app/privacy-policy',
      terms: 'https://app.nakedtraining.app/terms-of-service',
    },

    // Fill in ONE of these. If your GTM container already loads the Meta Pixel,
    // leave pixelId alone or events will double-fire.
    tracking: {
      gtmId: 'GTM-WH3HZVV',
      pixelId: '[Meta Pixel ID]',
    },

    // Ad parameters carried from the landing URL through to checkout.
    passThroughParams: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'],

    // A direct MP4 URL (720p, under ~5MB, 15-30s) or a Vimeo link (https://vimeo.com/123456789).
    // poster = still frame shown while loading.
    reels: {
      six1225: { src: 'https://vimeo.com/1228917039', poster: 'images/reel-6-12-25-poster.webp' },
      mechanical: { src: 'https://vimeo.com/1228914000', poster: 'images/reel-mechanical-poster.webp' },
    },
  };

  const isSet = (v) => typeof v === 'string' && v.trim() !== '' && !/^\[.*\]$/.test(v.trim());
  const isUrl = (v) => isSet(v) && /^https?:\/\//i.test(v.trim());
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const params = new URLSearchParams(window.location.search);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     Attribution: keep ad params for the session, add them to checkout links
     ------------------------------------------------------------------------ */
  const Attribution = (() => {
    const KEY = 'rtf_attribution';
    let memory = {}; // fallback when sessionStorage is blocked

    const read = () => {
      try { return JSON.parse(sessionStorage.getItem(KEY)) || memory; } catch (e) { return memory; }
    };
    const write = (data) => {
      memory = data;
      try { sessionStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* private mode etc. */ }
    };

    return {
      capture() {
        const stored = read();
        CONFIG.passThroughParams.forEach((key) => {
          const value = params.get(key);
          if (value) stored[key] = value; // newest click wins
        });
        write(stored);
      },
      decorate(url) {
        try {
          const out = new URL(url);
          Object.entries(read()).forEach(([key, value]) => {
            if (!out.searchParams.has(key)) out.searchParams.set(key, value); // never overwrite the checkout URL's own params
          });
          return out.toString();
        } catch (e) {
          return url;
        }
      },
    };
  })();

  /* ------------------------------------------------------------------------
     Tracking: GTM dataLayer and/or Meta Pixel. Never fires Purchase.
     ------------------------------------------------------------------------ */
  const Tracking = (() => {
    let pixelLoadedHere = false;

    const loadGTM = (id) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(id);
      document.head.appendChild(s);
    };

    const loadPixel = (id) => {
      /* Standard Meta Pixel bootstrap */
      if (!window.fbq) {
        const n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!window._fbq) window._fbq = n;
        n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://connect.facebook.net/en_US/fbevents.js';
        document.head.appendChild(s);
      }
      window.fbq('init', id);
      window.fbq('track', 'PageView');
      pixelLoadedHere = true;
    };

    return {
      init() {
        try {
          window.dataLayer = window.dataLayer || [];
          // The pixel stub is tiny, so it starts right away.
          if (isSet(CONFIG.tracking.pixelId)) loadPixel(CONFIG.tracking.pixelId.trim());

          // GTM containers are heavy (this one pulls in GA4, two Meta pixels, Google Ads, Drip, Clarity).
          // On a fast host the window "load" event fires before the hero image has painted, so starting
          // GTM right at load makes all that script work compete with the first paint. Instead GTM starts
          // on the visitor's first interaction, or GTM_DELAY_MS after load, whichever comes first.
          // dataLayer events pushed before then are queued, not lost.
          if (isSet(CONFIG.tracking.gtmId)) {
            const GTM_DELAY_MS = 2000;
            const wake = ['scroll', 'pointerdown', 'touchstart', 'keydown'];
            let started = false;
            const start = () => {
              if (started) return;
              started = true;
              wake.forEach((type) => window.removeEventListener(type, start, { capture: true }));
              loadGTM(CONFIG.tracking.gtmId.trim());
            };
            wake.forEach((type) => window.addEventListener(type, start, { capture: true, passive: true }));
            const arm = () => window.setTimeout(start, GTM_DELAY_MS);
            if (document.readyState === 'complete') arm();
            else window.addEventListener('load', arm, { once: true });
          }
        } catch (e) { /* tracking must never break the page */ }
      },
      // Pushes to the dataLayer for GTM, and calls fbq directly only if this file loaded the pixel.
      track(event, data = {}) {
        try {
          window.dataLayer.push({ event, ...data });
          if (pixelLoadedHere && window.fbq) window.fbq('track', event, data);
        } catch (e) { /* ignore */ }
      },
    };
  })();

  /* ------------------------------------------------------------------------
     Checkout buttons
     ------------------------------------------------------------------------ */
  const initCheckout = () => {
    $$('[data-checkout]').forEach((link) => {
      const plan = link.dataset.checkout;
      const base = CONFIG.checkout[plan];
      if (!isUrl(base)) {
        console.warn('[Rock the Fall] No checkout URL set for "' + plan + '" yet. Button stays on the page.');
        return;
      }
      link.href = Attribution.decorate(base);

      link.addEventListener('click', (event) => {
        const url = Attribution.decorate(base);
        link.href = url;
        const info = CONFIG.plans[plan] || {};
        const newTab = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

        // Navigate no matter what happens with tracking.
        if (!newTab) {
          event.preventDefault();
          window.setTimeout(() => { window.location.href = url; }, 200);
        }
        Tracking.track('InitiateCheckout', {
          content_name: info.name,
          content_ids: [info.id],
          content_type: 'product',
          value: info.value,
          currency: 'USD',
        });
      });
    });

    // Rules / privacy / terms links
    $$('[data-link]').forEach((link) => {
      const url = CONFIG.links[link.dataset.link];
      if (isUrl(url)) {
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener';
      }
    });
  };

  /* ------------------------------------------------------------------------
     Countdown + closed state.  Preview the closed state with ?preview=closed
     ------------------------------------------------------------------------ */
  const initCountdown = () => {
    const el = document.querySelector('[data-countdown]');
    if (!el) return;
    const end = new Date(CONFIG.deadline).getTime();
    const units = {
      days: el.querySelector('[data-unit="days"]'),
      hours: el.querySelector('[data-unit="hours"]'),
      mins: el.querySelector('[data-unit="mins"]'),
      secs: el.querySelector('[data-unit="secs"]'),
    };
    const pad = (n) => String(n).padStart(2, '0');
    let timer = null;

    const close = () => {
      if (timer) window.clearInterval(timer);
      document.documentElement.classList.add('is-closed');
      el.hidden = true;
      $$('[data-closed-hide]').forEach((node) => { node.hidden = true; });
      $$('[data-closed-show]').forEach((node) => { node.hidden = false; });
      $$('[data-closed-text]').forEach((node) => { node.textContent = node.dataset.closedText; });
    };

    const tick = () => {
      const left = end - Date.now();
      if (!(left > 0)) { close(); return; }
      const s = Math.floor(left / 1000);
      const next = {
        days: pad(Math.floor(s / 86400)),
        hours: pad(Math.floor((s % 86400) / 3600)),
        mins: pad(Math.floor((s % 3600) / 60)),
        secs: pad(s % 60),
      };
      Object.keys(next).forEach((key) => {
        if (units[key] && units[key].textContent !== next[key]) units[key].textContent = next[key];
      });
    };

    if (params.get('preview') === 'closed' || Number.isNaN(end)) { close(); return; }
    tick();
    timer = window.setInterval(tick, 1000);
  };

  /* ------------------------------------------------------------------------
     Sticky mobile CTA: show after the hero, hide while pricing is on screen
     ------------------------------------------------------------------------ */
  const initStickyCta = () => {
    const bar = document.querySelector('[data-sticky-cta]');
    const hero = document.querySelector('.hero');
    const pricing = document.getElementById('pricing');
    if (!bar || !hero || !pricing || !('IntersectionObserver' in window)) return;

    let pastHero = false;
    let pricingVisible = false;
    const update = () => bar.classList.toggle('is-visible', pastHero && !pricingVisible);

    new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    }).observe(hero);

    new IntersectionObserver(([entry]) => {
      pricingVisible = entry.isIntersecting;
      update();
    }, { threshold: 0.05 }).observe(pricing);
  };

  /* ------------------------------------------------------------------------
     Reels: lazy-load near the viewport, pause off screen, unmute toggle.
     CONFIG.reels.*.src can be either:
       - a direct MP4 URL (lightest; Vimeo paid plans call this a "video file link"), or
       - a Vimeo page link like https://vimeo.com/123456789 or https://vimeo.com/123456789/abc123 (unlisted)
     ------------------------------------------------------------------------ */
  const initReels = () => {
    const players = [];
    const iconHtml = (id) => '<svg class="icon" aria-hidden="true" focusable="false"><use href="#' + id + '"/></svg>';
    const parseVimeo = (url) => {
      const m = /vimeo\.com\/(?:video\/)?(\d+)(?:\/([0-9a-z]+))?/i.exec(url);
      if (!m) return null;
      const hash = m[2] || (new URL(url).searchParams.get('h')) || '';
      return { id: m[1], hash };
    };

    // Native <video> player
    const videoPlayer = (frame, reel) => {
      const video = document.createElement('video');
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.preload = 'none';
      if (isSet(reel.poster)) video.poster = reel.poster;
      if (frame.dataset.label) video.setAttribute('aria-label', frame.dataset.label);
      if (reducedMotion) video.controls = true; // no autoplay; let the viewer start it
      return {
        el: video,
        muted: true,
        load() { if (!video.src) { video.src = reel.src; video.preload = 'metadata'; } },
        play() { this.load(); if (!reducedMotion) video.play().catch(() => {}); },
        pause() { video.pause(); },
        setMuted(m) { this.muted = m; video.muted = m; if (!m) video.play().catch(() => {}); },
      };
    };

    // Vimeo iframe player, driven with postMessage so we don't load Vimeo's SDK.
    // The player is preloaded a little before it scrolls into view, so it must NOT autoplay on its
    // own (it would play off screen). We track whether the reel is in view and tell the player to
    // play or pause, re-sending once the player reports it is ready.
    const vimeoPlayer = (frame, reel, vimeo) => {
      const iframe = document.createElement('iframe');
      iframe.title = frame.dataset.label || 'Video';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.setAttribute('frameborder', '0');
      let inView = false;
      const send = (method, value) => {
        if (!iframe.contentWindow) return;
        iframe.contentWindow.postMessage(JSON.stringify(value === undefined ? { method } : { method, value }), 'https://player.vimeo.com');
      };
      const apply = () => send(inView && !reducedMotion ? 'play' : 'pause');
      iframe.addEventListener('load', () => { window.setTimeout(apply, 300); window.setTimeout(apply, 1500); });
      window.addEventListener('message', (event) => {
        if (event.origin !== 'https://player.vimeo.com' || event.source !== iframe.contentWindow) return;
        try { const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data; if (data && data.event === 'ready') apply(); } catch (e) { /* ignore */ }
      });
      return {
        el: iframe,
        muted: true,
        load() {
          if (iframe.src) return;
          if (isSet(reel.poster)) { // still frame behind the player while Vimeo loads
            frame.style.backgroundImage = 'url("' + reel.poster + '")';
            frame.style.backgroundSize = 'cover';
            frame.style.backgroundPosition = 'center';
          }
          const qs = new URLSearchParams({
            autoplay: inView && !reducedMotion ? '1' : '0', muted: '1', loop: '1', playsinline: '1', autopause: '0',
            controls: reducedMotion ? '1' : '0', title: '0', byline: '0', portrait: '0', dnt: '1',
          });
          if (vimeo.hash) qs.set('h', vimeo.hash);
          iframe.src = 'https://player.vimeo.com/video/' + vimeo.id + '?' + qs.toString();
        },
        play() { inView = true; this.load(); apply(); window.setTimeout(apply, 800); },
        pause() { inView = false; apply(); },
        setMuted(m) { this.muted = m; send('setMuted', m); if (!m) { send('setVolume', 1); send('play'); } },
      };
    };

    $$('[data-reel]').forEach((frame) => {
      const reel = CONFIG.reels[frame.dataset.reel];
      if (!reel || !isUrl(reel.src)) return; // keep the placeholder
      const vimeo = parseVimeo(reel.src);
      const player = vimeo ? vimeoPlayer(frame, reel, vimeo) : videoPlayer(frame, reel);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'reel__sound';
      const paint = () => {
        button.setAttribute('aria-label', player.muted ? 'Unmute video' : 'Mute video');
        button.innerHTML = iconHtml(player.muted ? 'i-muted' : 'i-sound');
      };
      player.paint = paint;
      button.addEventListener('click', () => {
        const unmuting = player.muted;
        if (unmuting) players.forEach((other) => { if (other !== player && !other.muted) { other.setMuted(true); other.paint(); } });
        player.setMuted(!unmuting);
        paint();
      });
      paint();

      frame.querySelector('.reel__placeholder').remove();
      frame.append(player.el, button);
      player.frame = frame;
      players.push(player);
    });

    if (!players.length) return;
    if (!('IntersectionObserver' in window)) { players.forEach((p) => p.load()); return; }
    const byFrame = new Map(players.map((p) => [p.frame, p]));

    // Load when within roughly a screen of the viewport
    const loader = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        byFrame.get(entry.target).load();
        loader.unobserve(entry.target);
      });
    }, { rootMargin: '600px 0px' });

    // Play only while actually on screen. Scrolling away also re-mutes.
    const watcher = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const p = byFrame.get(entry.target);
        if (entry.isIntersecting) { p.play(); }
        else { p.pause(); if (!p.muted) { p.setMuted(true); p.paint(); } }
      });
    }, { threshold: 0.35 });

    players.forEach((p) => { loader.observe(p.frame); watcher.observe(p.frame); });
  };

  /* ------------------------------------------------------------------------
     FAQ: all open on desktop (matches the design), first one open on mobile
     ------------------------------------------------------------------------ */
  const initFaq = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      $$('.faq__item').forEach((item) => { item.open = true; });
    }
  };

  /* ------------------------------------------------------------------------
     Swipe rows: keyboard-focusable only while they actually scroll
     ------------------------------------------------------------------------ */
  const initSwipeRows = () => {
    const rows = $$('[data-swipe]');
    const update = () => rows.forEach((row) => {
      if (row.scrollWidth > row.clientWidth + 1) {
        row.setAttribute('tabindex', '0');
        row.setAttribute('role', 'group');
      } else {
        row.removeAttribute('tabindex');
        row.removeAttribute('role');
      }
    });
    update();
    window.addEventListener('resize', update, { passive: true });
  };

  /* ------------------------------------------------------------------------
     QA helper: add ?placeholders=1 to the URL to highlight every [bracketed]
     placeholder still on the page.
     ------------------------------------------------------------------------ */
  const highlightPlaceholders = () => {
    if (!params.has('placeholders')) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const hits = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (/\[[^\]]+\]/.test(node.nodeValue) && !node.parentElement.closest('script, style')) hits.push(node);
    }
    hits.forEach((node) => {
      const span = document.createElement('span');
      span.innerHTML = node.nodeValue
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/\[[^\]]+\]/g, (m) => '<mark class="ph-mark">' + m + '</mark>');
      node.replaceWith(...span.childNodes);
    });
    console.info('[Rock the Fall] ' + document.querySelectorAll('mark.ph-mark').length + ' placeholders on the page.');
  };

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  Attribution.capture();
  Tracking.init();
  initCheckout();
  initCountdown();
  initStickyCta();
  initReels();
  initFaq();
  initSwipeRows();
  highlightPlaceholders();
  Tracking.track('ViewContent', { content_name: 'Rock the Fall', content_category: 'Challenge', content_type: 'product' });
})();
