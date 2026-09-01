import type { HTMLAttributes, ReactNode } from "react";

export type BadgeIntent = "neutral" | "info" | "success" | "warning" | "danger";
export type BadgeVariant = "soft" | "solid" | "outline";
export type BadgeSize = "sm" | "md";
export type BadgeShape = "rounded" | "pill";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  intent?: BadgeIntent;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  dot?: boolean;
  count?: number;
  max?: number;
  showZero?: boolean;
  ariaLabel?: string;
}
