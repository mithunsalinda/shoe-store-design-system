import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders a labeled pagination navigation", () => {
    render(<Pagination page={2} totalPages={5} />);

    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2, current page" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("calls onPageChange when a page is selected", () => {
    const onPageChange = vi.fn();

    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Page 4" }));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("disables previous and next controls at the boundaries", () => {
    const { rerender } = render(<Pagination page={1} totalPages={5} />);

    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();

    rerender(<Pagination page={5} totalPages={5} />);

    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("renders ellipses for large page sets", () => {
    render(<Pagination page={10} totalPages={20} />);

    expect(screen.getAllByText("...")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Page 10, current page" })).toBeInTheDocument();
  });

  it("renders links when getPageHref is provided", () => {
    render(<Pagination page={2} totalPages={4} getPageHref={(page) => `/products?page=${page}`} />);

    expect(screen.getByRole("link", { name: "Page 3" })).toHaveAttribute(
      "href",
      "/products?page=3",
    );
  });

  it("passes through nav attributes", () => {
    render(<Pagination page={1} totalPages={3} aria-label="Product pages" data-testid="pager" />);

    expect(screen.getByRole("navigation", { name: "Product pages" })).toHaveAttribute(
      "data-testid",
      "pager",
    );
  });
});
