"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
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
    float value = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
    for (int i = 0; i < 5; i++) {
      value += amp * noise(p);
      p = rot * p * 2.04 + vec2(0.11, -0.07);
      amp *= 0.5;
    }
    return value;
  }

  float softLine(float value, float width) {
    return 1.0 - smoothstep(0.0, width, abs(value));
  }

  float band(float value, float center, float width) {
    return 1.0 - smoothstep(width, width * 1.8, abs(value - center));
  }

  float sceneWeight(float sceneIndex) {
    return 1.0 - smoothstep(0.18, 0.92, abs(uScene - sceneIndex));
  }

  float heroPattern(vec2 p, vec2 uv, float t) {
    float n = fbm(p * 1.15 + vec2(t * 0.035, -t * 0.022));
    float n2 = fbm(p * 2.0 - vec2(t * 0.018, t * 0.012));
    float waveA = softLine(sin((p.y + n * 0.38) * 8.4 - p.x * 2.25), 0.16);
    float waveB = softLine(sin((p.y - n2 * 0.28) * 13.2 + p.x * 1.55), 0.12);
    float rightMask = smoothstep(-0.15, 0.68, p.x);
    float veil = (waveA * 0.48 + waveB * 0.22) * rightMask;

    float beamX = p.x - 0.58;
    float beam = exp(-abs(beamX) * 62.0) * (0.38 + 0.62 * smoothstep(0.94, -0.25, abs(p.y)));

    vec2 haloP = vec2((p.x - 0.56) * 0.88, p.y * 1.08);
    float radius = length(haloP);
    float halo = softLine(radius - 0.64, 0.012) * 0.55;
    halo += softLine(radius - 0.92, 0.008) * 0.22;

    float caustic = pow(max(0.0, 1.0 - length(vec2((p.x - 0.52) * 0.72, p.y)) / 1.22), 3.0);
    return veil + beam * 1.8 + halo * rightMask + caustic * 0.25;
  }

  float diagnosticsPattern(vec2 p, float t) {
    float n = fbm(p * 1.8 + vec2(t * 0.02, 0.0));
    float fault = softLine(sin((p.y + n * 0.22) * 11.0 + p.x * 3.8), 0.10);
    float segments = step(0.38, hash21(floor((p + vec2(t * 0.025, 0.0)) * vec2(6.0, 13.0))));
    float scan = softLine(fract((p.y + 1.7) * 5.8 + t * 0.06) - 0.5, 0.06) * 0.16;
    float focusY = mix(0.62, -0.62, clamp(uFocus / 4.0, 0.0, 1.0));
    float focusBand = exp(-abs(p.y - focusY) * 7.5) * smoothstep(-0.3, 0.9, p.x);
    return fault * segments * 0.58 + scan + focusBand * 0.34;
  }

  float capabilitiesPattern(vec2 p, float t) {
    float lane1 = softLine(p.y - (0.46 + sin(p.x * 1.55 + t * 0.19) * 0.055), 0.025);
    float lane2 = softLine(p.y - (0.02 + sin(p.x * 1.42 - t * 0.16) * 0.05), 0.025);
    float lane3 = softLine(p.y - (-0.42 + sin(p.x * 1.67 + t * 0.13) * 0.05), 0.025);
    float lanes = lane1 + lane2 + lane3;
    float rings = 0.0;
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      vec2 center = vec2(0.34 + fi * 0.34, 0.08 - fi * 0.05);
      float r = length(vec2((p.x - center.x) * 0.88, p.y - center.y));
      rings += softLine(r - (0.48 + fi * 0.14), 0.012) * (0.36 - fi * 0.07);
    }
    float focusX = mix(0.08, 0.78, clamp(uFocus / 2.0, 0.0, 1.0));
    float focusGlow = exp(-length(vec2((p.x - focusX) * 0.9, p.y)) * 3.1);
    return lanes * 0.62 + rings + focusGlow * 0.28;
  }

  float briefPattern(vec2 p, float t) {
    vec2 q = p;
    float horizon = smoothstep(-0.05, 0.85, -q.y);
    float perspective = max(0.18, 1.32 + q.y);
    float gx = softLine(fract((q.x / perspective + 2.0) * 8.0) - 0.5, 0.045);
    float gy = softLine(fract((q.y + 1.4) * 8.0) - 0.5, 0.045);
    float grid = (gx + gy) * horizon * 0.18;
    float pulse = softLine(p.y + 0.14 + sin(p.x * 2.0 + t * 0.22) * 0.045, 0.022);
    float beam = exp(-abs(p.x - 0.72) * 44.0) * smoothstep(-1.0, 0.8, p.y);
    return grid + pulse * 0.56 + beam * 0.72;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(1.0, uResolution.y);
    vec2 p = uv - 0.5;
    p.x *= aspect;
    p.x -= 0.11;
    p += vec2(uPointer.x * 0.035, uPointer.y * 0.022);

    float t = uTime;
    float w0 = sceneWeight(0.0);
    float w1 = sceneWeight(1.0);
    float w2 = sceneWeight(2.0);
    float w3 = sceneWeight(3.0);
    float weightSum = max(0.001, w0 + w1 + w2 + w3);

    float pattern = (
      heroPattern(p, uv, t) * w0 +
      diagnosticsPattern(p, t) * w1 +
      capabilitiesPattern(p, t) * w2 +
      briefPattern(p, t) * w3
    ) / weightSum;

    float organic = fbm(p * 1.35 + vec2(t * 0.014, -t * 0.01));
    float material = smoothstep(0.50, 0.92, organic) * smoothstep(-0.42, 0.85, p.x);

    vec3 bg = vec3(0.018, 0.019, 0.023);
    vec3 graphite = vec3(0.055, 0.062, 0.073);
    vec3 steel = vec3(0.43, 0.48, 0.57);
    vec3 silver = vec3(0.78, 0.81, 0.84);
    vec3 warm = vec3(0.82, 0.80, 0.74);

    vec3 color = bg;
    color += graphite * material * 0.72;
    color += steel * pattern * 0.44;
    color += silver * pow(max(pattern - 0.34, 0.0), 1.7) * 0.78;
    color += warm * pow(max(pattern - 1.05, 0.0), 2.2) * 0.42;

    float vignette = smoothstep(1.02, 0.16, length((uv - 0.5) * vec2(0.92, 1.12)));
    float leftShade = mix(0.48, 1.0, smoothstep(0.22, 0.72, uv.x));
    float topShade = 0.84 + 0.16 * smoothstep(0.0, 0.34, uv.y);
    color *= (0.36 + vignette * 0.82) * leftShade * topShade;

    float grain = (hash21(gl_FragCoord.xy + fract(t) * 100.0) - 0.5) * 0.018;
    color += grain;

    float alpha = 0.98;
    gl_FragColor = vec4(color, alpha);
  }
`;

function SignalField({ scene, focus }: { scene: number; focus: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const currentScene = useRef(scene);
  const currentFocus = useRef(focus);
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

  useFrame(({ clock, pointer, size }, delta) => {
    if (!material.current) return;

    currentScene.current = THREE.MathUtils.damp(currentScene.current, scene, 2.8, delta);
    currentFocus.current = THREE.MathUtils.damp(currentFocus.current, focus, 4.0, delta);

    material.current.uniforms.uTime.value = clock.elapsedTime;
    material.current.uniforms.uScene.value = currentScene.current;
    material.current.uniforms.uFocus.value = currentFocus.current;
    material.current.uniforms.uPointer.value.lerp(pointer, 0.035);
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

  useEffect(() => {
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

    window.addEventListener("bnd:scene", updateScene);
    window.addEventListener("bnd:focus", updateFocus);

    return () => {
      window.removeEventListener("bnd:scene", updateScene);
      window.removeEventListener("bnd:focus", updateFocus);
    };
  }, []);

  return (
    <div className="v12-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.35]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
      >
        <SignalField scene={scene} focus={focus} />
      </Canvas>
    </div>
  );
}
