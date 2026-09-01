import type { HTMLAttributes } from "react";

export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerIntent = "neutral" | "primary" | "success" | "warning" | "danger";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  intent?: SpinnerIntent;
  label?: string;
}
