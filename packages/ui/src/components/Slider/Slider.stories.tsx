import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Controls/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: {
    defaultValue: 35,
    label: "Discount",
    max: 100,
    min: 0,
    showValue: true,
    size: "md",
    step: 1,
    valueSuffix: "%",
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    label: "Price range",
    max: 200,
    min: 0,
    step: 5,
    thumbLabels: ["Minimum price", "Maximum price"],
    valueSuffix: " USD",
  },
};

export const WithDescription: Story = {
  args: {
    defaultValue: 12,
    description: "Controls the reorder threshold used by inventory alerts.",
    label: "Reorder threshold",
    max: 50,
    min: 0,
    valueSuffix: " pairs",
  },
};

export const Vertical: Story = {
  args: {
    defaultValue: 65,
    label: "Priority",
    orientation: "vertical",
    valueSuffix: "%",
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: 95,
    invalid: true,
    label: "Margin target",
    valueSuffix: "%",
  },
};
