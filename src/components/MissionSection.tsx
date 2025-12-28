const MissionSection = () => {
  return (
    <section className="min-h-screen py-20 px-6 md:px-12 lg:px-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left side - Heading */}
        <div className="text-center lg:text-left">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[hsl(170,50%,25%)] tracking-tight">
            Our Mission
          </h2>
        </div>

        {/* Right side - Content Card */}
        <div className="bg-[hsl(170,50%,25%,0.1)] rounded-2xl p-8 md:p-10 lg:p-12">
          <div className="space-y-6 text-[hsl(170,50%,25%)] text-base md:text-lg leading-relaxed">
            <p>
              Pulse Pathway is committed to supporting pre-medical students by
              providing structured, one-on-one mentorship with graduate and
              medical students.
            </p>
            <p>
              Our mission is to create clear, accessible pathways into medicine
              by connecting students with mentors who have firsthand experience
              navigating medical school preparation, applications, and training.
              Through these individualized relationships, mentees gain guidance
              on academics, clinical involvement, research, and professional
              growth.
            </p>
            <p>
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
