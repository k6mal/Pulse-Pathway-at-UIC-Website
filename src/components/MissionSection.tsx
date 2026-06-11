import { useRef } from "react";
import { motion } from "framer-motion";
import { Users, Route, Stethoscope } from "lucide-react";
import { useSnapPoints } from "@/components/SmoothScroll";

const easeOut = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    icon: Users,
    title: "Physician-leaders first",
    body: "We educate and develop the next generation of physician-leaders who place service, integrity, and community impact at the forefront of their careers.",
  },
  {
    icon: Route,
    title: "Clear, accessible pathways",
    body: "We connect students with mentors who have firsthand experience navigating graduate school preparation, applications, and training.",
  },
  {
    icon: Stethoscope,
    title: "The Rush connection",
    body: "Our close connection to the Rush campus expands access to medical trainees, clinical insight, and professional development opportunities students might not otherwise encounter.",
  },
];

const MissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useSnapPoints(sectionRef);

  return (
    <section ref={sectionRef} id="mission" className="px-5 py-24 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-8">
        {/* Sticky heading column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: easeOut }}
          >
            <p className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground">
              Our mission
            </p>
            <h2
              className="font-display mt-5 font-semibold text-foreground"
              style={{
                fontSize: "clamp(2rem, 2.8vw + 0.9rem, 3.25rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.022em",
              }}
            >
              Built on service.
              <br />
              Driven by mentorship.
            </h2>
            <p className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground">
              Pulse Pathway exists to make the road into medicine clear and
              accessible — for every student willing to walk it.
            </p>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="flex flex-col gap-12 md:gap-16">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 1, ease: easeOut, delay: i * 0.08 }}
              className="max-w-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                <pillar.icon className="h-5 w-5 text-foreground" strokeWidth={1.75} />
              </div>
              <h3 className="font-display mt-5 text-lg sm:text-xl font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
