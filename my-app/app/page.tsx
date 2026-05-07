import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import FeaturedHampers from "./components/FeaturedHampers";
import Framework from "./components/Framework";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#f8f4ee] text-black">
      <Navbar />
      <Hero />
      <Services />
      <CaseStudies />
      <FeaturedHampers />
      <Framework />
      <Contact />
      <Footer />
    </main>
  );
}