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
    mat2 rotation = mat2(0.86, -0.50, 0.50, 0.86);

    for (int i = 0; i < 5; i++) {
      value += noise(p) * amplitude;
      p = rotation * p * 2.01 + vec2(0.17, -0.13);
      amplitude *= 0.5;
    }

    return value;
  }

  float heightField(vec2 p) {
    float broad = sin(p.x * 2.15 + p.y * 0.55) * 0.19;
    broad += sin(p.x * 4.65 - p.y * 1.20 + 0.8) * 0.075;
    broad += sin(p.x * 8.1 + p.y * 0.42 - 0.5) * 0.028;
    float organic = (fbm(p * 1.55 + vec2(1.6, -0.8)) - 0.5) * 0.14;
    return broad + organic;
  }

  float softLine(float d, float width) {
    return 1.0 - smoothstep(width, width * 2.2, abs(d));
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);

    vec2 p = uv - 0.5;
    p.x *= aspect;

    vec2 center = vec2(aspect * 0.275, -0.025);
    vec2 local = p - center;
    local = mat2(0.9848, 0.1736, -0.1736, 0.9848) * local;

    float lowWarp = (fbm(local * 0.82 + vec2(2.4, 1.1)) - 0.5) * 0.16;
    float path = local.y + local.x * 0.11 - sin(local.x * 1.72 - 0.3) * 0.22 - lowWarp;
    float width = 0.42 + sin(local.x * 1.12 + 0.7) * 0.045;

    float ribbon = 1.0 - smoothstep(width, width + 0.115, abs(path));
    float xGate = smoothstep(-1.04, -0.72, local.x) * (1.0 - smoothstep(0.28, 0.66, local.x));
    float mask = ribbon * xGate;

    float secondaryPath = local.y + local.x * 0.05 + 0.37 - sin(local.x * 1.34 + 0.55) * 0.17;
    float secondary = (1.0 - smoothstep(0.22, 0.38, abs(secondaryPath))) * xGate * 0.24;

    vec2 surface = local * 1.35;
    surface.y += path * 0.58;

    float h = heightField(surface);
    float eps = 0.006;
    float hx = heightField(surface + vec2(eps, 0.0));
    float hy = heightField(surface + vec2(0.0, eps));
    vec3 normal = normalize(vec3(-(hx - h) / eps, -(hy - h) / eps, 0.92));

    vec3 viewDir = normalize(vec3(-0.16, 0.04, 1.0));
    vec3 keyDir = normalize(vec3(-0.48, 0.28, 0.90));
    vec3 edgeDir = normalize(vec3(0.76, -0.24, 0.61));

    float diffuse = max(dot(normal, keyDir), 0.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.4);
    float specular = pow(max(dot(reflect(-keyDir, normal), viewDir), 0.0), 26.0);
    float edgeSpec = pow(max(dot(reflect(-edgeDir, normal), viewDir), 0.0), 64.0);

    float edge = exp(-abs(abs(path) - width) * 24.0) * xGate;
    float fold = exp(-abs(path - sin(local.x * 2.25 + 0.4) * 0.08) * 7.8) * xGate;
    float seam = softLine(path - 0.10 * sin(local.x * 2.0 - 0.2), 0.008) * xGate;
    float interference = 0.5 + 0.5 * sin((h + local.x * 0.18) * 24.0);

    vec3 black = vec3(0.010, 0.011, 0.014);
    vec3 graphite = vec3(0.050, 0.056, 0.066);
    vec3 steel = vec3(0.22, 0.25, 0.29);
    vec3 silver = vec3(0.71, 0.74, 0.77);
    vec3 ivory = vec3(0.91, 0.89, 0.83);
    vec3 champagne = vec3(0.70, 0.56, 0.35);

    float bodyLight = 0.17 + diffuse * 0.28 + fresnel * 0.24;
    vec3 material = mix(graphite, steel, bodyLight);
    material += silver * specular * 0.58;
    material += ivory * edgeSpec * 0.58;
    material += silver * edge * 0.075;
    material += silver * fold * 0.055;
    material += champagne * seam * interference * 0.12;

    vec3 secondaryMaterial = graphite + steel * 0.16;
    secondaryMaterial += silver * edgeSpec * 0.12;

    vec3 color = black;
    color += vec3(0.035, 0.041, 0.050) * exp(-length(local * vec2(0.68, 1.12)) * 2.1) * 0.13;
    color = mix(color, secondaryMaterial, secondary);
    color = mix(color, material, mask * 0.95);

    float leftProtection = mix(0.40, 1.0, smoothstep(0.12, 0.46, uv.x));
    color *= leftProtection;

    float vignette = 1.0 - smoothstep(0.44, 0.92, length((uv - 0.5) * vec2(0.88, 1.08)));
    color *= 0.78 + vignette * 0.28;

    float grain = (hash21(gl_FragCoord.xy) - 0.5) * 0.009;
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
