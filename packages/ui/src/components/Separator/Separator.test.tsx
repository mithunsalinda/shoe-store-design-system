import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("renders an accessible separator by default", () => {
    render(<Separator />);

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("sets vertical orientation", () => {
    render(<Separator orientation="vertical" />);

    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("supports decorative separators", () => {
    render(<Separator decorative data-testid="separator" />);

    expect(screen.getByTestId("separator")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("separator")).toHaveAttribute("role", "presentation");
  });

  it("passes through div attributes", () => {
    render(<Separator data-testid="separator" title="Section break" />);

    expect(screen.getByTestId("separator")).toHaveAttribute("title", "Section break");
  });
});
