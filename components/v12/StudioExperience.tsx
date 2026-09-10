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
      <a className="v12-skip-link" href="#main-content">
        Перейти к содержанию
      </a>
      <MotionController />
      <SceneCanvas />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Diagnostics />
        <Capabilities />
        <BriefBuilder />
      </main>
      <Footer />
    </div>
  );
}
