import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";
import { ToggleGroup } from "./ToggleGroup";

const meta: Meta<typeof Toggle> = {
  title: "Controls/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: {
    children: "Grid view",
    defaultPressed: false,
    size: "md",
    variant: "outlined",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
    },
    variant: {
      control: "inline-radio",
      options: ["plain", "outlined"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pressed: Story = {
  args: {
    defaultPressed: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
      <Toggle size="sm">Compact</Toggle>
      <Toggle size="md">Comfortable</Toggle>
    </div>
  ),
};

export const ViewModeGroup: Story = {
  render: () => (
    <ToggleGroup
      ariaLabel="View mode"
      defaultValue={["grid"]}
      items={[
        { value: "grid", label: "Grid" },
        { value: "list", label: "List" },
        { value: "table", label: "Table" },
      ]}
    />
  ),
};

export const MultiSelectGroup: Story = {
  render: () => (
    <ToggleGroup
      ariaLabel="Product filters"
      defaultValue={["in-stock", "featured"]}
      items={[
        { value: "in-stock", label: "In stock" },
        { value: "featured", label: "Featured" },
        { value: "sale", label: "Sale" },
      ]}
      multiple
    />
  ),
};
