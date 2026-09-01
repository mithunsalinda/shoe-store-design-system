import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tooltip, TooltipProvider } from "./Tooltip";

describe("Tooltip", () => {
  it("renders the tooltip when initially open", () => {
    render(
      <Tooltip defaultOpen content="View live shipping updates.">
        Track order
      </Tooltip>,
    );

    expect(screen.getByRole("tooltip")).toHaveTextContent("View live shipping updates.");
  });

  it("opens when the trigger is hovered", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider delay={0}>
        <Tooltip content="View live shipping updates.">Track order</Tooltip>
      </TooltipProvider>,
    );

    await user.hover(screen.getByRole("button", { name: "Track order" }));

    expect(await screen.findByRole("tooltip")).toHaveTextContent("View live shipping updates.");
  });

  it("calls onOpenChange when opened", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <TooltipProvider delay={0}>
        <Tooltip content="Helpful hint" onOpenChange={onOpenChange}>
          Help
        </Tooltip>
      </TooltipProvider>,
    );

    await user.hover(screen.getByRole("button", { name: "Help" }));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  it("uses ariaLabel for icon-only triggers", () => {
    render(
      <Tooltip ariaLabel="Size guide" content="Compare measurements.">
        <span aria-hidden="true">i</span>
      </Tooltip>,
    );

    expect(screen.getByRole("button", { name: "Size guide" })).toBeInTheDocument();
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider delay={0}>
        <Tooltip disabled content="Hidden hint">
          Help
        </Tooltip>
      </TooltipProvider>,
    );

    await user.hover(screen.getByRole("button", { name: "Help" }));

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
