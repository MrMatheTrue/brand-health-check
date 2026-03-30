import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import MethodSection from "@/components/MethodSection";
import RulesSection from "@/components/RulesSection";
import CasesSection from "@/components/CasesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <MethodSection />
      <RulesSection />
      <CasesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
