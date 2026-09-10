"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const sceneMap = {
  hero: 0,
  diagnostics: 1,
  capabilities: 2,
  brief: 3,
} as const;

type SceneName = keyof typeof sceneMap;

type Transform = {
  p: [number, number, number];
  r: [number, number, number];
  s: [number, number, number];
};

const layouts: Transform[][] = [
  [
    { p: [2.35, 1.05, 0], r: [0.18, -0.52, 0.08], s: [1.05, 2.8, 0.2] },
    { p: [3.45, 0.45, -0.45], r: [-0.08, -0.16, -0.18], s: [0.72, 2.1, 0.14] },
    { p: [1.45, -0.15, -0.65], r: [0.22, 0.2, 0.26], s: [0.62, 1.55, 0.12] },
    { p: [2.75, -1.35, -0.2], r: [-0.14, 0.42, 0.12], s: [1.65, 0.34, 0.12] },
    { p: [4.05, -1.15, -1.05], r: [0.18, -0.48, -0.36], s: [0.45, 1.15, 0.1] },
    { p: [0.75, 1.35, -1.15], r: [-0.36, 0.24, 0.3], s: [0.4, 1.0, 0.09] },
    { p: [3.9, 1.65, -1.4], r: [0.2, 0.15, 0.5], s: [0.34, 0.9, 0.08] },
  ],
  [
    { p: [3.35, 1.45, -0.4], r: [0.34, -0.8, 0.25], s: [0.72, 1.75, 0.16] },
    { p: [2.15, 0.85, 0], r: [-0.2, 0.7, -0.32], s: [0.55, 1.3, 0.12] },
    { p: [4.15, 0.1, -0.85], r: [0.5, 0.2, 0.5], s: [0.48, 1.2, 0.1] },
    { p: [2.7, -0.75, -0.15], r: [-0.4, -0.35, 0.44], s: [0.78, 1.5, 0.13] },
    { p: [4.3, -1.45, -1.2], r: [0.18, 0.9, -0.22], s: [0.4, 1.0, 0.09] },
    { p: [1.15, -1.2, -0.7], r: [0.5, -0.15, -0.5], s: [0.46, 1.05, 0.09] },
    { p: [0.95, 1.6, -1.5], r: [-0.2, 0.4, 0.7], s: [0.34, 0.8, 0.08] },
  ],
  [
    { p: [2.0, 1.35, -0.3], r: [0.04, -0.28, 0.02], s: [0.8, 1.55, 0.16] },
    { p: [3.15, 1.25, -0.4], r: [0.08, 0.25, 0.04], s: [0.8, 1.55, 0.16] },
    { p: [4.28, 1.15, -0.5], r: [0.02, -0.15, -0.05], s: [0.8, 1.55, 0.16] },
    { p: [2.05, -0.75, -0.45], r: [-0.08, 0.22, -0.04], s: [0.72, 1.35, 0.14] },
    { p: [3.18, -0.82, -0.55], r: [0.06, -0.22, 0.05], s: [0.72, 1.35, 0.14] },
    { p: [4.28, -0.9, -0.65], r: [-0.04, 0.18, 0.02], s: [0.72, 1.35, 0.14] },
    { p: [5.0, 0.1, -1.4], r: [0.2, 0.55, 0.5], s: [0.3, 0.75, 0.08] },
  ],
  [
    { p: [1.5, 1.45, -0.45], r: [0, -0.08, 0], s: [0.46, 1.45, 0.1] },
    { p: [2.15, 1.45, -0.45], r: [0, 0.06, 0], s: [0.46, 1.45, 0.1] },
    { p: [2.8, 1.45, -0.45], r: [0, -0.05, 0], s: [0.46, 1.45, 0.1] },
    { p: [1.5, -0.35, -0.55], r: [0, 0.06, 0], s: [0.46, 1.45, 0.1] },
    { p: [2.15, -0.35, -0.55], r: [0, -0.06, 0], s: [0.46, 1.45, 0.1] },
    { p: [2.8, -0.35, -0.55], r: [0, 0.05, 0], s: [0.46, 1.45, 0.1] },
    { p: [3.45, 0.55, -0.9], r: [0.08, -0.2, 0.08], s: [0.36, 2.0, 0.08] },
  ],
];

