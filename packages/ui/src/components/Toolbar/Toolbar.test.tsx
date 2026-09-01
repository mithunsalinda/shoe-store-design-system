import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
} from "./Toolbar";

describe("Toolbar", () => {
  it("renders a labelled toolbar", () => {
    render(
      <Toolbar ariaLabel="Editor">
        <ToolbarButton>Bold</ToolbarButton>
      </Toolbar>,
    );

    expect(screen.getByRole("toolbar", { name: "Editor" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
  });

  it("calls button handlers", () => {
    const onClick = vi.fn();

    render(
      <Toolbar ariaLabel="Editor">
        <ToolbarButton onClick={onClick}>Save</ToolbarButton>
      </Toolbar>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports links, inputs, groups, and separators", () => {
    render(
      <Toolbar ariaLabel="Product table">
        <ToolbarGroup>
          <ToolbarLink href="/products">Products</ToolbarLink>
          <ToolbarSeparator />
          <ToolbarInput aria-label="Search products" defaultValue="Runner" />
        </ToolbarGroup>
      </Toolbar>,
    );

    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/products");
    expect(screen.getByRole("separator")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Search products" })).toHaveValue("Runner");
  });

  it("passes disabled state to toolbar controls", () => {
    render(
      <Toolbar ariaLabel="Disabled tools" disabled>
        <ToolbarButton>Archive</ToolbarButton>
      </Toolbar>,
    );

    expect(screen.getByRole("toolbar", { name: "Disabled tools" })).toHaveAttribute(
      "data-disabled",
    );
    expect(screen.getByRole("button", { name: "Archive" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});
