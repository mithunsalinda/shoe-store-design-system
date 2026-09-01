import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("renders an accessible dialog when initially open", () => {
    render(
      <Dialog defaultOpen title="Order note" description="Review the customer request.">
        Include extra laces.
      </Dialog>,
    );

    expect(screen.getByRole("dialog", { name: "Order note" })).toHaveTextContent(
      "Include extra laces.",
    );
  });

  it("opens from the trigger", async () => {
    const user = userEvent.setup();

    render(<Dialog trigger="Open note" title="Order note" />);
    await user.click(screen.getByRole("button", { name: "Open note" }));

    expect(await screen.findByRole("dialog", { name: "Order note" })).toBeInTheDocument();
  });

  it("calls onOpenChange when opened", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(<Dialog trigger="Open note" title="Order note" onOpenChange={onOpenChange} />);
    await user.click(screen.getByRole("button", { name: "Open note" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("closes from the close button", async () => {
    const user = userEvent.setup();

    render(<Dialog defaultOpen title="Order note" />);
    await user.click(screen.getByRole("button", { name: "Close dialog" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Order note" })).not.toBeInTheDocument();
    });
  });

  it("can hide the close button", () => {
    render(<Dialog defaultOpen title="Required review" showCloseButton={false} />);

    expect(screen.queryByRole("button", { name: "Close dialog" })).not.toBeInTheDocument();
  });
});
