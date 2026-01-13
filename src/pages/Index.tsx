import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => setShowContent(true), 50);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <main className={`min-h-screen bg-background ${isLoading ? 'hidden' : ''}`}>
        <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <div className={showContent ? 'animate-content-reveal' : ''} style={{ animationDelay: '0ms' }}>
            <Navbar />
          </div>
          <div className={showContent ? 'animate-content-reveal' : ''} style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
            <HeroSection />
          </div>
          <div className={showContent ? 'animate-content-reveal' : ''} style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            <MissionSection />
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
