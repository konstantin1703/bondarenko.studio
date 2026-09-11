"use client";

import dynamic from "next/dynamic";
import DeferredMaterial from "@/components/system/DeferredMaterial";

const FooterLabCanvasImpl = dynamic(() => import("./FooterLabCanvasImpl"), { ssr: false });

export default function FooterLabCanvas() {
  return (
    <DeferredMaterial surface="footer">
      <FooterLabCanvasImpl />
    </DeferredMaterial>
  );
}
