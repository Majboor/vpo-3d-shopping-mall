import { useMemo } from "react";

export type HeroVariant = "a" | "b";

/**
 * Reads the active hero/landing variant from the URL query string.
 *
 * A/B toggle for the landing entry screen:
 *   - default (no param, or ?variant=a) -> variant "a" (original VersionSelector)
 *   - ?variant=b                        -> variant "b" (alternate hero)
 *
 * The value is read once from window.location at mount. This is a lightweight
 * client-side experiment switch; it intentionally avoids any router coupling so
 * it can be dropped into any entry component.
 */
export function readHeroVariant(search?: string): HeroVariant {
  const query =
    search ??
    (typeof window !== "undefined" ? window.location.search : "");
  const params = new URLSearchParams(query);
  const raw = (params.get("variant") || "").trim().toLowerCase();
  return raw === "b" ? "b" : "a";
}

export function useHeroVariant(): HeroVariant {
  return useMemo(() => readHeroVariant(), []);
}
