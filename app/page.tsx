import Capabilities from "@/components/Capabilities";
import Constructor from "@/components/Constructor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import SystemBackground from "@/components/SystemBackground";

export default function Home() {
  return (
    <>
      <SystemBackground />
      <Header />
      <main>
        <Hero />
        <Problems />
        <Capabilities />
        <Constructor />
      </main>
      <Footer />
    </>
  );
}
