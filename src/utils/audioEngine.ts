/**
 * Web Audio API based Dark Trap / Cyber Beat Synthesizer for "破却 -HAKYAKU-"
 * Produces real 808 sub bass, crisp hi-hats, hard snare, and dark minor drone chords.
 */

class DarkBeatEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentStep: number = 0;
  private timerId: number | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private bpm: number = 148;
  private listeners: Set<(step: number, timeSec: number) => void> = new Set();
  private startTime: number = 0;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public addListener(fn: (step: number, timeSec: number) => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentStep = 0;
    this.startTime = Date.now();

    const interval = (60 / this.bpm / 4) * 1000; // 16th note interval
    this.timerId = window.setInterval(() => {
      this.step();
    }, interval);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify(0, 0);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  private step() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const s = this.currentStep % 16;
    const bar = Math.floor(this.currentStep / 16) % 8;

    // 808 Kick on steps 0, 6, 8, 11 (Trap beat groove)
    if (s === 0 || s === 6 || s === 8 || s === 11) {
      this.play808Kick(now, s === 0 ? 1.0 : 0.85);
    }

    // Snare / Clap on step 4 and 12 (standard 2 and 4 in half-time trap)
    if (s === 4 || s === 12) {
      this.playSnare(now, 0.75);
    }

    // Hi-hat on every 16th note with rolling triplets on steps 14, 15
    this.playHiHat(now, s % 2 === 0 ? 0.35 : 0.2);
    if (s === 14 || s === 15) {
      this.playHiHat(now + 0.04, 0.25);
    }

    // Dark Synth Bass / Drone on bar start
    if (s === 0) {
      const chords = [87.31, 87.31, 103.83, 77.78]; // F2, F2, G#2, D#2 (Dark F-minor)
      const freq = chords[bar % chords.length];
      this.playDarkBassline(now, freq);
    }

    const elapsedSec = (Date.now() - this.startTime) / 1000;
    this.notify(this.currentStep, elapsedSec);
    this.currentStep++;
  }

  private notify(step: number, elapsedSec: number) {
    this.listeners.forEach((fn) => fn(step, elapsedSec));
  }

  private play808Kick(time: number, volume: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Deep pitch drop: 160Hz -> 42Hz (Sub bass thump)
    osc.frequency.setValueAtTime(160, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);

    gain.gain.setValueAtTime(volume * 0.9, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.46);
  }

  private playSnare(time: number, volume: number) {
    if (!this.ctx || !this.masterGain) return;
    // White noise buffer
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);

    // Tonal snap
    const snap = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snap.type = 'triangle';
    snap.frequency.setValueAtTime(240, time);
    snap.frequency.exponentialRampToValueAtTime(90, time + 0.08);
    snapGain.gain.setValueAtTime(volume * 0.4, time);
    snapGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    snap.connect(snapGain);
    snapGain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.19);
    snap.start(time);
    snap.stop(time + 0.09);
  }

  private playHiHat(time: number, volume: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(9500, time);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7500, time);

    gain.gain.setValueAtTime(volume * 0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.06);
  }

  private playDarkBassline(time: number, freq: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, time);
    filter.frequency.exponentialRampToValueAtTime(120, time + 0.8);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.linearRampToValueAtTime(0.2, time + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 1.25);
  }
}

export const darkBeatEngine = new DarkBeatEngine();
