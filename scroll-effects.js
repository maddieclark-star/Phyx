(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  // Marks `els` ready, observes each at `threshold`, and adds `.is-visible`
  // (once, unobserving after) the first time it scrolls into view. Waits a
  // frame so the browser paints the hidden state first — otherwise an
  // element already in the viewport at load (e.g. the hero's eyebrow) can be
  // marked intersecting before its "hidden" style ever renders, skipping
  // the reveal.
  function setUpReveal(els, threshold) {
    if (!els.length) return;

    els.forEach(function (el) {
      el.classList.add('js-reveal-ready');
    });

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: threshold }
    );

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        els.forEach(function (el) {
          observer.observe(el);
        });
      });
    });
  }

  setUpReveal(document.querySelectorAll('.eyebrow-reveal'), 0.4);
  setUpReveal(document.querySelectorAll('.service-card--reveal'), 0.2);
  setUpReveal(document.querySelectorAll('.article-card--reveal'), 0.2);
})();
