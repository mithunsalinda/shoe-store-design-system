import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export type ToolbarOrientation = "horizontal" | "vertical";
export type ToolbarSize = "sm" | "md";
export type ToolbarVariant = "plain" | "outlined";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  disabled?: boolean;
  loopFocus?: boolean;
  orientation?: ToolbarOrientation;
  size?: ToolbarSize;
  variant?: ToolbarVariant;
  ariaLabel?: string;
}

export interface ToolbarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  disabled?: boolean;
}

export interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  focusableWhenDisabled?: boolean;
}

export interface ToolbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export interface ToolbarInputProps extends InputHTMLAttributes<HTMLInputElement> {
  focusableWhenDisabled?: boolean;
}

export interface ToolbarSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: ToolbarOrientation;
}
