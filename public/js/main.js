(function () {
  const CA = 'B3yEiHrvXDRtY14cihzncXwqr4WZwPHpwyqhGDdypump';
  const BUY_URL = 'https://pump.fun/coin/' + CA;
  const CHART_URL = 'https://dexscreener.com/solana/' + CA;
  const COLORS = ['#ff4fa3', '#ff9a1f', '#ffd60a', '#3ed16b', '#2f8cff', '#9b5cff', '#ff4f6d'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- links + contract address ---------- */
  $$('[data-ca]').forEach((el) => (el.textContent = CA));
  $$('[data-buy]').forEach((el) => (el.href = BUY_URL));
  $$('[data-chart]').forEach((el) => (el.href = CHART_URL));

  /* ---------- toast ---------- */
  const toastEl = $('[data-toast]');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  /* ---------- copy CA ---------- */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_) {}
      ta.remove();
      return ok;
    }
  }
  $$('[data-copy]').forEach((box) => {
    const btn = $('.ca-btn', box);
    btn.addEventListener('click', async (e) => {
      const ok = await copyText(CA);
      if (ok) {
        box.classList.add('copied');
        btn.textContent = 'COPIED!';
        toast('CA copied — yippee!');
        burst(e.clientX, e.clientY, 18);
        setTimeout(() => { box.classList.remove('copied'); btn.textContent = 'COPY'; }, 1600);
      } else {
        toast('Long-press the address to copy');
      }
    });
  });

  /* ---------- yippee sound (tiny synth chirp, only on tap) ---------- */
  let audio;
  function chirp() {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume();
      const t0 = audio.currentTime;
      const notes = [[620, 0], [930, 0.1], [1240, 0.2]];
      notes.forEach(([f, d], i) => {
        const o = audio.createOscillator();
        const g = audio.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(f, t0 + d);
        o.frequency.exponentialRampToValueAtTime(f * (i === 2 ? 1.25 : 1.08), t0 + d + 0.11);
        g.gain.setValueAtTime(0.0001, t0 + d);
        g.gain.exponentialRampToValueAtTime(0.16, t0 + d + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + d + (i === 2 ? 0.26 : 0.12));
        o.connect(g).connect(audio.destination);
        o.start(t0 + d);
        o.stop(t0 + d + 0.3);
      });
    } catch (_) { /* no audio, no problem */ }
  }

  /* ---------- confetti ---------- */
  function burst(x, y, count = 26) {
    if (reduceMotion) return;
    for (let i = 0; i < count; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.background = COLORS[i % COLORS.length];
      c.style.left = x + 'px';
      c.style.top = y + 'px';
      document.body.appendChild(c);
      const a = Math.random() * Math.PI * 2;
      const v = 80 + Math.random() * 160;
      const dx = Math.cos(a) * v;
      const dy = Math.sin(a) * v - 120;
      const rot = (Math.random() - 0.5) * 900;
      c.animate(
        [
          { transform: 'translate(-50%,-50%) rotate(0)', opacity: 1 },
          { transform: `translate(${dx * 0.7}px, ${dy * 0.7}px) rotate(${rot * 0.6}deg)`, opacity: 1, offset: 0.45 },
          { transform: `translate(${dx}px, ${dy + 260}px) rotate(${rot}deg)`, opacity: 0 },
        ],
        { duration: 1100 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.4,1)' }
      ).onfinish = () => c.remove();
    }
  }

  /* ---------- render a Yippee variant into a box, keeping body size consistent ---------- */
  const UNITS = 1100; // widest variant viewBox — keeps every Yippee's body the same size
  function fit(el, variant, extra) {
    el.innerHTML = '<div class="ybox">' + Yippee.svg(variant, extra) + '</div>';
    const box = el.firstChild;
    box.style.cssText = 'height:100%;aspect-ratio:1100/1090;display:flex;align-items:flex-end;justify-content:center;margin:0 auto;max-width:100%';
    const svg = box.firstElementChild;
    const vb = svg.getAttribute('viewBox').split(' ').map(Number);
    svg.classList.add('yfit');
    svg.style.width = (vb[2] / UNITS) * 100 + '%';
    return svg;
  }
  $$('[data-yippee]').forEach((el) => fit(el, el.dataset.yippee));

  /* ---------- hero yippee ---------- */
  const PHRASES = ['yippee!', 'YIPPEE!!', 'hi :)', '100% to charity!', '*happy flap*', 'yippee yippee!', 'gm frens', 'you\'re doing great'];
  const heroBtn = $('.hero-yippee');
  const bubble = $('[data-bubble]');
  let phraseI = 0;
  heroBtn.addEventListener('click', (e) => {
    phraseI = (phraseI + 1) % PHRASES.length;
    bubble.textContent = PHRASES[phraseI];
    bubble.style.animation = 'none';
    void bubble.offsetWidth;
    bubble.style.animation = '';
    heroBtn.classList.remove('say');
    void heroBtn.offsetWidth;
    heroBtn.classList.add('say');
    chirp();
    burst(e.clientX, e.clientY);
  });
  heroBtn.addEventListener('animationend', (e) => { if (e.animationName === 'jump') heroBtn.classList.remove('say'); });

  const peek = $('.peek');
  peek.addEventListener('click', (e) => {
    peek.classList.add('say');
    chirp();
    burst(e.clientX, e.clientY, 34);
    setTimeout(() => peek.classList.remove('say'), 700);
  });

  /* ---------- yippee-dex ---------- */
  const DEX_ORDER = ['og', 'party', 'sensory', 'sleepy', 'train', 'degen', 'space', 'king', 'infinity', 'flower', 'propeller', 'stim'];
  const DEX_BG = ['#ffe48a', '#ffc4e2', '#d9c7ff', '#bfd2ff', '#bfe3ff', '#c3f5b0', '#1f2257', '#fff0a3', '#ffd9ec', '#c3f5b0', '#ffdcb3', '#ffe48a'];
  const SAYS = ['yippee!', 'YIPPEE!', 'yip!', 'yippee~', 'YIPPEE!!'];
  const dex = $('[data-dex]');
  DEX_ORDER.forEach((key, i) => {
    const v = Yippee.VARIANTS[key];
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card reveal';
    card.setAttribute('aria-label', v.name + ': ' + v.tag + ' Tap to hear him say yippee.');
    card.innerHTML = `
      <div class="card-art" style="--bg:${DEX_BG[i]}">
        <span class="card-num">#${String(i + 1).padStart(3, '0')}</span>
        <span class="say-bubble">${SAYS[i % SAYS.length]}</span>
        <div class="card-y" style="height:100%;width:100%"></div>
      </div>
      <h3>${v.name}</h3>
      <p>${v.tag}</p>`;
    fit($('.card-y', card), key);
    card.addEventListener('click', (e) => {
      card.classList.remove('say');
      void card.offsetWidth;
      card.classList.add('say');
      chirp();
      burst(e.clientX || card.getBoundingClientRect().left + 100, e.clientY || card.getBoundingClientRect().top + 100, 20);
      clearTimeout(card._t);
      card._t = setTimeout(() => card.classList.remove('say'), 1200);
    });
    dex.appendChild(card);
  });

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 70 + 'ms';
    io.observe(el);
  });

  /* ---------- scroll world ---------- */
  const world = $('[data-world]');
  if (world) {
    const sticky = $('.world-sticky', world);
    const track = $('[data-track]', world);
    const far = $('[data-far]', world);
    const walkerInner = $('[data-walker-inner]', world);
    const hudLabel = $('[data-hud-label]', world);
    const hudDots = $('[data-hud-dots]', world);
    const hint = $('[data-hint]', world);
    const scenes = $$('.scene', track);
    const n = scenes.length;
    const CHAPTERS = scenes.map((s) => ($('.caption b', s) || {}).textContent || '');
    const WALKER = [
      { eyes: 'closed', mouth: 'o', acc: ['nightcap'] },
      'sensory',
      'space',
      'nervous',
      'stim',
      'infinity',
      'party',
    ];
    world.style.setProperty('--n', n);
    hudDots.innerHTML = scenes.map(() => '<i></i>').join('');
    const dots = $$('i', hudDots);

    let sw = 0, cur = -1, lastX = 0, dir = -1, ticking = false;

    function setScene(i) {
      if (i === cur) return;
      cur = i;
      fit(walkerInner, WALKER[i] || 'og');
      walkerInner.classList.remove('poof');
      void walkerInner.offsetWidth;
      walkerInner.classList.add('poof');
      dots.forEach((d, j) => d.classList.toggle('on', j === i));
      hudLabel.textContent = CHAPTERS[i].split('·')[0].trim();
    }

    function measure() {
      sw = sticky.clientWidth;
      sticky.style.setProperty('--sw', sw + 'px');
      update();
    }

    function update() {
      ticking = false;
      const r = world.getBoundingClientRect();
      const total = world.offsetHeight - sticky.offsetHeight;
      const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
      const x = p * (n - 1) * sw;
      track.style.transform = `translate3d(${-x}px,0,0)`;
      far.style.backgroundPositionX = `${-x * 0.35}px`;
      if (x !== lastX) dir = x > lastX ? -1 : 1;
      lastX = x;
      setScene(Math.round(p * (n - 1)));
      const phase = x / Math.max(60, sw * 0.05);
      const bob = reduceMotion ? 0 : -Math.abs(Math.sin(phase)) * 16;
      const tilt = reduceMotion ? 0 : Math.sin(phase) * 3;
      walkerInner.style.transform = `translateY(${bob}px) rotate(${tilt}deg) scaleX(${dir})`;
      hint.classList.toggle('hide', p > 0.02 && p < 0.98 ? true : p >= 0.98);
    }

    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    measure();
  }
})();
