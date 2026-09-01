import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Select } from "./Select";

const fulfillmentOptions = [
  {
    value: "pickup",
    label: "Store pickup",
    description: "Ready today at your nearest shop.",
  },
  {
    value: "standard",
    label: "Standard shipping",
    description: "Arrives in 3 to 5 business days.",
  },
  {
    value: "express",
    label: "Express shipping",
    description: "Arrives in 1 to 2 business days.",
  },
];

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Fulfillment method",
    name: "fulfillment",
    options: fulfillmentOptions,
    placeholder: "Choose delivery",
    onValueChange: fn(),
  },
  argTypes: {
    selectSize: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Select lets users choose one value from a short predefined list. Use Combobox later for long or searchable lists.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    defaultValue: "standard",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "16px", maxWidth: "352px" }}>
      <Select
        label="Small"
        selectSize="sm"
        options={fulfillmentOptions}
        placeholder="Choose delivery"
      />
      <Select
        label="Medium"
        selectSize="md"
        options={fulfillmentOptions}
        placeholder="Choose delivery"
      />
      <Select
        label="Large"
        selectSize="lg"
        options={fulfillmentOptions}
        placeholder="Choose delivery"
      />
    </div>
  ),
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      ...fulfillmentOptions,
      {
        value: "courier",
        label: "Same-day courier",
        description: "Unavailable for this address.",
        disabled: true,
      },
    ],
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    required: true,
    description: "Choose a fulfillment method before checking out.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "pickup",
  },
};

export const Interaction: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: /fulfillment method/i });

    await userEvent.click(trigger);
    await userEvent.click(await canvas.findByRole("option", { name: /express shipping/i }));

    await expect(trigger).toHaveTextContent("Express shipping");
    await expect(args.onValueChange).toHaveBeenCalledWith("express");
  },
};
