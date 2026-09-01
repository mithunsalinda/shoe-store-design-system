import type { ReactNode } from "react";

export type DialogSize = "sm" | "md" | "lg";

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  trigger?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: DialogSize;
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
