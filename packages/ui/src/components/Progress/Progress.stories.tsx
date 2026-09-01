import type { Meta, StoryObj } from "@storybook/react";
import { Meter, Progress } from "./Progress";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Uploading product images",
    description: "Files are being processed and optimized.",
    value: 64,
  },
  argTypes: {
    intent: {
      control: "inline-radio",
      options: ["neutral", "info", "success", "warning", "danger"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Indeterminate: Story = {
  args: {
    label: "Syncing catalog",
    description: "Waiting for the inventory service to respond.",
    value: null,
  },
};

export const Success: Story = {
  args: {
    intent: "success",
    label: "Import complete",
    value: 100,
  },
};

export const Warning: Story = {
  args: {
    intent: "warning",
    label: "Stock threshold",
    value: 86,
  },
};

export const MeterExample: Story = {
  render: () => (
    <Meter
      description="Capacity used across active product media."
      label="Storage used"
      value={72}
    />
  ),
};
