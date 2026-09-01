import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContextMenu } from "./ContextMenu";

describe("ContextMenu", () => {
  it("opens from a context menu event", async () => {
    render(
      <ContextMenu
        items={[
          { label: "Edit product" },
          { label: "Duplicate product", description: "Create a copy of this listing." },
        ]}
      >
        <div>Product row</div>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText("Product row"));

    expect(await screen.findByRole("menuitem", { name: "Edit product" })).toBeInTheDocument();
    expect(screen.getByText("Create a copy of this listing.")).toBeInTheDocument();
  });

  it("calls item onSelect when clicked", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    render(
      <ContextMenu items={[{ label: "Archive product", onSelect: handleSelect }]}>
        <div>Product card</div>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText("Product card"));
    await user.click(await screen.findByRole("menuitem", { name: "Archive product" }));

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it("supports link and separator items", async () => {
    render(
      <ContextMenu
        items={[
          { type: "link", href: "/products/apex", label: "Open product" },
          { type: "separator" },
          { label: "Delete product", destructive: true },
        ]}
      >
        <div>Inventory item</div>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText("Inventory item"));

    expect(await screen.findByRole("menuitem", { name: "Open product" })).toHaveAttribute(
      "href",
      "/products/apex",
    );
    expect(screen.getByRole("separator")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Delete product" })).toBeInTheDocument();
  });

  it("supports controlled open state", async () => {
    const handleOpenChange = vi.fn();
    render(
      <ContextMenu open onOpenChange={handleOpenChange} items={[{ label: "Always visible" }]}>
        <div>Controlled area</div>
      </ContextMenu>,
    );

    expect(await screen.findByRole("menuitem", { name: "Always visible" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => expect(handleOpenChange).toHaveBeenCalledWith(false));
  });
});
