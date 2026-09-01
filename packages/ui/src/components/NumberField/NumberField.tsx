"use client";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { forwardRef, useId } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./NumberField.module.css";
import type { NumberFieldProps } from "./NumberField.types";

export const NumberField = forwardRef<HTMLDivElement, NumberFieldProps>(
  (
    {
      allowOutOfRange,
      allowWheelScrub = false,
      className,
      defaultValue,
      description,
      disabled = false,
      error,
      format,
      id,
      inputProps,
      inputRef,
      invalid = false,
      label,
      largeStep,
      locale,
      max,
      min,
      name,
      onValueChange,
      onValueCommitted,
      placeholder,
      readOnly = false,
      required = false,
      showSteppers = true,
      size = "md",
      smallStep,
      snapOnStep = false,
      step = 1,
      value,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const isInvalid = invalid || Boolean(error);

    const describedBy = [descriptionId, errorId, inputProps?.["aria-describedby"]]
      .filter(Boolean)
      .join(" ");

    return (
      <BaseNumberField.Root
        ref={ref}
        allowOutOfRange={allowOutOfRange}
        allowWheelScrub={allowWheelScrub}
        className={classNames(styles.root, styles[size], disabled && styles.disabled, className)}
        data-invalid={isInvalid ? "" : undefined}
        defaultValue={defaultValue}
        disabled={disabled}
        format={format}
        id={inputId}
        inputRef={inputRef}
        largeStep={largeStep}
        locale={locale}
        max={max}
        min={min}
        name={name}
        onValueChange={(nextValue) => onValueChange?.(nextValue)}
        onValueCommitted={(nextValue) => onValueCommitted?.(nextValue)}
        readOnly={readOnly}
        required={required}
        smallStep={smallStep}
        snapOnStep={snapOnStep}
        step={step}
        value={value}
        {...props}
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
        <BaseNumberField.Group className={styles.group}>
          {showSteppers ? (
            <BaseNumberField.Decrement
              aria-label={label ? `Decrease ${label}` : "Decrease value"}
              className={styles.stepper}
              type="button"
            >
              -
            </BaseNumberField.Decrement>
          ) : null}
          <BaseNumberField.Input
            {...inputProps}
            aria-describedby={describedBy || undefined}
            aria-invalid={isInvalid || undefined}
            className={classNames(styles.input, inputProps?.className)}
            placeholder={placeholder}
          />
          {showSteppers ? (
            <BaseNumberField.Increment
              aria-label={label ? `Increase ${label}` : "Increase value"}
              className={styles.stepper}
              type="button"
            >
              +
            </BaseNumberField.Increment>
          ) : null}
        </BaseNumberField.Group>
        {error ? (
          <div className={styles.error} id={errorId}>
            {error}
          </div>
        ) : null}
      </BaseNumberField.Root>
    );
  },
);

NumberField.displayName = "NumberField";
