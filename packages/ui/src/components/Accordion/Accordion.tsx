"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Accordion.module.css";
import type { AccordionProps } from "./Accordion.types";

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      defaultValue,
      disabled = false,
      items,
      keepMounted = false,
      multiple = false,
      onValueChange,
      size = "md",
      value,
      variant = "outlined",
      ...props
    },
    ref,
  ) => (
    <BaseAccordion.Root
      ref={ref}
      className={classNames(styles.root, styles[size], styles[variant], className)}
      defaultValue={defaultValue}
      disabled={disabled}
      keepMounted={keepMounted}
      multiple={multiple}
      onValueChange={(nextValue) => onValueChange?.(nextValue.map(String))}
      value={value}
      {...props}
    >
      {items.map((item) => (
        <BaseAccordion.Item
          key={item.value}
          className={styles.item}
          disabled={item.disabled ?? false}
          value={item.value}
        >
          <BaseAccordion.Header className={styles.header}>
            <BaseAccordion.Trigger className={styles.trigger}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.chevron} aria-hidden="true">
                v
              </span>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className={styles.panel} keepMounted={keepMounted}>
            <div className={styles.content}>{item.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  ),
);

Accordion.displayName = "Accordion";
