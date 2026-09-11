"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./resilient-canvas.module.css";

let webglAvailable: boolean | undefined;

function supportsWebGL() {
  if (webglAvailable !== undefined) return webglAvailable;
  try {
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2");
    webglAvailable = Boolean(context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglAvailable = false;
  }
  return webglAvailable;
}

class MaterialBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function MaterialFallback() {
  return (
    <div
      data-material-fallback="true"
      aria-hidden="true"
      className={styles.fallback}
    />
  );
}

/** Decorative graphics must never prevent access to the page or the brief. */
export default function ResilientCanvas({ onCreated, children, ...props }: CanvasProps) {
  const [available, setAvailable] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setAvailable(supportsWebGL());
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  const fallback = <MaterialFallback />;
  if (!available) return fallback;

  return (
    <MaterialBoundary fallback={fallback}>
      <Canvas
        {...props}
        fallback={fallback}
        onCreated={(state) => {
          cleanupRef.current?.();
          const canvas = state.gl.domElement;
          const onContextLost = () => setAvailable(false);
          canvas.addEventListener("webglcontextlost", onContextLost, { once: true });
          cleanupRef.current = () => canvas.removeEventListener("webglcontextlost", onContextLost);
          onCreated?.(state);
        }}
      >
        {children}
      </Canvas>
    </MaterialBoundary>
  );
}
