"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Dialog.module.css";
import type { DialogProps } from "./Dialog.types";

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      children,
      className,
      closeLabel = "Close dialog",
      contentClassName,
      defaultOpen,
      description,
      disablePointerDismissal = false,
      footer,
      footerClassName,
      modal = true,
      onOpenChange,
      open,
      showCloseButton = true,
      size = "md",
      title,
      trigger,
      triggerClassName,
    },
    ref,
  ) => {
    return (
      <BaseDialog.Root
        open={open}
        defaultOpen={defaultOpen}
        modal={modal}
        disablePointerDismissal={disablePointerDismissal}
        onOpenChange={(nextOpen) => {
          onOpenChange?.(nextOpen);
        }}
      >
        {trigger ? (
          <BaseDialog.Trigger className={classNames(styles.trigger, triggerClassName)}>
            {trigger}
          </BaseDialog.Trigger>
        ) : null}

        <BaseDialog.Portal>
          <BaseDialog.Backdrop className={styles.backdrop} />
          <BaseDialog.Viewport className={styles.viewport}>
            <BaseDialog.Popup
              ref={ref}
              className={classNames(styles.popup, styles[size], className)}
            >
              <div className={styles.header}>
                <div className={styles.intro}>
                  <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
                  {description ? (
                    <BaseDialog.Description className={styles.description}>
                      {description}
                    </BaseDialog.Description>
                  ) : null}
                </div>
                {showCloseButton ? (
                  <BaseDialog.Close className={styles.close} aria-label={closeLabel}>
                    <CloseIcon />
                  </BaseDialog.Close>
                ) : null}
              </div>

              {children ? (
                <div className={classNames(styles.content, contentClassName)}>{children}</div>
              ) : null}

              {footer ? (
                <div className={classNames(styles.footer, footerClassName)}>{footer}</div>
              ) : null}
            </BaseDialog.Popup>
          </BaseDialog.Viewport>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    );
  },
);

Dialog.displayName = "Dialog";

function CloseIcon() {
  return (
    <svg className={styles.closeIcon} viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}
