import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import MissionSection from "@/components/MissionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <main className="min-h-screen bg-background">
          <Navbar />
          <HeroSection />
          <ManifestoSection />
          <MissionSection />
          <HowItWorksSection />
          <FooterSection />
        </main>
      </SmoothScroll>
    </MotionConfig>
  );
};

export default Index;
