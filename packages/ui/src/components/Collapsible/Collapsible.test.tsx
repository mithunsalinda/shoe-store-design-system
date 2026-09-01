import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Collapsible } from "./Collapsible";

describe("Collapsible", () => {
  it("renders a disclosure trigger", () => {
    render(<Collapsible title="Advanced filters" content="Filter controls" />);

    expect(screen.getByRole("button", { name: "Advanced filters" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("opens uncontrolled content from the trigger", () => {
    render(<Collapsible title="Advanced filters" content="Filter controls" />);

    fireEvent.click(screen.getByRole("button", { name: "Advanced filters" }));

    expect(screen.getByText("Filter controls")).toBeVisible();
  });

  it("supports default open content", () => {
    render(<Collapsible title="Advanced filters" content="Filter controls" defaultOpen />);

    expect(screen.getByRole("button", { name: "Advanced filters" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("Filter controls")).toBeVisible();
  });

  it("calls onOpenChange when toggled", () => {
    const onOpenChange = vi.fn();

    render(
      <Collapsible
        title="Advanced filters"
        content="Filter controls"
        onOpenChange={onOpenChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Advanced filters" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("includes description in the trigger name", () => {
    render(
      <Collapsible
        title="Advanced filters"
        description="Narrow the product list"
        content="Filter controls"
      />,
    );

    expect(
      screen.getByRole("button", { name: "Advanced filters Narrow the product list" }),
    ).toBeInTheDocument();
  });

  it("passes disabled state through to the trigger", () => {
    render(<Collapsible title="Advanced filters" content="Filter controls" disabled />);

    expect(screen.getByRole("button", { name: "Advanced filters" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});
