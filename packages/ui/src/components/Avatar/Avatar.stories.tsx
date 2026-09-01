import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../Badge";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    name: "Maya Chen",
    size: "md",
    shape: "circle",
  },
  argTypes: {
    shape: {
      control: "inline-radio",
      options: ["circle", "rounded"],
    },
    size: {
      control: "inline-radio",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Avatar name="Maya Chen" size="xs" />
      <Avatar name="Maya Chen" size="sm" />
      <Avatar name="Maya Chen" size="md" />
      <Avatar name="Maya Chen" size="lg" />
      <Avatar name="Maya Chen" size="xl" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Avatar name="Maya Chen" shape="circle" size="lg" />
      <Avatar name="Maya Chen" shape="rounded" size="lg" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Avatar name="Maya Chen" status={<Badge dot intent="success" ariaLabel="Online" />} />
      <Avatar name="Jordan Lee" status={<Badge dot intent="warning" ariaLabel="Away" />} />
      <Avatar name="Priya Shah" status={<Badge dot intent="danger" ariaLabel="Busy" />} />
    </div>
  ),
};

export const TeamStack: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      {["Maya Chen", "Jordan Lee", "Priya Shah", "Alex Kim"].map((name) => (
        <Avatar
          key={name}
          name={name}
          size="lg"
          style={{ marginLeft: name === "Maya Chen" ? 0 : "-10px" }}
        />
      ))}
    </div>
  ),
};
