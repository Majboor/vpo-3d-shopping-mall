import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * ScrollProgress
 * A refined, editorial reading-progress indicator plus a floating
 * "return to top" control. Sits above the page chrome, respects the
 * site's warm vintage palette, and stays out of the way until useful.
 *
 * Additive component — mounted once at the page root. No shared state.
 */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0;
      setProgress(pct);
      setShowTop(scrollTop > window.innerHeight * 0.8);
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pctLabel = Math.round(progress * 100);

  return (
    <>
      {/* Reading progress hairline — hangs just under the top ticker */}
      <div
        aria-hidden="true"
        className="fixed top-8 left-0 right-0 z-[60] h-px pointer-events-none"
      >
        <div
          className="h-full origin-left bg-gradient-to-r from-white/30 via-white/80 to-white"
          style={{
            transform: `scaleX(${progress})`,
            transition: "transform 120ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Return-to-top — an editorial circular control with a progress ring */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={`Back to top, ${pctLabel}% read`}
        className={`group fixed bottom-6 right-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition-all duration-500 ease-out hover:border-white/40 hover:bg-black/80 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {/* Progress ring */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-white/10"
          />
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            className="text-white/70"
            style={{
              strokeDasharray: 2 * Math.PI * 21,
              strokeDashoffset: 2 * Math.PI * 21 * (1 - progress),
              transition: "stroke-dashoffset 120ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </svg>
        <ArrowUp
          size={16}
          strokeWidth={1.5}
          className="relative transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
        />
      </button>
    </>
  );
};

export default ScrollProgress;
