import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Skeleton.module.css";
import type { SkeletonProps } from "./Skeleton.types";

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  (
    { animated = true, className, height, lines = 1, shape = "rectangle", style, width, ...props },
    ref,
  ) => {
    const count = Math.max(1, Math.floor(lines));
    const skeletonStyle = {
      width,
      height,
      ...style,
    };

    if (shape === "text" && count > 1) {
      return (
        <span
          ref={ref}
          className={classNames(styles.group, className)}
          aria-hidden="true"
          {...props}
        >
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              className={classNames(styles.skeleton, styles.text, animated && styles.animated)}
              style={{
                ...skeletonStyle,
                width: index === count - 1 ? "72%" : width,
              }}
            />
          ))}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        className={classNames(
          styles.skeleton,
          styles[shape],
          animated && styles.animated,
          className,
        )}
        style={skeletonStyle}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
