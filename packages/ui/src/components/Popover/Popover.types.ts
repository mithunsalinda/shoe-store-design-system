import type { ReactNode } from "react";

export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";
export type PopoverSize = "sm" | "md";

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  trigger: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  side?: PopoverSide;
  align?: PopoverAlign;
  sideOffset?: number;
  size?: PopoverSize;
  modal?: boolean | "trap-focus";
  openOnHover?: boolean;
  delay?: number;
  closeDelay?: number;
  showArrow?: boolean;
  showCloseButton?: boolean;
  closeLabel?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  onOpenChange?: (open: boolean) => void;
}
