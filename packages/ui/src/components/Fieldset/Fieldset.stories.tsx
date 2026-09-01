import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../Checkbox";
import { RadioGroup } from "../RadioGroup";
import { Fieldset } from "./Fieldset";
import type { FieldsetProps } from "./Fieldset.types";

const meta = {
  title: "Forms/Fieldset",
  component: Fieldset,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    description: "Choose the updates this customer should receive.",
    legend: "Notification preferences",
    variant: "outlined",
  },
  argTypes: {
    density: {
      control: "inline-radio",
      options: ["compact", "comfortable"],
    },
    variant: {
      control: "inline-radio",
      options: ["plain", "outlined", "filled"],
    },
  },
} satisfies Meta<typeof Fieldset>;

export default meta;

type Story = StoryObj<typeof meta>;

function renderPreferenceFieldset(args: FieldsetProps) {
  const childDisabled = Boolean(args.disabled);

  return (
    <Fieldset {...args}>
      <Checkbox label="New arrivals" disabled={childDisabled} />
      <Checkbox label="Sale alerts" disabled={childDisabled} />
      <Checkbox label="Back-in-stock updates" disabled={childDisabled} />
    </Fieldset>
  );
}

export const Default: Story = {
  render: renderPreferenceFieldset,
};

export const WithRadioGroup: Story = {
  args: {
    description: "Used to prioritize order routing and warehouse availability.",
    legend: "Fulfillment speed",
  },
  render: (args) => (
    <Fieldset {...args}>
      <RadioGroup
        defaultValue="standard"
        label="Speed"
        options={[
          { label: "Standard", value: "standard" },
          { label: "Express", value: "express" },
          { label: "Priority", value: "priority" },
        ]}
      />
    </Fieldset>
  ),
};

export const Invalid: Story = {
  args: {
    error: "Select at least one notification preference.",
    required: true,
  },
  render: renderPreferenceFieldset,
};

export const Filled: Story = {
  args: {
    variant: "filled",
  },
  render: renderPreferenceFieldset,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: renderPreferenceFieldset,
};
