/* ==========================================================================
   Bang & Olufsen - Section 1-7 Exploded View & Scroll Orchestration Engine (TypeScript)
   Exact Values and Timing from Stage 1 Inventory
   ========================================================================== */

import * as THREE from 'three';
import { SceneManager } from './SceneManager';
import { HeadphoneModel } from './HeadphoneModel';

export interface StageState {
  progress: number;
  stageIndex: number;
  heroOpacity: number;
  ancOpacity: number;
  lifestyleSlideY: number;
  lifestyleOpacity: number;
  explodedOpacity: number;
  eyebrow: string;
  heading: string;
  desc: string;
  annotationTitle: string;
  annotationDesc: string;
  leaderLine: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    opacity: number;
  } | null;
}

export class ExplodedController {
  sceneManager: SceneManager;
  model: HeadphoneModel;

  progress = 0.0;
  targetProgress = 0.0;
  isPlaying = false;
  durationSec = 20.0;

  tempVec = new THREE.Vector3();
  onStateChange: ((state: StageState) => void) | null = null;

  constructor(sceneManager: SceneManager, headphoneModel: HeadphoneModel) {
    this.sceneManager = sceneManager;
    this.model = headphoneModel;
  }

  setProgress(p: number) {
    this.targetProgress = Math.max(0, Math.min(1, p));
  }

  setPlaying(play: boolean) {
    this.isPlaying = play;
  }

  update(delta: number) {
    if (this.isPlaying) {
      this.targetProgress += delta / this.durationSec;
      if (this.targetProgress >= 1.0) {
        this.targetProgress = 0.0;
      }
    }

    // Calibrated delta-time exponential smoothing (half-life ~0.14s, settle ~0.35s, equivalent to GSAP scrub: 0.6)
    const scrubDamping = 1.0 - Math.exp(-Math.min(delta, 0.1) * 8.5);
    this.progress += (this.targetProgress - this.progress) * scrubDamping;
    this.evaluateStage(this.progress);
  }

