import type { ReactNode } from "react";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  textValue?: string;
}

export interface SelectProps {
  id?: string;
  name?: string;
  value?: string | null;
  defaultValue?: string | null;
  label?: ReactNode;
  description?: ReactNode;
  placeholder?: ReactNode;
  options: SelectOption[];
  selectSize?: SelectSize;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  className?: string;
  triggerClassName?: string;
  ariaLabel?: string;
  onValueChange?: (value: string | null) => void;
}
