(function () {
  var headings = document.querySelectorAll('.text-reveal');
  if (!headings.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  function buildChar(character, index) {
    var charEl = document.createElement('span');
    charEl.className = 'tr-char';
    charEl.style.setProperty('--tr-i', index);
    charEl.textContent = character;
    return charEl;
  }

  function buildWord(word, startIndex) {
    var wordEl = document.createElement('span');
    wordEl.className = 'tr-word';
    var index = startIndex;
    for (var i = 0; i < word.length; i += 1) {
      wordEl.appendChild(buildChar(word[i], index));
      index += 1;
    }
    return { el: wordEl, nextIndex: index };
  }

  // Reads the heading's real text (treating <br> as a space) so the
  // visually-hidden copy reads naturally to assistive tech.
  function accessibleLabel(el) {
    var clone = el.cloneNode(true);
    clone.querySelectorAll('br').forEach(function (br) {
      br.replaceWith(' ');
    });
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  // Walks the heading's existing nodes, replacing text with word/char
  // spans while preserving any element wrappers (e.g. line-break spans)
  // and <br> tags already in the markup.
  function buildVisual(sourceNode, targetNode, index) {
    sourceNode.childNodes.forEach(function (child) {
      if (child.nodeType === Node.TEXT_NODE) {
        var segments = child.textContent.split(/(\s+)/);
        segments.forEach(function (segment) {
          if (segment === '') return;
          if (/^\s+$/.test(segment)) {
            targetNode.appendChild(document.createTextNode(segment));
          } else {
            var built = buildWord(segment, index.value);
            index.value = built.nextIndex;
            targetNode.appendChild(built.el);
          }
        });
      } else if (child.nodeName === 'BR') {
        targetNode.appendChild(document.createElement('br'));
      } else {
        var clonedEl = child.cloneNode(false);
        targetNode.appendChild(clonedEl);
        buildVisual(child, clonedEl, index);
      }
    });
  }

  function decorate(el) {
    var label = accessibleLabel(el);

    var srOnly = document.createElement('span');
    srOnly.className = 'tr-sr-only';
    srOnly.textContent = label;

    var visual = document.createElement('span');
    visual.className = 'tr-visual';
    visual.setAttribute('aria-hidden', 'true');
    buildVisual(el, visual, { value: 0 });

    el.innerHTML = '';
    el.appendChild(srOnly);
    el.appendChild(visual);
  }

  headings.forEach(function (el) {
    decorate(el);
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

  // Wait a frame so the browser paints the hidden state first — otherwise a
  // heading already in the viewport at load could be marked intersecting
  // before its "hidden" style ever renders, skipping the reveal.
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      headings.forEach(function (el) {
        observer.observe(el);
      });
    });
  });
})();
