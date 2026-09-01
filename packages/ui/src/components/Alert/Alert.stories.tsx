import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Button } from "../Button";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    title: "Inventory synced",
    children: "Availability changes are now visible in the storefront.",
    intent: "success",
    variant: "soft",
    onDismiss: fn(),
  },
  argTypes: {
    intent: {
      control: "inline-radio",
      options: ["neutral", "info", "success", "warning", "danger"],
    },
    variant: {
      control: "inline-radio",
      options: ["soft", "outline"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Intents: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "12px", maxWidth: "720px" }}>
      <Alert intent="neutral" title="Draft saved">
        This product draft has not been published.
      </Alert>
      <Alert intent="info" title="New channel available">
        You can now sync this shoe to the wholesale catalog.
      </Alert>
      <Alert intent="success" title="Inventory synced">
        Availability changes are now visible in the storefront.
      </Alert>
      <Alert intent="warning" title="Low stock">
        Some sizes are below the reorder threshold.
      </Alert>
      <Alert intent="danger" title="Upload failed">
        Replace the product image and try again.
      </Alert>
    </div>
  ),
};

export const WithAction: Story = {
  args: {
    title: "Low stock",
    children: "Size 9 is below the reorder threshold.",
    intent: "warning",
    action: (
      <Button size="sm" variant="outline">
        Reorder
      </Button>
    ),
  },
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
    title: "Draft archived",
    children: "You can restore it from product history.",
    intent: "neutral",
  },
};

export const Interaction: Story = {
  args: {
    dismissible: true,
    title: "Draft archived",
    children: "You can restore it from product history.",
    intent: "neutral",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /dismiss alert/i }));

    await expect(args.onDismiss).toHaveBeenCalled();
  },
};
