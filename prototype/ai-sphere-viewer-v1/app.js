import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const sceneElement = document.getElementById('scrollScene');
const stage = document.getElementById('stage');
const canvas = document.getElementById('canvas');
const loaderElement = document.getElementById('loader');
const errorElement = document.getElementById('error');
const stateName = document.getElementById('stateName');
const fpsElement = document.getElementById('fps');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

const KEY_TIMES = [1 / 30, 35 / 30, 75 / 30, 119.8 / 30];
const STATE_PROGRESS = [0, 0.22, 0.68, 0.9];
const STATE_NAMES = ['01 · СОБРАНА', '02 · HOVER', '03 · ЧАСТИЧНО', '04 · SYSTEM MODE'];
const Z_AXIS = new THREE.Vector3(0, 0, 1);
const tempQuaternion = new THREE.Quaternion();

let targetPointerX = 0;
let targetPointerY = 0;
let pointerX = 0;
let pointerY = 0;
let hoverStrength = 0;
let scrollProgress = reduceMotion ? STATE_PROGRESS[2] : 0;
let smoothedProgress = scrollProgress;
let forcedProgress = null;
let modelReady = false;
let lastScrollAt = -10000;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smoothstep = (value) => {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
};
const smootherstep = (value) => {
  const t = clamp(value, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

function deterministicPhase(name) {
  let hash = 0;
  for (let index = 0; index < name.length; index += 1) hash = (hash * 31 + name.charCodeAt(index)) >>> 0;
  return (hash % 997) / 997;
}

function getMotionDelays(name) {
  const phase = deterministicPhase(name);
  const shellMatch = name.match(/^shell_(\d+)/i);

  if (shellMatch) {
    const shellIndex = Number(shellMatch[1]);
    const shellWave = (shellIndex % 5) / 4;
    return [phase * 0.035, 0.018 + shellWave * 0.11, 0.018 + (1 - shellWave) * 0.07];
  }
  if (/data_|signal|endpoint/i.test(name)) return [0.2, 0.28 + phase * 0.08, 0.1 + phase * 0.13];
  if (/core|focus|upgrade|body/i.test(name)) return [phase * 0.025, 0.045 + phase * 0.055, phase * 0.025];
  if (/undershell/i.test(name)) return [0.035, 0.08, 0.035];
  return [phase * 0.025, phase * 0.07, phase * 0.055];
}

function getMotionSegment(progress) {
  const p = clamp(progress, 0, 1);
  if (p <= STATE_PROGRESS[1]) return { from: 0, to: 1, t: p / STATE_PROGRESS[1] };
  if (p <= STATE_PROGRESS[2]) {
    return { from: 1, to: 2, t: (p - STATE_PROGRESS[1]) / (STATE_PROGRESS[2] - STATE_PROGRESS[1]) };
  }
  if (p <= STATE_PROGRESS[3]) {
    return { from: 2, to: 3, t: (p - STATE_PROGRESS[2]) / (STATE_PROGRESS[3] - STATE_PROGRESS[2]) };
  }
  return { from: 3, to: 3, t: 1 };
}

function updateScrollProgress() {
  const max = Math.max(1, sceneElement.offsetHeight - window.innerHeight);
  const raw = clamp(-sceneElement.getBoundingClientRect().top / max, 0, 1);
  if (Math.abs(raw - scrollProgress) > 0.0001) lastScrollAt = performance.now();
  scrollProgress = reduceMotion ? STATE_PROGRESS[2] : raw;
  if (forcedProgress !== null && Math.abs(raw - forcedProgress) > 0.035) forcedProgress = null;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress, { passive: true });
window.addEventListener('pageshow', () => {
  forcedProgress = null;
  scrollProgress = 0;
  smoothedProgress = 0;
  window.scrollTo(0, 0);
  updateUi(0);
});
updateScrollProgress();

if (finePointer && !reduceMotion) {
  window.addEventListener('pointermove', (event) => {
    targetPointerX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetPointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width * 0.52;
    const centerY = rect.top + rect.height * 0.5;
    const dx = (event.clientX - centerX) / (rect.width * 0.34);
    const dy = (event.clientY - centerY) / (rect.height * 0.38);
    hoverStrength = clamp(1 - Math.sqrt(dx * dx + dy * dy), 0, 1);
  }, { passive: true });
  window.addEventListener('pointerleave', () => { hoverStrength = 0; });
}

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: window.innerWidth > 820,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 820 ? 1.2 : 1.6));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
camera.position.set(0, 0.05, 9.2);
const world = new THREE.Group();
scene.add(world);
scene.add(new THREE.HemisphereLight(0xf1ffff, 0x071116, 1.55));
scene.add(new THREE.AmbientLight(0x91acad, 0.38));
const keyLight = new THREE.DirectionalLight(0xf6ffff, 2.8);
keyLight.position.set(-4.2, 5.2, 7.4);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0x4ce8da, 2.5);
rimLight.position.set(5.2, 1.4, -4.4);
scene.add(rimLight);
const lowerLight = new THREE.PointLight(0x35d9ce, 4.5, 12, 2);
lowerLight.position.set(0.4, -2.3, 2.2);
scene.add(lowerLight);