function Atmosphere() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame(({ clock, pointer }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = clock.elapsedTime;
    material.current.uniforms.uPointer.value.lerp(pointer, 0.04);
  });

  return (
    <mesh position={[1.6, 0, -4.6]} scale={[11.5, 7.2, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uPointer;

          float hash(vec2 p){
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p){
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }

          float fbm(vec2 p){
            float v = 0.0;
            float a = 0.5;
            mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
            for(int i = 0; i < 5; i++){
              v += a * noise(p);
              p = r * p * 2.03 + 0.13;
              a *= 0.5;
            }
            return v;
          }

          void main(){
            vec2 uv = vUv;
            vec2 p = uv * vec2(3.3, 2.2);
            p += uPointer * 0.06;
            float n = fbm(p + vec2(uTime * 0.025, -uTime * 0.018));
            float n2 = fbm(p * 1.7 - vec2(uTime * 0.014, 0.0));
            float ridge = smoothstep(0.56, 0.9, n * 0.78 + n2 * 0.32);
            float center = 1.0 - smoothstep(0.0, 0.82, distance(uv, vec2(0.7, 0.48)));
            vec3 base = vec3(0.018, 0.019, 0.022);
            vec3 silver = vec3(0.38, 0.4, 0.43);
            vec3 cool = vec3(0.11, 0.13, 0.18);
            vec3 color = base + silver * ridge * 0.24 + cool * center * 0.2;
            float alpha = 0.82 * smoothstep(0.0, 0.16, uv.x);
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

function ShardField({ scene }: { scene: number }) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ pointer, clock }, delta) => {
    const targetLayout = layouts[scene] ?? layouts[0];

    meshes.current.forEach((mesh, index) => {
      if (!mesh) return;
      const target = targetLayout[index];
      mesh.position.x = THREE.MathUtils.damp(mesh.position.x, target.p[0], 4.5, delta);
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, target.p[1], 4.5, delta);
      mesh.position.z = THREE.MathUtils.damp(mesh.position.z, target.p[2], 4.5, delta);
      mesh.rotation.x = THREE.MathUtils.damp(mesh.rotation.x, target.r[0], 4.2, delta);
      mesh.rotation.y = THREE.MathUtils.damp(mesh.rotation.y, target.r[1], 4.2, delta);
      mesh.rotation.z = THREE.MathUtils.damp(mesh.rotation.z, target.r[2], 4.2, delta);
      mesh.scale.x = THREE.MathUtils.damp(mesh.scale.x, target.s[0], 4.2, delta);
      mesh.scale.y = THREE.MathUtils.damp(mesh.scale.y, target.s[1], 4.2, delta);
      mesh.scale.z = THREE.MathUtils.damp(mesh.scale.z, target.s[2], 4.2, delta);
    });

    if (group.current) {
      group.current.position.x = THREE.MathUtils.damp(
        group.current.position.x,
        pointer.x * 0.14,
        2.8,
        delta,
      );
      group.current.position.y = THREE.MathUtils.damp(
        group.current.position.y,
        pointer.y * 0.08 + Math.sin(clock.elapsedTime * 0.2) * 0.025,
        2.8,
        delta,
      );
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        pointer.x * 0.025,
        2.4,
        delta,
      );
    }
  });

  return (
    <group ref={group}>
      {layouts[0].map((initial, index) => (
        <mesh
          key={index}
          ref={(node) => {
            meshes.current[index] = node;
          }}
          position={initial.p}
          rotation={initial.r}
          scale={initial.s}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#15181d" : "#0b0d11"}
            metalness={0.92}
            roughness={0.22 + index * 0.025}
            emissive={index === 0 ? "#151a22" : "#08090c"}
            emissiveIntensity={0.55}
          />
          <Edges color="#b9bec5" threshold={18} opacity={0.32} transparent />
        </mesh>
      ))}
    </group>
  );
}

function World({ scene }: { scene: number }) {
  return (
    <>
      <fog attach="fog" args={["#070709", 6, 16]} />
      <ambientLight intensity={0.34} />
      <directionalLight position={[5, 6, 5]} intensity={2.7} color="#f4f1e8" />
      <pointLight position={[1.5, -2, 3]} intensity={7} distance={9} color="#7f91b5" />
      <pointLight position={[4.5, 2.3, 1]} intensity={4} distance={7} color="#d8d4c8" />
      <Atmosphere />
      <ShardField scene={scene} />
    </>
  );
}

export default function SceneCanvas() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const update = (event: Event) => {
      const detail = (event as CustomEvent<{ scene?: SceneName }>).detail;
      if (!detail?.scene) return;
      setScene(sceneMap[detail.scene] ?? 0);
    };

    window.addEventListener("bnd:scene", update);
    return () => window.removeEventListener("bnd:scene", update);
  }, []);

  return (
    <div className="v12-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7.3], fov: 46 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <World scene={scene} />
      </Canvas>
    </div>
  );
}
