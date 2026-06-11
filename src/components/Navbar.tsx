import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSmoothScroll } from "@/components/SmoothScroll";
import pulseIcon from "@/assets/pulse-icon.png";

const navLinks = [
  { label: "Mission", target: "#mission" },
  { label: "How it works", target: "#how-it-works" },
  { label: "Connect", target: "#connect" },
];

const Navbar = () => {
  const { scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <img src={pulseIcon} alt="" className="h-6 w-auto" />
            <span className="font-display text-lg font-medium tracking-tight text-foreground">
              Pulse Pathway
            </span>
          </button>

          <div className="flex items-center gap-7">
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollTo(link.target)}
                  className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <a
              href="https://linktr.ee/pulseatuic"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity duration-300 hover:opacity-80"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
