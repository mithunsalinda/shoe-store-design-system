import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Table.module.css";
import type {
  TableCaptionProps,
  TableCellProps,
  TableHeaderCellProps,
  TableProps,
  TableRootProps,
  TableRowProps,
  TableSectionProps,
} from "./Table.types";

export const TableRoot = forwardRef<HTMLDivElement, TableRootProps>(
  ({ children, className, density = "comfortable", variant = "outlined", ...props }, ref) => (
    <div
      ref={ref}
      className={classNames(styles.root, styles[density], styles[variant], className)}
      {...props}
    >
      {children}
    </div>
  ),
);

TableRoot.displayName = "TableRoot";

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, ...props }, ref) => (
    <table ref={ref} className={classNames(styles.table, className)} {...props}>
      {children}
    </table>
  ),
);

Table.displayName = "Table";

export const TableHeader = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ children, className, ...props }, ref) => (
    <thead ref={ref} className={classNames(styles.header, className)} {...props}>
      {children}
    </thead>
  ),
);

TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ children, className, ...props }, ref) => (
    <tbody ref={ref} className={classNames(styles.body, className)} {...props}>
      {children}
    </tbody>
  ),
);

TableBody.displayName = "TableBody";

export const TableFooter = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ children, className, ...props }, ref) => (
    <tfoot ref={ref} className={classNames(styles.footer, className)} {...props}>
      {children}
    </tfoot>
  ),
);

TableFooter.displayName = "TableFooter";

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, ...props }, ref) => (
    <tr ref={ref} className={classNames(styles.row, className)} {...props}>
      {children}
    </tr>
  ),
);

TableRow.displayName = "TableRow";

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ children, className, scope = "col", ...props }, ref) => (
    <th ref={ref} className={classNames(styles.headerCell, className)} scope={scope} {...props}>
      {children}
    </th>
  ),
);

TableHeaderCell.displayName = "TableHeaderCell";

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className, ...props }, ref) => (
    <td ref={ref} className={classNames(styles.cell, className)} {...props}>
      {children}
    </td>
  ),
);

TableCell.displayName = "TableCell";

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ children, className, ...props }, ref) => (
    <caption ref={ref} className={classNames(styles.caption, className)} {...props}>
      {children}
    </caption>
  ),
);

TableCaption.displayName = "TableCaption";
