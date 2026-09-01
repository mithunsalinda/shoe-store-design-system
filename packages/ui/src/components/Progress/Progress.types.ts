import type { HTMLAttributes, ReactNode } from "react";

export type ProgressIntent = "neutral" | "info" | "success" | "warning" | "danger";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  description?: ReactNode;
  format?: Intl.NumberFormatOptions;
  getAriaValueText?: (formattedValue: string, value: number | null) => string;
  intent?: ProgressIntent;
  label?: ReactNode;
  locale?: Intl.LocalesArgument;
  max?: number;
  min?: number;
  showValue?: boolean;
  size?: ProgressSize;
  value: number | null;
  valueLabel?: ReactNode;
}

export interface MeterProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  description?: ReactNode;
  format?: Intl.NumberFormatOptions;
  getAriaValueText?: (formattedValue: string, value: number) => string;
  intent?: ProgressIntent;
  label?: ReactNode;
  locale?: Intl.LocalesArgument;
  max?: number;
  min?: number;
  showValue?: boolean;
  size?: ProgressSize;
  value: number;
  valueLabel?: ReactNode;
}
