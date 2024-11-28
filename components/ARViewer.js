import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

const MODEL_PATH = process.env.REACT_APP_MODEL_PATH || 'path/to/your/model.glb';

class ARModelComponent {
  constructor(container) {
    this.container = container;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.xr.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    document.body.appendChild(ARButton.createButton(this.renderer));

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 20, 10);
    this.scene.add(dirLight);

    const loader = new GLTFLoader();
    loader.load(MODEL_PATH, (gltf) => {
      this.model = gltf.scene;
      this.scene.add(this.model);
    }, undefined, function (error) {
      console.error(error);
    });

    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  render() {
    const delta = this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  new ARModelComponent(container);
});