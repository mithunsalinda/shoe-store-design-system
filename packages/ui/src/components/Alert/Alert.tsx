import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Alert.module.css";
import type { AlertProps } from "./Alert.types";

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      action,
      children,
      className,
      closeLabel = "Dismiss alert",
      dismissible = false,
      icon,
      intent = "info",
      onDismiss,
      role,
      title,
      variant = "soft",
      ...props
    },
    ref,
  ) => {
    const resolvedRole = role ?? (intent === "danger" ? "alert" : "status");

    return (
      <div
        ref={ref}
        className={classNames(styles.alert, styles[intent], styles[variant], className)}
        role={resolvedRole}
        {...props}
      >
        <div className={styles.icon} aria-hidden="true">
          {icon ?? <DefaultIcon intent={intent} />}
        </div>
        <div className={styles.body}>
          {title ? <p className={styles.title}>{title}</p> : null}
          {children ? <div className={styles.description}>{children}</div> : null}
        </div>
        {action ? <div className={styles.action}>{action}</div> : null}
        {dismissible ? (
          <button
            className={styles.close}
            type="button"
            aria-label={closeLabel}
            onClick={onDismiss}
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>
    );
  },
);

Alert.displayName = "Alert";

function DefaultIcon({ intent }: { intent: AlertProps["intent"] }) {
  if (intent === "success") {
    return (
      <svg className={styles.defaultIcon} viewBox="0 0 16 16">
        <path d="m3.5 8.5 3 3 6-7" />
      </svg>
    );
  }

  if (intent === "danger") {
    return (
      <svg className={styles.defaultIcon} viewBox="0 0 16 16">
        <path d="M8 5v4M8 12h.01" />
        <path d="M8 2.5 14 13H2L8 2.5Z" />
      </svg>
    );
  }

  if (intent === "warning") {
    return (
      <svg className={styles.defaultIcon} viewBox="0 0 16 16">
        <path d="M8 5.5v3M8 11.5h.01" />
        <path d="M8 2.5 14 13H2L8 2.5Z" />
      </svg>
    );
  }

  return (
    <svg className={styles.defaultIcon} viewBox="0 0 16 16">
      <path d="M8 7v5M8 4h.01" />
      <circle cx="8" cy="8" r="6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className={styles.closeIcon} viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}
