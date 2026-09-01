import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "rounded";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  name?: string;
  src?: string;
  alt?: string;
  initials?: string;
  fallback?: ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: ReactNode;
  fallbackDelay?: number;
  imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "src">;
  onLoadingStatusChange?: (status: "idle" | "loading" | "loaded" | "error") => void;
}
