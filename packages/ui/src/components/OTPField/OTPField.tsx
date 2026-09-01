"use client";

import { OTPField as BaseOTPField } from "@base-ui/react/otp-field";
import { forwardRef, useId } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./OTPField.module.css";
import type { OTPFieldProps } from "./OTPField.types";

export const OTPField = forwardRef<HTMLDivElement, OTPFieldProps>(
  (
    {
      autoComplete,
      autoSubmit = false,
      className,
      defaultValue,
      description,
      disabled = false,
      error,
      form,
      id,
      inputMode,
      inputRef,
      invalid = false,
      label,
      length = 6,
      mask = false,
      name,
      normalizeValue,
      onValueChange,
      onValueComplete,
      onValueInvalid,
      readOnly = false,
      required = false,
      separatorEvery = 3,
      separatorLabel = "Code separator",
      size = "md",
      validationType = "numeric",
      value,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const labelId = label ? `${inputId}-label` : undefined;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");
    const isInvalid = invalid || Boolean(error);

    return (
      <BaseOTPField.Root
        ref={ref}
        aria-describedby={describedBy || undefined}
        aria-invalid={isInvalid || undefined}
        aria-labelledby={labelId}
        autoComplete={autoComplete}
        autoSubmit={autoSubmit}
        className={classNames(styles.root, styles[size], disabled && styles.disabled, className)}
        data-invalid={isInvalid ? "" : undefined}
        defaultValue={defaultValue}
        disabled={disabled}
        form={form}
        id={inputId}
        inputMode={inputMode}
        length={length}
        mask={mask}
        name={name}
        normalizeValue={normalizeValue}
        onValueChange={(nextValue) => onValueChange?.(nextValue)}
        onValueComplete={(nextValue) => onValueComplete?.(nextValue)}
        onValueInvalid={(nextValue) => onValueInvalid?.(nextValue)}
        readOnly={readOnly}
        required={required}
        validationType={validationType}
        value={value}
        {...props}
      >
        {label ? (
          <div className={styles.label} id={labelId}>
            {label}
            {required ? (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            ) : null}
          </div>
        ) : null}
        {description ? (
          <div className={styles.description} id={descriptionId}>
            {description}
          </div>
        ) : null}
        <div className={styles.inputs}>
          {Array.from({ length }, (_, index) => (
            <FragmentedInput
              key={index}
              index={index}
              inputRef={index === 0 ? inputRef : undefined}
              separatorEvery={separatorEvery}
              separatorLabel={separatorLabel}
            />
          ))}
        </div>
        {error ? (
          <div className={styles.error} id={errorId}>
            {error}
          </div>
        ) : null}
      </BaseOTPField.Root>
    );
  },
);

OTPField.displayName = "OTPField";

interface FragmentedInputProps {
  index: number;
  inputRef: OTPFieldProps["inputRef"];
  separatorEvery: number;
  separatorLabel: string;
}

function FragmentedInput({
  index,
  inputRef,
  separatorEvery,
  separatorLabel,
}: FragmentedInputProps) {
  const shouldRenderSeparator = separatorEvery > 0 && index > 0 && index % separatorEvery === 0;

  return (
    <>
      {shouldRenderSeparator ? (
        <span aria-label={separatorLabel} className={styles.separator} role="separator">
          -
        </span>
      ) : null}
      <BaseOTPField.Input
        ref={inputRef}
        {...(index === 0 ? {} : { "aria-label": `Digit ${index + 1}` })}
        className={styles.input}
      />
    </>
  );
}
