"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";

const sceneMap = {
  hero: 0,
  diagnostics: 1,
  capabilities: 2,
  brief: 3,
} as const;

type SceneName = keyof typeof sceneMap;
type SceneEvent = CustomEvent<{ scene?: SceneName }>;
type FocusEvent = CustomEvent<{ value?: number }>;
type PointerState = { x: number; y: number };

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uScene;
  uniform float uFocus;
  uniform vec2 uPointer;
  uniform vec2 uResolution;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 r = mat2(0.80, -0.60, 0.60, 0.80);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = r * p * 2.03 + vec2(0.13, -0.09);
      a *= 0.5;
    }
    return v;
  }

  float line(float d, float w) {
    return 1.0 - smoothstep(0.0, w, abs(d));
  }

  float sceneWeight(float index) {
    return 1.0 - smoothstep(0.18, 0.92, abs(uScene - index));
  }

  float metalVeil(vec2 p, float t) {
    vec2 q = p;
    q.y += sin(p.x * 1.65 + t * 0.13) * 0.10;
    q.x += sin(p.y * 1.35 - t * 0.11) * 0.07;

    float n1 = fbm(q * 1.55 + vec2(t * 0.032, -t * 0.018));
    float n2 = fbm(q * 3.05 - vec2(t * 0.018, t * 0.026));
    float ridgeA = 1.0 - smoothstep(0.035, 0.23, abs(n1 - 0.53));
    float ridgeB = 1.0 - smoothstep(0.022, 0.12, abs(n2 - 0.55));
    return ridgeA * 0.76 + ridgeB * 0.22;
  }

  float heroField(vec2 p, float portrait, float t) {
    vec2 center = vec2(mix(0.58, 0.06, portrait), mix(0.02, -0.25, portrait));
    vec2 rP = vec2((p.x - center.x) * mix(0.88, 1.0, portrait), p.y - center.y);
    float r = length(rP);

    float ringA = line(r - mix(0.58, 0.42, portrait), 0.018);
    float ringB = line(r - mix(0.82, 0.60, portrait), 0.010) * 0.38;
    float halo = exp(-r * 2.65);

    float warp = fbm(p * 1.5 + vec2(t * 0.026, 0.0));
    float ribbonA = line(sin((p.y + warp * 0.34) * 8.0 - p.x * 2.6 + t * 0.25), 0.17);
    float ribbonB = line(sin((p.y - warp * 0.20) * 12.5 + p.x * 1.8 - t * 0.17), 0.11) * 0.55;
    float mask = smoothstep(mix(-0.18, -0.48, portrait), mix(0.95, 0.58, portrait), p.x);

    float blade = exp(-abs(p.x - mix(0.50, 0.10, portrait)) * mix(32.0, 19.0, portrait));
    blade *= 0.6 + 0.4 * fbm(vec2(p.y * 3.0, t * 0.04));

    return (ringA * 0.85 + ringB + halo * 0.26 + ribbonA * 0.65 + ribbonB * 0.34 + blade * 0.78) * mask;
  }

  float diagnosticsField(vec2 p, float portrait, float t) {
    float focusY = mix(0.58, -0.58, clamp(uFocus / 4.0, 0.0, 1.0));
    focusY *= mix(1.0, 0.72, portrait);
    float band = exp(-abs(p.y - focusY) * 9.0);

    float n = fbm(p * 2.0 + vec2(t * 0.025, 0.0));
    float fracture = line(sin((p.y + n * 0.24) * 13.0 + p.x * 4.2 + t * 0.14), 0.085);
    float chips = step(0.64, hash21(floor((p + vec2(t * 0.035, 0.0)) * vec2(7.0, 14.0))));
    float scan = line(fract((p.y + 1.8) * 7.0 + t * 0.08) - 0.5, 0.045);

    return fracture * chips * 0.75 + band * 0.62 + scan * 0.12;
  }

  float capabilitiesField(vec2 p, float portrait, float t) {
    float spread = mix(0.46, 0.31, portrait);
    float lane1 = line(p.y - (spread + sin(p.x * 1.7 + t * 0.18) * 0.06), 0.026);
    float lane2 = line(p.y - sin(p.x * 1.45 - t * 0.15) * 0.05, 0.026);
    float lane3 = line(p.y - (-spread + sin(p.x * 1.8 + t * 0.13) * 0.06), 0.026);

    float rings = 0.0;
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      vec2 c = vec2(mix(0.18 + fi * 0.38, -0.10 + fi * 0.14, portrait), mix(0.06 - fi * 0.04, -0.10, portrait));
      float r = length(vec2((p.x - c.x) * 0.92, p.y - c.y));
      rings += line(r - mix(0.34 + fi * 0.13, 0.27 + fi * 0.09, portrait), 0.012) * (0.55 - fi * 0.12);
    }

    float focusX = mix(0.04, 0.72, clamp(uFocus / 2.0, 0.0, 1.0));
    focusX = mix(focusX, mix(-0.12, 0.16, clamp(uFocus / 2.0, 0.0, 1.0)), portrait);
    float glow = exp(-length(vec2((p.x - focusX) * 1.0, p.y + portrait * 0.08)) * 3.6);

    return (lane1 + lane2 + lane3) * 0.58 + rings + glow * 0.42;
  }

  float briefField(vec2 p, float portrait, float t) {
    vec2 q = p;
    q.y += portrait * 0.17;
    float perspective = max(0.22, 1.45 + q.y);
    float horizon = smoothstep(0.08, 0.90, -q.y);
    float gx = line(fract((q.x / perspective + 2.0) * 9.0) - 0.5, 0.048);
    float gy = line(fract((q.y + 1.4) * 9.0) - 0.5, 0.048);
    float grid = (gx + gy) * horizon;

    float pulse = line(p.y + mix(0.12, -0.02, portrait) + sin(p.x * 2.2 + t * 0.25) * 0.05, 0.023);
    float beam = exp(-abs(p.x - mix(0.63, 0.12, portrait)) * mix(30.0, 17.0, portrait));
    beam *= smoothstep(-0.85, 0.82, p.y);

    return grid * 0.24 + pulse * 0.72 + beam * 0.62;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    float portrait = 1.0 - smoothstep(0.78, 1.04, aspect);

    vec2 pLandscape = uv - 0.5;
    pLandscape.x *= aspect;
    pLandscape.x -= 0.06;

    vec2 pPortrait = vec2((uv.x - 0.5) * 1.10, (uv.y - 0.5) * 1.30);
    pPortrait.y += 0.02;

    vec2 p = mix(pLandscape, pPortrait, portrait);
    p += vec2(uPointer.x * mix(0.055, 0.024, portrait), uPointer.y * mix(0.034, 0.016, portrait));

    float t = uTime;
    float w0 = sceneWeight(0.0);
    float w1 = sceneWeight(1.0);
    float w2 = sceneWeight(2.0);
    float w3 = sceneWeight(3.0);
    float sumW = max(0.001, w0 + w1 + w2 + w3);

    float sceneField = (
      heroField(p, portrait, t) * w0 +
      diagnosticsField(p, portrait, t) * w1 +
      capabilitiesField(p, portrait, t) * w2 +
      briefField(p, portrait, t) * w3
    ) / sumW;

    float veil = metalVeil(p + vec2(uScene * 0.08, -uScene * 0.035), t);
    float broad = fbm(p * 0.92 + vec2(-t * 0.012, t * 0.009));
    float broadMask = smoothstep(0.42, 0.78, broad);

    vec3 black = vec3(0.008, 0.009, 0.012);
    vec3 graphite = vec3(0.055, 0.061, 0.070);
    vec3 steel = vec3(0.40, 0.46, 0.55);
    vec3 silver = vec3(0.82, 0.85, 0.88);
    vec3 warm = vec3(0.76, 0.72, 0.64);

    vec3 color = black;
    color += graphite * broadMask * 0.75;
    color += steel * veil * 0.34;
    color += steel * sceneField * 0.58;
    color += silver * pow(max(sceneField - 0.36, 0.0), 1.45) * 0.82;
    color += silver * pow(max(veil - 0.50, 0.0), 2.0) * 0.34;
    color += warm * pow(max(sceneField - 1.05, 0.0), 2.1) * 0.25;

    float pointerGlow = exp(-length((uv - 0.5) - vec2(uPointer.x, -uPointer.y) * 0.10) * 4.2);
    color += steel * pointerGlow * 0.035;

    float vignette = smoothstep(1.08, 0.14, length((uv - 0.5) * vec2(0.92, 1.08)));
    float leftShade = mix(0.48, 1.0, smoothstep(mix(0.16, 0.03, portrait), mix(0.72, 0.88, portrait), uv.x));
    color *= (0.42 + vignette * 0.92) * leftShade;

    float pulse = 0.94 + 0.06 * sin(t * 0.65 + uv.y * 2.4);
    color *= pulse;

    float grain = (hash21(gl_FragCoord.xy + fract(t) * 1000.0) - 0.5) * 0.022;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function SignalField({
  scene,
  focus,
  pointerTarget,
  reducedMotion,
}: {
  scene: number;
  focus: number;
  pointerTarget: MutableRefObject<PointerState>;
  reducedMotion: boolean;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const currentScene = useRef(scene);
  const currentFocus = useRef(focus);
  const smoothPointer = useRef(new THREE.Vector2());

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScene: { value: 0 },
      uFocus: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame(({ clock, size }, delta) => {
    if (!material.current) return;

    if (reducedMotion) {
      currentScene.current = scene;
      currentFocus.current = focus;
      smoothPointer.current.set(0, 0);
    } else {
      currentScene.current = THREE.MathUtils.damp(currentScene.current, scene, 2.4, delta);
      currentFocus.current = THREE.MathUtils.damp(currentFocus.current, focus, 4.2, delta);
      smoothPointer.current.x = THREE.MathUtils.damp(smoothPointer.current.x, pointerTarget.current.x, 3.6, delta);
      smoothPointer.current.y = THREE.MathUtils.damp(smoothPointer.current.y, pointerTarget.current.y, 3.6, delta);
    }

    material.current.uniforms.uTime.value = reducedMotion ? 0 : clock.elapsedTime;
    material.current.uniforms.uScene.value = currentScene.current;
    material.current.uniforms.uFocus.value = currentFocus.current;
    material.current.uniforms.uPointer.value.copy(smoothPointer.current);
    material.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function SceneCanvas() {
  const [scene, setScene] = useState(0);
  const [focus, setFocus] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerTarget = useRef<PointerState>({ x: 0, y: 0 });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);

    const updateScene = (event: Event) => {
      const detail = (event as SceneEvent).detail;
      if (!detail?.scene) return;
      setScene(sceneMap[detail.scene] ?? 0);
      setFocus(0);
    };

    const updateFocus = (event: Event) => {
      const detail = (event as FocusEvent).detail;
      if (typeof detail?.value !== "number") return;
      setFocus(detail.value);
    };

    const updatePointer = (event: PointerEvent) => {
      if (media.matches) return;
      pointerTarget.current.x = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      pointerTarget.current.y = -((event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1);
    };

    const resetPointer = () => {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
    };

    window.addEventListener("bnd:scene", updateScene);
    window.addEventListener("bnd:focus", updateFocus);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("blur", resetPointer);

    return () => {
      media.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("bnd:scene", updateScene);
      window.removeEventListener("bnd:focus", updateFocus);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("blur", resetPointer);
    };
  }, []);

  return (
    <div className="v12-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.4]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
        fallback={<div className="v12-scene-fallback" />}
      >
        <SignalField
          scene={scene}
          focus={focus}
          pointerTarget={pointerTarget}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
