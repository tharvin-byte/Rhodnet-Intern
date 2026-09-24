/* ==========================================================================
   Bang & Olufsen - Section 2 Acoustic Frequency & ANC Waveform Visualizer (TypeScript)
   ========================================================================== */

interface WaveRibbon {
  freq: number;
  speed: number;
  amp: number;
  color: string;
  lineWidth: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  alpha: number;
}

export class SoundwaveVisualizer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  stageAlpha = 0.0;
  intensity = 0.6;
  targetIntensity = 0.6;
  time = 0;
  width = 0;
  height = 0;
  isAudioPlaying = false;

  waves: WaveRibbon[] = [
    { freq: 0.008, speed: 0.030, amp: 42, color: 'rgba(255, 255, 255, 0.45)', lineWidth: 1.2 },
    { freq: 0.012, speed: 0.040, amp: 55, color: '#f59e0b', lineWidth: 1.8 },
    { freq: 0.014, speed: 0.048, amp: 62, color: '#ef4444', lineWidth: 2.0 },
    { freq: 0.010, speed: 0.035, amp: 48, color: '#10b981', lineWidth: 1.6 },
    { freq: 0.006, speed: 0.022, amp: 30, color: 'rgba(212, 194, 167, 0.4)', lineWidth: 1.0 },
    { freq: 0.016, speed: 0.055, amp: 68, color: 'rgba(255, 255, 255, 0.7)', lineWidth: 1.4 }
  ];

  particles: Particle[] = [];

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.initParticles();
    this.onResize();
  }

  initParticles() {
    this.particles = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * 1200,
        y: (Math.random() - 0.5) * 80,
        radius: 1.0 + Math.random() * 1.8,
        speedX: 0.3 + Math.random() * 0.7,
        alpha: 0.2 + Math.random() * 0.6
      });
    }
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    }
  }

  clearCanvas() {
    if (!this.ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.scale(dpr, dpr);
  }

  setStageAlpha(alpha: number) {
    this.stageAlpha = Math.max(0, Math.min(1, alpha));
    if (this.stageAlpha <= 0.001) {
      this.clearCanvas();
    }
  }

  setAudioPlaying(playing: boolean) {
    this.isAudioPlaying = playing;
    this.targetIntensity = playing ? 1.0 : 0.6;
  }

  update(freqData: Uint8Array | null) {
    if (!this.ctx) return;

    this.clearCanvas();

    if (this.stageAlpha <= 0.001) return;

    this.intensity += (this.targetIntensity - this.intensity) * 0.05;
    this.time += 0.02 * this.intensity;

    let audioBoost = 1.0;
    if (freqData && freqData.length > 0) {
      let sum = 0;
      for (let i = 0; i < 32; i++) {
        sum += freqData[i];
      }
      audioBoost = 1.0 + (sum / 32 / 255) * 0.8;
    }

    const centerY = this.height * 0.50;
    const startX = this.width * 0.10;
    const endX = this.width * 0.90;
    const waveLength = endX - startX;

    this.ctx.save();
    this.ctx.globalAlpha = this.stageAlpha;

    this.waves.forEach((w) => {
      if (!this.ctx) return;
      this.ctx.beginPath();
      this.ctx.strokeStyle = w.color;
      this.ctx.lineWidth = w.lineWidth;
      this.ctx.lineCap = 'round';

      for (let x = startX; x <= endX; x += 3) {
        const normX = (x - startX) / waveLength;
        const envelope = Math.sin(normX * Math.PI);
        const y = centerY + Math.sin(x * w.freq + this.time * (w.speed * 60)) * (w.amp * this.intensity * audioBoost) * envelope;

        if (x === startX) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.stroke();
    });

    this.ctx.restore();
  }
}
