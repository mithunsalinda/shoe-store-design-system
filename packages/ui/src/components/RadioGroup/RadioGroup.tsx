"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { forwardRef, useId } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./RadioGroup.module.css";
import type { RadioGroupProps } from "./RadioGroup.types";

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      defaultValue,
      description,
      disabled = false,
      id,
      invalid = false,
      label,
      name,
      onValueChange,
      options,
      orientation = "vertical",
      readOnly = false,
      required = false,
      value,
    },
    ref,
  ) => {
    const generatedId = useId();
    const groupId = id ?? generatedId;
    const labelId = label ? `${groupId}-label` : undefined;
    const descriptionId = description ? `${groupId}-description` : undefined;

    return (
      <div
        className={classNames(
          styles.root,
          styles[orientation],
          disabled && styles.disabled,
          className,
        )}
      >
        {label ? (
          <div className={styles.groupLabel} id={labelId}>
            {label}
          </div>
        ) : null}
        {description ? (
          <div className={styles.groupDescription} id={descriptionId}>
            {description}
          </div>
        ) : null}

        <BaseRadioGroup
          ref={ref}
          name={name}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          aria-invalid={invalid || undefined}
          className={styles.group}
          data-invalid={invalid ? "" : undefined}
          data-orientation={orientation}
          onValueChange={(nextValue) => {
            onValueChange?.(nextValue);
          }}
        >
          {options.map((option) => (
            <label
              key={option.value}
              className={classNames(styles.item, option.disabled && styles.optionDisabled)}
            >
              <Radio.Root
                value={option.value}
                disabled={option.disabled}
                className={styles.control}
                data-invalid={invalid ? "" : undefined}
              >
                <Radio.Indicator className={styles.indicator} keepMounted />
              </Radio.Root>
              <span className={styles.text}>
                <span className={styles.label}>{option.label}</span>
                {option.description ? (
                  <span className={styles.description}>{option.description}</span>
                ) : null}
              </span>
            </label>
          ))}
        </BaseRadioGroup>
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
