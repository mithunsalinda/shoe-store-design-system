import type { HTMLAttributes, InputHTMLAttributes, ReactNode, Ref } from "react";

export type OTPFieldSize = "sm" | "md" | "lg";
export type OTPFieldValidationType = "numeric" | "alpha" | "alphanumeric" | "none";

export interface OTPFieldProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onChange"
> {
  autoComplete?: string;
  autoSubmit?: boolean;
  defaultValue?: string;
  description?: ReactNode;
  disabled?: boolean;
  error?: ReactNode;
  form?: string;
  id?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  inputRef?: Ref<HTMLInputElement>;
  invalid?: boolean;
  label?: ReactNode;
  length?: number;
  mask?: boolean;
  name?: string;
  normalizeValue?: (value: string) => string;
  onValueChange?: (value: string) => void;
  onValueComplete?: (value: string) => void;
  onValueInvalid?: (value: string) => void;
  readOnly?: boolean;
  required?: boolean;
  separatorEvery?: number;
  separatorLabel?: string;
  size?: OTPFieldSize;
  validationType?: OTPFieldValidationType;
  value?: string;
}
