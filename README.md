# 🌼 Flores Amarillas

hice esto con la intencion de demostrar cariño de una forma virtual y para aquellos que no pueden demostrarlo fisicamente. with love to nt

## 🚀 Instalación

```bash
npm install
npm run dev
```

Abre la URL que te muestre Vite (por defecto `http://localhost:5173`).

## 📦 Build de producción

```bash
npm run build
npm run preview
```

Los archivos finales quedan en `/dist`, listos para subir a cualquier hosting estático (Vercel, Netlify, GitHub Pages, etc).

## 🎵 Agregar tus canciones

Coloca 3 archivos `.mp3` dentro de `public/audio/` con estos nombres:

```
public/audio/cancion-1.mp3
public/audio/cancion-2.mp3
public/audio/cancion-3.mp3
```

Y edita `src/data/songs.ts` para poner el título y artista real de cada una.

## ✍️ Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Tu nombre (autoría / firma) | `AUTHOR_NAME` en `src/main.ts` |
| Poemas | `src/data/poems.ts` |
| Canciones | `src/data/songs.ts` |
| Color de acento por defecto | `--accent-color` en `src/style.css` (`:root`) |
| Redes sociales del footer | enlaces `<a href="#">` en `src/main.ts` (sección `renderSlide3`) |


## 🗂️ Estructura del proyecto

```
flores-amarillas/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── audio/            ← tus 3 mp3 van aquí
└── src/
    ├── main.ts           ← orquestador de las 3 slides
    ├── style.css         ← estilos centralizados (glassmorphism, variables, keyframes)
    ├── data/
    │   ├── poems.ts
    │   └── songs.ts
    └── modules/
        ├── flower.ts          ← SVG flor individual (Slide 1)
        ├── bouquet.ts         ← SVG ramo completo animado (Slide 3)
        ├── confetti.ts        ← lanzamiento de confeti (canvas-confetti)
        ├── audioPlayer.ts     ← reproductor con persistencia de última canción
        ├── theme.ts           ← color picker + persistencia del accent color
        └── exportPostcard.ts  ← exportación de postal PNG con html2canvas
```

## 🛠️ Tecnologías

HTML5 · CSS3 (Glassmorphism, variables CSS, Grid/Flexbox, keyframes) · TypeScript · Vite · SVG animado · Canvas API (`canvas-confetti`) · `html2canvas` · `localStorage`

## luv by @ilyguti
