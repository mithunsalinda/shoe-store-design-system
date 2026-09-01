import type { ReactNode } from "react";

export type RadioGroupOrientation = "vertical" | "horizontal";

export interface RadioGroupOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  label?: ReactNode;
  description?: ReactNode;
  options: RadioGroupOption[];
  orientation?: RadioGroupOrientation;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
}
