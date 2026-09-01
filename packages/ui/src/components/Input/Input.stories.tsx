import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "name@example.com",
    type: "email",
  },
  argTypes: {
    inputSize: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Inputs collect short free-form values. Pair them with FormField for accessible labels, descriptions, and errors.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "12px", maxWidth: "360px" }}>
      <Input inputSize="sm" placeholder="Small" />
      <Input inputSize="md" placeholder="Medium" />
      <Input inputSize="lg" placeholder="Large" />
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    invalid: true,
    defaultValue: "not-an-email",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Disabled value",
  },
};

export const TypingInteraction: Story = {
  args: {
    "aria-label": "Email address",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: /email address/i });

    await userEvent.type(input, "runner@shoestore.com");

    await expect(input).toHaveValue("runner@shoestore.com");
  },
};
