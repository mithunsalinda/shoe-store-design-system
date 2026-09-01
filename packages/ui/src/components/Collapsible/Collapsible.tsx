"use client";

import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Collapsible.module.css";
import type { CollapsibleProps } from "./Collapsible.types";

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      className,
      content,
      defaultOpen,
      description,
      disabled = false,
      hiddenUntilFound = false,
      keepMounted = false,
      onOpenChange,
      open,
      size = "md",
      title,
      variant = "outlined",
      ...props
    },
    ref,
  ) => (
    <BaseCollapsible.Root
      ref={ref}
      className={classNames(styles.root, styles[size], styles[variant], className)}
      defaultOpen={defaultOpen}
      disabled={disabled}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
      open={open}
      {...props}
    >
      <BaseCollapsible.Trigger className={styles.trigger}>
        <span className={styles.label}>
          <span className={styles.title}>{title}</span>
          {description ? <span className={styles.description}>{description}</span> : null}
        </span>
        <span className={styles.chevron} aria-hidden="true">
          v
        </span>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel
        className={styles.panel}
        hiddenUntilFound={hiddenUntilFound}
        keepMounted={keepMounted}
      >
        <div className={styles.content}>{content}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  ),
);

Collapsible.displayName = "Collapsible";
