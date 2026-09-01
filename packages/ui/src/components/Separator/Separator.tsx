"use client";

import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Separator.module.css";
import type { SeparatorProps } from "./Separator.types";

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      "aria-hidden": ariaHidden,
      className,
      decorative = false,
      orientation = "horizontal",
      role,
      spacing = "md",
      variant = "subtle",
      ...props
    },
    ref,
  ) => (
    <BaseSeparator
      ref={ref}
      className={classNames(
        styles.separator,
        styles[orientation],
        styles[`spacing-${spacing}`],
        styles[variant],
        className,
      )}
      orientation={orientation}
      {...props}
      role={decorative ? "presentation" : (role ?? "separator")}
      aria-hidden={decorative ? true : ariaHidden}
    />
  ),
);

Separator.displayName = "Separator";
