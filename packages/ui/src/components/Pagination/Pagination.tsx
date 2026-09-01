import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Pagination.module.css";
import type { PaginationProps } from "./Pagination.types";

type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      "aria-label": ariaLabel = "Pagination",
      className,
      disabled = false,
      getPageHref,
      onPageChange,
      page,
      siblingCount = 1,
      size = "md",
      totalPages,
      ...props
    },
    ref,
  ) => {
    const safeTotalPages = Math.max(1, Math.floor(totalPages));
    const currentPage = clampPage(page, safeTotalPages);
    const pages = getPaginationItems(currentPage, safeTotalPages, siblingCount);
    const previousPage = Math.max(1, currentPage - 1);
    const nextPage = Math.min(safeTotalPages, currentPage + 1);

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={classNames(styles.pagination, styles[size], className)}
        {...props}
      >
        <ul className={styles.list}>
          <li>
            {renderControl({
              disabled: disabled || currentPage === 1,
              getPageHref,
              label: "Previous page",
              onPageChange,
              page: previousPage,
              text: "Previous",
            })}
          </li>
          {pages.map((item) => (
            <li key={item}>
              {typeof item === "number" ? (
                renderControl({
                  current: item === currentPage,
                  disabled,
                  getPageHref,
                  label: `Page ${item}`,
                  onPageChange,
                  page: item,
                  text: item.toLocaleString(),
                })
              ) : (
                <span className={styles.ellipsis} aria-hidden="true">
                  ...
                </span>
              )}
            </li>
          ))}
          <li>
            {renderControl({
              disabled: disabled || currentPage === safeTotalPages,
              getPageHref,
              label: "Next page",
              onPageChange,
              page: nextPage,
              text: "Next",
            })}
          </li>
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";

function renderControl({
  current = false,
  disabled,
  getPageHref,
  label,
  onPageChange,
  page,
  text,
}: {
  current?: boolean;
  disabled: boolean;
  getPageHref: ((page: number) => string) | undefined;
  label: string;
  onPageChange: ((page: number) => void) | undefined;
  page: number;
  text: string;
}) {
  const className = classNames(styles.control, current && styles.current);

  if (getPageHref && !disabled) {
    return (
      <a
        className={className}
        href={getPageHref(page)}
        aria-current={current ? "page" : undefined}
        aria-label={current ? `${label}, current page` : label}
        onClick={(event) => {
          if (onPageChange) {
            event.preventDefault();
            onPageChange(page);
          }
        }}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      className={className}
      type="button"
      disabled={disabled}
      aria-current={current ? "page" : undefined}
      aria-label={current ? `${label}, current page` : label}
      onClick={() => onPageChange?.(page)}
    >
      {text}
    </button>
  );
}

function getPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PaginationItem[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + siblingCount * 2;
    return [...range(1, leftItemCount), "ellipsis-end", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + siblingCount * 2;
    return [1, "ellipsis-start", ...range(totalPages - rightItemCount + 1, totalPages)];
  }

  return [1, "ellipsis-start", ...range(leftSibling, rightSibling), "ellipsis-end", totalPages];
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(1, Math.floor(page)), totalPages);
}
