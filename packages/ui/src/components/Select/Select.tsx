"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { forwardRef, useId } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Select.module.css";
import type { SelectOption, SelectProps } from "./Select.types";

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      ariaLabel,
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
      placeholder = "Select an option",
      readOnly = false,
      required = false,
      selectSize = "md",
      triggerClassName,
      value,
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const descriptionId = description ? `${selectId}-description` : undefined;

    return (
      <BaseSelect.Root
        id={selectId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        items={options.map((option) => ({ value: option.value, label: option.label }))}
        onValueChange={(nextValue) => {
          onValueChange?.(nextValue);
        }}
      >
        <div className={classNames(styles.root, disabled && styles.disabled, className)}>
          {label ? <BaseSelect.Label className={styles.label}>{label}</BaseSelect.Label> : null}
          {description ? (
            <div className={styles.description} id={descriptionId}>
              {description}
            </div>
          ) : null}
          <div className={styles.anchor}>
            <BaseSelect.Trigger
              ref={ref}
              className={classNames(styles.trigger, styles[selectSize], triggerClassName)}
              aria-label={label ? undefined : ariaLabel}
              aria-describedby={descriptionId}
              aria-invalid={invalid || undefined}
              data-invalid={invalid ? "" : undefined}
            >
              <BaseSelect.Value className={styles.value} placeholder={placeholder} />
              <BaseSelect.Icon className={styles.icon}>
                <ChevronIcon />
              </BaseSelect.Icon>
            </BaseSelect.Trigger>
          </div>
        </div>

        <BaseSelect.Portal>
          <BaseSelect.Positioner
            className={styles.positioner}
            alignItemWithTrigger={false}
            sideOffset={6}
          >
            <BaseSelect.Popup className={styles.popup}>
              <BaseSelect.List className={styles.list}>
                {options.map((option) => (
                  <BaseSelect.Item
                    key={option.value}
                    value={option.value}
                    label={getOptionText(option)}
                    disabled={option.disabled}
                    className={styles.item}
                  >
                    <span className={styles.itemContent}>
                      <BaseSelect.ItemText className={styles.itemText}>
                        <span className={styles.itemLabel}>{option.label}</span>
                        {option.description ? (
                          <span className={styles.itemDescription}>{option.description}</span>
                        ) : null}
                      </BaseSelect.ItemText>
                    </span>
                    <BaseSelect.ItemIndicator className={styles.itemIndicator} keepMounted>
                      <CheckIcon />
                    </BaseSelect.ItemIndicator>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    );
  },
);

Select.displayName = "Select";

function getOptionText(option: SelectOption) {
  if (option.textValue) {
    return option.textValue;
  }

  return typeof option.label === "string" ? option.label : option.value;
}

function ChevronIcon() {
  return (
    <svg className={styles.chevron} viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className={styles.check} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.25 8.25 6.5 11.5l6.25-7" />
    </svg>
  );
}
