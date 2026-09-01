import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("renders an accessible drawer when initially open", () => {
    render(
      <Drawer defaultOpen title="Cart" description="Review selected products.">
        Two products selected.
      </Drawer>,
    );

    expect(screen.getByRole("dialog", { name: "Cart" })).toHaveTextContent(
      "Two products selected.",
    );
  });

  it("opens from the trigger", async () => {
    const user = userEvent.setup();

    render(<Drawer trigger="Open cart" title="Cart" />);
    await user.click(screen.getByRole("button", { name: "Open cart" }));

    expect(await screen.findByRole("dialog", { name: "Cart" })).toBeInTheDocument();
  });

  it("calls onOpenChange when opened", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(<Drawer trigger="Open filters" title="Filters" onOpenChange={onOpenChange} />);
    await user.click(screen.getByRole("button", { name: "Open filters" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("closes from the close button", async () => {
    const user = userEvent.setup();

    render(<Drawer defaultOpen title="Cart" />);
    await user.click(screen.getByRole("button", { name: "Close drawer" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Cart" })).not.toBeInTheDocument();
    });
  });

  it("renders footer content", () => {
    render(
      <Drawer defaultOpen title="Cart" footer={<button type="button">Checkout</button>}>
        Review items.
      </Drawer>,
    );

    expect(screen.getByRole("button", { name: "Checkout" })).toBeInTheDocument();
  });

  it("can hide the close button", () => {
    render(<Drawer defaultOpen title="Filters" showCloseButton={false} />);

    expect(screen.queryByRole("button", { name: "Close drawer" })).not.toBeInTheDocument();
  });
});
