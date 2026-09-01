import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Button } from "../Button";
import { ToastProvider, ToastViewport, useToast } from "./Toast";
import type { ToastViewportProps } from "./Toast.types";

const meta: Meta<ToastViewportProps> = {
  title: "Overlays/Toast",
  component: ToastViewport,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider timeout={0}>
        <div style={{ minHeight: "18rem" }}>
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
  args: {
    placement: "bottom-right",
  },
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Toasts provide temporary app feedback for successful actions, warnings, errors, and undo affordances. Mount ToastProvider once and call useToast inside the app tree.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function ToastControls() {
  const toast = useToast();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <Button
        onClick={() => {
          toast.add({
            title: "Inventory saved",
            description: "Availability is now updated across selling channels.",
            type: "success",
          });
        }}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.add({
            title: "Review needed",
            description: "One size is below the reorder threshold.",
            type: "warning",
          });
        }}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.add({
            title: "Upload failed",
            description: "Try again after checking the product image size.",
            type: "error",
            priority: "high",
          });
        }}
      >
        Error
      </Button>
    </div>
  );
}

function UndoToastControls() {
  const toast = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast.add({
          title: "Draft archived",
          description: "The product draft moved out of the active queue.",
          actionProps: {
            children: "Undo",
            onClick: () => {
              toast.add({
                title: "Draft restored",
                type: "success",
              });
            },
          },
        });
      }}
    >
      Archive draft
    </Button>
  );
}

export const Default: Story = {
  render: (args) => (
    <>
      <ToastControls />
      <ToastViewport {...args} />
    </>
  ),
};

export const TopCenter: Story = {
  args: {
    placement: "top-center",
  },
  render: (args) => (
    <>
      <ToastControls />
      <ToastViewport {...args} />
    </>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <>
      <UndoToastControls />
      <ToastViewport {...args} />
    </>
  ),
};

export const Interaction: Story = {
  render: (args) => (
    <>
      <ToastControls />
      <ToastViewport {...args} />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole("button", { name: /success/i }));

    await expect(await body.findByText(/inventory saved/i)).toBeInTheDocument();
  },
};
