import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const FooterSection = () => {
  return (
    <footer id="connect" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: easeOut }}
            className="font-display max-w-sm text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-foreground"
          >
            Mentorship for the next generation.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
            className="flex gap-16 sm:gap-24"
          >
            <div>
              <p className="text-sm font-medium text-foreground">Connect</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="https://www.instagram.com/pulsepathwaysatuic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://linktr.ee/pulseatuic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    Linktree
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Join</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="https://linktr.ee/pulseatuic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    Become a mentee
                  </a>
                </li>
                <li>
                  <a
                    href="https://linktr.ee/pulseatuic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    Become a mentor
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-28 border-t border-border py-6 md:mt-40">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Pulse Pathway at UIC
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
