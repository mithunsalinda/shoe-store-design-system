import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Button } from "../Button";
import { Dialog } from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Overlays/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    trigger: "View order note",
    title: "Order note",
    description: "Review the customer request before fulfillment.",
    children: "Please include an extra pair of laces and verify the box size before shipping.",
    footer: (
      <>
        <Button variant="outline">Cancel</Button>
        <Button>Save note</Button>
      </>
    ),
    onOpenChange: fn(),
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Dialogs focus attention on a blocking task or confirmation. This wrapper uses Base UI for modal behavior, focus management, and accessibility wiring.",
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
    title: "Archive item",
    description: "This shoe will be hidden from active merchandising views.",
    trigger: "Archive item",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    title: "Fulfillment details",
    description: "Review warehouse notes, shipping preferences, and internal handling guidance.",
    trigger: "Open details",
    children: (
      <div style={{ display: "grid", gap: "12px" }}>
        <p style={{ margin: 0 }}>
          Warehouse A has the complete size run. Send the order there if split shipping would delay
          delivery.
        </p>
        <p style={{ margin: 0 }}>Customer prefers recyclable packaging and no printed receipt.</p>
      </div>
    ),
  },
};

export const WithoutCloseButton: Story = {
  args: {
    showCloseButton: false,
    title: "Required review",
    description: "Use the footer actions to continue.",
  },
};

export const InitiallyOpen: Story = {
  args: {
    defaultOpen: true,
    trigger: undefined,
    title: "Welcome back",
    description: "Storybook can render an initially open dialog for visual review.",
  },
};

export const Interaction: Story = {
  args: {
    trigger: "Open dialog",
    title: "Return request",
    description: "Check the reason before approving.",
    children: "The customer reported a sizing issue after one indoor try-on.",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /open dialog/i }));

    const dialog = await canvas.findByRole("dialog", { name: /return request/i });
    await expect(dialog).toHaveTextContent(/sizing issue/i);
    await expect(args.onOpenChange).toHaveBeenCalledWith(true);
  },
};
