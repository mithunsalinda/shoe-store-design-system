import type { ReactNode } from "react";

export type TabsOrientation = "horizontal" | "vertical";

export type TabsVariant = "line" | "contained";

export interface TabsItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  value?: string | null;
  defaultValue?: string | null;
  items: TabsItem[];
  orientation?: TabsOrientation;
  variant?: TabsVariant;
  keepMounted?: boolean;
  className?: string;
  listClassName?: string;
  panelClassName?: string;
  ariaLabel?: string;
  onValueChange?: (value: string | null) => void;
}
