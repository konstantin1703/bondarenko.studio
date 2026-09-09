"use client";

import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { useEffect, useState } from "react";
import * as THREE from "three";
import V8Scene from "./V8Scene";

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2", { powerPreference: "high-performance" }) ||
      canvas.getContext("webgl", { powerPreference: "high-performance" })
    );
  } catch {
    return false;
  }
}

export default function V8VisualLab() {
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 700px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setMobile(mobileQuery.matches);
      setReducedMotion(motionQuery.matches);
      setSupported(canUseWebGL());
      setReady(true);
    };

    sync();
    mobileQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      mobileQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  if (!ready) return <div className="v8-loading" aria-hidden="true" />;
  if (!supported) return <div className="v8-fallback" aria-label="Static visual fallback" />;

  return (
    <div className="v8-lab">
      <Canvas
        key={mobile ? "mobile" : "desktop"}
        className="v8-canvas"
        dpr={mobile ? 1 : [1, 1.45]}
        camera={{
          position: mobile ? [0, 2.15, 8.8] : [0, 2.8, 9.2],
          fov: mobile ? 52 : 43,
          near: 0.1,
          far: 40,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#01050a"), 1);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = mobile ? 0.95 : 1.04;
        }}
      >
        <V8Scene mobile={mobile} reducedMotion={reducedMotion} />

        <EffectComposer multisampling={mobile ? 0 : 4}>
          <Bloom
            intensity={mobile ? 0.72 : 0.95}
            luminanceThreshold={0.45}
            luminanceSmoothing={0.8}
            mipmapBlur
          />
          {!mobile && <Noise opacity={0.012} />}
          <Vignette eskil={false} offset={0.2} darkness={mobile ? 0.72 : 0.62} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
