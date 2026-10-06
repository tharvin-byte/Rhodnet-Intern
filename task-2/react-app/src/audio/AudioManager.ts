/* ==========================================================================
   Bang & Olufsen - "Pure" Ambient Audio Synthesizer & Analyser (TypeScript)
   Web Audio API Procedural Luxury Soundscape & Frequency Analyzer
   ========================================================================== */

export class AudioManager {
  audioCtx: AudioContext | null = null;
  isPlaying = false;
  analyser: AnalyserNode | null = null;
  frequencyData: Uint8Array | null = null;

  oscillators: OscillatorNode[] = [];
  gainNode: GainNode | null = null;
  filterNode: BiquadFilterNode | null = null;

  chordFrequencies = [138.59, 207.65, 246.94, 311.13, 329.63];

  initAudioContext() {
    if (this.audioCtx) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.audioCtx = new AudioContextClass();

    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 64;
    this.analyser.smoothingTimeConstant = 0.85;
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    this.filterNode = this.audioCtx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(450, this.audioCtx.currentTime);
    this.filterNode.Q.setValueAtTime(1.5, this.audioCtx.currentTime);

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);

    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
  }

  toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  play() {
    this.initAudioContext();
    if (!this.audioCtx || !this.gainNode || !this.filterNode) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.stopOscillators();

    const now = this.audioCtx.currentTime;

    this.oscillators = this.chordFrequencies.map((freq, i) => {
      const osc = this.audioCtx!.createOscillator();
      const panner = typeof this.audioCtx!.createStereoPanner === 'function' ? this.audioCtx!.createStereoPanner() : null;
      const oscGain = this.audioCtx!.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);
      oscGain.gain.setValueAtTime(0.12 / this.chordFrequencies.length, now);

      if (panner) {
        panner.pan.setValueAtTime((i / (this.chordFrequencies.length - 1)) * 1.2 - 0.6, now);
        osc.connect(panner);
        panner.connect(oscGain);
      } else {
        osc.connect(oscGain);
      }

      oscGain.connect(this.filterNode!);
      osc.start(now);
      return osc;
    });

    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(0.65, now + 1.2);

    this.startFilterBreathing();
    this.isPlaying = true;
  }

  startFilterBreathing() {
    if (!this.audioCtx || !this.filterNode) return;
    const now = this.audioCtx.currentTime;
    this.filterNode.frequency.cancelScheduledValues(now);
    this.filterNode.frequency.setValueAtTime(380, now);
    this.filterNode.frequency.exponentialRampToValueAtTime(750, now + 3.0);
    this.filterNode.frequency.exponentialRampToValueAtTime(380, now + 6.0);
  }

  stop() {
    if (!this.audioCtx || !this.gainNode) return;
    const now = this.audioCtx.currentTime;

    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(0.0001, now + 0.8);

    setTimeout(() => {
      this.stopOscillators();
    }, 850);

    this.isPlaying = false;
  }

  stopOscillators() {
    for (const osc of this.oscillators) {
      try {
        osc.stop();
        osc.disconnect();
      } catch (_e) {}
    }
    this.oscillators = [];
  }

  getFrequencyData(): Uint8Array | null {
    if (!this.analyser || !this.isPlaying || !this.frequencyData) return null;
    this.analyser.getByteFrequencyData(this.frequencyData as unknown as Uint8Array<ArrayBuffer>);
    return this.frequencyData;
  }
}
