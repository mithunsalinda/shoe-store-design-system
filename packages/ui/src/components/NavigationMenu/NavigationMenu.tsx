"use client";

import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./NavigationMenu.module.css";
import type {
  NavigationMenuFeaturedItem,
  NavigationMenuItem,
  NavigationMenuLinkItem,
  NavigationMenuProps,
} from "./NavigationMenu.types";

export const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(
  (
    {
      align = "center",
      className,
      closeDelay,
      defaultValue,
      delay,
      items,
      onValueChange,
      orientation = "horizontal",
      popupClassName,
      showArrow = true,
      side = "bottom",
      sideOffset = 10,
      size = "md",
      value,
      ...props
    },
    ref,
  ) => (
    <BaseNavigationMenu.Root
      ref={ref}
      className={classNames(styles.root, styles[orientation], styles[size], className)}
      closeDelay={closeDelay}
      defaultValue={defaultValue}
      delay={delay}
      onValueChange={(nextValue) => onValueChange?.(nextValue)}
      orientation={orientation}
      value={value}
      {...props}
    >
      <BaseNavigationMenu.List className={styles.list}>
        {items.map((item, index) => renderNavigationItem(item, index))}
      </BaseNavigationMenu.List>
      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner
          align={align}
          className={styles.positioner}
          side={side}
          sideOffset={sideOffset}
        >
          <BaseNavigationMenu.Popup className={classNames(styles.popup, popupClassName)}>
            {showArrow ? <BaseNavigationMenu.Arrow className={styles.arrow} /> : null}
            <BaseNavigationMenu.Viewport className={styles.viewport} />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  ),
);

NavigationMenu.displayName = "NavigationMenu";

function renderNavigationItem(item: NavigationMenuItem, index: number) {
  if (item.type === "section") {
    return (
      <BaseNavigationMenu.Item
        key={getItemKey(item.label, index)}
        className={styles.item}
        value={item.value}
      >
        <BaseNavigationMenu.Trigger className={styles.trigger} disabled={item.disabled ?? false}>
          <span>{item.label}</span>
          <BaseNavigationMenu.Icon className={styles.icon}>⌄</BaseNavigationMenu.Icon>
        </BaseNavigationMenu.Trigger>
        <BaseNavigationMenu.Content className={styles.content}>
          <div className={styles.panel}>
            {item.featured ? renderFeaturedItem(item.featured) : null}
            <div className={styles.links}>{item.links.map(renderLinkItem)}</div>
          </div>
        </BaseNavigationMenu.Content>
      </BaseNavigationMenu.Item>
    );
  }

  return (
    <BaseNavigationMenu.Item key={getItemKey(item.label, index)} className={styles.item}>
      <BaseNavigationMenu.Link
        active={item.active ?? false}
        aria-disabled={item.disabled ? "true" : undefined}
        className={styles.topLink}
        href={item.href}
      >
        {item.label}
      </BaseNavigationMenu.Link>
    </BaseNavigationMenu.Item>
  );
}

function renderFeaturedItem(item: NavigationMenuFeaturedItem) {
  return (
    <BaseNavigationMenu.Link className={styles.featured} closeOnClick href={item.href}>
      {item.eyebrow ? <span className={styles.eyebrow}>{item.eyebrow}</span> : null}
      <span className={styles.featuredLabel}>{item.label}</span>
      {item.description ? (
        <span className={styles.featuredDescription}>{item.description}</span>
      ) : null}
    </BaseNavigationMenu.Link>
  );
}

function renderLinkItem(item: NavigationMenuLinkItem, index: number) {
  return (
    <BaseNavigationMenu.Link
      key={getItemKey(item.label, index)}
      active={item.active ?? false}
      aria-disabled={item.disabled ? "true" : undefined}
      className={styles.link}
      closeOnClick={item.closeOnClick ?? true}
      href={item.href}
    >
      <span className={styles.linkLabel}>{item.label}</span>
      {item.description ? <span className={styles.linkDescription}>{item.description}</span> : null}
    </BaseNavigationMenu.Link>
  );
}

function getItemKey(label: ReactNode, index: number) {
  if (typeof label === "string") {
    return `${label}-${index}`;
  }

  return index;
}
