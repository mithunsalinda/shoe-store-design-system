import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./Combobox";

const shoeTypes = [
  { value: "runner", label: "Runner", description: "Road and treadmill styles" },
  { value: "trainer", label: "Trainer", description: "Gym and cross-training shoes" },
  { value: "basketball", label: "Basketball", description: "High-grip court shoes" },
  { value: "hiking", label: "Hiking", description: "Outdoor trail support" },
  { value: "loafer", label: "Loafer", description: "Smart casual slip-on" },
  { value: "sandal", label: "Sandal", description: "Warm weather essentials" },
  { value: "boot", label: "Boot", description: "Weather-ready footwear" },
];

const meta: Meta<typeof Combobox> = {
  title: "Controls/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  args: {
    comboboxSize: "md",
    label: "Shoe type",
    options: shoeTypes,
    placeholder: "Search shoe types",
  },
  argTypes: {
    comboboxSize: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "trainer",
  },
};

export const WithDescription: Story = {
  args: {
    description: "Choose the primary category used for merchandising filters.",
    defaultValue: "runner",
  },
};

export const DisabledOption: Story = {
  args: {
    options: [
      ...shoeTypes.slice(0, 2),
      {
        value: "limited",
        label: "Limited release",
        description: "Locked for this channel",
        disabled: true,
      },
      ...shoeTypes.slice(2),
    ],
  },
};

export const Invalid: Story = {
  args: {
    error: "Select a shoe type before publishing.",
  },
};
