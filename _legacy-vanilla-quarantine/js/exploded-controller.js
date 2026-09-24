/* ==========================================================================
   Bang & Olufsen - Section 1-7 Exploded View & Scroll Orchestration Engine
   Pixel-Accurately Choreographs 20-Second Timeline, Stages & Leader Lines
   ========================================================================== */

import * as THREE from 'three';

export class ExplodedController {
  constructor(sceneManager, headphoneModel, visualizer) {
    this.sceneManager = sceneManager;
    this.model = headphoneModel;
    this.visualizer = visualizer;

    this.svg = document.getElementById('leader-svg');

    // Stage DOM elements
    this.stageHero = document.getElementById('stage-hero');
    this.stageAnc = document.getElementById('stage-anc');
    this.stageLifestyle = document.getElementById('stage-lifestyle');
    this.stageExploded = document.getElementById('stage-exploded');

    // Dynamic copy elements in Stage Exploded
    this.explodedEyebrow = document.getElementById('exploded-eyebrow');
    this.explodedHeading = document.getElementById('exploded-heading');
    this.explodedDesc = document.getElementById('exploded-desc');
    this.annotationTitle = document.getElementById('annotation-title');
    this.annotationDesc = document.getElementById('annotation-desc');
    this.annotationBlock = document.getElementById('annotation-block');

    // Stage pagination dots
    this.stageDots = document.querySelectorAll('.stage-dot');

    // Beacon point
    this.beaconDot = document.getElementById('exploded-beacon');

    this.progress = 0.0;
    this.targetProgress = 0.0;
    this.isPlaying = false;
    this.durationSec = 20.0; // 20-second timeline duration

    this.tempVec = new THREE.Vector3();
    this.initStageDotsInteraction();
  }

