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
let scrollProgress = 0.06;
let sphereHovered = false;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value) {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

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
  scrollProgress = reduceMotion ? 0.38 : 0.06 + smoothstep(raw) * 0.94;
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

function setupMagneticButtons() {
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
}
setupMagneticButtons();

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 820 ? 1.35 : 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.14;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
    camera.position.set(0, 0.05, 8.8);

    const rootGroup = new THREE.Group();
    rootGroup.rotation.set(-0.08, -0.26, 0.035);
    scene.add(rootGroup);

    const shellGroup = new THREE.Group();
    const coreGroup = new THREE.Group();
    const threadGroup = new THREE.Group();
    rootGroup.add(shellGroup, coreGroup, threadGroup);

    scene.add(new THREE.HemisphereLight(0xe9ffff, 0x132027, 2.5));

    const keyLight = new THREE.DirectionalLight(0xf3ffff, 4.3);
    keyLight.position.set(-4.5, 5.5, 6.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x62f7e8, 3.2);
    rimLight.position.set(5, 1.5, -3.5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x8ffff3, 13, 12, 2);
    fillLight.position.set(0.8, -0.2, 2.6);
    scene.add(fillLight);

    const shellMaterialTemplate = {
      color: 0xcbd9dc,
      metalness: 0.48,
      roughness: 0.24,
      clearcoat: 0.72,
      clearcoatRoughness: 0.18,
      transparent: true,
      opacity: 0.96,
      emissive: 0x102c31,
      emissiveIntensity: 0.16,
      side: THREE.DoubleSide,
    };

    const shellPieces = [];
    const pieceDefs = [];
    const phiCount = window.innerWidth < 820 ? 3 : 4;
    const thetaBands = window.innerWidth < 820
      ? [[0.22, 0.95], [1.04, 1.12], [2.24, 0.68]]
      : [[0.18, 0.78], [1.01, 0.82], [1.91, 0.98]];
    const phiGap = 0.095;

    thetaBands.forEach(([thetaStart, thetaLength], bandIndex) => {
      for (let sector = 0; sector < phiCount; sector += 1) {
        const phiLength = Math.PI * 2 / phiCount - phiGap;
        const phiStart = sector * Math.PI * 2 / phiCount + phiGap * 0.5 + (bandIndex % 2 ? 0.12 : 0);
        const geometry = new THREE.SphereGeometry(2.32, 30, 18, phiStart, phiLength, thetaStart, thetaLength);
        geometry.computeVertexNormals();

        const material = new THREE.MeshPhysicalMaterial({ ...shellMaterialTemplate });
        const mesh = new THREE.Mesh(geometry, material);
        const thetaCenter = thetaStart + thetaLength / 2;
        const phiCenter = phiStart + phiLength / 2;
        const direction = new THREE.Vector3(
          Math.sin(thetaCenter) * Math.cos(phiCenter),
          Math.cos(thetaCenter),
          Math.sin(thetaCenter) * Math.sin(phiCenter),
        ).normalize();
        const tangent = new THREE.Vector3(-direction.z, 0.2 * (sector % 2 ? 1 : -1), direction.x).normalize();
        const explode = 0.76 + ((sector + bandIndex * 2) % 4) * 0.18;

        mesh.userData = {
          direction,
          tangent,
          explode,
          phase: sector * 0.9 + bandIndex * 1.35,
          bandIndex,
          sector,
        };
        shellGroup.add(mesh);
        shellPieces.push(mesh);
        pieceDefs.push({ mesh, direction, tangent, explode });
      }
    });

    const innerShellMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x12343b,
      roughness: 0.22,
      metalness: 0.46,
      transparent: true,
      opacity: 0.78,
      emissive: 0x0c6765,
      emissiveIntensity: 0.48,
      clearcoat: 0.6,
    });
    const innerShell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.38, 5), innerShellMaterial);
    coreGroup.add(innerShell);

    const coreGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 48, 32),
      new THREE.MeshBasicMaterial({ color: 0xcafffa, transparent: true, opacity: 0.98 }),
    );
    coreGlow.material.depthWrite = false;
    coreGroup.add(coreGlow);

    const haloLayers = [0.42, 0.62, 0.9].map((radius, index) => {
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 32, 24),
        new THREE.MeshBasicMaterial({
          color: index === 0 ? 0xa1fff4 : 0x49e3d4,
          transparent: true,
          opacity: 0.11 - index * 0.024,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      coreGroup.add(halo);
      return halo;
    });

    const rings = [];
    const ringDefs = [
      { radius: 0.58, tube: 0.035, rotation: [Math.PI / 2, 0, 0], speed: 0.55, spread: -0.28 },
      { radius: 0.84, tube: 0.024, rotation: [0.45, 0.2, 0], speed: -0.38, spread: 0.2 },
      { radius: 1.08, tube: 0.018, rotation: [1.1, 0.62, 0.15], speed: 0.28, spread: 0.42 },
      { radius: 1.25, tube: 0.014, rotation: [0.2, 1.0, 0.45], speed: -0.2, spread: -0.5 },
    ];
    ringDefs.forEach((definition, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(definition.radius, definition.tube, 12, 96),
        new THREE.MeshBasicMaterial({
          color: index === 0 ? 0xd6fffb : 0x49e3d4,
          transparent: true,
          opacity: 0.74 - index * 0.1,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      ring.rotation.set(...definition.rotation);
      ring.userData = definition;
      coreGroup.add(ring);
      rings.push(ring);
    });

    const nodeCount = window.innerWidth < 820 ? 52 : 96;
    const nodePositions = new Float32Array(nodeCount * 3);
    for (let index = 0; index < nodeCount; index += 1) {
      const y = 1 - (index / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (3 - Math.sqrt(5)) * index;
      nodePositions[index * 3] = Math.cos(theta) * radius * 1.57;
      nodePositions[index * 3 + 1] = y * 1.57;
      nodePositions[index * 3 + 2] = Math.sin(theta) * radius * 1.57;
    }
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodes = new THREE.Points(
      nodeGeometry,
      new THREE.PointsMaterial({
        color: 0x9efff5,
        size: window.innerWidth < 820 ? 0.035 : 0.026,
        transparent: true,
        opacity: 0.64,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    coreGroup.add(nodes);

    const dataThreads = [];
    pieceDefs.forEach((definition, index) => {
      if (index % (window.innerWidth < 820 ? 2 : 1) !== 0) return;
      const pointsCount = 28;
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
        new THREE.SphereGeometry(0.035, 12, 8),
        new THREE.MeshBasicMaterial({ color: 0xd8fffb, transparent: true, opacity: 0, blending: THREE.AdditiveBlending }),
      );
      threadGroup.add(line, pulse);
      dataThreads.push({ line, pulse, definition, phase: index * 0.17, pointsCount });
    });

    const groundGlow = new THREE.Mesh(
      new THREE.CircleGeometry(2.8, 96),
      new THREE.MeshBasicMaterial({
        color: 0x2fd4c7,
        transparent: true,
        opacity: 0.09,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    groundGlow.scale.set(1.35, 0.28, 1);
    groundGlow.rotation.x = -Math.PI / 2;
    groundGlow.position.y = -2.35;
    groundGlow.position.z = -0.25;
    rootGroup.add(groundGlow);

    const resize = () => {
      const rect = sphereStage.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = window.innerWidth < 820 ? 35 : 31;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const startTime = performance.now();
    let lastTime = startTime;

    function updateThread(thread, open, elapsed) {
      const { direction, tangent, explode } = thread.definition;
      const start = direction.clone().multiplyScalar(0.42);
      const end = direction.clone().multiplyScalar(2.25 + open * explode * 1.22);
      end.add(tangent.clone().multiplyScalar(open * 0.22));
      const controlOne = direction.clone().multiplyScalar(1.0 + open * 0.25).add(tangent.clone().multiplyScalar(0.26));
      const controlTwo = end.clone().multiplyScalar(0.76).add(tangent.clone().multiplyScalar(-0.2));
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
      thread.line.material.opacity = clamp((open - 0.12) * 1.25, 0, 0.54);

      const pulseT = (elapsed * 0.16 + thread.phase) % 1;
      const pulseIndex = Math.min(thread.pointsCount - 1, Math.floor(pulseT * (thread.pointsCount - 1)));
      thread.pulse.position.fromBufferAttribute(positionAttribute, pulseIndex);
      thread.pulse.material.opacity = clamp((open - 0.16) * 1.8, 0, 0.9);
    }

    function render(now) {
      const delta = Math.min(0.04, (now - lastTime) / 1000);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;
      const open = reduceMotion ? 0.36 : scrollProgress;
      const hoverLift = sphereHovered && finePointer ? 0.035 : 0;

      const targetRotationY = -0.25 + currentX * 0.14 + elapsed * 0.022;
      const targetRotationX = -0.08 - currentY * 0.085;
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.045;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.045;
      rootGroup.rotation.z = 0.035 + Math.sin(elapsed * 0.28) * 0.012;

      shellPieces.forEach((piece, index) => {
        const { direction, tangent, explode, phase } = piece.userData;
        const breathe = reduceMotion ? 0 : Math.sin(elapsed * 0.82 + phase) * 0.018;
        const outward = 0.035 + open * explode * 1.02 + breathe + hoverLift * (index % 3 === 0 ? 1 : 0.35);
        piece.position.copy(direction).multiplyScalar(outward);
        piece.position.add(tangent.clone().multiplyScalar(open * 0.13 * (index % 2 ? 1 : -1)));
        piece.rotation.x = open * 0.13 * (index % 2 ? 1 : -1);
        piece.rotation.y = open * 0.15 * ((index % 3) - 1);
        piece.rotation.z = open * 0.11 * (index % 2 ? -1 : 1);
        piece.material.opacity = 0.97 - open * 0.38;
        piece.material.emissiveIntensity = 0.14 + open * 0.22;
      });

      innerShell.rotation.y -= delta * 0.12;
      innerShell.rotation.x += delta * 0.04;
      innerShell.material.opacity = 0.74 + open * 0.12;

      const pulse = 1 + (reduceMotion ? 0 : Math.sin(elapsed * 2.1) * 0.045);
      coreGlow.scale.setScalar(pulse * (0.94 + open * 0.12));
      haloLayers.forEach((halo, index) => {
        halo.scale.setScalar(1 + open * (0.22 + index * 0.09) + Math.sin(elapsed * (0.7 + index * 0.2)) * 0.018);
        halo.material.opacity = 0.08 + open * 0.04 - index * 0.012;
      });

      rings.forEach((ring, index) => {
        ring.rotation.z += delta * ring.userData.speed;
        ring.position.y = open * ring.userData.spread;
        ring.scale.setScalar(0.9 + open * (0.16 + index * 0.025));
        ring.material.opacity = 0.48 + open * (0.26 - index * 0.03);
      });
      nodes.rotation.y += delta * 0.08;
      nodes.material.opacity = 0.3 + open * 0.46;

      dataThreads.forEach((thread) => updateThread(thread, open, elapsed));
      threadGroup.rotation.y = Math.sin(elapsed * 0.16) * 0.025;

      camera.position.x += ((currentX * 0.14 + open * 0.12) - camera.position.x) * 0.035;
      camera.position.y += ((-currentY * 0.08 + open * 0.03) - camera.position.y) * 0.035;
      camera.position.z += ((window.innerWidth < 820 ? 9.6 : 8.8 + open * 0.3) - camera.position.z) * 0.035;
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
