import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "./Accordion";

const items = [
  {
    value: "materials",
    title: "Materials",
    content: "Leather upper with recycled lining.",
  },
  {
    value: "shipping",
    title: "Shipping",
    content: "Ships from the warehouse in two business days.",
  },
  {
    value: "returns",
    title: "Returns",
    content: "Return unworn items within 30 days.",
  },
];

const firstItem = items[0]!;

describe("Accordion", () => {
  it("renders accordion triggers", () => {
    render(<Accordion items={items} />);

    expect(screen.getByRole("button", { name: "Materials" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Shipping" })).toBeInTheDocument();
  });

  it("opens an uncontrolled item from its trigger", () => {
    render(<Accordion items={items} />);

    fireEvent.click(screen.getByRole("button", { name: "Materials" }));

    expect(screen.getByText("Leather upper with recycled lining.")).toBeVisible();
  });

  it("supports a default open item", () => {
    render(<Accordion items={items} defaultValue={["shipping"]} />);

    expect(screen.getByText("Ships from the warehouse in two business days.")).toBeVisible();
  });

  it("calls onValueChange with the next value", () => {
    const onValueChange = vi.fn();

    render(<Accordion items={items} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Returns" }));

    expect(onValueChange).toHaveBeenCalledWith(["returns"]);
  });

  it("supports multiple open items", () => {
    render(<Accordion items={items} multiple />);

    fireEvent.click(screen.getByRole("button", { name: "Materials" }));
    fireEvent.click(screen.getByRole("button", { name: "Shipping" }));

    expect(screen.getByText("Leather upper with recycled lining.")).toBeVisible();
    expect(screen.getByText("Ships from the warehouse in two business days.")).toBeVisible();
  });

  it("passes disabled items through to the trigger", () => {
    render(<Accordion items={[{ ...firstItem, disabled: true }]} />);

    expect(screen.getByRole("button", { name: "Materials" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});
