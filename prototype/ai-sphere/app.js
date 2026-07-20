const root = document.documentElement;
const sphereStage = document.getElementById('sphereStage');
const canvas = document.getElementById('sphereCanvas');
const progressFill = document.getElementById('progressFill');
const builder = document.getElementById('builder');
const builderSummary = document.getElementById('builderSummary');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let scrollProgress = 0;
let sphereHovered = false;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smoothstep = (value) => {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
};

function updatePointer(event) {
  targetX = (event.clientX / window.innerWidth - 0.5) * 2;
  targetY = (event.clientY / window.innerHeight - 0.5) * 2;
}

if (!reduceMotion && finePointer) {
  window.addEventListener('pointermove', updatePointer, { passive: true });
}

function updateScroll() {
  const section = document.querySelector('.hero-scroll');
  const max = Math.max(1, section.offsetHeight - window.innerHeight);
  const raw = clamp(-section.getBoundingClientRect().top / max, 0, 1);
  scrollProgress = reduceMotion ? 0.34 : smoothstep(raw);
  root.style.setProperty('--open', scrollProgress.toFixed(4));
  progressFill.style.height = `${scrollProgress * 100}%`;
}

window.addEventListener('scroll', updateScroll, { passive: true });
window.addEventListener('resize', updateScroll, { passive: true });
updateScroll();

function animateCss() {
  currentX += (targetX - currentX) * 0.055;
  currentY += (targetY - currentY) * 0.055;
  root.style.setProperty('--pointer-x', currentX.toFixed(4));
  root.style.setProperty('--pointer-y', currentY.toFixed(4));
  requestAnimationFrame(animateCss);
}
animateCss();

sphereStage.addEventListener('pointerenter', () => { sphereHovered = true; });
sphereStage.addEventListener('pointerleave', () => { sphereHovered = false; });

document.querySelectorAll('.magnetic').forEach((element) => {
  if (!finePointer || reduceMotion) return;
  element.addEventListener('pointermove', (event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    element.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  });
  element.addEventListener('pointerleave', () => { element.style.transform = ''; });
});

function openBuilder() {
  builder.classList.add('is-open');
  builder.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeBuilder() {
  builder.classList.remove('is-open');
  builder.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-open-builder]').forEach((button) => button.addEventListener('click', openBuilder));
document.querySelector('.builder-close').addEventListener('click', closeBuilder);
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeBuilder(); });

const selected = { product: '', goal: '' };
document.querySelectorAll('[data-choice-group]').forEach((group) => {
  const groupName = group.dataset.choiceGroup;
  group.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      group.querySelectorAll('button').forEach((item) => item.classList.remove('is-selected'));
      button.classList.add('is-selected');
      selected[groupName] = button.textContent.trim();
      const parts = [selected.product, selected.goal].filter(Boolean);
      builderSummary.textContent = parts.length ? parts.join(' · ') : 'Выберите продукт и задачу';
    });
  });
});

