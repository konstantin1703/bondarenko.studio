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

// Контрольный viewer всегда начинает с закрытой сферы.
// Chrome может восстанавливать предыдущую позицию скролла после Ctrl+F5/перезапуска.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

const KEY_TIMES = [1 / 30, 35 / 30, 75 / 30, 120 / 30];
const STATE_PROGRESS = [0, 0.28, 0.63, 1];
const STATE_NAMES = ['01 · СОБРАНА', '02 · HOVER', '03 · ЧАСТИЧНО', '04 · SYSTEM MODE'];

let targetPointerX = 0;
let targetPointerY = 0;
let pointerX = 0;
let pointerY = 0;
let hoverStrength = 0;
let scrollProgress = reduceMotion ? STATE_PROGRESS[2] : 0;
let smoothedProgress = scrollProgress;
let forcedProgress = null;
let modelReady = false;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smoothstep = (value) => {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
};
const lerp = (from, to, amount) => from + (to - from) * amount;

function progressToAnimationTime(progress) {
  const p = clamp(progress, 0, 1);
  if (p <= STATE_PROGRESS[1]) {
    const local = smoothstep(p / STATE_PROGRESS[1]);
    return lerp(KEY_TIMES[0], KEY_TIMES[1], local);
  }
  if (p <= STATE_PROGRESS[2]) {
    const local = smoothstep((p - STATE_PROGRESS[1]) / (STATE_PROGRESS[2] - STATE_PROGRESS[1]));
    return lerp(KEY_TIMES[1], KEY_TIMES[2], local);
  }
  const local = smoothstep((p - STATE_PROGRESS[2]) / (1 - STATE_PROGRESS[2]));
  return lerp(KEY_TIMES[2], KEY_TIMES[3], local);
}

