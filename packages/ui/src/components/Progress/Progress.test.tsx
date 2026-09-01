import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Meter, Progress } from "./Progress";

describe("Progress", () => {
  it("renders an accessible progressbar with a label and value", () => {
    render(<Progress label="Uploading" value={40} />);

    const progress = screen.getByRole("progressbar", { name: "Uploading" });

    expect(progress).toHaveAttribute("aria-valuenow", "40");
    expect(screen.getByText("40%")).toBeInTheDocument();
  });

  it("supports indeterminate progress", () => {
    render(<Progress label="Syncing" value={null} />);

    const progress = screen.getByRole("progressbar", { name: "Syncing" });

    expect(progress).not.toHaveAttribute("aria-valuenow");
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("supports custom ranges and value labels", () => {
    render(<Progress label="Import" max={200} min={100} value={150} valueLabel="Half done" />);

    expect(screen.getByRole("progressbar", { name: "Import" })).toHaveAttribute(
      "aria-valuenow",
      "150",
    );
    expect(screen.getByText("Half done")).toBeInTheDocument();
  });
});

describe("Meter", () => {
  it("renders an accessible meter with a label and value", () => {
    render(<Meter label="Storage" value={72} />);

    const meter = screen.getByRole("meter", { name: "Storage" });

    expect(meter).toHaveAttribute("aria-valuenow", "72");
    expect(screen.getByText("72%")).toBeInTheDocument();
  });

  it("supports custom aria value text", () => {
    render(
      <Meter
        getAriaValueText={(_formattedValue, value) => `${value} pairs available`}
        label="Inventory"
        max={80}
        value={32}
      />,
    );

    expect(screen.getByRole("meter", { name: "Inventory" })).toHaveAttribute(
      "aria-valuetext",
      "32 pairs available",
    );
  });
});