const motionRecords = [];
const controlledNodeSet = new Set();
const pulseMixers = [];
const activeRings = [];
const coreGlowObjects = [];
let model = null;
let modelBaseScale = 1;
const modelBasePosition = new THREE.Vector3();
let ringRotationTime = 0;

function fitModel(object) {
  object.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  object.position.sub(center);
  object.updateMatrixWorld(true);
  modelBaseScale = 4.55 / Math.max(0.001, Math.max(size.x, size.y, size.z));
  object.scale.setScalar(modelBaseScale);
  object.position.y -= 0.04;
  modelBasePosition.copy(object.position);
}

function buildMotionSnapshots(gltf) {
  const structuralClips = gltf.animations.filter((clip) => !/pulse/i.test(clip.name));
  const nodeNames = new Set();
  structuralClips.forEach((clip) => {
    clip.tracks.forEach((track) => {
      const propertySeparator = track.name.lastIndexOf('.');
      if (propertySeparator > 0) nodeNames.add(track.name.slice(0, propertySeparator));
    });
  });

  const nodes = [...nodeNames].map((name) => model.getObjectByName(name)).filter(Boolean);
  const snapshotMixer = new THREE.AnimationMixer(model);
  structuralClips.forEach((clip) => {
    const action = snapshotMixer.clipAction(clip);
    action.enabled = true;
    action.setEffectiveWeight(1);
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();
  });

  const stateMaps = KEY_TIMES.map((time) => {
    snapshotMixer.setTime(time);
    model.updateMatrixWorld(true);
    const map = new Map();
    nodes.forEach((node) => {
      map.set(node.uuid, {
        position: node.position.clone(),
        quaternion: node.quaternion.clone(),
        scale: node.scale.clone(),
      });
    });
    return map;
  });

  snapshotMixer.stopAllAction();
  snapshotMixer.uncacheRoot(model);
  nodes.forEach((node) => {
    const states = stateMaps.map((map) => map.get(node.uuid));
    if (states.every(Boolean)) {
      motionRecords.push({ node, states, delays: getMotionDelays(node.name) });
      controlledNodeSet.add(node);
    }
  });
  applyMotionState(0);
}

function applyMotionState(progress) {
  const segment = getMotionSegment(progress);
  motionRecords.forEach((record) => {
    const fromState = record.states[segment.from];
    const toState = record.states[segment.to];
    if (segment.from === segment.to) {
      record.node.position.copy(toState.position);
      record.node.quaternion.copy(toState.quaternion);
      record.node.scale.copy(toState.scale);
      return;
    }
    const delay = record.delays[segment.from] || 0;
    const localProgress = smootherstep(clamp((segment.t - delay) / Math.max(0.001, 1 - delay), 0, 1));
    record.node.position.lerpVectors(fromState.position, toState.position, localProgress);
    record.node.quaternion.slerpQuaternions(fromState.quaternion, toState.quaternion, localProgress);
    record.node.scale.lerpVectors(fromState.scale, toState.scale, localProgress);
  });
}

