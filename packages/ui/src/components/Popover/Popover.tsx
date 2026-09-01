"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Popover.module.css";
import type { PopoverProps } from "./Popover.types";

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      align = "center",
      children,
      className,
      closeDelay,
      closeLabel = "Close popover",
      contentClassName,
      defaultOpen,
      delay,
      description,
      footer,
      footerClassName,
      modal = false,
      onOpenChange,
      open,
      openOnHover = false,
      showArrow = true,
      showCloseButton = true,
      side = "bottom",
      sideOffset = 8,
      size = "md",
      title,
      trigger,
      triggerClassName,
    },
    ref,
  ) => {
    const hasHeader = title || description || showCloseButton;

    return (
      <BasePopover.Root
        open={open}
        defaultOpen={defaultOpen}
        modal={modal}
        onOpenChange={(nextOpen) => {
          onOpenChange?.(nextOpen);
        }}
      >
        <BasePopover.Trigger
          className={classNames(styles.trigger, triggerClassName)}
          openOnHover={openOnHover}
          delay={delay}
          closeDelay={closeDelay}
        >
          {trigger}
        </BasePopover.Trigger>

        <BasePopover.Portal>
          <BasePopover.Positioner
            className={styles.positioner}
            side={side}
            align={align}
            sideOffset={sideOffset}
          >
            <BasePopover.Popup
              ref={ref}
              className={classNames(styles.popup, styles[size], className)}
            >
              {showArrow ? <BasePopover.Arrow className={styles.arrow} /> : null}

              {hasHeader ? (
                <div className={styles.header}>
                  <div className={styles.intro}>
                    {title ? (
                      <BasePopover.Title className={styles.title}>{title}</BasePopover.Title>
                    ) : null}
                    {description ? (
                      <BasePopover.Description className={styles.description}>
                        {description}
                      </BasePopover.Description>
                    ) : null}
                  </div>
                  {showCloseButton ? (
                    <BasePopover.Close className={styles.close} aria-label={closeLabel}>
                      <CloseIcon />
                    </BasePopover.Close>
                  ) : null}
                </div>
              ) : null}

              {children ? (
                <div className={classNames(styles.content, contentClassName)}>{children}</div>
              ) : null}

              {footer ? (
                <div className={classNames(styles.footer, footerClassName)}>{footer}</div>
              ) : null}
            </BasePopover.Popup>
          </BasePopover.Positioner>
        </BasePopover.Portal>
      </BasePopover.Root>
    );
  },
);

Popover.displayName = "Popover";

function CloseIcon() {
  return (
    <svg className={styles.closeIcon} viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}
