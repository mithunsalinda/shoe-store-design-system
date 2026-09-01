import type { HTMLAttributes } from "react";

export type SliderOrientation = "horizontal" | "vertical";
export type SliderSize = "sm" | "md";
export type SliderValue = number | number[];

export interface SliderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  value?: SliderValue;
  defaultValue?: SliderValue;
  onValueChange?: (value: SliderValue) => void;
  onValueCommitted?: (value: SliderValue) => void;
  label?: string;
  description?: string;
  showValue?: boolean;
  valueSuffix?: string;
  thumbLabels?: string[];
  disabled?: boolean;
  invalid?: boolean;
  min?: number;
  max?: number;
  step?: number;
  largeStep?: number;
  minStepsBetweenValues?: number;
  name?: string;
  orientation?: SliderOrientation;
  size?: SliderSize;
}
