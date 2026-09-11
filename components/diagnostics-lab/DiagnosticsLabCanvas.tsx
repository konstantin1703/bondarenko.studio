"use client";

import dynamic from "next/dynamic";
import DeferredMaterial from "@/components/system/DeferredMaterial";

const DiagnosticsLabCanvasImpl = dynamic(() => import("./DiagnosticsLabCanvasImpl"), { ssr: false });

export default function DiagnosticsLabCanvas({ active }: { active: number }) {
  return (
    <DeferredMaterial surface="diagnostics">
      <DiagnosticsLabCanvasImpl active={active} />
    </DeferredMaterial>
  );
}
