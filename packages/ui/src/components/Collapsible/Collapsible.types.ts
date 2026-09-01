import type { HTMLAttributes, ReactNode } from "react";

export type CollapsibleSize = "sm" | "md";
export type CollapsibleVariant = "plain" | "outlined";

export interface CollapsibleProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "content" | "title"
> {
  title: ReactNode;
  content: ReactNode;
  description?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  keepMounted?: boolean;
  hiddenUntilFound?: boolean;
  size?: CollapsibleSize;
  variant?: CollapsibleVariant;
}
