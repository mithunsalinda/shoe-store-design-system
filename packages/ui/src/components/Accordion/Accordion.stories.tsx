import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const productItems = [
  {
    value: "materials",
    title: "Materials",
    content: "Full-grain leather upper, cushioned footbed, and a recycled textile lining.",
  },
  {
    value: "fit",
    title: "Fit and sizing",
    content: "Runs true to size. Half sizes are available from 6.5 through 12.5.",
  },
  {
    value: "shipping",
    title: "Shipping",
    content: "Warehouse orders placed before 2 PM ship within two business days.",
  },
  {
    value: "returns",
    title: "Returns",
    content: "Unworn items can be returned within 30 days with original packaging.",
  },
];

const meta: Meta<typeof Accordion> = {
  title: "Disclosure/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    items: productItems,
    defaultValue: ["materials"],
    multiple: false,
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

export const Multiple: Story = {
  args: {
    defaultValue: ["materials", "shipping"],
    multiple: true,
  },
};

export const Plain: Story = {
  args: {
    defaultValue: ["fit"],
    variant: "plain",
  },
};

export const Compact: Story = {
  args: {
    defaultValue: ["shipping"],
    size: "sm",
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: productItems.map((item) =>
      item.value === "returns" ? { ...item, disabled: true } : item,
    ),
  },
};
