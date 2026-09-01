import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Layout/Separator",
  component: Separator,
  tags: ["autodocs"],
  args: {
    decorative: false,
    orientation: "horizontal",
    spacing: "md",
    variant: "subtle",
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    spacing: {
      control: "inline-radio",
      options: ["none", "xs", "sm", "md", "lg"],
    },
    variant: {
      control: "inline-radio",
      options: ["subtle", "strong"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <p style={{ margin: 0, color: "var(--ds-color-text)" }}>Product details</p>
      <Separator {...args} />
      <p style={{ margin: 0, color: "var(--ds-color-text-muted)" }}>
        Available in full and half sizes with standard fulfillment windows.
      </p>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    spacing: "sm",
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", height: 40 }}>
      <Button size="sm" variant="ghost">
        Edit
      </Button>
      <Separator {...args} />
      <Button size="sm" variant="ghost">
        Duplicate
      </Button>
      <Separator {...args} />
      <Button size="sm" variant="ghost">
        Archive
      </Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "16px", maxWidth: 420 }}>
      <div>
        <p style={{ margin: 0, color: "var(--ds-color-text-muted)" }}>Subtle</p>
        <Separator spacing="sm" />
      </div>
      <div>
        <p style={{ margin: 0, color: "var(--ds-color-text-muted)" }}>Strong</p>
        <Separator spacing="sm" variant="strong" />
      </div>
    </div>
  ),
};
