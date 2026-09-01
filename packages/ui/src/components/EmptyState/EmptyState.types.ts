import type { HTMLAttributes, ReactNode } from "react";

export type EmptyStateAlign = "start" | "center";
export type EmptyStateDensity = "compact" | "comfortable";
export type EmptyStateTone = "neutral" | "info" | "success" | "warning" | "danger";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  media?: ReactNode;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  align?: EmptyStateAlign;
  as?: "section" | "div";
  density?: EmptyStateDensity;
  tone?: EmptyStateTone;
}
