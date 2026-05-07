import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import HampersHero from "../components/hampers/HampersHero";
import HampersGrid from "../components/hampers/HampersGrid";

export default function HampersPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ee] text-black">
      <Navbar />

      <HampersHero />

      <HampersGrid />

      <Footer />
    </main>
  );
}