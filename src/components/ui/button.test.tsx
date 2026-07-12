import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, buttonVariants } from "./button";

describe("Button", () => {
  it("renders its children as a native button by default", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn).toBeInTheDocument();
    expect(btn.tagName).toBe("BUTTON");
  });

  it("fires onClick when pressed", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Nope" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies variant + size classes via buttonVariants", () => {
    render(
      <Button variant="destructive" size="lg">
        Danger
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Danger" });
    expect(btn.className).toContain("bg-destructive");
    expect(btn.className).toContain("h-11");
  });

  it("renders as a child element when asChild is set (Slot)", () => {
    render(
      <Button asChild>
        <a href="/somewhere">Link button</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Link button" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/somewhere");
    // Slot forwards the button styling onto the anchor.
    expect(link.className).toContain("inline-flex");
  });
});

describe("buttonVariants", () => {
  it("produces the default variant classes", () => {
    const cls = buttonVariants();
    expect(cls).toContain("bg-primary");
    expect(cls).toContain("h-10");
  });

  it("honours explicit variant + size arguments", () => {
    const cls = buttonVariants({ variant: "outline", size: "sm" });
    expect(cls).toContain("border-input");
    expect(cls).toContain("h-9");
  });
});
