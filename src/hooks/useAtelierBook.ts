import { useCallback, useEffect, useState } from "react";

/**
 * useAtelierBook — a small localStorage-backed "wishlist" for the Atelier.
 *
 * The Atelier Book is the member's private edit: the set of pieces they have
 * saved to revisit. It persists across sessions and stays in sync across
 * open tabs via the `storage` event.
 */
const STORAGE_KEY = "vpo.atelier.book.v1";

function readBook(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function useAtelierBook() {
  const [ids, setIds] = useState<string[]>(readBook);

  // Persist whenever the book changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* storage may be unavailable (private mode / quota) — fail quietly */
    }
  }, [ids]);

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setIds(readBook());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    let added = false;
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      added = true;
      return [...prev, id];
    });
    // Return value reflects the intended action for the current call.
    return !ids.includes(id);
  }, [ids]);

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  return { ids, count: ids.length, has, toggle, remove, clear };
}

export default useAtelierBook;
