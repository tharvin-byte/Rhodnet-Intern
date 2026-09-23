/* ==========================================================================
   Bang & Olufsen - Section 2 Acoustic Frequency & ANC Waveform Visualizer
   Replicating the Multi-Strand Harmonic Waves from frame_02s.png - frame_03s.png
   ========================================================================== */

export class SoundwaveVisualizer {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');

    this.isActive = false;
    this.stageAlpha = 0.0; // Controlled by timeline progress in Section 2
    this.intensity = 0.6;
    this.targetIntensity = 0.6;
    this.time = 0;

    // Harmonic wave ribbons
    this.waves = [
      { freq: 0.008, speed: 0.030, amp: 42, color: 'rgba(255, 255, 255, 0.45)', lineWidth: 1.2 },
      { freq: 0.012, speed: 0.040, amp: 55, color: '#f59e0b', lineWidth: 1.8 }, // warm amber peak
      { freq: 0.014, speed: 0.048, amp: 62, color: '#ef4444', lineWidth: 2.0 }, // coral red peak
      { freq: 0.010, speed: 0.035, amp: 48, color: '#10b981', lineWidth: 1.6 }, // emerald acoustic peak
      { freq: 0.006, speed: 0.022, amp: 30, color: 'rgba(212, 194, 167, 0.4)', lineWidth: 1.0 },
      { freq: 0.016, speed: 0.055, amp: 68, color: 'rgba(255, 255, 255, 0.7)', lineWidth: 1.4 }
    ];

    // Floating particles
    this.particles = [];
    this.initParticles();

    window.addEventListener('resize', () => this.onResize());
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

    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  setStageAlpha(alpha) {
    this.stageAlpha = Math.max(0, Math.min(1, alpha));
  }

  setAudioPlaying(isPlaying) {
    this.isActive = isPlaying;
    this.targetIntensity = isPlaying ? 1.2 : 0.6;
  }

  update(frequencyData = null) {
    // If not visible in stage and not playing, skip rendering to save GPU
    const totalOpacity = Math.max(this.stageAlpha, this.isActive ? 0.75 : 0.0);
    if (totalOpacity < 0.01) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      return;
    }

    this.time += 1;
    this.intensity += (this.targetIntensity - this.intensity) * 0.06;

    let audioBoost = 1.0;
    if (frequencyData && frequencyData.length > 0) {
      let sum = 0;
      for (let i = 0; i < 32; i++) sum += frequencyData[i];
      audioBoost = 0.8 + (sum / 32 / 255) * 1.6;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    const centerY = this.height * 0.5;
    const centerCutoutRadius = Math.min(this.width * 0.22, 280);

    this.ctx.save();
    this.ctx.globalAlpha = totalOpacity;

    // Draw multi-strand waveform
    for (let wIdx = 0; wIdx < this.waves.length; wIdx++) {
      const wave = this.waves[wIdx];
      const currentAmp = wave.amp * this.intensity * audioBoost;

      this.ctx.beginPath();
      this.ctx.lineWidth = wave.lineWidth;
      this.ctx.strokeStyle = wave.color;

      for (let x = 0; x <= this.width; x += 4) {
        const distFromCenter = Math.abs(x - this.width * 0.5);

        // Gentle attenuation inside earcup zone
        let attenuation = 1.0;
        if (distFromCenter < centerCutoutRadius) {
          attenuation = Math.pow(distFromCenter / centerCutoutRadius, 1.4) * 0.65 + 0.35;
        }

        const edgeTaper = Math.sin((x / this.width) * Math.PI);

        // Sinusoidal packet modulation
        const packet = Math.sin(x * 0.005 + this.time * 0.015);
        const y = centerY + Math.sin(x * wave.freq + this.time * wave.speed) * packet * currentAmp * attenuation * edgeTaper;

        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.stroke();
    }

    // Render floating particle dust
    for (const p of this.particles) {
      p.x += p.speedX * (this.isActive ? 1.4 : 0.8);
      if (p.x > this.width) p.x = 0;

      const pWaveY = Math.sin(p.x * 0.01 + this.time * 0.02) * 18 * this.intensity;
      const py = centerY + p.y + pWaveY;

      this.ctx.beginPath();
      this.ctx.arc(p.x, py, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(212, 194, 167, ${p.alpha * 0.8})`;
      this.ctx.fill();
    }

    this.ctx.restore();
  }
}
