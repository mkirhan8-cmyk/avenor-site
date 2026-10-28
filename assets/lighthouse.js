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
    TT = HZ - Math.min(H * 0.4, W * 0.38);
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

  /* Воронцовський маяк: білий циліндр на круглому двоярусному цоколі, розширення-консоль під
     круглою галереєю, циліндричний ліхтар із вертикальним переплетом, купол-півсфера з флюгаркою.
     Усе кругле малюємо з еліпсами, щоб читався об'єм. */
  function cyl(x, yTop, yBot, w, g) {
    var e = w * 0.12;
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(x - w / 2, yTop); ctx.lineTo(x - w / 2, yBot); ctx.ellipse(x, yBot, w / 2, e, 0, Math.PI, 0, true); ctx.lineTo(x + w / 2, yTop); ctx.fill();
  }
  function shade(x, w, dark, mid, hi) {
    var g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0);
    g.addColorStop(0, dark); g.addColorStop(0.3, mid); g.addColorStop(0.45, hi); g.addColorStop(0.75, mid); g.addColorStop(1, dark);
    return g;
  }
  function tower(glow, t) {
    var bw = Math.max(13, Math.min(H * 0.05, (HZ - TT) * 0.13)), tw = bw * 0.82, foot = MT - H * 0.004, pm = MT - bw * 0.42, base = MT - bw * 0.95, top = TT, i, y, w, k;
    /* цоколь: два кола один на одному */
    var p1 = bw * 1.85, p2 = bw * 1.35;
    cyl(LX, pm, foot, p1, shade(LX, p1, '#14191e', '#2e363e', '#4a535c'));
    ctx.fillStyle = '#3a434c'; ctx.beginPath(); ctx.ellipse(LX, pm, p1 / 2, p1 * 0.12, 0, 0, 6.2832); ctx.fill();
    cyl(LX, base, pm, p2, shade(LX, p2, '#3a4148', '#a9b1b8', '#d3d8dc'));
    ctx.strokeStyle = 'rgba(30,36,42,.35)'; ctx.lineWidth = 0.6;
    for (i = 1; i < 3; i++) { y = base + (pm - base) * i / 3; ctx.beginPath(); ctx.ellipse(LX, y, p2 / 2, p2 * 0.12, 0, 0, Math.PI); ctx.stroke(); }
    ctx.fillStyle = '#c9cfd4'; ctx.beginPath(); ctx.ellipse(LX, base, p2 / 2, p2 * 0.12, 0, 0, 6.2832); ctx.fill();
    /* двері з аркою */
    var dw = bw * 0.24, dh = (pm - base) * 0.75, dy = pm;
    ctx.fillStyle = '#1b2228';
    ctx.beginPath(); ctx.moveTo(LX - dw / 2, dy + p2 * 0.1); ctx.lineTo(LX - dw / 2, dy - dh + dw / 2); ctx.arc(LX, dy - dh + dw / 2, dw / 2, Math.PI, 0); ctx.lineTo(LX + dw / 2, dy + p2 * 0.1); ctx.fill();
    ctx.fillStyle = 'rgba(255,214,140,.85)'; ctx.fillRect(LX - 0.8, dy - dh * 0.55, 1.6, 1.6);
    /* ствол: м'яке звуження догори, циліндричне світлотіньове моделювання */
    var g = shade(LX, bw, '#4b525a', '#d5dade', '#f6f8f9');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(LX - bw / 2, base);
    ctx.bezierCurveTo(LX - bw / 2 + (bw - tw) * 0.15, base - (base - top) * 0.5, LX - tw / 2, top + (base - top) * 0.2, LX - tw / 2, top);
    ctx.lineTo(LX + tw / 2, top);
    ctx.bezierCurveTo(LX + tw / 2, top + (base - top) * 0.2, LX + bw / 2 - (bw - tw) * 0.15, base - (base - top) * 0.5, LX + bw / 2, base);
    ctx.ellipse(LX, base, bw / 2, bw * 0.1, 0, 0, Math.PI);
    ctx.fill();
    function wAt(y) { var q = (base - y) / (base - top); return bw - (bw - tw) * (1 - Math.pow(1 - q, 1.6)); }
    /* шви бетонних кілець — дугами, як на циліндрі */
    ctx.strokeStyle = 'rgba(70,80,90,.16)'; ctx.lineWidth = 0.7;
    for (i = 1; i < 14; i++) { y = base - (base - top) * i / 14; w = wAt(y); ctx.beginPath(); ctx.ellipse(LX, y, w / 2, w * 0.09, 0, 0.15, Math.PI - 0.15); ctx.stroke(); }
    /* місячний контровий світ і тінь під галереєю */
    ctx.strokeStyle = 'rgba(190,210,235,.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(LX + bw / 2 - 0.8, base); ctx.bezierCurveTo(LX + bw / 2 - 0.8 - (bw - tw) * 0.15, base - (base - top) * 0.5, LX + tw / 2 - 0.8, top + (base - top) * 0.2, LX + tw / 2 - 0.8, top); ctx.stroke();
    var ao = ctx.createLinearGradient(0, top, 0, top + H * 0.06);
    ao.addColorStop(0, 'rgba(10,14,20,.5)'); ao.addColorStop(1, 'rgba(10,14,20,0)');
    ctx.fillStyle = ao; ctx.fillRect(LX - bw / 2, top, bw, H * 0.06);
    var wg = ctx.createLinearGradient(0, top - H * 0.02, 0, top + H * 0.14);
    wg.addColorStop(0, rgba('255,214,150', 0.1 + 0.2 * glow)); wg.addColorStop(1, 'rgba(255,214,150,0)');
    ctx.fillStyle = wg; ctx.fillRect(LX - bw / 2, top, bw, H * 0.14);
    /* вузькі вікна сходової клітки з арочним верхом, по спіралі */
    for (i = 0; i < 6; i++) {
      y = base - (base - top) * (0.12 + i * 0.14); w = wAt(y); var ang = i * 1.1 - 2.2, ox = Math.sin(ang) * w * 0.32, ww = 2.4 * Math.max(0.35, Math.cos(ang)), wh = bw * 0.5;
      ctx.fillStyle = '#20272e'; ctx.beginPath(); ctx.moveTo(LX + ox - ww / 2 - 0.6, y + wh); ctx.lineTo(LX + ox - ww / 2 - 0.6, y + ww / 2); ctx.arc(LX + ox, y + ww / 2, ww / 2 + 0.6, Math.PI, 0); ctx.lineTo(LX + ox + ww / 2 + 0.6, y + wh); ctx.fill();
      ctx.fillStyle = rgba('255,214,140', 0.55 + 0.3 * (i % 2)); ctx.beginPath(); ctx.moveTo(LX + ox - ww / 2, y + wh - 0.6); ctx.lineTo(LX + ox - ww / 2, y + ww / 2 + 0.4); ctx.arc(LX + ox, y + ww / 2 + 0.4, ww / 2, Math.PI, 0); ctx.lineTo(LX + ox + ww / 2, y + wh - 0.6); ctx.fill();
    }
    /* консоль: плавне розширення до галереї */
    var gw = tw * 1.75, gy = top - bw * 0.2;
    ctx.fillStyle = shade(LX, gw, '#59616a', '#cfd5da', '#eef1f3');
    ctx.beginPath(); ctx.moveTo(LX - tw / 2, top + 4); ctx.quadraticCurveTo(LX - tw / 2, gy + 1, LX - gw / 2, gy); ctx.lineTo(LX + gw / 2, gy); ctx.quadraticCurveTo(LX + tw / 2, gy + 1, LX + tw / 2, top + 4); ctx.fill();
    /* кругла галерея: плита, обідок, перила з перспективою */
    ctx.fillStyle = '#20272e'; ctx.beginPath(); ctx.ellipse(LX, gy, gw / 2, gw * 0.13, 0, 0, 6.2832); ctx.fill();
    ctx.fillStyle = '#0f1419'; ctx.beginPath(); ctx.ellipse(LX, gy, gw / 2, gw * 0.13, 0, 0, Math.PI); ctx.lineTo(LX - gw / 2, gy - 2.2); ctx.ellipse(LX, gy - 2.2, gw / 2, gw * 0.13, 0, Math.PI, 0, true); ctx.fill();
    var rh = bw * 0.55, ry = gy - 2.2;
    ctx.strokeStyle = '#11161b'; ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.ellipse(LX, ry - rh, gw / 2 - 0.5, gw * 0.13, 0, 0, Math.PI); ctx.stroke();
    ctx.lineWidth = 0.6; ctx.beginPath(); ctx.ellipse(LX, ry - rh * 0.5, gw / 2 - 0.5, gw * 0.13, 0, 0, Math.PI); ctx.stroke();
    ctx.lineWidth = 0.9;
    for (i = 0; i < 16; i++) {
      k = (i + 0.5) / 16 * Math.PI * 2; var cx = LX + Math.cos(k) * (gw / 2 - 0.5), cy = Math.sin(k) * gw * 0.13;
      if (Math.sin(k) < 0) continue;
      ctx.beginPath(); ctx.moveTo(cx, ry + cy); ctx.lineTo(cx, ry - rh + cy); ctx.stroke();
    }
    /* ліхтар: циліндр зі склом і вертикальним переплетом */
    var lw = tw * 1.08, lh = bw * 1.35, lb = ry - 1, gl = lb - lh;
    cyl(LX, lb - lh * 0.16, lb + 1, lw * 1.08, shade(LX, lw * 1.08, '#0c1014', '#2a323a', '#3b444d'));
    var gh = lh * 0.84;
    ctx.save(); ctx.beginPath(); ctx.rect(LX - lw / 2, gl, lw, gh); ctx.clip();
    ctx.fillStyle = rgba('255,222,150', 0.55 + 0.4 * glow); ctx.fillRect(LX - lw / 2, gl, lw, gh);
    var lg = ctx.createRadialGradient(LX, gl + gh / 2, 0, LX, gl + gh / 2, lw * 0.6);
    lg.addColorStop(0, 'rgba(255,255,245,1)'); lg.addColorStop(0.5, rgba('255,240,200', 0.7 + 0.3 * glow)); lg.addColorStop(1, 'rgba(255,220,150,0)');
    ctx.fillStyle = lg; ctx.fillRect(LX - lw / 2, gl, lw, gh);
    /* кільця лінзи Френеля та обертова панель */
    ctx.fillStyle = 'rgba(160,120,60,.35)';
    for (i = 1; i < 7; i++) ctx.fillRect(LX - lw * 0.26, gl + gh * i / 7, lw * 0.52, 0.6);
    var pc = Math.cos(A), px = LX + pc * lw * 0.32, pa = Math.max(0, -Math.sin(A));
    var pgr = ctx.createLinearGradient(px - lw * 0.2, 0, px + lw * 0.2, 0);
    pgr.addColorStop(0, 'rgba(255,255,255,0)'); pgr.addColorStop(0.5, rgba('255,255,250', 0.35 + 0.65 * pa)); pgr.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = pgr; ctx.fillRect(LX - lw / 2, gl, lw, gh);
    /* переплет: вертикальні стійки, розставлені по колу, і косі тяги */
    ctx.strokeStyle = '#11161b';
    for (i = 0; i < 10; i++) {
      k = (i + 0.5) / 10 * Math.PI; var mx = LX - Math.cos(k) * lw / 2;
      ctx.lineWidth = 0.6 + Math.sin(k) * 0.8;
      ctx.beginPath(); ctx.moveTo(mx, gl); ctx.lineTo(mx, gl + gh); ctx.stroke();
    }
    ctx.lineWidth = 0.6;
    ctx.beginPath(); ctx.ellipse(LX, gl + gh * 0.5, lw / 2, lw * 0.1, 0, 0, Math.PI); ctx.stroke();
    ctx.restore();
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(LX - lw * 0.36, gl + 1, 0.8, gh - 2);
    /* купол-півсфера з вентиляційною кулею та громовідводом */
    var dr = lw * 0.62, dy0 = gl;
    ctx.fillStyle = '#0d1115'; ctx.beginPath(); ctx.ellipse(LX, dy0, dr, dr * 0.16, 0, 0, 6.2832); ctx.fill();
    var dg = ctx.createRadialGradient(LX - dr * 0.35, dy0 - dr * 0.55, 0, LX, dy0 - dr * 0.2, dr * 1.1);
    dg.addColorStop(0, '#5a646e'); dg.addColorStop(0.45, '#1c232a'); dg.addColorStop(1, '#080b0e');
    ctx.fillStyle = dg; ctx.beginPath(); ctx.ellipse(LX, dy0, dr * 0.92, dr * 0.85, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = rgba('255,214,150', 0.15 + 0.25 * glow); ctx.beginPath(); ctx.ellipse(LX, dy0, dr * 0.92, dr * 0.12, 0, Math.PI, 0); ctx.fill();
    var vb = dy0 - dr * 0.85;
    var vg = ctx.createRadialGradient(LX - 1, vb - 3, 0, LX, vb - 2.4, 3.2);
    vg.addColorStop(0, '#6a747e'); vg.addColorStop(1, '#0b0f13');
    ctx.fillStyle = vg; ctx.beginPath(); ctx.arc(LX, vb - 2.4, 2.8, 0, 6.2832); ctx.fill();
    ctx.fillStyle = '#0b0f13';
    ctx.fillRect(LX - 0.5, vb - 2.4 - bw * 0.9, 1, bw * 0.9);
    ctx.fillRect(LX - 3, vb - 2.4 - bw * 0.65, 6, 0.8);
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

  /* обрис корпусу: бульб, похилий розвалистий форштевень, бак із сідловатістю, палуба, ют, кругла корма.
     fc, dk, pp — висоти баку, палуби та юту в частках hh; ppx — де починається ют */
  function hullPath(L, hh, fc, dk, pp, ppx) {
    ctx.beginPath();
    ctx.moveTo(L * 0.08, hh * 0.06);
    ctx.bezierCurveTo(L * 0.03, hh * 0.1, -L * 0.006, hh * 0.02, -L * 0.002, -hh * 0.2);
    ctx.bezierCurveTo(L * 0.001, -hh * 0.4, L * 0.014, -hh * 0.46, L * 0.02, -hh * 0.52);
    ctx.bezierCurveTo(L * 0.012, -hh * 0.8, -L * 0.006, -hh * fc * 0.85, -L * 0.02, -hh * fc);
    ctx.quadraticCurveTo(L * 0.05, -hh * (fc - 0.05), L * 0.098, -hh * (fc - 0.07));
    ctx.quadraticCurveTo(L * 0.112, -hh * (fc - 0.08), L * 0.116, -hh * dk);
    ctx.quadraticCurveTo(L * 0.5, -hh * (dk - 0.06), L * ppx, -hh * dk);
    ctx.quadraticCurveTo(L * ppx + L * 0.008, -hh * dk, L * ppx + L * 0.012, -hh * pp);
    ctx.lineTo(L * 0.97, -hh * (pp + 0.03));
    ctx.bezierCurveTo(L * 1.008, -hh * (pp + 0.02), L * 1.012, -hh * 0.8, L * 0.988, -hh * 0.45);
    ctx.bezierCurveTo(L * 0.975, -hh * 0.2, L * 0.955, -hh * 0.02, L * 0.92, hh * 0.06);
    ctx.closePath();
  }
  /* фарбує корпус: темна основа, борт кольором, червона ватерлінія, тінь донизу, шви листів */
  function paintHull(L, hh, fc, dk, pp, ppx, side, lit) {
    ctx.fillStyle = '#0a0d10'; hullPath(L, hh, fc, dk, pp, ppx); ctx.fill();
    ctx.save(); hullPath(L, hh, fc, dk, pp, ppx); ctx.clip();
    ctx.globalAlpha = 0.16 + lit * 0.78; ctx.fillStyle = side; ctx.fillRect(-L * 0.05, -hh * 2, L * 1.1, hh * 2.2);
    ctx.fillStyle = '#7a2a22'; ctx.fillRect(-L * 0.05, -hh * 0.3, L * 1.1, hh * 0.5);
    ctx.globalAlpha = 1;
    var sg = ctx.createLinearGradient(0, -hh * fc, 0, hh * 0.1);
    sg.addColorStop(0, 'rgba(255,255,255,.1)'); sg.addColorStop(0.12, 'rgba(255,255,255,0)'); sg.addColorStop(0.7, 'rgba(0,0,0,.12)'); sg.addColorStop(1, 'rgba(0,0,0,.45)');
    ctx.fillStyle = sg; ctx.fillRect(-L * 0.05, -hh * 2, L * 1.1, hh * 2.2);
    var bg = ctx.createLinearGradient(-L * 0.02, 0, L * 0.12, 0);
    bg.addColorStop(0, 'rgba(0,0,0,.35)'); bg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bg; ctx.fillRect(-L * 0.05, -hh * 2, L * 0.2, hh * 2.2);
    ctx.strokeStyle = rgba('200,210,220', 0.06 + lit * 0.2); ctx.lineWidth = 0.6;
    for (var i = 1; i < 22; i++) { var x = L * (0.03 + i * 0.044); ctx.beginPath(); ctx.moveTo(x, -hh * 1.6); ctx.lineTo(x, -hh * 0.32); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(0, -hh * 0.72); ctx.quadraticCurveTo(L * 0.5, -hh * 0.7, L, -hh * 0.72); ctx.stroke();
    ctx.restore();
    /* світла кромка палуби вздовж сідловатості */
    ctx.strokeStyle = rgba('225,230,235', 0.18 + lit * 0.45); ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(L * 0.116, -hh * dk); ctx.quadraticCurveTo(L * 0.5, -hh * (dk - 0.06), L * ppx, -hh * dk); ctx.stroke();
  }
  /* надбудова: яруси з відступом, похилий фронт ходового містка, крила; фарба по кліпу */
  function house(bx, bw, base, bh, n, col, lit, seed) {
    var st = bw * 0.035, th = bh / n, k, top = base - bh;
    function path() {
      ctx.beginPath(); ctx.moveTo(bx, base);
      for (k = 0; k < n - 1; k++) { ctx.lineTo(bx + st * k, base - th * (k + 1)); ctx.lineTo(bx + st * (k + 1), base - th * (k + 1)); }
      ctx.lineTo(bx + st * (n - 1) - bw * 0.07, top);
      ctx.lineTo(bx + bw + bw * 0.03, top); ctx.lineTo(bx + bw, top + th * 0.4); ctx.lineTo(bx + bw, base); ctx.closePath();
    }
    ctx.fillStyle = '#0a0d10'; path(); ctx.fill();
    var wy = base - th * (n - 1);
    ctx.fillRect(bx - bw * 0.36, wy - 1, bw * 1.72, th * 0.22);
    ctx.save(); path(); ctx.clip();
    ctx.globalAlpha = 0.16 + lit * 0.8; ctx.fillStyle = col; ctx.fillRect(bx - bw, top - 2, bw * 3, bh + 4); ctx.globalAlpha = 1;
    var hg = ctx.createLinearGradient(bx, 0, bx + bw, 0);
    hg.addColorStop(0, 'rgba(255,255,255,.08)'); hg.addColorStop(1, 'rgba(0,0,0,.28)');
    ctx.fillStyle = hg; ctx.fillRect(bx - bw * 0.2, top, bw * 1.4, bh);
    ctx.fillStyle = 'rgba(0,0,0,.35)';
    for (k = 1; k < n; k++) ctx.fillRect(bx - bw * 0.2, base - th * k - 0.4, bw * 1.4, 0.7);
    /* похиле скло містка */
    ctx.fillStyle = '#0d1418';
    ctx.beginPath(); ctx.moveTo(bx + st * (n - 1) - bw * 0.06, top + th * 0.18); ctx.lineTo(bx + bw, top + th * 0.18); ctx.lineTo(bx + bw, top + th * 0.62); ctx.lineTo(bx + st * (n - 1) - bw * 0.02, top + th * 0.62); ctx.fill();
    ctx.fillStyle = 'rgba(255,214,140,.9)';
    for (k = 0; k < 8; k++) { var xx = bx + st * (n - 1) + bw * (0.02 + k * 0.12); ctx.fillRect(xx, top + th * 0.24, bw * 0.085, th * 0.32); }
    /* каюти: ілюмінатори по ярусах */
    for (var j = 1; j < n; j++) for (k = 0; k < 4; k++) {
      ctx.fillStyle = rnd(k * 5 + j * 11 + seed) > 0.42 ? 'rgba(255,214,140,.72)' : 'rgba(30,38,46,.9)';
      ctx.fillRect(bx + st * (n - 1 - j) + bw * (0.12 + k * 0.21), base - th * (n - j) + th * 0.3, bw * 0.09, th * 0.36);
    }
    ctx.restore();
    ctx.globalAlpha = 0.16 + lit * 0.8; ctx.fillStyle = col; ctx.fillRect(bx - bw * 0.36, wy - 1, bw * 1.72, th * 0.22); ctx.globalAlpha = 1;
    return top;
  }
  /* труба: обтічна, з нахилом назад, кольорова смуга і кіптява по кліпу */
  function funnel(fx, fw, deck, ft, lit, band, mark) {
    function path() {
      ctx.beginPath(); ctx.moveTo(fx, deck);
      ctx.bezierCurveTo(fx + fw * 0.02, deck - (deck - ft) * 0.5, fx + fw * 0.08, ft + (deck - ft) * 0.15, fx + fw * 0.2, ft);
      ctx.lineTo(fx + fw * 1.2, ft - fw * 0.12);
      ctx.bezierCurveTo(fx + fw * 1.22, ft + (deck - ft) * 0.3, fx + fw * 1.1, deck - (deck - ft) * 0.2, fx + fw * 1.06, deck);
      ctx.closePath();
    }
    ctx.fillStyle = '#0b0e12'; path(); ctx.fill();
    ctx.save(); path(); ctx.clip();
    ctx.globalAlpha = 0.2 + lit * 0.75;
    ctx.fillStyle = band; ctx.fillRect(fx - 2, ft + (deck - ft) * 0.14, fw * 1.4, (deck - ft) * 0.5);
    ctx.fillStyle = '#d9dde0'; ctx.fillRect(fx - 2, ft + (deck - ft) * 0.26, fw * 1.4, (deck - ft) * 0.16);
    if (mark) { ctx.fillStyle = mark; ctx.beginPath(); ctx.arc(fx + fw * 0.62, ft + (deck - ft) * 0.34, fw * 0.2, 0, 6.2832); ctx.fill(); }
    ctx.globalAlpha = 1;
    var fg = ctx.createLinearGradient(fx, 0, fx + fw * 1.2, 0);
    fg.addColorStop(0, 'rgba(255,255,255,.1)'); fg.addColorStop(0.5, 'rgba(0,0,0,0)'); fg.addColorStop(1, 'rgba(0,0,0,.4)');
    ctx.fillStyle = fg; ctx.fillRect(fx - 2, ft - fw, fw * 1.6, deck - ft + fw);
    ctx.fillStyle = '#05070a'; ctx.fillRect(fx - 2, ft - fw * 0.3, fw * 1.6, (deck - ft) * 0.1 + fw * 0.3);
    ctx.restore();
    ctx.fillStyle = '#05070a'; ctx.fillRect(fx + fw * 0.4, ft - fw * 0.22, 1.4, fw * 0.25); ctx.fillRect(fx + fw * 0.8, ft - fw * 0.26, 1.4, fw * 0.25);
  }

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
    paintHull(L, hh, 1.5, 1.15, 1.22, 0.83, '#23272d', lit);
    /* трюми з кришками і комінгсами */
    var hx0 = L * 0.14, hw = L * 0.105, gap = L * 0.03;
    for (i = 0; i < 5; i++) {
      x = hx0 + i * (hw + gap);
      /* кришка трюму з опуклим верхом */
      ctx.beginPath(); ctx.moveTo(x, -hh * 1.15); ctx.lineTo(x, -hh * 1.5); ctx.quadraticCurveTo(x + hw * 0.5, -hh * 1.68, x + hw, -hh * 1.5); ctx.lineTo(x + hw, -hh * 1.15); ctx.closePath();
      ctx.fillStyle = '#0a0d10'; ctx.fill();
      ctx.globalAlpha = 0.18 + lit * 0.75; ctx.fillStyle = '#7c2f26'; ctx.fill();
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
    var bx = L * 0.845, bw = L * 0.1, bh = hh * 3.4;
    var top = house(bx, bw, -hh * 1.2, bh, 5, '#e8ebed', lit, 3);
    ctx.fillStyle = '#0a0d10'; ctx.fillRect(bx + bw * 0.5, top - hh * 1.2, 1.3, hh * 1.2); ctx.fillRect(bx + bw * 0.25, top - hh * 0.75, bw * 0.55, 1);
    var fx = bx + bw * 1.06, fw = L * 0.034, ft = top + bh * 0.16;
    funnel(fx, fw, -hh * 1.2, ft, lit, '#2b4260', null);
    if (!still) for (i = 0; i < 7; i++) {
      var age = (t * 0.0003 + i / 7) % 1;
      ctx.fillStyle = rgba('120,126,134', 0.18 * (1 - age));
      ctx.beginPath(); ctx.arc(fx + fw * 0.6 + age * L * 0.2, ft - 2 - age * hh * 3 - Math.sin(age * 6 + i) * 2, 1.6 + age * hh * 0.8, 0, 6.2832); ctx.fill();
    }
    if (lit > 0.05) {
      ctx.save(); ctx.globalAlpha = lit;
      ctx.fillStyle = 'rgba(240,242,244,.9)'; ctx.textBaseline = 'middle';
      ctx.font = '700 ' + (hh * 0.26).toFixed(1) + 'px Montserrat,Arial,sans-serif';
      ctx.textAlign = 'left'; ctx.fillText('AVENOR', L * 0.026, -hh * 1.22);
      ctx.textAlign = 'center'; ctx.fillText('AVENOR', L * 0.93, -hh * 1.0); ctx.fillText('ODESA', L * 0.93, -hh * 0.76);
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
    /* корпус: бульб, розвалистий форштевень, бак, сідловата палуба, ют, крейсерська корма */
    paintHull(L, hh, 1.38, 1.06, 1.14, 0.84, '#22364b', lit);
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
    /* надбудова на 6 палуб із відступами, похилий місток із крилами, радарна щогла */
    var bx = L * 0.775, bw = L * 0.078, bh = hh * 3.9;
    var top = house(bx, bw, -hh * 1.14, bh, 6, '#e4e8eb', lit, 0);
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
    var fx = bx + bw * 1.22, fw = L * 0.036, ft = top + bh * 0.16;
    funnel(fx, fw, -hh * 1.14, ft, lit, '#2b4260', '#e0b43a');
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
      ctx.textAlign = 'left'; ctx.fillText('AVENOR', L * 0.028, -hh * 1.12);
      ctx.textAlign = 'center'; ctx.fillText('AVENOR', L * 0.93, -hh * 0.98); ctx.fillText('ODESA', L * 0.93, -hh * 0.74);
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
