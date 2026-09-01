import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Command, CommandDialog } from "./Command";

const commandGroups = [
  {
    heading: "Products",
    actions: [
      {
        id: "new-product",
        label: "New product",
        description: "Create a catalog item with pricing and variants.",
        shortcut: "N",
      },
      {
        id: "import-products",
        label: "Import products",
        description: "Upload a CSV with sizes, stock, and SKU data.",
        keywords: ["csv", "catalog", "bulk"],
      },
      {
        id: "feature-product",
        label: "Feature product",
        description: "Promote an item in storefront navigation.",
      },
    ],
  },
  {
    heading: "Orders",
    actions: [
      { id: "review-orders", label: "Review orders", description: "Open fulfillment queue." },
      { id: "print-labels", label: "Print labels", shortcut: "P" },
      { id: "refund", label: "Issue refund", disabled: true },
    ],
  },
];

const meta = {
  title: "Overlays/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    groups: commandGroups,
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
    },
  },
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filtered: Story = {
  args: {
    defaultQuery: "csv",
  },
};

export const Empty: Story = {
  args: {
    defaultQuery: "warehouse",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const InDialog: Story = {
  render: (args) => (
    <CommandDialog
      {...args}
      defaultOpen
      title="Command menu"
      description="Search actions across catalog, orders, and storefront tools."
      trigger={<Button>Open command menu</Button>}
    />
  ),
};
