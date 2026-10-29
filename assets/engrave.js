/* 28.10: гравюра «Воронцовський маяк і судна» (шари офісу, _src/engrave). Сцена проявляється з туману.
   29.10: кадр розширено (3304×1800, маяк менший); ліхтар крутиться як справжній: промінь ходить по горизонту,
   спалах коли світло йде на глядача, золоті промені лише при спалаху, блик на воді; два судна різної дальності;
   промінь іде за курсором; чайки; пауза поза екраном; туман спадає після завантаження шарів */
(function () {
  var sec = document.querySelector('.lh'), eg = sec && sec.querySelector('.eg');
  if (!eg) return;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var phone = function () { return matchMedia('(max-width:600px)').matches; };
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  /* координати: десктоп 3304×1800 (стара сцена 2560×1400 зсунута на +372,+400), телефон — кроп x0=839 шириною 1500 */
  var OX = 372, OY = 400, LAMP = [992 + OX, 236 + OY], H = 1800, HOR = 800 + OY, SW0 = 1002 * 1.4, WL0 = 152 * 1.4, W, X0, K = 1;
  var tower = eg.querySelector('.tower');
  /* ближнє судно — повний розмір, дальнє — менше, вище до горизонту, повільніше і блідіше */
  var ships = [].slice.call(eg.querySelectorAll('.sh')).map(function (el, i) {
    var s = i ? 0.6 : 1; el.style.zIndex = i ? 1 : 2; el.style.opacity = i ? 0.7 : 1;
    return { el: el, sw: SW0 * s, wl: WL0 * s, y: (i ? 790 : 815) + OY - WL0 * s, speed: i ? 0.024 : 0.038, dir: i ? -1 : 1, x: 0,
      lit: el.querySelector('.ship-lit'), base: el.querySelector('.ship') };
  });
  /* блик променя на воді */
  var glint = document.createElement('div'); glint.className = 'glint'; eg.insertBefore(glint, eg.querySelector('.ships'));
  /* чайки — три тонкі штрихи далеко над морем */
  var gulls = document.createElement('div'); gulls.className = 'gulls';
  [[1500, 430, 26, 0], [1640, 470, 20, 4], [1430, 492, 16, 9]].forEach(function (g) {
    var d = document.createElement('div'); d.className = 'gull'; d.style.setProperty('--d', g[3] + 's');
    d.innerHTML = '<svg viewBox="0 0 40 20" fill="none" stroke="#e9e4d8" stroke-width="1.6" stroke-linecap="round"><path class="w1" d="M3 11Q11 2 20 10Q29 2 37 11"/><path class="w2" d="M3 9Q11 12 20 10Q29 12 37 9"/></svg>';
    d.dataset.x = g[0] + OX; d.dataset.y = g[1] + OY; d.dataset.w = g[2]; gulls.appendChild(d);
  });
  eg.insertBefore(gulls, tower);
  function pc(x) { return x / W * 100 + '%'; }
  function layout() {
    var p = phone(); W = p ? 1500 : 3304; X0 = p ? 839 : 0;
    var sw = sec.clientWidth, sh = sec.clientHeight, k = Math.max(sw / W, sh / H); K = k;
    eg.style.width = W * k + 'px'; eg.style.height = H * k + 'px';
    eg.style.left = (sw - W * k) / 2 + 'px'; eg.style.top = '0px'; /* при обрізанні по висоті лишаємо верх: ліхтар видно, знизу йде лише вода */
    eg.style.setProperty('--lx', pc(LAMP[0] - X0)); eg.style.setProperty('--ly', LAMP[1] / H * 100 + '%');
    tower.style.left = pc(748 + OX - X0); tower.style.top = (140 + OY) / H * 100 + '%'; tower.style.width = pc(1006);
    ships.forEach(function (s) { s.el.style.width = pc(s.sw); s.el.style.top = s.y / H * 100 + '%'; s.el.style.left = 0; });
    [].forEach.call(gulls.children, function (d) { d.style.left = pc(d.dataset.x - X0); d.style.top = d.dataset.y / H * 100 + '%'; d.style.width = pc(d.dataset.w); });
  }
  layout(); addEventListener('resize', layout);
  /* туман спадає, коли блок у кадрі і всі шари завантажені */
  var imgs = [].slice.call(eg.querySelectorAll('img')), seen = false;
  function loaded() { return imgs.every(function (i) { return i.complete; }); }
  function reveal() { if (seen && loaded()) sec.classList.add('on'); }
  imgs.forEach(function (i) { i.addEventListener('load', reveal); i.addEventListener('error', reveal); });
  setTimeout(function () { if (seen) sec.classList.add('on'); }, 6000); /* страховка: не тримати туман вічно */
  var inView = true, running = false;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      inView = es[0].isIntersecting;
      if (inView && !seen) { seen = true; reveal(); }
      if (inView && !running) start();
    }, { threshold: 0.05 }).observe(sec);
  } else { seen = true; reveal(); }
  var beam = eg.querySelector('.beam'), lamp = eg.querySelector('.lamp'), rays = eg.querySelector('.rays');
  var last = performance.now(), t0 = last, th = 20;
  function place(t) {
    ships.forEach(function (s, i) {
      var span = W + X0 + s.sw + 200, u = ((t - t0) * s.speed + i * span / 2) % span, x = s.dir > 0 ? X0 + u - s.sw - 100 : X0 + W + 100 - u;
      s.x = x; s.el.style.transform = 'translate(' + ((x - X0) * K).toFixed(1) + 'px,' + (Math.sin(t / 1000 * 0.7 + i) * 2 * (i ? 0.5 : 1)).toFixed(1) + 'px)';
    });
  }
  function dAng(a, b) { return ((a - b) % 360 + 540) % 360 - 180; }
  /* ліхтар обертається рівномірно (th — кут зверху: 0 праворуч, 90 на глядача, 180 ліворуч, 270 від глядача);
     на екрані промінь майже горизонтальний, трохи вниз коли йде на нас, трохи вгору коли від нас */
  function screenAng(a) { var r = a * Math.PI / 180; return Math.atan2(Math.sin(r) * 0.32, Math.cos(r)) * 180 / Math.PI; }
  var target = null, idle = 0;
  if (fine) {
    sec.addEventListener('pointermove', function (e) {
      var r = eg.getBoundingClientRect(), lx = r.left + (LAMP[0] - X0) * K, ly = r.top + LAMP[1] * K;
      var sa = Math.atan2(e.clientY - ly, e.clientX - lx), c = Math.cos(sa), s = Math.sin(sa) / 0.32;
      target = Math.atan2(s, c) * 180 / Math.PI; if (target < 0) target += 360; idle = performance.now();
    });
    sec.addEventListener('pointerleave', function () { target = null; });
  }
  if (reduce) { place(60000); seen = true; reveal(); beam.style.transform = 'rotate(' + screenAng(20) + 'deg)'; return; }
  function frame(t) {
    if (!inView || document.hidden) { running = false; return; }
    var dt = Math.min(50, t - last); last = t;
    place(t);
    var r = th * Math.PI / 180, toUs = Math.sin(r), side = Math.abs(Math.cos(r));
    var sa = screenAng(th), on = 0;
    /* судно підсвічене, коли промінь іде вбік і його напрям на екрані збігається з напрямом на судно */
    ships.forEach(function (s) {
      var cx = s.x + s.sw / 2, a = Math.atan2(s.y + s.wl - 60 - LAMP[1], cx - LAMP[0]) * 180 / Math.PI;
      var k = Math.max(0, 1 - Math.abs(dAng(sa, a)) / 9) * Math.min(1, side * 1.4);
      s.lit.style.opacity = k; s.base.style.opacity = 1 - k * 0.35; on = Math.max(on, k);
    });
    if (target !== null && t - idle < 2500) {
      var d = dAng(target, th); th = (th + Math.max(-dt * 0.1, Math.min(dt * 0.1, d * 0.08)) + 360) % 360;
    } else th = (th + dt * 0.02 * (1 - 0.7 * on)) % 360;
    /* промінь: яскравий збоку, короткий і тьмяний коли від нас, зникає у спалаху на нас */
    var fl = Math.max(0, toUs - 0.86) / 0.14, bo = side * 0.9 + 0.1 * Math.max(0, -toUs);
    beam.style.transform = 'rotate(' + sa + 'deg)'; beam.style.opacity = (bo * (1 - fl)).toFixed(3);
    var br = 0.55 + 0.1 * Math.abs(Math.sin(t / 1000 * 1.3)) + 0.45 * fl;
    lamp.style.opacity = br; rays.style.opacity = (fl * 0.9).toFixed(3);
    /* блик на воді: далеко біля горизонту збоку, ближче і ширше, коли світло йде на нас */
    var gx = LAMP[0] + 1500 * Math.cos(r), gy = HOR + 40 + 420 * Math.max(0, toUs), gw = 520 + 900 * Math.max(0, toUs), gh = 60 + 160 * Math.max(0, toUs);
    glint.style.transform = 'translate(' + ((gx - X0 - gw / 2) * K).toFixed(1) + 'px,' + ((gy - gh / 2) * K).toFixed(1) + 'px)';
    glint.style.width = gw * K + 'px'; glint.style.height = gh * K + 'px';
    glint.style.opacity = (0.22 * (toUs > 0 ? 0.6 + 0.4 * toUs : Math.max(0, 1 + toUs * 1.6)) * (1 - fl * 0.5)).toFixed(3);
    requestAnimationFrame(frame);
  }
  function start() { if (running) return; running = true; last = performance.now(); requestAnimationFrame(frame); }
  document.addEventListener('visibilitychange', function () { if (!document.hidden && inView) start(); });
  start();
})();
