"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

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
    mat2 rotation = mat2(0.84, -0.54, 0.54, 0.84);

    for (int i = 0; i < 5; i++) {
      value += noise(p) * amplitude;
      p = rotation * p * 2.03 + vec2(0.19, -0.12);
      amplitude *= 0.5;
    }

    return value;
  }

  float fieldHeight(vec2 p) {
    vec2 q = p;
    q.x += (fbm(p * 0.72 + 1.7) - 0.5) * 0.36;
    q.y += (fbm(p * 0.88 - 2.3) - 0.5) * 0.22;

    float broad = sin(q.x * 2.15 + q.y * 0.72) * 0.20;
    broad += sin(q.x * 4.8 - q.y * 1.15 + 1.1) * 0.085;
    broad += sin(q.x * 8.9 + q.y * 0.65 - 0.7) * 0.032;

    float detail = (fbm(q * 2.25 + vec2(2.0, -1.2)) - 0.5) * 0.17;
    float seam = exp(-abs(q.y - sin(q.x * 1.42 - 0.45) * 0.42) * 9.0) * 0.22;

    return broad + detail + seam;
  }

  float softLine(float d, float width) {
    return 1.0 - smoothstep(width, width * 2.2, abs(d));
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);

    vec2 p = uv - 0.5;
    p.x *= aspect;

    vec2 center = vec2(aspect * 0.275, -0.015);
    vec2 local = p - center;
    local = mat2(0.9659, 0.2588, -0.2588, 0.9659) * local;

    float h = fieldHeight(local * 1.28);
    float eps = 0.006;
    float hx = fieldHeight((local + vec2(eps, 0.0)) * 1.28);
    float hy = fieldHeight((local + vec2(0.0, eps)) * 1.28);

    vec3 normal = normalize(vec3(-(hx - h) / eps, -(hy - h) / eps, 1.0));
    vec3 viewDir = normalize(vec3(-0.18, 0.06, 1.0));
    vec3 keyDir = normalize(vec3(-0.55, 0.22, 0.93));
    vec3 rimDir = normalize(vec3(0.72, -0.18, 0.68));

    float ndl = max(dot(normal, keyDir), 0.0);
    float rim = pow(max(dot(normal, rimDir), 0.0), 5.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);
    float specular = pow(max(dot(reflect(-keyDir, normal), viewDir), 0.0), 22.0);
    float sharpSpec = pow(max(dot(reflect(-rimDir, normal), viewDir), 0.0), 54.0);

    float ellipse = length(vec2(local.x * 0.72, local.y * 1.14));
    float materialMask = 1.0 - smoothstep(0.52, 1.48, ellipse);
    materialMask *= smoothstep(-0.62, -0.12, local.x + 0.84);

    float tornEdge = fbm(local * 3.6 + 4.2) * 0.12;
    materialMask *= smoothstep(1.26 + tornEdge, 0.88 + tornEdge, ellipse);

    float foldBand = exp(-abs(local.y - sin(local.x * 1.65 - 0.3) * 0.36) * 5.5);
    float filament = softLine(local.y - sin(local.x * 1.66 - 0.3) * 0.36, 0.012);
    float crossFold = exp(-abs(local.y + local.x * 0.42 - 0.12) * 7.0) * 0.38;
    float interference = 0.5 + 0.5 * sin((h + local.x * 0.12) * 31.0);

    vec3 black = vec3(0.010, 0.011, 0.014);
    vec3 graphite = vec3(0.055, 0.061, 0.071);
    vec3 gunmetal = vec3(0.19, 0.22, 0.27);
    vec3 silver = vec3(0.72, 0.76, 0.80);
    vec3 ivory = vec3(0.92, 0.90, 0.84);
    vec3 champagne = vec3(0.72, 0.57, 0.34);

    float body = 0.10 + ndl * 0.32 + fresnel * 0.34;
    vec3 material = mix(graphite, gunmetal, body);
    material += silver * specular * 0.86;
    material += ivory * sharpSpec * 0.72;
    material += silver * foldBand * (0.08 + rim * 0.16);
    material += silver * filament * 0.28;
    material += champagne * crossFold * interference * 0.18;
    material += champagne * sharpSpec * 0.10;

    float underGlow = exp(-ellipse * 2.15) * 0.05;
    vec3 color = black + vec3(0.035, 0.040, 0.050) * underGlow;
    color = mix(color, material, materialMask * 0.92);

    float verticalCut = smoothstep(0.06, 0.34, uv.x);
    float leftShade = mix(0.42, 1.0, verticalCut);
    color *= leftShade;

    float vignette = 1.0 - smoothstep(0.42, 0.92, length((uv - 0.5) * vec2(0.90, 1.10)));
    color *= 0.68 + vignette * 0.42;

    float grain = (hash21(gl_FragCoord.xy) - 0.5) * 0.012;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function MaterialPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, invalidate } = useThree();

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    invalidate();
  }, [invalidate, size.height, size.width]);

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
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.35]}
      camera={{ position: [0, 0, 1] }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor("#050507", 1)}
    >
      <MaterialPlane />
    </Canvas>
  );
}
