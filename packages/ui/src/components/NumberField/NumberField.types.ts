import type { HTMLAttributes, InputHTMLAttributes, Ref } from "react";

export type NumberFieldSize = "sm" | "md" | "lg";

export interface NumberFieldProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  value?: number | null;
  defaultValue?: number;
  onValueChange?: (value: number | null) => void;
  onValueCommitted?: (value: number | null) => void;
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  min?: number;
  max?: number;
  step?: number | "any";
  smallStep?: number;
  largeStep?: number;
  allowOutOfRange?: boolean;
  allowWheelScrub?: boolean;
  snapOnStep?: boolean;
  format?: Intl.NumberFormatOptions;
  locale?: Intl.LocalesArgument;
  name?: string;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "disabled" | "value">;
  inputRef?: Ref<HTMLInputElement>;
  size?: NumberFieldSize;
  showSteppers?: boolean;
}
