import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapPoints } from "@/components/SmoothScroll";

const roles = ["medical students", "PA students"];

const easeOut = [0.22, 1, 0.36, 1] as const;

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useSnapPoints(sectionRef);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center px-5 pt-16 pb-36 sm:px-8"
    >
      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
          className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground"
        >
          Pulse Pathway at UIC
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.25 }}
          className="font-display mt-6 font-semibold text-foreground"
          style={{
            fontSize: "clamp(2.25rem, 4.5vw + 1rem, 4.75rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.022em",
          }}
        >
          Direct, long-term, one-on-one mentorship with{" "}
          <span className="relative block h-[1.2em] w-full overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={roles[roleIndex]}
                initial={{ y: "70%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-70%", opacity: 0 }}
                transition={{ duration: 0.9, ease: easeOut }}
                className="absolute inset-x-0 text-center text-forest"
              >
                {roles[roleIndex]}.
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.45 }}
          className="mx-auto mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
        >
          Real guidance from students already walking the path you're on —
          from your first semester to your white coat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="https://linktr.ee/pulseatuic"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-opacity duration-300 hover:opacity-80 sm:w-auto"
          >
            Join Now
          </a>
          <a
            href="https://www.instagram.com/pulsepathwaysatuic"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full border border-foreground/15 px-8 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-secondary sm:w-auto"
          >
            Our Instagram
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 [@media(max-height:700px)]:hidden"
      >
        <span className="font-display text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Scroll
        </span>
        <div className="h-10 w-px overflow-hidden bg-border">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full bg-foreground/60"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
