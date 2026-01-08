import { useState, useEffect } from "react";
import logo from "@/assets/pulse-pathway-logo.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading time of 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade-out animation to complete
      setTimeout(onLoadingComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Marquee container */}
      <div className="absolute inset-0 flex items-center">
        <div className="animate-marquee flex items-center gap-24 whitespace-nowrap">
          {/* Duplicate logos for seamless loop */}
          {[...Array(8)].map((_, i) => (
            <img
              key={i}
              src={logo}
              alt="Pulse Pathway"
              className="h-32 md:h-40 opacity-90"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
