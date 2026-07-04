/* TURQUOISE AI — containment-field hero (Three.js) + GSAP scroll choreography
   Classic script (no ES module) so it runs from file:// as well as HTTP.
   THREE and gsap arrive as globals from the CDN script tags. */

const doc = document.documentElement;
const reduceMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  doc.classList.contains('static');
const isMobile = window.matchMedia('(max-width: 768px)').matches;

window.__turquoiseReady = true;

/* ============================================================
   1. Containment field
   Particles = data. The red frame = the law. Data never crosses.
   ============================================================ */
function initField() {
  const canvas = document.getElementById('field');
  const hero = document.querySelector('.hero');
  const impactLayer = document.getElementById('impacts');
  if (!canvas || !hero) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas, alpha: true, antialias: false, powerPreference: 'high-performance'
    });
  } catch (e) {
    canvas.style.display = 'none';
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 10;
  const scene = new THREE.Scene();

  const N = reduceMotion ? 900 : isMobile ? 1400 : 4200;
  const positions = new Float32Array(N * 3);
  const velocities = new Float32Array(N * 2);
  const sizes = new Float32Array(N);
  const phases = new Float32Array(N);

  let halfW = 8, halfH = 5.2;          // world extents of the view at z=0
  let boundX = 7, boundY = 4.5;        // containment bounds (frame-aligned)
  const FRAME_INSET_PX = () =>
    parseFloat(getComputedStyle(doc).getPropertyValue('--frame-inset')) || 20;

  function measure() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    halfW = halfH * camera.aspect;
    const worldPerPx = (2 * halfH) / h;
    const inset = (FRAME_INSET_PX() + 2) * worldPerPx;
    boundX = halfW - inset;
    boundY = halfH - inset;
  }
  measure();

  for (let i = 0; i < N; i++) {
    positions[i * 3] = (Math.random() * 2 - 1) * boundX;
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * boundY;
    positions[i * 3 + 2] = (Math.random() * 2 - 1) * 0.5;
    const a = Math.random() * Math.PI * 2;
    const s = 0.2 + Math.random() * 0.5;
    velocities[i * 2] = Math.cos(a) * s;
    velocities[i * 2 + 1] = Math.sin(a) * s;
    sizes[i] = 1.4 + Math.random() * 2.4;
    phases[i] = Math.random() * Math.PI * 2;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x58d5c9) },
      uScale: { value: hero.clientHeight * 0.5 }
    },
    vertexShader: `
      attribute float aSize;
      attribute float aPhase;
      uniform float uTime;
      uniform float uScale;
      varying float vTwinkle;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * (uScale / -mv.z) * 0.055;
        vTwinkle = 0.55 + 0.45 * sin(uTime * 1.3 + aPhase);
      }`,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vTwinkle;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.05, d) * vTwinkle * 0.85;
        gl_FragColor = vec4(uColor, a);
      }`
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  /* impact glow pool on the frame */
  const POOL = 20;
  const pool = [];
  let poolIdx = 0, lastImpact = 0;
  if (impactLayer) {
    for (let i = 0; i < POOL; i++) {
      const el = document.createElement('span');
      el.className = 'impact';
      impactLayer.appendChild(el);
      pool.push(el);
    }
  }
  const proj = new THREE.Vector3();
  function spawnImpact(x, y) {
    const now = performance.now();
    if (now - lastImpact < 90 || !pool.length) return;
    lastImpact = now;
    proj.set(x, y, 0).project(camera);
    const w = hero.clientWidth, h = hero.clientHeight;
    const sx = (proj.x * 0.5 + 0.5) * w - FRAME_INSET_PX();
    const sy = (-proj.y * 0.5 + 0.5) * h - FRAME_INSET_PX();
    const el = pool[poolIdx++ % POOL];
    el.style.left = sx + 'px';
    el.style.top = sy + 'px';
    el.animate(
      [
        { opacity: 0.9, transform: 'scale(0.6)' },
        { opacity: 0, transform: 'scale(2.6)' }
      ],
      { duration: 650, easing: 'ease-out' }
    );
  }

  /* pointer repulsion */
  const mouse = { x: 0, y: 0, active: false };
  if (!isMobile && !reduceMotion) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width * 2 - 1) * halfW;
      mouse.y = -((e.clientY - r.top) / r.height * 2 - 1) * halfH;
      mouse.active = true;
    });
    hero.addEventListener('pointerleave', () => { mouse.active = false; });
  }

  const FLOW = 0.85, STEER = 1.6, MAXV = 1.5;
  function step(dt, t) {
    for (let i = 0; i < N; i++) {
      const ix = i * 3, iv = i * 2;
      let x = positions[ix], y = positions[ix + 1];
      let vx = velocities[iv], vy = velocities[iv + 1];

      // pseudo-curl flow field: turbulent but coherent streams
      const fx = Math.sin(y * 0.42 + t * 0.55) + 0.6 * Math.cos((x + y) * 0.23 - t * 0.4);
      const fy = Math.cos(x * 0.38 - t * 0.5) - 0.6 * Math.sin((x - y) * 0.27 + t * 0.33);
      vx += (fx * FLOW - vx) * STEER * dt;
      vy += (fy * FLOW - vy) * STEER * dt;

      if (mouse.active) {
        const dx = x - mouse.x, dy = y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 3.6 && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          const f = (1 - d / 1.9) * 5 * dt;
          vx += (dx / d) * f;
          vy += (dy / d) * f;
        }
      }

      const sp = Math.sqrt(vx * vx + vy * vy);
      if (sp > MAXV) { vx = (vx / sp) * MAXV; vy = (vy / sp) * MAXV; }

      x += vx * dt;
      y += vy * dt;

      // the law: reflect at the perimeter
      if (x > boundX) { x = boundX; vx = -Math.abs(vx) * 0.9; spawnImpact(boundX, y); }
      else if (x < -boundX) { x = -boundX; vx = Math.abs(vx) * 0.9; spawnImpact(-boundX, y); }
      if (y > boundY) { y = boundY; vy = -Math.abs(vy) * 0.9; spawnImpact(x, boundY); }
      else if (y < -boundY) { y = -boundY; vy = Math.abs(vy) * 0.9; spawnImpact(x, -boundY); }

      positions[ix] = x;
      positions[ix + 1] = y;
      velocities[iv] = vx;
      velocities[iv + 1] = vy;
    }
    geo.attributes.position.needsUpdate = true;
    mat.uniforms.uTime.value = t;
  }

  // settle the field so even a static first frame shows streams
  let t0 = 0;
  for (let k = 0; k < 90; k++) { t0 += 1 / 30; step(1 / 30, t0); }
  renderer.render(scene, camera);

  if (reduceMotion) return; // static frame only

  let visible = true, last = performance.now();
  const io = new IntersectionObserver(
    (entries) => { visible = entries[0].isIntersecting; },
    { threshold: 0 }
  );
  io.observe(hero);

  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) { last = now; return; }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t0 += dt;
    step(dt, t0);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      measure();
      mat.uniforms.uScale.value = hero.clientHeight * 0.5;
    }, 150);
  });
}

/* ============================================================
   2. Rack SVG: generate the 8 GPU sleds + U scale
   ============================================================ */
function initRack() {
  const sleds = document.getElementById('gpuSleds');
  const uScale = document.getElementById('uScale');
  if (!sleds) return;
  const NS = 'http://www.w3.org/2000/svg';
  for (let i = 0; i < 8; i++) {
    const y = 66 + i * 35;
    const g = document.createElementNS(NS, 'g');
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', '22'); r.setAttribute('y', y);
    r.setAttribute('width', '204'); r.setAttribute('height', '27');
    r.setAttribute('fill', 'var(--stahl)');
    r.setAttribute('stroke', 'var(--rauch-dim)');
    r.setAttribute('stroke-width', '1');
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', '34'); t.setAttribute('y', y + 17);
    t.setAttribute('class', 'rack-label');
    t.textContent = `2U — GPU ${i + 1} · 96 GB`;
    const led = document.createElementNS(NS, 'circle');
    led.setAttribute('class', 'led');
    led.setAttribute('cx', '214'); led.setAttribute('cy', y + 13);
    led.setAttribute('r', '2.5');
    led.style.animation = `led-blink ${2.2 + i * 0.37}s linear infinite`;
    g.append(r, t, led);
    sleds.appendChild(g);
  }
  if (uScale) {
    for (let u = 0; u <= 24; u += 4) {
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', '244');
      t.setAttribute('y', 28 + u * 17.4);
      t.setAttribute('class', 'rack-u');
      t.textContent = 'U' + (u === 0 ? 1 : u);
      uScale.appendChild(t);
    }
  }
}

/* ============================================================
   3. Night-shift terminal readout
   ============================================================ */
function initTerminal() {
  const term = document.getElementById('terminal');
  if (!term) return;
  const lines = [
    ['22:41:07', 'Q-4711 summarize akte_2214.pdf', 'done · 38 s', 't-ok'],
    ['22:41:45', 'Q-4713 extract scan_0912.pdf', 'done · 21 s', 't-ok'],
    ['22:42:06', 'Q-4712 draft reply_hansen.docx', 'routed to review', 't-route'],
    ['22:42:31', 'Q-4714 translate vertrag_kg17.pdf', 'done · 74 s', 't-ok'],
    ['22:43:02', 'Q-4711 summarize akte_2215.pdf', 'done · 41 s', 't-ok'],
    ['22:43:29', 'Q-4715 report mandat_0553', 'done · 12 s', 't-ok'],
    ['22:43:58', 'Q-4713 extract scan_0913.pdf', 'done · 19 s', 't-ok'],
    ['22:44:20', 'Q-4712 draft schreiben_meyer.docx', 'routed to review', 't-route'],
    ['22:44:52', 'Q-4711 summarize akte_2216.pdf', 'done · 36 s', 't-ok'],
    ['22:45:15', 'Q-4714 translate anlage_b4.pdf', 'done · 58 s', 't-ok']
  ];
  const MAX = 6;
  let i = 0;

  function push() {
    const [ts, job, status, cls] = lines[i % lines.length];
    i++;
    const row = document.createElement('div');
    row.innerHTML = `<span class="t-ok">${ts}</span>  ${job}  <span class="${cls}">— ${status}</span>`;
    term.appendChild(row);
    while (term.children.length > MAX) term.removeChild(term.firstChild);
  }

  if (reduceMotion) {
    for (let k = 0; k < MAX; k++) push();
    return;
  }
  for (let k = 0; k < 3; k++) push();
  let timer = null;
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !timer) timer = setInterval(push, 1100);
    else if (!entries[0].isIntersecting && timer) { clearInterval(timer); timer = null; }
  });
  io.observe(term);
  // backgrounded-panel fallback: IO may never fire, keep the log alive
  setTimeout(() => { if (!timer) timer = setInterval(push, 1100); }, 2500);
}

/* ============================================================
   4. GSAP choreography
   ============================================================ */
function initMotion() {
  if (!window.gsap || !window.ScrollTrigger) {
    doc.classList.remove('js');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  if (reduceMotion) {
    doc.classList.remove('js');
    // still wire the counter to a sensible final state
    setNight(1);
    return;
  }

  /* hero intro */
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-frame', { scale: 0.985, autoAlpha: 0, duration: 1.1, ease: 'power2.out' }, 0.1)
    .to('.hero-eyebrow .line-inner', { y: 0, duration: 0.7 }, 0.35)
    .to('.hero-title .line-inner', { y: 0, duration: 0.95, stagger: 0.09 }, 0.45)
    .to('.hero-sub .line-inner', { y: 0, duration: 0.7, stagger: 0.08 }, 0.85)
    .from('.hero-ctas', { y: 18, autoAlpha: 0, duration: 0.7 }, 1.05)
    .from('.nav', { autoAlpha: 0, duration: 0.8 }, 0.5)
    .from('.hero-tabs li', { y: 14, autoAlpha: 0, stagger: 0.08, duration: 0.55 }, 1.15);

  /* generic reveals */
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%' }
    });
  });

  /* benchmark bars grow in when the datasheet enters view */
  if (document.querySelector('.bench-fill')) {
    gsap.from('.bench-fill', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '.bench', start: 'top 80%' }
    });
  }

  /* night-shift scrub */
  ScrollTrigger.create({
    trigger: '.night',
    start: 'top 78%',
    end: 'bottom 45%',
    scrub: 0.5,
    onUpdate: (self) => setNight(self.progress)
  });

  // backgrounded-panel fallback: if triggers never fire, force-reveal
  setTimeout(() => {
    const pending = document.querySelectorAll('[data-reveal]');
    let anyHidden = false;
    pending.forEach((el) => {
      if (parseFloat(getComputedStyle(el).opacity) < 0.05) anyHidden = true;
    });
    if (anyHidden) ScrollTrigger.refresh();
  }, 3000);
}

function setNight(p) {
  const fill = document.getElementById('nightFill');
  const count = document.getElementById('nightCount');
  const clock = document.getElementById('nightClock');
  if (fill) fill.style.width = (p * 100).toFixed(1) + '%';
  if (count) count.textContent = Math.round(p * 512);
  if (clock) {
    const mins = 18 * 60 + p * 14 * 60;
    const h = Math.floor(mins / 60) % 24;
    const m = Math.floor(mins % 60);
    clock.textContent =
      String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  }
}

/* ============================================================
   boot
   ============================================================ */
initRack();
initTerminal();
initMotion();
try {
  initField();
} catch (e) {
  const c = document.getElementById('field');
  if (c) c.style.display = 'none';
}
if (doc.classList.contains('static')) setNight(0.62);
