/* ==========================================================================
   Bang & Olufsen - Beoplay H4 2nd Gen / H95 3D Model Engine
   Multi-Layer Exploded Assembly & Dynamic PBR Colorway Rig
   Pixel-Accurately Matching videoplayback.mp4 (0:00 - 0:20s)
   ========================================================================== */

import * as THREE from 'three';

export class HeadphoneModel {
  constructor() {
    this.root = new THREE.Group();
    this.root.name = 'BeoplayH4';

    this.currentColorway = 'champagne';
    this.explodedProgress = 0.0;

    this.initTextures();
    this.initMaterials();
    this.buildModel();
  }

  initTextures() {
    // 1. Spun Aluminum Radial Brushed Texture
    const brushCanvas = document.createElement('canvas');
    brushCanvas.width = 512;
    brushCanvas.height = 512;
    const ctx = brushCanvas.getContext('2d');
    ctx.fillStyle = '#c5c7cb';
    ctx.fillRect(0, 0, 512, 512);

    for (let r = 10; r < 250; r += 1.2) {
      ctx.beginPath();
      ctx.arc(256, 256, r, 0, Math.PI * 2);
      ctx.strokeStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    this.brushedTex = new THREE.CanvasTexture(brushCanvas);

    // 2. Lambskin Leather Micro-Stipple Bump Texture
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 256;
    bumpCanvas.height = 256;
    const bCtx = bumpCanvas.getContext('2d');
    const imgData = bCtx.createImageData(256, 256);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = 128 + (Math.random() - 0.5) * 32;
      imgData.data[i] = v;
      imgData.data[i + 1] = v;
      imgData.data[i + 2] = v;
      imgData.data[i + 3] = 255;
    }
    bCtx.putImageData(imgData, 0, 0);
    this.leatherBump = new THREE.CanvasTexture(bumpCanvas);
    this.leatherBump.wrapS = THREE.RepeatWrapping;
    this.leatherBump.wrapT = THREE.RepeatWrapping;
    this.leatherBump.repeat.set(6, 6);

    // 3. DSP Circuit Board Texture (Gold Traces & IC Microchips for Layer 2)
    const pcbCanvas = document.createElement('canvas');
    pcbCanvas.width = 512;
    pcbCanvas.height = 512;
    const pCtx = pcbCanvas.getContext('2d');
    // Dark obsidian / emerald PCB substrate
    pCtx.fillStyle = '#1c1f24';
    pCtx.fillRect(0, 0, 512, 512);

    // Circular ground plane rings
    pCtx.strokeStyle = '#d4af37'; // gold traces
    pCtx.lineWidth = 2;
    pCtx.beginPath();
    pCtx.arc(256, 256, 230, 0, Math.PI * 2);
    pCtx.arc(256, 256, 170, 0, Math.PI * 2);
    pCtx.arc(256, 256, 100, 0, Math.PI * 2);
    pCtx.stroke();

    // Radial and orthogonal gold circuit traces
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
      pCtx.beginPath();
      pCtx.moveTo(256 + Math.cos(a) * 100, 256 + Math.sin(a) * 100);
      pCtx.lineTo(256 + Math.cos(a) * 220, 256 + Math.sin(a) * 220);
      pCtx.stroke();
    }

    // Microchips & SMT components
    pCtx.fillStyle = '#0a0a0d';
    pCtx.fillRect(220, 220, 72, 72); // Center SoC chip
    pCtx.strokeStyle = '#e0cf9b';
    pCtx.lineWidth = 1;
    pCtx.strokeRect(220, 220, 72, 72);

