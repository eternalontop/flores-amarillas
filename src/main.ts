import "./style.css";
import { createSingleFlowerSVG } from "./modules/flower";
import { createBouquetSVG } from "./modules/bouquet";
import { launchPetalConfetti } from "./modules/confetti";
import { AudioPlayer } from "./modules/audioPlayer";
import { applyAccentColor, initTheme } from "./modules/theme";
import { exportPostcard } from "./modules/exportPostcard";
import { poems } from "./data/poems";

const AUTHOR_NAME = "ilyguti"; 
const app = document.getElementById("app")!;

const loadingPhrases = [
  "El amor siempre debe de ser reciproco, Si no, No es amor.",
  "La lealtad tambien cuenta como amor, No lo olvides.",
  "Permanezco eterno, tocando tus labios como dos llamas que duermen en tu piel",
  "You are the Magnolia.",
  "De todas las drogas, Te volviste la mejor.",
];

/* primerapaginaeeemesi */
function renderSlide1(): void {
  app.innerHTML = `
    <section class="slide slide-1 fade-in">
      <div class="left">
        <h1 class="typed-title"><span id="typedText"></span><span class="cursor">&nbsp;</span></h1>
        <div class="glass-input-group">
          <input id="nameInput" class="glass-input" type="text" placeholder="Escribe tu nombre..." autocomplete="off" />
          <button id="discoverBtn" class="btn-accent">Descubrir ✨</button>
        </div>
      </div>
      <div class="right">${createSingleFlowerSVG()}</div>
      <div id="toast" class="toast">Ups, esta sorpresa tiene otra dueña 😉</div>
    </section>
    <div class="credit-tag">Made with 💛 by ${AUTHOR_NAME}</div>
  `;

  typeTitle("Una sorpresa especial te espera...");

  const input = document.getElementById("nameInput") as HTMLInputElement;
  const btn = document.getElementById("discoverBtn") as HTMLButtonElement;
  const toast = document.getElementById("toast") as HTMLElement;

  const tryDiscover = () => {
    const name = input.value.trim();
    if (name.length === 0) {
      toast.textContent = "Escribe tu nombre para continuar 🌼";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2400);
      return;
    }
    goToSlide2(name);
  };

  btn.addEventListener("click", tryDiscover);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryDiscover();
  });
}

function typeTitle(text: string): void {
  const el = document.getElementById("typedText")!;
  let i = 0;
  const interval = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 45);
}

/* segundapaginabobo */
function goToSlide2(name: string): void {
  const current = document.querySelector(".slide-1");
  current?.classList.add("fade-out");

  setTimeout(() => renderSlide2(name), 650);
}

function renderSlide2(name: string): void {
  app.innerHTML = `
    <section class="slide slide-2 fade-in">
      <p id="loadingPhrase" class="loading-phrase visible">${loadingPhrases[0]}</p>
      <div class="loading-bottom">
        <svg class="sunflower-spinner" viewBox="0 0 100 100">
          <g>
            ${Array.from({ length: 8 })
              .map(
                (_, i) =>
                  `<ellipse cx="50" cy="20" rx="8" ry="18" fill="var(--accent-color)" transform="rotate(${i * 45} 50 50)" opacity="0.85"/>`
              )
              .join("")}
            <circle cx="50" cy="50" r="14" fill="#6b4a1c" />
          </g>
        </svg>
        <p>Cargando tu regalo...</p>
        <div class="progress-track"><div id="progressFill" class="progress-fill"></div></div>
      </div>
    </section>
  `;

  // frases
  let phraseIndex = 0;
  const phraseEl = document.getElementById("loadingPhrase")!;
  const phraseInterval = setInterval(() => {
    phraseEl.classList.remove("visible");
    setTimeout(() => {
      phraseIndex = (phraseIndex + 1) % loadingPhrases.length;
      phraseEl.textContent = loadingPhrases[phraseIndex];
      phraseEl.classList.add("visible");
    }, 400);
  }, 6000);

  // tiempoFrases
  const totalDuration = 8000 + Math.random() * 4000;
  const progressFill = document.getElementById("progressFill")!;
  const start = performance.now();

  function tick(now: number) {
    const elapsed = now - start;
    const pct = Math.min(100, (elapsed / totalDuration) * 100);
    progressFill.style.width = `${pct}%`;
    if (elapsed < totalDuration) {
      requestAnimationFrame(tick);
    } else {
      clearInterval(phraseInterval);
      goToSlide3(name);
    }
  }
  requestAnimationFrame(tick);
}

/* la tercera pa */
function goToSlide3(name: string): void {
  const current = document.querySelector(".slide-2");
  current?.classList.add("fade-out");
  setTimeout(() => renderSlide3(name), 650);
}

