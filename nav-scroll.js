(function () {
  var nav = document.querySelector('.nav');
  var services = document.querySelector('.services');
  if (!nav || !services) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var slideDuration = parseFloat(
    getComputedStyle(nav).getPropertyValue('--nav-slide-duration')
  ) || 520;

  var isSticky = false;
  var leaveTimer = null;

  /* Pin the bar, starting one nav-height above the viewport, then release it
     on the next frame so the transform transition carries it down into frame. */
  function enter(animate) {
    clearTimeout(leaveTimer);
    nav.classList.remove('nav--leaving');
    nav.classList.add('nav--sticky');

    if (!animate || reduceMotion) return;

    nav.classList.add('nav--entering');
    /* Force a style flush so the off-screen position is painted before the
       transition-enabled state replaces it. */
    void nav.offsetHeight;
    nav.classList.remove('nav--entering');
  }

  /* Slide back out the way it came, then hand the bar back to the document
     flow once it is clear of the viewport. */
  function leave(animate) {
    nav.classList.remove('nav--entering');

    if (!animate || reduceMotion) {
      nav.classList.remove('nav--sticky', 'nav--leaving');
      return;
    }

    nav.classList.add('nav--leaving');
    leaveTimer = setTimeout(function () {
      nav.classList.remove('nav--sticky', 'nav--leaving');
    }, slideDuration);
  }

  function update(animate) {
    var isPastServicesTop = services.getBoundingClientRect().top <= 0;
    if (isPastServicesTop === isSticky) return;

    isSticky = isPastServicesTop;
    if (isSticky) enter(animate);
    else leave(animate);
  }

  window.addEventListener('scroll', function () {
    update(true);
  }, { passive: true });

  /* On load (or a refresh mid-page) settle into the correct state silently. */
  update(false);
})();
