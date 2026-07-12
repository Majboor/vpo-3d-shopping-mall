import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { NavLink } from "./NavLink";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="*"
          element={
            <NavLink to="/gallery" className="base" activeClassName="is-active">
              Gallery
            </NavLink>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe("NavLink", () => {
  it("renders an anchor with the base class", () => {
    renderAt("/");
    const link = screen.getByRole("link", { name: "Gallery" });
    expect(link).toHaveAttribute("href", "/gallery");
    expect(link.className).toContain("base");
    expect(link.className).not.toContain("is-active");
  });

  it("applies activeClassName when the route matches", () => {
    renderAt("/gallery");
    const link = screen.getByRole("link", { name: "Gallery" });
    expect(link.className).toContain("base");
    expect(link.className).toContain("is-active");
  });
});