  evaluateStage(p: number) {
    const config = {
      modelPos: new THREE.Vector3(0, -0.04, 0),
      modelRot: new THREE.Euler(0.06, 0, 0)
    };

    let explodedAmount = 0.0;
    let heroOpacity = 0.0;
    let ancOpacity = 0.0;
    let lifestyleSlideY = 100;
    let lifestyleOpacity = 0.0;
    let explodedOpacity = 0.0;
    let eyebrow = '';
    let heading = '';
    let desc = '';
    let annotationTitle = '';
    let annotationDesc = '';
    let leaderLine: StageState['leaderLine'] = null;
    let stageIndex = 0;

    // SECTION 1: HERO ("PURE") — p: 0.00 – 0.15 (1.8 vh scroll)
    if (p < 0.15) {
      stageIndex = 0;
      const t = p / 0.15;
      heroOpacity = t < 0.5 ? 1.0 : Math.max(0, 1.0 - (t - 0.5) / 0.5);

      const rotY = t * 0.12;
      config.modelPos.set(0, -0.04, 0);
      config.modelRot.set(0.06, rotY, 0);
      explodedAmount = 0.0;

    // SECTION 2: SOUNDWAVE & ANC — p: 0.15 – 0.30 (1.8 vh scroll)
    } else if (p < 0.30) {
      stageIndex = 1;
      const t = (p - 0.15) / 0.15;
      const easeT = Math.sin(t * Math.PI);
      ancOpacity = Math.min(1, easeT * 1.6);

      const rotY = 0.12 * (1.0 - t);
      config.modelPos.set(0, -0.04, 0);
      config.modelRot.set(0.06, rotY, 0);
      explodedAmount = 0.0;

      const width = typeof window !== 'undefined' ? window.innerWidth : 1440;
      const height = typeof window !== 'undefined' ? window.innerHeight : 900;
      leaderLine = {
        x1: width * 0.56,
        y1: height * 0.68,
        x2: width * 0.56,
        y2: height * 0.50,
        opacity: Math.min(1, easeT * 2)
      };

    // SECTION 3: LIFESTYLE EDITORIAL — p: 0.30 – 0.45 (1.8 vh scroll)
    } else if (p < 0.45) {
      stageIndex = 2;
      const t = (p - 0.30) / 0.15;
      if (t < 0.25) {
        lifestyleSlideY = (1.0 - (t / 0.25)) * 100;
      } else if (t > 0.75) {
        lifestyleSlideY = -((t - 0.75) / 0.25) * 100;
      } else {
        lifestyleSlideY = 0;
      }
      lifestyleOpacity = 1.0;

      const floatY = -0.06 + Math.sin(t * Math.PI) * 1.6;
      const rotY = -Math.PI * 0.48 * (t * t);
      const posX = 0.95 * t;

      config.modelPos.set(posX, floatY, 0);
      config.modelRot.set(0.06 * (1.0 - t), rotY, 0);
      explodedAmount = 0.0;

    // SECTION 4: EXPLODED STAGE A (Cushion) — p: 0.45 – 0.60 (1.8 vh scroll)
    } else if (p < 0.60) {
      stageIndex = 3;
      const t = (p - 0.45) / 0.15;
      explodedOpacity = Math.min(1, t * 2.0);

      eyebrow = 'AUDIO QUALITY';
      heading = 'Wear all day<br>in total comfort';
      desc = 'Expertly crafted using premium materials, Beoplay H95 headphones embrace the ear for a luxurious and superior fit.';
      annotationTitle = 'Earpads';
      annotationDesc = 'Super soft, pressure-relieving earpads in foamed urethane evenly distribute pressure and increase ear pad contact for a stable fit. Comfort is further enhanced by a larger and deeper ergonomic ear space structure.';

      const rotY = -Math.PI * 0.48;
      config.modelPos.set(0.95, -0.06, 0);
      config.modelRot.set(0, rotY, 0);
      explodedAmount = t * 0.35;

      leaderLine = this.computeExplodedLeaderLine(this.model.layerCushion, 'cushion');

    // SECTION 5: EXPLODED STAGE B (Touch & PCB) — p: 0.60 – 0.75 (1.8 vh scroll)
    } else if (p < 0.75) {
      stageIndex = 4;
      const t = (p - 0.60) / 0.15;
      explodedOpacity = 1.0;

      eyebrow = 'AUDIO QUALITY';
      heading = 'Control at your<br>fingertip';
      desc = 'Super soft, pressure-relieving earpads in foamed urethane evenly distribute pressure and increase ear pad contact for a stable fit.';
      annotationTitle = 'Quick Attention';
      annotationDesc = 'Need to quickly hear voices or sounds around you? Just place your hand over the housing to instantly turn your music volume down and let ambient sound in.';

      const rotY = -Math.PI * 0.48 - (t * 0.04);
      config.modelPos.set(0.95, -0.06, 0);
      config.modelRot.set(0, rotY, 0);
      explodedAmount = 0.35 + t * 0.35;

      leaderLine = this.computeExplodedLeaderLine(this.model.layerPCB, 'pcb');

    // SECTION 6: EXPLODED STAGE C (Titanium Driver) — p: 0.75 – 0.90 (1.8 vh scroll)
    } else if (p < 0.90) {
      stageIndex = 5;
      const t = (p - 0.75) / 0.15;
      explodedOpacity = 1.0;

      eyebrow = 'ACHIEVE SACINGS WITHOUT';
      heading = 'Wireless freedom,<br>premium sound';
      desc = 'LDAC transmits approximately three times more data (at the maximum transfer rate of 990 kbps) than conventional BLUETOOTH® audio, allowing you to enjoy High-Resolution Audio content in exceptional quality.';
      annotationTitle = 'Powerful bass';
      annotationDesc = 'Change the track, turn the volume up or down and take or make calls by tapping or swiping the panel with your fingertip.';

      const rotY = -Math.PI * 0.52;
      config.modelPos.set(0.95, -0.06, 0);
      config.modelRot.set(0, rotY, 0);
      explodedAmount = 0.70 + t * 0.30;

      leaderLine = this.computeExplodedLeaderLine(this.model.layerDriver, 'driver');

    // SECTION 7: REASSEMBLY & LOOP FINALE — p: 0.90 – 1.00 (1.2 vh scroll)
    } else {
      stageIndex = 6;
      const t = (p - 0.90) / 0.10;
      const easeT = Math.sin(t * Math.PI * 0.5);

      explodedAmount = Math.max(0, 1.0 - easeT * 1.3);
      const posX = 0.95 * (1.0 - easeT);
      const rotY = -Math.PI * 0.52 * (1.0 - easeT);
      config.modelPos.set(posX, -0.06, 0);
      config.modelRot.set(0.06 * easeT, rotY, 0);

      explodedOpacity = Math.max(0, 1.0 - easeT * 2);
      if (easeT > 0.3) {
        heroOpacity = (easeT - 0.3) / 0.7;
      }
    }

    // Blend right cup angle for profile viewing
    let rightCupRotY = -0.08;
    if (p >= 0.40 && p < 0.50) {
      const t = (p - 0.40) / 0.10;
      rightCupRotY = -0.08 * (1.0 - t);
    } else if (p >= 0.50 && p < 0.90) {
      rightCupRotY = 0.0;
    } else if (p >= 0.90) {
      const t = (p - 0.90) / 0.10;
      rightCupRotY = -0.08 * Math.sin(t * Math.PI * 0.5);
    }
    if (this.model && this.model.rightCupRig) {
      this.model.rightCupRig.rotation.y = rightCupRotY;
    }

    this.sceneManager.updateChoreography(config);
    this.model.updateExplodedProgress(explodedAmount);

    if (this.onStateChange) {
      this.onStateChange({
        progress: p,
        stageIndex,
        heroOpacity,
        ancOpacity,
        lifestyleSlideY,
        lifestyleOpacity,
        explodedOpacity,
        eyebrow,
        heading,
        desc,
        annotationTitle,
        annotationDesc,
        leaderLine
      });
    }
  }

  computeExplodedLeaderLine(threeGroup: THREE.Group | undefined, layerKey: string): StageState['leaderLine'] {
    if (!threeGroup || !this.sceneManager.camera) return null;

    threeGroup.getWorldPosition(this.tempVec);

    if (layerKey === 'cushion') {
      this.tempVec.x += 0.12;
      this.tempVec.y -= 0.18;
    } else if (layerKey === 'pcb') {
      this.tempVec.x -= 0.05;
      this.tempVec.y -= 0.28;
    } else if (layerKey === 'driver') {
      this.tempVec.x += 0.02;
      this.tempVec.y -= 0.20;
    }

    const projected = this.tempVec.clone().project(this.sceneManager.camera);
    if (projected.z >= 1) return null;

    const width = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const height = typeof window !== 'undefined' ? window.innerHeight : 900;

    const beaconX = (projected.x * 0.5 + 0.5) * width;
    const beaconY = (-(projected.y * 0.5) + 0.5) * height;

    let startX = width * 0.28;
    let startY = height * 0.58;

    if (typeof document !== 'undefined') {
      const anchorEl = document.getElementById('annotation-line-anchor');
      if (anchorEl) {
        const rect = anchorEl.getBoundingClientRect();
        startX = rect.right;
        startY = rect.top + rect.height * 0.5;
      }
    }

    return {
      x1: startX,
      y1: startY,
      x2: beaconX,
      y2: beaconY,
      opacity: 1.0
    };
  }
}
