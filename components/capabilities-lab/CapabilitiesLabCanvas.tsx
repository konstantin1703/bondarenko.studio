"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { useRenderActivity } from "@/components/system/useRenderActivity";
import ResilientCanvas from "@/components/system/ResilientCanvas";

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
      p = rotation * p * 2.03 + vec2(0.18, -0.11);
      amplitude *= 0.5;
    }
    return value;
  }

  float lineMask(float d, float width) {
    return 1.0 - smoothstep(width, width * 2.15, abs(d));
  }

  float focusWeight(float index) {
    return 1.0 - smoothstep(0.08, 0.92, abs(uFocus - index));
  }

  float routePath(vec2 p, float laneY, float phase, float t) {
    float bend = smoothstep(0.10, 0.78, p.x + 0.35);
    float converge = mix(laneY, 0.0, bend * 0.86);
    float wave = sin(p.x * 1.55 + phase + t * 0.10) * 0.035;
    wave += (fbm(vec2(p.x * 0.72 + phase, t * 0.05)) - 0.5) * 0.026;
    return p.y - converge - wave;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    float t = uTime * 0.09;

    vec2 p = uv - 0.5;
    p.x *= aspect;
    p.x -= aspect * 0.10;
    p += uPointer * vec2(0.018, 0.012);

    float d0 = routePath(p, 0.27, 0.2, t);
    float d1 = routePath(p, 0.00, 1.5, t);
    float d2 = routePath(p, -0.27, 2.8, t);

    float lane0 = exp(-abs(d0) * 17.0);
    float lane1 = exp(-abs(d1) * 17.0);
    float lane2 = exp(-abs(d2) * 17.0);

    float filament0 = lineMask(d0, 0.0065);
    float filament1 = lineMask(d1, 0.0065);
    float filament2 = lineMask(d2, 0.0065);

    float w0 = focusWeight(0.0);
    float w1 = focusWeight(1.0);
    float w2 = focusWeight(2.0);

    float activeLane = lane0 * w0 + lane1 * w1 + lane2 * w2;
    float activeFilament = filament0 * w0 + filament1 * w1 + filament2 * w2;
    float passiveLanes = lane0 + lane1 + lane2;
    float passiveFilaments = filament0 + filament1 + filament2;

    vec2 nodeCenter = vec2(aspect * 0.30, 0.0);
    vec2 nodeP = p - nodeCenter;
    float node = exp(-length(nodeP * vec2(0.84, 1.1)) * 5.0);
    float ring = lineMask(length(nodeP * vec2(0.84, 1.1)) - 0.19, 0.0075);
    float outerRing = lineMask(length(nodeP * vec2(0.84, 1.1)) - 0.31, 0.0050) * 0.30;

    float routeGate = smoothstep(-0.75, -0.20, p.x) * (1.0 - smoothstep(0.72, 1.04, p.x));
    float activeField = activeLane * routeGate;
    float passiveField = passiveLanes * routeGate;

    float surface = sin(p.x * 2.2 + p.y * 0.38) * 0.11;
    surface += sin(p.x * 5.0 - p.y * 0.74 + 0.7) * 0.045;
    surface += (fbm(p * 1.15 + vec2(1.2 + t * 0.03, -0.7)) - 0.5) * 0.038;

    float eps = 0.005;
    vec2 px = p + vec2(eps, 0.0);
    vec2 py = p + vec2(0.0, eps);
    float sx = sin(px.x * 2.2 + px.y * 0.38) * 0.11 + sin(px.x * 5.0 - px.y * 0.74 + 0.7) * 0.045 + (fbm(px * 1.15 + vec2(1.2 + t * 0.03, -0.7)) - 0.5) * 0.038;
    float sy = sin(py.x * 2.2 + py.y * 0.38) * 0.11 + sin(py.x * 5.0 - py.y * 0.74 + 0.7) * 0.045 + (fbm(py * 1.15 + vec2(1.2 + t * 0.03, -0.7)) - 0.5) * 0.038;
    vec3 normal = normalize(vec3(-(sx - surface) / eps, -(sy - surface) / eps, 0.95));

    vec3 viewDir = normalize(vec3(-0.10, 0.04, 1.0));
    vec3 keyDir = normalize(vec3(-0.46, 0.20, 0.94));
    vec3 rimDir = normalize(vec3(0.82, -0.16, 0.60));
    float diffuse = max(dot(normal, keyDir), 0.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    float specular = pow(max(dot(reflect(-keyDir, normal), viewDir), 0.0), 58.0);
    float rimSpec = pow(max(dot(reflect(-rimDir, normal), viewDir), 0.0), 88.0);

    vec3 black = vec3(0.010, 0.011, 0.014);
    vec3 graphite = vec3(0.046, 0.052, 0.061);
    vec3 steel = vec3(0.19, 0.215, 0.25);
    vec3 silver = vec3(0.73, 0.755, 0.78);
    vec3 ivory = vec3(0.93, 0.91, 0.86);
    vec3 champagne = vec3(0.70, 0.56, 0.35);

    float materialLight = 0.10 + diffuse * 0.14 + fresnel * 0.16;
    vec3 material = mix(graphite, steel, materialLight);
    material += silver * specular * 0.65;
    material += ivory * rimSpec * 0.48;

    vec3 color = black;
    color += graphite * passiveField * 0.18;
    color += silver * passiveFilaments * routeGate * 0.035;
    color = mix(color, material, activeField * 0.42);
    color += silver * activeFilament * routeGate * 0.22;
    color += champagne * activeFilament * routeGate * 0.08;
    color += silver * node * 0.055;
    color += silver * ring * 0.10;
    color += champagne * ring * (0.03 + 0.04 * (w0 + w1 + w2));
    color += silver * outerRing * 0.045;

    float leftProtection = mix(0.30, 1.0, smoothstep(0.28, 0.62, uv.x));
    color *= leftProtection;

    float vignette = 1.0 - smoothstep(0.50, 0.98, length((uv - 0.5) * vec2(0.90, 1.06)));
    color *= 0.80 + vignette * 0.22;

    float grain = (hash21(gl_FragCoord.xy + floor(uTime * 2.0)) - 0.5) * 0.0055;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function Field({ active, pointerTarget, reducedMotion }: { active: number; pointerTarget: MutableRefObject<PointerTarget>; reducedMotion: boolean }) {
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
    const focusDamping = 1 - Math.exp(-delta * 4.5);

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

export default function CapabilitiesLabCanvas({ active }: { active: number }) {
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
      data-material-surface="capabilities"
      data-render-active={renderActive ? "true" : "false"}
      style={{ width: "100%", height: "100%" }}
    >
      <ResilientCanvas
        frameloop={renderActive ? "always" : "demand"}
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor("#050507", 1)}
      >
        <Field active={active} pointerTarget={pointerTarget} reducedMotion={reducedMotion} />
      </ResilientCanvas>
    </div>
  );
}
