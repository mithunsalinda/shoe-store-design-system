import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Button } from "../Button";
import { Popover } from "./Popover";

const meta: Meta<typeof Popover> = {
  title: "Overlays/Popover",
  component: Popover,
  tags: ["autodocs"],
  args: {
    trigger: <Button variant="outline">Inventory note</Button>,
    title: "Inventory note",
    description: "Live warehouse guidance for this product.",
    children: "The white leather runner has a low stock threshold in sizes 8 through 10.",
    footer: (
      <>
        <Button variant="ghost">Dismiss</Button>
        <Button>Update item</Button>
      </>
    ),
    onOpenChange: fn(),
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
  parameters: {
    docs: {
      description: {
        component:
          "Popovers show anchored, dismissible content for lightweight interactive tasks. This wrapper uses Base UI for positioning, focus, and accessibility.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: "sm",
    title: "Quick stock",
    description: "Current fulfillment view.",
    children: "12 pairs available.",
    footer: undefined,
  },
};

export const TopAligned: Story = {
  args: {
    side: "top",
    align: "start",
    trigger: <Button variant="outline">Shipping details</Button>,
    title: "Shipping details",
    description: "Carrier and packaging preferences.",
  },
};

export const HoverOpen: Story = {
  args: {
    openOnHover: true,
    delay: 120,
    trigger: <Button variant="ghost">Hover for fit notes</Button>,
    title: "Fit notes",
    description: "Helpful context without committing to a modal flow.",
    footer: undefined,
  },
};

export const InitiallyOpen: Story = {
  args: {
    defaultOpen: true,
    trigger: <Button variant="outline">Open note</Button>,
    title: "Open by default",
    description: "Useful for visual review in Storybook.",
  },
};

export const Interaction: Story = {
  args: {
    trigger: <Button variant="outline">Open popover</Button>,
    title: "Return context",
    description: "Review this before creating a return label.",
    children: "The customer selected half a size too small.",
    footer: undefined,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole("button", { name: /open popover/i }));

    const dialog = await body.findByRole("dialog", { name: /return context/i });
    await expect(dialog).toHaveTextContent(/half a size too small/i);
    await expect(args.onOpenChange).toHaveBeenCalledWith(true);
  },
};
