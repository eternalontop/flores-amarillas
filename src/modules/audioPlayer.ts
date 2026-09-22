import { songs } from "../data/songs";

const LAST_SONG_KEY = "flores:lastSongIndex";

export class AudioPlayer {
  private audio = new Audio();
  private index = 0;
  private muted = false;

  constructor(
    private els: {
      title: HTMLElement;
      artist: HTMLElement;
      playBtn: HTMLButtonElement;
      muteBtn: HTMLButtonElement;
    }
  ) {
    const saved = localStorage.getItem(LAST_SONG_KEY);
    this.index = saved ? Math.min(Number(saved), songs.length - 1) : 0;
    this.loadTrack(false);

    this.audio.addEventListener("ended", () => this.next());
  }

  private loadTrack(autoplay: boolean): void {
    const song = songs[this.index];
    this.audio.src = song.src;
    this.els.title.textContent = song.title;
    this.els.artist.textContent = song.artist;
    localStorage.setItem(LAST_SONG_KEY, String(this.index));
    if (autoplay) this.audio.play().catch(() => undefined);
    this.updatePlayIcon();
  }

  togglePlay(): void {
    if (this.audio.paused) {
      this.audio.play().catch(() => undefined);
    } else {
      this.audio.pause();
    }
    this.updatePlayIcon();
  }

  next(): void {
    this.index = (this.index + 1) % songs.length;
    this.loadTrack(true);
  }

  prev(): void {
    this.index = (this.index - 1 + songs.length) % songs.length;
    this.loadTrack(true);
  }

  toggleMute(): void {
    this.muted = !this.muted;
    this.audio.muted = this.muted;
    this.els.muteBtn.textContent = this.muted ? "🔇" : "🔊";
  }

  private updatePlayIcon(): void {
    this.els.playBtn.textContent = this.audio.paused ? "▶️" : "⏸️";
  }
}
