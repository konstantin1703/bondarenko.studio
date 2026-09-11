"use client";

import dynamic from "next/dynamic";
import DeferredMaterial from "@/components/system/DeferredMaterial";

const BriefLabCanvasImpl = dynamic(() => import("./BriefLabCanvasImpl"), { ssr: false });

export default function BriefLabCanvas({ step, progress }: { step: number; progress: number }) {
  return (
    <DeferredMaterial surface="brief">
      <BriefLabCanvasImpl step={step} progress={progress} />
    </DeferredMaterial>
  );
}
