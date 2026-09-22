export function createSingleFlowerSVG(): string {

  return `
  <svg viewBox="0 0 300 420" class="hero-flower" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    <defs>
      <radialGradient id="petalGrad" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="var(--accent-color, #FFD700)" stop-opacity="1" />
        <stop offset="100%" stop-color="var(--accent-dark, #a68300)" stop-opacity="1" />
      </radialGradient>
    </defs>
    <g class="flower-sway">
      <path d="M150 220 C 140 300, 140 340, 150 400" stroke="#3b6b3f" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M150 300 C 120 290, 100 300, 90 320" stroke="#3b6b3f" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M150 260 C 180 250, 200 260, 210 280" stroke="#3b6b3f" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g class="flower-head" transform="translate(150,150)">
        <g class="flower-head-pulse">
          ${Array.from({ length: 12 })
            .map((_, i) => {
              const angle = (360 / 12) * i;
              return `<ellipse class="petal" cx="0" cy="-55" rx="24" ry="55" fill="url(#petalGrad)" transform="rotate(${angle})" />`;
            })
            .join("")}

          ${Array.from({ length: 12 })
            .map((_, i) => {
              const angle = (360 / 12) * i + 15;
              return `<ellipse class="petal inner-petal" cx="0" cy="-43" rx="16" ry="40" fill="url(#petalGrad)" opacity="0.88" transform="rotate(${angle})" />`;
            })
            .join("")}

          <circle cx="0" cy="0" r="28" fill="#6b4a1c" />
          <circle cx="0" cy="0" r="28" fill="url(#petalGrad)" opacity="0.15" />
        </g>
      </g>
    </g>
  </svg>`;
}
