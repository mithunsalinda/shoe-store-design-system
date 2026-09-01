import type { HTMLAttributes, ReactNode } from "react";

export type NavigationMenuAlign = "start" | "center" | "end";
export type NavigationMenuOrientation = "horizontal" | "vertical";
export type NavigationMenuSide = "top" | "right" | "bottom" | "left";
export type NavigationMenuSize = "sm" | "md";

export interface NavigationMenuLinkItem {
  label: ReactNode;
  href: string;
  description?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  closeOnClick?: boolean;
}

export interface NavigationMenuFeaturedItem {
  label: ReactNode;
  href: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
}

export type NavigationMenuItem =
  | {
      type?: "link";
      label: ReactNode;
      href: string;
      active?: boolean;
      disabled?: boolean;
    }
  | {
      type: "section";
      label: ReactNode;
      value: string;
      links: NavigationMenuLinkItem[];
      featured?: NavigationMenuFeaturedItem;
      disabled?: boolean;
    };

export interface NavigationMenuProps extends Omit<HTMLAttributes<HTMLElement>, "defaultValue"> {
  items: NavigationMenuItem[];
  align?: NavigationMenuAlign;
  closeDelay?: number;
  defaultValue?: string | null;
  delay?: number;
  onValueChange?: (value: string | null) => void;
  orientation?: NavigationMenuOrientation;
  popupClassName?: string;
  showArrow?: boolean;
  side?: NavigationMenuSide;
  sideOffset?: number;
  size?: NavigationMenuSize;
  value?: string | null;
}
