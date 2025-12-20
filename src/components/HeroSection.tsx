import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const roles = ["Medical Students", "Physician Assistant Students"];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-5xl mx-auto">
        {/* Main Headline - Large bold Inter with animated role */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight opacity-0 animate-fade-in leading-tight">
          <span className="text-foreground">Direct one on one mentorship with</span>
          <br />
          <span className="relative inline-flex justify-center h-[1.2em] w-full">
            {roles.map((role, index) => (
              <span
                key={role}
                className={`absolute inset-x-0 text-center text-forest transition-all duration-500 ease-in-out ${
                  index === currentIndex
                    ? "translate-y-0 opacity-100"
                    : index === (currentIndex - 1 + roles.length) % roles.length
                    ? "-translate-y-full opacity-0"
                    : "translate-y-full opacity-0"
                }`}
              >
                {role}
              </span>
            ))}
          </span>
        </h1>

        {/* Subheadline - Futura/Jost, smaller, grey */}
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
