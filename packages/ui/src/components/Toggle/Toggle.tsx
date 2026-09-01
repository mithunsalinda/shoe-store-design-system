"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Toggle.module.css";
import type { ToggleProps } from "./Toggle.types";

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      children,
      className,
      defaultPressed,
      disabled = false,
      onPressedChange,
      pressed,
      size = "md",
      type,
      variant = "outlined",
      ...props
    },
    ref,
  ) => (
    <BaseToggle
      ref={ref}
      className={classNames(styles.toggle, styles[size], styles[variant], className)}
      defaultPressed={defaultPressed}
      disabled={disabled}
      onPressedChange={(nextPressed) => onPressedChange?.(nextPressed)}
      pressed={pressed}
      type={type ?? "button"}
      {...props}
    >
      {children}
    </BaseToggle>
  ),
);

Toggle.displayName = "Toggle";
