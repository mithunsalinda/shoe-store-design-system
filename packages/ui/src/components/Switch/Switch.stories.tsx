import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    label: "Product alerts",
    description: "Notify me when watched shoes are back in stock.",
    name: "product-alerts",
    onCheckedChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          "Switches toggle a single setting on or off. This component wraps Base UI internally while keeping a compact design-system API.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    label: "Save checkout preferences",
  },
};

export const WithoutDescription: Story = {
  args: {
    label: "Marketing emails",
    description: undefined,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    required: true,
    label: "Accept policy updates",
    description: "Required for account-level notifications.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    label: "Inventory sync",
  },
};

export const Interaction: Story = {
  args: {
    label: "SMS updates",
    description: undefined,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name: /sms updates/i });

    await userEvent.click(toggle);

    await expect(toggle).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  },
};
