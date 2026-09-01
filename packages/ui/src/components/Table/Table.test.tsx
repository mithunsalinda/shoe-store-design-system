import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "./Table";

describe("Table", () => {
  it("renders an accessible table with caption and headers", () => {
    render(
      <TableRoot>
        <Table>
          <TableCaption>Inventory by size</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>SKU</TableHeaderCell>
              <TableHeaderCell>Stock</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>SHOE-1042</TableCell>
              <TableCell>24</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableRoot>,
    );

    expect(screen.getByRole("table", { name: "Inventory by size" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "SKU" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "SHOE-1042" })).toBeInTheDocument();
  });

  it("defaults header cells to column scope", () => {
    render(
      <table>
        <thead>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
          </TableRow>
        </thead>
      </table>,
    );

    expect(screen.getByRole("columnheader", { name: "Product" })).toHaveAttribute("scope", "col");
  });

  it("passes through root attributes", () => {
    render(<TableRoot data-testid="table-root" density="compact" variant="plain" />);

    expect(screen.getByTestId("table-root")).toBeInTheDocument();
  });
});
