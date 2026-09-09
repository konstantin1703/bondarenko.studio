"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SceneProps = {
  mobile: boolean;
  reducedMotion: boolean;
};

const topoVertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  varying float vHeight;
  varying float vFracture;
  varying vec2 vLocal;
  varying float vEdge;

  float hash(vec2 p){
    return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
  }

  float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0,0.0)), f.x),
      mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p){
    float value = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
    for(int i=0;i<5;i++){
      value += amp * noise(p);
      p = rot * p * 2.03 + 17.31;
      amp *= 0.5;
    }
    return value;
  }

  void main(){
    vec3 p = position;
    vec2 q = p.xy;

    float slow = uTime * 0.018;
    float n1 = fbm(q * vec2(0.34,0.41) + vec2(slow, -slow * 0.34));
    float n2 = fbm(q * vec2(0.72,0.63) - vec2(slow * 0.35, slow * 0.18));

    float pointerField = exp(-length(q - vec2(uPointer.x * 3.2, uPointer.y * 2.0)) * 0.52);
    float fractureX = 0.46 + sin(q.y * 0.78 + uTime * 0.035) * 0.18;
    float fractureDist = abs(q.x - fractureX);
    float fracture = 1.0 - smoothstep(0.0, 0.24, fractureDist);

    float basin = exp(-length(q * vec2(0.14,0.11)) * 1.6);
    float height = (n1 - 0.50) * 1.75 + (n2 - 0.5) * 0.44;
    height += basin * 0.18;
    height += pointerField * 0.10;
    height -= fracture * 0.34;

    p.z += height;

    vHeight = height;
    vFracture = fracture;
    vLocal = q;
    vEdge = 1.0 - smoothstep(5.0, 8.5, length(q * vec2(0.70, 0.82)));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
  }
`;

const topoFragment = /* glsl */ `
  uniform float uTime;
  varying float vHeight;
  varying float vFracture;
  varying vec2 vLocal;
  varying float vEdge;

  void main(){
    float contourFine = smoothstep(0.90, 0.995, abs(sin((vHeight + 1.7) * 23.0)));
    float contourMid  = smoothstep(0.94, 0.998, abs(sin((vHeight + 1.7) * 8.0)));
    float gridX = smoothstep(0.985, 1.0, abs(sin(vLocal.x * 1.45)));
    float gridY = smoothstep(0.988, 1.0, abs(sin(vLocal.y * 1.32)));

    float depthFade = smoothstep(-6.0, 2.5, vLocal.y);
    float edgeFade = clamp(vEdge * depthFade, 0.0, 1.0);

    vec3 deep = vec3(0.004, 0.020, 0.038);
    vec3 blue = vec3(0.015, 0.205, 0.46);
    vec3 cyan = vec3(0.30, 0.84, 1.0);
    vec3 whiteBlue = vec3(0.72, 0.95, 1.0);

    float topo = contourFine * 0.55 + contourMid * 0.72;
    float techGrid = (gridX + gridY) * 0.06;
    float fractureGlow = pow(vFracture, 2.2);

    vec3 color = deep;
    color += blue * topo;
    color += cyan * techGrid;
    color += cyan * fractureGlow * 1.45;
    color = mix(color, whiteBlue, fractureGlow * fractureGlow * 0.42);

    float pulse = 0.92 + sin(uTime * 0.55 + vLocal.y * 0.6) * 0.08;
    float alpha = edgeFade * (0.13 + topo * 0.42 + techGrid * 0.5 + fractureGlow * 0.55) * pulse;

    gl_FragColor = vec4(color, alpha);
  }
`;

const flowVertex = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const flowFragment = /* glsl */ `
  uniform float uTime;
  uniform float uPhase;
  uniform float uOpacity;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main(){
    float carrier = sin(vUv.x * 78.0 - uTime * 1.5 + uPhase) * 0.5 + 0.5;
    carrier = smoothstep(0.74, 1.0, carrier);

    float packet = sin(vUv.x * 20.0 - uTime * 2.1 + uPhase * 1.7) * 0.5 + 0.5;
    packet = pow(packet, 13.0);

    float tail = smoothstep(0.0, 0.16, vUv.x) * (1.0 - smoothstep(0.84, 1.0, vUv.x));
    float edge = smoothstep(0.0, 0.18, vUv.y) * (1.0 - smoothstep(0.82, 1.0, vUv.y));

    vec3 hot = vec3(0.76,0.96,1.0);
    vec3 color = mix(uColor, hot, packet * 0.72 + carrier * 0.18);
    float alpha = uOpacity * tail * (0.34 + carrier * 0.34 + packet * 1.42) * (0.76 + edge * 0.24);

    gl_FragColor = vec4(color, alpha);
  }
