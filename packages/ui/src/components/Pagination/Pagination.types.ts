import type { HTMLAttributes } from "react";

export type PaginationSize = "sm" | "md";
export type PaginationSiblingCount = 0 | 1 | 2;

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  siblingCount?: PaginationSiblingCount;
  size?: PaginationSize;
  disabled?: boolean;
  getPageHref?: (page: number) => string;
}
