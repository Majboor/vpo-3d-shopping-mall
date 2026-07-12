import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

describe("NotFound page", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the 404 message and a link home", () => {
    render(
      <MemoryRouter initialEntries={["/does-not-exist"]}>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    const home = screen.getByRole("link", { name: /return to home/i });
    expect(home).toHaveAttribute("href", "/");
  });

  it("logs the attempted path to console.error", () => {
    const spy = vi.spyOn(console, "error");
    render(
      <MemoryRouter initialEntries={["/broken/path"]}>
        <NotFound />
      </MemoryRouter>,
    );
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("404 Error"),
      "/broken/path",
    );
  });
});
