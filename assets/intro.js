/* 28.10: вступний екран і «розшифровка» заголовків (ідея: pasha-iden.github.io, MIT) */
(function () {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  var G = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+-<>/', rnd = function (n) { return Math.floor(Math.random() * n); };
  /* текст з'являється по літерах: кожна спершу мерехтить випадковими знаками */
  function scramble(el, text, step) {
    step = step || 70;
    var st = [], wrap = null;
    el.textContent = '';
    Array.from(text).forEach(function (c, i) {
      if (c === ' ') { wrap = null; el.appendChild(document.createTextNode(' ')); return; }
      if (!wrap) { wrap = document.createElement('span'); wrap.className = 'sw'; el.appendChild(wrap); }
      var s = document.createElement('span'); s.textContent = c; s.style.opacity = 0; wrap.appendChild(s);
      st.push({ c: c, s: s, d: Math.floor(i * 22 / step) + rnd(4), n: 3 + rnd(5) });
    });
    var end = Math.max.apply(null, st.map(function (x) { return x.d + x.n; }).concat(0)), p = 0;
    return new Promise(function (ok) {
      var t = setInterval(function () {
        st.forEach(function (x) {
          if (p < x.d) return;
          x.s.style.opacity = 1;
          x.s.textContent = p < x.d + x.n ? G[rnd(G.length)] : x.c;
        });
        if (p++ > end) { clearInterval(t); el.textContent = text; el.dataset.gt = text; ok(); }
      }, step);
    });
  }
  /* зрідка одна літера коротко «збоїть» */
  function glitch(el) {
    var o = el.dataset.gt, a = Array.from(o), idx = [];
    a.forEach(function (c, i) { if (/\S/.test(c)) idx.push(i); });
    if (!idx.length || el.dataset.gl) return;
    var k = idx[rnd(idx.length)], n = 0;
    el.dataset.gl = 1;
    var t = setInterval(function () {
      if (n++ >= 3) { el.textContent = o; delete el.dataset.gl; clearInterval(t); return; }
      var b = a.slice(); b[k] = G[rnd(G.length)]; el.textContent = b.join('');
    }, 85);
  }
  setInterval(function () {
    if (document.hidden || Math.random() > .6) return;
    var c = [].filter.call(document.querySelectorAll('[data-gt]'), function (e) { var r = e.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; });
    if (c.length) glitch(c[rnd(c.length)]);
  }, 900);

  var L = document.documentElement.lang, pill = document.querySelector('.hero .pill'), h1 = document.querySelector('.hero h1');
  /* 29.10 (Мурат): на головній без «розшифровки» — ефект лише на екрані вибору мови */
  function heroIn() {}

  /* вибір мови запам'ятовуємо (localStorage av-lang): наступного разу одразу відкриваємо потрібну мову без вступу;
     перемикач UA/EN/TR у шапці та посилання вступу перезаписують вибір */
  var cur = { uk: '/', en: '/en/', tr: '/tr/' }, saved = null;
  try { saved = localStorage.getItem('av-lang'); } catch (e) {}
  function remember(l) { try { localStorage.setItem('av-lang', l); } catch (e) {} }
  [].forEach.call(document.querySelectorAll('nav.lang a[hreflang]'), function (a) { a.addEventListener('click', function () { remember(a.getAttribute('hreflang')); }); });
  var home = location.pathname === cur[L];
  if (saved && cur[saved] && home && saved !== L && !/[?#]/.test(location.href)) {
    location.replace(cur[saved]); return;
  }
  if (saved || !h1 || !home || scrollY > 40) return;
  var T = {
    uk: ['Українське походження. Відкриті маршрути. Ваш порт.', 'Оберіть мову', 'Одеса → дунайські порти → Туреччина · ЄС · MENA'],
    en: ['Ukrainian origin. Open routes. Your port.', 'Choose language', 'Odesa → Danube ports → Türkiye · EU · MENA'],
    tr: ['Ukrayna menşei. Açık rotalar. Limanınız.', 'Dil seçin', 'Odesa → Tuna limanları → Türkiye · AB · MENA']
  }[L] || ['Ukrainian origin. Open routes. Your port.', 'Choose language', 'Odesa → Danube ports → Türkiye · EU · MENA'];
  var ov = document.createElement('div');
  ov.className = 'intro'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'AVENOR TRADE');
  /* 29.10 (Мурат): фон вступу — відео маяка з офісу (_src/video, Gemini, петля 6 с), постер — перший кадр; без анімації лишається постер */
  var tall = innerHeight > innerWidth, vf = '/assets/video/mayak-' + (tall ? '9x16' : '16x9');
  ov.innerHTML = '<div class="in-bg in-v" aria-hidden="true"><video muted loop playsinline autoplay preload="auto" poster="' + vf + '.webp"><source src="' + vf + '.mp4" type="video/mp4"></video></div>' +
    '<div class="in-box"><p class="in-k"></p><p class="in-b"></p><p class="in-s"></p><p class="in-r"></p><p class="in-q"></p>' +
    '<nav class="in-l"><a href="/" data-l="uk">Українська</a><a href="/en/" data-l="en">English</a><a href="/tr/" data-l="tr">Türkçe</a></nav>' +
    '<button class="in-x" type="button">' + (L === 'uk' ? 'Пропустити' : L === 'tr' ? 'Geç' : 'Skip') + ' →</button></div>';
  document.body.appendChild(ov);
  document.documentElement.classList.add('intro-on');
  var done = false;
  function close() {
    if (done) return; done = true;
    ov.classList.add('out'); document.documentElement.classList.remove('intro-on');
    setTimeout(function () { ov.remove(); }, 900);
    setTimeout(heroIn, 350);
  }
  [].forEach.call(ov.querySelectorAll('.in-l a'), function (a) {
    if (a.dataset.l === L) a.setAttribute('aria-current', 'true');
    a.addEventListener('click', function (e) { remember(a.dataset.l); if (a.dataset.l === L || cur[L] === a.getAttribute('href')) { e.preventDefault(); close(); } });
  });
  /* пропуск = вибір поточної мови; сам екран не зникає, чекає вибору (Мурат 29.10) */
  function skip() { remember(L); close(); }
  ov.querySelector('.in-x').addEventListener('click', skip);
  addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Enter') skip(); });
  var q = function (s) { return ov.querySelector(s); };
  scramble(q('.in-k'), 'AVENOR', 60)
    .then(function () { return scramble(q('.in-b'), 'TRADE · ODESA', 45); })
    .then(function () { return scramble(q('.in-s'), T[0], 32); })
    .then(function () { return scramble(q('.in-r'), T[2], 28); })
    .then(function () { ov.classList.add('ask'); return scramble(q('.in-q'), T[1], 40); });
})();
