import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OTPField } from "./OTPField";

describe("OTPField", () => {
  it("renders labelled OTP inputs", () => {
    render(<OTPField label="Verification code" />);

    expect(screen.getByText("Verification code")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("emits value changes and completion", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();
    const handleValueComplete = vi.fn();
    render(
      <OTPField
        label="Security code"
        onValueChange={handleValueChange}
        onValueComplete={handleValueComplete}
      />,
    );

    await user.type(screen.getAllByRole("textbox")[0]!, "123456");

    expect(handleValueChange).toHaveBeenLastCalledWith("123456");
    expect(handleValueComplete).toHaveBeenCalledWith("123456");
  });

  it("rejects invalid characters for numeric fields", async () => {
    const user = userEvent.setup();
    const handleValueInvalid = vi.fn();
    render(<OTPField label="Numeric code" onValueInvalid={handleValueInvalid} />);

    await user.type(screen.getAllByRole("textbox")[0]!, "a");

    expect(handleValueInvalid).toHaveBeenCalledWith("a");
  });

  it("wires description and error text", () => {
    render(
      <OTPField
        description="Enter the six digit checkout code."
        error="The code has expired."
        label="Checkout code"
      />,
    );

    const group = screen.getByRole("group", { name: "Checkout code" });

    expect(group).toHaveAccessibleDescription(
      "Enter the six digit checkout code. The code has expired.",
    );
    expect(group).toHaveAttribute("aria-invalid", "true");
  });

  it("supports disabled, read only, and custom length states", () => {
    render(<OTPField disabled label="Recovery code" length={4} readOnly required />);

    const inputs = screen.getAllByRole("textbox");

    expect(screen.getByRole("group", { name: "Recovery code" })).toHaveAttribute("data-disabled");
    expect(inputs).toHaveLength(4);
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute("readonly");
      expect(input).toHaveAttribute("required");
    });
  });
});
