import { Button } from "@/components/ui/button";

const roles = ["Medical Students", "Physician Assistant Students"];

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Headline */}
        <h1 className="opacity-0 animate-fade-in">
          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
            Mentorship.
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-forest mt-1">
            Matters.
          </span>
        </h1>

        {/* Subheadline - Futura/Jost font with animated role */}
        <p className="mt-8 text-xl md:text-2xl lg:text-3xl font-display text-muted-foreground opacity-0 animate-fade-in animate-delay-100">
          <span>Direct one on one mentorship with </span>
          <span className="inline-block h-[1.2em] overflow-hidden align-bottom">
            <span className="flex flex-col animate-text-slide">
              {[...roles, ...roles].map((role, index) => (
                <span 
                  key={index} 
                  className="h-[1.2em] flex items-center text-foreground font-medium"
                >
                  {role}
                </span>
              ))}
            </span>
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in animate-delay-200">
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
