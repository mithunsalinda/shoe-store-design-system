"use client";

import { forwardRef, useId } from "react";
import { useState } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./DatePicker.module.css";
import type { DatePickerProps } from "./DatePicker.types";

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      clearLabel = "Clear date",
      datePickerSize = "md",
      description,
      disabled = false,
      error,
      id,
      inputClassName,
      invalid = false,
      label,
      onChange,
      onValueChange,
      readOnly = false,
      showClearButton = true,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");
    const isInvalid = invalid || Boolean(error);
    const hasControlledValue = value !== undefined;
    const currentValue = hasControlledValue ? value : uncontrolledValue;
    const hasValue = Boolean(currentValue);

    return (
      <div
        className={classNames(
          styles.root,
          styles[datePickerSize],
          disabled && styles.disabled,
          className,
        )}
        data-invalid={isInvalid ? "" : undefined}
      >
        {label ? (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        {description ? (
          <div className={styles.description} id={descriptionId}>
            {description}
          </div>
        ) : null}
        <div className={styles.group} data-readonly={readOnly ? "" : undefined}>
          <span className={styles.icon} aria-hidden="true">
            <CalendarIcon />
          </span>
          <input
            ref={ref}
            aria-describedby={describedBy || undefined}
            aria-invalid={isInvalid || undefined}
            className={classNames(styles.input, inputClassName)}
            disabled={disabled}
            id={inputId}
            onChange={(event) => {
              if (!hasControlledValue) {
                setUncontrolledValue(event.currentTarget.value);
              }

              onChange?.(event);
              onValueChange?.(event.currentTarget.value);
            }}
            readOnly={readOnly}
            type="date"
            value={currentValue}
            {...props}
          />
          {showClearButton && hasValue && !disabled && !readOnly ? (
            <button
              aria-label={clearLabel}
              className={styles.clear}
              onClick={() => {
                if (!hasControlledValue) {
                  setUncontrolledValue("");
                }

                onValueChange?.("");
              }}
              type="button"
            >
              <XIcon />
            </button>
          ) : null}
        </div>
        {error ? (
          <div className={styles.error} id={errorId}>
            {error}
          </div>
        ) : null}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";

function CalendarIcon() {
  return (
    <svg className={styles.calendar} viewBox="0 0 16 16">
      <path d="M4.5 2.5v2m7-2v2M2.75 6.25h10.5M3.5 3.75h9A1.25 1.25 0 0 1 13.75 5v7.5a1.25 1.25 0 0 1-1.25 1.25h-9a1.25 1.25 0 0 1-1.25-1.25V5A1.25 1.25 0 0 1 3.5 3.75Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className={styles.x} viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4.5 4.5 7 7m-7 0 7-7" />
    </svg>
  );
}
