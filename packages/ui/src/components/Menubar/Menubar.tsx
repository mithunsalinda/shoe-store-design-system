"use client";

import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Menubar.module.css";
import type { MenubarMenu, MenubarMenuItem, MenubarProps } from "./Menubar.types";

export const Menubar = forwardRef<HTMLDivElement, MenubarProps>(
  (
    {
      align = "start",
      className,
      disabled = false,
      loopFocus = true,
      menus,
      modal = true,
      orientation = "horizontal",
      popupClassName,
      showArrow = false,
      sideOffset = 8,
      size = "md",
      ...props
    },
    ref,
  ) => (
    <BaseMenubar
      ref={ref}
      className={classNames(styles.root, styles[orientation], styles[size], className)}
      disabled={disabled}
      loopFocus={loopFocus}
      modal={modal}
      orientation={orientation}
      {...props}
    >
      {menus.map((menu, index) => (
        <MenubarGroup
          key={getMenuKey(menu.label, index)}
          align={align}
          disabled={disabled || (menu.disabled ?? false)}
          menu={menu}
          popupClassName={popupClassName}
          showArrow={showArrow}
          sideOffset={sideOffset}
          size={size}
        />
      ))}
    </BaseMenubar>
  ),
);

Menubar.displayName = "Menubar";

interface MenubarGroupProps {
  align: MenubarProps["align"];
  disabled: boolean;
  menu: MenubarMenu;
  popupClassName?: string | undefined;
  showArrow: boolean;
  sideOffset: number;
  size: MenubarProps["size"];
}

function MenubarGroup({
  align,
  disabled,
  menu,
  popupClassName,
  showArrow,
  sideOffset,
  size,
}: MenubarGroupProps) {
  return (
    <BaseMenu.Root
      defaultOpen={menu.defaultOpen}
      disabled={disabled}
      loopFocus
      onOpenChange={(nextOpen) => menu.onOpenChange?.(nextOpen)}
      open={menu.open}
    >
      <BaseMenu.Trigger className={styles.trigger} disabled={disabled} openOnHover>
        {menu.label}
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          align={align}
          className={styles.positioner}
          side="bottom"
          sideOffset={sideOffset}
        >
          <BaseMenu.Popup
            className={classNames(styles.popup, styles[size ?? "md"], popupClassName)}
          >
            {showArrow ? <BaseMenu.Arrow className={styles.arrow} /> : null}
            <div className={styles.items}>{menu.items.map(renderItem)}</div>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}

function renderItem(item: MenubarMenuItem, index: number) {
  if (item.type === "separator") {
    return <BaseMenu.Separator key={`separator-${index}`} className={styles.separator} />;
  }

  if (item.type === "link") {
    return (
      <BaseMenu.LinkItem
        key={getMenuKey(item.label, index)}
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
      key={getMenuKey(item.label, index)}
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

function getMenuKey(label: ReactNode, index: number) {
  if (typeof label === "string") {
    return `${label}-${index}`;
  }

  return index;
}
