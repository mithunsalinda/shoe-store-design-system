import type { HTMLAttributes, ReactNode } from "react";

export type AlertIntent = "neutral" | "info" | "success" | "warning" | "danger";
export type AlertVariant = "soft" | "outline";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  children?: ReactNode;
  intent?: AlertIntent;
  variant?: AlertVariant;
  icon?: ReactNode;
  action?: ReactNode;
  dismissible?: boolean;
  closeLabel?: string;
  onDismiss?: () => void;
}
