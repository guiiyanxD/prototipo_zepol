import Navbar from "@/components/landing/Navbar";
import WelcomeHero from "@/components/landing/WelcomeHero";
import HeroQuoter from "@/components/HeroQuoter";
import Certifications from "@/components/landing/Certifications";
import Capabilities from "@/components/landing/Capabilities";
import MaterialsTechnicalGrid from "@/components/landing/MaterialsTechnicalGrid";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <WelcomeHero />
      <HeroQuoter />
      <Certifications />
      <Capabilities />
      <MaterialsTechnicalGrid />
      <Footer />
    </main>
  );
}
