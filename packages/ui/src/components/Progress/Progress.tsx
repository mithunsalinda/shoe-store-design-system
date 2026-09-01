"use client";

import { Meter as BaseMeter } from "@base-ui/react/meter";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Progress.module.css";
import type { MeterProps, ProgressProps } from "./Progress.types";

function formatProgressValue(formattedValue: string | null, value: number | null) {
  if (value == null) {
    return "Loading";
  }

  return formattedValue;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      description,
      format,
      getAriaValueText,
      intent = "info",
      label,
      locale,
      max = 100,
      min = 0,
      showValue = true,
      size = "md",
      value,
      valueLabel,
      ...props
    },
    ref,
  ) => {
    return (
      <BaseProgress.Root
        ref={ref}
        className={classNames(styles.root, styles[size], styles[intent], className)}
        format={format}
        getAriaValueText={getAriaValueText}
        locale={locale}
        max={max}
        min={min}
        value={value}
        {...props}
      >
        {label || showValue ? (
          <div className={styles.header}>
            {label ? (
              <BaseProgress.Label className={styles.label}>{label}</BaseProgress.Label>
            ) : null}
            {showValue ? (
              <BaseProgress.Value className={styles.value}>
                {(formattedValue, currentValue) =>
                  valueLabel ?? formatProgressValue(formattedValue, currentValue)
                }
              </BaseProgress.Value>
            ) : null}
          </div>
        ) : null}
        {description ? <div className={styles.description}>{description}</div> : null}
        <BaseProgress.Track className={styles.track}>
          <BaseProgress.Indicator className={styles.indicator} />
        </BaseProgress.Track>
      </BaseProgress.Root>
    );
  },
);

Progress.displayName = "Progress";

export const Meter = forwardRef<HTMLDivElement, MeterProps>(
  (
    {
      className,
      description,
      format,
      getAriaValueText,
      intent = "success",
      label,
      locale,
      max = 100,
      min = 0,
      showValue = true,
      size = "md",
      value,
      valueLabel,
      ...props
    },
    ref,
  ) => {
    return (
      <BaseMeter.Root
        ref={ref}
        className={classNames(styles.root, styles[size], styles[intent], className)}
        format={format}
        getAriaValueText={getAriaValueText}
        locale={locale}
        max={max}
        min={min}
        value={value}
        {...props}
      >
        {label || showValue ? (
          <div className={styles.header}>
            {label ? <BaseMeter.Label className={styles.label}>{label}</BaseMeter.Label> : null}
            {showValue ? (
              <BaseMeter.Value className={styles.value}>
                {(formattedValue) => valueLabel ?? formattedValue}
              </BaseMeter.Value>
            ) : null}
          </div>
        ) : null}
        {description ? <div className={styles.description}>{description}</div> : null}
        <BaseMeter.Track className={styles.track}>
          <BaseMeter.Indicator className={styles.indicator} />
        </BaseMeter.Track>
      </BaseMeter.Root>
    );
  },
);

Meter.displayName = "Meter";
