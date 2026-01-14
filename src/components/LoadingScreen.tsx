import { useState, useEffect } from "react";
import pulseLogo from "@/assets/Pulse.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading time of 1.2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade-out animation to complete
      setTimeout(onLoadingComplete, 300);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* EKG Animation Container */}
      <div className="relative w-full h-80 flex items-center justify-center px-8">
        {/* EKG Line */}
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 300"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Blur filter for fuzzy edges */}
            <filter id="blur">
              <feGaussianBlur stdDeviation="8" />
            </filter>

            {/* Gradient for soft edges - sweep box */}
            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="black" stopOpacity="0" />
              <stop offset="30%" stopColor="black" stopOpacity="1" />
              <stop offset="70%" stopColor="black" stopOpacity="1" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </linearGradient>

            {/* Gradient for reveal edge */}
            <linearGradient id="revealGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="98%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <mask id="sweepMask">
              <g className="animate-ekg-sweep">
                <rect
                  x="0"
                  y="0"
                  width="1200"
                  height="300"
                  fill="url(#revealGradient)"
                />
              </g>
            </mask>
          </defs>

          {/* Pulse logo image with mask */}
          <image
            href={pulseLogo}
            x="0"
            y="75"
            width="1000"
            height="150"
            preserveAspectRatio="xMidYMid meet"
            mask="url(#sweepMask)"
          />
        </svg>
      </div>
    </div>
  );
};

export default LoadingScreen;
