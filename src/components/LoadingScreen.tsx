import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<"pulse" | "exit" | "done">("pulse");

  useEffect(() => {
    // Run 2 pulse cycles (~2.4s), then exit
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 2400);

    // Complete after exit animation
    const completeTimer = setTimeout(() => {
      setPhase("done");
      onLoadingComplete();
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-all duration-500 ease-in ${
        phase === "exit" ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="w-64 md:w-80">
        <svg
          viewBox="0 0 400 120"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* EKG Path - traced like the uploaded logo */}
          <path
            d="M 10 70 
               L 60 70 
               Q 70 70 75 60 
               Q 80 50 85 70 
               Q 90 90 95 70 
               Q 100 50 105 60 
               L 110 70 
               L 140 70 
               L 155 70 
               L 170 70 
               L 180 20 
               L 195 100 
               L 210 55 
               L 225 70 
               Q 235 75 245 72 
               L 260 70 
               L 390 70"
            fill="none"
            stroke="hsl(142, 76%, 22%)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ekg-line"
          />
        </svg>
      </div>

      <style>{`
        .ekg-line {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: ekg-draw 1.2s ease-in-out forwards, ekg-pulse 1.2s ease-in-out 1.2s forwards;
        }
        
        @keyframes ekg-draw {
          0% {
            stroke-dashoffset: 800;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes ekg-pulse {
          0% {
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dashoffset: -400;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