  initStageDotsInteraction() {
    if (!this.stageDots || this.stageDots.length === 0) return;
    const stageProgresses = [0.0, 0.20, 0.35, 0.50, 0.66, 0.82];
    this.stageDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        this.setProgress(stageProgresses[idx] || 0.0);
      });
    });
  }

  setProgress(p) {
    this.targetProgress = Math.max(0, Math.min(1, p));
  }

  setPlaying(play) {
    this.isPlaying = play;
  }

  update(delta) {
    if (this.isPlaying) {
      this.targetProgress += delta / this.durationSec;
      if (this.targetProgress >= 1.0) {
        this.targetProgress = 0.0; // Loop seamlessly
      }
    }

    // Silky smooth inertia lerping (0.08 factor provides buttery momentum)
    this.progress += (this.targetProgress - this.progress) * 0.08;
    const p = this.progress;

    this.updateTimelineUI(p);
    this.evaluateStage(p);
  }

  updateTimelineUI(p) {
    if (this.stageDots && this.stageDots.length > 0) {
      let activeIdx = 0;
      if (p < 0.14) activeIdx = 0;
      else if (p < 0.28) activeIdx = 1;
      else if (p < 0.42) activeIdx = 2;
      else if (p < 0.58) activeIdx = 3;
      else if (p < 0.74) activeIdx = 4;
      else activeIdx = 5;

      this.stageDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    }
  }

  evaluateStage(p) {
    const config = {
      modelPos: new THREE.Vector3(0, -0.04, 0),
      modelRot: new THREE.Euler(0.06, 0, 0)
    };

    let explodedAmount = 0.0;
    let visualizerAlpha = 0.0;

    // Reset default stage styles
    if (this.stageHero) this.stageHero.style.opacity = '0';
    if (this.stageAnc) this.stageAnc.style.opacity = '0';
    if (this.stageLifestyle) {
      this.stageLifestyle.style.transform = 'translateY(100%)';
      this.stageLifestyle.style.opacity = '0';
    }
    if (this.stageExploded) this.stageExploded.style.opacity = '0';
    if (this.beaconDot) this.beaconDot.style.display = 'none';

    // -------------------------------------------------------------
    // SECTION 1: HERO ("PURE") — 0:00 to 0:02s (p: 0.00 – 0.14)
    // -------------------------------------------------------------
    if (p < 0.14) {
      const t = p / 0.14;
      const heroOpacity = Math.max(0, 1 - t * 1.5);

      if (this.stageHero) {
        this.stageHero.style.opacity = `${heroOpacity}`;
      }

      // Smooth subtle turntable spin on Y-axis
      const rotY = t * 0.12;
      config.modelPos.set(0, -0.04, 0);
      config.modelRot.set(0.06, rotY, 0);
      visualizerAlpha = 0.0;
      explodedAmount = 0.0;
      if (this.svg) this.svg.innerHTML = '';

      // -------------------------------------------------------------
      // SECTION 2: SOUNDWAVE & ANC — 0:02 to 0:04.5s (p: 0.14 – 0.28)
      // -------------------------------------------------------------
    } else if (p < 0.28) {
      const t = (p - 0.14) / 0.14;
      const easeT = Math.sin(t * Math.PI);

      if (this.stageAnc) {
        this.stageAnc.style.opacity = `${Math.min(1, easeT * 1.6)}`;
      }

      // Smooth wave alpha fade in & out
      visualizerAlpha = Math.min(1, easeT * 1.6);

      // Centered frontal perspective with gentle turntable breath
      const rotY = 0.12 * (1.0 - t);
      config.modelPos.set(0, -0.04, 0);
      config.modelRot.set(0.06, rotY, 0);
      explodedAmount = 0.0;

      // Draw vertical drop line from soundwave node to ANC card
      this.renderVerticalAncLeaderLine(easeT);

      // -------------------------------------------------------------
      // SECTION 3: LIFESTYLE EDITORIAL — 0:04.5 to 0:07s (p: 0.28 – 0.42)
      // -------------------------------------------------------------
    } else if (p < 0.42) {
      const t = (p - 0.28) / 0.14;
      let slideY = 0;

      if (t < 0.3) {
        // Sliding in smoothly from bottom
        slideY = (1.0 - (t / 0.3)) * 100;
      } else if (t > 0.7) {
        // Sliding out smoothly to top
        slideY = -((t - 0.7) / 0.3) * 100;
      }

      if (this.stageLifestyle) {
        this.stageLifestyle.style.transform = `translateY(${slideY}%)`;
        this.stageLifestyle.style.opacity = '1';
        this.stageLifestyle.style.pointerEvents = Math.abs(slideY) < 15 ? 'auto' : 'none';
      }

      // Model glides up gracefully with editorial card rather than jumping offscreen
      const floatY = -0.06 + Math.sin(t * Math.PI) * 1.6;
      const rotY = -Math.PI * 0.48 * (t * t);
      const posX = 0.95 * t;

      config.modelPos.set(posX, floatY, 0);
      config.modelRot.set(0.06 * (1.0 - t), rotY, 0);
      explodedAmount = 0.0;
      if (this.svg) this.svg.innerHTML = '';

      // -------------------------------------------------------------
      // SECTION 4: EXPLODED STAGE A (Cushion) — 0:07 to 0:10.5s (p: 0.42 – 0.58)
      // -------------------------------------------------------------
    } else if (p < 0.58) {
      const t = (p - 0.42) / 0.16;
      const easeIn = Math.min(1, t * 2.0);

      if (this.stageExploded) {
        this.stageExploded.style.opacity = `${easeIn}`;
      }

      this.explodedEyebrow.textContent = 'AUDIO QUALITY';
      this.explodedHeading.innerHTML = 'Wear all day<br>in total comfort';
      this.explodedDesc.textContent = 'Expertly crafted using premium materials, Beoplay H95 headphones embrace the ear for a luxurious and superior fit.';
      this.annotationTitle.textContent = 'Earpads';
      this.annotationDesc.textContent = 'Super soft, pressure-relieving earpads in foamed urethane evenly distribute pressure and increase ear pad contact for a stable fit. Comfort is further enhanced by a larger and deeper ergonomic ear space structure.';

      // Model sits stably on right side with smooth lateral profile
      const rotY = -Math.PI * 0.48;
      config.modelPos.set(0.95, -0.06, 0);
      config.modelRot.set(0, rotY, 0);

      // Continuous smooth cushion expansion
      explodedAmount = t * 0.35;

      // Connect leader line to cushion
      this.renderExplodedLeaderLine(this.model.layerCushion, 'cushion');

      // -------------------------------------------------------------
      // SECTION 5: EXPLODED STAGE B (Touch & PCB) — 0:10.5 to 0:14s (p: 0.58 – 0.74)
      // -------------------------------------------------------------
    } else if (p < 0.74) {
      const t = (p - 0.58) / 0.16;

      if (this.stageExploded) {
        this.stageExploded.style.opacity = '1';
      }

      this.explodedEyebrow.textContent = 'AUDIO QUALITY';
      this.explodedHeading.innerHTML = 'Control at your<br>fingertip';
      this.explodedDesc.textContent = 'Super soft, pressure-relieving earpads in foamed urethane evenly distribute pressure and increase ear pad contact for a stable fit.';
      this.annotationTitle.textContent = 'Quick Attention';
      this.annotationDesc.textContent = 'Need to quickly hear voices or sounds around you? Just place your hand over the housing to instantly turn your music volume down and let ambient sound in.';

      const rotY = -Math.PI * 0.48 - (t * 0.04);
      config.modelPos.set(0.95, -0.06, 0);
      config.modelRot.set(0, rotY, 0);

      // Continuous layer expansion from 0.35 to 0.70
      explodedAmount = 0.35 + t * 0.35;

      // Connect leader line to PCB circuit layer
      this.renderExplodedLeaderLine(this.model.layerPCB, 'pcb');

      // -------------------------------------------------------------
      // SECTION 6: EXPLODED STAGE C (Titanium Driver) — 0:14 to 0:17.5s (p: 0.74 – 0.88)
      // -------------------------------------------------------------
    } else if (p < 0.88) {
      const t = (p - 0.74) / 0.14;

      if (this.stageExploded) {
        this.stageExploded.style.opacity = '1';
      }

      this.explodedEyebrow.textContent = 'ACHIEVE SACINGS WITHOUT';
      this.explodedHeading.innerHTML = 'Wireless freedom,<br>premium sound';
      this.explodedDesc.textContent = 'LDAC transmits approximately three times more data (at the maximum transfer rate of 990 kbps) than conventional BLUETOOTH® audio, allowing you to enjoy High-Resolution Audio content in exceptional quality.';
      this.annotationTitle.textContent = 'Powerful bass';
      this.annotationDesc.textContent = 'Change the track, turn the volume up or down and take or make calls by tapping or swiping the panel with your fingertip.';

      const rotY = -Math.PI * 0.52;
      config.modelPos.set(0.95, -0.06, 0);
      config.modelRot.set(0, rotY, 0);

      // Full layer expansion from 0.70 to 1.00
      explodedAmount = 0.70 + t * 0.30;

      // Connect leader line to Driver layer
      this.renderExplodedLeaderLine(this.model.layerDriver, 'driver');

      // -------------------------------------------------------------
      // SECTION 7: REASSEMBLY & LOOP FINALE — 0:17.5 to 0:20s (p: 0.88 – 1.00)
      // -------------------------------------------------------------
    } else {
      const t = (p - 0.88) / 0.12;
      const easeT = Math.sin(t * Math.PI * 0.5);

      // Exploded layers smoothly collapse back
      explodedAmount = Math.max(0, 1.0 - easeT * 1.3);

      // Headphone sweeps laterally across to center and spins back to 0°
      const posX = 0.95 * (1.0 - easeT);
      const rotY = -Math.PI * 0.52 * (1.0 - easeT);
      config.modelPos.set(posX, -0.06, 0);
      config.modelRot.set(0.06 * easeT, rotY, 0);

      if (this.stageExploded) {
        this.stageExploded.style.opacity = `${Math.max(0, 1.0 - easeT * 2)}`;
      }

      // Hero restores
      if (this.stageHero && easeT > 0.3) {
        this.stageHero.style.opacity = `${(easeT - 0.3) / 0.7}`;
      }

      if (this.svg) this.svg.innerHTML = '';
    }

    // Keep right cup parallel in hero (-0.08) and blend to 0.0 in exploded lateral profile
    let rightCupRotY = -0.08;
    if (p >= 0.38 && p < 0.50) {
      const t = (p - 0.38) / 0.12;
      rightCupRotY = -0.08 * (1.0 - t);
    } else if (p >= 0.50 && p < 0.88) {
      rightCupRotY = 0.0;
    } else if (p >= 0.88) {
      const t = (p - 0.88) / 0.12;
      rightCupRotY = -0.08 * Math.sin(t * Math.PI * 0.5);
    }
    if (this.model && this.model.rightCupRig) {
      this.model.rightCupRig.rotation.y = rightCupRotY;
    }

    this.sceneManager.updateChoreography(config);
    this.model.updateExplodedProgress(explodedAmount);
    if (this.visualizer) this.visualizer.setStageAlpha(visualizerAlpha);
  }

  renderVerticalAncLeaderLine(easeT) {
    if (!this.svg) return;
    const width = this.svg.clientWidth || window.innerWidth;
    const height = this.svg.clientHeight || window.innerHeight;

    // Center wave node coordinate
    const nodeX = width * 0.56;
    const nodeY = height * 0.50;

    // Target text top coordinate
    const targetX = nodeX;
    const targetY = height * 0.68;

    this.svg.innerHTML = `
      <g opacity="${Math.min(1, easeT * 2)}">
        <line x1="${nodeX}" y1="${nodeY}" x2="${targetX}" y2="${targetY}" class="leader-line" />
        <circle cx="${nodeX}" cy="${nodeY}" r="4" fill="#f43f5e" />
        <circle cx="${nodeX}" cy="${nodeY}" r="8" fill="none" stroke="#f43f5e" stroke-width="1.2" class="ping-ring" />
      </g>
    `;
  }

  renderExplodedLeaderLine(threeGroup, layerKey) {
    if (!this.svg || !threeGroup) return;

    threeGroup.getWorldPosition(this.tempVec);

    // Adjust beacon focal points according to component geometry
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
    if (projected.z >= 1) return;

    const width = this.svg.clientWidth || window.innerWidth;
    const height = this.svg.clientHeight || window.innerHeight;

    const beaconX = (projected.x * 0.5 + 0.5) * width;
    const beaconY = (-(projected.y * 0.5) + 0.5) * height;

    // Annotation card baseline coordinate
    const cardRect = this.annotationBlock ? this.annotationBlock.getBoundingClientRect() : null;
    const svgRect = this.svg.getBoundingClientRect();

    let startX = width * 0.22;
    let startY = height * 0.67;

    if (cardRect && svgRect) {
      startX = cardRect.right - svgRect.left;
      startY = cardRect.top + 16 - svgRect.top;
    }

    this.svg.innerHTML = `
      <g>
        <line x1="${startX}" y1="${startY}" x2="${beaconX}" y2="${beaconY}" class="leader-line" />
        <circle cx="${beaconX}" cy="${beaconY}" r="4" fill="#f43f5e" />
        <circle cx="${beaconX}" cy="${beaconY}" r="8" fill="none" stroke="#f43f5e" stroke-width="1.2" class="ping-ring" />
      </g>
    `;
  }
}
