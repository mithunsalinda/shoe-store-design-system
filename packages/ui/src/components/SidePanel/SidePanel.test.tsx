import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SidePanel } from "./SidePanel";

describe("SidePanel", () => {
  it("renders a complementary aside with title and content", () => {
    render(
      <SidePanel title="Product details" description="Review selected shoe.">
        Apex Runner 3
      </SidePanel>,
    );

    expect(screen.getByRole("complementary")).toHaveTextContent("Apex Runner 3");
    expect(screen.getByRole("heading", { name: "Product details" })).toBeInTheDocument();
  });

  it("renders footer actions", () => {
    render(
      <SidePanel title="Cart" footer={<button type="button">Checkout</button>}>
        Two items
      </SidePanel>,
    );

    expect(screen.getByRole("button", { name: "Checkout" })).toBeInTheDocument();
  });

  it("forwards custom attributes and classes", () => {
    render(
      <SidePanel className="custom-panel" aria-label="Filters" data-testid="panel">
        Filters
      </SidePanel>,
    );

    expect(screen.getByTestId("panel")).toHaveClass("custom-panel");
    expect(screen.getByRole("complementary", { name: "Filters" })).toBeInTheDocument();
  });
});
