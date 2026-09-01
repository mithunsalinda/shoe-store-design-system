import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./SidePanel.module.css";
import type { SidePanelProps } from "./SidePanel.types";

export const SidePanel = forwardRef<HTMLElement, SidePanelProps>(
  (
    {
      children,
      className,
      contentClassName,
      description,
      footer,
      footerClassName,
      headerClassName,
      position = "right",
      size = "md",
      sticky = false,
      title,
      variant = "bordered",
      ...props
    },
    ref,
  ) => (
    <aside
      ref={ref}
      className={classNames(
        styles.panel,
        styles[position],
        styles[size],
        styles[variant],
        sticky && styles.sticky,
        className,
      )}
      {...props}
    >
      {title || description ? (
        <div className={classNames(styles.header, headerClassName)}>
          {title ? <h2 className={styles.title}>{title}</h2> : null}
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
      ) : null}

      {children ? (
        <div className={classNames(styles.content, contentClassName)}>{children}</div>
      ) : null}

      {footer ? <div className={classNames(styles.footer, footerClassName)}>{footer}</div> : null}
    </aside>
  ),
);

SidePanel.displayName = "SidePanel";