    // Small chips
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const cx = 256 + Math.cos(angle) * 140;
      const cy = 256 + Math.sin(angle) * 140;
      pCtx.fillStyle = '#111215';
      pCtx.fillRect(cx - 14, cy - 10, 28, 20);
      pCtx.fillStyle = '#d4af37';
      pCtx.fillRect(cx - 16, cy - 8, 2, 16);
      pCtx.fillRect(cx + 14, cy - 8, 2, 16);
    }
    this.pcbTex = new THREE.CanvasTexture(pcbCanvas);

    // 4. Titanium Driver Ribbed Diaphragm Texture
    const driverCanvas = document.createElement('canvas');
    driverCanvas.width = 512;
    driverCanvas.height = 512;
    const dCtx = driverCanvas.getContext('2d');
    dCtx.fillStyle = '#1b1b1e';
    dCtx.fillRect(0, 0, 512, 512);

    // Concentric acoustic diaphragm ridges
    for (let r = 20; r < 230; r += 12) {
      dCtx.beginPath();
      dCtx.arc(256, 256, r, 0, Math.PI * 2);
      dCtx.strokeStyle = r % 24 === 0 ? '#8e949c' : '#3c4046';
      dCtx.lineWidth = 3;
      dCtx.stroke();
    }
    // Center neodymium titanium dome
    dCtx.beginPath();
    dCtx.arc(256, 256, 60, 0, Math.PI * 2);
    dCtx.fillStyle = '#9aa1a8';
    dCtx.fill();
    dCtx.strokeStyle = '#cbd1d8';
    dCtx.lineWidth = 4;
    dCtx.stroke();
    this.driverTex = new THREE.CanvasTexture(driverCanvas);
  }

  initMaterials() {
    this.materials = {
      // Headband Leather
      headbandLeather: new THREE.MeshStandardMaterial({
        color: 0xc8b598,
        roughness: 0.55,
        metalness: 0.05,
        bumpMap: this.leatherBump,
        bumpScale: 0.015
      }),

      // Headband Inner Mesh Fabric
      headbandMesh: new THREE.MeshStandardMaterial({
        color: 0xb4bac0,
        roughness: 0.85,
        metalness: 0.08
      }),

      // Slider Rods and Ferrules (High shine stainless steel)
      sliderSteel: new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
        metalness: 0.95,
        roughness: 0.12
      }),

      // Braided Audio Cable
      cableBlack: new THREE.MeshStandardMaterial({
        color: 0x222225,
        roughness: 0.70,
        metalness: 0.10
      }),

      // Anodized Aluminum Housing Shell
      earcupHousing: new THREE.MeshStandardMaterial({
        color: 0xa8adb2,
        metalness: 0.68,
        roughness: 0.35
      }),

      // Outer Brushed Aluminum Touch Dial Disc
      touchDisc: new THREE.MeshStandardMaterial({
        color: 0xdce0e4,
        metalness: 0.88,
        roughness: 0.22,
        bumpMap: this.brushedTex,
        bumpScale: 0.02
      }),

      // DSP Circuit Board Material
      pcbMaterial: new THREE.MeshStandardMaterial({
        map: this.pcbTex,
        roughness: 0.45,
        metalness: 0.55
      }),

      // 40mm Titanium Acoustic Driver Material
      driverMaterial: new THREE.MeshStandardMaterial({
        map: this.driverTex,
        metalness: 0.75,
        roughness: 0.28
      }),

      // Driver Ring Bezel
      driverBezel: new THREE.MeshStandardMaterial({
        color: 0x1d1e21,
        metalness: 0.82,
        roughness: 0.30
      }),

      // Plush Warm Lambskin Ear Cushions
      cushionLeather: new THREE.MeshStandardMaterial({
        color: 0xd8c8a8,
        roughness: 0.78,
        metalness: 0.02,
        bumpMap: this.leatherBump,
        bumpScale: 0.025
      }),

      // Inner Speaker Grille Fabric
      speakerGrille: new THREE.MeshStandardMaterial({
        color: 0x18181c,
        roughness: 0.92,
        metalness: 0.05
      })
    };
  }

  buildModel() {
    // -------------------------------------------------------------
    // 1. Headband Assembly
    // -------------------------------------------------------------
    const archRadius = 1.62;
    const archTube = 0.085;
    const arcAngle = Math.PI * 0.74;

    const headbandArchGeo = new THREE.TorusGeometry(archRadius, archTube, 28, 72, arcAngle);
    headbandArchGeo.rotateZ(Math.PI * 0.5 - arcAngle * 0.5);

    const outerArch = new THREE.Mesh(headbandArchGeo, this.materials.headbandLeather);
    outerArch.castShadow = true;
    this.root.add(outerArch);

    // Inner grey fabric mesh strip
    const innerArchGeo = new THREE.TorusGeometry(archRadius - 0.038, archTube * 0.80, 24, 60, arcAngle * 0.88);
    innerArchGeo.rotateZ(Math.PI * 0.5 - (arcAngle * 0.88) * 0.5);
    const innerArch = new THREE.Mesh(innerArchGeo, this.materials.headbandMesh);
    innerArch.position.set(0, -0.016, 0);
    this.root.add(innerArch);

    // Endcap ferrules
    const capGeo = new THREE.CylinderGeometry(0.095, 0.095, 0.09, 28);
    capGeo.rotateZ(Math.PI * 0.5);

    const leftCap = new THREE.Mesh(capGeo, this.materials.sliderSteel);
    leftCap.position.set(-1.26, 0.70, 0);
    leftCap.rotation.z = -0.52;
    this.root.add(leftCap);

    const rightCap = new THREE.Mesh(capGeo, this.materials.sliderSteel);
    rightCap.position.set(1.26, 0.70, 0);
    rightCap.rotation.z = 0.52;
    this.root.add(rightCap);

    // Telescopic Single Stainless Steel Rod Sliders
    const stemGeo = new THREE.CylinderGeometry(0.026, 0.026, 0.68, 20);

    const leftStem = new THREE.Mesh(stemGeo, this.materials.sliderSteel);
    leftStem.position.set(-1.38, 0.32, 0);
    leftStem.rotation.z = -0.28;
    this.root.add(leftStem);

    const rightStem = new THREE.Mesh(stemGeo, this.materials.sliderSteel);
    rightStem.position.set(1.38, 0.32, 0);
    rightStem.rotation.z = 0.28;
    this.root.add(rightStem);

    // Pivot blocks
    const pivotGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.10, 24);
    pivotGeo.rotateZ(Math.PI * 0.5);

    const leftPivot = new THREE.Mesh(pivotGeo, this.materials.sliderSteel);
    leftPivot.position.set(-1.46, -0.02, 0);
    this.root.add(leftPivot);

    const rightPivot = new THREE.Mesh(pivotGeo, this.materials.sliderSteel);
    rightPivot.position.set(1.46, -0.02, 0);
    this.root.add(rightPivot);

    // Braided Audio Cables
    const cablePointsLeft = [
      new THREE.Vector3(-1.20, 0.65, 0.03),
      new THREE.Vector3(-1.32, 0.36, 0.08),
      new THREE.Vector3(-1.44, 0.06, 0.03)
    ];
    const leftCableGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cablePointsLeft), 24, 0.014, 10, false);
    this.root.add(new THREE.Mesh(leftCableGeo, this.materials.cableBlack));

    const cablePointsRight = [
      new THREE.Vector3(1.20, 0.65, 0.03),
      new THREE.Vector3(1.32, 0.36, 0.08),
      new THREE.Vector3(1.44, 0.06, 0.03)
    ];
    const rightCableGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cablePointsRight), 24, 0.014, 10, false);
    this.root.add(new THREE.Mesh(rightCableGeo, this.materials.cableBlack));

    // -------------------------------------------------------------
    // 2. Left Earcup Assembly (Static Anchor)
    // -------------------------------------------------------------
    const leftCup = this.createStaticEarcup(true);
    leftCup.position.set(-1.42, -0.42, 0);
    leftCup.rotation.y = 0.08;
    leftCup.rotation.x = 0.04;
    leftCup.rotation.z = -0.06;
    this.root.add(leftCup);
    this.leftCup = leftCup;

    // -------------------------------------------------------------
    // 3. Right Earcup Assembly (Exploded Multi-Layer Rig)
    // -------------------------------------------------------------
    this.rightCupRig = new THREE.Group();
    this.rightCupRig.position.set(1.42, -0.42, 0);
    this.rightCupRig.rotation.y = -0.08;
    this.rightCupRig.rotation.x = 0.04;
    this.rightCupRig.rotation.z = 0.06;
    this.buildExplodedRightEarcup();
    this.root.add(this.rightCupRig);

    // Root Group Adjustments
    this.root.rotation.x = 0.06;
    this.root.position.set(0, -0.04, 0);
    this.root.scale.set(0.68, 0.68, 0.68);
  }

  createStaticEarcup(isLeft) {
    const cup = new THREE.Group();

    // 1. Aluminum Housing Shell
    const housingPoints = [
      new THREE.Vector2(0.00, -0.12),
      new THREE.Vector2(0.68, -0.12),
      new THREE.Vector2(0.72, -0.08),
      new THREE.Vector2(0.73, 0.06),
      new THREE.Vector2(0.70, 0.10),
      new THREE.Vector2(0.64, 0.11),
      new THREE.Vector2(0.00, 0.11)
    ];
    const housingGeo = new THREE.LatheGeometry(housingPoints, 48);
    housingGeo.rotateZ(isLeft ? Math.PI * 0.5 : -Math.PI * 0.5);
    const housing = new THREE.Mesh(housingGeo, this.materials.earcupHousing);
    housing.position.set(isLeft ? -0.06 : 0.06, 0, 0);
    housing.castShadow = true;
    cup.add(housing);

    // 2. Brushed Aluminum Touch Disc
    const discGeo = new THREE.CylinderGeometry(0.66, 0.66, 0.02, 48);
    discGeo.rotateZ(Math.PI * 0.5);
    const disc = new THREE.Mesh(discGeo, this.materials.touchDisc);
    disc.position.set(isLeft ? -0.18 : 0.18, 0, 0);
    cup.add(disc);

    // 3. Thick Plush Lambskin Cushion with Visible Outer Wrap Rim
    const cushionPoints = [
      new THREE.Vector2(0.66, -0.06),
      new THREE.Vector2(0.80, -0.02),
      new THREE.Vector2(0.85, 0.08),
      new THREE.Vector2(0.84, 0.22),
      new THREE.Vector2(0.74, 0.32),
      new THREE.Vector2(0.56, 0.36),
      new THREE.Vector2(0.38, 0.30),
      new THREE.Vector2(0.28, 0.18),
      new THREE.Vector2(0.26, 0.04),
      new THREE.Vector2(0.30, 0.00)
    ];
    const cushionGeo = new THREE.LatheGeometry(cushionPoints, 48);
    cushionGeo.rotateZ(isLeft ? -Math.PI * 0.5 : Math.PI * 0.5);
    const cushion = new THREE.Mesh(cushionGeo, this.materials.cushionLeather);
    cushion.position.set(isLeft ? 0.02 : -0.02, 0, 0);
    cushion.scale.set(0.84, 1.04, 0.84);
    cushion.castShadow = true;
    cup.add(cushion);

    // 4. Acoustic Inner Mesh
    const grilleGeo = new THREE.CircleGeometry(0.32, 32);
    grilleGeo.rotateY(Math.PI * 0.5);
    const grille = new THREE.Mesh(grilleGeo, this.materials.speakerGrille);
    grille.position.set(isLeft ? 0.06 : -0.06, 0, 0);
    cup.add(grille);

    return cup;
  }

  buildExplodedRightEarcup() {
    // 5 Distinct Decoupled Exploded Component Layers
    this.layerTouchDial = new THREE.Group();
    this.layerPCB = new THREE.Group();
    this.layerHousing = new THREE.Group();
    this.layerDriver = new THREE.Group();
    this.layerCushion = new THREE.Group();

    // -------------------------------------------------------------
    // Layer 1: Outer Brushed Aluminum Touch Dial Disc
    // -------------------------------------------------------------
    const discGeo = new THREE.CylinderGeometry(0.66, 0.66, 0.025, 48);
    discGeo.rotateZ(Math.PI * 0.5);
    const touchDisc = new THREE.Mesh(discGeo, this.materials.touchDisc);
    this.layerTouchDial.add(touchDisc);
    this.layerTouchDial.position.set(0.18, 0, 0);

    // -------------------------------------------------------------
    // Layer 2: DSP & Bluetooth 5.3 SoC Circuit Board
    // -------------------------------------------------------------
    const pcbGeo = new THREE.CylinderGeometry(0.63, 0.63, 0.015, 48);
    pcbGeo.rotateZ(Math.PI * 0.5);
    const pcbMesh = new THREE.Mesh(pcbGeo, this.materials.pcbMaterial);
    this.layerPCB.add(pcbMesh);
    this.layerPCB.position.set(0.12, 0, 0);

    // -------------------------------------------------------------
    // Layer 3: Main Anodized Aluminum Housing Shell
    // -------------------------------------------------------------
    const housingPoints = [
      new THREE.Vector2(0.00, -0.12),
      new THREE.Vector2(0.68, -0.12),
      new THREE.Vector2(0.72, -0.08),
      new THREE.Vector2(0.73, 0.06),
      new THREE.Vector2(0.70, 0.10),
      new THREE.Vector2(0.64, 0.11),
      new THREE.Vector2(0.00, 0.11)
    ];
    const housingGeo = new THREE.LatheGeometry(housingPoints, 48);
    housingGeo.rotateZ(-Math.PI * 0.5);
    const housing = new THREE.Mesh(housingGeo, this.materials.earcupHousing);
    housing.castShadow = true;
    this.layerHousing.add(housing);
    this.layerHousing.position.set(0.06, 0, 0);

    // -------------------------------------------------------------
    // Layer 4: 40mm Electro-Dynamic Titanium Driver Assembly
    // -------------------------------------------------------------
    // Driver mounting bezel
    const bezelGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.03, 48);
    bezelGeo.rotateZ(Math.PI * 0.5);
    const bezelMesh = new THREE.Mesh(bezelGeo, this.materials.driverBezel);
    this.layerDriver.add(bezelMesh);

    // Concentric titanium acoustic diaphragm
    const driverPlateGeo = new THREE.CircleGeometry(0.52, 48);
    driverPlateGeo.rotateY(-Math.PI * 0.5);
    const driverMesh = new THREE.Mesh(driverPlateGeo, this.materials.driverMaterial);
    driverMesh.position.set(-0.016, 0, 0);
    this.layerDriver.add(driverMesh);

    this.layerDriver.position.set(-0.02, 0, 0);

    // -------------------------------------------------------------
    // Layer 5: Contoured Lambskin Memory Foam Cushion
    // -------------------------------------------------------------
    const cushionPoints = [
      new THREE.Vector2(0.66, -0.06),
      new THREE.Vector2(0.80, -0.02),
      new THREE.Vector2(0.85, 0.08),
      new THREE.Vector2(0.84, 0.22),
      new THREE.Vector2(0.74, 0.32),
      new THREE.Vector2(0.56, 0.36),
      new THREE.Vector2(0.38, 0.30),
      new THREE.Vector2(0.28, 0.18),
      new THREE.Vector2(0.26, 0.04),
      new THREE.Vector2(0.30, 0.00)
    ];
    const cushionGeo = new THREE.LatheGeometry(cushionPoints, 48);
    cushionGeo.rotateZ(Math.PI * 0.5);
    const cushion = new THREE.Mesh(cushionGeo, this.materials.cushionLeather);
    cushion.scale.set(0.84, 1.04, 0.84);
    cushion.castShadow = true;
    this.layerCushion.add(cushion);

    // Inner Grille Cloth inside cushion
    const innerGrilleGeo = new THREE.CircleGeometry(0.32, 32);
    innerGrilleGeo.rotateY(-Math.PI * 0.5);
    const innerGrille = new THREE.Mesh(innerGrilleGeo, this.materials.speakerGrille);
    innerGrille.position.set(-0.02, 0, 0);
    this.layerCushion.add(innerGrille);

    this.layerCushion.position.set(-0.08, 0, 0);

    // Add all layers to rig
    this.rightCupRig.add(this.layerTouchDial);
    this.rightCupRig.add(this.layerPCB);
    this.rightCupRig.add(this.layerHousing);
    this.rightCupRig.add(this.layerDriver);
    this.rightCupRig.add(this.layerCushion);

    // Exploded layers metadata for screen-space leader line tracking
    this.explodedLayers = [
      { id: 'earpads', name: 'Earpads', group: this.layerCushion, offsetX: 0 },
      { id: 'touch', name: 'Quick Attention', group: this.layerPCB, offsetX: 0 },
      { id: 'driver', name: 'Powerful bass', group: this.layerDriver, offsetX: 0 },
      { id: 'housing', name: 'Acoustic Housing', group: this.layerHousing, offsetX: 0 }
    ];
  }

  /* --------------------------------------------------------------------------
     Exploded Offset Interpolation
     disassemblyAmount: 0.0 (fully assembled) to 1.0 (fully exploded)
     -------------------------------------------------------------------------- */
  updateExplodedProgress(t) {
    this.explodedProgress = t;

    // Layer 1: Touch Dial explodes outward left (along -X)
    this.layerTouchDial.position.x = 0.18 + t * 0.70;

    // Layer 2: DSP PCB separates between touch dial and housing
    this.layerPCB.position.x = 0.12 + t * 0.35;

    // Layer 3: Main Housing acts as anchor
    this.layerHousing.position.x = 0.06;

    // Layer 4: Titanium Driver core detaches inward right (along -X relative to right cup, or toward user)
    this.layerDriver.position.x = -0.02 - t * 0.70;

    // Layer 5: Cushion floats furthest out right
    this.layerCushion.position.x = -0.08 - t * 1.65;
  }

  /* --------------------------------------------------------------------------
     Live PBR Colorway Material Update
     -------------------------------------------------------------------------- */
  setColorway(colorwayName) {
    this.currentColorway = colorwayName;

    if (colorwayName === 'anthracite') {
      // Black Anthracite Palette
      this.materials.headbandLeather.color.setHex(0x232326);
      this.materials.headbandLeather.roughness = 0.60;
      this.materials.headbandMesh.color.setHex(0x323236);
      this.materials.sliderSteel.color.setHex(0x3a3a40);
      this.materials.sliderSteel.roughness = 0.22;
      this.materials.earcupHousing.color.setHex(0x18181b);
      this.materials.earcupHousing.metalness = 0.72;
      this.materials.earcupHousing.roughness = 0.38;
      this.materials.touchDisc.color.setHex(0x28282c);
      this.materials.touchDisc.metalness = 0.85;
      this.materials.cushionLeather.color.setHex(0x202022);
      this.materials.cushionLeather.roughness = 0.82;
      this.materials.cushionLeather.metalness = 0.02;
    } else {
      // Champagne Sand Palette (Default as seen in video)
      this.materials.headbandLeather.color.setHex(0xc8b598);
      this.materials.headbandLeather.roughness = 0.55;
      this.materials.headbandMesh.color.setHex(0xb4bac0);
      this.materials.sliderSteel.color.setHex(0xeeeeee);
      this.materials.sliderSteel.roughness = 0.12;
      this.materials.earcupHousing.color.setHex(0xa8adb2);
      this.materials.earcupHousing.metalness = 0.68;
      this.materials.earcupHousing.roughness = 0.35;
      this.materials.touchDisc.color.setHex(0xdce0e4);
      this.materials.touchDisc.metalness = 0.88;
      this.materials.cushionLeather.color.setHex(0xd8c8a8);
      this.materials.cushionLeather.roughness = 0.78;
      this.materials.cushionLeather.metalness = 0.02;
    }
  }
}
