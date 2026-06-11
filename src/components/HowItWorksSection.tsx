import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: "01",
    title: "Apply",
    body: "Tell us where you are on your journey — pre-med or pre-PA, first year or final stretch.",
  },
  {
    number: "02",
    title: "Get matched",
    body: "We pair you with a medical or PA student mentor who has been exactly where you are.",
  },
  {
    number: "03",
    title: "Grow together",
    body: "The pace is yours — and so is the initiative. You reach out, ask the questions, and set the meetings; your mentor is ready whenever you are, from your first exam to your acceptance letter.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="flex min-h-screen items-center px-5 py-24 sm:px-8 md:py-28">
      <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-2 lg:gap-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: easeOut }}
          >
            <p className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground">
              How it works
            </p>
            <h2
              className="font-display mt-5 font-semibold text-foreground"
              style={{
                fontSize: "clamp(2rem, 2.8vw + 0.9rem, 3.25rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.022em",
              }}
            >
              Mentorship that
              <br />
              <span className="text-forest">compounds.</span>
            </h2>
            <p className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground">
              No cold emails. No guesswork. One mentor, one mentee, and a
              self-paced relationship you drive — over your entire pre-health
              journey.
            </p>
            <a
              href="https://linktr.ee/pulseatuic"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-opacity duration-300 hover:opacity-80"
            >
              Start your application
            </a>
          </motion.div>
        </div>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 1, ease: easeOut, delay: i * 0.08 }}
              className="border-t border-border py-9 md:py-11 last:border-b"
            >
              <div className="flex items-start gap-6 sm:gap-10">
                <span className="font-display text-3xl sm:text-4xl font-semibold tabular-nums text-forest leading-none">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
