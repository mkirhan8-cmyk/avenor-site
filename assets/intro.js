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
  function heroIn() {
    if (h1) { h1.style.visibility = ''; scramble(h1, h1.dataset.t, 55); }
    if (pill) { var b = pill.lastChild; if (b && b.nodeType === 3) { var sp = document.createElement('span'); pill.replaceChild(sp, b); scramble(sp, b.textContent.trim()); } }
  }
  if (h1) { h1.dataset.t = h1.textContent; h1.setAttribute('aria-label', h1.dataset.t); h1.style.visibility = 'hidden'; }

  /* вступ: раз за сесію, на головній */
  var seen = false;
  try { seen = sessionStorage.getItem('av-intro'); sessionStorage.setItem('av-intro', 1); } catch (e) { seen = true; }
  if (seen || !h1 || scrollY > 40) { heroIn(); return; }
  var T = {
    uk: ['Українське походження. Відкриті маршрути. Ваш порт.', 'Оберіть мову'],
    en: ['Ukrainian origin. Open routes. Your port.', 'Choose language'],
    tr: ['Ukrayna menşei. Açık rotalar. Limanınız.', 'Dil seçin']
  }[L] || ['Ukrainian origin. Open routes. Your port.', 'Choose language'];
  var cur = { uk: '/', en: '/en/', tr: '/tr/' };
  var ov = document.createElement('div');
  ov.className = 'intro'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'AVENOR TRADE');
  ov.innerHTML = '<div class="in-box"><p class="in-k"></p><p class="in-b"></p><p class="in-s"></p><p class="in-q"></p>' +
    '<nav class="in-l"><a href="/" data-l="uk">Українська</a><a href="/en/" data-l="en">English</a><a href="/tr/" data-l="tr">Türkçe</a></nav>' +
    '<button class="in-x" type="button">' + (L === 'uk' ? 'Пропустити' : L === 'tr' ? 'Geç' : 'Skip') + ' →</button></div>';
  document.body.appendChild(ov);
  document.documentElement.classList.add('intro-on');
  var done = false, auto;
  function close() {
    if (done) return; done = true; clearTimeout(auto);
    ov.classList.add('out'); document.documentElement.classList.remove('intro-on');
    setTimeout(function () { ov.remove(); }, 900);
    setTimeout(heroIn, 350);
  }
  [].forEach.call(ov.querySelectorAll('.in-l a'), function (a) {
    if (a.dataset.l === L) a.setAttribute('aria-current', 'true');
    a.addEventListener('click', function (e) { if (a.dataset.l === L || cur[L] === a.getAttribute('href')) { e.preventDefault(); close(); } });
  });
  ov.querySelector('.in-x').addEventListener('click', close);
  addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Enter') close(); });
  addEventListener('wheel', close, { once: true, passive: true });
  var q = function (s) { return ov.querySelector(s); };
  scramble(q('.in-k'), 'AVENOR', 60)
    .then(function () { return scramble(q('.in-b'), 'TRADE · ODESA', 45); })
    .then(function () { return scramble(q('.in-s'), T[0], 32); })
    .then(function () { ov.classList.add('ask'); return scramble(q('.in-q'), T[1], 40); })
    .then(function () { auto = setTimeout(close, 3200); });
})();
