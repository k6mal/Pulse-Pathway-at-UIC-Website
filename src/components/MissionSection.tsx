import { Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import starBadge from "@/assets/star-badge.png";
import pulseIcon from "@/assets/pulse-icon.png";

const MissionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 flex items-center bg-background"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <h2 
            className="font-bold text-forest"
            style={{ 
              fontSize: 'clamp(1.75rem, 5vw + 0.5rem, 3.75rem)',
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}
          >
            Our Mission
          </h2>
          <div 
            className="h-1 bg-mint mx-auto rounded-full" 
            style={{ 
              width: 'clamp(4rem, 8vw, 6rem)',
              marginTop: 'clamp(1rem, 2vw, 1.5rem)'
            }}
          />
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-4 lg:gap-6 items-stretch">
          {/* Left Column */}
          <div className={`bg-cream/30 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 border border-forest/5 hover:border-forest/10 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-x-0 md:animate-slide-out-left' : 'opacity-100 md:opacity-0 md:translate-x-[50%]'
          }`}>
            <div className="flex justify-center">
              <Users 
                className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4 text-forest/70" 
                strokeWidth={1.5}
              />
            </div>
            <div className="h-1 w-10 sm:w-12 bg-mint/60 rounded-full mb-4 sm:mb-6 mx-auto" />
            <p 
              className="text-forest/80 text-center"
              style={{ 
                fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.125rem)',
                lineHeight: '1.7',
                letterSpacing: '0.01em'
              }}
            >
              Our mission is to create clear, accessible pathways into medicine
              by connecting students with mentors who have firsthand experience
              navigating graduate school preparation, applications, and training.
              Through these individualized relationships, mentees gain guidance
              on academics, clinical involvement, research, and professional
              growth.
            </p>
          </div>

          {/* Middle Column - Emphasized */}
          <div className="bg-forest rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-12 shadow-lg md:shadow-xl transform md:scale-105 md:-my-4 z-10 relative order-first md:order-none">
            <div className="flex justify-center mb-4 sm:mb-6">
              <img 
                src={pulseIcon} 
                alt="Pulse icon" 
                className="w-12 sm:w-14 md:w-16 h-auto brightness-0 invert"
              />
            </div>
            <p 
              className="text-white font-medium text-center"
              style={{ 
                fontSize: 'clamp(1rem, 1.75vw + 0.25rem, 1.25rem)',
                lineHeight: '1.7',
                letterSpacing: '0.01em'
              }}
            >
              Pulse Pathway is committed to supporting pre-health students by
              providing structured, one-on-one mentorship with graduate and
              medical students.
            </p>
          </div>

          {/* Right Column */}
          <div className={`bg-cream/30 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 border border-forest/5 hover:border-forest/10 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-x-0 md:animate-slide-out-right' : 'opacity-100 md:opacity-0 md:-translate-x-[50%]'
          }`}>
            <div className="flex justify-center">
              <img src={starBadge} alt="Star badge" className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(18%) saturate(746%) hue-rotate(94deg) brightness(95%) contrast(89%)' }} />
            </div>
            <div className="h-1 w-10 sm:w-12 bg-mint/60 rounded-full mb-4 sm:mb-6 mx-auto" />
            <p 
              className="text-forest/80 text-center"
              style={{ 
                fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.125rem)',
                lineHeight: '1.7',
                letterSpacing: '0.01em'
              }}
            >
              By leveraging our close proximity to the Rush campus, we aim to
              enhance access to mentorship, clinical insight, and professional
              development, maximizing opportunities and benefits for our
              members. Pulse Pathway emphasizes community, mentorship, and
              continuity, fostering meaningful, long-term mentor–mentee
              connections that equip aspiring physicians with the insight,
              support, and confidence needed to progress through each stage of
              their medical journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
