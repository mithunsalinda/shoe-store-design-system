"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Toggle.module.css";
import type { ToggleGroupProps } from "./Toggle.types";

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      ariaLabel,
      className,
      defaultValue,
      disabled = false,
      items,
      loopFocus = true,
      multiple = false,
      onValueChange,
      orientation = "horizontal",
      size = "md",
      value,
      variant = "outlined",
      ...props
    },
    ref,
  ) => (
    <BaseToggleGroup
      ref={ref}
      aria-label={ariaLabel}
      className={classNames(styles.group, styles[orientation], className)}
      defaultValue={defaultValue}
      disabled={disabled}
      loopFocus={loopFocus}
      multiple={multiple}
      onValueChange={(nextValue) => onValueChange?.(nextValue.map(String))}
      orientation={orientation}
      value={value}
      {...props}
    >
      {items.map((item) => (
        <BaseToggle
          key={item.value}
          className={classNames(styles.toggle, styles[size], styles[variant], styles.groupItem)}
          disabled={item.disabled ?? false}
          type="button"
          value={item.value}
        >
          {item.label}
        </BaseToggle>
      ))}
    </BaseToggleGroup>
  ),
);

ToggleGroup.displayName = "ToggleGroup";
