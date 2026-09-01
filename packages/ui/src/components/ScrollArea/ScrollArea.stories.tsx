import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./ScrollArea";
import type { ScrollAreaProps } from "./ScrollArea.types";

const productUpdates = [
  "Apex Runner added in Ice Blue",
  "Court Classic low inventory in size 9",
  "Trail Forge waterproof variant approved",
  "Studio Slip-On reordered for spring drop",
  "Carbon Tempo media upload completed",
  "Archive Boot color review pending",
  "Nova Trainer samples dispatched",
  "Pace Knit returns analysis ready",
  "Urban Trek markdown begins Friday",
  "Fleet Sandal images need retouching",
  "Summit Hiker supplier ETA changed",
  "Flex Mule catalog copy approved",
];

function renderProductUpdates(args: ScrollAreaProps) {
  return (
    <ScrollArea {...args}>
      <div style={{ display: "grid", gap: "0.75rem", padding: "1rem" }}>
        {productUpdates.map((update) => (
          <div
            key={update}
            style={{
              borderBottom: "1px solid var(--ds-color-border)",
              paddingBottom: "0.75rem",
            }}
          >
            {update}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

const meta = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    height: "14rem",
    width: "22rem",
  },
  argTypes: {
    scrollbarVisibility: {
      control: "inline-radio",
      options: ["auto", "always", "none"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: renderProductUpdates,
};

export const AlwaysVisible: Story = {
  args: {
    scrollbarVisibility: "always",
  },
  render: renderProductUpdates,
};

export const Horizontal: Story = {
  args: {
    height: "8rem",
    width: "24rem",
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div style={{ display: "flex", gap: "0.75rem", minWidth: "46rem", padding: "1rem" }}>
        {productUpdates.slice(0, 6).map((update) => (
          <div
            key={update}
            style={{
              border: "1px solid var(--ds-color-border)",
              borderRadius: "var(--ds-radius-md)",
              minWidth: "10rem",
              padding: "0.75rem",
            }}
          >
            {update}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const NoCustomScrollbar: Story = {
  args: {
    scrollbarVisibility: "none",
  },
  render: renderProductUpdates,
};
