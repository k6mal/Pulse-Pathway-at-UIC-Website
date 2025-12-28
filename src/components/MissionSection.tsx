const MissionSection = () => {
  return (
    <section className="min-h-screen py-20 px-6 md:px-12 lg:px-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left side - Heading */}
        <div className="text-center lg:text-left">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[hsl(170,50%,25%)] tracking-tight">
            Hi there!
          </h2>
        </div>

        {/* Right side - Content Card */}
        <div className="bg-[hsl(170,50%,25%,0.1)] rounded-2xl p-8 md:p-10 lg:p-12">
          <div className="space-y-6 text-[hsl(170,50%,25%)] text-base md:text-lg leading-relaxed">
            <p>
              <strong>PULSE</strong> is on a mission to create{" "}
              <strong>equal opportunities</strong> for underrepresented pre-medical
              student. Our commitment to empowering students from diverse
              backgrounds means breaking down barriers to accessing medical
              education and experiences.
            </p>
            <p>
              With a focus on <strong>inclusivity</strong>, we are dedicated to
              creating a transformative impact in the lives of aspiring medical
              professionals. Through our mentorship program, we connect students
              with dedicated physicians, offering equal opportunities to thrive in
              their pursuit of a medical career.
            </p>
            <p>
              We have established a <strong>diverse network</strong> of licensed
              physicians nationwide. Our program is designed to allow you to form
              a relationship with a physician in your field of interest and
              maintain this connection through virtual interactions.
            </p>
            <p>
              Not only will you be able to learn about their career and life, you
              will have the opportunity to{" "}
              <strong>develop a research project</strong> with them as well.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
