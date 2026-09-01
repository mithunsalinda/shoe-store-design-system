"use client";

import { Slider as BaseSlider } from "@base-ui/react/slider";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Slider.module.css";
import type { SliderProps, SliderValue } from "./Slider.types";

const DEFAULT_VALUE = 50;

function getValueCount(value: SliderValue | undefined): number {
  return Array.isArray(value) ? value.length : 1;
}

function formatOutput(formattedValues: readonly string[], suffix: string): string {
  return `${formattedValues.join(" - ")}${suffix}`;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      defaultValue = DEFAULT_VALUE,
      description,
      disabled = false,
      invalid = false,
      label,
      largeStep,
      max = 100,
      min = 0,
      minStepsBetweenValues = 0,
      name,
      onValueChange,
      onValueCommitted,
      orientation = "horizontal",
      showValue = true,
      size = "md",
      step = 1,
      thumbLabels,
      value,
      valueSuffix = "",
      ...props
    },
    ref,
  ) => {
    const valueCount = getValueCount(value ?? defaultValue);

    return (
      <BaseSlider.Root
        ref={ref}
        className={classNames(
          styles.root,
          styles[orientation],
          styles[size],
          disabled && styles.disabled,
          className,
        )}
        data-invalid={invalid ? "" : undefined}
        defaultValue={defaultValue}
        disabled={disabled}
        largeStep={largeStep}
        max={max}
        min={min}
        minStepsBetweenValues={minStepsBetweenValues}
        name={name}
        onValueChange={(nextValue) => onValueChange?.(nextValue)}
        onValueCommitted={(nextValue) => onValueCommitted?.(nextValue)}
        orientation={orientation}
        step={step}
        value={value}
        {...props}
      >
        {label || showValue ? (
          <div className={styles.header}>
            {label ? <BaseSlider.Label className={styles.label}>{label}</BaseSlider.Label> : null}
            {showValue ? (
              <BaseSlider.Value className={styles.value}>
                {(formattedValues) => formatOutput(formattedValues, valueSuffix)}
              </BaseSlider.Value>
            ) : null}
          </div>
        ) : null}
        {description ? <div className={styles.description}>{description}</div> : null}
        <BaseSlider.Control className={styles.control}>
          <BaseSlider.Track className={styles.track}>
            <BaseSlider.Indicator className={styles.indicator} />
            {Array.from({ length: valueCount }, (_, index) => (
              <BaseSlider.Thumb
                key={index}
                aria-label={thumbLabels?.[index] ?? label ?? `Slider thumb ${index + 1}`}
                className={styles.thumb}
                index={index}
              />
            ))}
          </BaseSlider.Track>
        </BaseSlider.Control>
      </BaseSlider.Root>
    );
  },
);

Slider.displayName = "Slider";
