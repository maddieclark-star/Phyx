/* Lenis smooth scroll + scroll-linked parallax.

   Lenis (CDN, loaded before this file) intercepts the native wheel/touch
   scroll and replays it with inertia, so any scroll-position-driven effect
   below rides the same smoothed motion as the rest of the page rather than
   jittering against it. */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var lenis = null;
  if (window.Lenis && !reduceMotion) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  if (reduceMotion) return;

  function onScroll(fn) {
    if (lenis) lenis.on('scroll', fn);
    window.addEventListener('scroll', fn, { passive: true });
  }

  /* ---------- Hero media rises over the headline/CTAs on scroll ----------
     .hero__media sits above .hero__header (z-index) and lifts upward as the
     hero scrolls past, so the photo visually overtakes the text instead of
     the two simply scrolling away together. Progress is measured against
     the hero's own height so the lift completes before the section is gone. */
  var heroSection = document.querySelector('.hero');
  var heroMedia = document.querySelector('.hero__media');

  if (heroSection && heroMedia) {
    var maxLift = 180;

    var updateHero = function () {
      var rect = heroSection.getBoundingClientRect();
      var progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.55)));
      // Set on the section, not the image: the image inherits it for its own
      // transform, and .hero reads it to claw back its bottom margin so the
      // services section rises into the space the lift opens up. rect stays
      // stable because margin isn't part of the border box we measure.
      heroSection.style.setProperty('--hero-media-lift', (progress * maxLift).toFixed(1) + 'px');
    };

    onScroll(updateHero);
    updateHero();
  }

  /* ---------- Image parallax ----------
     Any element flagged data-parallax="<speed>" drifts opposite the scroll
     direction as it crosses the viewport (speed is a small fraction — how
     many px it shifts per px of distance from viewport-centre). */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));

  if (parallaxEls.length) {
    var updateParallax = function () {
      var viewportMid = window.innerHeight / 2;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        var rect = el.getBoundingClientRect();
        var elMid = rect.top + rect.height / 2;
        var offset = (viewportMid - elMid) * speed;
        el.style.setProperty('--parallax-y', offset.toFixed(1) + 'px');
      });
    };

    onScroll(updateParallax);
    updateParallax();
  }
})();
