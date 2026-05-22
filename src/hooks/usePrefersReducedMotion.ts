import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the user's OS-level "reduce motion" accessibility preference.
 *
 * Returns `true` when the user has asked for reduced motion, so heavy,
 * auto-playing or vestibular-triggering experiences (scroll-driven frame
 * sequences, large parallax moves) can be skipped in favour of a calm,
 * static presentation. Updates live if the preference changes.
 */
export function usePrefersReducedMotion(): boolean {
  const getInitial = () =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(QUERY).matches;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(getInitial);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Sync in case the value changed between render and effect.
    setPrefersReducedMotion(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", listener);

    return () => mediaQueryList.removeEventListener("change", listener);
  }, []);

  return prefersReducedMotion;
}

export default usePrefersReducedMotion;
