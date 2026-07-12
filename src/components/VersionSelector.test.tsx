import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VersionSelector from "./VersionSelector";

describe("VersionSelector", () => {
  it("renders both experience options", () => {
    render(<VersionSelector onSelect={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "PREMIUM" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "LITE" })).toBeInTheDocument();
  });

  it("calls onSelect('premium') when the premium option is chosen", async () => {
    const onSelect = vi.fn();
    render(<VersionSelector onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("heading", { name: "PREMIUM" }).closest("button")!);
    expect(onSelect).toHaveBeenCalledWith("premium");
  });

  it("calls onSelect('lite') when the lite option is chosen", async () => {
    const onSelect = vi.fn();
    render(<VersionSelector onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("heading", { name: "LITE" }).closest("button")!);
    expect(onSelect).toHaveBeenCalledWith("lite");
  });
});
