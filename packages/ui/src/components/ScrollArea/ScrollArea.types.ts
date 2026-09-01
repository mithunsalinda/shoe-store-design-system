import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";

export type ScrollAreaScrollbarVisibility = "auto" | "always" | "none";
export type ScrollAreaSize = "sm" | "md" | "lg";

export interface ScrollAreaProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?: ReactNode;
  contentClassName?: string;
  height?: CSSProperties["height"];
  maxHeight?: CSSProperties["maxHeight"];
  maxWidth?: CSSProperties["maxWidth"];
  minHeight?: CSSProperties["minHeight"];
  minWidth?: CSSProperties["minWidth"];
  overflowEdgeThreshold?:
    | number
    | Partial<{
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
      }>;
  scrollbarVisibility?: ScrollAreaScrollbarVisibility;
  showEdgeShadows?: boolean;
  size?: ScrollAreaSize;
  viewportClassName?: string;
  viewportRef?: Ref<HTMLDivElement>;
  width?: CSSProperties["width"];
}
