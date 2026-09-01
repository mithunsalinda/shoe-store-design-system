import type { Meta, StoryObj } from "@storybook/react";
import { OTPField } from "./OTPField";

const meta = {
  title: "Forms/OTPField",
  component: OTPField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    description: "Enter the code sent to the customer's phone.",
    label: "Verification code",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    validationType: {
      control: "inline-radio",
      options: ["numeric", "alpha", "alphanumeric", "none"],
    },
  },
} satisfies Meta<typeof OTPField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FourDigitPin: Story = {
  args: {
    label: "PIN",
    length: 4,
    separatorEvery: 0,
  },
};

export const Masked: Story = {
  args: {
    defaultValue: "123456",
    mask: true,
  },
};

export const Alphanumeric: Story = {
  args: {
    description: "Used for recovery codes with letters and numbers.",
    label: "Recovery code",
    validationType: "alphanumeric",
  },
};

export const Invalid: Story = {
  args: {
    error: "That code has expired. Request a new code to continue.",
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "123456",
    disabled: true,
  },
};
