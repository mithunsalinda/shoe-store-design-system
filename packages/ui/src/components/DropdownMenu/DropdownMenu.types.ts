import type { HTMLAttributes, ReactNode } from "react";

export type DropdownMenuAlign = "start" | "center" | "end";
export type DropdownMenuSide = "top" | "right" | "bottom" | "left";
export type DropdownMenuSize = "sm" | "md";

export type DropdownMenuItem =
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

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  modal?: boolean;
  loopFocus?: boolean;
  align?: DropdownMenuAlign;
  side?: DropdownMenuSide;
  sideOffset?: number;
  size?: DropdownMenuSize;
  showArrow?: boolean;
  triggerClassName?: string;
}
