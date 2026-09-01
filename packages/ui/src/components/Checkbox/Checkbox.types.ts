import type { ReactNode } from "react";

export interface CheckboxProps {
  id?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
}
