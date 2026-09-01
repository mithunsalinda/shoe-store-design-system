import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders text content", () => {
    render(<Badge intent="success">In stock</Badge>);

    expect(screen.getByText("In stock")).toBeInTheDocument();
  });

  it("formats counts above the max value", () => {
    render(<Badge count={120} max={99} ariaLabel="120 notifications" />);

    expect(screen.getByText("99+")).toBeInTheDocument();
    expect(screen.getByLabelText("120 notifications")).toBeInTheDocument();
  });

  it("hides zero counts by default", () => {
    const { container } = render(<Badge count={0} />);

    expect(container.firstChild).toBeNull();
  });

  it("can show zero counts", () => {
    render(<Badge count={0} showZero />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("supports dot-only status badges with an accessible label", () => {
    render(<Badge dot ariaLabel="Online" />);

    expect(screen.getByLabelText("Online")).toBeInTheDocument();
  });
});
