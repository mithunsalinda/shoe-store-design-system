import type { ChangeEventHandler, FocusEventHandler, InputHTMLAttributes, ReactNode } from "react";

export type DatePickerSize = "sm" | "md" | "lg";

export interface DatePickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "aria-describedby" | "aria-invalid" | "children" | "className" | "onChange" | "size" | "type"
> {
  className?: string;
  datePickerSize?: DatePickerSize;
  description?: ReactNode;
  error?: ReactNode;
  inputClassName?: string;
  invalid?: boolean;
  label?: ReactNode;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onValueChange?: (value: string) => void;
  clearLabel?: string;
  showClearButton?: boolean;
}
