import type { FieldsetHTMLAttributes, ReactNode } from "react";

export type FieldsetDensity = "compact" | "comfortable";
export type FieldsetVariant = "plain" | "outlined" | "filled";

export interface FieldsetProps extends Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "children"
> {
  children?: ReactNode;
  description?: ReactNode;
  density?: FieldsetDensity;
  error?: ReactNode;
  legend: ReactNode;
  required?: boolean;
  variant?: FieldsetVariant;
}
