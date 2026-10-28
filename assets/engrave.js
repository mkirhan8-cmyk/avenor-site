/* 28.10: гравюра «Воронцовський маяк і судна» (шари офісу, _src/engrave). Судна проходять удалині за молом, промінь обертається і підсвічує їх, сцена проявляється з туману */
(function () {
  var sec = document.querySelector('.lh'), eg = sec && sec.querySelector('.eg');
  if (!eg) return;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var phone = function () { return matchMedia('(max-width:600px)').matches; };
  /* координати: десктоп 2560×1400, телефон — кроп x0=755 шириною 1170 */
  var LAMP = [992, 236], H = 1400, SW = 1002 * 1.4, SHH = 221 * 1.4, WL = 152 * 1.4, SY = 815 - WL, W, X0;
  var tower = eg.querySelector('.tower'), ships = [].slice.call(eg.querySelectorAll('.sh'));
  function layout() {
    var p = phone(); W = p ? 1170 : 2560; X0 = p ? 755 : 0;
    var sw = sec.clientWidth, sh = sec.clientHeight, k = Math.max(sw / W, sh / H);
    eg.style.width = W * k + 'px'; eg.style.height = H * k + 'px';
    eg.style.left = (sw - W * k) / 2 + 'px'; eg.style.top = (sh - H * k) / 2 + 'px';
    eg.style.setProperty('--lx', (LAMP[0] - X0) / W * 100 + '%'); eg.style.setProperty('--ly', LAMP[1] / H * 100 + '%');
    tower.style.left = (748 - X0) / W * 100 + '%'; tower.style.top = 140 / H * 100 + '%'; tower.style.width = 1006 / W * 100 + '%';
    ships.forEach(function (s) { s.style.width = SW / W * 100 + '%'; s.style.top = SY / H * 100 + '%'; });
  }
  layout(); addEventListener('resize', layout);
  /* проявлення з туману при вході в кадр */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { sec.classList.add('on'); o.disconnect(); } }, { threshold: .25 }).observe(sec);
  } else sec.classList.add('on');
  var beam = eg.querySelector('.beam'), lamp = eg.querySelector('.lamp'), rays = eg.querySelector('.rays');
  /* два судна назустріч одне одному, кожне проходить сцену за ~2 хв */
  var SPAN = 2560 + SW + 200, SPEED = 0.04, ang = 0, last = performance.now(), t0 = last;
  function place(t) {
    ships.forEach(function (s, i) {
      var u = ((t - t0) * SPEED + i * SPAN / 2) % SPAN, x = i ? 2660 - u : u - SW - 100;
      s.dataset.x = x; s.style.left = (x - X0) / W * 100 + '%';
      s.style.translate = '0 ' + (Math.sin(t / 1000 * 0.7 + i) * 2).toFixed(1) + 'px';
    });
  }
  if (reduce) { place(60000); sec.classList.add('on'); return; }
  function frame(t) {
    var dt = Math.min(50, t - last); last = t;
    place(t);
    var on = 0;
    ships.forEach(function (s) {
      var cx = +s.dataset.x + SW / 2, a = Math.atan2(SY + WL - 60 - LAMP[1], cx - LAMP[0]) * 180 / Math.PI;
      var d = Math.abs(((ang - a) % 360 + 540) % 360 - 180), k = Math.max(0, 1 - d / 14);
      s.querySelector('.ship-lit').style.opacity = k; s.querySelector('.ship').style.opacity = 1 - k * 0.35; on = Math.max(on, k);
    });
    ang = (ang + dt * 0.022 * (1 - 0.75 * on)) % 360;
    beam.style.transform = 'rotate(' + ang + 'deg)';
    var br = 0.8 + 0.2 * Math.abs(Math.sin(t / 1000 * 1.3));
    lamp.style.opacity = br; rays.style.opacity = 0.55 + 0.45 * br;
    if (!document.hidden) requestAnimationFrame(frame); else setTimeout(function () { last = performance.now(); requestAnimationFrame(frame); }, 500);
  }
  requestAnimationFrame(frame);
})();
