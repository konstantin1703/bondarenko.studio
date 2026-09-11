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
    mat2 rotation = mat2(0.87, -0.49, 0.49, 0.87);

    for (int i = 0; i < 4; i++) {
      value += noise(p) * amplitude;
      p = rotation * p * 2.04 + vec2(0.17, -0.11);
      amplitude *= 0.5;
    }

    return value;
  }

  float heightField(vec2 p) {
    float h = sin(p.x * 2.35 + p.y * 0.34) * 0.155;
    h += sin(p.x * 5.45 - p.y * 0.86 + 0.82) * 0.061;
    h += sin(p.x * 10.6 + p.y * 0.38 - 0.44) * 0.018;
    h += (fbm(p * 1.12 + vec2(1.7, -0.9)) - 0.5) * 0.045;
    return h;
  }

  float softLine(float d, float width) {
    return 1.0 - smoothstep(width, width * 2.1, abs(d));
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    float t = uTime * 0.10;

    vec2 p = uv - 0.5;
    p.x *= aspect;

    vec2 center = vec2(aspect * 0.285, -0.025);
    center += uPointer * vec2(0.024, 0.015);

    vec2 local = p - center;
    local = mat2(0.9781, 0.2079, -0.2079, 0.9781) * local;

    float slowWarp = (fbm(local * 0.58 + vec2(2.6 + t * 0.12, 1.3 - t * 0.08)) - 0.5) * 0.085;
    float path = local.y + local.x * 0.115 - sin(local.x * 1.62 - 0.28 + t * 0.10) * 0.205 - slowWarp;
    float ribbonWidth = 0.355 + sin(local.x * 1.05 + 0.4 - t * 0.07) * 0.025;

    float ribbon = 1.0 - smoothstep(ribbonWidth, ribbonWidth + 0.082, abs(path));
    float xGate = smoothstep(-1.02, -0.76, local.x) * (1.0 - smoothstep(0.24, 0.58, local.x));
    float mask = ribbon * xGate;

    float secondaryPath = local.y + local.x * 0.035 + 0.42 - sin(local.x * 1.22 + 0.7 - t * 0.05) * 0.13;
    float secondary = (1.0 - smoothstep(0.16, 0.30, abs(secondaryPath))) * xGate * 0.16;

    vec2 surface = local * vec2(1.48, 1.24);
    surface.x += t * 0.045;
    surface.y += path * 0.33;

    float h = heightField(surface);
    float eps = 0.005;
    float hx = heightField(surface + vec2(eps, 0.0));
    float hy = heightField(surface + vec2(0.0, eps));
    vec3 normal = normalize(vec3(-(hx - h) / eps, -(hy - h) / eps, 0.92));

    vec3 viewDir = normalize(vec3(-0.13 + uPointer.x * 0.035, 0.04 + uPointer.y * 0.022, 1.0));
    vec3 keyDir = normalize(vec3(-0.42 + uPointer.x * 0.045, 0.24 - uPointer.y * 0.035, 0.93));
    vec3 rimDir = normalize(vec3(0.84, -0.18, 0.58));

    float diffuse = max(dot(normal, keyDir), 0.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.9);
    float specular = pow(max(dot(reflect(-keyDir, normal), viewDir), 0.0), 52.0);
    float rimSpec = pow(max(dot(reflect(-rimDir, normal), viewDir), 0.0), 92.0);

    float silhouette = exp(-abs(abs(path) - ribbonWidth) * 34.0) * xGate;
    float fold = exp(-abs(path - sin(local.x * 2.45 + 0.2 + t * 0.08) * 0.055) * 12.5) * xGate;
    float filament = softLine(path - 0.075 * sin(local.x * 2.05 - 0.1 + t * 0.06), 0.0065) * xGate;
    float interference = 0.5 + 0.5 * sin((h + local.x * 0.16 + t * 0.03) * 31.0);

    vec3 black = vec3(0.010, 0.011, 0.014);
    vec3 graphite = vec3(0.047, 0.052, 0.061);
    vec3 steel = vec3(0.19, 0.215, 0.25);
    vec3 silver = vec3(0.73, 0.755, 0.78);
    vec3 ivory = vec3(0.93, 0.91, 0.86);
    vec3 champagne = vec3(0.70, 0.56, 0.35);

    float bodyLight = 0.13 + diffuse * 0.17 + fresnel * 0.15;
    vec3 material = mix(graphite, steel, bodyLight);
    material += silver * specular * 0.74;
    material += ivory * rimSpec * 0.66;
    material += silver * silhouette * 0.055;
    material += silver * fold * 0.032;
    material += champagne * filament * interference * 0.095;

    vec3 backFold = graphite + steel * 0.10 + silver * rimSpec * 0.08;

    vec3 color = black;
    float ambient = exp(-length(local * vec2(0.74, 1.18)) * 2.25);
    color += vec3(0.033, 0.039, 0.048) * ambient * 0.10;
    color = mix(color, backFold, secondary);
    color = mix(color, material, mask * 0.96);

    float leftProtection = mix(0.35, 1.0, smoothstep(0.24, 0.54, uv.x));
    color *= leftProtection;

    float vignette = 1.0 - smoothstep(0.47, 0.96, length((uv - 0.5) * vec2(0.90, 1.08)));
    color *= 0.80 + vignette * 0.24;

    float grain = (hash21(gl_FragCoord.xy + floor(uTime * 3.0)) - 0.5) * 0.0065;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function MaterialPlane({ pointerTarget, reducedMotion }: { pointerTarget: MutableRefObject<PointerTarget>; reducedMotion: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const smoothPointer = useRef(new THREE.Vector2());
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2() },
      uTime: { value: 0 },
    }),
    [],
  );

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
  }, [size.height, size.width]);

  useFrame(({ clock }, delta) => {
    if (!materialRef.current) return;

    const damping = 1 - Math.exp(-delta * 3.2);
    smoothPointer.current.x = THREE.MathUtils.lerp(smoothPointer.current.x, pointerTarget.current.x, damping);
    smoothPointer.current.y = THREE.MathUtils.lerp(smoothPointer.current.y, pointerTarget.current.y, damping);

    materialRef.current.uniforms.uPointer.value.copy(smoothPointer.current);
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

export default function HeroLabCanvas() {
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
      data-material-surface="hero"
      data-render-active={renderActive ? "true" : "false"}
      style={{ width: "100%", height: "100%" }}
    >
      <ResilientCanvas
        frameloop={renderActive ? "always" : "demand"}
        dpr={[1, 1.35]}
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor("#050507", 1)}
      >
        <MaterialPlane pointerTarget={pointerTarget} reducedMotion={reducedMotion} />
      </ResilientCanvas>
    </div>
  );
}
