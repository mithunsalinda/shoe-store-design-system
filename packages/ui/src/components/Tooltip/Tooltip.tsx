"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { classNames } from "../../utils/classNames";
import styles from "./Tooltip.module.css";
import type { TooltipProps, TooltipProviderProps } from "./Tooltip.types";

export function TooltipProvider({ children, closeDelay, delay, timeout }: TooltipProviderProps) {
  return (
    <BaseTooltip.Provider delay={delay} closeDelay={closeDelay} timeout={timeout}>
      {children}
    </BaseTooltip.Provider>
  );
}

export function Tooltip({
  align = "center",
  ariaLabel,
  children,
  className,
  closeDelay,
  closeOnClick = true,
  content,
  defaultOpen,
  delay,
  disabled = false,
  onOpenChange,
  open,
  side = "top",
  sideOffset = 8,
  triggerClassName,
}: TooltipProps) {
  return (
    <BaseTooltip.Root
      open={open}
      defaultOpen={defaultOpen}
      disabled={disabled}
      onOpenChange={(nextOpen) => {
        onOpenChange?.(nextOpen);
      }}
    >
      <BaseTooltip.Trigger
        className={classNames(styles.trigger, triggerClassName)}
        aria-label={ariaLabel}
        delay={delay}
        closeDelay={closeDelay}
        closeOnClick={closeOnClick}
      >
        {children}
      </BaseTooltip.Trigger>
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          className={styles.positioner}
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BaseTooltip.Popup className={classNames(styles.popup, className)} role="tooltip">
            <BaseTooltip.Arrow className={styles.arrow} />
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
