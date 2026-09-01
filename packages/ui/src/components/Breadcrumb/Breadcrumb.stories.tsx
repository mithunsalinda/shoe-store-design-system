import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Sneakers", href: "/products/sneakers" },
      { label: "White court sneaker" },
    ],
    separator: "/",
    size: "md",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Collapsed: Story = {
  args: {
    maxItems: 4,
    items: [
      { label: "Home", href: "/" },
      { label: "Merchandising", href: "/merchandising" },
      { label: "Seasonal assortments", href: "/merchandising/seasonal" },
      { label: "Spring launch", href: "/merchandising/seasonal/spring" },
      { label: "White court sneaker" },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    separator: ">",
    items: [
      { label: "Dashboard", href: "/" },
      { label: "Inventory", href: "/inventory" },
      { label: "Low stock" },
    ],
  },
};

export const Compact: Story = {
  args: {
    size: "sm",
    items: [
      { label: "Orders", href: "/orders" },
      { label: "Wholesale", href: "/orders/wholesale" },
      { label: "Draft invoice" },
    ],
  },
};
