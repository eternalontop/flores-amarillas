function flowerHead(cx: number, cy: number, scale: number, delay: number): string {

  const petals = Array.from({ length: 12 })
    .map((_, i) => {
      const angle = (360 / 12) * i;
      return `<ellipse class="draw-petal" style="animation-delay:${delay + i * 0.045}s" cx="0" cy="-20" rx="8" ry="20" fill="url(#bouquetPetalGrad)" transform="rotate(${angle})" />`;
    })
    .join("");

  const innerPetals = Array.from({ length: 8 })
    .map((_, i) => {
      const angle = (360 / 8) * i + 22.5;
      return `<ellipse class="draw-petal inner-bouquet-petal" style="animation-delay:${delay + 0.18 + i * 0.05}s" cx="0" cy="-16" rx="6" ry="16" fill="url(#bouquetPetalGrad)" opacity="0.92" transform="rotate(${angle})" />`;
    })
    .join("");

  return `
  <g class="bouquet-flower" transform="translate(${cx},${cy}) scale(${scale})">
    ${petals}
    ${innerPetals}
    <circle cx="0" cy="0" r="8" fill="#6b4a1c" />
    <circle cx="0" cy="0" r="8" fill="url(#bouquetPetalGrad)" opacity="0.12" />
  </g>`;
}

export function createBouquetSVG(): string {

  const flowers = [
    flowerHead(-10, -94, 0.72, 0.95),
    flowerHead(10, -90, 0.72, 1.0),
    flowerHead(-28, -64, 0.88, 1.05),
    flowerHead(28, -62, 0.88, 1.1),
    flowerHead(-47, -28, 0.86, 1.15),
    flowerHead(47, -25, 0.86, 1.2),
    flowerHead(0, -38, 1.18, 0.88),
    flowerHead(-22, -8, 0.96, 1.25),
    flowerHead(22, -5, 0.96, 1.3),
  ];

  const stems = [
    "M-10,-66 C -12,25 -10,125 0,250",
    "M10,-62 C 12,28 10,125 0,250",
    "M-28,-36 C -30,50 -22,145 -4,250",
    "M28,-34 C 30,50 22,145 4,250",
    "M-47,0 C -44,70 -30,155 -9,250",
    "M47,4 C 44,70 30,155 9,250",
    "M0,-10 C 0,70 0,160 0,250",
    "M-22,20 C -20,90 -14,170 -5,250",
    "M22,23 C 20,90 14,170 5,250",
  ];

  const leaves = `
    <g class="bouquet-leaves" aria-hidden="true">
      <path d="M-38,124 C-70,109 -82,83 -77,63 C-48,67 -29,88 -38,124 Z" />
      <path d="M38,126 C70,111 82,85 77,65 C48,69 29,90 38,126 Z" />
      <path d="M-22,166 C-54,157 -68,137 -65,120 C-39,122 -21,139 -22,166 Z" />
      <path d="M22,166 C54,157 68,137 65,120 C39,122 21,139 22,166 Z" />
      <path d="M-10,204 C-34,196 -46,180 -43,165 C-23,168 -10,182 -10,204 Z" />
      <path d="M10,204 C34,196 46,180 43,165 C23,168 10,182 10,204 Z" />
    </g>`;

  const bouquetPaper = `
    <g class="bouquet-paper">
      <path
        d="M-72,178 C-52,186 -28,190 0,190 C28,190 52,186 72,178 L48,294 C31,308 12,316 0,320 C-12,316 -31,308 -48,294 Z"
      />
      <path class="bouquet-paper-fold bouquet-paper-fold-left" d="M-71,180 L-28,300 C-40,296 -48,294 -48,294 Z" />
      <path class="bouquet-paper-fold bouquet-paper-fold-right" d="M71,180 L28,300 C40,296 48,294 48,294 Z" />
      <path class="bouquet-paper-edge" d="M-72,178 C-52,186 -28,190 0,190 C28,190 52,186 72,178" />
    </g>`;

  return `
  <svg viewBox="0 0 320 470" class="bouquet-svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    <defs>
      <radialGradient id="bouquetPetalGrad" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="var(--accent-color, #FFD700)" />
        <stop offset="100%" stop-color="var(--accent-dark, #a68300)" />
      </radialGradient>

      <linearGradient id="bouquetLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#5f8e54" />
        <stop offset="100%" stop-color="#294d2d" />
      </linearGradient>

      <linearGradient id="bouquetPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="55%" stop-color="#f8f8f6" />
        <stop offset="100%" stop-color="#e8e8e4" />
      </linearGradient>
    </defs>

    <g transform="translate(160,145)">
      ${stems.map((d, i) => `<path class="draw-stem" style="animation-delay:${i * 0.055}s" d="${d}" stroke="#3b6b3f" stroke-width="4.5" fill="none" stroke-linecap="round" />`).join("")}

      ${leaves.replace('<g class="bouquet-leaves" aria-hidden="true">', '<g class="bouquet-leaves">')}

      ${bouquetPaper}

      <path
        class="draw-bow"
        d="M-42,282 C-70,262 -81,292 -50,305 C-23,317 -4,301 0,298 C4,301 23,317 50,305 C81,292 70,262 42,282 C22,293 7,285 0,278 C-7,285 -22,293 -42,282 Z"
        fill="#ffffff"
        stroke="#dcdcd8"
        stroke-width="2.5"
        stroke-linejoin="round"
      />

      ${flowers.join("")}
    </g>
  </svg>`;
}