`;

function TopographicField({ mobile, reducedMotion }: SceneProps) {
  const material = useRef<THREE.ShaderMaterial>(null!);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: pointer },
    }),
    [pointer]
  );

  useFrame(({ clock, pointer: scenePointer }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = reducedMotion ? 1.5 : clock.getElapsedTime();
    const tx = reducedMotion ? 0 : scenePointer.x;
    const ty = reducedMotion ? 0 : scenePointer.y;
    pointer.lerp(new THREE.Vector2(tx, ty), reducedMotion ? 1 : 0.035);
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, mobile ? -0.035 : -0.08]}
      position={mobile ? [0, -1.35, -2.25] : [0, -1.46, -2.1]}
      scale={mobile ? [0.78, 0.92, 0.78] : [1, 1, 1]}
    >
      <planeGeometry args={[18, 13, mobile ? 120 : 210, mobile ? 84 : 145]} />
      <shaderMaterial
        ref={material}
        vertexShader={topoVertex}
        fragmentShader={topoFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function createFlowCurves(mobile: boolean) {
  const count = mobile ? 11 : 17;
  const curves: THREE.CatmullRomCurve3[] = [];

  const base = mobile
    ? [
        new THREE.Vector3(-5.2, -0.54, 0.45),
        new THREE.Vector3(-3.3, -0.12, -0.18),
        new THREE.Vector3(-1.45, 0.46, -0.84),
        new THREE.Vector3(0.35, 1.05, -1.55),
        new THREE.Vector3(1.62, 0.70, -2.18),
        new THREE.Vector3(3.35, 0.08, -2.84),
        new THREE.Vector3(5.2, 0.28, -3.40),
      ]
    : [
        new THREE.Vector3(-7.3, -0.62, 0.85),
        new THREE.Vector3(-4.9, -0.20, 0.10),
        new THREE.Vector3(-2.4, 0.32, -0.62),
        new THREE.Vector3(-0.45, 1.02, -1.36),
        new THREE.Vector3(0.48, 1.38, -1.72),
        new THREE.Vector3(2.1, 0.86, -2.42),
        new THREE.Vector3(4.5, 0.16, -3.04),
        new THREE.Vector3(7.0, 0.58, -3.75),
      ];

  for (let i = 0; i < count; i += 1) {
    const center = (count - 1) / 2;
    const lane = (i - center) / center;
    const phase = i * 1.61803398875;
    const points = base.map((p, j) => {
      const t = j / Math.max(1, base.length - 1);
      const fan = Math.sin(t * Math.PI);
      const offsetY = lane * (mobile ? 0.23 : 0.34) * fan + Math.sin(phase + j * 0.9) * 0.045;
      const offsetZ = lane * (mobile ? 0.16 : 0.27) * fan + Math.cos(phase * 0.7 + j) * 0.04;
      const offsetX = Math.sin(phase + j * 0.42) * 0.045 * fan;
      return p.clone().add(new THREE.Vector3(offsetX, offsetY, offsetZ));
    });

    curves.push(new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.42));
  }

  return curves;
}

function FlowStrand({
  curve,
  index,
  count,
  mobile,
  reducedMotion,
}: {
  curve: THREE.CatmullRomCurve3;
  index: number;
  count: number;
  mobile: boolean;
  reducedMotion: boolean;
}) {
  const material = useRef<THREE.ShaderMaterial>(null!);
  const center = (count - 1) / 2;
  const lane = Math.abs(index - center) / Math.max(1, center);
  const radius = mobile ? 0.008 + (1 - lane) * 0.006 : 0.008 + (1 - lane) * 0.008;
  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, mobile ? 130 : 190, radius, 4, false),
    [curve, mobile, radius]
  );
  const color = useMemo(() => {
    const a = new THREE.Color("#0b73ff");
    const b = new THREE.Color("#58e4ff");
    return a.lerp(b, 0.24 + (1 - lane) * 0.52);
  }, [lane]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPhase: { value: index * 0.87 },
      uOpacity: { value: (mobile ? 0.34 : 0.31) + (1 - lane) * 0.24 },
      uColor: { value: color },
    }),
    [index, lane, mobile, color]
  );

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = reducedMotion ? 2.0 : clock.getElapsedTime();
    }
  });

  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        ref={material}
        vertexShader={flowVertex}
        fragmentShader={flowFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

function FlowBundle({ mobile, reducedMotion }: SceneProps) {
  const group = useRef<THREE.Group>(null!);
  const curves = useMemo(() => createFlowCurves(mobile), [mobile]);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = reducedMotion ? 0 : clock.getElapsedTime();
    const px = reducedMotion ? 0 : pointer.x;
    const py = reducedMotion ? 0 : pointer.y;

    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, px * 0.012, 0.035);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -py * 0.018, 0.035);
    group.current.position.y = (reducedMotion ? 0 : Math.sin(t * 0.21) * 0.025);
  });

  return (
    <group ref={group}>
      {curves.map((curve, index) => (
        <FlowStrand
          key={index}
          curve={curve}
          index={index}
          count={curves.length}
          mobile={mobile}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}

function FractureSpine({ mobile, reducedMotion }: SceneProps) {
  const group = useRef<THREE.Group>(null!);
  const geometry = useMemo(() => {
    const points = mobile
      ? [
          new THREE.Vector3(0.34, -1.28, -1.58),
          new THREE.Vector3(0.26, -0.48, -1.62),
          new THREE.Vector3(0.43, 0.22, -1.64),
          new THREE.Vector3(0.30, 1.00, -1.65),
          new THREE.Vector3(0.50, 2.02, -1.68),
        ]
      : [
          new THREE.Vector3(0.40, -1.38, -1.64),
          new THREE.Vector3(0.30, -0.54, -1.67),
          new THREE.Vector3(0.52, 0.24, -1.70),
          new THREE.Vector3(0.36, 1.08, -1.70),
          new THREE.Vector3(0.58, 2.52, -1.74),
        ];
    const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.25);
    return {
      core: new THREE.TubeGeometry(curve, 110, mobile ? 0.010 : 0.012, 5, false),
      aura: new THREE.TubeGeometry(curve, 110, mobile ? 0.040 : 0.052, 5, false),
    };
  }, [mobile]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = reducedMotion ? 0 : clock.getElapsedTime();
    group.current.scale.x = 1 + Math.sin(t * 0.7) * 0.012;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry.aura}>
        <meshBasicMaterial
          color="#087cff"
          transparent
          opacity={0.095}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={geometry.core}>
        <meshBasicMaterial
          color="#bcefff"
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function AmbientParticles({ mobile, reducedMotion }: SceneProps) {
  const points = useRef<THREE.Points>(null!);
  const count = mobile ? 320 : 620;
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const a = i * 2.399963229728653;
      const r = 2.2 + ((i * 37) % 137) / 137 * (mobile ? 6.2 : 8.8);
      const lift = (((i * 73) % 191) / 191 - 0.43) * (mobile ? 5.2 : 6.6);
      data[i * 3] = Math.cos(a) * r;
      data[i * 3 + 1] = lift;
      data[i * 3 + 2] = -1.8 + Math.sin(a * 0.77) * r * 0.52 - (((i * 29) % 89) / 89) * 5.0;
    }
    return data;
  }, [count, mobile]);

  useFrame(({ clock }) => {
    if (!points.current || reducedMotion) return;
    points.current.rotation.y = clock.getElapsedTime() * 0.004;
    points.current.position.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.025;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#6edcff"
        size={mobile ? 0.018 : 0.022}
        transparent
        opacity={mobile ? 0.24 : 0.30}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function CameraRig({ mobile, reducedMotion }: SceneProps) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, mobile ? -0.10 : -0.04, -1.72), [mobile]);
  const desired = useMemo(
    () => new THREE.Vector3(0, mobile ? 2.15 : 2.8, mobile ? 8.8 : 9.2),
    [mobile]
  );

  useFrame(({ pointer }) => {
    const px = reducedMotion ? 0 : pointer.x;
    const py = reducedMotion ? 0 : pointer.y;
    desired.x = (mobile ? 0.08 : 0.34) * px;
    desired.y = (mobile ? 2.15 : 2.8) + (mobile ? 0.05 : 0.16) * py;

    camera.position.lerp(desired, reducedMotion ? 1 : 0.032);
    camera.lookAt(target.x + px * (mobile ? 0.02 : 0.08), target.y + py * 0.035, target.z);
  });

  return null;
}

export default function V8Scene({ mobile, reducedMotion }: SceneProps) {
  return (
    <>
      <fog attach="fog" args={["#01050a", mobile ? 7.5 : 8.5, mobile ? 18 : 22]} />
      <CameraRig mobile={mobile} reducedMotion={reducedMotion} />
      <AmbientParticles mobile={mobile} reducedMotion={reducedMotion} />
      <TopographicField mobile={mobile} reducedMotion={reducedMotion} />
      <FlowBundle mobile={mobile} reducedMotion={reducedMotion} />
      <FractureSpine mobile={mobile} reducedMotion={reducedMotion} />
    </>
  );
}
