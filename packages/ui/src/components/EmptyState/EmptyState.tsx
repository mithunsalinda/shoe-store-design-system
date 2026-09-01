import { forwardRef, useId } from "react";
import type { ForwardedRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./EmptyState.module.css";
import type { EmptyStateProps } from "./EmptyState.types";

export const EmptyState = forwardRef<HTMLElement, EmptyStateProps>(
  (
    {
      action,
      align = "center",
      as = "section",
      className,
      density = "comfortable",
      description,
      icon,
      media,
      secondaryAction,
      title,
      tone = "neutral",
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const titleId = `${generatedId}-title`;
    const labelledBy = props["aria-label"] || props["aria-labelledby"] ? undefined : titleId;

    const content = (
      <>
        {media ? <div className={styles.media}>{media}</div> : null}
        {!media ? (
          <div className={styles.icon} aria-hidden="true">
            {icon ?? <DefaultIcon />}
          </div>
        ) : null}

        <div className={styles.copy}>
          <h2 className={styles.title} id={titleId}>
            {title}
          </h2>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>

        {action || secondaryAction ? (
          <div className={styles.actions}>
            {action}
            {secondaryAction}
          </div>
        ) : null}
      </>
    );

    const rootProps = {
      "aria-labelledby": labelledBy,
      className: classNames(styles.root, styles[align], styles[density], styles[tone], className),
      ...props,
    };

    if (as === "div") {
      return (
        <div ref={ref as ForwardedRef<HTMLDivElement>} {...rootProps}>
          {content}
        </div>
      );
    }

    return (
      <section ref={ref} {...rootProps}>
        {content}
      </section>
    );
  },
);

EmptyState.displayName = "EmptyState";

function DefaultIcon() {
  return (
    <svg className={styles.defaultIcon} viewBox="0 0 24 24">
      <path d="M6 7.5h12M8 12h8M10 16.5h4" />
      <rect x="4" y="4" width="16" height="16" rx="3" />
    </svg>
  );
}