async function initSphere() {
  try {
    const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: window.innerWidth > 820,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 820 ? 1.25 : 1.65));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.94;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.04, window.innerWidth < 820 ? 9.7 : 9.15);

    const rootGroup = new THREE.Group();
    rootGroup.rotation.set(-0.055, -0.23, 0.018);
    scene.add(rootGroup);

    const shellGroup = new THREE.Group();
    const coreGroup = new THREE.Group();
    const threadGroup = new THREE.Group();
    rootGroup.add(shellGroup, coreGroup, threadGroup);

    scene.add(new THREE.HemisphereLight(0xeaf9f8, 0x10191e, 1.5));
    scene.add(new THREE.AmbientLight(0xb7d2d3, 0.42));

    const keyLight = new THREE.DirectionalLight(0xf4ffff, 2.5);
    keyLight.position.set(-4.5, 5.5, 7.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x48e4d4, 2.2);
    rimLight.position.set(5.5, 1.6, -4.5);
    scene.add(rimLight);

    const lowerLight = new THREE.PointLight(0x48e4d4, 4.2, 10, 2);
    lowerLight.position.set(0.6, -2.5, 2.2);
    scene.add(lowerLight);

    const sphereRadius = window.innerWidth < 820 ? 1.58 : 1.72;
    const shellPieces = [];
    const pieceDefs = [];

    const bands = window.innerWidth < 820
      ? [
          { start: 0.15, length: 0.69, sectors: 4, offset: 0.08 },
          { start: 0.88, length: 0.66, sectors: 5, offset: 0.0 },
          { start: 1.58, length: 0.66, sectors: 5, offset: 0.1 },
          { start: 2.28, length: 0.68, sectors: 4, offset: 0.02 },
        ]
      : [
          { start: 0.12, length: 0.54, sectors: 5, offset: 0.06 },
          { start: 0.70, length: 0.52, sectors: 7, offset: 0.0 },
          { start: 1.26, length: 0.52, sectors: 8, offset: 0.08 },
          { start: 1.82, length: 0.52, sectors: 7, offset: 0.02 },
          { start: 2.38, length: 0.59, sectors: 5, offset: 0.1 },
        ];

    bands.forEach((band, bandIndex) => {
      const phiGap = window.innerWidth < 820 ? 0.055 : 0.038;
      for (let sector = 0; sector < band.sectors; sector += 1) {
        const span = Math.PI * 2 / band.sectors;
        const phiStart = sector * span + band.offset + phiGap * 0.5;
        const phiLength = span - phiGap;
        const geometry = new THREE.SphereGeometry(
          sphereRadius,
          window.innerWidth < 820 ? 18 : 24,
          window.innerWidth < 820 ? 10 : 14,
          phiStart,
          phiLength,
          band.start,
          band.length,
        );
        geometry.computeVertexNormals();

        const material = new THREE.MeshPhysicalMaterial({
          color: bandIndex % 2 ? 0xa8b8bc : 0xb8c5c8,
          metalness: 0.58,
          roughness: 0.34,
          clearcoat: 0.46,
          clearcoatRoughness: 0.25,
          emissive: 0x0a272b,
          emissiveIntensity: 0.08,
          side: THREE.DoubleSide,
          transparent: false,
          opacity: 1,
        });
        const mesh = new THREE.Mesh(geometry, material);

        const edgeGeometry = new THREE.EdgesGeometry(geometry, 24);
        const edgeMaterial = new THREE.LineBasicMaterial({
          color: 0x276d6c,
          transparent: true,
          opacity: 0.42,
        });
        const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);

        const piece = new THREE.Group();
        piece.add(mesh, edges);

        const thetaCenter = band.start + band.length / 2;
        const phiCenter = phiStart + phiLength / 2;
        const direction = new THREE.Vector3(
          Math.sin(thetaCenter) * Math.cos(phiCenter),
          Math.cos(thetaCenter),
          Math.sin(thetaCenter) * Math.sin(phiCenter),
        ).normalize();
        const tangent = new THREE.Vector3(-direction.z, 0.14 * (sector % 2 ? 1 : -1), direction.x).normalize();
        const explode = 0.34 + ((sector + bandIndex) % 4) * 0.09;

        piece.userData = {
          direction,
          tangent,
          explode,
          phase: sector * 0.72 + bandIndex * 1.11,
          material,
          edgeMaterial,
        };
        shellGroup.add(piece);
        shellPieces.push(piece);
        pieceDefs.push({ piece, direction, tangent, explode });
      }
    });

    const innerShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(window.innerWidth < 820 ? 1.03 : 1.12, 4),
      new THREE.MeshPhysicalMaterial({
        color: 0x133940,
        roughness: 0.32,
        metalness: 0.36,
        transparent: true,
        opacity: 0.34,
        emissive: 0x0d5c5b,
        emissiveIntensity: 0.28,
        clearcoat: 0.35,
        depthWrite: false,
      }),
    );
    coreGroup.add(innerShell);

    const coreGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 40, 28),
      new THREE.MeshBasicMaterial({ color: 0xd8fffb, transparent: true, opacity: 0.96, depthWrite: false }),
    );
    coreGroup.add(coreGlow);

    const haloLayers = [0.34, 0.54, 0.78].map((radius, index) => {
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 28, 20),
        new THREE.MeshBasicMaterial({
          color: index === 0 ? 0xb8fff8 : 0x49e3d4,
          transparent: true,
          opacity: 0.085 - index * 0.018,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      coreGroup.add(halo);
      return halo;
    });

    const rings = [];
    [
      { radius: 0.48, tube: 0.025, rotation: [Math.PI / 2, 0, 0], speed: 0.5, spread: -0.18 },
      { radius: 0.69, tube: 0.018, rotation: [0.45, 0.2, 0], speed: -0.34, spread: 0.12 },
      { radius: 0.88, tube: 0.013, rotation: [1.1, 0.62, 0.15], speed: 0.25, spread: 0.26 },
      { radius: 1.03, tube: 0.011, rotation: [0.2, 1.0, 0.45], speed: -0.18, spread: -0.31 },
    ].forEach((definition, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(definition.radius, definition.tube, 10, 80),
        new THREE.MeshBasicMaterial({
          color: index === 0 ? 0xd6fffb : 0x49e3d4,
          transparent: true,
          opacity: 0.63 - index * 0.08,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      ring.rotation.set(...definition.rotation);
      ring.userData = definition;
      coreGroup.add(ring);
      rings.push(ring);
    });

    const nodeCount = window.innerWidth < 820 ? 36 : 72;
    const nodePositions = new Float32Array(nodeCount * 3);
    for (let index = 0; index < nodeCount; index += 1) {
      const y = 1 - (index / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (3 - Math.sqrt(5)) * index;
      nodePositions[index * 3] = Math.cos(theta) * radius * 1.22;
      nodePositions[index * 3 + 1] = y * 1.22;
      nodePositions[index * 3 + 2] = Math.sin(theta) * radius * 1.22;
    }
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodes = new THREE.Points(
      nodeGeometry,
      new THREE.PointsMaterial({
        color: 0x9efff5,
        size: window.innerWidth < 820 ? 0.03 : 0.022,
        transparent: true,
        opacity: 0.34,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    coreGroup.add(nodes);

    const dataThreads = [];
    pieceDefs.forEach((definition, index) => {
      const divisor = window.innerWidth < 820 ? 3 : 2;
      if (index % divisor !== 0) return;
      const pointsCount = 24;
      const positions = new Float32Array(pointsCount * 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.LineBasicMaterial({
        color: index % 3 === 0 ? 0xb8fff8 : 0x49e3d4,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geometry, material);
      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.027, 10, 8),
        new THREE.MeshBasicMaterial({ color: 0xd8fffb, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
      );
      threadGroup.add(line, pulse);
      dataThreads.push({ line, pulse, definition, phase: index * 0.13, pointsCount });
    });

    const groundGlow = new THREE.Mesh(
      new THREE.CircleGeometry(2.2, 72),
      new THREE.MeshBasicMaterial({
        color: 0x2fd4c7,
        transparent: true,
        opacity: 0.055,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    groundGlow.scale.set(1.25, 0.24, 1);
    groundGlow.rotation.x = -Math.PI / 2;
    groundGlow.position.y = -1.95;
    groundGlow.position.z = -0.18;
    rootGroup.add(groundGlow);

    const resize = () => {
      const rect = sphereStage.getBoundingClientRect();
      renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false);
      camera.aspect = rect.width / Math.max(1, rect.height);
      camera.fov = window.innerWidth < 820 ? 34 : 30;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const startTime = performance.now();
    let lastTime = startTime;

    function updateThread(thread, open, elapsed) {
      const { direction, tangent, explode } = thread.definition;
      const start = direction.clone().multiplyScalar(0.26);
      const end = direction.clone().multiplyScalar(sphereRadius + open * explode * 1.25);
      end.add(tangent.clone().multiplyScalar(open * 0.12));
      const controlOne = direction.clone().multiplyScalar(0.72 + open * 0.16).add(tangent.clone().multiplyScalar(0.16));
      const controlTwo = end.clone().multiplyScalar(0.78).add(tangent.clone().multiplyScalar(-0.12));
      const positionAttribute = thread.line.geometry.attributes.position;

      for (let pointIndex = 0; pointIndex < thread.pointsCount; pointIndex += 1) {
        const t = pointIndex / (thread.pointsCount - 1);
        const mt = 1 - t;
        const point = start.clone().multiplyScalar(mt * mt * mt)
          .add(controlOne.clone().multiplyScalar(3 * mt * mt * t))
          .add(controlTwo.clone().multiplyScalar(3 * mt * t * t))
          .add(end.clone().multiplyScalar(t * t * t));
        positionAttribute.setXYZ(pointIndex, point.x, point.y, point.z);
      }
      positionAttribute.needsUpdate = true;
      thread.line.material.opacity = clamp((open - 0.18) * 1.05, 0, 0.42);

      const pulseT = (elapsed * 0.12 + thread.phase) % 1;
      const pulseIndex = Math.min(thread.pointsCount - 1, Math.floor(pulseT * (thread.pointsCount - 1)));
      thread.pulse.position.fromBufferAttribute(positionAttribute, pulseIndex);
      thread.pulse.material.opacity = clamp((open - 0.22) * 1.5, 0, 0.78);
    }

    function render(now) {
      const delta = Math.min(0.04, (now - lastTime) / 1000);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;
      const open = reduceMotion ? 0.34 : scrollProgress;
      const hoverLift = sphereHovered && finePointer ? 0.018 : 0;

      const targetRotationY = -0.23 + currentX * 0.11 + elapsed * 0.014;
      const targetRotationX = -0.055 - currentY * 0.065;
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.04;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.04;
      rootGroup.rotation.z = 0.018 + Math.sin(elapsed * 0.22) * 0.008;

      shellPieces.forEach((piece, index) => {
        const { direction, tangent, explode, phase, material, edgeMaterial } = piece.userData;
        const breathe = reduceMotion ? 0 : Math.sin(elapsed * 0.68 + phase) * 0.006;
        const opening = smoothstep(clamp((open - 0.08) / 0.92, 0, 1));
        const outward = opening * explode + breathe + hoverLift * (index % 4 === 0 ? 1 : 0.28);
        piece.position.copy(direction).multiplyScalar(outward);
        piece.position.add(tangent.clone().multiplyScalar(opening * 0.055 * (index % 2 ? 1 : -1)));

        const shouldBeTransparent = open > 0.46;
        if (material.transparent !== shouldBeTransparent) {
          material.transparent = shouldBeTransparent;
          material.needsUpdate = true;
        }
        material.opacity = shouldBeTransparent ? 1 - ((open - 0.46) / 0.54) * 0.24 : 1;
        material.depthWrite = !shouldBeTransparent;
        material.emissiveIntensity = 0.08 + opening * 0.12;
        edgeMaterial.opacity = 0.34 + opening * 0.34;
      });

      innerShell.rotation.y -= delta * 0.075;
      innerShell.rotation.x += delta * 0.022;
      innerShell.material.opacity = 0.26 + open * 0.18;

      const pulse = 1 + (reduceMotion ? 0 : Math.sin(elapsed * 1.8) * 0.035);
      coreGlow.scale.setScalar(pulse * (0.96 + open * 0.08));
      haloLayers.forEach((halo, index) => {
        halo.scale.setScalar(1 + open * (0.16 + index * 0.06) + Math.sin(elapsed * (0.55 + index * 0.14)) * 0.012);
        halo.material.opacity = 0.06 + open * 0.032 - index * 0.009;
      });

      rings.forEach((ring, index) => {
        ring.rotation.z += delta * ring.userData.speed;
        ring.position.y = open * ring.userData.spread;
        ring.scale.setScalar(0.92 + open * (0.11 + index * 0.018));
        ring.material.opacity = 0.42 + open * (0.22 - index * 0.025);
      });
      nodes.rotation.y += delta * 0.05;
      nodes.material.opacity = 0.22 + open * 0.36;

      dataThreads.forEach((thread) => updateThread(thread, open, elapsed));
      threadGroup.rotation.y = Math.sin(elapsed * 0.12) * 0.014;

      const targetCameraZ = window.innerWidth < 820 ? 9.7 : 9.15 + open * 0.18;
      camera.position.x += ((currentX * 0.09 + open * 0.05) - camera.position.x) * 0.035;
      camera.position.y += ((-currentY * 0.055 + open * 0.02) - camera.position.y) * 0.035;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.035;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  } catch (error) {
    console.error('Не удалось загрузить WebGL-сцену:', error);
    document.documentElement.classList.add('webgl-failed');
  }
}

initSphere();
