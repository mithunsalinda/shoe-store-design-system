import type { Meta, StoryObj } from "@storybook/react";
import { NavigationMenu } from "./NavigationMenu";

const meta = {
  title: "Navigation/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items: [
      {
        type: "section",
        label: "Shop",
        value: "shop",
        featured: {
          eyebrow: "New season",
          label: "Apex Runner 3",
          href: "/products/apex-runner-3",
          description: "Responsive cushioning for everyday miles.",
        },
        links: [
          { label: "Running", href: "/running", description: "Road, race, and trail shoes." },
          { label: "Training", href: "/training", description: "Stable support for gym days." },
          { label: "Lifestyle", href: "/lifestyle", description: "Clean profiles for daily wear." },
        ],
      },
      {
        type: "section",
        label: "Collections",
        value: "collections",
        featured: {
          eyebrow: "Featured",
          label: "Waterproof trail",
          href: "/collections/waterproof-trail",
          description: "Grip and protection for wet routes.",
        },
        links: [
          { label: "Court classics", href: "/collections/court-classics" },
          { label: "Marathon edit", href: "/collections/marathon-edit" },
          { label: "Recovery slides", href: "/collections/recovery-slides" },
        ],
      },
      { label: "Sale", href: "/sale", active: true },
      { label: "Stores", href: "/stores" },
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
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
    },
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: {
    value: "shop",
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
    side: "right",
    align: "start",
    value: "collections",
  },
};

export const WithoutArrow: Story = {
  args: {
    showArrow: false,
  },
};
