import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Popover } from "./Popover";

describe("Popover", () => {
  it("renders an accessible popover when initially open", () => {
    render(
      <Popover defaultOpen trigger="Open details" title="Inventory details">
        Size 9 is ready to ship.
      </Popover>,
    );

    expect(screen.getByRole("dialog", { name: "Inventory details" })).toHaveTextContent(
      "Size 9 is ready to ship.",
    );
  });

  it("opens from the trigger", async () => {
    const user = userEvent.setup();

    render(<Popover trigger="Open details" title="Inventory details" />);

    await user.click(screen.getByRole("button", { name: "Open details" }));

    expect(await screen.findByRole("dialog", { name: "Inventory details" })).toBeInTheDocument();
  });

  it("calls onOpenChange when opened", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Popover trigger="Open details" title="Inventory details" onOpenChange={onOpenChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Open details" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("closes from the close button", async () => {
    const user = userEvent.setup();

    render(<Popover defaultOpen trigger="Open details" title="Inventory details" />);

    await user.click(screen.getByRole("button", { name: "Close popover" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Inventory details" })).not.toBeInTheDocument();
    });
  });

  it("can hide the close button", () => {
    render(
      <Popover
        defaultOpen
        trigger="Open details"
        title="Inventory details"
        showCloseButton={false}
      />,
    );

    expect(screen.queryByRole("button", { name: "Close popover" })).not.toBeInTheDocument();
  });
});
