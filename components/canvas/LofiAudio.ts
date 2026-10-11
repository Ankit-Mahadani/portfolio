// Lightweight Web Audio API synthesizer for ambient lofi tones and vinyl noise
class LofiAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private noiseNode: AudioNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isPlaying = true;

      // Start periodic gentle jazz / lofi chords (minor 7th chords)
      const chords = [
        [261.63, 311.13, 392.0, 466.16], // C minor 7
        [220.0, 261.63, 329.63, 392.0],  // A minor 7
        [349.23, 415.3, 523.25, 622.25], // F minor 7
        [196.0, 233.08, 293.66, 349.23], // G minor 7
      ];

      let chordIndex = 0;
      const playNextChord = () => {
        if (!this.ctx || !this.isPlaying) return;
        const notes = chords[chordIndex % chords.length]!;
        chordIndex++;

        notes.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          // Gentle low-pass warm filter
          const filter = this.ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(800 + idx * 100, this.ctx.currentTime);

          gain.gain.setValueAtTime(0, this.ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 4.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(this.ctx.currentTime);
          osc.stop(this.ctx.currentTime + 5.0);
        });
      };

      playNextChord();
      this.intervalId = window.setInterval(playNextChord, 4500);
    } catch {
      this.isPlaying = false;
    }
  }

  private stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.isPlaying = false;
  }
}

export const lofiAudio = new LofiAudioEngine();