function renderSlide3(name: string): void {
  const poemsHTML = poems
    .map(
      (poem) => `
      <article class="poem-card">
        <h3 class="cursive">${poem.title}</h3>
        ${poem.stanzas
          .map(
            (stanza) =>
              `<p class="stanza">${stanza.map((line) => `<span>${line}</span>`).join("")}</p>`
          )
          .join("")}
      </article>`
    )
    .join("");

  app.innerHTML = `
    <section class="slide slide-3 fade-in">
      <button id="settingsToggle" class="settings-toggle" aria-label="Configuración">⚙️</button>
      <div id="settingsPanel" class="settings-panel">
        <div>
          <h4>Color de acento</h4>
          <div class="color-row">
            <input id="colorPicker" type="color" value="${getComputedStyle(document.documentElement).getPropertyValue("--accent-color").trim() || "#FFD700"}" />
            <span>Personaliza el brillo del sitio</span>
          </div>
        </div>
        <div class="player-box">
          <h4>Reproductor</h4>
          <div class="song-title" id="songTitle">—</div>
          <div class="song-artist" id="songArtist">—</div>
          <div class="player-controls">
            <button id="prevBtn">⏮️</button>
            <button id="playBtn">▶️</button>
            <button id="nextBtn">⏭️</button>
            <button id="muteBtn">🔊</button>
          </div>
        </div>
        <button id="exportBtn" class="export-btn">Exportar Postal 📸</button>
      </div>

      <div id="postcardArea" class="hero-section">
        ${createBouquetSVG()}
        <p class="dedication-line">Dedicado a ti, ${escapeHTML(name)}</p>
        <div class="scroll-indicator">⌄</div>
      </div>

      <div class="content-section">
        ${poemsHTML}

        <div class="tech-block">
          <p>Este sitio fue construido con:</p>
          <div class="tech-icons">
            <img class="icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML5" title="HTML5" width="48" height="48" loading="lazy" />
            <img class="icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS3" title="CSS3" width="48" height="48" loading="lazy" />
            <img class="icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" title="TypeScript" width="48" height="48" loading="lazy" />
            <img class="icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" alt="Vite" title="Vite" width="48" height="48" loading="lazy" />
          </div>
        </div>

        <footer class="site-footer">
          <svg class="mini-bouquet" viewBox="0 0 100 100">
            <path d="M50,95 C48,70 48,50 50,30" stroke="#3b6b3f" stroke-width="3" fill="none"/>
            <circle cx="50" cy="25" r="10" fill="var(--accent-color)"/>
            <circle cx="35" cy="35" r="8" fill="var(--accent-color)"/>
            <circle cx="65" cy="35" r="8" fill="var(--accent-color)"/>
          </svg>

          <div class="social-icons">
            <a class="social-link" href="https://www.instagram.com/wlyguti" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="https://cdn.simpleicons.org/instagram" alt="Instagram" loading="lazy" />
            </a>
            <a class="social-link" href="https://twitter.com/wlyguti" target="_blank" rel="noopener noreferrer" aria-label="X">
              <img src="https://cdn.simpleicons.org/x" alt="X" loading="lazy" />
            </a>
            <a class="social-link" href="https://discord.gg/urdll" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <img src="https://cdn.simpleicons.org/discord" alt="Discord" loading="lazy" />
            </a>
            <a class="social-link" href="https://github.com/eternalontop" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src="https://cdn.simpleicons.org/github" alt="GitHub" loading="lazy" />
            </a>
          </div>

          <p class="footer-dedication">
            Dedicado a ti, ${escapeHTML(name)} —
            <span class="signature">Luv by ${AUTHOR_NAME}</span>
          </p>
        </footer>
      </div>
    </section>
  `;

  launchPetalConfetti();

  // Panel config
  const toggleBtn = document.getElementById("settingsToggle")!;
  const panel = document.getElementById("settingsPanel")!;
  toggleBtn.addEventListener("click", () => panel.classList.toggle("open"));

  const colorPicker = document.getElementById("colorPicker") as HTMLInputElement;
  colorPicker.addEventListener("input", (e) => {
    applyAccentColor((e.target as HTMLInputElement).value);
  });

  const player = new AudioPlayer({
    title: document.getElementById("songTitle")!,
    artist: document.getElementById("songArtist")!,
    playBtn: document.getElementById("playBtn") as HTMLButtonElement,
    muteBtn: document.getElementById("muteBtn") as HTMLButtonElement,
  });
  document.getElementById("playBtn")!.addEventListener("click", () => player.togglePlay());
  document.getElementById("nextBtn")!.addEventListener("click", () => player.next());
  document.getElementById("prevBtn")!.addEventListener("click", () => player.prev());
  document.getElementById("muteBtn")!.addEventListener("click", () => player.toggleMute());

  document.getElementById("exportBtn")!.addEventListener("click", async () => {
    const node = document.getElementById("postcardArea")!;
    await exportPostcard(node);
  });
}

function escapeHTML(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

initTheme();
renderSlide1();
