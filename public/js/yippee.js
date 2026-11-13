/* Yippee SVG factory — draws the mascot in vector form so we can dress him up.
   Usage: Yippee.svg('party')  or  Yippee.svg({ eyes:'happy', mouth:'open', acc:['crown'] }) */
(function () {
  const INK = '#14142b';
  let uid = 0;

  /* ---------- base body parts ---------- */
  const INNER_LEG = 'M562 640 L566 778 C578 808 628 808 640 778 L636 640 Z';
  const BODY =
    'M268 520 L266 765 C266 832 406 836 413 772 L428 655 C446 655 450 772 474 800 ' +
    'C508 838 562 812 568 770 L574 662 L630 662 L646 772 C654 824 764 822 764 770 ' +
    'L770 560 C772 500 722 484 640 490 Z';
  const HEAD =
    'M40 345 C30 200 160 50 410 24 C620 5 790 120 776 310 C768 420 690 475 590 497 ' +
    'C470 522 340 535 268 542 C180 520 90 450 32 385 C18 370 18 348 40 345 Z';

  const EYES = {
    normal: () => `
      <ellipse cx="255" cy="282" rx="92" ry="72" transform="rotate(4 255 282)" fill="${INK}"/>
      <ellipse cx="546" cy="272" rx="90" ry="70" transform="rotate(-4 546 272)" fill="${INK}"/>
      <ellipse cx="226" cy="262" rx="18" ry="12" transform="rotate(-35 226 262)" fill="#fff"/>
      <ellipse cx="518" cy="252" rx="18" ry="12" transform="rotate(-35 518 252)" fill="#fff"/>`,
    sparkle: () => `
      <ellipse cx="255" cy="282" rx="96" ry="78" transform="rotate(4 255 282)" fill="${INK}"/>
      <ellipse cx="546" cy="272" rx="94" ry="76" transform="rotate(-4 546 272)" fill="${INK}"/>
      <ellipse cx="226" cy="258" rx="24" ry="17" transform="rotate(-35 226 258)" fill="#fff"/>
      <ellipse cx="518" cy="248" rx="24" ry="17" transform="rotate(-35 518 248)" fill="#fff"/>
      <path d="M290 310 l6 -16 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 z" fill="#fff"/>
      <path d="M580 300 l6 -16 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 z" fill="#fff"/>`,
    closed: () => `
      <path d="M180 286 Q255 326 330 286" fill="none" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>
      <path d="M472 276 Q547 316 622 276" fill="none" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>`,
    happy: () => `
      <path d="M182 304 Q255 222 328 304" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/>
      <path d="M474 294 Q547 212 620 294" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/>`,
  };

  const MOUTHS = {
    flat: () => `<rect x="356" y="428" width="96" height="16" rx="2" fill="${INK}"/>`,
    smile: () => `<path d="M360 426 Q405 466 450 426" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>`,
    open: () => `
      <path d="M350 418 Q404 520 460 418 Z" fill="${INK}" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>
      <ellipse cx="405" cy="452" rx="26" ry="12" fill="#ff6fa8"/>`,
    o: () => `<ellipse cx="405" cy="440" rx="20" ry="25" fill="${INK}"/>`,
    wobble: () => `<path d="M352 438 q12 -14 24 0 t24 0 t24 0 t24 0" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>`,
  };

  const BLUSH = `
    <ellipse cx="180" cy="384" rx="42" ry="18" fill="#ff8fbf" opacity=".75"/>
    <ellipse cx="628" cy="372" rx="42" ry="18" fill="#ff8fbf" opacity=".75"/>`;

  /* ---------- accessories: each returns {back, front, top, side} ---------- */
  const ACC = {
    party: () => ({
      top: 210,
      front: `
      <g transform="rotate(14 470 40)">
        <path d="M368 52 L470 -150 L572 52 Z" fill="#ff4fa3" stroke="${INK}" stroke-width="18" stroke-linejoin="round"/>
        <path d="M402 -14 L538 -14" stroke="#ffd60a" stroke-width="18"/>
        <path d="M436 -82 L504 -82" stroke="#3ed16b" stroke-width="16"/>
        <path d="M368 52 L470 -150 L572 52 Z" fill="none" stroke="${INK}" stroke-width="18" stroke-linejoin="round"/>
        <circle cx="470" cy="-164" r="30" fill="#ffd60a" stroke="${INK}" stroke-width="14"/>
      </g>`,
    }),

    confetti: () => ({
      top: 120, side: 90,
      front: `
      <g stroke="${INK}" stroke-width="6">
        <rect x="-50" y="80" width="34" height="18" fill="#ffd60a" transform="rotate(30 -33 89)"/>
        <rect x="820" y="40" width="34" height="18" fill="#2f8cff" transform="rotate(-25 837 49)"/>
        <rect x="-30" y="520" width="30" height="16" fill="#3ed16b" transform="rotate(50 -15 528)"/>
        <rect x="830" y="420" width="30" height="16" fill="#ff4fa3" transform="rotate(-40 845 428)"/>
        <rect x="140" y="-90" width="30" height="16" fill="#9b5cff" transform="rotate(20 155 -82)"/>
        <rect x="700" y="-60" width="30" height="16" fill="#ff9a1f" transform="rotate(-15 715 -52)"/>
        <circle cx="70" cy="-20" r="13" fill="#ff4fa3"/>
        <circle cx="800" cy="200" r="13" fill="#ffd60a"/>
        <circle cx="-40" cy="300" r="12" fill="#2f8cff"/>
      </g>`,
    }),

    headphones: () => ({
      top: 60, side: 50,
      front: `
      <path d="M58 290 C20 40 300 -44 420 -34 C580 -22 812 50 772 270" fill="none" stroke="${INK}" stroke-width="54" stroke-linecap="round"/>
      <path d="M58 290 C20 40 300 -44 420 -34 C580 -22 812 50 772 270" fill="none" stroke="#9b5cff" stroke-width="28" stroke-linecap="round"/>
      <rect x="-14" y="214" width="120" height="180" rx="44" fill="#9b5cff" stroke="${INK}" stroke-width="18"/>
      <rect x="704" y="196" width="120" height="180" rx="44" fill="#9b5cff" stroke="${INK}" stroke-width="18"/>
      <rect x="18" y="246" width="34" height="110" rx="17" fill="#c9a8ff"/>
      <rect x="764" y="228" width="34" height="110" rx="17" fill="#c9a8ff"/>`,
    }),

    nightcap: () => ({
      top: 150, side: 140,
      front: `
      <path d="M300 82 C318 -64 560 -120 700 -22 C770 26 826 110 852 196 C796 134 722 76 640 72 C540 62 420 74 300 82 Z"
            fill="#5b6cff" stroke="${INK}" stroke-width="18" stroke-linejoin="round"/>
      <path d="M430 -40 l8 -18 l8 18 l18 8 l-18 8 l-8 18 l-8 -18 l-18 -8 z" fill="#ffd60a"/>
      <path d="M580 -30 l6 -14 l6 14 l14 6 l-14 6 l-6 14 l-6 -14 l-14 -6 z" fill="#ffd60a"/>
      <path d="M300 88 C420 56 560 52 666 78" fill="none" stroke="${INK}" stroke-width="64" stroke-linecap="round"/>
      <path d="M300 88 C420 56 560 52 666 78" fill="none" stroke="#fff" stroke-width="38" stroke-linecap="round"/>
      <circle cx="858" cy="204" r="36" fill="#fff" stroke="${INK}" stroke-width="16"/>`,
    }),

    zzz: () => ({
      top: 200, side: 120,
      front: `
      <g font-family="'Luckiest Guy', 'Arial Black', sans-serif" fill="#fff" stroke="${INK}" stroke-width="10" paint-order="stroke">
        <text x="40" y="-30" font-size="96" transform="rotate(-12 40 -30)">Z</text>
        <text x="-40" y="-110" font-size="70" transform="rotate(-18 -40 -110)">z</text>
        <text x="-90" y="-170" font-size="52" transform="rotate(-22 -90 -170)">z</text>
      </g>`,
    }),

    conductor: () => ({
      top: 120,
      front: `
      <path d="M296 80 L316 -36 C400 -76 560 -74 604 -30 L624 70 Z" fill="#2f5bd8" stroke="${INK}" stroke-width="18" stroke-linejoin="round"/>
      <g stroke="#9cc3ff" stroke-width="12">
        <path d="M372 -52 L360 74"/><path d="M432 -62 L428 74"/><path d="M494 -62 L496 72"/><path d="M554 -50 L562 70"/>
      </g>
      <path d="M296 80 L316 -36 C400 -76 560 -74 604 -30 L624 70 Z" fill="none" stroke="${INK}" stroke-width="18" stroke-linejoin="round"/>
      <path d="M276 74 C380 104 560 102 650 66 C672 96 604 130 462 128 C356 126 282 106 276 74 Z" fill="#1a3a9e" stroke="${INK}" stroke-width="16" stroke-linejoin="round"/>
      <circle cx="460" cy="14" r="22" fill="#ffd60a" stroke="${INK}" stroke-width="10"/>`,
    }),

    shades: () => ({
      front: `
      <g transform="rotate(-4 400 260)">
        <rect x="110" y="206" width="580" height="38" fill="${INK}"/>
        <rect x="140" y="206" width="220" height="110" fill="${INK}"/>
        <rect x="440" y="206" width="220" height="110" fill="${INK}"/>
        <rect x="170" y="316" width="160" height="26" fill="${INK}"/>
        <rect x="470" y="316" width="160" height="26" fill="${INK}"/>
        <rect x="176" y="232" width="28" height="28" fill="#fff"/>
        <rect x="204" y="260" width="28" height="28" fill="#fff"/>
        <rect x="476" y="232" width="28" height="28" fill="#fff"/>
        <rect x="504" y="260" width="28" height="28" fill="#fff"/>
      </g>`,
    }),

    helmet: () => {
      return {
        top: 70, side: 60,
        back: `<ellipse cx="440" cy="560" rx="270" ry="54" fill="#d6d9ee" stroke="${INK}" stroke-width="18"/>`,
        front: `
        <ellipse cx="398" cy="270" rx="430" ry="335" fill="#9fdcff" fill-opacity=".28" stroke="${INK}" stroke-width="20"/>
        <path d="M80 200 C110 90 220 10 340 -10" fill="none" stroke="#fff" stroke-width="26" stroke-linecap="round" opacity=".9"/>
        <path d="M60 280 L62 300" stroke="#fff" stroke-width="26" stroke-linecap="round" opacity=".9"/>`,
      };
    },

    crown: () => ({
      top: 190,
      front: `
      <g transform="rotate(8 445 0)">
        <path d="M298 66 L276 -112 L370 -24 L444 -146 L516 -30 L612 -120 L594 66 Z" fill="#ffd60a" stroke="${INK}" stroke-width="18" stroke-linejoin="round"/>
        <path d="M300 30 L594 30" stroke="#ffb000" stroke-width="12"/>
        <circle cx="366" cy="34" r="18" fill="#ff4fa3" stroke="${INK}" stroke-width="8"/>
        <circle cx="446" cy="30" r="20" fill="#2f8cff" stroke="${INK}" stroke-width="8"/>
        <circle cx="528" cy="34" r="18" fill="#3ed16b" stroke="${INK}" stroke-width="8"/>
        <circle cx="276" cy="-118" r="14" fill="#fff" stroke="${INK}" stroke-width="8"/>
        <circle cx="444" cy="-152" r="14" fill="#fff" stroke="${INK}" stroke-width="8"/>
        <circle cx="612" cy="-126" r="14" fill="#fff" stroke="${INK}" stroke-width="8"/>
      </g>`,
    }),

    infinity: () => {
      const id = 'yg' + ++uid;
      const d = 'M420 -110 C360 -190 250 -190 250 -110 C250 -30 360 -30 420 -110 C480 -190 590 -190 590 -110 C590 -30 480 -30 420 -110 Z';
      return {
        top: 230,
        front: `
        <defs><linearGradient id="${id}" x1="0" x2="1">
          <stop offset="0" stop-color="#ff4f6d"/><stop offset=".2" stop-color="#ff9a1f"/>
          <stop offset=".4" stop-color="#ffd60a"/><stop offset=".6" stop-color="#3ed16b"/>
          <stop offset=".8" stop-color="#2f8cff"/><stop offset="1" stop-color="#9b5cff"/></linearGradient></defs>
        <path d="${d}" fill="none" stroke="${INK}" stroke-width="58" stroke-linejoin="round"/>
        <path d="${d}" fill="none" stroke="url(#${id})" stroke-width="34" stroke-linejoin="round"/>
        <path d="M170 -180 l8 -20 l8 20 l20 8 l-20 8 l-8 20 l-8 -20 l-20 -8 z" fill="#ffd60a" stroke="${INK}" stroke-width="6"/>
        <path d="M660 -60 l6 -15 l6 15 l15 6 l-15 6 l-6 15 l-6 -15 l-15 -6 z" fill="#ff4fa3" stroke="${INK}" stroke-width="6"/>`,
      };
    },

    flower: () => {
      let petals = '';
      for (let i = 0; i < 8; i++) {
        petals += `<ellipse cx="250" cy="-18" rx="24" ry="52" transform="rotate(${i * 45} 250 36)" fill="#fff" stroke="${INK}" stroke-width="10"/>`;
      }
      return {
        top: 110,
        front: `<g transform="rotate(-14 250 36)">${petals}<circle cx="250" cy="36" r="34" fill="#ffd60a" stroke="${INK}" stroke-width="12"/></g>`,
      };
    },

    propeller: () => ({
      top: 190,
      front: `
      <path d="M300 80 C306 -58 594 -58 600 80 Z" fill="#ffd60a" stroke="${INK}" stroke-width="18" stroke-linejoin="round"/>
      <path d="M450 -36 C520 -36 596 -10 600 80 L450 80 Z" fill="#2f8cff"/>
      <path d="M440 -38 L440 80" stroke="#ff4f6d" stroke-width="26"/>
      <path d="M300 80 C306 -58 594 -58 600 80 Z" fill="none" stroke="${INK}" stroke-width="18" stroke-linejoin="round"/>
      <rect x="430" y="-100" width="22" height="66" fill="${INK}"/>
      <g class="y-prop">
        <ellipse cx="380" cy="-104" rx="66" ry="18" fill="#ff4f6d" stroke="${INK}" stroke-width="10"/>
        <ellipse cx="504" cy="-104" rx="66" ry="18" fill="#3ed16b" stroke="${INK}" stroke-width="10"/>
      </g>
      <circle cx="441" cy="-104" r="18" fill="#fff" stroke="${INK}" stroke-width="10"/>`,
    }),

    motion: () => ({
      side: 150, top: 40,
      back: `
      <g fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round">
        <path d="M150 560 C80 590 60 650 80 700"/><path d="M90 520 C10 560 -20 640 0 710"/>
        <path d="M880 520 C940 560 960 630 940 690"/><path d="M830 560 C880 590 900 640 880 690"/>
      </g>`,
      front: `
      <g stroke="${INK}" stroke-width="7" stroke-linejoin="round">
        <path d="M-70 120 l10 -26 l10 26 l26 10 l-26 10 l-10 26 l-10 -26 l-26 -10 z" fill="#ffd60a"/>
        <path d="M860 90 l9 -22 l9 22 l22 9 l-22 9 l-9 22 l-9 -22 l-22 -9 z" fill="#ff4fa3"/>
        <path d="M900 380 l7 -18 l7 18 l18 7 l-18 7 l-7 18 l-7 -18 l-18 -7 z" fill="#2f8cff"/>
      </g>`,
    }),

    sweat: () => ({
      side: 60,
      front: `
      <path d="M760 90 C760 90 806 160 790 188 C776 212 734 206 730 176 C726 150 760 90 760 90 Z" fill="#8fd3ff" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>
      <path d="M748 168 C746 156 752 146 756 140" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`,
    }),

    heart: () => ({
      top: 190,
      front: `<path d="M420 -30 C300 -100 330 -200 410 -170 C420 -166 420 -160 420 -156 C440 -200 540 -190 520 -110 C510 -70 450 -40 420 -30 Z" fill="#ff4f6d" stroke="${INK}" stroke-width="16" stroke-linejoin="round"/>
              <path d="M370 -150 C360 -140 360 -126 366 -116" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`,
    }),
  };

  /* ---------- named variants ---------- */
  const VARIANTS = {
    og:        { name: 'OG Yippee',        tag: 'The one. The only. Mildly confused, maximally loved.' },
    party:     { name: 'Party Yippee',     tag: 'Every donation = a party. He brought the hat.', mouth: 'open', blush: true, acc: ['confetti', 'party'] },
    sensory:   { name: 'Sensory Yippee',   tag: 'Noise-cancelling ON. World: muted. Vibes: immaculate.', eyes: 'closed', mouth: 'smile', acc: ['headphones'] },
    sleepy:    { name: 'Sleepy Yippee',    tag: 'Recharging social battery. Do not disturb (lovingly).', eyes: 'closed', mouth: 'o', acc: ['nightcap', 'zzz'] },
    train:     { name: 'Choo-Choo Yippee', tag: 'Special interest: trains. Will tell you about all 400.', eyes: 'sparkle', mouth: 'smile', acc: ['conductor'] },
    degen:     { name: 'Degen Yippee',     tag: 'Bought the dip. Donated the fees. Deal with it.', mouth: 'smile', acc: ['shades'] },
    space:     { name: 'Space Yippee',     tag: 'Thinks in galaxies. Lands in feelings.', eyes: 'sparkle', mouth: 'o', acc: ['helmet'] },
    king:      { name: 'King Yippee',      tag: 'Kind, fair, and runs the kingdom on a strict schedule.', acc: ['crown'] },
    infinity:  { name: 'Infinity Yippee',  tag: 'Acceptance > awareness. Rainbow brain, infinite heart.', eyes: 'happy', mouth: 'smile', blush: true, acc: ['infinity'] },
    flower:    { name: 'Daisy Yippee',     tag: 'Touch grass? He lives there.', mouth: 'smile', blush: true, acc: ['flower'] },
    propeller: { name: 'Brainstorm Yippee',tag: 'Brain going brrr at 10,000 thoughts per second.', mouth: 'wobble', acc: ['propeller'] },
    stim:      { name: 'Happy-Flap Yippee',tag: 'Happy flaps detected. Joy looks different on everyone.', eyes: 'happy', mouth: 'open', blush: true, acc: ['motion'] },
    nervous:   { name: 'Nervous Yippee',   tag: 'Small talk loading…', mouth: 'wobble', acc: ['sweat'] },
    love:      { name: 'Lovey Yippee',     tag: 'Full of heart.', eyes: 'sparkle', mouth: 'smile', blush: true, acc: ['heart'] },
  };

  function svg(opts, extra) {
    if (typeof opts === 'string') opts = VARIANTS[opts] || {};
    opts = Object.assign({ eyes: 'normal', mouth: 'flat', acc: [], fill: '#fff' }, opts, extra || {});
    let top = 30, side = 30, back = '', front = '';
    for (const a of opts.acc) {
      const r = ACC[a] ? ACC[a]() : null;
      if (!r) continue;
      top = Math.max(top, r.top || 0);
      side = Math.max(side, r.side || 0);
      back += r.back || '';
      front += r.front || '';
    }
    const vb = `${-side} ${-top} ${800 + side * 2} ${860 + top}`;
    const cls = opts.className ? ` class="${opts.className}"` : '';
    const label = opts.label || opts.name || 'Yippee';
    return `<svg${cls} viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
      ${back}
      <path d="${INNER_LEG}" fill="${opts.fill}" stroke="${INK}" stroke-width="22" stroke-linejoin="round"/>
      <path d="${BODY}" fill="${opts.fill}" stroke="${INK}" stroke-width="22" stroke-linejoin="round"/>
      <path d="${HEAD}" fill="${opts.fill}" stroke="${INK}" stroke-width="22" stroke-linejoin="round"/>
      ${opts.blush ? BLUSH : ''}
      ${(EYES[opts.eyes] || EYES.normal)()}
      ${(MOUTHS[opts.mouth] || MOUTHS.flat)()}
      ${front}
    </svg>`;
  }

  window.Yippee = { svg, VARIANTS };
})();
