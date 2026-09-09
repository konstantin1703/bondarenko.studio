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
  varying vec2 vLocal;
  varying float vFade;

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
    float v = 0.0;
    float a = 0.5;
    mat2 r = mat2(0.82,-0.57,0.57,0.82);
    for(int i=0;i<5;i++){
      v += a * noise(p);
      p = r * p * 2.01 + 13.7;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec3 p = position;
    vec2 q = p.xy;
    float drift = uTime * 0.012;

    float broad = fbm(q * vec2(0.26,0.31) + vec2(drift,-drift * 0.22));
    float detail = fbm(q * vec2(0.62,0.56) - vec2(drift * 0.24,drift * 0.14));
    float pointerLift = exp(-length(q - vec2(uPointer.x * 2.7, uPointer.y * 1.6)) * 0.62);

    float h = (broad - 0.51) * 1.18 + (detail - 0.5) * 0.25 + pointerLift * 0.05;
    p.z += h;

    vHeight = h;
    vLocal = q;

    float radial = 1.0 - smoothstep(4.7, 8.6, length(q * vec2(0.64,0.82)));
    float depth = smoothstep(-6.2, 1.4, q.y);
    vFade = clamp(radial * depth, 0.0, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
  }
`;

const topoFragment = /* glsl */ `
  uniform float uTime;
  varying float vHeight;
  varying vec2 vLocal;
  varying float vFade;

  void main(){
    float fine = smoothstep(0.975,0.999,abs(sin((vHeight + 1.35) * 19.0)));
    float major = smoothstep(0.988,0.999,abs(sin((vHeight + 1.35) * 6.2)));
    float longGrid = smoothstep(0.994,1.0,abs(sin(vLocal.x * 0.82)));

    float shimmer = 0.92 + sin(uTime * 0.22 + vLocal.x * 0.19) * 0.08;
    float lines = fine * 0.42 + major * 0.68 + longGrid * 0.025;

    vec3 ink = vec3(0.006,0.028,0.052);
    vec3 cold = vec3(0.015,0.19,0.39);
    vec3 color = ink + cold * lines;

    float alpha = vFade * (0.018 + lines * 0.18) * shimmer;
    gl_FragColor = vec4(color,alpha);
  }
`;

const ribbonVertex = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const ribbonFragment = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  uniform float uPhase;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  void main(){
    float across = clamp(1.0 - abs(vUv.y - 0.5) * 2.0, 0.0, 1.0);
    float halo = pow(across, 1.25);
    float core = pow(across, 4.8);

    float filaments = sin(vUv.y * 86.0 + sin(vUv.x * 16.0) * 2.8 + uPhase);
    filaments = pow(max(0.0, filaments), 8.0);

    float pulse = sin(vUv.x * 27.0 - uTime * 1.42 + uPhase) * 0.5 + 0.5;
    pulse = pow(pulse, 13.0);

    float packet = sin(vUv.x * 9.0 - uTime * 0.72 + uPhase * 0.7) * 0.5 + 0.5;
    packet = pow(packet, 7.0);

    float edgeFade = smoothstep(0.0,0.13,vUv.x) * (1.0 - smoothstep(0.87,1.0,vUv.x));
    float fractureZone = exp(-pow((vUv.x - 0.53) * 9.0, 2.0));

    vec3 color = mix(uColorA,uColorB,core * 0.72 + pulse * 0.28);
    color = mix(color,vec3(0.74,0.95,1.0),pulse * core * 0.52 + fractureZone * 0.12);

    float alpha = (
      halo * 0.055 +
      core * 0.18 +
      filaments * 0.22 * across +
      pulse * 0.48 * core +
      packet * 0.08 * halo +
      fractureZone * 0.055 * halo
    ) * uOpacity * edgeFade;

    gl_FragColor = vec4(color,alpha);
  }
`;

const veilVertex = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const veilFragment = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  void main(){
    vec2 p = (vUv - 0.5) * 2.0;
    float radial = exp(-dot(p * vec2(0.82,1.08), p * vec2(0.82,1.08)) * 2.7);
    float haze = exp(-abs(p.y + 0.08) * 4.4);
    float pulse = 0.90 + sin(uTime * 0.18) * 0.10;
    vec3 color = mix(vec3(0.006,0.024,0.055),vec3(0.025,0.22,0.46),radial);
    float alpha = (radial * 0.14 + haze * 0.035) * pulse;
    gl_FragColor = vec4(color,alpha);
  }
`;

function buildRibbonGeometry(
  curve: THREE.CatmullRomCurve3,
  segments: number,
  width: number
) {
  const positions = new Float32Array((segments + 1) * 2 * 3);
  const uvs = new Float32Array((segments + 1) * 2 * 2);
  const indices: number[] = [];
  const zAxis = new THREE.Vector3(0,0,1);
  const fallback = new THREE.Vector3(0,1,0);

  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const point = curve.getPoint(t);
    const tangent = curve.getTangent(t).normalize();

    const side = new THREE.Vector3().crossVectors(tangent,zAxis);
    if (side.lengthSq() < 0.0001) side.copy(fallback);
    side.normalize();

    const swell = Math.sin(Math.PI * t);
    const fracture = Math.exp(-Math.pow((t - 0.53) * 7.2, 2));
    const localWidth = width * (0.66 + swell * 0.42 + fracture * 0.28);

    const left = point.clone().addScaledVector(side,localWidth);
    const right = point.clone().addScaledVector(side,-localWidth);

    const p = i * 6;
    positions[p] = left.x;
    positions[p + 1] = left.y;
    positions[p + 2] = left.z;
    positions[p + 3] = right.x;
    positions[p + 4] = right.y;
    positions[p + 5] = right.z;

    const u = i * 4;
    uvs[u] = t;
    uvs[u + 1] = 0;
    uvs[u + 2] = t;
    uvs[u + 3] = 1;

    if (i < segments) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a,b,c,b,d,c);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position",new THREE.BufferAttribute(positions,3));
  geometry.setAttribute("uv",new THREE.BufferAttribute(uvs,2));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

function createMainCurve(mobile: boolean) {
  const points = mobile
    ? [
        new THREE.Vector3(-5.2,-0.05,0.05),
        new THREE.Vector3(-3.6,0.18,-0.42),
        new THREE.Vector3(-2.25,0.58,-0.82),
        new THREE.Vector3(-0.92,1.06,-1.14),
        new THREE.Vector3(0.05,0.90,-1.42),
        new THREE.Vector3(0.62,0.18,-1.65),
        new THREE.Vector3(1.38,0.42,-1.94),
        new THREE.Vector3(2.75,0.92,-2.52),
        new THREE.Vector3(4.9,0.56,-3.28),
      ]
    : [
        new THREE.Vector3(-7.0,-0.10,0.28),
        new THREE.Vector3(-5.0,0.14,-0.22),
        new THREE.Vector3(-3.1,0.48,-0.72),
        new THREE.Vector3(-1.35,1.02,-1.12),
        new THREE.Vector3(-0.20,1.26,-1.42),
        new THREE.Vector3(0.55,0.42,-1.72),
        new THREE.Vector3(1.42,0.58,-2.02),
        new THREE.Vector3(3.4,1.10,-2.66),
        new THREE.Vector3(5.4,0.78,-3.24),
        new THREE.Vector3(7.2,0.34,-3.76),
      ];
  return new THREE.CatmullRomCurve3(points,false,"catmullrom",0.34);
}

function TopographicField({ mobile,reducedMotion }: SceneProps) {
  const material = useRef<THREE.ShaderMaterial>(null!);
  const pointerUniform = useMemo(() => new THREE.Vector2(),[]);
  const tempPointer = useMemo(() => new THREE.Vector2(),[]);
  const uniforms = useMemo(() => ({
    uTime:{ value:0 },
    uPointer:{ value:pointerUniform },
  }),[pointerUniform]);

  useFrame(({ clock,pointer }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = reducedMotion ? 1.6 : clock.getElapsedTime();
    tempPointer.set(reducedMotion ? 0 : pointer.x,reducedMotion ? 0 : pointer.y);
    pointerUniform.lerp(tempPointer,reducedMotion ? 1 : 0.028);
  });

  return (
    <mesh
      rotation={[-Math.PI / 2,0,mobile ? -0.02 : -0.055]}
      position={mobile ? [0,-1.72,-2.95] : [0,-1.88,-2.82]}
      scale={mobile ? [0.82,0.90,0.82] : [1,1,1]}
    >
      <planeGeometry args={[19,14,mobile ? 112 : 190,mobile ? 78 : 132]} />
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

function DataRibbon({
  mobile,
  reducedMotion,
  ghost = false,
}: SceneProps & { ghost?: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const material = useRef<THREE.ShaderMaterial>(null!);

  const curve = useMemo(() => {
    const c = createMainCurve(mobile);
    if (ghost) {
      c.points.forEach((p,index) => {
        p.y += mobile ? 1.12 : 1.28;
        p.z -= 2.15 + index * 0.04;
        p.x += mobile ? -0.32 : -0.48;
      });
    }
    return c;
  },[mobile,ghost]);

  const geometry = useMemo(
    () => buildRibbonGeometry(curve,mobile ? 160 : 220,ghost ? (mobile ? 0.16 : 0.22) : (mobile ? 0.32 : 0.44)),
    [curve,mobile,ghost]
  );

  const uniforms = useMemo(() => ({
    uTime:{ value:0 },
    uOpacity:{ value:ghost ? 0.26 : 1.0 },
    uPhase:{ value:ghost ? 2.4 : 0.0 },
    uColorA:{ value:new THREE.Color(ghost ? "#06315d" : "#075cd8") },
    uColorB:{ value:new THREE.Color(ghost ? "#11749b" : "#57d8ff") },
  }),[ghost]);

  useFrame(({ clock,pointer }) => {
    if (material.current) material.current.uniforms.uTime.value = reducedMotion ? 2.0 : clock.getElapsedTime();
    if (!group.current) return;

    const px = reducedMotion ? 0 : pointer.x;
    const py = reducedMotion ? 0 : pointer.y;
    const targetZ = ghost ? px * 0.004 : px * 0.009;
    const targetX = ghost ? -py * 0.004 : -py * 0.009;
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z,targetZ,0.025);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x,targetX,0.025);
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={material}
          vertexShader={ribbonVertex}
          fragmentShader={ribbonFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function FlowDust({ mobile,reducedMotion }: SceneProps) {
  const points = useRef<THREE.Points>(null!);
  const curve = useMemo(() => createMainCurve(mobile),[mobile]);
  const count = mobile ? 420 : 760;

  const positions = useMemo(() => {
    const out = new Float32Array(count * 3);
    const zAxis = new THREE.Vector3(0,0,1);

    for (let i = 0; i < count; i += 1) {
      const t = (((i * 97) % 997) + 0.5) / 997;
      const p = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const side = new THREE.Vector3().crossVectors(tangent,zAxis).normalize();

      const seedA = ((i * 43) % 211) / 211 - 0.5;
      const seedB = ((i * 71) % 251) / 251 - 0.5;
      const halo = Math.sin(Math.PI * t);
      const spread = (mobile ? 0.38 : 0.52) * (0.35 + halo);

      p.addScaledVector(side,seedA * spread);
      p.z += seedB * (mobile ? 0.62 : 0.82);
      p.y += Math.sin(i * 1.17) * 0.04;

      out[i * 3] = p.x;
      out[i * 3 + 1] = p.y;
      out[i * 3 + 2] = p.z;
    }
    return out;
  },[count,curve,mobile]);

  useFrame(({ clock }) => {
    if (!points.current || reducedMotion) return;
    points.current.position.x = Math.sin(clock.getElapsedTime() * 0.19) * 0.025;
    points.current.position.y = Math.cos(clock.getElapsedTime() * 0.16) * 0.018;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions,3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#63dfff"
        size={mobile ? 0.014 : 0.018}
        transparent
        opacity={mobile ? 0.22 : 0.28}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function Atmosphere({ mobile,reducedMotion }: SceneProps) {
  const material = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(() => ({ uTime:{ value:0 } }),[]);

  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = reducedMotion ? 1.0 : clock.getElapsedTime();
  });

  return (
    <mesh position={mobile ? [0,0.35,-7.2] : [0,0.48,-7.8]} scale={mobile ? [9.4,7.4,1] : [13.5,8.0,1]}>
      <planeGeometry args={[1,1,1,1]} />
      <shaderMaterial
        ref={material}
        vertexShader={veilVertex}
        fragmentShader={veilFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function DistantParticles({ mobile,reducedMotion }: SceneProps) {
  const points = useRef<THREE.Points>(null!);
  const count = mobile ? 180 : 340;
  const positions = useMemo(() => {
    const out = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const a = i * 2.399963229728653;
      const r = 2.8 + (((i * 47) % 173) / 173) * (mobile ? 5.4 : 8.4);
      out[i * 3] = Math.cos(a) * r;
      out[i * 3 + 1] = (((i * 83) % 199) / 199 - 0.35) * (mobile ? 5.2 : 6.4);
      out[i * 3 + 2] = -3.0 - Math.abs(Math.sin(a * 0.73)) * 6.0;
    }
    return out;
  },[count,mobile]);

  useFrame(({ clock }) => {
    if (!points.current || reducedMotion) return;
    points.current.rotation.y = clock.getElapsedTime() * 0.003;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions,3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#56bfff"
        size={mobile ? 0.012 : 0.016}
        transparent
        opacity={0.17}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function CameraRig({ mobile,reducedMotion }: SceneProps) {
  const { camera } = useThree();
  const target = useMemo(
    () => new THREE.Vector3(0,mobile ? 0.18 : 0.30,-1.75),
    [mobile]
  );
  const desired = useMemo(
    () => new THREE.Vector3(0,mobile ? 0.92 : 1.34,mobile ? 8.65 : 9.35),
    [mobile]
  );

  useFrame(({ pointer }) => {
    const px = reducedMotion ? 0 : pointer.x;
    const py = reducedMotion ? 0 : pointer.y;

    desired.x = (mobile ? 0.055 : 0.26) * px;
    desired.y = (mobile ? 0.92 : 1.34) + (mobile ? 0.035 : 0.11) * py;

    camera.position.lerp(desired,reducedMotion ? 1 : 0.026);
    camera.lookAt(
      target.x + px * (mobile ? 0.012 : 0.055),
      target.y + py * 0.025,
      target.z
    );
  });

  return null;
}

export default function V8Scene({ mobile,reducedMotion }: SceneProps) {
  return (
    <>
      <fog attach="fog" args={["#01050a",mobile ? 8.8 : 10.0,mobile ? 19 : 24]} />
      <CameraRig mobile={mobile} reducedMotion={reducedMotion} />
      <Atmosphere mobile={mobile} reducedMotion={reducedMotion} />
      <DistantParticles mobile={mobile} reducedMotion={reducedMotion} />
      <TopographicField mobile={mobile} reducedMotion={reducedMotion} />
      <DataRibbon mobile={mobile} reducedMotion={reducedMotion} ghost />
      <DataRibbon mobile={mobile} reducedMotion={reducedMotion} />
      <FlowDust mobile={mobile} reducedMotion={reducedMotion} />
    </>
  );
}
