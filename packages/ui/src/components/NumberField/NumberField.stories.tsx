import type { Meta, StoryObj } from "@storybook/react";
import { NumberField } from "./NumberField";

const meta: Meta<typeof NumberField> = {
  title: "Controls/NumberField",
  component: NumberField,
  tags: ["autodocs"],
  args: {
    defaultValue: 8,
    label: "Pairs",
    max: 99,
    min: 0,
    showSteppers: true,
    size: "md",
    step: 1,
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InventoryThreshold: Story = {
  args: {
    defaultValue: 12,
    description: "Used when creating restock alerts.",
    label: "Reorder threshold",
    min: 1,
    step: 1,
  },
};

export const Currency: Story = {
  args: {
    defaultValue: 129.99,
    format: {
      currency: "USD",
      style: "currency",
    },
    label: "Unit price",
    min: 0,
    step: 0.01,
  },
};

export const WithoutSteppers: Story = {
  args: {
    defaultValue: 42,
    label: "Manual stock count",
    showSteppers: false,
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: 0,
    error: "Enter at least 1 pair.",
    label: "Order quantity",
    min: 1,
  },
};
