/* ==========================================================================
   Bang & Olufsen - "Pure" Colorway Switcher Manager
   Manages Live PBR Material Updates & UI Swatch Synchronization
   ========================================================================== */

export class ColorwayManager {
  constructor(headphoneModel) {
    this.model = headphoneModel;
    this.currentColorway = 'champagne';

    this.buttons = document.querySelectorAll('.colorway-btn');
    this.initListeners();
  }

  initListeners() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const colorway = btn.dataset.colorway;
        if (colorway) {
          this.setColorway(colorway);
        }
      });
    });
  }

  setColorway(colorwayName) {
    if (this.currentColorway === colorwayName) return;
    this.currentColorway = colorwayName;

    // Update 3D Model PBR Materials
    this.model.setColorway(colorwayName);

    // Update UI Switcher States
    this.buttons.forEach(btn => {
      if (btn.dataset.colorway === colorwayName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update subtle background ambient tint
    const ambient = document.querySelector('.ambient-glow');
    if (ambient) {
      if (colorwayName === 'anthracite') {
        ambient.style.background = 'radial-gradient(circle at center, rgba(140, 140, 150, 0.04) 0%, rgba(0, 0, 0, 0) 70%)';
      } else {
        ambient.style.background = 'radial-gradient(circle at center, rgba(212, 194, 167, 0.05) 0%, rgba(0, 0, 0, 0) 70%)';
      }
    }
  }
}
