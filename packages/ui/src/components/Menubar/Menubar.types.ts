import type { HTMLAttributes, ReactNode } from "react";

export type MenubarAlign = "start" | "center" | "end";
export type MenubarOrientation = "horizontal" | "vertical";
export type MenubarSize = "sm" | "md";

export type MenubarMenuItem =
  | {
      type?: "item";
      label: ReactNode;
      description?: ReactNode;
      disabled?: boolean;
      destructive?: boolean;
      closeOnClick?: boolean;
      onSelect?: () => void;
    }
  | {
      type: "link";
      label: ReactNode;
      description?: ReactNode;
      href: string;
      closeOnClick?: boolean;
    }
  | {
      type: "separator";
    };

export interface MenubarMenu {
  label: ReactNode;
  items: MenubarMenuItem[];
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface MenubarProps extends HTMLAttributes<HTMLDivElement> {
  menus: MenubarMenu[];
  align?: MenubarAlign;
  disabled?: boolean;
  loopFocus?: boolean;
  modal?: boolean;
  orientation?: MenubarOrientation;
  popupClassName?: string;
  showArrow?: boolean;
  sideOffset?: number;
  size?: MenubarSize;
}