function updateScrollProgress() {
  const max = Math.max(1, sceneElement.offsetHeight - window.innerHeight);
  const raw = clamp(-sceneElement.getBoundingClientRect().top / max, 0, 1);
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
    const distance = Math.sqrt(dx * dx + dy * dy);
    hoverStrength = clamp(1 - distance, 0, 1);
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
renderer.toneMappingExposure = 1.0;

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

let structuralMixer = null;
const structuralActions = [];
const pulseMixers = [];
let model = null;
let modelBaseScale = 1;
let modelBasePosition = new THREE.Vector3();
let activeRings = [];
let coreGlowObjects = [];

function fitModel(object) {
  object.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  object.position.sub(center);
  object.updateMatrixWorld(true);

  const maxDimension = Math.max(size.x, size.y, size.z);
  modelBaseScale = 4.55 / Math.max(0.001, maxDimension);
  object.scale.setScalar(modelBaseScale);
  object.position.y -= 0.04;
  modelBasePosition.copy(object.position);
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

    // Blender-рендер содержит служебную плоскость пола 40×40.
    // Она нужна только для PNG-рендеров и не должна попадать в WebGL-viewer:
    // иначе Box3 масштабирует сферу относительно огромного пола.
    const renderHelpers = [];
    model.traverse((object) => {
      if (/^(Plane|Ground|Floor|Backdrop)$/i.test(object.name)) renderHelpers.push(object);
    });
    renderHelpers.forEach((object) => object.removeFromParent());

    fitModel(model);
    world.add(model);

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
      if (/gimbal|depth_ring|ring_segment|rear_disc/i.test(object.name)) activeRings.push(object);
      if (/focus_point|optical_lens|innerglow|corewhite|glow/i.test(object.name)) {
        object.userData.viewerBaseScale = object.scale.clone();
        coreGlowObjects.push(object);
      }
    });

    structuralMixer = new THREE.AnimationMixer(model);
    gltf.animations
      .filter((clip) => !/pulse/i.test(clip.name))
      .forEach((clip) => {
        const action = structuralMixer.clipAction(clip);
        action.enabled = true;
        action.setEffectiveWeight(1);
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.play();
        // Клип не проигрывается сам: его точное время задаёт скролл.
        action.timeScale = 0;
        structuralActions.push(action);
      });

    gltf.animations
      .filter((clip) => /pulse/i.test(clip.name))
      .forEach((clip, index) => {
        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(clip);
        action.enabled = true;
        action.play();
        pulseMixers.push({ mixer, action, phase: index * 0.16 });
      });

    structuralActions.forEach((action) => { action.time = KEY_TIMES[0]; });
    structuralMixer.update(0);
    scrollProgress = 0;
    smoothedProgress = 0;
    forcedProgress = null;
    updateUi(0);
    modelReady = true;
    errorElement.hidden = true;
    stage.classList.add('is-ready');
  },
  (progressEvent) => {
    if (progressEvent.total > 0) {
      const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      loaderElement.querySelector('small').textContent = `Загрузка модели · ${percent}%`;
    } else {
      const megabytes = (progressEvent.loaded / 1024 / 1024).toFixed(1);
      loaderElement.querySelector('small').textContent = `Загрузка модели · ${megabytes} МБ`;
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
  const systemOpacity = smoothstep((progress - 0.72) / 0.2);
  document.documentElement.style.setProperty('--system', systemOpacity.toFixed(4));

  const thresholds = [0.14, 0.46, 0.79];
  const stateIndex = progress < thresholds[0] ? 0 : progress < thresholds[1] ? 1 : progress < thresholds[2] ? 2 : 3;
  stateName.textContent = STATE_NAMES[stateIndex];
  buttons.forEach((button, index) => button.classList.toggle('is-active', index === stateIndex));
}

const clock = new THREE.Clock();
let frameCounter = 0;
let fpsTimer = 0;
let lastFps = 0;

function render() {
  const delta = Math.min(0.04, clock.getDelta());
  const elapsed = clock.elapsedTime;
  pointerX += (targetPointerX - pointerX) * 0.055;
  pointerY += (targetPointerY - pointerY) * 0.055;
  document.documentElement.style.setProperty('--px', pointerX.toFixed(4));
  document.documentElement.style.setProperty('--py', pointerY.toFixed(4));

  const baseTarget = forcedProgress ?? scrollProgress;
  const hoverAddition = baseTarget < 0.08 ? hoverStrength * STATE_PROGRESS[1] * 0.82 : 0;
  const targetProgress = clamp(baseTarget + hoverAddition, 0, 1);
  smoothedProgress += (targetProgress - smoothedProgress) * (reduceMotion ? 1 : 0.065);
  updateUi(smoothedProgress);

  if (modelReady && structuralMixer && model) {
    const animationTime = progressToAnimationTime(smoothedProgress);
    structuralActions.forEach((action) => {
      // Выставляем точный кадр каждого клипа вручную.
      // Это исключает авто-проигрывание и зацикливание GLB-анимаций.
      action.time = Math.min(animationTime, action.getClip().duration - 0.0001);
    });
    structuralMixer.update(0);

    const pulseVisibility = smoothstep((smoothedProgress - 0.78) / 0.16);
    pulseMixers.forEach(({ mixer, action, phase }) => {
      action.weight = pulseVisibility;
      mixer.setTime(3.2 + ((elapsed * 0.48 + phase) % 0.78));
    });

    activeRings.forEach((object, index) => {
      const speed = (index % 2 ? -1 : 1) * (0.04 + (index % 5) * 0.007);
      object.rotation.z += delta * speed * (0.35 + smoothedProgress * 0.65);
    });

    coreGlowObjects.forEach((object, index) => {
      const pulse = 1 + Math.sin(elapsed * (1.45 + index * 0.07) + index) * 0.015;
      const baseScale = object.userData.viewerBaseScale;
      if (baseScale) object.scale.copy(baseScale).multiplyScalar(pulse);
    });

    const opening = smoothstep(smoothedProgress);
    world.rotation.y = -0.19 + pointerX * 0.085 + elapsed * 0.012;
    world.rotation.x = -0.055 - pointerY * 0.052;
    world.rotation.z = 0.018 + Math.sin(elapsed * 0.22) * 0.006;
    world.position.y = Math.sin(elapsed * 0.55) * 0.025;

    const scaleBoost = 1 + opening * 0.025;
    model.scale.setScalar(modelBaseScale * scaleBoost);
    model.position.copy(modelBasePosition);

    camera.position.x += ((pointerX * 0.16 + opening * 0.08) - camera.position.x) * 0.038;
    camera.position.y += ((-pointerY * 0.09 + opening * 0.015) - camera.position.y) * 0.038;
    const targetZ = (window.innerWidth < 820 ? 9.8 : 9.2) + opening * 0.22;
    camera.position.z += (targetZ - camera.position.z) * 0.038;
    camera.lookAt(0, 0, 0);
  }

  renderer.render(scene, camera);

  frameCounter += 1;
  fpsTimer += delta;
  if (fpsTimer >= 0.65) {
    lastFps = Math.round(frameCounter / fpsTimer);
    fpsElement.textContent = `FPS ${lastFps}`;
    frameCounter = 0;
    fpsTimer = 0;
  }

  requestAnimationFrame(render);
}
render();
