import confetti from "canvas-confetti";

export function launchPetalConfetti(): void {
  const accent = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-color")
    .trim();

  const colors = [accent, "#fff6d5", "#e6c200"];

  const duration = 1600;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.6 },
      colors,
      shapes: ["circle"],
      scalar: 1.1,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.6 },
      colors,
      shapes: ["circle"],
      scalar: 1.1,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  confetti({
    particleCount: 90,
    spread: 100,
    origin: { y: 0.5 },
    colors,
    startVelocity: 35,
  });
}
