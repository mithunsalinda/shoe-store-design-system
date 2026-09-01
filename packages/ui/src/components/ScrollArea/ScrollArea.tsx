"use client";

import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./ScrollArea.module.css";
import type { ScrollAreaProps } from "./ScrollArea.types";

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      children,
      className,
      contentClassName,
      height,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      overflowEdgeThreshold = 8,
      scrollbarVisibility = "auto",
      showEdgeShadows = true,
      size = "md",
      style,
      viewportClassName,
      viewportRef,
      width,
      ...props
    },
    ref,
  ) => {
    const showScrollbars = scrollbarVisibility !== "none";
    const keepMounted = scrollbarVisibility === "always";

    return (
      <BaseScrollArea.Root
        ref={ref}
        className={classNames(
          styles.root,
          styles[size],
          showEdgeShadows && styles.edgeShadows,
          className,
        )}
        overflowEdgeThreshold={overflowEdgeThreshold}
        style={{
          height,
          maxHeight,
          maxWidth,
          minHeight,
          minWidth,
          width,
          ...style,
        }}
        {...props}
      >
        <BaseScrollArea.Viewport
          ref={viewportRef}
          className={classNames(styles.viewport, viewportClassName)}
        >
          <BaseScrollArea.Content className={classNames(styles.content, contentClassName)}>
            {children}
          </BaseScrollArea.Content>
        </BaseScrollArea.Viewport>
        {showScrollbars ? (
          <>
            <BaseScrollArea.Scrollbar
              className={classNames(styles.scrollbar, styles.vertical)}
              keepMounted={keepMounted}
              orientation="vertical"
            >
              <BaseScrollArea.Thumb className={styles.thumb} />
            </BaseScrollArea.Scrollbar>
            <BaseScrollArea.Scrollbar
              className={classNames(styles.scrollbar, styles.horizontal)}
              keepMounted={keepMounted}
              orientation="horizontal"
            >
              <BaseScrollArea.Thumb className={styles.thumb} />
            </BaseScrollArea.Scrollbar>
            <BaseScrollArea.Corner className={styles.corner} />
          </>
        ) : null}
      </BaseScrollArea.Root>
    );
  },
);

ScrollArea.displayName = "ScrollArea";
