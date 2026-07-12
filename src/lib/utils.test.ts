import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn (className merge helper)", () => {
  it("joins multiple class strings", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("drops falsy / conditional values", () => {
    const show = false;
    expect(cn("a", show && "b", null, undefined, "c")).toBe("a c");
  });

  it("de-duplicates conflicting tailwind utilities, last wins", () => {
    // tailwind-merge should keep only the final padding utility
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("merges non-conflicting tailwind utilities", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
  });

  it("supports arrays and object syntax from clsx", () => {
    expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c");
  });

  it("returns an empty string when given nothing", () => {
    expect(cn()).toBe("");
  });
});
