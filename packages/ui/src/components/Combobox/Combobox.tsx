"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { forwardRef, useId } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Combobox.module.css";
import type { ComboboxOption, ComboboxProps } from "./Combobox.types";

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      className,
      clearLabel = "Clear selection",
      comboboxSize = "md",
      defaultInputValue,
      defaultValue,
      description,
      disabled = false,
      emptyMessage = "No options found.",
      error,
      id,
      inputRef,
      inputValue,
      invalid = false,
      label,
      name,
      onInputValueChange,
      onValueChange,
      openLabel = "Open options",
      options,
      placeholder = "Search options",
      readOnly = false,
      required = false,
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
    const selectedValue = findOption(options, value);
    const defaultSelectedValue = findOption(options, defaultValue);
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");

    return (
      <BaseCombobox.Root<ComboboxOption>
        defaultInputValue={defaultInputValue}
        defaultValue={defaultSelectedValue}
        disabled={disabled}
        inputRef={inputRef}
        inputValue={inputValue}
        isItemEqualToValue={(item, selectedItem) => item.value === selectedItem.value}
        itemToStringLabel={getOptionText}
        itemToStringValue={(option) => option.value}
        name={name}
        onInputValueChange={(nextInputValue) => onInputValueChange?.(nextInputValue)}
        onValueChange={(nextValue) => onValueChange?.(nextValue?.value ?? null)}
        readOnly={readOnly}
        required={required}
        value={selectedValue}
        items={options}
      >
        <div
          ref={ref}
          className={classNames(styles.root, disabled && styles.disabled, className)}
          data-invalid={isInvalid ? "" : undefined}
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
          <BaseCombobox.InputGroup className={classNames(styles.inputGroup, styles[comboboxSize])}>
            <BaseCombobox.Input
              aria-describedby={describedBy || undefined}
              aria-invalid={isInvalid || undefined}
              className={styles.input}
              id={inputId}
              placeholder={placeholder}
            />
            <div className={styles.actions}>
              <BaseCombobox.Clear aria-label={clearLabel} className={styles.clear} type="button">
                <XIcon />
              </BaseCombobox.Clear>
              <BaseCombobox.Trigger aria-label={openLabel} className={styles.trigger} type="button">
                <ChevronIcon />
              </BaseCombobox.Trigger>
            </div>
          </BaseCombobox.InputGroup>
          {error ? (
            <div className={styles.error} id={errorId}>
              {error}
            </div>
          ) : null}
        </div>

        <BaseCombobox.Portal>
          <BaseCombobox.Positioner className={styles.positioner} sideOffset={6}>
            <BaseCombobox.Popup className={styles.popup}>
              <BaseCombobox.Empty className={styles.empty}>{emptyMessage}</BaseCombobox.Empty>
              <BaseCombobox.List className={styles.list}>
                {(option: ComboboxOption, index) => (
                  <BaseCombobox.Item
                    key={option.value}
                    className={styles.item}
                    disabled={option.disabled}
                    index={index}
                    value={option}
                  >
                    <BaseCombobox.ItemIndicator className={styles.itemIndicator} keepMounted>
                      <CheckIcon />
                    </BaseCombobox.ItemIndicator>
                    <span className={styles.itemText}>
                      <span className={styles.itemLabel}>{option.label}</span>
                      {option.description ? (
                        <span className={styles.itemDescription}>{option.description}</span>
                      ) : null}
                    </span>
                  </BaseCombobox.Item>
                )}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
    );
  },
);

Combobox.displayName = "Combobox";

function findOption(options: ComboboxOption[], value: string | null | undefined) {
  if (value == null) {
    return value;
  }

  return options.find((option) => option.value === value) ?? null;
}

function getOptionText(option: ComboboxOption) {
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

function XIcon() {
  return (
    <svg className={styles.x} viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4.5 4.5 7 7m-7 0 7-7" />
    </svg>
  );
}
