/* плавна поява блоків при прокрутці (28.10) */
(function () {
  if (!window.IntersectionObserver || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  var els = document.querySelectorAll('main section:not(.hero):not(.lh) h2, .card, .terms>div, .routes li, .ab-stats>div, .rmap, .rq');
  if (!els.length) return;
  document.documentElement.classList.add('js');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, i = [].indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = Math.min(i, 5) * 80 + 'ms';
      el.classList.add('in'); io.unobserve(el);
      setTimeout(function () { el.classList.remove('rv', 'in'); el.style.transitionDelay = ''; }, 1400);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  [].forEach.call(els, function (el) { el.classList.add('rv'); io.observe(el); });
})();
