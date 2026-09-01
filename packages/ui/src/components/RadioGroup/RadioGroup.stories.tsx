import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { RadioGroup } from "./RadioGroup";

const sizeOptions = [
  {
    value: "us-8",
    label: "US 8",
    description: "Best for narrow everyday sneakers.",
  },
  {
    value: "us-9",
    label: "US 9",
    description: "Most common fit for this style.",
  },
  {
    value: "us-10",
    label: "US 10",
    description: "Roomier fit with thicker socks.",
  },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Forms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    label: "Choose a size",
    name: "shoe-size",
    options: sizeOptions,
    onValueChange: fn(),
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Radio groups let users choose one option from a related set. This component wraps Base UI primitives behind a design-system API.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    defaultValue: "us-9",
  },
};

export const Horizontal: Story = {
  args: {
    defaultValue: "us-8",
    orientation: "horizontal",
    options: [
      { value: "black", label: "Black" },
      { value: "white", label: "White" },
      { value: "tan", label: "Tan" },
    ],
    label: "Color",
  },
};

export const WithDisabledOption: Story = {
  args: {
    defaultValue: "us-9",
    options: [...sizeOptions, { value: "us-11", label: "US 11", disabled: true }],
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    required: true,
    description: "Select one size before adding this shoe to cart.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "us-9",
  },
};

export const Interaction: Story = {
  args: {
    label: "Fit preference",
    options: [
      { value: "snug", label: "Snug" },
      { value: "regular", label: "Regular" },
      { value: "relaxed", label: "Relaxed" },
    ],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const relaxed = canvas.getByRole("radio", { name: /relaxed/i });

    await userEvent.click(relaxed);

    await expect(relaxed).toBeChecked();
    await expect(args.onValueChange).toHaveBeenCalledWith("relaxed");
  },
};
