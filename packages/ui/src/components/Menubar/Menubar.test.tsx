import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Menubar } from "./Menubar";

const menus = [
  {
    label: "Products",
    items: [
      { label: "New product" },
      { label: "Import products", description: "Upload a CSV catalog." },
    ],
  },
  {
    label: "Orders",
    items: [{ label: "Review queue" }],
  },
];

describe("Menubar", () => {
  it("renders a menubar with top-level menu triggers", () => {
    render(<Menubar menus={menus} />);

    expect(screen.getByRole("menubar")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Orders" })).toBeInTheDocument();
  });

  it("opens a menu from a top-level trigger", () => {
    render(<Menubar menus={menus} />);

    fireEvent.click(screen.getByRole("menuitem", { name: "Products" }));

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "New product" })).toBeInTheDocument();
  });

  it("calls item onSelect when clicked", () => {
    const onSelect = vi.fn();

    render(<Menubar menus={[{ label: "Products", items: [{ label: "Archive", onSelect }] }]} />);
    fireEvent.click(screen.getByRole("menuitem", { name: "Products" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Archive" }));

    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("renders link items and separators", () => {
    render(
      <Menubar
        menus={[
          {
            label: "Storefront",
            items: [
              { type: "link", label: "View store", href: "/store" },
              { type: "separator" },
              { label: "Settings" },
            ],
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("menuitem", { name: "Storefront" }));

    expect(screen.getByRole("menuitem", { name: "View store" })).toHaveAttribute("href", "/store");
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("supports controlled menu open state", () => {
    render(
      <Menubar menus={[{ label: "Products", items: [{ label: "New product" }], open: true }]} />,
    );

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "New product" })).toBeInTheDocument();
  });

  it("calls menu onOpenChange when opened", () => {
    const onOpenChange = vi.fn();

    render(
      <Menubar menus={[{ label: "Products", items: [{ label: "New product" }], onOpenChange }]} />,
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "Products" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
