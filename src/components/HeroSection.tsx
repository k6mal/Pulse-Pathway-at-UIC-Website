import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const roles = ["Medical Students", "PA Students"];

const HeroSection = () => {
  // We keep the doubled array technique for smooth transitions
  const displayRoles = [...roles, ...roles]; 
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [displayRoles.length]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-5xl mx-auto">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight opacity-0 animate-fade-in leading-tight">
          <span className="text-foreground">Direct one on one mentorship with</span>
          <br />
          {/* Container: Changed to inline-block to better handle horizontal width if needed, 
              but inline-flex works well with the centering. */}
          <span className="relative inline-flex justify-center h-[1.2em] w-full overflow-hidden">
            {displayRoles.map((role, index) => (
              <span
                key={`${role}-${index}`} 
                className={`absolute inset-x-0 text-center text-forest transition-all duration-500 ease-in-out ${
                  index === currentIndex
                    ? "translate-x-0 opacity-100"   // Active: Center
                    : index === (currentIndex - 1 + displayRoles.length) % displayRoles.length
                    ? "translate-x-12 opacity-0"    // Previous: Exit to RIGHT (+X)
                    : "-translate-x-12 opacity-0"   // Next: Enter from LEFT (-X)
                }`}
              >
                {role}
              </span>
            ))}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-8 text-xl md:text-2xl font-display text-muted-foreground opacity-0 animate-fade-in animate-delay-100">
          Mentorship. Matters.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in animate-delay-200">
          <Button variant="default" size="lg">
            Join Now
          </Button>
          <Button variant="secondary" size="lg">
            Our Instagram
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;