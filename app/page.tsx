import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Capabilities from "@/components/Capabilities";
import Constructor from "@/components/Constructor";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
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
