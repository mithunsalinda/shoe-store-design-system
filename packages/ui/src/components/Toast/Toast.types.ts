import type { ReactNode } from "react";
import type {
  ToastManagerAddOptions,
  ToastManagerPromiseOptions,
  ToastManagerUpdateOptions,
  ToastObject,
  UseToastManagerReturnValue,
} from "@base-ui/react/toast";

export type ToastPlacement =
  "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export type ToastIntent = "info" | "success" | "warning" | "error" | (string & {});

export type ToastOptions<Data extends object = Record<string, never>> =
  ToastManagerAddOptions<Data>;
export type ToastUpdateOptions<Data extends object = Record<string, never>> =
  ToastManagerUpdateOptions<Data>;
export type ToastPromiseOptions<
  Value,
  Data extends object = Record<string, never>,
> = ToastManagerPromiseOptions<Value, Data>;
export type ToastItem<Data extends object = Record<string, never>> = ToastObject<Data>;
export type ToastManager<Data extends object = Record<string, never>> =
  UseToastManagerReturnValue<Data>;

export interface ToastProviderProps {
  children?: ReactNode;
  limit?: number;
  timeout?: number;
}

export interface ToastViewportProps {
  placement?: ToastPlacement;
  className?: string;
  toastClassName?: string;
  closeLabel?: string;
  swipeDirection?: "up" | "down" | "left" | "right" | ("up" | "down" | "left" | "right")[];
}
