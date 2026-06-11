import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  ReactNode,
  RefObject,
} from "react";
import Lenis from "lenis";

type ComputePoints = () => number[];
type ComputeZones = () => [number, number][];

interface SmoothScrollApi {
  scrollTo: (target: string) => void;
  addSnapPoints: (compute: ComputePoints) => () => void;
  addFreeZone: (compute: ComputeZones) => () => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi>({
  scrollTo: (target) => {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  },
  addSnapPoints: () => () => {},
  addFreeZone: () => () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * Registers a scroll checkpoint for a section so each gesture settles on a full
 * screen of content. Default = the section top, clamped to the page's max
 * scroll (so a short trailing section like the footer resolves to the page
 * bottom). `fractions` places checkpoints at top + f * (height - vh) — used by
 * the pinned manifesto to register its entry edge.
 */
export function useSnapPoints(ref: RefObject<HTMLElement>, fractions?: number[]) {
  const { addSnapPoints } = useSmoothScroll();

  useEffect(() => {
    return addSnapPoints(() => {
      const el = ref.current;
      if (!el) return [];
      const vh = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - vh;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const pin = el.offsetHeight - vh;
      const points = fractions ? fractions.map((f) => top + f * pin) : [top];
      return points.map((p) => Math.round(Math.min(Math.max(p, 0), maxScroll)));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addSnapPoints, ref, JSON.stringify(fractions)]);
}

/**
 * Marks a section as a free-scroll zone: checkpoint snapping stands down while
 * the reader is inside it, so a scroll-linked reveal (the manifesto) can be
 * scrubbed at the reader's own pace instead of being snapped through. When a
 * gesture carries the reader out of the zone, they settle on the boundary
 * checkpoint just outside it.
 */
export function useFreeZone(ref: RefObject<HTMLElement>) {
  const { addFreeZone } = useSmoothScroll();

  useEffect(() => {
    return addFreeZone(() => {
      const el = ref.current;
      if (!el) return [];
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top + window.scrollY;
      // End the zone at the pin's end (reveal + hold), not the section's end.
      // The remaining "tail" stays normal snap-space, so a gesture that exits
      // the reveal glides forward onto the next checkpoint instead of
      // overshooting it and rubber-banding back.
      const pin = Math.max(el.offsetHeight - vh, 0);
      return [[Math.round(top), Math.round(top + pin)]];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addFreeZone, ref]);
}

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pointComputesRef = useRef(new Set<ComputePoints>());
  const zoneComputesRef = useRef(new Set<ComputeZones>());
  const valuesRef = useRef<number[]>([]);
  const zonesRef = useRef<[number, number][]>([]);

  const rebuild = useCallback(() => {
    const values = new Set<number>();
    pointComputesRef.current.forEach((compute) => compute().forEach((v) => values.add(v)));
    valuesRef.current = [...values].sort((a, b) => a - b);
    const zones: [number, number][] = [];
    zoneComputesRef.current.forEach((compute) => compute().forEach((z) => zones.push(z)));
    zonesRef.current = zones;
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
    const lenis = new Lenis({
      duration: 1.2,
      easing,
      smoothWheel: true,
      // Virtualize touch too so checkpoint snapping can govern swipes on phones.
      syncTouch: true,
    });
    lenisRef.current = lenis;

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    rebuild();
    // Re-measure whenever layout shifts: viewport resizes and any change to the
    // document's content height (late images, fonts, reflows).
    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(rebuild, 150);
    };
    window.addEventListener("resize", onResize);
    const bodyObserver = new ResizeObserver(onResize);
    bodyObserver.observe(document.body);

    // ---- Checkpoint snapping: one checkpoint per gesture --------------------
    // Each wheel/touch gesture advances exactly one checkpoint in its
    // direction. We fire shortly after the gesture's last input — while Lenis's
    // momentum is still easing — and retarget the scroll to the adjacent
    // checkpoint, so the whole motion is one smooth glide with no overshoot or
    // rubber-banding (checkpoints are a full screen apart, so a normal gesture
    // never carries past the next one). Inside a free-scroll zone (the
    // manifesto) we stand down so the reveal can be scrubbed; once a gesture
    // carries the reader out, we settle them on the zone's boundary checkpoint.
    // Scrollbar drags and programmatic scrolls emit no "virtual-scroll", so
    // they keep free movement.
    const nearestIndex = (y: number) => {
      const pts = valuesRef.current;
      let idx = 0;
      for (let i = 1; i < pts.length; i++) {
        if (Math.abs(pts[i] - y) < Math.abs(pts[idx] - y)) idx = i;
      }
      return idx;
    };
    const snapTo = (target: number) => {
      if (Math.abs(target - lenis.scroll) <= 2) return;
      lenis.scrollTo(target, {
        duration: 1.2,
        easing,
        lock: true,
        userData: { initiator: "snap" },
      });
    };
    const zoneOf = (y: number) =>
      zonesRef.current.find(([start, end]) => y >= start && y <= end);

    let originY: number | null = null;
    let dir = 0;
    let pendingFree = false;
    let fireTimer: number | undefined;
    let settleTimer: number | undefined;

    const fire = () => {
      const oy = originY;
      const d = dir;
      if (oy === null || d === 0) return;
      const zone = zoneOf(oy);
      // Moving further into / within a free zone → let the reveal scrub; the
      // settle-watcher will hand off to a checkpoint once the gesture exits.
      if (zone && ((d > 0 && oy < zone[1]) || (d < 0 && oy > zone[0]))) {
        pendingFree = true;
        return;
      }
      const pts = valuesRef.current;
      if (pts.length) {
        const ti = Math.max(0, Math.min(pts.length - 1, nearestIndex(oy) + (d > 0 ? 1 : -1)));
        snapTo(pts[ti]);
      }
      originY = null;
      dir = 0;
    };

    const onVirtualScroll = (e: { deltaY: number }) => {
      if (originY === null) originY = lenis.scroll;
      if (e.deltaY) dir = Math.sign(e.deltaY);
      window.clearTimeout(fireTimer);
      fireTimer = window.setTimeout(fire, 150);
    };

    const onScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (!pendingFree) return;
        const oy = originY;
        const d = dir;
        pendingFree = false;
        originY = null;
        dir = 0;
        const pts = valuesRef.current;
        if (!pts.length) return;
        const y = lenis.scroll;
        const zone = oy === null ? undefined : zoneOf(oy);
        // Still inside the zone → reader is mid-scrub; leave them be.
        if (zone && y > zone[0] + 2 && y < zone[1] - 2) return;
        let target: number | undefined;
        if (d >= 0) target = pts.find((p) => p >= (zone ? zone[1] : y) - 2);
        else target = [...pts].reverse().find((p) => p < (zone ? zone[0] : y));
        if (target === undefined) target = d >= 0 ? pts[pts.length - 1] : pts[0];
        snapTo(target);
      }, 170);
    };

    lenis.on("virtual-scroll", onVirtualScroll);
    lenis.on("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", onResize);
      bodyObserver.disconnect();
      window.clearTimeout(resizeTimer);
      window.clearTimeout(fireTimer);
      window.clearTimeout(settleTimer);
      lenis.off("virtual-scroll", onVirtualScroll);
      lenis.off("scroll", onScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [rebuild]);

  const scrollTo = useCallback((target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0, duration: 1.6 });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const addSnapPoints = useCallback(
    (compute: ComputePoints) => {
      pointComputesRef.current.add(compute);
      rebuild();
      return () => {
        pointComputesRef.current.delete(compute);
        rebuild();
      };
    },
    [rebuild],
  );

  const addFreeZone = useCallback(
    (compute: ComputeZones) => {
      zoneComputesRef.current.add(compute);
      rebuild();
      return () => {
        zoneComputesRef.current.delete(compute);
        rebuild();
      };
    },
    [rebuild],
  );

  const api = useMemo(
    () => ({ scrollTo, addSnapPoints, addFreeZone }),
    [scrollTo, addSnapPoints, addFreeZone],
  );

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
};

export default SmoothScroll;
