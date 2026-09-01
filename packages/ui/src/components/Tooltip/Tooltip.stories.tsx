import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Button } from "../Button";
import { Tooltip, TooltipProvider } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider delay={120}>
        <div style={{ padding: "56px" }}>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
  args: {
    children: <Button variant="outline">Track order</Button>,
    content: "View live shipping updates.",
    onOpenChange: fn(),
  },
  argTypes: {
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      control: "inline-radio",
      options: ["start", "center", "end"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Tooltips provide short visual hints for hover and keyboard focus. Triggers still need accessible labels when their visible content is not descriptive.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bottom: Story = {
  args: {
    side: "bottom",
    content: "This opens below the trigger.",
  },
};

export const IconTrigger: Story = {
  args: {
    ariaLabel: "Size guide",
    children: <InfoIcon />,
    content: "Compare measurements before choosing your size.",
  },
};

export const InitiallyOpen: Story = {
  args: {
    defaultOpen: true,
    content: "Visible on first render for visual review.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    content: "This tooltip is disabled.",
  },
};

export const Interaction: Story = {
  args: {
    children: <Button variant="outline">Shipping help</Button>,
    content: "Delivery windows update after carrier pickup.",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole("button", { name: /shipping help/i });

    await userEvent.hover(trigger);

    await expect(await body.findByRole("tooltip")).toHaveTextContent(/delivery windows/i);
    await expect(args.onOpenChange).toHaveBeenCalledWith(true);
  },
};

function InfoIcon() {
  return (
    <span
      style={{
        alignItems: "center",
        border: "1px solid var(--ds-color-border-strong)",
        borderRadius: "var(--ds-radius-full)",
        display: "inline-flex",
        fontSize: "var(--ds-font-size-sm)",
        fontWeight: "var(--ds-font-weight-bold)",
        height: "2rem",
        justifyContent: "center",
        width: "2rem",
      }}
      aria-hidden="true"
    >
      i
    </span>
  );
}
