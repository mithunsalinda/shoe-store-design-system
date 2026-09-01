import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders a hidden placeholder", () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton")).toHaveAttribute("aria-hidden", "true");
  });

  it("supports custom dimensions", () => {
    render(<Skeleton data-testid="skeleton" width={120} height="2rem" />);

    expect(screen.getByTestId("skeleton")).toHaveStyle({
      width: "120px",
      height: "2rem",
    });
  });

  it("renders multiple text lines", () => {
    render(<Skeleton data-testid="skeleton" shape="text" lines={3} />);

    expect(screen.getByTestId("skeleton").children).toHaveLength(3);
  });
});
