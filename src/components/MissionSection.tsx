import starBadge from "@/assets/star-badge.png";

const MissionSection = () => {
  return (
    <section className="min-h-screen py-24 px-6 md:px-12 lg:px-20 flex items-center bg-background">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest tracking-tight">
            Our Mission
          </h2>
          <div className="w-24 h-1 bg-mint mx-auto mt-6 rounded-full" />
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch">
          {/* Left Column */}
          <div className="bg-cream/30 rounded-2xl p-8 lg:p-10 border border-forest/5 hover:border-forest/10 transition-colors duration-300">
            <div className="h-1 w-12 bg-mint/60 rounded-full mb-6" />
            <p className="text-forest/80 text-base lg:text-lg leading-relaxed">
              Our mission is to create clear, accessible pathways into medicine
              by connecting students with mentors who have firsthand experience
              navigating medical school preparation, applications, and training.
              Through these individualized relationships, mentees gain guidance
              on academics, clinical involvement, research, and professional
              growth.
            </p>
          </div>

          {/* Middle Column - Emphasized */}
          <div className="bg-forest rounded-2xl p-8 lg:p-12 shadow-xl transform lg:scale-105 lg:-my-4">
            <div className="h-1 w-16 bg-mint rounded-full mb-6" />
            <p className="text-white text-lg lg:text-xl leading-relaxed font-medium">
              Pulse Pathway is committed to supporting pre-medical students by
              providing structured, one-on-one mentorship with graduate and
              medical students.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-2 h-2 bg-mint rounded-full" />
              <span className="text-cream/70 text-sm font-medium tracking-wide uppercase">
                Core Mission
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-cream/30 rounded-2xl p-8 lg:p-10 border border-forest/5 hover:border-forest/10 transition-colors duration-300">
            <img src={starBadge} alt="Star badge" className="w-10 h-10 mb-4" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(18%) saturate(746%) hue-rotate(94deg) brightness(95%) contrast(89%)' }} />
            <div className="h-1 w-12 bg-mint/60 rounded-full mb-6" />
            <p className="text-forest/80 text-base lg:text-lg leading-relaxed">
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
