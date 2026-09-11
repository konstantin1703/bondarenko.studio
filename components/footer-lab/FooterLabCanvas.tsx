"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useRenderActivity } from "@/components/system/useRenderActivity";
import ResilientCanvas from "@/components/system/ResilientCanvas";

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

  float lineMask(float d, float width) {
    return 1.0 - smoothstep(width, width * 2.3, abs(d));
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = uv - 0.5;
    p.x *= aspect;
    p += uPointer * vec2(0.010, 0.006);

    float t = uTime * 0.065;
    float merge = smoothstep(-aspect * 0.30, aspect * 0.16, p.x);
    float settle = smoothstep(-aspect * 0.05, aspect * 0.42, p.x);

    float wobbleA = sin(p.x * 2.0 + t + 0.2) * 0.024;
    float wobbleB = sin(p.x * 1.7 + t + 1.8) * 0.018;
    float wobbleC = sin(p.x * 2.1 + t + 3.1) * 0.021;

    float laneA = p.y - mix(0.19 + wobbleA, -0.025 + wobbleA * 0.18, merge);
    float laneB = p.y - mix(0.03 + wobbleB, -0.025 + wobbleB * 0.18, merge);
    float laneC = p.y - mix(-0.16 + wobbleC, -0.025 + wobbleC * 0.18, merge);

    float broad = exp(-abs(laneA) * 19.0) + exp(-abs(laneB) * 21.0) + exp(-abs(laneC) * 19.0);
    float filament = lineMask(laneA, 0.0045) + lineMask(laneB, 0.0040) + lineMask(laneC, 0.0045);

    float seam = p.y + 0.025 - sin(p.x * 1.35 + t * 0.7) * 0.007;
    float seamBroad = exp(-abs(seam) * mix(18.0, 38.0, settle));
    float seamFilament = lineMask(seam, mix(0.0042, 0.0023, settle));

    float texture = noise(p * 7.5 + vec2(t * 0.08, -t * 0.03));
    float shimmer = pow(max(0.0, sin(p.x * 5.6 - p.y * 2.2 + t * 1.5) * 0.5 + 0.5), 9.0);

    vec3 black = vec3(0.009, 0.010, 0.013);
    vec3 graphite = vec3(0.055, 0.061, 0.071);
    vec3 silver = vec3(0.64, 0.68, 0.72);
    vec3 ivory = vec3(0.91, 0.89, 0.84);
    vec3 champagne = vec3(0.70, 0.56, 0.35);

    float leftMask = 1.0 - smoothstep(0.78, 1.0, uv.x);
    float rightResolve = smoothstep(0.37, 0.62, uv.x);
    float edgeFade = smoothstep(0.03, 0.16, uv.x) * (1.0 - smoothstep(0.90, 0.985, uv.x));

    vec3 color = black;
    color += graphite * broad * 0.09 * leftMask;
    color += silver * filament * 0.035 * leftMask;
    color += graphite * seamBroad * (0.10 + rightResolve * 0.12);
    color += silver * seamFilament * (0.08 + rightResolve * 0.10);
    color += champagne * seamFilament * rightResolve * 0.045;
    color += ivory * shimmer * seamBroad * 0.035;
    color += silver * (texture - 0.5) * seamBroad * 0.018;

    float terminal = exp(-length((p - vec2(aspect * 0.34, -0.025)) * vec2(1.25, 2.3)) * 8.0);
    color += silver * terminal * 0.025;
    color += champagne * terminal * 0.015;

    color *= edgeFade;
    float vignette = 1.0 - smoothstep(0.48, 0.96, length((uv - 0.5) * vec2(0.80, 1.05)));
    color *= 0.82 + vignette * 0.20;
    color += (hash21(gl_FragCoord.xy + floor(uTime * 2.0)) - 0.5) * 0.0045;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ResolveField({ reducedMotion, renderActive }: { reducedMotion: boolean; renderActive: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2());
  const target = useRef(new THREE.Vector2());
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
    materialRef.current?.uniforms.uResolution.value.set(size.width, size.height);
  }, [size.height, size.width]);

  useEffect(() => {
    if (!renderActive || reducedMotion) {
      target.current.set(0, 0);
      return;
    }

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const onMove = (event: PointerEvent) => {
      target.current.set((event.clientX / window.innerWidth - 0.5) * 2, -(event.clientY / window.innerHeight - 0.5) * 2);
    };
    const onLeave = () => target.current.set(0, 0);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion, renderActive]);

  useFrame(({ clock }, delta) => {
    if (!materialRef.current) return;
    const damping = 1 - Math.exp(-delta * 2.6);
    pointer.current.lerp(target.current, damping);
    materialRef.current.uniforms.uPointer.value.copy(pointer.current);
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

export default function FooterLabCanvas() {
  const { hostRef, reducedMotion, renderActive } = useRenderActivity();

  return (
    <div
      ref={hostRef}
      data-material-surface="footer"
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
        <ResolveField reducedMotion={reducedMotion} renderActive={renderActive} />
      </ResilientCanvas>
    </div>
  );
}
