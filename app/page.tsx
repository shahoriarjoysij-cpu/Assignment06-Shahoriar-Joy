import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeLibrary from "@/components/HomeLibrary";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <HomeLibrary />
      </main>

      <Footer />
    </>
  );
}