const gltfLoader = new GLTFLoader();
const loadingTimeout = window.setTimeout(() => {
  if (!modelReady) {
    errorElement.hidden = false;
    errorElement.querySelector('b').textContent = 'Модель загружается дольше обычного';
    errorElement.querySelector('span').textContent = 'Не закрывайте страницу: для первого запуска может потребоваться больше времени.';
    loaderElement.querySelector('small').textContent = 'Продолжаем загрузку модели…';
  }
}, 45000);

gltfLoader.load(
  './assets/BND_AI_Sphere_v6.glb',
  (gltf) => {
    window.clearTimeout(loadingTimeout);
    model = gltf.scene;
    const renderHelpers = [];
    model.traverse((object) => {
      if (/^(Plane|Ground|Floor|Backdrop)$/i.test(object.name)) renderHelpers.push(object);
    });
    renderHelpers.forEach((object) => object.removeFromParent());

    fitModel(model);
    world.add(model);
    buildMotionSnapshots(gltf);

    model.traverse((object) => {
      if (object.isMesh && object.material) {
        object.castShadow = false;
        object.receiveShadow = false;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => {
          material.envMapIntensity = 0.72;
          if ('emissiveIntensity' in material && /signal|glow|lens|pulse/i.test(object.name)) {
            material.emissiveIntensity = Math.max(material.emissiveIntensity || 0, 1.15);
          }
        });
      }
      if (/gimbal|depth_ring|ring_segment|rear_disc/i.test(object.name) && !controlledNodeSet.has(object)) {
        object.userData.viewerBaseQuaternion = object.quaternion.clone();
        object.userData.viewerSpinDirection = activeRings.length % 2 ? -1 : 1;
        activeRings.push(object);
      }
      if (/focus_point|optical_lens|innerglow|corewhite|glow/i.test(object.name)) coreGlowObjects.push(object);
    });

    gltf.animations.filter((clip) => /pulse/i.test(clip.name)).forEach((clip, index) => {
      const mixer = new THREE.AnimationMixer(model);
      const action = mixer.clipAction(clip);
      action.enabled = true;
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
      action.setEffectiveWeight(0);
      pulseMixers.push({ mixer, action, phase: index * 0.16 });
    });

    scrollProgress = 0;
    smoothedProgress = 0;
    forcedProgress = null;
    applyMotionState(0);
    updateUi(0);
    modelReady = true;
    errorElement.hidden = true;
    stage.classList.add('is-ready');
  },
  (progressEvent) => {
    if (progressEvent.total > 0) {
      loaderElement.querySelector('small').textContent = `Загрузка модели · ${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`;
    } else {
      loaderElement.querySelector('small').textContent = `Загрузка модели · ${(progressEvent.loaded / 1024 / 1024).toFixed(1)} МБ`;
    }
  },
  (error) => {
    window.clearTimeout(loadingTimeout);
    console.error('BND Sphere GLB load error:', error);
    errorElement.hidden = false;
    errorElement.querySelector('b').textContent = '3D-сцена не загрузилась';
    errorElement.querySelector('span').textContent = error?.message || 'Открой консоль F12 для подробной диагностики.';
    loaderElement.querySelector('small').textContent = 'Не удалось загрузить GLB';
  },
);

function resizeRenderer() {
  const rect = stage.getBoundingClientRect();
  renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false);
  camera.aspect = rect.width / Math.max(1, rect.height);
  camera.fov = window.innerWidth < 820 ? 35 : 30;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resizeRenderer, { passive: true });
resizeRenderer();

const buttons = [...document.querySelectorAll('[data-state]')];
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.state);
    const target = STATE_PROGRESS[index];
    forcedProgress = target;
    const max = sceneElement.offsetHeight - window.innerHeight;
    window.scrollTo({ top: sceneElement.offsetTop + max * target, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});

