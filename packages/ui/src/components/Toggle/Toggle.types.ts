import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type ToggleSize = "sm" | "md";
export type ToggleVariant = "plain" | "outlined";
export type ToggleGroupOrientation = "horizontal" | "vertical";

export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "value"
> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  size?: ToggleSize;
  variant?: ToggleVariant;
  value?: string;
}

export interface ToggleGroupItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface ToggleGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: ToggleGroupItem[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  loopFocus?: boolean;
  orientation?: ToggleGroupOrientation;
  size?: ToggleSize;
  variant?: ToggleVariant;
  ariaLabel?: string;
}
