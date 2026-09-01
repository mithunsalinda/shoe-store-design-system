"use client";

import { Menu as BaseMenu } from "@base-ui/react/menu";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./DropdownMenu.module.css";
import type { DropdownMenuItem, DropdownMenuProps } from "./DropdownMenu.types";

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      align = "end",
      className,
      defaultOpen,
      disabled = false,
      items,
      loopFocus = true,
      modal = true,
      onOpenChange,
      open,
      showArrow = true,
      side = "bottom",
      sideOffset = 8,
      size = "md",
      trigger,
      triggerClassName,
      ...props
    },
    ref,
  ) => (
    <BaseMenu.Root
      defaultOpen={defaultOpen}
      disabled={disabled}
      loopFocus={loopFocus}
      modal={modal}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
      open={open}
    >
      <BaseMenu.Trigger
        className={classNames(styles.trigger, triggerClassName)}
        disabled={disabled}
      >
        {trigger}
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className={styles.positioner}
          align={align}
          side={side}
          sideOffset={sideOffset}
        >
          <BaseMenu.Popup
            ref={ref}
            className={classNames(styles.popup, styles[size], className)}
            {...props}
          >
            {showArrow ? <BaseMenu.Arrow className={styles.arrow} /> : null}
            <div className={styles.items}>{items.map(renderItem)}</div>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  ),
);

DropdownMenu.displayName = "DropdownMenu";

function renderItem(item: DropdownMenuItem, index: number) {
  if (item.type === "separator") {
    return <BaseMenu.Separator key={`separator-${index}`} className={styles.separator} />;
  }

  if (item.type === "link") {
    return (
      <BaseMenu.LinkItem
        key={getItemKey(item.label, index)}
        className={styles.item}
        closeOnClick={item.closeOnClick ?? true}
        href={item.href}
      >
        <span className={styles.label}>{item.label}</span>
        {item.description ? <span className={styles.description}>{item.description}</span> : null}
      </BaseMenu.LinkItem>
    );
  }

  return (
    <BaseMenu.Item
      key={getItemKey(item.label, index)}
      className={classNames(styles.item, item.destructive && styles.destructive)}
      closeOnClick={item.closeOnClick ?? true}
      disabled={item.disabled ?? false}
      onClick={() => item.onSelect?.()}
    >
      <span className={styles.label}>{item.label}</span>
      {item.description ? <span className={styles.description}>{item.description}</span> : null}
    </BaseMenu.Item>
  );
}

function getItemKey(label: ReactNode, index: number) {
  if (typeof label === "string") {
    return `${label}-${index}`;
  }

  return index;
}
