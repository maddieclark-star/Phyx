(function () {
  var items = document.querySelectorAll('.faq-item');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

      if (reduceMotion) {
        panel.style.height = opening ? 'auto' : '0px';
      } else if (opening) {
        panel.style.height = panel.scrollHeight + 'px';
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

      item.classList.toggle('is-open', opening);
      trigger.setAttribute('aria-expanded', opening ? 'true' : 'false');
    });
  });
})();
