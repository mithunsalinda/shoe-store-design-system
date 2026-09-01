"use client";

import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Switch.module.css";
import type { SwitchProps } from "./Switch.types";

export const Switch = forwardRef<HTMLElement, SwitchProps>(
  (
    {
      checked,
      className,
      defaultChecked,
      description,
      disabled = false,
      id,
      invalid = false,
      label,
      name,
      onCheckedChange,
      readOnly = false,
      required = false,
      uncheckedValue,
      value,
    },
    ref,
  ) => {
    const control = (
      <BaseSwitch.Root
        ref={ref}
        id={id}
        name={name}
        value={value}
        uncheckedValue={uncheckedValue}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className={styles.control}
        aria-invalid={invalid || undefined}
        data-invalid={invalid ? "" : undefined}
        onCheckedChange={(nextChecked) => {
          onCheckedChange?.(nextChecked);
        }}
      >
        <BaseSwitch.Thumb className={styles.thumb} />
      </BaseSwitch.Root>
    );

    if (!label && !description) {
      return control;
    }

    return (
      <label className={classNames(styles.root, disabled && styles.disabled, className)}>
        {control}
        <span className={styles.text}>
          {label ? <span className={styles.label}>{label}</span> : null}
          {description ? <span className={styles.description}>{description}</span> : null}
        </span>
      </label>
    );
  },
);

Switch.displayName = "Switch";
