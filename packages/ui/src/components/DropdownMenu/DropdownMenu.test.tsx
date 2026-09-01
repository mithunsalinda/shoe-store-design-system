import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DropdownMenu } from "./DropdownMenu";

const trigger = "Actions";

describe("DropdownMenu", () => {
  it("opens a menu from the trigger", () => {
    render(
      <DropdownMenu
        trigger={trigger}
        items={[{ label: "Edit product" }, { label: "Duplicate" }]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Actions" }));

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Edit product" })).toBeInTheDocument();
  });

  it("calls item onSelect", () => {
    const onSelect = vi.fn();

    render(<DropdownMenu trigger={trigger} items={[{ label: "Archive", onSelect }]} />);
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Archive" }));

    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("renders link items", () => {
    render(
      <DropdownMenu
        trigger={trigger}
        items={[{ type: "link", label: "View storefront", href: "/products/white-court" }]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Actions" }));

    expect(screen.getByRole("menuitem", { name: "View storefront" })).toHaveAttribute(
      "href",
      "/products/white-court",
    );
  });

  it("passes disabled state through to items", () => {
    render(<DropdownMenu trigger={trigger} items={[{ label: "Delete", disabled: true }]} />);

    fireEvent.click(screen.getByRole("button", { name: "Actions" }));

    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("supports controlled open state", () => {
    render(<DropdownMenu trigger={trigger} items={[{ label: "Edit" }]} open />);

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("calls onOpenChange when opened", () => {
    const onOpenChange = vi.fn();

    render(
      <DropdownMenu trigger={trigger} items={[{ label: "Edit" }]} onOpenChange={onOpenChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
