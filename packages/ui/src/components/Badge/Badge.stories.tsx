import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "In stock",
    intent: "success",
    variant: "soft",
    size: "md",
    shape: "pill",
  },
  argTypes: {
    intent: {
      control: "inline-radio",
      options: ["neutral", "info", "success", "warning", "danger"],
    },
    shape: {
      control: "inline-radio",
      options: ["rounded", "pill"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
    },
    variant: {
      control: "inline-radio",
      options: ["soft", "solid", "outline"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Intents: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <Badge>Draft</Badge>
      <Badge intent="info">New arrival</Badge>
      <Badge intent="success">In stock</Badge>
      <Badge intent="warning">Low stock</Badge>
      <Badge intent="danger">Sold out</Badge>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <Badge intent="info" variant="soft">
        Soft
      </Badge>
      <Badge intent="info" variant="solid">
        Solid
      </Badge>
      <Badge intent="info" variant="outline">
        Outline
      </Badge>
    </div>
  ),
};

export const Counts: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <Badge count={8} ariaLabel="8 pending orders" />
      <Badge count={99} ariaLabel="99 notifications" />
      <Badge count={120} max={99} ariaLabel="120 notifications" />
      <Badge count={0} showZero ariaLabel="0 returns" />
    </div>
  ),
};

export const StatusDots: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
      <Badge dot intent="success" ariaLabel="Online" />
      <Badge dot intent="warning">
        Restock soon
      </Badge>
      <Badge dot intent="danger">
        Needs review
      </Badge>
    </div>
  ),
};
