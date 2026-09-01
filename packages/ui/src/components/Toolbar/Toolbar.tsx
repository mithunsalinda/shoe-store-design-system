"use client";

import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Toolbar.module.css";
import type {
  ToolbarButtonProps,
  ToolbarGroupProps,
  ToolbarInputProps,
  ToolbarLinkProps,
  ToolbarProps,
  ToolbarSeparatorProps,
} from "./Toolbar.types";

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  (
    {
      ariaLabel,
      children,
      className,
      disabled = false,
      loopFocus = true,
      orientation = "horizontal",
      size = "md",
      variant = "outlined",
      ...props
    },
    ref,
  ) => (
    <BaseToolbar.Root
      ref={ref}
      aria-label={ariaLabel}
      className={classNames(
        styles.toolbar,
        styles[orientation],
        styles[size],
        styles[variant],
        className,
      )}
      disabled={disabled}
      loopFocus={loopFocus}
      orientation={orientation}
      {...props}
    >
      {children}
    </BaseToolbar.Root>
  ),
);

Toolbar.displayName = "Toolbar";

export const ToolbarGroup = forwardRef<HTMLDivElement, ToolbarGroupProps>(
  ({ children, className, disabled = false, ...props }, ref) => (
    <BaseToolbar.Group
      ref={ref}
      className={classNames(styles.group, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </BaseToolbar.Group>
  ),
);

ToolbarGroup.displayName = "ToolbarGroup";

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ children, className, type, ...props }, ref) => (
    <BaseToolbar.Button
      ref={ref}
      className={classNames(styles.item, styles.button, className)}
      type={type ?? "button"}
      {...props}
    >
      {children}
    </BaseToolbar.Button>
  ),
);

ToolbarButton.displayName = "ToolbarButton";

export const ToolbarLink = forwardRef<HTMLAnchorElement, ToolbarLinkProps>(
  ({ children, className, ...props }, ref) => (
    <BaseToolbar.Link
      ref={ref}
      className={classNames(styles.item, styles.link, className)}
      {...props}
    >
      {children}
    </BaseToolbar.Link>
  ),
);

ToolbarLink.displayName = "ToolbarLink";

export const ToolbarInput = forwardRef<HTMLInputElement, ToolbarInputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <BaseToolbar.Input
      ref={ref}
      className={classNames(styles.input, className)}
      type={type}
      {...props}
    />
  ),
);

ToolbarInput.displayName = "ToolbarInput";

export const ToolbarSeparator = forwardRef<HTMLDivElement, ToolbarSeparatorProps>(
  ({ className, orientation, ...props }, ref) => (
    <BaseToolbar.Separator
      ref={ref}
      className={classNames(styles.separator, className)}
      orientation={orientation}
      {...props}
    />
  ),
);

ToolbarSeparator.displayName = "ToolbarSeparator";
