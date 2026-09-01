import type { ReactNode } from "react";

export type DrawerSide = "top" | "right" | "bottom" | "left";
export type DrawerSize = "sm" | "md" | "lg" | "full";

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  trigger?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  side?: DrawerSide;
  size?: DrawerSize;
  modal?: boolean | "trap-focus";
  disablePointerDismissal?: boolean;
  showCloseButton?: boolean;
  closeLabel?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  onOpenChange?: (open: boolean) => void;
}
