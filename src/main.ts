import * as THREE from 'three';

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(3, 4, 5);
scene.add(directionalLight);

const fieldOfView = 75;
const aspectRatio = window.innerWidth / window.innerHeight;
const nearPlane = 0.1;
const farPlane = 1000;

const camera = new THREE.PerspectiveCamera(
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

function createFaceTexture(label: string): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#00ff00';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 120px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, size / 2, size / 2);
  return new THREE.CanvasTexture(canvas);
}

const faceTexture = createFaceTexture('RSJ');
const faceMaterials = Array.from(
  { length: 6 },
  () =>
    new THREE.MeshStandardMaterial({
      map: faceTexture,
      roughness: 0.6,
      metalness: 0.1,
    }),
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, faceMaterials);
scene.add(cube);

camera.position.z = 5;

function animate(time: number) {
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
