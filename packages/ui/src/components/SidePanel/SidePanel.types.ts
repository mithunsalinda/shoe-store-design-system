import type { HTMLAttributes, ReactNode } from "react";

export type SidePanelPosition = "left" | "right";
export type SidePanelSize = "sm" | "md" | "lg";
export type SidePanelVariant = "plain" | "bordered" | "elevated";

export interface SidePanelProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  position?: SidePanelPosition;
  size?: SidePanelSize;
  sticky?: boolean;
  variant?: SidePanelVariant;
  contentClassName?: string;
  footerClassName?: string;
  headerClassName?: string;
}
