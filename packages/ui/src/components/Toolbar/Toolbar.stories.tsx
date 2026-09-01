import type { Meta, StoryObj } from "@storybook/react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
} from "./Toolbar";

const meta: Meta<typeof Toolbar> = {
  title: "Navigation/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  args: {
    ariaLabel: "Product actions",
    orientation: "horizontal",
    size: "md",
    variant: "outlined",
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
    },
    variant: {
      control: "inline-radio",
      options: ["plain", "outlined"],
    },
  },
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarGroup>
        <ToolbarButton>Filter</ToolbarButton>
        <ToolbarButton>Sort</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarInput aria-label="Search products" placeholder="Search SKUs" />
        <ToolbarButton>Export</ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    size: "sm",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <Toolbar {...args} ariaLabel="Record actions">
      <ToolbarButton>Duplicate</ToolbarButton>
      <ToolbarButton>Archive</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarLink href="#history">History</ToolbarLink>
    </Toolbar>
  ),
};

export const DisabledGroup: Story = {
  render: (args) => (
    <Toolbar {...args} ariaLabel="Inventory tools">
      <ToolbarGroup>
        <ToolbarButton>Refresh</ToolbarButton>
        <ToolbarButton>Export</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup disabled>
        <ToolbarButton>Bulk edit</ToolbarButton>
        <ToolbarButton>Delete</ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  ),
};
