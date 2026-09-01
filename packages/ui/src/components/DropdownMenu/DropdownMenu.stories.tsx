import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Navigation/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  args: {
    trigger: "Product actions",
    items: [
      { label: "Edit product", description: "Change product details and images." },
      { label: "Duplicate", description: "Create a copy with the same variants." },
      { type: "link", label: "View storefront", href: "/products/white-court" },
      { type: "separator" },
      { label: "Archive product", destructive: true },
    ],
    align: "end",
    side: "bottom",
    size: "md",
  },
  argTypes: {
    align: {
      control: "inline-radio",
      options: ["start", "center", "end"],
    },
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
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

export const Compact: Story = {
  args: {
    trigger: "More",
    size: "sm",
    items: [
      { label: "Mark in stock" },
      { label: "Export row" },
      { type: "separator" },
      { label: "Remove from view", destructive: true },
    ],
  },
};

export const InitiallyOpen: Story = {
  args: {
    defaultOpen: true,
  },
};

export const DisabledTrigger: Story = {
  args: {
    disabled: true,
    trigger: "Product actions",
  },
};
