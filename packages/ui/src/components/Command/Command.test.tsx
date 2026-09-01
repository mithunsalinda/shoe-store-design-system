import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Command, CommandDialog } from "./Command";

const groups = [
  {
    heading: "Products",
    actions: [
      {
        id: "new-product",
        label: "New product",
        description: "Create a catalog item.",
        shortcut: "N",
      },
      {
        id: "import-products",
        label: "Import products",
        keywords: ["csv", "catalog"],
      },
    ],
  },
  {
    heading: "Orders",
    actions: [{ id: "review-orders", label: "Review orders", disabled: true }],
  },
];

describe("Command", () => {
  it("renders grouped command actions", () => {
    render(<Command groups={groups} />);

    expect(screen.getByRole("combobox", { name: "Command menu" })).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: "Search commands" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /New product/ })).toBeInTheDocument();
  });

  it("filters actions by label and keywords", () => {
    render(<Command groups={groups} />);

    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "csv" } });

    expect(screen.getByRole("option", { name: "Import products" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /New product/ })).not.toBeInTheDocument();
  });

  it("shows an empty message when no actions match", () => {
    render(<Command groups={groups} emptyMessage="Nothing matched." />);

    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "warehouse" } });

    expect(screen.getByRole("status")).toHaveTextContent("Nothing matched.");
  });

  it("selects the active action with Enter", () => {
    const onSelect = vi.fn();

    render(
      <Command groups={[{ actions: [{ id: "new-product", label: "New product", onSelect }] }]} />,
    );
    fireEvent.keyDown(screen.getByRole("searchbox"), { key: "Enter" });

    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("moves active selection with arrow keys", () => {
    const onActionSelect = vi.fn();

    render(<Command groups={groups} onActionSelect={onActionSelect} />);
    fireEvent.keyDown(screen.getByRole("searchbox"), { key: "ArrowDown" });
    fireEvent.keyDown(screen.getByRole("searchbox"), { key: "Enter" });

    expect(onActionSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "import-products" }));
  });

  it("does not select disabled actions", () => {
    const onActionSelect = vi.fn();

    render(<Command groups={groups} onActionSelect={onActionSelect} />);
    fireEvent.click(screen.getByRole("option", { name: "Review orders" }));

    expect(onActionSelect).not.toHaveBeenCalled();
    expect(screen.getByRole("option", { name: "Review orders" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});

describe("CommandDialog", () => {
  it("renders command content inside a dialog", () => {
    render(<CommandDialog groups={groups} title="Search" open />);

    expect(screen.getByRole("dialog", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });
});
