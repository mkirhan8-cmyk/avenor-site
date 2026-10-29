/* 29.10: жива вода у гравюрі (WebGL). Смуга води (y 1200–1800 сцени) малюється наново з м'яким хвилюванням,
   що росте до глядача; світло маяка лягає на воду сектором за кутом ліхтаря (window.avLight з engrave.js),
   під ліхтарем — тремтливий відблиск лампи. Без WebGL або при reduced-motion лишається статична картинка. */
(function () {
  var sec = document.querySelector('.lh'), eg = sec && sec.querySelector('.eg');
  if (!eg || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  var img = eg.querySelector('img.scene'); if (!img) return;
  var cv = document.createElement('canvas'); cv.className = 'water';
  var gl = cv.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
  if (!gl) return;
  var VS = 'attribute vec2 p;varying vec2 u;void main(){u=vec2(p.x*0.5+0.5,0.5-p.y*0.5);gl_Position=vec4(p,0.,1.);}';
  var FS = [
    'precision mediump float;varying vec2 u;uniform sampler2D S,M;uniform float T,TH,FL,V0,X0,W;',
    'float dA(float a,float b){float d=mod(a-b+3.14159,6.28318);return d-3.14159;}',
    'void main(){float v=u.y;vec2 mu=vec2((X0+u.x*W)/3304.0,v);float m=texture2D(M,mu).r;',
    /* хвилі: дрібні біля горизонту, більші й повільніші ближче */
    'float k=1.0/(0.10+0.9*v);float w1=sin(u.x*52.0*k+T*0.8+v*9.0);float w2=sin(u.x*21.0*k-T*0.5+v*29.0);float w3=sin(v*9.0*k+T*1.1+u.x*13.0);',
    'float a=(0.0007+0.0055*v*v)*m;float dx=a*(0.55*w1+0.35*w2);float dy=(0.0004+0.0035*v*v)*m*(0.6*w3+0.25*w1);',
    'vec3 c=texture2D(S,vec2(u.x+dx,V0+v*(1.0-V0)+dy)).rgb;float lum=dot(c,vec3(0.3,0.5,0.2));',
    /* площина води: глибина від горизонту, кут з маяка до точки (0 — праворуч, 90° — на глядача) */
    'float ys=v*600.0+6.0;float Z=1000.0/ys;float xs=X0+u.x*W;float X=(xs-1380.0)*Z/1000.0;float Zl=1000.0/280.0;',
    'float dX=X;float dZ=Zl-Z;float ang=atan(dZ,dX);float d=abs(dA(ang,TH));float dist=length(vec2(dX,dZ));',
    'float sector=smoothstep(0.30,0.04,d)/(1.0+dist*0.22);float li=sector*(0.5+0.5*m)*(1.3+0.5*FL);',
    'vec3 warm=vec3(1.0,0.92,0.72);c+=warm*li*(0.30+1.4*lum);',
    /* відблиск лампи під маяком: стовпчик, ширшає й тремтить ближче, яскравіший у спалах */
    'float wp=40.0+520.0*v;float col=exp(-pow((xs-1364.0)/wp,2.0))*smoothstep(0.44,0.58,v)*m;',
    'col*=(0.30+0.70*FL)*(1.0-0.55*v)*(0.5+0.5*sin(v*80.0+T*2.1+w1*1.2));c+=warm*col*(0.3+1.0*lum)*1.2;',
    'gl_FragColor=vec4(c,1.0);}'
  ].join('\n');
  function sh(t, s) { var o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(o); return o; }
  var pr;
  try { pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr); if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw 0; } catch (e) { return; }
  gl.useProgram(pr);
  var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  var p = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(p); gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
  var U = {}; ['S', 'M', 'T', 'TH', 'FL', 'V0', 'X0', 'W'].forEach(function (n) { U[n] = gl.getUniformLocation(pr, n); });
  function tex(unit) { var t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t); ['WRAP_S', 'WRAP_T'].forEach(function (k) { gl.texParameteri(gl.TEXTURE_2D, gl['TEXTURE_' + k], gl.CLAMP_TO_EDGE); }); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); return t; }
  var ts = tex(0), tm = tex(1), srcUp = '', maskOk = false, ready = false;
  gl.uniform1i(U.S, 0); gl.uniform1i(U.M, 1); gl.uniform1f(U.V0, 1200 / 1800);
  var mask = new Image(); mask.onload = function () { gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tm); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, mask); maskOk = true; show(); }; mask.src = '/assets/eg/wmask.webp';
  function upload() {
    if (!img.complete || !img.naturalWidth || img.currentSrc === srcUp) return;
    try { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, ts); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img); srcUp = img.currentSrc; show(); } catch (e) { }
  }
  function show() { if (!ready && srcUp && maskOk) { ready = true; eg.insertBefore(cv, img.parentNode.nextSibling); eg.classList.add('gl'); } }
  img.addEventListener('load', upload); upload();
  function size() {
    var r = Math.min(1.5, devicePixelRatio || 1), w = Math.min(2048, Math.round(cv.clientWidth * r)), h = Math.round(cv.clientHeight * r);
    if (w && h && (cv.width !== w || cv.height !== h)) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); }
    var ph = matchMedia('(max-width:600px)').matches; gl.uniform1f(U.X0, ph ? 839 : 0); gl.uniform1f(U.W, ph ? 1500 : 3304);
  }
  var inView = false, running = false, t0 = performance.now();
  function frame(t) {
    if (!inView || document.hidden || !ready) { running = false; return; }
    size(); upload(); var L = window.avLight || { th: 20, fl: 0 };
    gl.uniform1f(U.T, (t - t0) / 1000); gl.uniform1f(U.TH, L.th * Math.PI / 180); gl.uniform1f(U.FL, L.fl);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); requestAnimationFrame(frame);
  }
  function start() { if (running || !inView) return; running = true; requestAnimationFrame(frame); }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { inView = es[0].isIntersecting; start(); }, { threshold: 0.05 }).observe(sec); else { inView = true; }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) start(); });
  addEventListener('resize', function () { upload(); start(); });
  var iv = setInterval(function () { if (ready) { clearInterval(iv); start(); } }, 200);
})();
