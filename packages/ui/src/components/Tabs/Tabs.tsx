"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Tabs.module.css";
import type { TabsProps } from "./Tabs.types";

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      ariaLabel,
      className,
      defaultValue,
      items,
      keepMounted = false,
      listClassName,
      onValueChange,
      orientation = "horizontal",
      panelClassName,
      value,
      variant = "line",
    },
    ref,
  ) => {
    return (
      <BaseTabs.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        orientation={orientation}
        className={classNames(styles.root, styles[variant], styles[orientation], className)}
        onValueChange={(nextValue) => {
          onValueChange?.(typeof nextValue === "string" ? nextValue : null);
        }}
      >
        <BaseTabs.List className={classNames(styles.list, listClassName)} aria-label={ariaLabel}>
          {items.map((item) => (
            <BaseTabs.Tab
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={styles.tab}
            >
              {item.label}
            </BaseTabs.Tab>
          ))}
          <BaseTabs.Indicator className={styles.indicator} />
        </BaseTabs.List>
        <div className={styles.panelViewport}>
          {items.map((item) => (
            <BaseTabs.Panel
              key={item.value}
              value={item.value}
              keepMounted={keepMounted}
              className={classNames(styles.panel, panelClassName)}
            >
              {item.content}
            </BaseTabs.Panel>
          ))}
        </div>
      </BaseTabs.Root>
    );
  },
);

Tabs.displayName = "Tabs";
