import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Breadcrumb.module.css";
import type { BreadcrumbItem, BreadcrumbProps } from "./Breadcrumb.types";

const ELLIPSIS_ITEM: BreadcrumbItem = {
  label: "...",
  disabled: true,
};

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      "aria-label": ariaLabel = "Breadcrumb",
      className,
      items,
      maxItems,
      separator = "/",
      size = "md",
      ...props
    },
    ref,
  ) => {
    const visibleItems = getVisibleItems(items, maxItems);

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={classNames(styles.breadcrumb, styles[size], className)}
        {...props}
      >
        <ol className={styles.list}>
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1;
            const isCurrent = item.current ?? isLast;

            return (
              <li
                key={getItemKey(item, index)}
                className={classNames(styles.item, item.disabled && styles.disabled)}
              >
                {renderItem(item, isCurrent)}
                {!isLast ? (
                  <span className={styles.separator} aria-hidden="true">
                    {separator}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";

function getVisibleItems(items: BreadcrumbItem[], maxItems?: number) {
  if (!maxItems || items.length <= maxItems || maxItems < 3) {
    return items;
  }

  const firstItem = items.at(0);

  if (!firstItem) {
    return [];
  }

  return [firstItem, ELLIPSIS_ITEM, ...items.slice(items.length - (maxItems - 2))];
}

function renderItem(item: BreadcrumbItem, isCurrent: boolean) {
  if (item.href && !item.disabled && !isCurrent) {
    return (
      <a className={styles.link} href={item.href}>
        {item.label}
      </a>
    );
  }

  return (
    <span
      className={classNames(styles.page, isCurrent && styles.current)}
      aria-current={isCurrent ? "page" : undefined}
    >
      {item.label}
    </span>
  );
}

function getItemKey(item: BreadcrumbItem, index: number) {
  if (typeof item.label === "string") {
    return `${item.label}-${index}`;
  }

  return index;
}
