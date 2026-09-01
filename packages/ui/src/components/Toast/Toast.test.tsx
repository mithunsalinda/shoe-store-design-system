import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ToastProvider, ToastViewport, useToast } from "./Toast";

function ToastDemo() {
  const toast = useToast();

  return (
    <button
      type="button"
      onClick={() => {
        toast.add({
          title: "Inventory saved",
          description: "The product availability was updated.",
          type: "success",
          timeout: 0,
        });
      }}
    >
      Create toast
    </button>
  );
}

describe("Toast", () => {
  it("creates a toast from the toast manager", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastDemo />
        <ToastViewport />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Create toast" }));

    expect(await screen.findByText("Inventory saved")).toBeInTheDocument();
    expect(screen.getByText("The product availability was updated.")).toBeInTheDocument();
  });

  it("closes a toast from the dismiss button", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastDemo />
        <ToastViewport />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Create toast" }));
    await screen.findByText("Inventory saved");

    const closeButton = document.querySelector<HTMLButtonElement>(
      '[aria-label="Dismiss notification"]',
    );
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton!);

    await waitFor(() => {
      expect(screen.queryByText("Inventory saved")).not.toBeInTheDocument();
    });
  });

  it("calls action props when action is clicked", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    function ActionDemo() {
      const toast = useToast();

      return (
        <button
          type="button"
          onClick={() => {
            toast.add({
              title: "Draft restored",
              actionProps: {
                children: "Undo",
                onClick: onAction,
              },
              timeout: 0,
            });
          }}
        >
          Create action toast
        </button>
      );
    }

    render(
      <ToastProvider>
        <ActionDemo />
        <ToastViewport />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Create action toast" }));
    await user.click(await screen.findByRole("button", { name: "Undo" }));

    expect(onAction).toHaveBeenCalled();
  });
});
