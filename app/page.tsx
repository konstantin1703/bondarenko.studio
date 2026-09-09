"use client";

import dynamic from "next/dynamic";

const V8VisualLab = dynamic(() => import("@/components/V8VisualLab"), {
  ssr: false,
  loading: () => <div className="v8-loading" aria-hidden="true" />,
});

export default function Home() {
  return (
    <main className="v8-page">
      <V8VisualLab />
    </main>
  );
}
