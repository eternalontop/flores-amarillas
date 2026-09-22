const ACCENT_KEY = "flores:accentColor";
const DEFAULT_ACCENT = "#FFD700";

function darken(hex: string, amount = 0.35): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.floor(((num >> 16) & 0xff) * (1 - amount)));
  const g = Math.max(0, Math.floor(((num >> 8) & 0xff) * (1 - amount)));
  const b = Math.max(0, Math.floor((num & 0xff) * (1 - amount)));
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

export function applyAccentColor(hex: string): void {
  document.documentElement.style.setProperty("--accent-color", hex);
  document.documentElement.style.setProperty("--accent-dark", darken(hex));
  localStorage.setItem(ACCENT_KEY, hex);
}

export function initTheme(): string {
  const saved = localStorage.getItem(ACCENT_KEY) || DEFAULT_ACCENT;
  applyAccentColor(saved);
  return saved;
}
