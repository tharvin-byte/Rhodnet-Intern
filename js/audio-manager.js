/* ==========================================================================
   Bang & Olufsen - "Pure" Ambient Audio Synthesizer & Analyser
   Web Audio API Procedural Luxury Soundscape & Frequency Analyzer
   ========================================================================== */

export class AudioManager {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.analyser = null;
    this.frequencyData = null;

    // Synth nodes
    this.oscillators = [];
    this.gainNode = null;
    this.filterNode = null;

    // Warm luxury chord frequencies: C# minor 9 (C#3, G#3, B3, D#4, E4)
    this.chordFrequencies = [138.59, 207.65, 246.94, 311.13, 329.63];
  }

  initAudioContext() {
    if (this.audioCtx) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    // Master Analyser
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 64;
    this.analyser.smoothingTimeConstant = 0.85;
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    // Low-pass filter for warm acoustic character
    this.filterNode = this.audioCtx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(450, this.audioCtx.currentTime);
    this.filterNode.Q.setValueAtTime(1.5, this.audioCtx.currentTime);

    // Master Gain
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);

    // Routing: Filter -> Gain -> Analyser -> Output
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  play() {
    this.initAudioContext();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    // Stop any existing voices
    this.stopOscillators();

    const now = this.audioCtx.currentTime;

    // Create polyphonic oscillators with subtle detuning and panning
    this.oscillators = this.chordFrequencies.map((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const panner = this.audioCtx.createStereoPanner ? this.audioCtx.createStereoPanner() : null;
      const oscGain = this.audioCtx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle slow pitch drift (chorus effect)
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

      oscGain.gain.setValueAtTime(0.12 / this.chordFrequencies.length, now);

      if (panner) {
        panner.pan.setValueAtTime((i / (this.chordFrequencies.length - 1)) * 1.2 - 0.6, now);
        osc.connect(panner);
        panner.connect(oscGain);
      } else {
        osc.connect(oscGain);
      }

      oscGain.connect(this.filterNode);
      osc.start(now);
      return osc;
    });

    // Fade in master gain smoothly
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(0.65, now + 1.2);

    // LFO modulation on filter for subtle breath
    this.startFilterBreathing();

    this.isPlaying = true;
  }

  startFilterBreathing() {
    if (!this.audioCtx || !this.filterNode) return;
    const now = this.audioCtx.currentTime;
    this.filterNode.frequency.cancelScheduledValues(now);
    // Slow swell from 350Hz to 750Hz
    this.filterNode.frequency.setValueAtTime(380, now);
    this.filterNode.frequency.exponentialRampToValueAtTime(750, now + 3.0);
    this.filterNode.frequency.exponentialRampToValueAtTime(380, now + 6.0);
  }

  stop() {
    if (!this.audioCtx || !this.gainNode) return;
    const now = this.audioCtx.currentTime;

    // Fade out
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
      } catch (e) {}
    }
    this.oscillators = [];
  }

  getFrequencyData() {
    if (!this.analyser || !this.isPlaying) return null;
    this.analyser.getByteFrequencyData(this.frequencyData);
    return this.frequencyData;
  }
}
