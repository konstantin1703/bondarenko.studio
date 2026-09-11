"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useRenderActivity } from "@/components/system/useRenderActivity";

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
  uniform float uFocus;

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
    mat2 rotation = mat2(0.86, -0.51, 0.51, 0.86);

    for (int i = 0; i < 4; i++) {
      value += noise(p) * amplitude;
      p = rotation * p * 2.03 + vec2(0.17, -0.12);
      amplitude *= 0.5;
    }

    return value;
  }

  float lineMask(float d, float width) {
    return 1.0 - smoothstep(width, width * 2.15, abs(d));
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    float t = uTime * 0.09;

    vec2 p = uv - 0.5;
    p.x *= aspect;

    float focusNorm = clamp(uFocus / 4.0, 0.0, 1.0);
    float focusY = mix(0.31, -0.33, focusNorm);
    focusY += uPointer.y * 0.012;

    vec2 center = vec2(aspect * 0.285 + uPointer.x * 0.018, -0.02);
    vec2 local = p - center;
    local = mat2(0.982, 0.189, -0.189, 0.982) * local;

    float drift = (fbm(local * 0.67 + vec2(2.4 + t * 0.10, 1.1 - t * 0.07)) - 0.5) * 0.075;
    float surfacePath = local.y + local.x * 0.105 - sin(local.x * 1.58 - 0.22 + t * 0.08) * 0.195 - drift;
    float width = 0.34 + sin(local.x * 1.12 + 0.4) * 0.024;

    float body = 1.0 - smoothstep(width, width + 0.085, abs(surfacePath));
    float xGate = smoothstep(-1.04, -0.72, local.x) * (1.0 - smoothstep(0.28, 0.64, local.x));
    body *= xGate;

    vec2 surface = local * vec2(1.42, 1.25);
    surface.x += t * 0.035;

    float h = sin(surface.x * 2.4 + surface.y * 0.32) * 0.14;
    h += sin(surface.x * 5.5 - surface.y * 0.9 + 0.8) * 0.056;
    h += (fbm(surface * 1.12 + 1.7) - 0.5) * 0.042;

    float eps = 0.005;
    vec2 sx = surface + vec2(eps, 0.0);
    vec2 sy = surface + vec2(0.0, eps);
    float hx = sin(sx.x * 2.4 + sx.y * 0.32) * 0.14 + sin(sx.x * 5.5 - sx.y * 0.9 + 0.8) * 0.056 + (fbm(sx * 1.12 + 1.7) - 0.5) * 0.042;
    float hy = sin(sy.x * 2.4 + sy.y * 0.32) * 0.14 + sin(sy.x * 5.5 - sy.y * 0.9 + 0.8) * 0.056 + (fbm(sy * 1.12 + 1.7) - 0.5) * 0.042;
    vec3 normal = normalize(vec3(-(hx - h) / eps, -(hy - h) / eps, 0.94));

    vec3 viewDir = normalize(vec3(-0.11, 0.05, 1.0));
    vec3 keyDir = normalize(vec3(-0.43, 0.22, 0.94));
    vec3 rimDir = normalize(vec3(0.82, -0.12, 0.61));

    float diffuse = max(dot(normal, keyDir), 0.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    float specular = pow(max(dot(reflect(-keyDir, normal), viewDir), 0.0), 56.0);
    float rimSpec = pow(max(dot(reflect(-rimDir, normal), viewDir), 0.0), 88.0);

    float worldY = p.y;
    float focusBand = exp(-abs(worldY - focusY) * 12.0);
    float splitNoise = (fbm(vec2(p.x * 2.4 + t * 0.05, focusY * 3.2 + 1.4)) - 0.5) * 0.07;
    float split = worldY - focusY - sin(p.x * 2.2 + t * 0.12) * 0.025 - splitNoise;
    float fracture = lineMask(split, 0.0068);
    fracture *= smoothstep(-0.10, 0.68, uv.x);

    float echoA = lineMask(split - 0.045, 0.0045) * 0.20;
    float echoB = lineMask(split + 0.072, 0.0045) * 0.12;
    float loss = focusBand * smoothstep(0.40, 0.88, uv.x);

    vec3 black = vec3(0.010, 0.011, 0.014);
    vec3 graphite = vec3(0.046, 0.052, 0.061);
    vec3 steel = vec3(0.19, 0.215, 0.25);
    vec3 silver = vec3(0.73, 0.755, 0.78);
    vec3 ivory = vec3(0.93, 0.91, 0.86);
    vec3 champagne = vec3(0.70, 0.56, 0.35);

    float materialLight = 0.12 + diffuse * 0.16 + fresnel * 0.16;
    vec3 material = mix(graphite, steel, materialLight);
    material += silver * specular * 0.70;
    material += ivory * rimSpec * 0.54;

    vec3 color = black;
    color = mix(color, material, body * 0.76);
    color += graphite * loss * 0.32;
    color += silver * fracture * (0.18 + focusBand * 0.24);
    color += silver * (echoA + echoB) * 0.07;
    color += champagne * fracture * focusBand * 0.17;

    float leftProtection = mix(0.34, 1.0, smoothstep(0.34, 0.65, uv.x));
    color *= leftProtection;

    float vignette = 1.0 - smoothstep(0.48, 0.98, length((uv - 0.5) * vec2(0.90, 1.08)));
    color *= 0.78 + vignette * 0.24;

    float grain = (hash21(gl_FragCoord.xy + floor(uTime * 2.0)) - 0.5) * 0.0055;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function Field({ active, pointerTarget, reducedMotion }: { active: number; pointerTarget: React.MutableRefObject<PointerTarget>; reducedMotion: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const smoothPointer = useRef(new THREE.Vector2());
  const smoothFocus = useRef(active);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uFocus: { value: active },
    }),
    [],
  );

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
  }, [size.height, size.width]);

  useFrame(({ clock }, delta) => {
    if (!materialRef.current) return;

    const pointerDamping = 1 - Math.exp(-delta * 3.0);
    const focusDamping = 1 - Math.exp(-delta * 5.0);

    smoothPointer.current.x = THREE.MathUtils.lerp(smoothPointer.current.x, pointerTarget.current.x, pointerDamping);
    smoothPointer.current.y = THREE.MathUtils.lerp(smoothPointer.current.y, pointerTarget.current.y, pointerDamping);
    smoothFocus.current = THREE.MathUtils.lerp(smoothFocus.current, active, focusDamping);

    materialRef.current.uniforms.uPointer.value.copy(smoothPointer.current);
    materialRef.current.uniforms.uFocus.value = smoothFocus.current;
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

export default function DiagnosticsLabCanvas({ active }: { active: number }) {
  const pointerTarget = useRef<PointerTarget>({ x: 0, y: 0 });
  const { hostRef, reducedMotion, renderActive } = useRenderActivity();

  useEffect(() => {
    if (!renderActive || reducedMotion) {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
      return;
    }

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerTarget.current.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reducedMotion, renderActive]);

  return (
    <div
      ref={hostRef}
      data-material-surface="diagnostics"
      data-render-active={renderActive ? "true" : "false"}
      style={{ width: "100%", height: "100%" }}
    >
      <Canvas
        frameloop={renderActive ? "always" : "demand"}
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor("#050507", 1)}
      >
        <Field active={active} pointerTarget={pointerTarget} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
