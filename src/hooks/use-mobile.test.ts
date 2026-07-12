import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "./use-mobile";

// Build a controllable matchMedia mock so we can flip viewport width and fire
// the change listener the hook subscribes to.
function setViewport(width: number) {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
}

let changeHandlers: Array<() => void> = [];

beforeEach(() => {
  changeHandlers = [];
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: (_event: string, cb: () => void) => changeHandlers.push(cb),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
});

describe("useIsMobile", () => {
  it("returns true for viewports narrower than the 768px breakpoint", () => {
    setViewport(500);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("returns false for desktop-width viewports", () => {
    setViewport(1200);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("updates when the viewport crosses the breakpoint", () => {
    setViewport(1200);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      setViewport(400);
      changeHandlers.forEach((cb) => cb());
    });
    expect(result.current).toBe(true);
  });
});
