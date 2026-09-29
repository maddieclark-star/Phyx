/* Split section's checklist reveals in chronological (top to bottom) order
   the first time the cursor enters the section — but not until the
   heading's own text-reveal has finished, so the two don't fight for
   attention at once. Must run after text-reveal.js so the heading is
   already decorated into .tr-char spans when charCount is measured. */
(function () {
  var section = document.querySelector('.split');
  var list = document.querySelector('.split__list');
  var heading = document.querySelector('.split__heading');
  if (!section || !list || !heading) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  list.classList.add('js-reveal-ready');

  // Mirrors text-reveal.js's own timing constants for this heading, so the
  // list waits for the char-by-char sequence to actually finish rather than
  // a guessed delay.
  var TEXT_REVEAL_BASE_DELAY = 450;
  var TEXT_REVEAL_STAGGER = 16;
  var TEXT_REVEAL_DURATION = 620;

  var charCount = heading.querySelectorAll('.tr-char').length;
  var totalHeadingMs = TEXT_REVEAL_BASE_DELAY + Math.max(0, charCount - 1) * TEXT_REVEAL_STAGGER + TEXT_REVEAL_DURATION;

  var headingRevealedAt = heading.classList.contains('is-visible') ? 0 : null;

  if (headingRevealedAt === null) {
    var observer = new MutationObserver(function () {
      if (heading.classList.contains('is-visible')) {
        headingRevealedAt = performance.now();
        observer.disconnect();
      }
    });
    observer.observe(heading, { attributes: true, attributeFilter: ['class'] });
  }

  var played = false;

  function play() {
    if (played) return;
    played = true;
    list.classList.add('is-visible');
  }

  section.addEventListener('mouseenter', function () {
    if (played) return;

    if (headingRevealedAt === 0) {
      play();
    } else if (headingRevealedAt !== null) {
      setTimeout(play, Math.max(0, totalHeadingMs - (performance.now() - headingRevealedAt)));
    } else {
      // Heading hasn't revealed yet — wait out its full sequence from now.
      setTimeout(play, totalHeadingMs);
    }
  });
})();
