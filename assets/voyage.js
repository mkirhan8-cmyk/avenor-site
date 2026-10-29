/* 29.10: «маршрут із судном» у блоці «Як ми працюємо» (ідея з рилса, який сподобався Мурату):
   крива через 5 кроків, пройдена частина домальовується, судно пливе до чергового кроку при прокрутці */
(function () {
  var voy = document.querySelector('.voy');
  if (!voy) return;
  var svg = voy.querySelector('svg.voy-svg'), base = svg.querySelector('.voy-base'), prog = svg.querySelector('.voy-prog');
  var ship = voy.querySelector('.voy-ship'), steps = [].slice.call(voy.querySelectorAll('.voy-steps li'));
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var pts = [], len = 0, vertical = false, marks = [];
  function build() {
    var r = voy.getBoundingClientRect();
    svg.setAttribute('viewBox', '0 0 ' + r.width + ' ' + r.height); svg.style.width = r.width + 'px'; svg.style.height = r.height + 'px';
    pts = steps.map(function (li) { var d = li.querySelector('.voy-dot').getBoundingClientRect(); return [d.left - r.left + d.width / 2, d.top - r.top + d.height / 2]; });
    vertical = Math.abs(pts[pts.length - 1][1] - pts[0][1]) > Math.abs(pts[pts.length - 1][0] - pts[0][0]);
    /* плавна крива через точки (Catmull-Rom → Безьє) з легкою хвилею між кроками */
    var d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)], w = (i % 2 ? -1 : 1) * (vertical ? 14 : 18);
      var c1 = [p1[0] + (p2[0] - p0[0]) / 6 + (vertical ? w : 0), p1[1] + (p2[1] - p0[1]) / 6 + (vertical ? 0 : w)];
      var c2 = [p2[0] - (p3[0] - p1[0]) / 6 + (vertical ? w : 0), p2[1] - (p3[1] - p1[1]) / 6 + (vertical ? 0 : w)];
      d += 'C' + c1[0].toFixed(1) + ' ' + c1[1].toFixed(1) + ' ' + c2[0].toFixed(1) + ' ' + c2[1].toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    base.setAttribute('d', d); prog.setAttribute('d', d);
    len = prog.getTotalLength(); prog.style.strokeDasharray = len + ' ' + len;
    /* довжина кривої до кожного кроку — щоб крок «вмикався», коли судно дійшло */
    marks = pts.map(function (p) {
      var best = 0, bd = 1e9; for (var s = 0; s <= 200; s++) { var q = prog.getPointAtLength(len * s / 200), dd = (q.x - p[0]) * (q.x - p[0]) + (q.y - p[1]) * (q.y - p[1]); if (dd < bd) { bd = dd; best = s / 200; } }
      return best;
    });
    place(cur);
  }
  var cur = 0, target = 0, raf = null;
  function place(p) {
    prog.style.strokeDashoffset = len * (1 - p);
    var q = prog.getPointAtLength(len * p), q2 = prog.getPointAtLength(Math.min(len, len * p + 6));
    var ang = vertical ? 0 : Math.max(-14, Math.min(14, Math.atan2(q2.y - q.y, q2.x - q.x) * 180 / Math.PI));
    ship.style.transform = 'translate(' + q.x.toFixed(1) + 'px,' + q.y.toFixed(1) + 'px) rotate(' + ang.toFixed(1) + 'deg)';
    steps.forEach(function (li, i) { li.classList.toggle('on', p >= marks[i] - 0.01); });
  }
  function want() {
    var r = voy.getBoundingClientRect(), vh = innerHeight;
    /* 0, коли блок з'являється знизу; 1, коли його верх дійшов до третини екрана */
    var p = (vh * 0.9 - r.top) / (vh * 0.9 - vh * 0.3 + r.height * 0.4);
    return Math.max(0, Math.min(1, p));
  }
  function tick() {
    raf = null; cur += (target - cur) * 0.12;
    if (Math.abs(target - cur) < 0.002) cur = target; else raf = requestAnimationFrame(tick);
    place(cur);
  }
  function onScroll() { target = want(); if (!raf) raf = requestAnimationFrame(tick); }
  build(); addEventListener('resize', build);
  if (reduce) { cur = target = 1; place(1); return; }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();
