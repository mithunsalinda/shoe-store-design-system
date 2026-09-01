import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  args: {
    shape: "rectangle",
    animated: true,
  },
  argTypes: {
    shape: {
      control: "inline-radio",
      options: ["text", "rectangle", "circle"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 240,
    height: 120,
  },
};

export const ProductCard: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "12px", width: "280px" }}>
      <Skeleton height={180} />
      <Skeleton shape="text" width="84%" />
      <Skeleton shape="text" width="48%" />
    </div>
  ),
};

export const TextBlock: Story = {
  render: () => <Skeleton shape="text" lines={4} />,
};

export const AvatarRow: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "320px" }}>
      <Skeleton shape="circle" width={48} height={48} />
      <div style={{ display: "grid", gap: "8px", flex: 1 }}>
        <Skeleton shape="text" width="70%" />
        <Skeleton shape="text" width="44%" />
      </div>
    </div>
  ),
};
