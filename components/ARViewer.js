import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

const MODEL_FILE_PATH = process.env.REACT_APP_MODEL_PATH || 'path/to/your/model.glb';

class AREducationTool {
  constructor(htmlContainer) {
    this.htmlContainer = htmlContainer;
    this.animationClock = new THREE.Clock();

    this.initializeScene();
  }

  initializeScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.xr.enabled = true;
    this.htmlContainer.appendChild(this.renderer.domElement);

    document.body.appendChild(ARButton.createButton(this.renderer, { optionalFeatures: ['dom-overlay'], domOverlay: { root: document.body } }));

    this.setupLighting();

    this.loadModel();

    this.renderer.setAnimationLoop(() => this.animateScene());
  }

  setupLighting() {
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemisphereLight.position.set(0, 20, 0);
    this.scene.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 20, 10);
    this.scene.add(directionalLight);
  }

  loadModel() {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(MODEL_FILE_PATH, (gltfScene) => {
      this.model = gltfScene.scene;
      this.scene.add(this.model);
    }, undefined, function (error) {
      console.error('An error happened while loading the model:', error);
    });
  }

  animateScene() {
    const deltaTime = this.animationClock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const sceneContainer = document.createElement('div');
  document.body.appendChild(sceneContainer);

  new AREducationTool(sceneContainer);
});