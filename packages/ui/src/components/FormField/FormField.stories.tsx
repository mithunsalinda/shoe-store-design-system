import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Input } from "../Input";
import { FormField } from "./FormField";

const meta: Meta<typeof FormField> = {
  title: "Forms/FormField",
  component: FormField,
  tags: ["autodocs"],
  args: {
    label: "Email address",
    description: "We'll only use this for order updates.",
    required: true,
    children: <Input type="email" placeholder="name@example.com" />,
  },
  parameters: {
    docs: {
      description: {
        component:
          "FormField connects a single control to its label, description, and error message with the correct accessibility attributes.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: "Email is required",
    children: <Input type="email" defaultValue="" />,
  },
};

export const AccessibleRelationships: Story = {
  args: {
    error: "Use a valid email address",
    children: <Input type="email" defaultValue="runner" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: /email address/i });

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(
      "We'll only use this for order updates. Use a valid email address",
    );
  },
};
