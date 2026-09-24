/* ==========================================================================
   Bang & Olufsen - Main Application Coordinator
   Wires 3D Engine, 7-Stage Choreography, Audio Synth & Cinema Controls
   ========================================================================== */

import * as THREE from 'three';
import { SceneManager } from './scene.js';
import { HeadphoneModel } from './headphone-model.js';
import { SoundwaveVisualizer } from './visualizer.js';
import { ExplodedController } from './exploded-controller.js';
import { ColorwayManager } from './colorway-manager.js';
import { AudioManager } from './audio-manager.js';

class App {
  constructor() {
    this.canvas3D = document.getElementById('webgl-canvas');
    this.canvasWave = document.getElementById('soundwave-canvas');
    this.websiteCard = document.getElementById('website-card');

    this.clock = new THREE.Clock();

    this.init();
    this.initEventListeners();
  }

  init() {
    // 1. Scene & 3D Model
    this.sceneManager = new SceneManager(this.canvas3D);
    this.headphoneModel = new HeadphoneModel();
    this.sceneManager.addModel(this.headphoneModel);

    // 2. Soundwave Visualizer & Audio Synth
    this.visualizer = new SoundwaveVisualizer(this.canvasWave);
    this.audioManager = new AudioManager();

    // 3. Colorway Manager
    this.colorwayManager = new ColorwayManager(this.headphoneModel);

    // 4. 7-Stage Exploded Choreography Controller
    this.explodedController = new ExplodedController(
      this.sceneManager,
      this.headphoneModel,
      this.visualizer
    );

    // Start render loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    console.log('✨ Bang & Olufsen "Pure" Interactive Experience Initialized.');
  }

  initEventListeners() {
    // 1. Wheel Scroll to Navigate Storytelling Sections (natural scroll feel)
    window.addEventListener('wheel', (e) => {
      // 0.00015 gives a natural 1:1 scroll feel requiring comfortable wheel distance per section
      const delta = e.deltaY * 0.00015;
      const nextP = this.explodedController.targetProgress + delta;
      this.explodedController.setProgress(nextP);
    }, { passive: true });

    // Touch Swipe Navigation for responsive touch devices
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        const deltaY = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        const delta = deltaY * 0.00035;
        this.explodedController.setProgress(this.explodedController.targetProgress + delta);
      }
    }, { passive: true });

    // 2. Navigation Menu Links
    const navLinks = [
      { id: 'nav-headphones', p: 0.0 },
      { id: 'nav-services', p: 0.20 },
      { id: 'nav-stories', p: 0.35 },
      { id: 'nav-accessories', p: 0.52 }
    ];

    navLinks.forEach(({ id, p }) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          this.explodedController.setProgress(p);
          document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
          el.classList.add('active');
        });
      }
    });

    // 3. Ambient Audio Synth Toggle
    const audioBtn = document.getElementById('audio-toggle');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isPlaying = this.audioManager.toggle();
        audioBtn.classList.toggle('playing', isPlaying);
        this.visualizer.setAudioPlaying(isPlaying);
      });
    }

    // 4. 360° Free Interactive Orbit Mode Toggle
    const orbitBtn = document.getElementById('orbit-mode-toggle');
    if (orbitBtn) {
      orbitBtn.addEventListener('click', () => {
        const isOrbit = !this.sceneManager.isFreeOrbit;
        this.sceneManager.setFreeOrbit(isOrbit);
        orbitBtn.classList.toggle('active', isOrbit);
      });

      // Synchronize 360 orbit button state when user directly drags on the 3D canvas
      this.sceneManager.onOrbitStateChange = (isOrbit) => {
        orbitBtn.classList.toggle('active', isOrbit);
      };
    }

    // 5. Specs Drawer Trigger & Dismissal
    const drawerBackdrop = document.getElementById('specs-drawer-backdrop');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');

    document.querySelectorAll('.trigger-specs-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        drawerBackdrop.classList.add('open');
      });
    });

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', () => {
        drawerBackdrop.classList.remove('open');
      });
    }

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', (e) => {
        if (e.target === drawerBackdrop) {
          drawerBackdrop.classList.remove('open');
        }
      });
    }
  }

  animate() {
    requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();

    // Update choreography & timeline
    this.explodedController.update(delta);

    // Update soundwave visualizer with real-time frequency spectrum
    const freqData = this.audioManager.getFrequencyData();
    this.visualizer.update(freqData);

    // Render 3D WebGL scene
    this.sceneManager.render();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.PureApp = new App();
});
