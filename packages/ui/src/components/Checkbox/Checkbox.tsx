"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Checkbox.module.css";
import type { CheckboxProps } from "./Checkbox.types";

export const Checkbox = forwardRef<HTMLSpanElement, CheckboxProps>(
  (
    {
      checked,
      className,
      defaultChecked,
      description,
      disabled = false,
      id,
      indeterminate = false,
      invalid = false,
      label,
      name,
      onCheckedChange,
      readOnly = false,
      required = false,
      value,
    },
    ref,
  ) => {
    const control = (
      <BaseCheckbox.Root
        ref={ref}
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        indeterminate={indeterminate}
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
        <BaseCheckbox.Indicator className={styles.indicator} keepMounted>
          {indeterminate ? <MinusIcon /> : <CheckIcon />}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
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

Checkbox.displayName = "Checkbox";

function CheckIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.25 8.25 6.5 11.5l6.25-7" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8h9" />
    </svg>
  );
}
