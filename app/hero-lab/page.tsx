import type { Metadata } from "next";
import HeroLab from "@/components/hero-lab/HeroLab";

export const metadata: Metadata = {
  title: "BND Studio — Hero Lab",
  robots: { index: false, follow: false },
};

export default function HeroLabPage() {
  return <HeroLab />;
}
