/* Одеський (Воронцовський) маяк і контейнеровоз: canvas-сцена внизу візитки. Без зовнішніх файлів.
   Промінь обертається сам; наведіть мишу або торкніться — він світить туди. */
(function () {
  var cv = document.getElementById('lh');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
  var W, H, D, HZ, LX, LY, TT, MX, MY, stars = [], clouds, gulls = [], run = true, t0 = performance.now(), last = t0;
  var A = -1.2, aim = null, aimUntil = 0, flash = 0;

  function rnd(s) { var x = Math.sin(s * 127.1) * 43758.5453; return x - Math.floor(x); }
  function rgba(c, a) { return 'rgba(' + c + ',' + Math.max(0, Math.min(1, a)).toFixed(3) + ')'; }
  function wrap(d) { while (d > Math.PI) d -= 6.2832; while (d < -Math.PI) d += 6.2832; return d; }

  function size() {
    D = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = Math.round(W * D); cv.height = Math.round(H * D);
    ctx.setTransform(D, 0, 0, D, 0, 0);
    HZ = H * 0.6;
    LX = W < 600 ? W * 0.2 : W * 0.15;
    TT = HZ - H * 0.4;
    MX = W * 0.82; MY = H * 0.15;
    stars = [];
    for (var i = 0; i < 110; i++) stars.push([rnd(i) * W, rnd(i + 9) * HZ * 0.75, rnd(i + 3) * 1.1 + 0.3, rnd(i + 5) * 6]);
    gulls = [];
    for (i = 0; i < 3; i++) gulls.push([rnd(i + 40) * W, HZ * (0.3 + rnd(i + 41) * 0.35), 0.6 + rnd(i + 42) * 0.6, rnd(i + 43) * 6]);
    makeClouds();
  }

  /* хмари малюємо один раз на окреме полотно і зсуваємо */
  function makeClouds() {
    var cw = Math.round(W * 1.6), ch = Math.round(HZ);
    clouds = document.createElement('canvas');
    clouds.width = Math.round(cw * D); clouds.height = Math.round(ch * D);
    var c = clouds.getContext('2d');
    c.setTransform(D, 0, 0, D, 0, 0);
    for (var i = 0; i < 7; i++) {
      var cx = rnd(i + 100) * cw, cy = ch * (0.25 + rnd(i + 101) * 0.45), r = W * (0.05 + rnd(i + 102) * 0.06);
      for (var j = 0; j < 9; j++) {
        var x = cx + (rnd(i * 13 + j) - 0.5) * r * 4, y = cy + (rnd(i * 17 + j) - 0.5) * r * 0.6, rr = r * (0.5 + rnd(i * 19 + j));
        var g = c.createRadialGradient(x, y, 0, x, y, rr * 1.8);
        g.addColorStop(0, 'rgba(120,128,140,.10)'); g.addColorStop(1, 'rgba(120,128,140,0)');
        c.fillStyle = g; c.beginPath(); c.ellipse(x, y, rr * 1.8, rr * 0.55, 0, 0, 6.2832); c.fill();
      }
    }
  }

  function sky(t) {
    var g = ctx.createLinearGradient(0, 0, 0, HZ);
    g.addColorStop(0, '#070b13'); g.addColorStop(0.5, '#122033'); g.addColorStop(0.85, '#3a3c45'); g.addColorStop(1, '#6b5244');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, HZ);
    var h = ctx.createRadialGradient(W * 0.62, HZ, 0, W * 0.62, HZ, W * 0.55);
    h.addColorStop(0, 'rgba(226,150,80,.35)'); h.addColorStop(1, 'rgba(226,150,80,0)');
    ctx.fillStyle = h; ctx.fillRect(0, 0, W, HZ);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i], a = (0.3 + 0.35 * Math.sin(t * 0.0012 + s[3])) * (1 - s[1] / HZ);
      ctx.fillStyle = rgba('230,236,242', a); ctx.fillRect(s[0], s[1], s[2], s[2]);
    }
    var mr = Math.max(7, H * 0.028), m = ctx.createRadialGradient(MX, MY, mr, MX, MY, mr * 7);
    m.addColorStop(0, 'rgba(230,232,220,.22)'); m.addColorStop(1, 'rgba(230,232,220,0)');
    ctx.fillStyle = m; ctx.fillRect(MX - mr * 7, MY - mr * 7, mr * 14, mr * 14);
    ctx.fillStyle = '#ecebe0'; ctx.beginPath(); ctx.arc(MX, MY, mr, 0, 6.2832); ctx.fill();
    ctx.fillStyle = 'rgba(170,170,160,.35)';
    ctx.beginPath(); ctx.arc(MX - mr * 0.3, MY - mr * 0.2, mr * 0.25, 0, 6.2832); ctx.arc(MX + mr * 0.35, MY + mr * 0.3, mr * 0.15, 0, 6.2832); ctx.fill();
    var off = (t * 0.004) % (W * 1.6);
    ctx.drawImage(clouds, -off, 0, W * 1.6, HZ); ctx.drawImage(clouds, W * 1.6 - off, 0, W * 1.6, HZ);
  }

  /* море: ряди хвиль у перспективі, ближче — вищі й світліші */
  function sea(t) {
    var g = ctx.createLinearGradient(0, HZ, 0, H);
    g.addColorStop(0, '#3a3434'); g.addColorStop(0.08, '#18202a'); g.addColorStop(0.5, '#0c1218'); g.addColorStop(1, '#04070a');
    ctx.fillStyle = g; ctx.fillRect(0, HZ, W, H - HZ);
    var N = 34, step = Math.max(6, W / 90);
    ctx.lineCap = 'round';
    for (var i = 1; i <= N; i++) {
      var k = Math.pow(i / N, 2.1), y0 = HZ + k * (H - HZ), amp = 0.4 + k * H * 0.018, f = 0.03 / (0.25 + k);
      ctx.lineWidth = 0.5 + k * 1.6;
      ctx.beginPath();
      for (var x = -step; x <= W + step; x += step) {
        var y = y0 + amp * (Math.sin(x * f + t * 0.0011 * (1 + i * 0.07) + i) * 0.6 + Math.sin(x * f * 2.3 - t * 0.0017 + i * 1.7) * 0.4);
        if (x < 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = rgba('150,170,190', 0.05 + 0.12 * k); ctx.stroke();
    }
  }

  /* мерехтлива доріжка відблиску на воді під точкою x */
  function trail(x, w, a, t, col, from) {
    for (var y = (from || HZ) + 2; y < H; y += 2.5) {
      var k = (y - HZ) / (H - HZ), sp = w * (0.35 + k * 1.9);
      var ox = Math.sin(y * 0.19 + t * 0.004) * sp * 0.4 + Math.sin(y * 0.05 - t * 0.002) * sp * 0.3;
      var al = a * (1 - k * 0.5) * Math.max(0, 0.3 + 0.7 * Math.sin(y * 0.63 + t * 0.005 + x));
      if (al <= 0.01) continue;
      ctx.fillStyle = rgba(col, al);
      ctx.fillRect(x + ox - sp / 2, y, sp, 1.3);
    }
  }

  /* Рейдовий мол: кам'яна дамба з ліхтарями, маяк на її краю */
  var MT, MB;
  function mole(t) {
    MT = HZ - H * 0.012; MB = HZ + H * 0.022;
    var end = LX + H * 0.09;
    ctx.fillStyle = '#0a0d11'; ctx.fillRect(0, MT, end, MB - MT);
    ctx.fillStyle = '#141a20'; ctx.fillRect(0, MT, end, 2);
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    for (var x = 4; x < end; x += H * 0.03) ctx.fillRect(x, MT + 3, 1, MB - MT - 3);
    ctx.fillStyle = '#07090c';
    ctx.beginPath(); ctx.moveTo(end, MT); ctx.lineTo(end + H * 0.03, MB); ctx.lineTo(end, MB); ctx.fill();
    for (x = H * 0.06; x < LX - H * 0.05; x += H * 0.11) {
      ctx.fillStyle = '#0a0d11'; ctx.fillRect(x, MT - H * 0.03, 1.2, H * 0.03);
      ctx.fillStyle = 'rgba(255,214,140,.85)'; ctx.fillRect(x - 1, MT - H * 0.033, 3.2, 2.4);
    }
    var a = 0.25 + 0.15 * Math.sin(t * 0.002);
    ctx.strokeStyle = rgba('220,230,240', a); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, MB + 1); ctx.lineTo(end + H * 0.03, MB + 1); ctx.stroke();
  }

  /* білий циліндр з галереєю, засклений ліхтар із куполом */
  function tower(glow) {
    var bw = Math.max(13, H * 0.05), tw = bw * 0.84, base = MT - H * 0.02, top = TT;
    ctx.fillStyle = '#1b2228';
    ctx.fillRect(LX - bw * 1.1, MT - H * 0.02, bw * 2.2, H * 0.02);
    ctx.fillStyle = '#2b333b'; ctx.fillRect(LX - bw * 1.1, MT - H * 0.02, bw * 2.2, 1.5);
    var g = ctx.createLinearGradient(LX - bw / 2, 0, LX + bw / 2, 0);
    g.addColorStop(0, '#5a6168'); g.addColorStop(0.35, '#e9ecee'); g.addColorStop(0.6, '#c6ccd1'); g.addColorStop(1, '#3c434a');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(LX - bw / 2, base); ctx.lineTo(LX - tw / 2, top); ctx.lineTo(LX + tw / 2, top); ctx.lineTo(LX + bw / 2, base);
    ctx.fill();
    ctx.strokeStyle = 'rgba(40,48,56,.35)'; ctx.lineWidth = 1;
    for (var i = 1; i < 6; i++) {
      var y = base - (base - top) * i / 6, w = bw - (bw - tw) * i / 6;
      ctx.beginPath(); ctx.moveTo(LX - w / 2, y); ctx.lineTo(LX + w / 2, y); ctx.stroke();
    }
    ctx.fillStyle = '#1b2228';
    ctx.fillRect(LX - bw * 0.14, base - H * 0.028, bw * 0.28, H * 0.028);
    ctx.fillStyle = 'rgba(255,214,140,.75)';
    for (i = 0; i < 3; i++) ctx.fillRect(LX - 1 + (i % 2 ? bw * 0.12 : -bw * 0.12), base - (base - top) * (0.3 + i * 0.22), 2, H * 0.012);
    /* консоль і галерея */
    ctx.fillStyle = '#d6dbdf';
    ctx.beginPath(); ctx.moveTo(LX - tw / 2, top); ctx.lineTo(LX - tw * 0.85, top - 4); ctx.lineTo(LX + tw * 0.85, top - 4); ctx.lineTo(LX + tw / 2, top); ctx.fill();
    ctx.fillStyle = '#11161b'; ctx.fillRect(LX - tw * 0.9, top - 6, tw * 1.8, 2.5);
    var rh = H * 0.018;
    ctx.fillRect(LX - tw * 0.9, top - 6 - rh, tw * 1.8, 1.2);
    for (i = 0; i <= 6; i++) ctx.fillRect(LX - tw * 0.9 + tw * 1.8 * i / 6 - 0.5, top - 6 - rh, 1, rh);
    /* ліхтарне приміщення */
    var lh = H * 0.048, lw = tw * 0.78, ly = top - 6 - lh;
    ctx.fillStyle = rgba('255,222,150', 0.65 + 0.35 * glow);
    ctx.fillRect(LX - lw / 2, ly, lw, lh);
    var lg = ctx.createRadialGradient(LX, ly + lh / 2, 0, LX, ly + lh / 2, lw * 0.6);
    lg.addColorStop(0, 'rgba(255,255,240,.9)'); lg.addColorStop(1, 'rgba(255,255,240,0)');
    ctx.fillStyle = lg; ctx.fillRect(LX - lw / 2, ly, lw, lh);
    ctx.fillStyle = '#11161b';
    for (i = 0; i <= 3; i++) ctx.fillRect(LX - lw / 2 + lw * i / 3 - 0.6, ly, 1.2, lh);
    ctx.fillRect(LX - lw / 2, ly + lh * 0.5, lw, 0.8);
    ctx.fillRect(LX - lw * 0.6, ly - 2, lw * 1.2, 2.5);
    ctx.beginPath(); ctx.ellipse(LX, ly - 2, lw * 0.6, lh * 0.55, 0, Math.PI, 0); ctx.fill();
    ctx.beginPath(); ctx.arc(LX, ly - 2 - lh * 0.6, 2.2, 0, 6.2832); ctx.fill();
    ctx.fillRect(LX - 0.5, ly - 2 - lh * 0.6 - H * 0.025, 1, H * 0.025);
    LY = ly + lh / 2;
  }

  /* азимут променя a: cos — вліво/вправо, sin > 0 — від нас до обрію, sin < 0 — на глядача.
     az(x, y) — обернене: який азимут світить у точку екрана (для судна і для пальця). */
  function az(x, y) { return Math.atan2((y - LY) / ((HZ - LY) * 0.9), (x - LX) / (W * 1.1)); }

  function beam(a) {
    var c = Math.cos(a), s = Math.sin(a);
    var ex = LX + c * W * 1.1, ey = LY + s * (HZ - LY) * 0.9 * (s > 0 ? 1 : 2.2);
    var toward = Math.max(0, -s), len = Math.hypot(ex - LX, ey - LY) || 1;
    var nx = -(ey - LY) / len, ny = (ex - LX) / len;
    var spread = H * (0.05 + 0.08 * (1 - Math.abs(c)) + 0.18 * toward);
    var alpha = 0.16 + 0.22 * Math.abs(c) + 0.12 * toward;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (var p = 0; p < 2; p++) {
      var sp = spread * (p ? 1.9 : 1), al = alpha * (p ? 0.35 : 1);
      var g = ctx.createLinearGradient(LX, LY, ex, ey);
      g.addColorStop(0, rgba('255,232,175', al)); g.addColorStop(0.5, rgba('255,226,165', al * 0.35)); g.addColorStop(1, 'rgba(255,224,160,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(LX + nx * 2, LY + ny * 2); ctx.lineTo(ex + nx * sp, ey + ny * sp); ctx.lineTo(ex - nx * sp, ey - ny * sp); ctx.lineTo(LX - nx * 2, LY - ny * 2); ctx.fill();
    }
    var fl = 0.3 + 0.3 * toward + flash * 0.4, R = H * (0.16 + 0.14 * toward);
    var r = ctx.createRadialGradient(LX, LY, 0, LX, LY, R);
    r.addColorStop(0, rgba('255,240,200', fl)); r.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.fillStyle = r; ctx.fillRect(LX - R, LY - R, R * 2, R * 2);
    if (toward > 0.9) { ctx.fillStyle = rgba('255,236,200', (toward - 0.9) * 0.6); ctx.fillRect(0, 0, W, H); }
    ctx.restore();
    return { ex: ex, ey: ey, c: c, s: s, alpha: alpha };
  }

  var BOXES = ['#9a5530', '#2f5576', '#9a7024', '#5f666e', '#7a332c', '#3b6650', '#b07430', '#2b4260', '#c9c3b5'];

  /* контейнеровоз іде справа наліво; ніс ліворуч (x=0), корма праворуч (x=L) */
  function ship(t, beamA) {
    var L = Math.min(W * 0.34, 470), hh = L * 0.055, span = W + L * 1.4;
    var sx = W + L * 0.2 - ((span * 0.38 + (still ? 0 : t * W * 0.000016)) % span);
    var wl = HZ + H * 0.045 + Math.sin(t * 0.0011) * 1.2;
    var lit = Math.exp(-Math.pow(wrap(beamA - az(sx + L * 0.5, wl - hh * 2)), 2) / 0.012);
    var i, j;
    /* носова хвиля й кільватер */
    ctx.strokeStyle = 'rgba(210,222,232,.2)'; ctx.lineWidth = 1;
    for (i = 0; i < 5; i++) {
      var wy = wl + 1 + i * 1.6, wx = sx + L * 1.02 + i * L * 0.12;
      ctx.globalAlpha = 0.9 - i * 0.16;
      ctx.beginPath(); ctx.moveTo(sx + L * 0.95, wl + 1); ctx.quadraticCurveTo(wx, wy, wx + L * 0.25, wy + i * 0.4); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(225,232,240,.4)';
    ctx.beginPath(); ctx.ellipse(sx + L * 0.03, wl, L * 0.035, 1.6, 0, 0, 6.2832); ctx.fill();
    ctx.save();
    ctx.translate(sx, wl); ctx.rotate(Math.sin(t * 0.0009) * 0.004);
    /* корпус */
    ctx.fillStyle = '#0b0e12';
    ctx.beginPath();
    ctx.moveTo(L * 0.035, 0);
    ctx.quadraticCurveTo(-L * 0.005, -hh * 0.2, L * 0.012, -hh * 0.55);
    ctx.lineTo(-L * 0.012, -hh * 1.3);
    ctx.lineTo(L * 0.08, -hh * 1.3); ctx.lineTo(L * 0.1, -hh * 1.05);
    ctx.lineTo(L * 0.84, -hh * 1.05); ctx.lineTo(L * 0.86, -hh * 1.12);
    ctx.lineTo(L, -hh * 1.12); ctx.lineTo(L, -hh * 0.35); ctx.lineTo(L * 0.965, 0);
    ctx.fill();
    ctx.fillStyle = lit > 0.01 ? 'rgba(107,38,32,' + (0.25 + lit * 0.6).toFixed(2) + ')' : 'rgba(60,24,22,.35)';
    ctx.beginPath(); ctx.moveTo(L * 0.03, -hh * 0.05); ctx.lineTo(L * 0.97, -hh * 0.05); ctx.lineTo(L * 0.985, -hh * 0.28); ctx.lineTo(L * 0.016, -hh * 0.28); ctx.fill();
    if (lit > 0.01) {
      ctx.globalAlpha = lit * 0.85; ctx.fillStyle = '#25384d';
      ctx.fillRect(L * 0.03, -hh * 1.04, L * 0.95, hh * 0.76); ctx.globalAlpha = 1;
      ctx.strokeStyle = rgba('180,190,200', lit * 0.25); ctx.lineWidth = 0.6;
      for (i = 1; i < 14; i++) { ctx.beginPath(); ctx.moveTo(L * i / 14, -hh * 1.04); ctx.lineTo(L * i / 14, -hh * 0.3); ctx.stroke(); }
    }
    ctx.fillStyle = rgba('230,232,236', 0.25 + lit * 0.5);
    ctx.fillRect(L * 0.03, -hh * 0.4, 1, 3); ctx.fillRect(L * 0.03, -hh * 0.62, 1, 1);
    /* штабелі контейнерів по секціях, нижчі до носа */
    var cw = L * 0.032, ch = hh * 0.5, x0 = L * 0.11, x1 = L * 0.76, bay = 0;
    for (var cx = x0; cx + cw < x1; cx += cw) {
      if (bay++ % 3 === 2) { cx += cw * 0.25; }
      var k = (cx - x0) / (x1 - x0), rows = Math.round(2 + Math.min(1, k * 2.5) * 2 + rnd(cx) * 1.2);
      for (j = 0; j < rows; j++) {
        var cy = -hh * 1.05 - (j + 1) * ch;
        ctx.fillStyle = '#12161b'; ctx.fillRect(cx, cy, cw - 0.8, ch - 0.8);
        {
          ctx.globalAlpha = Math.min(1, 0.22 + lit * (0.7 + 0.3 * k));
          ctx.fillStyle = BOXES[Math.floor(rnd(Math.round(cx * 7) + j * 31) * BOXES.length)]; ctx.fillRect(cx, cy, cw - 0.8, ch - 0.8);
          ctx.fillStyle = 'rgba(0,0,0,.28)';
          for (var r = 1; r < 4; r++) ctx.fillRect(cx + (cw - 0.8) * r / 4, cy, 0.5, ch - 0.8);
          ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(cx, cy, cw - 0.8, 0.7);
          ctx.globalAlpha = 1;
        }
      }
    }
    ctx.fillStyle = '#0b0e12';
    ctx.fillRect(L * 0.03, -hh * 2.6, 1.2, hh * 1.3);
    ctx.fillRect(L * 0.005, -hh * 1.6, L * 0.06, 1.5);
    /* надбудова, крила містка, труба */
    var bx = L * 0.775, bw = L * 0.075, bh = hh * 3.6, top = -hh * 1.12 - bh;
    ctx.fillRect(bx, top, bw, bh);
    ctx.fillRect(bx - bw * 0.25, top + bh * 0.06, bw * 1.5, hh * 0.18);
    ctx.fillRect(bx + bw * 0.3, top - hh * 1.2, 1.4, hh * 1.2);
    ctx.fillRect(bx + bw * 0.1, top - hh * 0.75, bw * 0.55, 1.2);
    var fx = bx + bw * 1.25, fw = L * 0.035;
    ctx.beginPath(); ctx.moveTo(fx, -hh * 1.12); ctx.lineTo(fx + fw * 0.15, top + bh * 0.25); ctx.lineTo(fx + fw * 1.05, top + bh * 0.2); ctx.lineTo(fx + fw, -hh * 1.12); ctx.fill();
    if (lit > 0.01) {
      ctx.globalAlpha = lit * 0.85;
      ctx.fillStyle = '#e1e5e8'; ctx.fillRect(bx, top, bw, bh); ctx.fillRect(bx - bw * 0.25, top + bh * 0.06, bw * 1.5, hh * 0.18);
      ctx.fillStyle = '#ad3a2e'; ctx.fillRect(fx + fw * 0.12, top + bh * 0.3, fw * 0.9, hh * 0.3);
      ctx.fillStyle = '#e1e5e8'; ctx.fillRect(fx + fw * 0.12, top + bh * 0.3 + hh * 0.3, fw * 0.9, hh * 0.9);
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = 'rgba(255,214,140,.92)';
    for (i = 0; i < 5; i++) ctx.fillRect(bx + bw * (0.06 + i * 0.19), top + bh * 0.13, bw * 0.12, hh * 0.18);
    ctx.fillStyle = 'rgba(255,214,140,.6)';
    for (j = 0; j < 4; j++) for (i = 0; i < 3; i++) if (rnd(i * 5 + j) > 0.35) ctx.fillRect(bx + bw * (0.15 + i * 0.3), top + bh * (0.32 + j * 0.15), bw * 0.08, hh * 0.13);
    var bl = 0.55 + 0.45 * Math.sin(t * 0.004);
    ctx.fillStyle = rgba('255,255,240', bl);
    ctx.fillRect(bx + bw * 0.3 - 0.6, top - hh * 1.25, 2.6, 2.6);
    ctx.fillRect(L * 0.03 - 0.7, -hh * 2.7, 2.6, 2.6);
    ctx.fillStyle = '#e04a3a'; ctx.fillRect(bx - bw * 0.25, top + bh * 0.02, 2.6, 2.6);
    ctx.fillStyle = 'rgba(255,240,210,.55)'; ctx.fillRect(L * 0.995, -hh * 0.9, 2, 2);
    ctx.restore();
    return { x: sx + L * 0.5, w: L, y: wl, lit: lit, bridge: sx + bx + bw * 0.5 };
  }

  function birds(t, dt) {
    ctx.strokeStyle = 'rgba(20,24,30,.8)'; ctx.lineWidth = 1.2;
    for (var i = 0; i < gulls.length; i++) {
      var g = gulls[i];
      g[0] -= dt * 0.012 * g[2]; if (g[0] < -20) g[0] = W + 20;
      var y = g[1] + Math.sin(t * 0.0007 + g[3]) * 6, s = 3 + g[2] * 3, f = Math.sin(t * 0.009 + g[3]) * s * 0.6;
      ctx.beginPath(); ctx.moveTo(g[0] - s, y - f); ctx.quadraticCurveTo(g[0] - s * 0.4, y - s * 0.3, g[0], y); ctx.quadraticCurveTo(g[0] + s * 0.4, y - s * 0.3, g[0] + s, y - f); ctx.stroke();
    }
  }

  function frame(now) {
    var t = still ? 4000 : now - t0, dt = Math.min(50, now - last); last = now;
    if (!still) {
      if (aim !== null && (aimUntil === 0 || now < aimUntil)) A += wrap(aim - A) * Math.min(1, dt * 0.006);
      else { aim = null; A += dt * 0.0006; }
      A = wrap(A);
      flash *= 0.94;
    } else A = 0.12;
    sky(t);
    sea(t);
    trail(MX, H * 0.05, 0.16, t, '236,232,214');
    birds(t, still ? 0 : dt);
    mole(t);
    tower(Math.max(0, -Math.sin(A)));
    trail(LX, H * 0.05, 0.3, t, '255,214,140', MB);
    var sh = ship(t, A);
    trail(sh.bridge, sh.w * 0.05, 0.22, t, '255,214,140', sh.y);
    if (sh.lit > 0.05) trail(sh.x, sh.w * 0.6, sh.lit * 0.2, t, '255,226,170', sh.y);
    var b = beam(A);
    if (b.s > 0.1 && Math.abs(b.c) > 0.15) trail(LX + (b.ex - LX) * 0.55, H * 0.06, b.alpha * 0.3, t, '255,226,170');
    if (!still && run) requestAnimationFrame(frame);
  }

  function point(e) {
    var r = cv.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  }
  if (!still) {
    var box = cv.parentNode;
    box.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var p = point(e); aim = az(p[0], p[1]); aimUntil = 0;
    });
    box.addEventListener('pointerleave', function () { aimUntil = performance.now() + 1500; });
    box.addEventListener('pointerdown', function (e) {
      var p = point(e); aim = az(p[0], p[1]); aimUntil = performance.now() + 5000; flash = 1;
    });
  }

  size();
  window.addEventListener('resize', function () { size(); if (still || !run) frame(performance.now()); });
  if ('IntersectionObserver' in window && !still) {
    new IntersectionObserver(function (e) {
      var v = e[0].isIntersecting;
      if (v && !run) { run = true; last = performance.now(); requestAnimationFrame(frame); }
      run = v;
    }).observe(cv);
  }
  requestAnimationFrame(frame);
})();
