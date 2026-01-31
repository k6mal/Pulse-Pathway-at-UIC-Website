import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/pulse-pathway-logo.png";

const roles = ["Medical Students", "PA Students"];

const HeroSection = () => {
  const displayRoles = [...roles, ...roles];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [displayRoles.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.3;
      setShowScrollIndicator(scrollY < threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 py-20 md:py-0 relative overflow-hidden">
      {/* Logo - responsive sizing */}
      <img
        src={logo}
        alt="Pulse Pathway at UIC"
        className="absolute top-2 sm:top-[5px] left-1/2 -translate-x-1/2 h-32 sm:h-48 md:h-64 lg:h-[18.75rem] z-0 opacity-80 md:opacity-100"
      />

      {/* Centered content */}
      <div className="text-center max-w-5xl mx-auto relative z-10 mt-16 sm:mt-20 md:mt-0">
        {/* Main Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight px-2">
          <span className="text-foreground">direct long-term one on one mentorship with</span>
          <br />
          {/* Container needs overflow-hidden to "mask" the sliding text */}
          <span className="relative inline-flex justify-center h-[1.3em] w-full overflow-hidden">
            {displayRoles.map((role, index) => {
              const isCurrent = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + displayRoles.length) % displayRoles.length;
              const shouldAnimate = isCurrent || isPrev;

              return (
                <span
                  key={`${role}-${index}`}
                  className={`absolute inset-x-0 text-center text-forest ease-out ${
                    shouldAnimate ? "transition-all duration-700" : "transition-none duration-0"
                  } ${
                    isCurrent
                      ? "translate-x-0 opacity-100"
                      : isPrev
                      ? "-translate-x-8 sm:-translate-x-12 opacity-0"
                      : "translate-x-8 sm:translate-x-12 opacity-0"
                  }`}
                >
                  {role}
                </span>
              );
            })}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl font-display text-muted-foreground">
          Mentorship. Matters.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button variant="default" size="lg" className="w-full sm:w-auto">
            Join Now
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            Our Instagram
          </Button>
        </div>
      </div>

      {/* Scroll Indicator - hidden on very small screens */}
      <div
        className={`absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3 transition-opacity duration-500 ${
          showScrollIndicator ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-muted flex flex-col items-center justify-center animate-bounce">
          <ChevronDown className="w-4 h-4 sm:w-6 sm:h-6 text-[hsl(170,50%,35%)] -mb-2 sm:-mb-3" />
          <ChevronDown className="w-4 h-4 sm:w-6 sm:h-6 text-[hsl(170,50%,35%)]" />
        </div>
        <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Scroll for Our Mission</span>
      </div>
    </section>
  );
};

export default HeroSection;