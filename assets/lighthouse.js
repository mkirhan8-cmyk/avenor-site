/* Маяк і контейнеровоз: canvas-сцена внизу візитки. Без зовнішніх файлів. */
(function () {
  var cv = document.getElementById('lh');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
  var W, H, D, HZ, LX, LY, TT, stars = [], glints = [], run = true, t0 = performance.now();

  function rnd(s) { var x = Math.sin(s * 127.1) * 43758.5453; return x - Math.floor(x); }

  function size() {
    D = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = Math.round(W * D); cv.height = Math.round(H * D);
    ctx.setTransform(D, 0, 0, D, 0, 0);
    HZ = H * 0.6;
    LX = W < 600 ? W * 0.16 : W * 0.15;
    TT = HZ - H * 0.31;
    stars = []; glints = [];
    for (var i = 0; i < 90; i++) stars.push([rnd(i) * W, rnd(i + 9) * HZ * 0.8, rnd(i + 3) * 1.2 + 0.3, rnd(i + 5) * 6]);
    var n = Math.round(W / 5);
    for (i = 0; i < n; i++) {
      var y = HZ + Math.pow(rnd(i + 50), 1.7) * (H - HZ);
      glints.push([rnd(i + 20) * W, y, 4 + (y - HZ) / (H - HZ) * 26, rnd(i + 70) * 6.28]);
    }
  }

  function sky(lit) {
    var g = ctx.createLinearGradient(0, 0, 0, HZ);
    g.addColorStop(0, '#080c11'); g.addColorStop(0.55, '#121a22'); g.addColorStop(1, '#2b3138');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, HZ);
    var h = ctx.createRadialGradient(W * 0.72, HZ, 0, W * 0.72, HZ, W * 0.6);
    h.addColorStop(0, 'rgba(217,164,65,.28)'); h.addColorStop(1, 'rgba(217,164,65,0)');
    ctx.fillStyle = h; ctx.fillRect(0, 0, W, HZ);
  }

  function starfield(t) {
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i], a = 0.35 + 0.35 * Math.sin(t * 0.0012 + s[3]);
      ctx.fillStyle = 'rgba(230,236,242,' + a.toFixed(3) + ')';
      ctx.fillRect(s[0], s[1], s[2], s[2]);
    }
  }

  function sea(t) {
    var g = ctx.createLinearGradient(0, HZ, 0, H);
    g.addColorStop(0, '#1d242b'); g.addColorStop(0.25, '#10161c'); g.addColorStop(1, '#05080b');
    ctx.fillStyle = g; ctx.fillRect(0, HZ, W, H - HZ);
    ctx.lineCap = 'round';
    for (var i = 0; i < glints.length; i++) {
      var q = glints[i], k = (q[1] - HZ) / (H - HZ);
      var x = (q[0] + t * 0.006 * (0.3 + k)) % (W + 60) - 30;
      var a = 0.05 + 0.1 * (0.5 + 0.5 * Math.sin(t * 0.002 + q[3]));
      ctx.strokeStyle = 'rgba(190,204,216,' + a.toFixed(3) + ')';
      ctx.lineWidth = 0.6 + k * 1.4;
      var y = q[1] + Math.sin(t * 0.0016 + q[3] + x * 0.01) * (1 + k * 3);
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + q[2], y); ctx.stroke();
    }
  }

  /* відблиск на воді: мерехтлива доріжка під точкою (x), сила a */
  function trail(x, w, a, t, warm) {
    for (var y = HZ + 2; y < H; y += 3) {
      var k = (y - HZ) / (H - HZ), sp = w * (0.4 + k * 1.8);
      var ox = Math.sin(y * 0.21 + t * 0.004) * sp * 0.35;
      var al = a * (1 - k * 0.55) * (0.55 + 0.45 * Math.sin(y * 0.7 + t * 0.006));
      if (al <= 0.01) continue;
      ctx.fillStyle = (warm ? 'rgba(255,214,140,' : 'rgba(255,236,200,') + al.toFixed(3) + ')';
      ctx.fillRect(x + ox - sp / 2, y, sp, 1.4);
    }
  }

  function rock() {
    ctx.fillStyle = '#07090c';
    ctx.beginPath();
    ctx.moveTo(0, HZ + H * 0.06);
    ctx.lineTo(0, HZ - H * 0.03);
    ctx.quadraticCurveTo(LX - W * 0.06, HZ - H * 0.07, LX - W * 0.02, HZ - H * 0.075);
    ctx.lineTo(LX + W * 0.03, HZ - H * 0.07);
    ctx.quadraticCurveTo(LX + W * 0.09, HZ - H * 0.03, LX + W * 0.13, HZ + H * 0.01);
    ctx.quadraticCurveTo(LX + W * 0.05, HZ + H * 0.05, 0, HZ + H * 0.06);
    ctx.fill();
  }

  function tower(glow) {
    var bw = Math.max(16, H * 0.07), tw = bw * 0.62, base = HZ - H * 0.072, top = TT;
    var g = ctx.createLinearGradient(LX - bw / 2, 0, LX + bw / 2, 0);
    g.addColorStop(0, '#5b6168'); g.addColorStop(0.45, '#c9ced3'); g.addColorStop(1, '#3a4046');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(LX - bw / 2, base); ctx.lineTo(LX - tw / 2, top); ctx.lineTo(LX + tw / 2, top); ctx.lineTo(LX + bw / 2, base);
    ctx.fill();
    ctx.fillStyle = 'rgba(150,40,34,.9)';
    for (var i = 1; i < 4; i += 2) {
      var y1 = base - (base - top) * i / 4, y2 = base - (base - top) * (i + 1) / 4;
      var w1 = bw - (bw - tw) * i / 4, w2 = bw - (bw - tw) * (i + 1) / 4;
      ctx.beginPath(); ctx.moveTo(LX - w1 / 2, y1); ctx.lineTo(LX - w2 / 2, y2); ctx.lineTo(LX + w2 / 2, y2); ctx.lineTo(LX + w1 / 2, y1); ctx.fill();
    }
    ctx.fillStyle = '#0d1115';
    ctx.fillRect(LX - tw * 0.75, top - 4, tw * 1.5, 4);
    var lh = H * 0.05, lw = tw * 0.8;
    ctx.fillStyle = 'rgba(255,220,150,' + (0.55 + 0.45 * glow).toFixed(3) + ')';
    ctx.fillRect(LX - lw / 2, top - 4 - lh, lw, lh);
    ctx.fillStyle = '#0d1115';
    ctx.beginPath(); ctx.moveTo(LX - lw * 0.7, top - 4 - lh); ctx.lineTo(LX, top - 4 - lh - lh * 0.7); ctx.lineTo(LX + lw * 0.7, top - 4 - lh); ctx.fill();
    LY = top - 4 - lh / 2;
  }

  /* промінь: обертання навколо вертикальної осі, видно як віяло вліво/вправо */
  function beam(a, ty) {
    var c = Math.cos(a), s = Math.sin(a), dir = c >= 0 ? 1 : -1, reach = Math.abs(c);
    var len = W * 1.15 * (0.25 + 0.75 * reach);
    var spread = H * (0.07 + 0.1 * (1 - reach));
    var alpha = 0.1 + 0.38 * reach * (s > 0 ? 1 : 0.55);
    var ex = LX + dir * len, ey = dir > 0 ? LY + (ty - LY) * len / (W * 0.74 - LX) : LY + H * 0.1;
    var g = ctx.createLinearGradient(LX, LY, ex, ey);
    g.addColorStop(0, 'rgba(255,230,170,' + alpha.toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(255,224,160,' + (alpha * 0.35).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(255,224,160,0)');
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(LX, LY - 2); ctx.lineTo(ex, ey - spread); ctx.lineTo(ex, ey + spread); ctx.lineTo(LX, LY + 2); ctx.fill();
    var fl = Math.max(0, s) * Math.pow(reach, 0.3) * 0.4 + 0.25;
    var r = ctx.createRadialGradient(LX, LY, 0, LX, LY, H * 0.22);
    r.addColorStop(0, 'rgba(255,236,190,' + fl.toFixed(3) + ')'); r.addColorStop(1, 'rgba(255,236,190,0)');
    ctx.fillStyle = r; ctx.fillRect(LX - H * 0.22, LY - H * 0.22, H * 0.44, H * 0.44);
    ctx.restore();
    return { dir: dir, reach: reach, alpha: alpha };
  }

  var BOXES = ['#8a4b2c', '#2f4f6b', '#8a6520', '#5a6168', '#6e2f2a', '#3b5b4a', '#a36b2a', '#2b3e57'];

  function ship(t, lit) {
    var L = Math.min(W * 0.42, 560), sx = W * 0.74 - L / 2 + Math.sin(t * 0.00005) * W * 0.02;
    var wl = HZ + H * 0.035 + Math.sin(t * 0.0011) * 1.2, hh = L * 0.06;
    ctx.save();
    ctx.translate(sx, wl); ctx.rotate(Math.sin(t * 0.0009) * 0.004);
    /* корпус */
    ctx.fillStyle = '#0b0e12';
    ctx.beginPath();
    ctx.moveTo(0, -hh); ctx.lineTo(L * 0.94, -hh); ctx.quadraticCurveTo(L * 1.02, -hh, L, -hh * 0.2);
    ctx.lineTo(L * 0.95, 0); ctx.lineTo(L * 0.03, 0); ctx.lineTo(0, -hh * 0.4); ctx.fill();
    /* надбудова на кормі */
    var bx = L * 0.04, bw = L * 0.1, bh = hh * 2.4;
    ctx.fillRect(bx, -hh - bh, bw, bh);
    ctx.fillRect(bx + bw * 0.4, -hh - bh - hh * 0.9, bw * 0.25, hh * 0.9);
    /* контейнери */
    var cw = L * 0.036, ch = hh * 0.55, x0 = bx + bw + L * 0.02, cols = Math.floor((L * 0.86 - x0) / cw);
    for (var i = 0; i < cols; i++) {
      var rows = 3 + Math.floor(rnd(i + 3) * 2);
      for (var j = 0; j < rows; j++) {
        var col = BOXES[Math.floor(rnd(i * 7 + j) * BOXES.length)];
        ctx.fillStyle = '#12161b'; ctx.fillRect(x0 + i * cw, -hh - (j + 1) * ch, cw - 1, ch - 1);
        if (lit > 0.01) {
          ctx.globalAlpha = Math.min(1, lit * (0.55 + 0.45 * (i / cols)));
          ctx.fillStyle = col; ctx.fillRect(x0 + i * cw, -hh - (j + 1) * ch, cw - 1, ch - 1);
          ctx.globalAlpha = 1;
        }
      }
    }
    if (lit > 0.01) {
      ctx.globalAlpha = lit * 0.6;
      ctx.fillStyle = '#3b4148'; ctx.fillRect(0, -hh, L * 0.95, hh * 0.45);
      ctx.fillStyle = '#d8dde2'; ctx.fillRect(bx, -hh - bh, bw, bh);
      ctx.globalAlpha = 1;
    }
    /* вікна містка й ходові вогні */
    ctx.fillStyle = 'rgba(255,214,140,.85)';
    for (i = 0; i < 4; i++) ctx.fillRect(bx + bw * (0.12 + i * 0.21), -hh - bh * 0.82, bw * 0.12, bh * 0.1);
    var bl = 0.6 + 0.4 * Math.sin(t * 0.004);
    ctx.fillStyle = 'rgba(255,255,240,' + bl.toFixed(2) + ')'; ctx.fillRect(bx + bw * 0.5, -hh - bh - hh * 0.95, 2.5, 2.5);
    ctx.fillRect(L * 0.93, -hh - hh * 0.8, 2.5, 2.5);
    ctx.fillStyle = '#e04a3a'; ctx.fillRect(bx + bw, -hh - bh * 0.6, 2.5, 2.5);
    ctx.restore();
    return { x: sx + L * 0.55, w: L, y: wl - hh * 2.6 };
  }

  function frame(now) {
    var t = still ? 0 : now - t0;
    var a = still ? 0.15 : t * 0.0007 - 1.2;
    sky(); starfield(t); sea(t);
    var c = Math.cos(a), lit = c > 0 ? Math.pow(c, 3) : 0;
    var sh = ship(t, lit);
    trail(sh.x, sh.w * 0.5, lit * 0.12, t, false);
    rock();
    tower(Math.max(0, Math.sin(a)));
    var b = beam(a, sh.y);
    trail(LX, H * 0.05, 0.28, t, true);
    if (b.dir > 0 && b.reach > 0.2) trail(LX + W * 0.35 * b.reach, H * 0.08, b.alpha * 0.25, t, true);
    if (lit > 0.05) trail(sh.x, sh.w * 0.6, lit * 0.18, t, true);
    if (!still && run) requestAnimationFrame(frame);
  }

  size();
  window.addEventListener('resize', function () { size(); if (still || !run) frame(performance.now()); });
  if ('IntersectionObserver' in window && !still) {
    new IntersectionObserver(function (e) {
      var v = e[0].isIntersecting;
      if (v && !run) { run = true; requestAnimationFrame(frame); }
      run = v;
    }).observe(cv);
  }
  requestAnimationFrame(frame);
})();
