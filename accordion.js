(function () {
  var items = document.querySelectorAll('.faq-item');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function collapse(item, panel) {
    if (reduceMotion) {
      panel.style.height = '0px';
    } else {
      // Can't transition away from 'auto' — freeze the current rendered
      // height as an explicit px value first, force layout so the browser
      // commits it, then collapse to 0 so the transition has two real
      // pixel values to interpolate between.
      panel.style.height = panel.scrollHeight + 'px';
      // eslint-disable-next-line no-unused-expressions
      panel.offsetHeight;
      panel.style.height = '0px';
    }

    item.classList.remove('is-open');
    var trigger = item.querySelector('.faq-item__trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  items.forEach(function (item) {
    var trigger = item.querySelector('.faq-item__trigger');
    var panel = item.querySelector('.faq-item__panel');
    if (!trigger || !panel) return;

    if (item.classList.contains('is-open')) {
      panel.style.height = 'auto';
    }

    panel.addEventListener('transitionend', function (event) {
      if (event.propertyName !== 'height') return;
      if (item.classList.contains('is-open')) {
        panel.style.height = 'auto';
      }
    });

    trigger.addEventListener('click', function () {
      var opening = !item.classList.contains('is-open');

      if (opening) {
        // Exclusive accordion: collapse any other open item first so only
        // one panel's reflow is ever cascading through the list at once,
        // instead of several open items shifting the page independently.
        items.forEach(function (other) {
          if (other !== item && other.classList.contains('is-open')) {
            collapse(other, other.querySelector('.faq-item__panel'));
          }
        });
      }

      if (reduceMotion) {
        panel.style.height = opening ? 'auto' : '0px';
      } else if (opening) {
        panel.style.height = panel.scrollHeight + 'px';
      } else {
        panel.style.height = panel.scrollHeight + 'px';
        // eslint-disable-next-line no-unused-expressions
        panel.offsetHeight;
        panel.style.height = '0px';
      }

      item.classList.toggle('is-open', opening);
      trigger.setAttribute('aria-expanded', opening ? 'true' : 'false');
    });
  });
})();
