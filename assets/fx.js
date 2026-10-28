/* 28.10: плавна поява блоків, скляний блик за курсором, паралакс першого екрана */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  /* блик на склі */
  if (matchMedia('(hover:hover)').matches) {
    [].forEach.call(document.querySelectorAll('.card div, .terms>div, #rq, .hstat, .lh .glass, .pill'), function (el) {
      el.classList.add('gl');
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }
  if (reduce) return;
  /* перший екран: фото повільно наближається, текст відпливає вгору */
  var hero = document.querySelector('.hero'), img = hero && hero.querySelector('img'), box = hero && hero.querySelector('.wrap'), tick = false;
  if (img && box) {
    var upd = function () {
      tick = false;
      var y = Math.min(window.scrollY, hero.offsetHeight), k = y / hero.offsetHeight;
      img.style.transform = 'translateY(' + (y * 0.3).toFixed(1) + 'px) scale(' + (1 + k * 0.12).toFixed(3) + ')';
      box.style.transform = 'translateY(' + (-y * 0.15).toFixed(1) + 'px)';
      box.style.opacity = (1 - k * 1.1).toFixed(3);
    };
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
  }
  /* поява блоків при прокрутці */
  if (!window.IntersectionObserver) return;
  var els = document.querySelectorAll('main section:not(.hero):not(.lh) h2, .card, .terms>div, .routes li, .ab-stats>div, .rmap, #rq');
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
