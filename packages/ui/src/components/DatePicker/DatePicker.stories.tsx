import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

const meta = {
  title: "Controls/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Delivery date",
    description: "Choose the date the order should arrive.",
    min: "2026-01-01",
    max: "2026-12-31",
  },
  argTypes: {
    datePickerSize: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: "2026-08-26",
  },
};

export const Small: Story = {
  args: {
    datePickerSize: "sm",
  },
};

export const Large: Story = {
  args: {
    datePickerSize: "lg",
  },
};

export const Invalid: Story = {
  args: {
    error: "Delivery date must be at least two business days from today.",
    invalid: true,
    value: "2026-08-26",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "2026-08-26",
  },
};
