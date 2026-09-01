import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { SidePanel } from "./SidePanel";

const meta = {
  title: "Layout/SidePanel",
  component: SidePanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "Product details",
    description: "Inspect inventory, pricing, and publishing state.",
    children: (
      <div style={{ display: "grid", gap: "var(--ds-spacing-md)" }}>
        <strong>Apex Runner 3</strong>
        <span style={{ color: "var(--ds-color-text-muted)" }}>SKU APX-300-BLK-10</span>
        <span>Inventory: 48 units</span>
        <span>Status: Published</span>
      </div>
    ),
    footer: (
      <>
        <Button variant="secondary">Preview</Button>
        <Button>Edit product</Button>
      </>
    ),
  },
  argTypes: {
    position: {
      control: "inline-radio",
      options: ["left", "right"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "inline-radio",
      options: ["plain", "bordered", "elevated"],
    },
  },
} satisfies Meta<typeof SidePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Left: Story = {
  args: {
    position: "left",
    title: "Filters",
    description: "Narrow the product catalog.",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
  },
};

export const Sticky: Story = {
  args: {
    sticky: true,
  },
};
