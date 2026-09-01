import type { Meta, StoryObj } from "@storybook/react";
import { Menubar } from "./Menubar";

const meta = {
  title: "Navigation/Menubar",
  component: Menubar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    menus: [
      {
        label: "Products",
        items: [
          { label: "New product", description: "Create a catalog item." },
          { label: "Import products", description: "Upload sizes, stock, and pricing." },
          { type: "separator" },
          { type: "link", href: "/products", label: "View all products" },
        ],
      },
      {
        label: "Orders",
        items: [
          { label: "Review queue" },
          { label: "Print packing slips" },
          { label: "Cancel order", destructive: true },
        ],
      },
      {
        label: "Reports",
        items: [{ label: "Sales dashboard" }, { label: "Inventory forecast", disabled: true }],
      },
    ],
  },
  argTypes: {
    align: {
      control: "inline-radio",
      options: ["start", "center", "end"],
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
    },
  },
} satisfies Meta<typeof Menubar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithArrow: Story = {
  args: {
    showArrow: true,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
