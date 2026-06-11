import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useSnapPoints, useFreeZone } from "@/components/SmoothScroll";

/**
 * Goldsand-style scroll-unlock text: the section pins while the manifesto
 * "unlocks" word by word — each word fades from faint gray to full ink as
 * scroll progress advances.
 */

type Token = { text: string; accent?: boolean };

const manifesto: Token[] = [
  ...words("The path into medicine is long, confusing, and lonely."),
  ...words("Pulse Pathway pairs you with a mentor who has already walked it —"),
  ...words("one-on-one,", true),
  ...words("semester after semester,", true),
  ...words("so you never have to guess the way forward.", true),
];

function words(sentence: string, accent = false): Token[] {
  return sentence.split(" ").map((text) => ({ text, accent }));
}

const Word = ({
  token,
  progress,
  range,
}: {
  token: Token;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  // Callback form required: the array-range overload of useTransform
  // (framer-motion 12.40) fails to clamp past the range end here, causing
  // unlocked words to fade back out as scrolling continues.
  const opacity = useTransform(progress, (p) => {
    const t = Math.min(1, Math.max(0, (p - range[0]) / (range[1] - range[0])));
    return 0.13 + 0.87 * t;
  });
  return (
    <motion.span style={{ opacity }} className={token.accent ? "text-forest" : undefined}>
      {token.text}{" "}
    </motion.span>
  );
};

const ManifestoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Checkpoint at the section's entry edge so a gesture lands the reader at the
  // start of the reveal; the section itself is a free-scroll zone, so the words
  // unlock as the reader scrolls through at their own pace rather than snapping.
  useSnapPoints(containerRef, [0]);
  useFreeZone(containerRef);

  const total = manifesto.length;
  // Each word unlocks across an overlapping slice of scroll progress,
  // finishing at 85% so the completed statement holds before unpinning.
  const step = 0.85 / total;

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-5 sm:px-8">
        <p
          className="font-display max-w-4xl text-center font-medium text-foreground"
          style={{
            fontSize: "clamp(1.6rem, 2.4vw + 0.6rem, 3.1rem)",
            lineHeight: 1.3,
            letterSpacing: "-0.022em",
          }}
        >
          {manifesto.map((token, i) => (
            <Word
              key={i}
              token={token}
              progress={scrollYProgress}
              range={[i * step, i * step + step * 3.5]}
            />
          ))}
        </p>
      </div>
    </section>
  );
};

export default ManifestoSection;
