"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { classNames } from "../../utils/classNames";
import styles from "./Toast.module.css";
import type { ToastProviderProps, ToastViewportProps } from "./Toast.types";

export function ToastProvider({ children, limit = 3, timeout = 5000 }: ToastProviderProps) {
  return (
    <BaseToast.Provider limit={limit} timeout={timeout}>
      {children}
    </BaseToast.Provider>
  );
}

export function ToastViewport({
  className,
  closeLabel = "Dismiss notification",
  placement = "bottom-right",
  swipeDirection,
  toastClassName,
}: ToastViewportProps) {
  const { toasts } = BaseToast.useToastManager();

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        className={classNames(styles.viewport, className)}
        data-placement={placement}
      >
        {toasts.map((toast) => (
          <BaseToast.Root
            key={toast.id}
            toast={toast}
            className={classNames(styles.toast, toastClassName)}
            swipeDirection={swipeDirection}
            data-type={toast.type}
          >
            <BaseToast.Content className={styles.content}>
              <div className={styles.indicator} aria-hidden="true" />
              <div className={styles.text}>
                {toast.title ? <BaseToast.Title className={styles.title} /> : null}
                {toast.description ? (
                  <BaseToast.Description className={styles.description} />
                ) : null}
              </div>
              {toast.actionProps ? (
                <BaseToast.Action className={styles.action} {...toast.actionProps} />
              ) : null}
              <BaseToast.Close className={styles.close} aria-label={closeLabel}>
                <CloseIcon />
              </BaseToast.Close>
            </BaseToast.Content>
          </BaseToast.Root>
        ))}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

export function useToast() {
  return BaseToast.useToastManager();
}

export const createToastManager = BaseToast.createToastManager;

function CloseIcon() {
  return (
    <svg className={styles.closeIcon} viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}
