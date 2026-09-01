import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      leftIcon,
      loading = false,
      loadingLabel = "Loading",
      rightIcon,
      size = "md",
      type,
      variant = "primary",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={classNames(
          styles.button,
          styles[variant],
          styles[size],
          loading && styles.loading,
          className,
        )}
        data-loading={loading ? "" : undefined}
        disabled={isDisabled}
        type={type ?? "button"}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          leftIcon && (
            <span className={styles.icon} aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}
        <span className={styles.content}>{children}</span>
        {loading ? <span className={styles.visuallyHidden}>{loadingLabel}</span> : null}
        {!loading && rightIcon ? (
          <span className={styles.icon} aria-hidden="true">
            {rightIcon}
          </span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = "Button";
