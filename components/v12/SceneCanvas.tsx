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
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
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
    mat2 m = mat2(0.80, -0.60, 0.60, 0.80);

    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = m * p * 2.03 + vec2(0.17, -0.11);
      a *= 0.5;
    }

    return v;
  }

  float softLine(float d, float width) {
    return 1.0 - smoothstep(width, width * 2.25, abs(d));
  }

  float softRing(vec2 p, float radius, float width) {
    return softLine(length(p) - radius, width);
  }

  float sceneWeight(float index) {
    return 1.0 - smoothstep(0.05, 1.1, abs(uScene - index));
  }

  vec3 heroField(vec2 p, float portrait, float t) {
    float right = smoothstep(mix(-0.22, -0.62, portrait), mix(1.0, 0.58, portrait), p.x);
    float warp = fbm(p * 1.32 + vec2(t * 0.025, -t * 0.018));
    float warp2 = fbm(p * 2.05 - vec2(t * 0.015, t * 0.012));

    float curveA = p.y - (sin(p.x * 1.72 + t * 0.12) * 0.27 + sin(p.x * 4.1 - t * 0.075) * 0.07 + (warp - 0.5) * 0.20);
    float curveB = p.y + 0.35 - (sin(p.x * 1.36 - t * 0.09) * 0.22 + (warp2 - 0.5) * 0.16);
    float curveC = p.y - 0.47 - (sin(p.x * 1.18 + 1.3 + t * 0.065) * 0.18 + (warp - 0.5) * 0.12);

    float silk = exp(-abs(curveA) * 12.0) * 0.72;
    silk += exp(-abs(curveB) * 17.0) * 0.34;
    silk += exp(-abs(curveC) * 15.0) * 0.25;

    float filament = softLine(curveA, 0.013) * 0.74;
    filament += softLine(curveB, 0.010) * 0.28;

    vec2 center = vec2(mix(0.55, 0.13, portrait), mix(-0.02, -0.29, portrait));
    vec2 ellipse = vec2((p.x - center.x) * 0.82, (p.y - center.y) * 1.08);
    float rings = softRing(ellipse, mix(0.62, 0.45, portrait), 0.012) * 0.30;
    rings += softRing(ellipse, mix(0.91, 0.67, portrait), 0.008) * 0.14;

    float aperture = exp(-length(vec2((p.x - center.x) * 0.78, (p.y - center.y) * 0.92)) * 2.3) * 0.24;
    float seam = exp(-abs(p.x - mix(0.58, 0.18, portrait)) * mix(30.0, 17.0, portrait));
    seam *= 0.35 + 0.65 * fbm(vec2(p.y * 2.7 + 1.0, t * 0.035));

    float structure = (silk + filament + rings + aperture + seam) * right;
    float hot = max(0.0, filament + seam * 0.8 - 0.44);

    return vec3(structure, hot, aperture * right);
  }

  vec3 diagnosticsField(vec2 p, float portrait, float t) {
    float focusY = mix(0.60, -0.60, clamp(uFocus / 4.0, 0.0, 1.0));
    focusY = mix(focusY, focusY * 0.70, portrait);

    float n = fbm(p * 1.72 + vec2(t * 0.018, 0.0));
    float split = p.y - (sin(p.x * 2.3 + n * 1.9) * 0.16 + (n - 0.5) * 0.16);
    float fracture = softLine(split, 0.018);

    vec2 cells = floor((p + vec2(t * 0.018, 0.0)) * vec2(7.0, 12.0));
    float gate = step(0.45, hash21(cells));
    fracture *= mix(0.46, 1.0, gate);

    float scan = softLine(fract((p.y + 1.4) * 6.2 - t * 0.055) - 0.5, 0.035) * 0.10;
    float focusBand = exp(-abs(p.y - focusY) * 7.5) * smoothstep(mix(-0.42, -0.70, portrait), 0.9, p.x);
    float echo = exp(-abs(p.y - focusY - 0.09) * 18.0) * 0.22;

    float structure = fracture * 0.66 + scan + focusBand * 0.34 + echo;
    float hot = focusBand * fracture * 0.86;

    return vec3(structure, hot, focusBand * 0.25);
  }

  vec3 capabilitiesField(vec2 p, float portrait, float t) {
    float spread = mix(0.43, 0.31, portrait);
    float phase = t * 0.12;

    float d1 = p.y - spread - sin(p.x * 1.52 + phase) * 0.055;
    float d2 = p.y - sin(p.x * 1.39 - phase * 0.8) * 0.052;
    float d3 = p.y + spread - sin(p.x * 1.64 + phase * 0.66) * 0.05;

    float lanes = exp(-abs(d1) * 23.0) + exp(-abs(d2) * 23.0) + exp(-abs(d3) * 23.0);
    float filaments = softLine(d1, 0.011) + softLine(d2, 0.011) + softLine(d3, 0.011);

    float focus = clamp(uFocus / 2.0, 0.0, 1.0);
    float focusY = mix(spread, -spread, focus);
    float nodeX = mix(0.18, 0.58, focus);
    nodeX = mix(nodeX, mix(-0.08, 0.15, focus), portrait);

    vec2 nodeP = vec2((p.x - nodeX) * 0.90, p.y - focusY);
    float node = exp(-length(nodeP) * 4.8);
    float ringA = softRing(nodeP, 0.23, 0.010) * 0.27;
    float ringB = softRing(nodeP, 0.40, 0.009) * 0.16;

    float junction = exp(-abs(p.x - nodeX) * 22.0) * exp(-abs(p.y - focusY) * 8.0);

    float structure = lanes * 0.27 + filaments * 0.48 + node * 0.31 + ringA + ringB + junction * 0.42;
    float hot = node * 0.54 + junction * 0.75;

    return vec3(structure, hot, node * 0.38);
  }

  vec3 briefField(vec2 p, float portrait, float t) {
    vec2 q = p;
    q.y += portrait * 0.18;

    float horizon = smoothstep(0.78, -0.12, q.y);
    float depth = max(0.20, 1.26 + q.y);
    float gx = softLine(fract((q.x / depth + 2.0) * 7.0) - 0.5, 0.028);
    float gy = softLine(fract((q.y + 1.35) * 7.5) - 0.5, 0.030);
    float grid = (gx + gy) * horizon * 0.16;

    float assembly = q.y - mix(-0.02, -0.10, portrait) - sin(q.x * 1.9 + t * 0.16) * 0.042;
    float lineA = exp(-abs(assembly) * 22.0) * 0.43;
    float lineHot = softLine(assembly, 0.012) * 0.48;

    float beamX = mix(0.64, 0.16, portrait);
    float beam = exp(-abs(q.x - beamX) * mix(34.0, 18.0, portrait));
    beam *= smoothstep(-0.95, 0.55, q.y) * 0.34;

    float pulse = 0.65 + 0.35 * sin(t * 0.85);
    float hot = (lineHot + beam * 0.55) * pulse;
    float structure = grid + lineA + lineHot + beam;

    return vec3(structure, hot, beam * 0.42);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(1.0, uResolution.y);
    float portrait = 1.0 - smoothstep(0.80, 1.06, aspect);

    vec2 landscape = uv - 0.5;
    landscape.x *= aspect;
    landscape.x -= 0.10;

    vec2 mobile = vec2((uv.x - 0.5) * 1.10, (uv.y - 0.5) * 1.34);
    mobile.y += 0.03;

    vec2 p = mix(landscape, mobile, portrait);
    p += vec2(
      uPointer.x * mix(0.040, 0.017, portrait),
      uPointer.y * mix(0.025, 0.010, portrait)
    );

    float w0 = sceneWeight(0.0);
    float w1 = sceneWeight(1.0);
    float w2 = sceneWeight(2.0);
    float w3 = sceneWeight(3.0);
    float total = max(0.001, w0 + w1 + w2 + w3);

    vec3 field = (
      heroField(p, portrait, uTime) * w0 +
      diagnosticsField(p, portrait, uTime) * w1 +
      capabilitiesField(p, portrait, uTime) * w2 +
      briefField(p, portrait, uTime) * w3
    ) / total;

    float structure = field.r;
    float hot = field.g;
    float volume = field.b;

    float organic = fbm(p * 1.08 + vec2(uTime * 0.011, -uTime * 0.008));
    float material = smoothstep(0.48, 0.86, organic);
    material *= smoothstep(mix(-0.40, -0.70, portrait), 0.90, p.x);

    vec3 black = vec3(0.010, 0.011, 0.014);
    vec3 graphite = vec3(0.046, 0.051, 0.060);
    vec3 steel = vec3(0.44, 0.49, 0.57);
    vec3 silver = vec3(0.78, 0.80, 0.81);
    vec3 champagne = vec3(0.72, 0.59, 0.37);

    vec3 color = black;
    color += graphite * material * mix(0.62, 0.78, portrait);
    color += steel * structure * 0.50;
    color += silver * pow(max(structure - 0.38, 0.0), 1.55) * 0.72;
    color += champagne * pow(max(hot - 0.34, 0.0), 1.65) * 0.44;
    color += silver * volume * 0.19;

    float vignette = smoothstep(1.06, 0.18, length((uv - 0.5) * vec2(0.93, 1.10)));
    float leftShade = mix(0.40, 1.0, smoothstep(mix(0.10, -0.02, portrait), mix(0.76, 0.84, portrait), uv.x));
    float topShade = 0.86 + 0.14 * smoothstep(0.0, 0.42, uv.y);
    color *= (0.34 + vignette * 0.84) * leftShade * topShade;

    float grain = (hash21(gl_FragCoord.xy + fract(uTime) * 97.0) - 0.5) * 0.014;
    color += grain;

    gl_FragColor = vec4(color, 0.985);
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
      uScene: { value: scene },
      uFocus: { value: focus },
      uPointer: { value: new THREE.Vector2() },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [focus, scene],
  );

  useFrame(({ clock, size }, delta) => {
    if (!material.current) return;

    if (reducedMotion) {
      currentScene.current = scene;
      currentFocus.current = focus;
      smoothPointer.current.set(0, 0);
    } else {
      currentScene.current = THREE.MathUtils.damp(currentScene.current, scene, 2.55, delta);
      currentFocus.current = THREE.MathUtils.damp(currentFocus.current, focus, 4.2, delta);
      smoothPointer.current.x = THREE.MathUtils.damp(
        smoothPointer.current.x,
        pointerTarget.current.x,
        3.0,
        delta,
      );
      smoothPointer.current.y = THREE.MathUtils.damp(
        smoothPointer.current.y,
        pointerTarget.current.y,
        3.0,
        delta,
      );
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
        transparent
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
      if (media.matches || event.pointerType === "touch") return;
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
        dpr={[1, 1.45]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
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
