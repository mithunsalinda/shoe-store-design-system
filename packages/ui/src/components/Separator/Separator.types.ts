import type { HTMLAttributes } from "react";

export type SeparatorOrientation = "horizontal" | "vertical";
export type SeparatorSpacing = "none" | "xs" | "sm" | "md" | "lg";
export type SeparatorVariant = "subtle" | "strong";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
  spacing?: SeparatorSpacing;
  variant?: SeparatorVariant;
  decorative?: boolean;
}
