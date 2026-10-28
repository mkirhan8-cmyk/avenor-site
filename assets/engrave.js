/* 28.10: гравюра «Воронцовський маяк і контейнеровоз» (шари офісу, _src/engrave). Промінь обертається, судно підсвічується, проявлення з туману */
(function () {
  var sec = document.querySelector('.lh'), eg = sec && sec.querySelector('.eg');
  if (!eg) return;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var phone = function () { return matchMedia('(max-width:600px)').matches; };
  /* координати шарів: десктоп 2560×1400, телефон 1170×1400 (кроп x0=755) */
  var P = { lamp: [992, 236], ship: [1535, 1190] }, W, H;
  function layout() {
    var p = phone(); W = p ? 1170 : 2560; H = 1400;
    var sw = sec.clientWidth, sh = sec.clientHeight, k = Math.max(sw / W, sh / H);
    eg.style.width = W * k + 'px'; eg.style.height = H * k + 'px';
    eg.style.left = (sw - W * k) / 2 + 'px'; eg.style.top = (sh - H * k) / 2 + 'px';
    eg.classList.toggle('p', p);
    var lx = (p ? P.lamp[0] - 755 : P.lamp[0]) / W * 100, ly = P.lamp[1] / H * 100;
    eg.style.setProperty('--lx', lx + '%'); eg.style.setProperty('--ly', ly + '%');
  }
  layout(); addEventListener('resize', layout);
  /* проявлення з туману при вході в кадр */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { sec.classList.add('on'); o.disconnect(); } }, { threshold: .25 }).observe(sec);
  } else sec.classList.add('on');
  if (reduce) { sec.classList.add('on'); return; }
  var beam = eg.querySelector('.beam'), lit = eg.querySelector('.ship-lit'), shipL = eg.querySelector('.ship'), lamp = eg.querySelector('.lamp'), rays = eg.querySelector('.rays');
  /* кут на судно від ліхтаря (0° = вправо, за годинниковою) */
  var ang = 0, last = performance.now();
  function frame(t) {
    var dt = Math.min(50, t - last); last = t;
    var p = phone(), lx = p ? P.lamp[0] - 755 : P.lamp[0], sx = p ? P.ship[0] - 755 : P.ship[0];
    var toShip = Math.atan2(P.ship[1] - P.lamp[1], sx - lx) * 180 / Math.PI;
    var d = Math.abs(((ang - toShip) % 360 + 540) % 360 - 180);
    var on = Math.max(0, 1 - d / 16);
    ang = (ang + dt * 0.022 * (1 - 0.75 * on)) % 360;
    beam.style.transform = 'rotate(' + ang + 'deg)';
    lit.style.opacity = on;
    shipL.style.opacity = 1 - on * 0.35;
    /* судно повільно дрейфує, ліхтар дихає */
    var s = t / 1000;
    shipL.style.translate = lit.style.translate = (Math.sin(s * 0.08) * 28).toFixed(1) + 'px ' + (Math.sin(s * 0.9) * 2).toFixed(1) + 'px';
    var br = 0.8 + 0.2 * Math.abs(Math.sin(s * 1.3));
    lamp.style.opacity = br; rays.style.opacity = 0.55 + 0.45 * br;
    if (!document.hidden) requestAnimationFrame(frame); else setTimeout(function () { last = performance.now(); requestAnimationFrame(frame); }, 500);
  }
  requestAnimationFrame(frame);
})();