function updateUi(progress) {
  document.documentElement.style.setProperty('--progress', progress.toFixed(4));
  document.documentElement.style.setProperty('--system', smoothstep((progress - 0.72) / 0.18).toFixed(4));
  const thresholds = [0.1, 0.46, 0.79];
  const stateIndex = progress < thresholds[0] ? 0 : progress < thresholds[1] ? 1 : progress < thresholds[2] ? 2 : 3;
  stateName.textContent = STATE_NAMES[stateIndex];
  buttons.forEach((button, index) => button.classList.toggle('is-active', index === stateIndex));
}

const clock = new THREE.Clock();
let frameCounter = 0;
let fpsTimer = 0;

function render() {
  const delta = Math.min(0.04, clock.getDelta());
  const elapsed = clock.elapsedTime;
  const now = performance.now();
  pointerX += (targetPointerX - pointerX) * 0.05;
  pointerY += (targetPointerY - pointerY) * 0.05;
  document.documentElement.style.setProperty('--px', pointerX.toFixed(4));
  document.documentElement.style.setProperty('--py', pointerY.toFixed(4));

  const baseTarget = forcedProgress ?? scrollProgress;
  const hoverAddition = baseTarget < 0.025 ? hoverStrength * STATE_PROGRESS[1] * 0.72 : 0;
  const targetProgress = clamp(baseTarget + hoverAddition, 0, 1);
  smoothedProgress += (targetProgress - smoothedProgress) * (reduceMotion ? 1 : 0.042);
  updateUi(smoothedProgress);

  if (modelReady && model) {
    applyMotionState(smoothedProgress);
    const systemVisibility = smoothstep((smoothedProgress - 0.76) / 0.14);
    pulseMixers.forEach(({ mixer, action, phase }) => {
      action.setEffectiveWeight(systemVisibility);
      mixer.setTime(3.2 + ((elapsed * 0.42 + phase) % 0.79));
    });

    ringRotationTime += delta * (0.18 + smoothedProgress * 0.34);
    activeRings.forEach((object, index) => {
      const base = object.userData.viewerBaseQuaternion;
      if (!base) return;
      const direction = object.userData.viewerSpinDirection;
      const angle = ringRotationTime * direction * (0.18 + (index % 5) * 0.025);
      tempQuaternion.setFromAxisAngle(Z_AXIS, angle);
      object.quaternion.copy(base).multiply(tempQuaternion);
    });

    coreGlowObjects.forEach((object, index) => {
      const baseScale = object.scale.clone();
      const pulse = 1 + Math.sin(elapsed * (1.3 + index * 0.045) + index) * 0.012;
      object.scale.copy(baseScale).multiplyScalar(pulse);
    });

    const opening = smoothstep(smoothedProgress);
    const idleBlend = smoothstep((now - lastScrollAt - 400) / 1100);
    world.rotation.y = -0.19 + pointerX * 0.065 + Math.sin(elapsed * 0.16) * 0.025 * idleBlend;
    world.rotation.x = -0.055 - pointerY * 0.04 + Math.sin(elapsed * 0.12 + 0.8) * 0.009 * idleBlend;
    world.rotation.z = 0.018 + Math.sin(elapsed * 0.18) * 0.004 * idleBlend;
    world.position.y = Math.sin(elapsed * 0.45) * 0.012 * idleBlend;

    model.scale.setScalar(modelBaseScale * (1 + opening * 0.018));
    model.position.copy(modelBasePosition);
    camera.position.x += ((pointerX * 0.12 + opening * 0.055) - camera.position.x) * 0.032;
    camera.position.y += ((-pointerY * 0.07 + opening * 0.012) - camera.position.y) * 0.032;
    const targetZ = (window.innerWidth < 820 ? 9.8 : 9.2) + opening * 0.14;
    camera.position.z += (targetZ - camera.position.z) * 0.032;
    camera.lookAt(0, 0, 0);
  }

  renderer.render(scene, camera);
  frameCounter += 1;
  fpsTimer += delta;
  if (fpsTimer >= 0.65) {
    fpsElement.textContent = `FPS ${Math.round(frameCounter / fpsTimer)}`;
    frameCounter = 0;
    fpsTimer = 0;
  }
  requestAnimationFrame(render);
}
render();
