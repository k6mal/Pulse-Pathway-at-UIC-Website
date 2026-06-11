import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  ReactNode,
} from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";

interface SmoothScrollApi {
  scrollTo: (target: string) => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi>({
  scrollTo: (target) => {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  },
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * Wraps the page in a Lenis smooth-scroll layer. The wheel drives an eased,
 * momentum-based glide that settles on its own. Once the glide comes to rest,
 * a proximity snap gently aligns the nearest top-level section to the top — but
 * only when the resting point is already close to a section edge, so flinging
 * through tall content or scrubbing the manifesto reveal is never interrupted
 * (no per-gesture forcing, no rubber-banding). Honors prefers-reduced-motion.
 */
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
    const lenis = new Lenis({ duration: 1.1, easing, smoothWheel: true });
    lenisRef.current = lenis;

    // Align each full-height content section to the viewport top on settle. The
    // addon tracks element positions itself (re-measures on resize/reflow), and
    // proximity means it only engages near a snap point — the manifesto's mid
    // scroll is more than `distanceThreshold` from any edge, so it scrubs free.
    // The footer is deliberately excluded: it's terminal and shorter than the
    // viewport, so aligning its top would yank the reader back up off the page
    // bottom. Left unregistered, the bottom rests naturally (the last section is
    // >1 screen away, so proximity never reaches back up to grab it).
    const snap = new Snap(lenis, { type: "proximity", easing, duration: 0.9 });
    const sections = document.querySelectorAll<HTMLElement>("main > section");
    sections.forEach((el) => snap.addElement(el, { align: "start" }));

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      snap.destroy();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0, duration: 1.6 });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const api = useMemo(() => ({ scrollTo }), [scrollTo]);

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
};

export default SmoothScroll;
