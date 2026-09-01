import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Collapsible } from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Disclosure/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  args: {
    title: "Advanced filters",
    description: "Narrow the product list by stock, channel, and size.",
    content: (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <Badge>In stock</Badge>
        <Badge>Low stock</Badge>
        <Badge>Wholesale</Badge>
        <Badge>Size 9</Badge>
      </div>
    ),
    defaultOpen: true,
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

export const Plain: Story = {
  args: {
    defaultOpen: false,
    description: undefined,
    title: "Shipment details",
    content: "Carrier, service level, and warehouse routing are available after order creation.",
    variant: "plain",
  },
};

export const Compact: Story = {
  args: {
    defaultOpen: true,
    size: "sm",
    title: "Bulk actions",
    description: "Apply changes to selected products.",
    content: (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <Button size="sm" variant="outline">
          Mark active
        </Button>
        <Button size="sm" variant="outline">
          Export
        </Button>
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultOpen: false,
    title: "Archived filters",
    description: "Unavailable for this saved view.",
    content: "This content cannot be opened while disabled.",
  },
};
