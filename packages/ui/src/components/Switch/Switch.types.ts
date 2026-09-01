import type { ReactNode } from "react";

export interface SwitchProps {
  id?: string;
  name?: string;
  value?: string;
  uncheckedValue?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
}
