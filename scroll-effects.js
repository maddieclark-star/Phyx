(function () {
  var eyebrows = document.querySelectorAll('.eyebrow-reveal');
  if (!eyebrows.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  eyebrows.forEach(function (el) {
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
    { threshold: 0.4 }
  );

  // Wait a frame so the browser paints the hidden state first — otherwise an
  // eyebrow already in the viewport at load (the hero's) can be marked
  // intersecting before its "hidden" style ever renders, skipping the fade.
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      eyebrows.forEach(function (el) {
        observer.observe(el);
      });
    });
  });
})();
