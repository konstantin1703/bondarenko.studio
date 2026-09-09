import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BONDARENKO.STUDIO — V8 Visual Lab",
  description: "Experimental visual system for BONDARENKO.STUDIO.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
