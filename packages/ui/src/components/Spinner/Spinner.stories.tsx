import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: {
    size: "md",
    intent: "primary",
    label: "Loading",
  },
  argTypes: {
    intent: {
      control: "inline-radio",
      options: ["neutral", "primary", "success", "warning", "danger"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Intents: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Spinner intent="neutral" />
      <Spinner intent="primary" />
      <Spinner intent="success" />
      <Spinner intent="warning" />
      <Spinner intent="danger" />
    </div>
  ),
};
