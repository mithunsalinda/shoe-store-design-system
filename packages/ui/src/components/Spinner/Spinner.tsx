import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Spinner.module.css";
import type { SpinnerProps } from "./Spinner.types";

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, intent = "primary", label = "Loading", size = "md", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={classNames(styles.spinner, styles[intent], styles[size], className)}
        role="status"
        aria-label={label}
        {...props}
      />
    );
  },
);

Spinner.displayName = "Spinner";
