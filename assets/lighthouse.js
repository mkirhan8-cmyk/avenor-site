/* Одеський (Воронцовський) маяк і контейнеровоз: canvas-сцена внизу візитки. Без зовнішніх файлів.
   Промінь обертається сам; наведіть мишу або торкніться — він світить туди. */
(function () {
  var cv = document.getElementById('lh');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
  var W, H, D, HZ, LX, LY, TT, MX, MY, stars = [], clouds, gulls = [], run = true, t0 = performance.now(), last = t0;
  var A = -1.2, aim = null, aimUntil = 0, flash = 0, onShip = 0;

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
    g.addColorStop(0, '#080d18'); g.addColorStop(0.42, '#1a2640'); g.addColorStop(0.7, '#4a4258'); g.addColorStop(0.88, '#a8664c'); g.addColorStop(1, '#e09a62');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, HZ);
    var h = ctx.createRadialGradient(W * 0.62, HZ, 0, W * 0.62, HZ, W * 0.55);
    h.addColorStop(0, 'rgba(240,160,90,.45)'); h.addColorStop(1, 'rgba(226,150,80,0)');
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
    g.addColorStop(0, '#7a4e3c'); g.addColorStop(0.08, '#2a2630'); g.addColorStop(0.5, '#0c1218'); g.addColorStop(1, '#04070a');
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

  /* Воронцовський маяк: білий циліндр на двоярусному цоколі, консолі під галереєю,
     засклений ліхтар із ромбічними рамами й лінзою Френеля, купол із флюгаркою */
  function tower(glow, t) {
    var bw = Math.max(13, H * 0.05), tw = bw * 0.86, base = MT - H * 0.034, top = TT, i, y, w;
    /* цоколь */
    ctx.fillStyle = '#161c22'; ctx.fillRect(LX - bw * 1.25, MT - H * 0.014, bw * 2.5, H * 0.014);
    ctx.fillStyle = '#26303a'; ctx.fillRect(LX - bw * 1.25, MT - H * 0.014, bw * 2.5, 1.2);
    var pg = ctx.createLinearGradient(LX - bw * 0.8, 0, LX + bw * 0.8, 0);
    pg.addColorStop(0, '#3f464d'); pg.addColorStop(0.4, '#b9c0c6'); pg.addColorStop(1, '#2c3238');
    ctx.fillStyle = pg; ctx.fillRect(LX - bw * 0.78, base, bw * 1.56, MT - H * 0.014 - base);
    ctx.fillStyle = '#1b2228'; ctx.fillRect(LX - bw * 0.82, base - 2, bw * 1.64, 2.5);
    ctx.beginPath(); ctx.moveTo(LX - bw * 0.13, MT - H * 0.014); ctx.lineTo(LX - bw * 0.13, base + H * 0.007);
    ctx.arc(LX, base + H * 0.007, bw * 0.13, Math.PI, 0); ctx.lineTo(LX + bw * 0.13, MT - H * 0.014); ctx.fill();
    ctx.fillStyle = 'rgba(255,214,140,.8)'; ctx.fillRect(LX - 1, base + H * 0.004, 2, 2);
    /* ствол */
    var g = ctx.createLinearGradient(LX - bw / 2, 0, LX + bw / 2, 0);
    g.addColorStop(0, '#4f565d'); g.addColorStop(0.28, '#dfe3e6'); g.addColorStop(0.42, '#f4f6f7'); g.addColorStop(0.65, '#c3c9ce'); g.addColorStop(1, '#353c43');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(LX - bw / 2, base - 2); ctx.lineTo(LX - tw / 2, top); ctx.lineTo(LX + tw / 2, top); ctx.lineTo(LX + bw / 2, base - 2); ctx.fill();
    ctx.strokeStyle = 'rgba(60,70,80,.18)'; ctx.lineWidth = 0.8;
    for (i = 1; i < 12; i++) {
      y = base - (base - top) * i / 12; w = bw - (bw - tw) * i / 12;
      ctx.beginPath(); ctx.moveTo(LX - w / 2, y); ctx.lineTo(LX + w / 2, y); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255,255,255,.25)';
    ctx.beginPath(); ctx.moveTo(LX - bw * 0.16, base - 2); ctx.lineTo(LX - tw * 0.16, top); ctx.stroke();
    /* місячний контровий світ праворуч, тінь під галереєю, тепла підсвітка від ліхтаря */
    ctx.strokeStyle = 'rgba(190,210,235,.45)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(LX + bw / 2 - 0.8, base - 2); ctx.lineTo(LX + tw / 2 - 0.8, top); ctx.stroke();
    var ao = ctx.createLinearGradient(0, top, 0, top + H * 0.05);
    ao.addColorStop(0, 'rgba(10,14,20,.45)'); ao.addColorStop(1, 'rgba(10,14,20,0)');
    ctx.fillStyle = ao; ctx.fillRect(LX - bw / 2, top, bw, H * 0.05);
    var wg = ctx.createLinearGradient(0, top - H * 0.02, 0, top + H * 0.12);
    wg.addColorStop(0, rgba('255,214,150', 0.12 + 0.18 * glow)); wg.addColorStop(1, 'rgba(255,214,150,0)');
    ctx.fillStyle = wg; ctx.fillRect(LX - bw / 2, top, bw, H * 0.12);
    /* шви кладки цоколя */
    ctx.strokeStyle = 'rgba(20,26,32,.35)'; ctx.lineWidth = 0.6;
    for (i = 1; i < 4; i++) {
      y = base + (MT - H * 0.014 - base) * i / 4;
      ctx.beginPath(); ctx.moveTo(LX - bw * 0.78, y); ctx.lineTo(LX + bw * 0.78, y); ctx.stroke();
    }
    /* вікна по спіралі сходів */
    for (i = 0; i < 6; i++) {
      y = base - (base - top) * (0.14 + i * 0.14); var ox = Math.sin(i * 1.9) * bw * 0.18;
      ctx.fillStyle = '#20272e'; ctx.fillRect(LX + ox - 1.6, y, 3.2, H * 0.014);
      ctx.fillStyle = rgba('255,214,140', 0.5 + 0.3 * (i % 2)); ctx.fillRect(LX + ox - 1, y + 1, 2, H * 0.014 - 2);
    }
    /* консолі й галерея */
    ctx.fillStyle = '#cfd5da';
    ctx.beginPath(); ctx.moveTo(LX - tw / 2, top + 3); ctx.lineTo(LX - tw * 0.92, top - 4); ctx.lineTo(LX + tw * 0.92, top - 4); ctx.lineTo(LX + tw / 2, top + 3); ctx.fill();
    ctx.fillStyle = 'rgba(40,48,56,.5)';
    for (i = 0; i < 9; i++) {
      var bxp = LX - tw * 0.85 + tw * 1.7 * i / 8, bl = 4 + (1 - Math.abs(i - 4) / 4) * 3;
      ctx.beginPath(); ctx.moveTo(bxp - 0.8, top - 4); ctx.quadraticCurveTo(bxp - 0.8, top - 4 + bl, bxp + 0.6, top - 4 + bl * 1.1); ctx.lineTo(bxp + 0.8, top - 4); ctx.fill();
    }
    ctx.fillStyle = '#11161b'; ctx.fillRect(LX - tw * 0.98, top - 6.5, tw * 1.96, 2.8);
    var rh = H * 0.02;
    ctx.fillRect(LX - tw * 0.98, top - 6.5 - rh, tw * 1.96, 1.3);
    ctx.fillRect(LX - tw * 0.98, top - 6.5 - rh * 0.5, tw * 1.96, 0.7);
    for (i = 0; i <= 8; i++) ctx.fillRect(LX - tw * 0.98 + tw * 1.96 * i / 8 - 0.5, top - 6.5 - rh, 1, rh);
    /* ліхтарне приміщення */
    var lh = H * 0.052, lw = tw * 0.8, ly = top - 6.5 - lh;
    ctx.fillStyle = '#11161b'; ctx.fillRect(LX - lw * 0.56, ly + lh * 0.82, lw * 1.12, lh * 0.18);
    var gl = ly, gh = lh * 0.82;
    ctx.fillStyle = rgba('255,222,150', 0.55 + 0.4 * glow); ctx.fillRect(LX - lw / 2, gl, lw, gh);
    /* лінза Френеля: світле ядро з кільцями */
    var lg = ctx.createRadialGradient(LX, gl + gh / 2, 0, LX, gl + gh / 2, lw * 0.55);
    lg.addColorStop(0, 'rgba(255,255,245,1)'); lg.addColorStop(0.5, rgba('255,240,200', 0.7 + 0.3 * glow)); lg.addColorStop(1, 'rgba(255,220,150,0)');
    ctx.fillStyle = lg; ctx.fillRect(LX - lw / 2, gl, lw, gh);
    ctx.fillStyle = 'rgba(160,120,60,.35)';
    for (i = 1; i < 6; i++) ctx.fillRect(LX - lw * 0.28, gl + gh * i / 6, lw * 0.56, 0.6);
    /* панель лінзи, що обертається разом із променем */
    var pc = Math.cos(A), px = LX + pc * lw * 0.32, pa = Math.max(0, -Math.sin(A));
    var pgr = ctx.createLinearGradient(px - lw * 0.2, 0, px + lw * 0.2, 0);
    pgr.addColorStop(0, 'rgba(255,255,255,0)'); pgr.addColorStop(0.5, rgba('255,255,250', 0.35 + 0.65 * pa)); pgr.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = pgr; ctx.fillRect(LX - lw / 2, gl, lw, gh);
    ctx.strokeStyle = '#11161b'; ctx.lineWidth = 1;
    ctx.save(); ctx.beginPath(); ctx.rect(LX - lw / 2, gl, lw, gh); ctx.clip();
    for (i = -3; i <= 3; i++) {
      ctx.beginPath(); ctx.moveTo(LX + i * lw * 0.3 - lw * 0.3, gl + gh); ctx.lineTo(LX + i * lw * 0.3 + lw * 0.3, gl); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(LX + i * lw * 0.3 + lw * 0.3, gl + gh); ctx.lineTo(LX + i * lw * 0.3 - lw * 0.3, gl); ctx.stroke();
    }
    ctx.restore();
    ctx.strokeRect(LX - lw / 2, gl, lw, gh);
    /* відблиски на склі */
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(LX - lw * 0.42, gl + 1, 0.8, gh - 2);
    /* купол, флюгарка, громовідвід */
    ctx.fillStyle = '#11161b';
    ctx.fillRect(LX - lw * 0.62, ly - 2.5, lw * 1.24, 2.8);
    ctx.beginPath(); ctx.ellipse(LX, ly - 2.5, lw * 0.6, lh * 0.5, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.18)';
    ctx.beginPath(); ctx.ellipse(LX - lw * 0.18, ly - 2.5 - lh * 0.28, lw * 0.16, lh * 0.08, -0.4, 0, 6.2832); ctx.fill();
    ctx.fillStyle = '#11161b';
    ctx.beginPath(); ctx.arc(LX, ly - 2.5 - lh * 0.55, 2.6, 0, 6.2832); ctx.fill();
    ctx.fillRect(LX - 0.5, ly - 2.5 - lh * 0.55 - H * 0.03, 1, H * 0.03);
    ctx.fillRect(LX - 3, ly - 2.5 - lh * 0.55 - H * 0.022, 6, 0.8);
    LY = gl + gh / 2;
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

  var BOXES = ['#9a5530', '#2f5576', '#9a7024', '#5f666e', '#7a332c', '#3b6650', '#b07430', '#2b4260', '#c9c3b5', '#8e2f2a', '#3d6f8a'];

  /* сухогруз (балкер) іде далі по морю, зі зсувом на пів кола від контейнеровоза:
     чорний корпус, 5 трюмів із кришками, 4 палубні крани, біла надбудова на кормі */
  function bulker(t, beamA) {
    var L0 = Math.min(W * 0.38, 540), span0 = W + L0 * 1.4;
    var L = Math.min(W * 0.3, 420), hh = L * 0.06, span = W + L * 1.4;
    var ph = ((span0 * 0.38 + (still ? 0 : t * W * 0.000016)) / span0 + 0.5) % 1;
    var sx = W + L * 0.2 - ph * span;
    var wl = HZ + H * 0.018 + Math.sin(t * 0.0013 + 2) * 0.8;
    if (sx > W + 4 || sx + L < -4) return { x: sx + L * 0.5, w: L, y: wl, lit: 0, bridge: sx + L * 0.88, off: true };
    var lit = Math.exp(-Math.pow(wrap(beamA - az(sx + L * 0.5, wl - hh * 2)), 2) / 0.02);
    if (!(lit >= 0)) lit = 0;
    var i, j, x;
    ctx.fillStyle = 'rgba(4,6,9,.4)';
    for (i = 0; i < 7; i++) { var rw = L * (0.92 - i * 0.04); ctx.fillRect(sx + L * 0.04 + (L * 0.92 - rw) / 2 + Math.sin(t * 0.003 + i) * 2, wl + 2 + i * 1.8, rw, 1.2); }
    ctx.strokeStyle = 'rgba(210,222,232,.18)'; ctx.lineWidth = 1;
    for (i = 0; i < 4; i++) { var wx = sx + L * 1.02 + i * L * 0.12; ctx.beginPath(); ctx.moveTo(sx + L * 0.95, wl + 1); ctx.quadraticCurveTo(wx, wl + 1 + i * 1.4, wx + L * 0.22, wl + 1 + i * 1.8); ctx.stroke(); }
    ctx.fillStyle = rgba('230,236,242', 0.3 + 0.12 * Math.sin(t * 0.006));
    ctx.beginPath(); ctx.ellipse(sx + L * 0.03, wl, L * 0.035, 1.5, 0, 0, 6.2832); ctx.fill();
    ctx.save(); ctx.translate(sx, wl); ctx.rotate(Math.sin(t * 0.0008 + 1) * 0.005);
    /* корпус */
    ctx.fillStyle = '#0a0d10';
    ctx.beginPath(); ctx.moveTo(L * 0.04, 0); ctx.quadraticCurveTo(-L * 0.005, -hh * 0.2, L * 0.012, -hh * 0.6);
    ctx.lineTo(-L * 0.012, -hh * 1.45); ctx.lineTo(L * 0.1, -hh * 1.45); ctx.lineTo(L * 0.115, -hh * 1.15);
    ctx.lineTo(L, -hh * 1.15); ctx.lineTo(L * 0.997, -hh * 0.45); ctx.lineTo(L * 0.96, 0); ctx.fill();
    ctx.globalAlpha = 0.15 + lit * 0.75; ctx.fillStyle = '#23272d';
    ctx.beginPath(); ctx.moveTo(L * 0.02, -hh * 0.32); ctx.lineTo(-L * 0.008, -hh * 1.43); ctx.lineTo(L * 0.1, -hh * 1.43); ctx.lineTo(L * 0.115, -hh * 1.13); ctx.lineTo(L * 0.995, -hh * 1.13); ctx.lineTo(L * 0.993, -hh * 0.32); ctx.fill();
    ctx.fillStyle = '#6e2620';
    ctx.beginPath(); ctx.moveTo(L * 0.035, -hh * 0.04); ctx.lineTo(L * 0.962, -hh * 0.04); ctx.lineTo(L * 0.99, -hh * 0.32); ctx.lineTo(L * 0.02, -hh * 0.32); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = rgba('235,238,240', 0.25 + lit * 0.55);
    ctx.fillRect(L * 0.115, -hh * 1.15, L * 0.885, 0.8);
    /* трюми з кришками і комінгсами */
    var hx0 = L * 0.14, hw = L * 0.105, gap = L * 0.03;
    for (i = 0; i < 5; i++) {
      x = hx0 + i * (hw + gap);
      ctx.fillStyle = '#0a0d10'; ctx.fillRect(x, -hh * 1.6, hw, hh * 0.45);
      ctx.globalAlpha = 0.18 + lit * 0.75; ctx.fillStyle = '#7c2f26'; ctx.fillRect(x, -hh * 1.6, hw, hh * 0.45);
      ctx.fillStyle = 'rgba(0,0,0,.35)';
      for (j = 1; j < 4; j++) ctx.fillRect(x + hw * j / 4, -hh * 1.6, 0.6, hh * 0.45);
      ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(x, -hh * 1.6, hw, 0.7);
      ctx.globalAlpha = 1;
    }
    /* палубні крани між трюмами: колона, кабіна, стріла */
    for (i = 0; i < 4; i++) {
      x = hx0 + hw + gap / 2 + i * (hw + gap);
      var ch = hh * 2.3, ang = -0.9 - 0.25 * Math.sin(i * 1.7 + t * 0.0002);
      ctx.fillStyle = '#0a0d10'; ctx.fillRect(x - 1.4, -hh * 1.15 - ch, 2.8, ch);
      ctx.globalAlpha = 0.2 + lit * 0.75; ctx.fillStyle = '#d6a43a';
      ctx.fillRect(x - 1.4, -hh * 1.15 - ch, 2.8, ch);
      ctx.fillRect(x - 3, -hh * 1.15 - ch - hh * 0.35, 6, hh * 0.35);
      ctx.strokeStyle = '#d6a43a'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(x, -hh * 1.15 - ch * 0.75); ctx.lineTo(x + Math.cos(ang) * hh * 3.4, -hh * 1.15 - ch * 0.75 + Math.sin(ang) * hh * 3.4); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = rgba('20,24,30', 0.7); ctx.lineWidth = 0.5;
      var tx = x + Math.cos(ang) * hh * 3.4, ty = -hh * 1.15 - ch * 0.75 + Math.sin(ang) * hh * 3.4;
      ctx.beginPath(); ctx.moveTo(x, -hh * 1.15 - ch - hh * 0.35); ctx.lineTo(tx, ty); ctx.lineTo(tx, ty + hh * 0.9); ctx.stroke();
    }
    /* бак, фок-щогла */
    ctx.fillStyle = '#0a0d10';
    ctx.fillRect(L * 0.05, -hh * 3.0, 1.4, hh * 1.55); ctx.fillRect(L * 0.037, -hh * 2.5, L * 0.03, 1);
    /* надбудова і труба */
    var bx = L * 0.84, bw = L * 0.1, bh = hh * 3.4, top = -hh * 1.15 - bh;
    ctx.fillStyle = '#0a0d10'; ctx.fillRect(bx, top, bw, bh); ctx.fillRect(bx - bw * 0.25, top + bh * 0.05, bw * 1.45, hh * 0.18);
    ctx.globalAlpha = 0.16 + lit * 0.8; ctx.fillStyle = '#e8ebed';
    ctx.fillRect(bx, top, bw, bh); ctx.fillRect(bx - bw * 0.25, top + bh * 0.05, bw * 1.45, hh * 0.18);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(0,0,0,.3)';
    for (i = 1; i < 5; i++) ctx.fillRect(bx, top + bh * (0.2 + i * 0.16), bw, 0.6);
    ctx.fillStyle = '#0d1418'; ctx.fillRect(bx + bw * 0.05, top + bh * 0.1, bw * 0.9, hh * 0.22);
    ctx.fillStyle = 'rgba(255,214,140,.9)';
    for (i = 0; i < 6; i++) ctx.fillRect(bx + bw * (0.08 + i * 0.15), top + bh * 0.11, bw * 0.1, hh * 0.18);
    for (j = 0; j < 4; j++) for (i = 0; i < 3; i++) {
      ctx.fillStyle = rnd(i * 7 + j * 13 + 3) > 0.45 ? 'rgba(255,214,140,.65)' : 'rgba(30,38,46,.9)';
      ctx.fillRect(bx + bw * (0.14 + i * 0.28), top + bh * (0.34 + j * 0.16), bw * 0.12, hh * 0.13);
    }
    ctx.fillStyle = '#0a0d10'; ctx.fillRect(bx + bw * 0.45, top - hh * 1.2, 1.3, hh * 1.2); ctx.fillRect(bx + bw * 0.2, top - hh * 0.75, bw * 0.55, 1);
    var fx = bx + bw * 1.08, fw = L * 0.035, ft = top + bh * 0.2;
    ctx.beginPath(); ctx.moveTo(fx, -hh * 1.15); ctx.lineTo(fx + fw * 0.1, ft); ctx.lineTo(fx + fw * 1.05, ft - 1.5); ctx.lineTo(fx + fw, -hh * 1.15); ctx.fill();
    ctx.globalAlpha = 0.2 + lit * 0.75; ctx.fillStyle = '#2b4260'; ctx.fillRect(fx + fw * 0.12, ft + hh * 0.3, fw * 0.86, hh * 1.1);
    ctx.fillStyle = '#d9dde0'; ctx.fillRect(fx + fw * 0.12, ft + hh * 0.6, fw * 0.86, hh * 0.4); ctx.globalAlpha = 1;
    if (!still) for (i = 0; i < 7; i++) {
      var age = (t * 0.0003 + i / 7) % 1;
      ctx.fillStyle = rgba('120,126,134', 0.18 * (1 - age));
      ctx.beginPath(); ctx.arc(fx + fw * 0.6 + age * L * 0.2, ft - 2 - age * hh * 3 - Math.sin(age * 6 + i) * 2, 1.6 + age * hh * 0.8, 0, 6.2832); ctx.fill();
    }
    if (lit > 0.05) {
      ctx.save(); ctx.globalAlpha = lit;
      ctx.fillStyle = 'rgba(240,242,244,.9)'; ctx.textBaseline = 'middle';
      ctx.font = '700 ' + (hh * 0.26).toFixed(1) + 'px Montserrat,Arial,sans-serif';
      ctx.textAlign = 'left'; ctx.fillText('AVENOR', L * 0.055, -hh * 1.25);
      ctx.textAlign = 'right'; ctx.fillText('ODESA', L * 0.97, -hh * 0.95);
      ctx.fillStyle = 'rgba(235,238,240,.8)';
      for (i = 0; i < 4; i++) { ctx.fillRect(L * 0.03 + i * 0.3, -hh * (0.38 + i * 0.14), 2, 0.7); ctx.fillRect(L * 0.975, -hh * (0.38 + i * 0.14), 2, 0.7); }
      ctx.fillStyle = 'rgba(130,70,45,.5)';
      for (i = 0; i < 7; i++) ctx.fillRect(L * (0.15 + i * 0.11), -hh * 1.1, 0.6, hh * (0.15 + rnd(i + 90) * 0.25));
      ctx.strokeStyle = 'rgba(235,238,240,.5)'; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(L * 0.115, -hh * 1.38); ctx.lineTo(L * 0.84, -hh * 1.38); ctx.stroke();
      for (i = 0; i < 30; i++) { x = L * (0.12 + i * 0.024); ctx.beginPath(); ctx.moveTo(x, -hh * 1.15); ctx.lineTo(x, -hh * 1.38); ctx.stroke(); }
      for (j = 1; j < 5; j++) { var dy = top + bh * (0.2 + j * 0.16) - 0.5; ctx.beginPath(); ctx.moveTo(bx - 1.2, dy); ctx.lineTo(bx + bw + 1.2, dy); ctx.stroke(); }
      ctx.restore();
      var hx = L * (0.5 - wrap(beamA - az(sx + L * 0.5, wl - hh * 2)) * 3);
      var sg = ctx.createRadialGradient(hx, -hh * 2, 0, hx, -hh * 2, L * 0.4);
      sg.addColorStop(0, rgba('255,228,180', 0.2 * lit)); sg.addColorStop(1, 'rgba(255,228,180,0)');
      ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = sg; ctx.fillRect(hx - L * 0.4, -hh * 2 - L * 0.4, L * 0.8, L * 0.4 + hh * 2.2);
      ctx.globalCompositeOperation = 'source-over';
    }
    var bl = 0.55 + 0.45 * Math.sin(t * 0.004 + 1);
    ctx.fillStyle = rgba('255,255,240', bl); ctx.fillRect(bx + bw * 0.45 - 0.6, top - hh * 1.28, 2.2, 2.2);
    ctx.fillRect(L * 0.05 - 0.4, -hh * 3.08, 2.2, 2.2);
    ctx.fillStyle = 'rgba(255,214,140,.45)';
    for (i = 0; i < 5; i++) ctx.fillRect(L * (0.16 + i * 0.135), -hh * 1.25, 1.4, 1.4);
    ctx.restore();
    return { x: sx + L * 0.5, w: L, y: wl, lit: lit, bridge: sx + bx + bw * 0.5 };
  }

  /* контейнеровоз іде справа наліво; ніс ліворуч (x=0), корма праворуч (x=L) */
  function ship(t, beamA) {
    var L = Math.min(W * 0.38, 540), hh = L * 0.055, span = W + L * 1.4;
    var sx = W + L * 0.2 - ((span * 0.38 + (still ? 0 : t * W * 0.000016)) % span);
    var wl = HZ + H * 0.045 + Math.sin(t * 0.0011) * 1.2;
    var lit = Math.exp(-Math.pow(wrap(beamA - az(sx + L * 0.5, wl - hh * 2)), 2) / 0.02);
    var i, j, x;
    /* відображення корпусу у воді */
    ctx.fillStyle = 'rgba(4,6,9,.45)';
    for (i = 0; i < 10; i++) {
      var ry = wl + 2 + i * 2.2, rw = L * (0.94 - i * 0.03), ro = Math.sin(t * 0.003 + i) * 3;
      ctx.fillRect(sx + L * 0.03 + ro + (L * 0.94 - rw) / 2, ry, rw, 1.4);
    }
    /* носовий бурун і кільватер */
    ctx.strokeStyle = 'rgba(210,222,232,.22)'; ctx.lineWidth = 1;
    for (i = 0; i < 6; i++) {
      var wy = wl + 1 + i * 1.6, wx = sx + L * 1.02 + i * L * 0.12;
      ctx.globalAlpha = 0.9 - i * 0.14;
      ctx.beginPath(); ctx.moveTo(sx + L * 0.95, wl + 1); ctx.quadraticCurveTo(wx, wy, wx + L * 0.25, wy + i * 0.4); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    var fo = 0.35 + 0.15 * Math.sin(t * 0.006);
    ctx.fillStyle = rgba('230,236,242', fo);
    ctx.beginPath(); ctx.ellipse(sx + L * 0.03, wl, L * 0.04, 1.8, 0, 0, 6.2832); ctx.fill();
    ctx.fillStyle = rgba('230,236,242', fo * 0.6);
    ctx.beginPath(); ctx.ellipse(sx + L * 0.09, wl + 1.5, L * 0.05, 1.2, 0, 0, 6.2832); ctx.fill();
    ctx.save();
    ctx.translate(sx, wl); ctx.rotate(Math.sin(t * 0.0009) * 0.004);
    /* корпус: бак із ширстреком, прямий борт, транцева корма */
    ctx.fillStyle = '#0b0e12';
    ctx.beginPath();
    ctx.moveTo(L * 0.035, 0);
    ctx.quadraticCurveTo(-L * 0.006, -hh * 0.18, L * 0.012, -hh * 0.55);
    ctx.lineTo(-L * 0.014, -hh * 1.35);
    ctx.lineTo(L * 0.09, -hh * 1.35); ctx.lineTo(L * 0.11, -hh * 1.06);
    ctx.lineTo(L * 0.84, -hh * 1.06); ctx.lineTo(L * 0.86, -hh * 1.14);
    ctx.lineTo(L, -hh * 1.14); ctx.lineTo(L * 0.998, -hh * 0.4); ctx.lineTo(L * 0.965, 0);
    ctx.fill();
    var hullA = 0.18 + lit * 0.8;
    ctx.globalAlpha = hullA; ctx.fillStyle = '#22364b';
    ctx.beginPath(); ctx.moveTo(L * 0.02, -hh * 0.3); ctx.lineTo(-L * 0.01, -hh * 1.33); ctx.lineTo(L * 0.09, -hh * 1.33); ctx.lineTo(L * 0.11, -hh * 1.04);
    ctx.lineTo(L * 0.84, -hh * 1.04); ctx.lineTo(L * 0.86, -hh * 1.12); ctx.lineTo(L * 0.997, -hh * 1.12); ctx.lineTo(L * 0.995, -hh * 0.3); ctx.fill();
    ctx.fillStyle = '#7a2a22';
    ctx.beginPath(); ctx.moveTo(L * 0.03, -hh * 0.04); ctx.lineTo(L * 0.968, -hh * 0.04); ctx.lineTo(L * 0.99, -hh * 0.3); ctx.lineTo(L * 0.018, -hh * 0.3); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = rgba('200,210,220', 0.08 + lit * 0.25); ctx.lineWidth = 0.6;
    for (i = 1; i < 22; i++) { x = L * (0.04 + i * 0.043); ctx.beginPath(); ctx.moveTo(x, -hh * 1.04); ctx.lineTo(x, -hh * 0.32); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(L * 0.11, -hh * 0.72); ctx.lineTo(L * 0.99, -hh * 0.72); ctx.stroke();
    /* марки осадки, якір, клюз */
    ctx.fillStyle = rgba('235,238,240', 0.3 + lit * 0.6);
    for (i = 0; i < 4; i++) ctx.fillRect(L * 0.028 + i * 0.4, -hh * (0.36 + i * 0.13), 2.2, 0.8);
    for (i = 0; i < 4; i++) ctx.fillRect(L * 0.975, -hh * (0.36 + i * 0.13), 2.2, 0.8);
    ctx.fillStyle = '#05070a';
    ctx.beginPath(); ctx.arc(L * 0.045, -hh * 1.12, hh * 0.09, 0, 6.2832); ctx.fill();
    ctx.fillRect(L * 0.043, -hh * 1.05, 1.4, hh * 0.38);
    ctx.fillRect(L * 0.035, -hh * 0.7, L * 0.018, 1.4);
    /* леєр на баку, щоглa, кран-балка */
    ctx.strokeStyle = rgba('170,180,190', 0.35 + lit * 0.4); ctx.lineWidth = 0.6;
    ctx.beginPath(); ctx.moveTo(-L * 0.01, -hh * 1.6); ctx.lineTo(L * 0.09, -hh * 1.6); ctx.stroke();
    for (i = 0; i < 5; i++) { x = -L * 0.008 + i * L * 0.024; ctx.beginPath(); ctx.moveTo(x, -hh * 1.35); ctx.lineTo(x, -hh * 1.6); ctx.stroke(); }
    ctx.fillStyle = '#0b0e12';
    ctx.fillRect(L * 0.05, -hh * 2.9, 1.6, hh * 1.55);
    ctx.fillRect(L * 0.035, -hh * 2.4, L * 0.032, 1.2);
    /* люкові кришки і штабелі по бухтах; між бухтами — найтовні містки */
    var cw = L * 0.03, ch = hh * 0.5, x0 = L * 0.12, x1 = L * 0.765, col = 0;
    ctx.fillStyle = rgba('60,70,80', 0.5 + lit * 0.4); ctx.fillRect(x0 - 2, -hh * 1.06 - 2, x1 - x0 + 4, 2);
    for (var cx = x0; cx + cw < x1; cx += cw) {
      if (col % 2 === 0 && col > 0) {
        ctx.fillStyle = rgba('110,120,130', 0.35 + lit * 0.4);
        ctx.fillRect(cx - 0.2, -hh * 1.06 - ch * 2.2, 1, ch * 2.2);
        cx += cw * 0.22;
      }
      col++;
      var k = (cx - x0) / (x1 - x0), rows = Math.round(2 + Math.min(1, k * 2.5) * 2.2 + rnd(Math.round(cx)) * 1.3);
      for (j = 0; j < rows; j++) {
        var cy = -hh * 1.06 - 2 - (j + 1) * ch, c = BOXES[Math.floor(rnd(Math.round(cx * 7) + j * 31) * BOXES.length)];
        ctx.fillStyle = '#12161b'; ctx.fillRect(cx, cy, cw - 0.8, ch - 0.8);
        ctx.globalAlpha = Math.min(1, 0.24 + lit * (0.7 + 0.3 * k));
        ctx.fillStyle = c; ctx.fillRect(cx, cy, cw - 0.8, ch - 0.8);
        ctx.fillStyle = 'rgba(0,0,0,.3)';
        for (var r = 1; r < 6; r++) ctx.fillRect(cx + (cw - 0.8) * r / 6, cy + 0.6, 0.45, ch - 2);
        ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.fillRect(cx, cy, cw - 0.8, 0.7);
        ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(cx, cy + ch - 1.4, cw - 0.8, 0.6);
        if (lit > 0.05) {
          /* під променем: кутові фітинги, замки дверей, логотипи ліній */
          ctx.globalAlpha = lit;
          ctx.fillStyle = 'rgba(0,0,0,.5)';
          ctx.fillRect(cx, cy, 1.2, 1.2); ctx.fillRect(cx + cw - 2, cy, 1.2, 1.2);
          ctx.fillRect(cx, cy + ch - 2, 1.2, 1.2); ctx.fillRect(cx + cw - 2, cy + ch - 2, 1.2, 1.2);
          var rr = rnd(Math.round(cx * 3) + j * 17);
          if (rr > 0.55) { ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(cx + cw * 0.18, cy + ch * 0.38, cw * (0.3 + rr * 0.25), ch * 0.16); }
          else if (rr < 0.2) { ctx.fillStyle = 'rgba(230,236,240,.45)'; ctx.fillRect(cx + cw * 0.72, cy + ch * 0.2, 0.6, ch * 0.6); ctx.fillRect(cx + cw * 0.82, cy + ch * 0.2, 0.6, ch * 0.6); }
        }
        ctx.globalAlpha = 1;
      }
    }
    /* надбудова на 6 палуб, ходовий місток із крилами, радарна щогла */
    var bx = L * 0.775, bw = L * 0.078, bh = hh * 3.9, top = -hh * 1.14 - bh;
    ctx.fillStyle = '#0b0e12';
    ctx.fillRect(bx, top, bw, bh);
    ctx.fillRect(bx - bw * 0.32, top + bh * 0.05, bw * 1.64, hh * 0.2);
    ctx.globalAlpha = 0.16 + lit * 0.8; ctx.fillStyle = '#e4e8eb';
    ctx.fillRect(bx, top, bw, bh); ctx.fillRect(bx - bw * 0.32, top + bh * 0.05, bw * 1.64, hh * 0.2);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(0,0,0,.35)';
    for (i = 1; i < 6; i++) ctx.fillRect(bx, top + bh * (0.17 + i * 0.14), bw, 0.7);
    ctx.fillStyle = '#0d1418'; ctx.fillRect(bx + bw * 0.04, top + bh * 0.1, bw * 0.92, hh * 0.24);
    ctx.fillStyle = 'rgba(255,214,140,.95)';
    for (i = 0; i < 7; i++) ctx.fillRect(bx + bw * (0.06 + i * 0.13), top + bh * 0.105, bw * 0.1, hh * 0.2);
    for (j = 0; j < 5; j++) for (i = 0; i < 4; i++) {
      ctx.fillStyle = rnd(i * 5 + j * 11) > 0.4 ? 'rgba(255,214,140,.7)' : 'rgba(30,38,46,.9)';
      ctx.fillRect(bx + bw * (0.1 + i * 0.22), top + bh * (0.3 + j * 0.14), bw * 0.09, hh * 0.14);
    }
    ctx.fillStyle = '#0b0e12';
    ctx.fillRect(bx + bw * 0.42, top - hh * 1.4, 1.6, hh * 1.4);
    ctx.fillRect(bx + bw * 0.15, top - hh * 0.8, bw * 0.6, 1.2);
    var rad = Math.cos(t * 0.004);
    ctx.fillRect(bx + bw * 0.45 - bw * 0.32 * Math.abs(rad), top - hh * 1.05, bw * 0.64 * Math.abs(rad) + 1, 1.6);
    /* шлюпка вільного падіння на кормі */
    ctx.save(); ctx.translate(L * 0.962, -hh * 1.45); ctx.rotate(0.42);
    ctx.fillStyle = '#0b0e12'; ctx.fillRect(-hh * 0.62, hh * 0.17, hh * 1.24, 1.6);
    ctx.fillStyle = rgba('230,110,40', 0.35 + lit * 0.65);
    ctx.beginPath(); ctx.moveTo(-hh * 0.55, hh * 0.16); ctx.lineTo(hh * 0.42, hh * 0.16); ctx.quadraticCurveTo(hh * 0.62, 0, hh * 0.5, -hh * 0.1);
    ctx.lineTo(-hh * 0.3, -hh * 0.14); ctx.quadraticCurveTo(-hh * 0.6, -hh * 0.1, -hh * 0.55, hh * 0.16); ctx.fill();
    ctx.fillRect(-hh * 0.18, -hh * 0.3, hh * 0.3, hh * 0.18);
    ctx.fillStyle = rgba('20,24,30', 0.6); ctx.fillRect(-hh * 0.14, -hh * 0.26, hh * 0.22, hh * 0.06);
    ctx.restore();
    ctx.fillStyle = '#0b0e12'; ctx.fillRect(L * 0.935, -hh * 1.75, 1.2, hh * 0.63); ctx.fillRect(L * 0.99, -hh * 1.35, 1.2, hh * 0.23);
    /* труба з кольоровою смугою й кіптявою */
    var fx = bx + bw * 1.25, fw = L * 0.038, ft = top + bh * 0.18;
    ctx.fillStyle = '#0b0e12';
    ctx.beginPath(); ctx.moveTo(fx, -hh * 1.14); ctx.lineTo(fx + fw * 0.12, ft); ctx.lineTo(fx + fw * 1.08, ft - 2); ctx.lineTo(fx + fw, -hh * 1.14); ctx.fill();
    ctx.globalAlpha = 0.2 + lit * 0.75;
    ctx.fillStyle = '#2b4260'; ctx.fillRect(fx + fw * 0.14, ft + hh * 0.35, fw * 0.88, hh * 1.5);
    ctx.fillStyle = '#d9dde0'; ctx.fillRect(fx + fw * 0.14, ft + hh * 0.72, fw * 0.88, hh * 0.5);
    ctx.fillStyle = '#e0b43a'; ctx.beginPath(); ctx.arc(fx + fw * 0.58, ft + hh * 0.97, hh * 0.15, 0, 6.2832); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#05070a'; ctx.fillRect(fx + fw * 0.12, ft - 1, fw * 0.96, hh * 0.35);
    /* дим із труби, зноситься назад */
    if (!still) for (i = 0; i < 9; i++) {
      var age = (t * 0.00035 + i / 9) % 1, px = fx + fw * 0.6 + age * L * 0.22, py = ft - 2 - age * hh * 3.2 - Math.sin(age * 6 + i) * 2;
      ctx.fillStyle = rgba('120,126,134', 0.22 * (1 - age));
      ctx.beginPath(); ctx.arc(px, py, 2 + age * hh * 0.9, 0, 6.2832); ctx.fill();
    }
    /* ходові вогні */
    var bl = 0.55 + 0.45 * Math.sin(t * 0.004);
    ctx.fillStyle = rgba('255,255,240', bl);
    ctx.fillRect(bx + bw * 0.42 - 0.6, top - hh * 1.48, 2.6, 2.6);
    ctx.fillRect(L * 0.05 - 0.5, -hh * 3.0, 2.6, 2.6);
    ctx.fillStyle = '#e04a3a'; ctx.fillRect(bx - bw * 0.32, top + bh * 0.03, 2.6, 2.6);
    ctx.fillStyle = 'rgba(255,240,210,.6)'; ctx.fillRect(L * 0.995, -hh * 0.95, 2, 2);
    ctx.fillStyle = 'rgba(255,214,140,.5)';
    for (i = 0; i < 6; i++) ctx.fillRect(L * (0.15 + i * 0.12), -hh * 1.1, 1.6, 1.6);
    if (lit > 0.05) {
      ctx.save(); ctx.globalAlpha = lit;
      /* назва на борту, порт приписки на кормі */
      ctx.fillStyle = 'rgba(240,242,244,.92)'; ctx.textBaseline = 'middle';
      ctx.font = '700 ' + (hh * 0.46).toFixed(1) + 'px Montserrat,Arial,sans-serif';
      ctx.textAlign = 'center'; ctx.fillText('A V E N O R   T R A D E', L * 0.46, -hh * 0.7);
      ctx.font = '700 ' + (hh * 0.22).toFixed(1) + 'px Montserrat,Arial,sans-serif';
      ctx.textAlign = 'left'; ctx.fillText('AVENOR', L * 0.06, -hh * 1.2);
      ctx.textAlign = 'right'; ctx.fillText('ODESA', L * 0.965, -hh * 0.92);
      /* іржаві патьоки з клюза і шпигатів */
      ctx.fillStyle = 'rgba(130,70,45,.5)';
      ctx.fillRect(L * 0.043, -hh * 1.0, 0.8, hh * 0.5);
      for (i = 0; i < 9; i++) ctx.fillRect(L * (0.16 + i * 0.075), -hh * 1.0, 0.6, hh * (0.12 + rnd(i + 70) * 0.2));
      /* леєри на палубах надбудови і люди на крилі містка */
      ctx.strokeStyle = 'rgba(235,238,240,.55)'; ctx.lineWidth = 0.5;
      for (j = 1; j < 6; j++) {
        var dy = top + bh * (0.17 + j * 0.14) - 0.5;
        ctx.beginPath(); ctx.moveTo(bx - 1.5, dy); ctx.lineTo(bx + bw + 1.5, dy); ctx.stroke();
      }
      ctx.fillStyle = '#0b0e12';
      var py = top + bh * 0.05;
      ctx.fillRect(bx - bw * 0.24, py - hh * 0.3, 1.4, hh * 0.3); ctx.beginPath(); ctx.arc(bx - bw * 0.24 + 0.7, py - hh * 0.36, 1, 0, 6.2832); ctx.fill();
      ctx.fillRect(bx - bw * 0.12, py - hh * 0.28, 1.4, hh * 0.28); ctx.beginPath(); ctx.arc(bx - bw * 0.12 + 0.7, py - hh * 0.34, 1, 0, 6.2832); ctx.fill();
      /* кнехти на баку */
      for (i = 0; i < 3; i++) ctx.fillRect(L * (0.02 + i * 0.025), -hh * 1.45, 1.6, hh * 0.1);
      ctx.restore();
      /* теплий відблиск променя ковзає вздовж борту */
      var hx = L * (0.5 - wrap(beamA - az(sx + L * 0.5, wl - hh * 2)) * 3);
      var sg = ctx.createRadialGradient(hx, -hh * 2, 0, hx, -hh * 2, L * 0.4);
      sg.addColorStop(0, rgba('255,228,180', 0.22 * lit)); sg.addColorStop(1, 'rgba(255,228,180,0)');
      ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = sg; ctx.fillRect(hx - L * 0.4, -hh * 2 - L * 0.4, L * 0.8, L * 0.4 + hh * 2.2);
      ctx.globalCompositeOperation = 'source-over';
    }
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

  function frame() {
    var now = performance.now();
    var t = still ? 4000 : now - t0, dt = Math.min(50, now - last); last = now;
    if (!still) {
      if (aim !== null && (aimUntil === 0 || now < aimUntil)) A += wrap(aim - A) * Math.min(1, dt * 0.006);
      else { aim = null; A += dt * 0.00034 * (1 - 0.8 * onShip); }
      A = wrap(A);
      flash *= 0.94;
    } else A = 0.12;
    sky(t);
    sea(t);
    trail(MX, H * 0.05, 0.16, t, '236,232,214');
    birds(t, still ? 0 : dt);
    var bk = bulker(t, A);
    if (!bk.off) trail(bk.bridge, bk.w * 0.05, 0.16, t, '255,214,140', bk.y);
    if (bk.lit > 0.05) trail(bk.x, bk.w * 0.5, bk.lit * 0.15, t, '255,226,170', bk.y);
    mole(t);
    tower(Math.max(0, -Math.sin(A)), t);
    trail(LX, H * 0.05, 0.3, t, '255,214,140', MB);
    var sh = ship(t, A); onShip = Math.max(sh.lit, bk.lit) || 0;
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
