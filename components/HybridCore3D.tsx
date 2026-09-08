"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./HybridCore3D.module.css";

function CoreMachine({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null!);
  const rings = useRef<THREE.Group>(null!);
  const satellites = useRef<THREE.Group>(null!);

  const stars = useMemo(() => {
    const count = 110;
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const angle = i * 2.399963229728653;
      const radius = 2.7 + ((i * 37) % 41) / 41 * 2.2;
      const height = (((i * 53) % 97) / 97 - 0.5) * 4.5;

      data[i * 3] = Math.cos(angle) * radius;
      data[i * 3 + 1] = height;
      data[i * 3 + 2] = Math.sin(angle) * radius * 0.62;
    }

    return data;
  }, []);

  useFrame(({ clock, pointer }, delta) => {
    if (!root.current || !rings.current || !satellites.current) return;

    const t = clock.getElapsedTime();
    const px = reducedMotion ? 0 : pointer.x;
    const py = reducedMotion ? 0 : pointer.y;

    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      (reducedMotion ? -0.18 : -0.18 + px * 0.18) + (reducedMotion ? 0 : Math.sin(t * 0.22) * 0.04),
      0.05,
    );

    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      reducedMotion ? 0.08 : 0.08 - py * 0.11,
      0.05,
    );

    if (!reducedMotion) {
      rings.current.rotation.z += delta * 0.07;
      rings.current.rotation.y -= delta * 0.045;
      satellites.current.rotation.y += delta * 0.05;
    }
  });

  const glowMaterial = (
    <meshBasicMaterial
      color="#3bb8ff"
      transparent
      opacity={0.82}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
      toneMapped={false}
    />
  );

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#8dd8ff" />
      <pointLight position={[-3.5, -1, 3]} intensity={14} distance={10} color="#155dff" />
      <pointLight position={[3, 1.5, 2]} intensity={10} distance={8} color="#725bff" />

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#72cfff"
          transparent
          opacity={0.42}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <group ref={root} rotation={[0.08, -0.18, 0]}>
        <group ref={rings}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.15, 0.012, 12, 180]} />
            <meshBasicMaterial color="#1c9cff" transparent opacity={0.52} depthWrite={false} />
          </mesh>
          <mesh rotation={[Math.PI / 2.7, Math.PI / 3.2, 0]}>
            <torusGeometry args={[2.62, 0.009, 10, 180]} />
            <meshBasicMaterial color="#7084ff" transparent opacity={0.28} depthWrite={false} />
          </mesh>
          <mesh rotation={[Math.PI / 3.5, -Math.PI / 4, Math.PI / 2]}>
            <torusGeometry args={[1.7, 0.015, 12, 160]} />
            <meshBasicMaterial color="#42d7ff" transparent opacity={0.34} depthWrite={false} />
          </mesh>
        </group>

        <mesh rotation={[0.55, 0.65, 0.18]} scale={1.08}>
          <boxGeometry args={[2.05, 2.05, 2.05]} />
          <meshBasicMaterial
            color="#1b75d0"
            wireframe
            transparent
            opacity={0.38}
            depthWrite={false}
          />
        </mesh>

        <mesh rotation={[0.55, 0.65, 0.18]}>
          <boxGeometry args={[1.82, 1.82, 1.82]} />
          <meshStandardMaterial
            color="#061421"
            metalness={0.85}
            roughness={0.24}
            emissive="#041d37"
            emissiveIntensity={0.85}
            transparent
            opacity={0.92}
          />
        </mesh>

        <mesh rotation={[-0.3, 0.55, 0.85]} scale={0.93}>
          <octahedronGeometry args={[1.15, 0]} />
          <meshStandardMaterial
            color="#091728"
            metalness={0.72}
            roughness={0.2}
            emissive="#0a3f78"
            emissiveIntensity={1.4}
            transparent
            opacity={0.96}
          />
        </mesh>

        <mesh scale={0.57}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color="#218dff"
            transparent
            opacity={0.34}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        <mesh scale={0.27}>
          <sphereGeometry args={[1, 48, 48]} />
          {glowMaterial}
        </mesh>

        <mesh scale={0.12}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#e9f8ff" toneMapped={false} />
        </mesh>

        <group ref={satellites}>
          {[
            { p: [2.5, 1.0, 0.25], r: [0.1, -0.35, -0.08], c: "#2aa8ff" },
            { p: [-2.35, 0.85, -0.2], r: [-0.08, 0.4, 0.1], c: "#6f72ff" },
            { p: [2.25, -1.35, -0.1], r: [0.08, -0.25, 0.06], c: "#2ed4ff" },
            { p: [-2.1, -1.45, 0.15], r: [-0.04, 0.3, -0.08], c: "#347dff" },
          ].map((node, index) => (
            <group key={index} position={node.p as [number, number, number]} rotation={node.r as [number, number, number]}>
              <mesh>
                <boxGeometry args={[0.82, 0.48, 0.055]} />
                <meshStandardMaterial
                  color="#06111b"
                  metalness={0.58}
                  roughness={0.3}
                  emissive={node.c}
                  emissiveIntensity={0.16}
                  transparent
                  opacity={0.9}
                />
              </mesh>
              <mesh position={[0, 0, 0.036]}>
                <boxGeometry args={[0.62, 0.018, 0.012]} />
                <meshBasicMaterial color={node.c} transparent opacity={0.72} />
              </mesh>
              <mesh position={[-0.2, -0.095, 0.036]}>
                <boxGeometry args={[0.22, 0.012, 0.012]} />
                <meshBasicMaterial color={node.c} transparent opacity={0.42} />
              </mesh>
              <mesh position={[0.27, 0.17, 0.055]}>
                <sphereGeometry args={[0.035, 18, 18]} />
                <meshBasicMaterial color="#dff7ff" toneMapped={false} />
              </mesh>
            </group>
          ))}
        </group>

        <mesh position={[1.45, 0.53, 0]} rotation={[0, 0, -0.31]}>
          <boxGeometry args={[1.55, 0.018, 0.018]} />
          <meshBasicMaterial color="#2aa8ff" transparent opacity={0.35} depthWrite={false} />
        </mesh>
        <mesh position={[-1.35, 0.48, -0.05]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[1.45, 0.016, 0.016]} />
          <meshBasicMaterial color="#6f72ff" transparent opacity={0.28} depthWrite={false} />
        </mesh>
        <mesh position={[1.25, -0.72, 0]} rotation={[0, 0, 0.47]}>
          <boxGeometry args={[1.5, 0.016, 0.016]} />
          <meshBasicMaterial color="#2ed4ff" transparent opacity={0.3} depthWrite={false} />
        </mesh>
        <mesh position={[-1.15, -0.78, 0]} rotation={[0, 0, -0.56]}>
          <boxGeometry args={[1.35, 0.016, 0.016]} />
          <meshBasicMaterial color="#347dff" transparent opacity={0.28} depthWrite={false} />
        </mesh>
      </group>
    </>
  );
}

export default function HybridCore3D() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <div className={styles.root} aria-label="Интерактивное цифровое ядро BONDARENKO.STUDIO">
      <div className={styles.glow} />
      <div className={styles.grid} />
      <Canvas
        className={styles.canvas}
        camera={{ position: [0, 0.08, 7.8], fov: 38, near: 0.1, far: 50 }}
        dpr={[1, 1.55]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <CoreMachine reducedMotion={reducedMotion} />
      </Canvas>
      <div className={styles.scan} aria-hidden="true" />
      <div className={styles.axisX} aria-hidden="true" />
      <div className={styles.axisY} aria-hidden="true" />
      <div className={styles.badge} aria-hidden="true">
        <span>LIVE CORE</span>
        <b>WEBGL / ACTIVE</b>
      </div>
    </div>
  );
}
