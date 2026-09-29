/* Hero media motion:
   1. Reveal — the arc stroke draws clockwise, then the four USP badges pop
      in one after another (timings live in styles.css). Waits for the
      cursor to actually enter the page, then a small pause, before playing
      — rather than firing the instant the hero scrolls into view (which for
      an above-the-fold hero is essentially immediately on load).
   2. Magnetic pull — badges drift toward the cursor as it approaches. */
(function () {
  var media = document.querySelector('.hero__media');
  if (!media) return;

  var badges = Array.prototype.slice.call(media.querySelectorAll('[data-hero-usp]'));
  if (!badges.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  badges.forEach(function (badge) {
    badge.style.setProperty('--hero-usp-index', badge.getAttribute('data-hero-usp'));
  });

  /* ---------- Reveal sequence ---------- */

  var REVEAL_DELAY = 500;
  var played = false;

  function reveal() {
    if (played) return;
    played = true;
    media.classList.add('is-revealed');
  }

  media.classList.add('js-seq-ready');

  // Primary trigger: mouse enters the page. mouseenter doesn't bubble, but
  // attached directly to documentElement it still fires once the pointer
  // crosses into the viewport.
  document.documentElement.addEventListener(
    'mouseenter',
    function onFirstMouseEnter() {
      document.documentElement.removeEventListener('mouseenter', onFirstMouseEnter);
      setTimeout(reveal, REVEAL_DELAY);
    },
    { once: true }
  );

  // Fallback for touch/no-mouse visitors, who never fire mouseenter — plays
  // once the hero scrolls into view instead, so it isn't stuck hidden.
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          setTimeout(reveal, REVEAL_DELAY);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.25 }
    );

    // Same guard as scroll-effects.js: wait for the hidden state to paint,
    // otherwise the hero (already in view at load) skips its own animation.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        observer.observe(media);
      });
    });
  }

  /* ---------- Magnetic pull ---------- */

  // Skip on touch — there's no hover to anticipate, and the pull would only
  // fire on tap.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var PULL_RADIUS = 90; // px beyond the badge edge where the field starts
  var PULL_MAX = 12; // px cap, so the badge never detaches from its position

  var pointer = null;
  var frame = 0;

  function apply() {
    frame = 0;
    badges.forEach(function (badge) {
      var box = badge.getBoundingClientRect();
      var halfW = box.width / 2;
      var halfH = box.height / 2;
      var dx = pointer ? pointer.x - (box.left + halfW) : 0;
      var dy = pointer ? pointer.y - (box.top + halfH) : 0;

      // Gap between the cursor and the badge's edge, per axis — zero while the
      // cursor is over the badge itself.
      var gapX = Math.max(0, Math.abs(dx) - halfW);
      var gapY = Math.max(0, Math.abs(dy) - halfH);
      var inRange = pointer && Math.sqrt(gapX * gapX + gapY * gapY) < PULL_RADIUS;

      if (!inRange) {
        badge.classList.remove('is-pulling');
        badge.style.setProperty('--hero-usp-pull-x', '0px');
        badge.style.setProperty('--hero-usp-pull-y', '0px');
        return;
      }

      // Scale the offset against the badge's own half-extent plus the field, so
      // the pull ramps up smoothly across the field instead of pinning to the
      // cap the moment the cursor arrives. These pills are ~200px wide, so a
      // flat fraction-of-offset would saturate immediately.
      badge.classList.add('is-pulling');
      badge.style.setProperty('--hero-usp-pull-x', pull(dx, halfW) + 'px');
      badge.style.setProperty('--hero-usp-pull-y', pull(dy, halfH) + 'px');
    });
  }

  function pull(delta, halfExtent) {
    var ratio = delta / (halfExtent + PULL_RADIUS);
    return (PULL_MAX * Math.max(-1, Math.min(1, ratio))).toFixed(2);
  }

  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(apply);
  }

  window.addEventListener(
    'pointermove',
    function (event) {
      if (event.pointerType !== 'mouse') return;
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    },
    { passive: true }
  );

  // Release everything when the cursor leaves the window or the page scrolls
  // the badges out from under it.
  function release() {
    pointer = null;
    schedule();
  }

  document.addEventListener('pointerleave', release);
  window.addEventListener('blur', release);
  window.addEventListener('scroll', schedule, { passive: true });
})();
