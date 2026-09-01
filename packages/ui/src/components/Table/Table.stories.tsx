import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../Badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "./Table";

const rows = [
  {
    sku: "SHOE-1042",
    product: "White court sneaker",
    status: "In stock",
    stock: 42,
    price: "$128",
  },
  { sku: "SHOE-1188", product: "Black trail runner", status: "Low stock", stock: 6, price: "$146" },
  { sku: "SHOE-1210", product: "Tan leather loafer", status: "Draft", stock: 0, price: "$172" },
  {
    sku: "SHOE-1337",
    product: "Silver training shoe",
    status: "Sold out",
    stock: 0,
    price: "$118",
  },
];

const meta: Meta<typeof TableRoot> = {
  title: "Data Display/Table",
  component: TableRoot,
  tags: ["autodocs"],
  args: {
    density: "comfortable",
    variant: "outlined",
  },
  argTypes: {
    density: {
      control: "inline-radio",
      options: ["compact", "comfortable"],
    },
    variant: {
      control: "inline-radio",
      options: ["plain", "outlined"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <TableRoot {...args}>
      <Table>
        <TableCaption>Inventory snapshot for active shoe products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>SKU</TableHeaderCell>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell data-align="right">Stock</TableHeaderCell>
            <TableHeaderCell data-align="right">Price</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.sku}>
              <TableCell>{row.sku}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell data-align="right">{row.stock}</TableCell>
              <TableCell data-align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  ),
};

export const Compact: Story = {
  args: {
    density: "compact",
  },
  render: (args) => (
    <TableRoot {...args}>
      <Table>
        <TableCaption>Inventory snapshot for active shoe products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>SKU</TableHeaderCell>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell data-align="right">Stock</TableHeaderCell>
            <TableHeaderCell data-align="right">Price</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.sku}>
              <TableCell>{row.sku}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell data-align="right">{row.stock}</TableCell>
              <TableCell data-align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <TableRoot {...args}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Channel</TableHeaderCell>
            <TableHeaderCell data-align="right">Orders</TableHeaderCell>
            <TableHeaderCell data-align="right">Revenue</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Storefront</TableCell>
            <TableCell data-align="right">128</TableCell>
            <TableCell data-align="right">$18,420</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wholesale</TableCell>
            <TableCell data-align="right">36</TableCell>
            <TableCell data-align="right">$9,880</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell data-align="right">164</TableCell>
            <TableCell data-align="right">$28,300</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableRoot>
  ),
};

function StatusBadge({ status }: { status: string }) {
  if (status === "In stock") {
    return <Badge intent="success">{status}</Badge>;
  }

  if (status === "Low stock") {
    return <Badge intent="warning">{status}</Badge>;
  }

  if (status === "Sold out") {
    return <Badge intent="danger">{status}</Badge>;
  }

  return <Badge>{status}</Badge>;
}
