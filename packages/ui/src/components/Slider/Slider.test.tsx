import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders a labelled slider with formatted value", () => {
    render(<Slider defaultValue={40} label="Discount" valueSuffix="%" />);

    expect(screen.getByText("Discount")).toBeInTheDocument();
    expect(screen.getByText("40%")).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Discount" })).toHaveAttribute("aria-valuenow", "40");
  });

  it("renders a range slider with thumb labels", () => {
    render(
      <Slider
        defaultValue={[20, 80]}
        label="Price range"
        thumbLabels={["Minimum price", "Maximum price"]}
      />,
    );

    expect(screen.getByRole("slider", { name: "Minimum price" })).toHaveAttribute(
      "aria-valuenow",
      "20",
    );
    expect(screen.getByRole("slider", { name: "Maximum price" })).toHaveAttribute(
      "aria-valuenow",
      "80",
    );
    expect(screen.getByText("20 - 80")).toBeInTheDocument();
  });

  it("calls onValueChange from keyboard interaction", () => {
    const onValueChange = vi.fn();

    render(<Slider defaultValue={40} label="Zoom" onValueChange={onValueChange} />);

    fireEvent.keyDown(screen.getByRole("slider", { name: "Zoom" }), { key: "ArrowRight" });

    expect(onValueChange).toHaveBeenCalled();
  });

  it("passes disabled and invalid state", () => {
    render(<Slider defaultValue={10} disabled invalid label="Inventory threshold" />);

    const slider = screen.getByRole("slider", { name: "Inventory threshold" });

    expect(slider).toBeDisabled();
    expect(slider.closest("[data-invalid]")).toBeInTheDocument();
  });
});
