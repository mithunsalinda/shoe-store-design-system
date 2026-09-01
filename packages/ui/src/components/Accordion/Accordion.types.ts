import type { HTMLAttributes, ReactNode } from "react";

export interface AccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export type AccordionSize = "sm" | "md";
export type AccordionVariant = "plain" | "outlined";

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: AccordionItem[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  keepMounted?: boolean;
  size?: AccordionSize;
  variant?: AccordionVariant;
}
