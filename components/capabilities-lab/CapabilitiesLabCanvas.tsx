"use client";

import dynamic from "next/dynamic";
import DeferredMaterial from "@/components/system/DeferredMaterial";

const CapabilitiesLabCanvasImpl = dynamic(() => import("./CapabilitiesLabCanvasImpl"), { ssr: false });

export default function CapabilitiesLabCanvas({ active }: { active: number }) {
  return (
    <DeferredMaterial surface="capabilities">
      <CapabilitiesLabCanvasImpl active={active} />
    </DeferredMaterial>
  );
}
