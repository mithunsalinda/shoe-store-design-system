import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";

const items = [
  { value: "overview", label: "Overview", content: "Workspace overview" },
  { value: "orders", label: "Orders", content: "Recent orders" },
  { value: "billing", label: "Billing", content: "Billing settings", disabled: true },
];

describe("Tabs", () => {
  it("renders an accessible tablist", () => {
    render(<Tabs ariaLabel="Workspace sections" defaultValue="overview" items={items} />);

    expect(screen.getByRole("tablist", { name: "Workspace sections" })).toBeInTheDocument();
  });

  it("renders the default active panel", () => {
    render(<Tabs ariaLabel="Workspace sections" defaultValue="overview" items={items} />);

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Workspace overview");
  });

  it("calls onValueChange when a tab is selected", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Tabs
        ariaLabel="Workspace sections"
        defaultValue="overview"
        items={items}
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole("tab", { name: "Orders" }));

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Recent orders");
    expect(onValueChange).toHaveBeenCalledWith("orders");
  });

  it("does not activate disabled tabs", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Tabs
        ariaLabel="Workspace sections"
        defaultValue="overview"
        items={items}
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole("tab", { name: "Billing" }));

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Workspace overview");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("keeps inactive panels mounted when requested", () => {
    render(
      <Tabs ariaLabel="Workspace sections" defaultValue="overview" items={items} keepMounted />,
    );

    expect(screen.getByText("Recent orders")).toBeInTheDocument();
  });
});
