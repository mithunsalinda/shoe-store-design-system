import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Tabs } from "./Tabs";

const dashboardItems = [
  {
    value: "overview",
    label: "Overview",
    content: "Track sales, returns, and fulfillment health across the shoe catalog.",
  },
  {
    value: "inventory",
    label: "Inventory",
    content: "Review stock alerts, size runs, warehouse counts, and replenishment plans.",
  },
  {
    value: "customers",
    label: "Customers",
    content: "See loyalty segments, fit preferences, and recent support activity.",
  },
];

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    ariaLabel: "Dashboard sections",
    defaultValue: "overview",
    items: dashboardItems,
    onValueChange: fn(),
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "inline-radio",
      options: ["line", "contained"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Tabs switch between related panels without leaving the page. The wrapper keeps a compact item-driven API while Base UI handles roles and keyboard navigation.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Contained: Story = {
  args: {
    variant: "contained",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
};

export const WithDisabledTab: Story = {
  args: {
    items: [
      ...dashboardItems,
      {
        value: "forecast",
        label: "Forecast",
        content: "Forecasting is not available for this workspace.",
        disabled: true,
      },
    ],
  },
};

export const KeepMounted: Story = {
  args: {
    keepMounted: true,
  },
};

export const Interaction: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const inventory = canvas.getByRole("tab", { name: /inventory/i });

    await userEvent.click(inventory);

    await expect(inventory).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent(/stock alerts/i);
    await expect(args.onValueChange).toHaveBeenCalledWith("inventory");
  },
};
