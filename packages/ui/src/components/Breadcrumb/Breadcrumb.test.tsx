import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumb } from "./Breadcrumb";

const items = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Sneakers", href: "/products/sneakers" },
  { label: "White court sneaker" },
];

describe("Breadcrumb", () => {
  it("renders a labeled breadcrumb navigation", () => {
    render(<Breadcrumb items={items} />);

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  it("marks the last item as the current page by default", () => {
    render(<Breadcrumb items={items} />);

    expect(screen.getByText("White court sneaker")).toHaveAttribute("aria-current", "page");
  });

  it("supports an explicit current item", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products", current: true },
          { label: "Sneakers", href: "/products/sneakers" },
        ]}
      />,
    );

    expect(screen.getByText("Products")).toHaveAttribute("aria-current", "page");
  });

  it("collapses long trails when maxItems is set", () => {
    render(<Breadcrumb items={[{ label: "Store", href: "/store" }, ...items]} maxItems={4} />);

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("Sneakers")).toBeInTheDocument();
  });

  it("passes through nav attributes", () => {
    render(<Breadcrumb items={items} aria-label="Product path" data-testid="breadcrumb" />);

    expect(screen.getByRole("navigation", { name: "Product path" })).toHaveAttribute(
      "data-testid",
      "breadcrumb",
    );
  });
});
