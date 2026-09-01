import type { HTMLAttributes } from "react";

export type SkeletonShape = "text" | "rectangle" | "circle";

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  shape?: SkeletonShape;
  width?: number | string;
  height?: number | string;
  lines?: number;
  animated?: boolean;
}
