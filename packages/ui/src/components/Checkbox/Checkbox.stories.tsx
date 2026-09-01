import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "Send me product updates",
    onCheckedChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          "Checkboxes let users select one or more independent options. This component wraps Base UI internally while exposing our own design-system API.",
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
    label: "Save my size preference",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Remember this device",
    description: "Use only on private devices you trust.",
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: "Some sizes selected",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Unavailable option",
  },
};

export const Interaction: Story = {
  args: {
    label: "Accept terms",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name: /accept terms/i });

    await userEvent.click(checkbox);

    await expect(checkbox).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  },
};
