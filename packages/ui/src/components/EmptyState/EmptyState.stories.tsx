import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "No products found",
    description: "Try adjusting filters or create a new catalog item.",
    action: <Button>Add product</Button>,
    secondaryAction: <Button variant="secondary">Import CSV</Button>,
  },
  argTypes: {
    align: {
      control: "inline-radio",
      options: ["start", "center"],
    },
    as: {
      control: "inline-radio",
      options: ["section", "div"],
    },
    density: {
      control: "inline-radio",
      options: ["compact", "comfortable"],
    },
    tone: {
      control: "inline-radio",
      options: ["neutral", "info", "success", "warning", "danger"],
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StartAligned: Story = {
  args: {
    align: "start",
    title: "No orders selected",
    description: "Select an order from the queue to view fulfillment details.",
    action: undefined,
    secondaryAction: undefined,
  },
};

export const Compact: Story = {
  args: {
    density: "compact",
  },
};

export const Warning: Story = {
  args: {
    tone: "warning",
    title: "Inventory feed paused",
    description: "Reconnect the source catalog before publishing new stock counts.",
    action: <Button>Reconnect feed</Button>,
    secondaryAction: undefined,
  },
};

export const WithMedia: Story = {
  args: {
    media: (
      <svg viewBox="0 0 240 120" aria-hidden="true">
        <rect width="240" height="120" rx="12" fill="var(--ds-color-surface-muted)" />
        <path
          d="M55 77c28-26 49-26 78 0 12 11 29 11 41 0"
          fill="none"
          stroke="var(--ds-color-primary)"
          strokeLinecap="round"
          strokeWidth="8"
        />
        <circle cx="81" cy="49" r="11" fill="var(--ds-color-primary-soft)" />
        <circle cx="159" cy="49" r="11" fill="var(--ds-color-success-soft)" />
      </svg>
    ),
    title: "No matching styles",
    description: "Saved filters did not match any current inventory.",
  },
};
