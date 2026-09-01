"use client";

import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./ContextMenu.module.css";
import type { ContextMenuItem, ContextMenuProps } from "./ContextMenu.types";

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  (
    {
      align = "start",
      children,
      className,
      defaultOpen,
      disabled = false,
      items,
      loopFocus = true,
      onOpenChange,
      open,
      showArrow = false,
      side = "bottom",
      sideOffset = 8,
      size = "md",
      triggerClassName,
      ...props
    },
    ref,
  ) => (
    <BaseContextMenu.Root
      defaultOpen={defaultOpen}
      disabled={disabled}
      loopFocus={loopFocus}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
      open={open}
    >
      <BaseContextMenu.Trigger
        className={classNames(styles.trigger, disabled && styles.disabled, triggerClassName)}
        data-disabled={disabled ? "" : undefined}
      >
        {children}
      </BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner
          align={align}
          className={styles.positioner}
          side={side}
          sideOffset={sideOffset}
        >
          <BaseContextMenu.Popup
            ref={ref}
            className={classNames(styles.popup, styles[size], className)}
            {...props}
          >
            {showArrow ? <BaseContextMenu.Arrow className={styles.arrow} /> : null}
            <div className={styles.items}>{items.map(renderItem)}</div>
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  ),
);

ContextMenu.displayName = "ContextMenu";

function renderItem(item: ContextMenuItem, index: number) {
  if (item.type === "separator") {
    return <BaseContextMenu.Separator key={`separator-${index}`} className={styles.separator} />;
  }

  if (item.type === "link") {
    return (
      <BaseContextMenu.LinkItem
        key={getItemKey(item.label, index)}
        className={styles.item}
        closeOnClick={item.closeOnClick ?? true}
        href={item.href}
      >
        <span className={styles.label}>{item.label}</span>
        {item.description ? <span className={styles.description}>{item.description}</span> : null}
      </BaseContextMenu.LinkItem>
    );
  }

  return (
    <BaseContextMenu.Item
      key={getItemKey(item.label, index)}
      className={classNames(styles.item, item.destructive && styles.destructive)}
      closeOnClick={item.closeOnClick ?? true}
      disabled={item.disabled ?? false}
      onClick={() => item.onSelect?.()}
    >
      <span className={styles.label}>{item.label}</span>
      {item.description ? <span className={styles.description}>{item.description}</span> : null}
    </BaseContextMenu.Item>
  );
}

function getItemKey(label: ReactNode, index: number) {
  if (typeof label === "string") {
    return `${label}-${index}`;
  }

  return index;
}
