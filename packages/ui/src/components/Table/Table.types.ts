import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

export type TableDensity = "compact" | "comfortable";
export type TableVariant = "plain" | "outlined";

export interface TableRootProps extends HTMLAttributes<HTMLDivElement> {
  density?: TableDensity;
  variant?: TableVariant;
}

export type TableProps = TableHTMLAttributes<HTMLTableElement>;
export type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
export type TableHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement>;
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
