import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Skeleton } from "../Skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from "./Card";

const meta: Meta<typeof Card> = {
  title: "Layout/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    variant: "outlined",
    padding: "md",
    interactive: false,
  },
  argTypes: {
    padding: {
      control: "inline-radio",
      options: ["none", "sm", "md", "lg"],
    },
    variant: {
      control: "inline-radio",
      options: ["surface", "outlined", "elevated"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Leather runner</CardTitle>
        <CardDescription>New season product</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Available in full and half sizes with standard fulfillment windows.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Details</Button>
        <Button>Add</Button>
      </CardFooter>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card padding="none" variant="elevated" style={{ maxWidth: 320 }}>
      <CardMedia>
        <div
          style={{
            aspectRatio: "4 / 3",
            background:
              "linear-gradient(135deg, var(--ds-color-surface-muted), var(--ds-color-primary-soft))",
          }}
        />
      </CardMedia>
      <CardHeader>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
          <CardTitle>White court sneaker</CardTitle>
          <Badge intent="success">In stock</Badge>
        </div>
        <CardDescription>SKU SHOE-1042</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Clean leather upper with cushioned outsole. Sizes 6-12 are ready to ship.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const LoadingCard: Story = {
  render: () => (
    <Card style={{ maxWidth: 320 }}>
      <Skeleton height={160} />
      <CardHeader>
        <Skeleton shape="text" width="72%" />
        <Skeleton shape="text" width="48%" />
      </CardHeader>
      <CardContent>
        <Skeleton shape="text" lines={3} />
      </CardContent>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      <Card variant="surface">
        <CardTitle>Surface</CardTitle>
        <CardContent>Quiet grouping on an already framed page.</CardContent>
      </Card>
      <Card variant="outlined">
        <CardTitle>Outlined</CardTitle>
        <CardContent>Default card for repeated content blocks.</CardContent>
      </Card>
      <Card variant="elevated">
        <CardTitle>Elevated</CardTitle>
        <CardContent>Raised surface for important panels.</CardContent>
      </Card>
    </div>
  ),
};
