import type { HTMLAttributes, ReactNode } from "react";

export type ContextMenuAlign = "start" | "center" | "end";
export type ContextMenuSide = "top" | "right" | "bottom" | "left";
export type ContextMenuSize = "sm" | "md";

export type ContextMenuItem =
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

export interface ContextMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  align?: ContextMenuAlign;
  children?: ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  items: ContextMenuItem[];
  loopFocus?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  showArrow?: boolean;
  side?: ContextMenuSide;
  sideOffset?: number;
  size?: ContextMenuSize;
  triggerClassName?: string;
}
