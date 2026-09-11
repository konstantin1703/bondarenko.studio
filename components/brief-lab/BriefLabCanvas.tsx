"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";

type PointerTarget = { x: number; y: number };

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

  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uStep;
  uniform float uProgress;

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
    float amplitude = 0.5;
    mat2 rotation = mat2(0.83, -0.56, 0.56, 0.83);
    for (int i = 0; i < 4; i++) {
      value += noise(p) * amplitude;
      p = rotation * p * 2.01 + vec2(0.16, -0.09);
      amplitude *= 0.5;
    }
    return value;
  }

  float lineMask(float distanceValue, float width) {
    return 1.0 - smoothstep(width, width * 2.25, abs(distanceValue));
  }

  float node(vec2 p, vec2 center, float radius, float width) {
    return lineMask(length(p - center) - radius, width);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = uv - 0.5;
    p.x *= aspect;
    p += uPointer * vec2(0.014, 0.010);

    float t = uTime * 0.075;
    float progress = clamp(uProgress / 5.0, 0.0, 1.0);
    float active = clamp(uStep / 4.0, 0.0, 1.0);

    float spineY = -0.11 + sin(p.x * 1.65 + t) * 0.025;
    float spine = exp(-abs(p.y - spineY) * 22.0);
    float filament = lineMask(p.y - spineY, 0.0045);

    float assemblyStart = -aspect * 0.46;
    float assemblyEnd = aspect * 0.29;
    float assemblyX = mix(assemblyStart, assemblyEnd, progress);
    float assembled = smoothstep(assemblyStart - 0.12, assemblyStart + 0.02, p.x)
      * (1.0 - smoothstep(assemblyX, assemblyX + 0.13, p.x));

    float laneA = p.y - (0.24 - smoothstep(-aspect * 0.35, aspect * 0.10, p.x) * 0.31);
    float laneB = p.y - (0.08 - smoothstep(-aspect * 0.28, aspect * 0.12, p.x) * 0.15);
    float laneC = p.y - (-0.22 + smoothstep(-aspect * 0.32, aspect * 0.12, p.x) * 0.12);

    laneA -= sin(p.x * 1.9 + t + 0.4) * 0.025;
    laneB -= sin(p.x * 1.55 + t + 1.4) * 0.018;
    laneC -= sin(p.x * 1.75 + t + 2.6) * 0.022;

    float routes = exp(-abs(laneA) * 17.0) + exp(-abs(laneB) * 19.0) + exp(-abs(laneC) * 17.0);
    float routeFilaments = lineMask(laneA, 0.0045) + lineMask(laneB, 0.004) + lineMask(laneC, 0.0045);

    float materialHeight = sin(p.x * 2.25 + p.y * 0.44 + active * 0.9) * 0.095;
    materialHeight += sin(p.x * 4.8 - p.y * 0.82 + 0.8) * 0.04;
    materialHeight += (fbm(p * 1.10 + vec2(1.1 + t * 0.035, -0.4)) - 0.5) * 0.035;

    float eps = 0.005;
    vec2 px = p + vec2(eps, 0.0);
    vec2 py = p + vec2(0.0, eps);
    float hx = sin(px.x * 2.25 + px.y * 0.44 + active * 0.9) * 0.095
      + sin(px.x * 4.8 - px.y * 0.82 + 0.8) * 0.04
      + (fbm(px * 1.10 + vec2(1.1 + t * 0.035, -0.4)) - 0.5) * 0.035;
    float hy = sin(py.x * 2.25 + py.y * 0.44 + active * 0.9) * 0.095
      + sin(py.x * 4.8 - py.y * 0.82 + 0.8) * 0.04
      + (fbm(py * 1.10 + vec2(1.1 + t * 0.035, -0.4)) - 0.5) * 0.035;
    vec3 normal = normalize(vec3(-(hx - materialHeight) / eps, -(hy - materialHeight) / eps, 0.96));

    vec3 viewDir = normalize(vec3(-0.08, 0.02, 1.0));
    vec3 keyDir = normalize(vec3(-0.52, 0.18, 0.92));
    vec3 rimDir = normalize(vec3(0.74, -0.18, 0.64));
    float diffuse = max(dot(normal, keyDir), 0.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    float specular = pow(max(dot(reflect(-keyDir, normal), viewDir), 0.0), 62.0);
    float rim = pow(max(dot(reflect(-rimDir, normal), viewDir), 0.0), 82.0);

    vec3 black = vec3(0.010, 0.011, 0.014);
    vec3 graphite = vec3(0.045, 0.050, 0.058);
    vec3 steel = vec3(0.18, 0.205, 0.235);
    vec3 silver = vec3(0.72, 0.745, 0.77);
    vec3 ivory = vec3(0.92, 0.90, 0.85);
    vec3 champagne = vec3(0.70, 0.56, 0.35);

    float fieldMask = smoothstep(0.13, 0.78, uv.x) * (1.0 - smoothstep(0.92, 1.0, uv.x));
    float materialLight = 0.09 + diffuse * 0.13 + fresnel * 0.14;
    vec3 material = mix(graphite, steel, materialLight);
    material += silver * specular * 0.58;
    material += ivory * rim * 0.40;

    vec3 color = black;
    color += graphite * routes * fieldMask * 0.13;
    color += silver * routeFilaments * fieldMask * 0.032;
    color = mix(color, material, spine * fieldMask * (0.15 + 0.26 * progress));
    color += silver * filament * assembled * 0.18;
    color += champagne * filament * assembled * 0.07;

    float nodeGlow = 0.0;
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      float nx = mix(-aspect * 0.34, aspect * 0.20, fi / 4.0);
      vec2 center = vec2(nx, spineY);
      float ring = node(p, center, 0.024, 0.0034);
      float reached = 1.0 - smoothstep(uProgress - 0.12, uProgress + 0.18, fi + 1.0);
      float focused = 1.0 - smoothstep(0.05, 0.95, abs(uStep - fi));
      nodeGlow += ring * (0.03 + reached * 0.12 + focused * 0.10);
      color += champagne * ring * (reached * 0.08 + focused * 0.12);
    }
    color += silver * nodeGlow;

    float outputRing = node(p, vec2(aspect * 0.32, spineY), 0.105, 0.0055);
    float outputGlow = exp(-length((p - vec2(aspect * 0.32, spineY)) * vec2(0.92, 1.06)) * 4.8);
    color += silver * outputRing * (0.04 + progress * 0.10);
    color += champagne * outputRing * progress * 0.055;
    color += silver * outputGlow * progress * 0.02;

    float leftProtection = mix(0.22, 1.0, smoothstep(0.24, 0.60, uv.x));
    color *= leftProtection;

    float vignette = 1.0 - smoothstep(0.48, 0.98, length((uv - 0.5) * vec2(0.90, 1.08)));
    color *= 0.79 + vignette * 0.23;

    float grain = (hash21(gl_FragCoord.xy + floor(uTime * 2.0)) - 0.5) * 0.0052;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function AssemblyField({
  step,
  progress,
  pointerTarget,
  reducedMotion,
}: {
  step: number;
  progress: number;
  pointerTarget: MutableRefObject<PointerTarget>;
  reducedMotion: boolean;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const smoothPointer = useRef(new THREE.Vector2());
  const smoothStep = useRef(step);
  const smoothProgress = useRef(progress);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uStep: { value: step },
      uProgress: { value: progress },
    }),
    [],
  );

  useEffect(() => {
    materialRef.current?.uniforms.uResolution.value.set(size.width, size.height);
  }, [size.height, size.width]);

  useFrame(({ clock }, delta) => {
    if (!materialRef.current) return;
    const pointerDamping = 1 - Math.exp(-delta * 3.0);
    const stateDamping = 1 - Math.exp(-delta * 4.2);

    smoothPointer.current.x = THREE.MathUtils.lerp(smoothPointer.current.x, pointerTarget.current.x, pointerDamping);
    smoothPointer.current.y = THREE.MathUtils.lerp(smoothPointer.current.y, pointerTarget.current.y, pointerDamping);
    smoothStep.current = THREE.MathUtils.lerp(smoothStep.current, step, stateDamping);
    smoothProgress.current = THREE.MathUtils.lerp(smoothProgress.current, progress, stateDamping);

    materialRef.current.uniforms.uPointer.value.copy(smoothPointer.current);
    materialRef.current.uniforms.uStep.value = smoothStep.current;
    materialRef.current.uniforms.uProgress.value = smoothProgress.current;
    materialRef.current.uniforms.uTime.value = reducedMotion ? 0 : clock.elapsedTime;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function BriefLabCanvas({ step, progress }: { step: number; progress: number }) {
  const pointerTarget = useRef<PointerTarget>({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const syncMotion = () => setReducedMotion(motionQuery.matches);
    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || motionQuery.matches) return;
      pointerTarget.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerTarget.current.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
    };

    syncMotion();
    motionQuery.addEventListener("change", syncMotion);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", syncMotion);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <Canvas
      frameloop={reducedMotion ? "demand" : "always"}
      dpr={[1, 1.25]}
      camera={{ position: [0, 0, 1] }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor("#050507", 1)}
    >
      <AssemblyField
        step={step}
        progress={progress}
        pointerTarget={pointerTarget}
        reducedMotion={reducedMotion}
      />
    </Canvas>
  );
}
