import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Input.module.css";
import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize = "md", invalid = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={classNames(
          styles.input,
          styles[inputSize],
          invalid && styles.invalid,
          className,
        )}
        data-invalid={invalid ? "" : undefined}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
