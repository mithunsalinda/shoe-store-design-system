import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../Button";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders a status alert by default", () => {
    render(<Alert title="Stock updated">The product is available again.</Alert>);

    expect(screen.getByRole("status")).toHaveTextContent("Stock updated");
    expect(screen.getByRole("status")).toHaveTextContent("The product is available again.");
  });

  it("uses alert role for danger intent", () => {
    render(<Alert intent="danger" title="Upload failed" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Upload failed");
  });

  it("allows an explicit role override", () => {
    render(
      <Alert intent="danger" role="status" title="Saved with warnings">
        Review the missing sizes.
      </Alert>,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Saved with warnings");
  });

  it("renders an action", () => {
    render(
      <Alert title="Low stock" action={<Button size="sm">Reorder</Button>}>
        Size 9 is below threshold.
      </Alert>,
    );

    expect(screen.getByRole("button", { name: "Reorder" })).toBeInTheDocument();
  });

  it("calls onDismiss when dismissed", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();

    render(<Alert dismissible onDismiss={onDismiss} title="Archived" />);

    await user.click(screen.getByRole("button", { name: "Dismiss alert" }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
