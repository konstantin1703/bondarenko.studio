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
    <div className="v12-app v13-app">
      <a className="v12-skip-link" href="#main-content">
        Перейти к содержанию
      </a>

      <MotionController />
      <SceneCanvas />

      <div className="v13-noise" aria-hidden="true" />
      <div className="v13-edge v13-edge--left" aria-hidden="true" />
      <div className="v13-edge v13-edge--right" aria-hidden="true" />
      <div className="v13-axis" aria-hidden="true">
        <span>BND / DIGITAL SYSTEMS</span>
        <i />
        <span>2026</span>
      </div>

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
