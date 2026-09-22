export interface Song {
  title: string;
  artist: string;
  src: string;
}

/**
 * pon 3 archivos .mp3 en /public/audio/ con estos nombres exactos,
 * o edita las rutas de abajo para que apunten a tus archivos
 */
export const songs: Song[] = [
  { title: "Hide", artist: "Juice WRLD", src: "/audio/Hide.mp3" },
  { title: "Flores Amarillas", artist: "Artista 2", src: "/audio/Flores-Amarillas.mp3" },
  { title: "Lo Que Siento", artist: "Cuco", src: "/audio/Lo-Que-Siento.mp3" },
];
