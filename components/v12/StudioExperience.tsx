"use client";

import dynamic from "next/dynamic";
import Header from "./Header";
import Hero from "./Hero";
import Diagnostics from "./Diagnostics";
import Capabilities from "./Capabilities";
import BriefBuilder from "./BriefBuilder";
import Footer from "./Footer";
import MotionController from "./MotionController";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

export default function StudioExperience() {
  return (
    <div className="v12-app">
      <MotionController />
      <SceneCanvas />
      <Header />
      <main>
        <Hero />
        <Diagnostics />
        <Capabilities />
        <BriefBuilder />
      </main>
      <Footer />
    </div>
  );
}
