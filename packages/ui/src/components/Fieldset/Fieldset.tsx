"use client";

import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { forwardRef, useId } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Fieldset.module.css";
import type { FieldsetProps } from "./Fieldset.types";

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (
    {
      children,
      className,
      density = "comfortable",
      description,
      disabled = false,
      error,
      legend,
      required = false,
      variant = "plain",
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const descriptionId = description ? `${generatedId}-description` : undefined;
    const errorId = error ? `${generatedId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");
    const invalid = Boolean(error);

    return (
      <BaseFieldset.Root
        ref={ref}
        aria-describedby={describedBy || undefined}
        aria-invalid={invalid || undefined}
        className={classNames(
          styles.root,
          styles[variant],
          styles[density],
          disabled && styles.disabled,
          className,
        )}
        data-invalid={invalid ? "" : undefined}
        disabled={disabled}
        {...props}
      >
        <div className={styles.header}>
          <BaseFieldset.Legend className={styles.legend}>
            <span>{legend}</span>
            {required ? (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            ) : null}
          </BaseFieldset.Legend>
          {description ? (
            <div className={styles.description} id={descriptionId}>
              {description}
            </div>
          ) : null}
        </div>
        <div className={styles.content}>{children}</div>
        {error ? (
          <div className={styles.error} id={errorId} role="alert">
            {error}
          </div>
        ) : null}
      </BaseFieldset.Root>
    );
  },
);

Fieldset.displayName = "Fieldset";
