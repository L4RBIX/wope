import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ResearchCardsSection } from "@/components/ResearchCardsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ResearchCardsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
