import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Badge.module.css";
import type { BadgeProps } from "./Badge.types";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      ariaLabel,
      children,
      className,
      count,
      dot = false,
      intent = "neutral",
      max = 99,
      shape = "pill",
      showZero = false,
      size = "md",
      variant = "soft",
      ...props
    },
    ref,
  ) => {
    const hasCount = typeof count === "number";
    const isHiddenCount = hasCount && count === 0 && !showZero;
    const content = hasCount ? formatCount(count, max) : children;
    const isDotOnly = dot && !content;

    if (isHiddenCount) {
      return null;
    }

    return (
      <span
        ref={ref}
        className={classNames(
          styles.badge,
          styles[intent],
          styles[variant],
          styles[size],
          styles[shape],
          dot && styles.withDot,
          isDotOnly && styles.dotOnly,
          className,
        )}
        aria-label={ariaLabel}
        {...props}
      >
        {dot ? <span className={styles.dot} aria-hidden="true" /> : null}
        {content ? <span className={styles.content}>{content}</span> : null}
      </span>
    );
  },
);

Badge.displayName = "Badge";

function formatCount(count: number, max: number) {
  return count > max ? `${max}+` : count.toLocaleString();
}
