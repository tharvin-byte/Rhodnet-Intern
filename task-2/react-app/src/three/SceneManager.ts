/* ==========================================================================
   Bang & Olufsen - Section 1-7 Studio Scene & Camera Choreography (TypeScript)
   Telephoto Studio Perspective & Free 360 Orbit Controller
   Exact Values from Stage 1 Inventory
   ========================================================================== */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HeadphoneModel } from './HeadphoneModel';

export interface ChoreographyConfig {
  modelPos?: THREE.Vector3;
  modelRot?: THREE.Euler;
  cameraPos?: THREE.Vector3;
}

export class SceneManager {
  canvas: HTMLCanvasElement;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  clock: THREE.Clock;
  headphoneModel: HeadphoneModel | null = null;
  envTexture: THREE.Texture | null = null;

  isFreeOrbit = false;
  defaultCameraPos = new THREE.Vector3(0, 0, 5.4);
  targetCameraPos = this.defaultCameraPos.clone();
  targetLookAt = new THREE.Vector3(0, 0, 0);

  onOrbitStateChange: ((enable: boolean) => void) | null = null;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.clock = new THREE.Clock();

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initLighting();
    this.initControls();
  }

  initScene() {
    this.scene = new THREE.Scene();
  }

  initCamera() {
    const width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : window.innerWidth;
    const height = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(33, width / (height || 1), 0.1, 40);
    this.camera.position.copy(this.defaultCameraPos);
    this.camera.lookAt(this.targetLookAt);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.initStudioEnvironment();
  }

  initStudioEnvironment() {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x28282e);

    const topLightGeo = new THREE.PlaneGeometry(12, 12);
    const topLightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const topLight = new THREE.Mesh(topLightGeo, topLightMat);
    topLight.position.set(0, 6, 2);
    topLight.lookAt(0, 0, 0);
    envScene.add(topLight);

    const rightLightGeo = new THREE.PlaneGeometry(8, 10);
    const rightLightMat = new THREE.MeshBasicMaterial({ color: 0xfdf6ee });
    const rightLight = new THREE.Mesh(rightLightGeo, rightLightMat);
    rightLight.position.set(6, 1, 3);
    rightLight.lookAt(0, 0, 0);
    envScene.add(rightLight);

    const leftLightGeo = new THREE.PlaneGeometry(8, 10);
    const leftLightMat = new THREE.MeshBasicMaterial({ color: 0xebf2fc });
    const leftLight = new THREE.Mesh(leftLightGeo, leftLightMat);
    leftLight.position.set(-6, 2, 2);
    leftLight.lookAt(0, 0, 0);
    envScene.add(leftLight);

    const envMap = pmremGenerator.fromScene(envScene).texture;
    this.scene.environment = envMap;
    this.envTexture = envMap;

    topLightGeo.dispose();
    topLightMat.dispose();
    rightLightGeo.dispose();
    rightLightMat.dispose();
    leftLightGeo.dispose();
    leftLightMat.dispose();
    pmremGenerator.dispose();
  }

  initLighting() {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x3a3a44, 0.9);
    this.scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffaf2, 2.2);
    keyLight.position.set(3, 4, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0ff, 1.4);
    fillLight.position.set(-3.5, 1.5, 3.5);
    this.scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.6);
    rimLight.position.set(0, 5, -2);
    this.scene.add(rimLight);
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 2.5;
    this.controls.maxDistance = 8.5;
    this.controls.enableZoom = false;
    this.controls.enabled = false;

    this.controls.addEventListener('start', () => {
      if (!this.isFreeOrbit) {
        this.setFreeOrbit(true);
      }
    });
  }

  setFreeOrbit(enable: boolean) {
    this.isFreeOrbit = enable;
    this.controls.enabled = enable;

    if (typeof this.onOrbitStateChange === 'function') {
      this.onOrbitStateChange(enable);
    }

    if (!enable) {
      this.resetCamera();
    }
  }

  resetCamera() {
    this.camera.position.copy(this.defaultCameraPos);
    this.camera.lookAt(0, 0, 0);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  addModel(headphoneModel: HeadphoneModel) {
    this.headphoneModel = headphoneModel;
    this.scene.add(headphoneModel.root);
  }

  updateChoreography(config: ChoreographyConfig) {
    if (!this.headphoneModel) return;

    if (config.modelPos) {
      this.headphoneModel.root.position.lerp(config.modelPos, 0.14);
    }
    if (config.modelRot && !this.isFreeOrbit) {
      this.headphoneModel.root.rotation.x += (config.modelRot.x - this.headphoneModel.root.rotation.x) * 0.14;
      this.headphoneModel.root.rotation.y += (config.modelRot.y - this.headphoneModel.root.rotation.y) * 0.14;
      this.headphoneModel.root.rotation.z += (config.modelRot.z - this.headphoneModel.root.rotation.z) * 0.14;
    }
    if (config.cameraPos && !this.isFreeOrbit) {
      this.camera.position.lerp(config.cameraPos, 0.14);
    }
  }

  onResize(width: number, height: number) {
    if (!width || !height) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  render() {
    if (this.controls && this.controls.enabled) {
      this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.controls?.dispose();
    this.envTexture?.dispose();
    this.renderer?.dispose();
  }
}
