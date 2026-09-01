import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders a titled empty state section", () => {
    render(
      <EmptyState title="No products found" description="Try changing filters.">
        Ignored
      </EmptyState>,
    );

    expect(screen.getByRole("region")).toHaveTextContent("No products found");
    expect(screen.getByRole("heading", { name: "No products found" })).toBeInTheDocument();
    expect(screen.getByText("Try changing filters.")).toBeInTheDocument();
  });

  it("renders primary and secondary actions", () => {
    render(
      <EmptyState
        title="No products"
        action={<button type="button">Add product</button>}
        secondaryAction={<button type="button">Import CSV</button>}
      />,
    );

    expect(screen.getByRole("button", { name: "Add product" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Import CSV" })).toBeInTheDocument();
  });

  it("can render as a div with custom attributes", () => {
    render(
      <EmptyState as="div" title="No orders" aria-label="Order empty state" data-testid="empty" />,
    );

    expect(screen.getByTestId("empty").tagName).toBe("DIV");
    expect(screen.getByLabelText("Order empty state")).toBeInTheDocument();
  });

  it("renders custom media instead of the default icon", () => {
    render(<EmptyState title="No results" media={<img alt="Empty shelf" src="/empty.png" />} />);

    expect(screen.getByRole("img", { name: "Empty shelf" })).toBeInTheDocument();
  });
});
