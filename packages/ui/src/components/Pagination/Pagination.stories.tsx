import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    page: 6,
    totalPages: 18,
    siblingCount: 1,
    size: "md",
  },
  argTypes: {
    siblingCount: {
      control: "inline-radio",
      options: [0, 1, 2],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    page: 3,
    totalPages: 8,
    size: "sm",
  },
};

export const ProductListingLinks: Story = {
  args: {
    page: 12,
    totalPages: 24,
    getPageHref: (page: number) => `/products?page=${page}`,
  },
};

export const FirstPage: Story = {
  args: {
    page: 1,
    totalPages: 12,
  },
};

export const LastPage: Story = {
  args: {
    page: 12,
    totalPages: 12,
  },
};
