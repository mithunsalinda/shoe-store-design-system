import type { ReactNode } from "react";

export type TooltipSide = "top" | "right" | "bottom" | "left";
export type TooltipAlign = "start" | "center" | "end";

export interface TooltipProviderProps {
  children?: ReactNode;
  delay?: number;
  closeDelay?: number;
  timeout?: number;
}

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  ariaLabel?: string;
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  side?: TooltipSide;
  align?: TooltipAlign;
  sideOffset?: number;
  delay?: number;
  closeDelay?: number;
  closeOnClick?: boolean;
  className?: string;
  triggerClassName?: string;
  onOpenChange?: (open: boolean) => void;
}
