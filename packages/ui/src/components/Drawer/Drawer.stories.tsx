import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Drawer } from "./Drawer";

const footer = (
  <>
    <Button variant="secondary">Continue shopping</Button>
    <Button>Checkout</Button>
  </>
);

const meta = {
  title: "Overlays/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "Cart",
    description: "Review selected products before checkout.",
    trigger: "Open drawer",
    children: (
      <div style={{ display: "grid", gap: "var(--ds-spacing-md)" }}>
        <strong>Apex Runner 3</strong>
        <span style={{ color: "var(--ds-color-text-muted)" }}>
          Size 10, Black / White, quantity 1
        </span>
        <strong>Court Classic</strong>
        <span style={{ color: "var(--ds-color-text-muted)" }}>Size 9, Gum sole, quantity 1</span>
      </div>
    ),
    footer,
  },
  argTypes: {
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "full"],
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: {
    defaultOpen: true,
  },
};

export const Left: Story = {
  args: {
    side: "left",
    title: "Filters",
    description: "Refine the product grid.",
    footer: <Button>Apply filters</Button>,
  },
};

export const Bottom: Story = {
  args: {
    side: "bottom",
    title: "Size guide",
    description: "Compare shoe sizing before adding to cart.",
    footer: undefined,
  },
};

export const Full: Story = {
  args: {
    size: "full",
    title: "Mobile navigation",
    description: "Browse storefront sections.",
    footer: undefined,
  },
};
