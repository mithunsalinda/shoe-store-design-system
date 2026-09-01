import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NavigationMenu } from "./NavigationMenu";

const items = [
  {
    type: "section" as const,
    label: "Shop",
    value: "shop",
    featured: {
      eyebrow: "New",
      label: "Trail Collection",
      href: "/collections/trail",
      description: "Weather-ready shoes for mixed terrain.",
    },
    links: [
      { label: "Running shoes", href: "/running", description: "Daily trainers and race day." },
      { label: "Court shoes", href: "/court" },
    ],
  },
  { label: "Sale", href: "/sale", active: true },
];

describe("NavigationMenu", () => {
  it("renders navigation links and section triggers", () => {
    render(<NavigationMenu items={items} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Shop/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sale" })).toHaveAttribute("href", "/sale");
  });

  it("opens section content from a trigger", () => {
    render(<NavigationMenu items={items} />);

    fireEvent.click(screen.getByRole("button", { name: /Shop/ }));

    expect(screen.getByRole("link", { name: /Trail Collection/ })).toHaveAttribute(
      "href",
      "/collections/trail",
    );
    expect(screen.getByRole("link", { name: /Running shoes/ })).toHaveAttribute("href", "/running");
  });

  it("supports controlled value", () => {
    render(<NavigationMenu items={items} value="shop" />);

    expect(screen.getByRole("link", { name: /Trail Collection/ })).toBeInTheDocument();
  });

  it("calls onValueChange when a section opens", () => {
    const onValueChange = vi.fn();

    render(<NavigationMenu items={items} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("button", { name: /Shop/ }));

    expect(onValueChange).toHaveBeenCalledWith("shop");
  });

  it("marks disabled links as unavailable", () => {
    render(
      <NavigationMenu
        items={[
          {
            type: "section",
            label: "Learn",
            value: "learn",
            links: [{ label: "Guides", href: "/guides", disabled: true }],
          },
        ]}
        value="learn"
      />,
    );

    expect(screen.getByRole("link", { name: "Guides" })).toHaveAttribute("aria-disabled", "true");
  });
});
