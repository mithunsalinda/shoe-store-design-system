import type { HTMLAttributes, ReactNode, Ref } from "react";

export type ComboboxSize = "sm" | "md" | "lg";

export interface ComboboxOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  textValue?: string;
}

export interface ComboboxProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  options: ComboboxOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  name?: string;
  id?: string;
  inputRef?: Ref<HTMLInputElement>;
  comboboxSize?: ComboboxSize;
  clearLabel?: string;
  openLabel?: string;
}
