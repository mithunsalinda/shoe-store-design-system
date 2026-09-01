import type { Meta, StoryObj } from "@storybook/react";
import { ContextMenu } from "./ContextMenu";
import type { ContextMenuProps } from "./ContextMenu.types";

const meta = {
  title: "Navigation/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items: [
      { label: "Edit product", description: "Update content, media, or pricing." },
      { label: "Duplicate product" },
      { type: "link", href: "/products/apex-runner", label: "Open product page" },
      { type: "separator" },
      { label: "Archive product", destructive: true },
    ],
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
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

function renderProductContextMenu(args: ContextMenuProps) {
  return (
    <ContextMenu {...args}>
      <div
        style={{
          alignItems: "center",
          background: "var(--ds-color-surface-muted)",
          border: "1px solid var(--ds-color-border)",
          borderRadius: "var(--ds-radius-lg)",
          display: "grid",
          gap: "var(--ds-spacing-xs)",
          minHeight: "10rem",
          padding: "var(--ds-spacing-lg)",
          width: "18rem",
        }}
      >
        <strong>Apex Runner</strong>
        <span style={{ color: "var(--ds-color-text-muted)", fontSize: "var(--ds-font-size-sm)" }}>
          Right click this product tile.
        </span>
      </div>
    </ContextMenu>
  );
}

export const Default: Story = {
  render: renderProductContextMenu,
};

export const WithArrow: Story = {
  args: {
    showArrow: true,
  },
  render: renderProductContextMenu,
};

export const Small: Story = {
  args: {
    size: "sm",
  },
  render: renderProductContextMenu,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: renderProductContextMenu,
};
