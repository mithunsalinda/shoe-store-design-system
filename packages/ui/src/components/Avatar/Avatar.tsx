"use client";

import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Avatar.module.css";
import type { AvatarProps } from "./Avatar.types";

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      alt,
      className,
      fallback,
      fallbackDelay = 0,
      imageProps,
      initials,
      name,
      onLoadingStatusChange,
      shape = "circle",
      size = "md",
      src,
      status,
      ...props
    },
    ref,
  ) => {
    const fallbackContent = fallback ?? initials ?? getInitials(name);
    const imageAlt = alt ?? name ?? "";

    return (
      <BaseAvatar.Root
        ref={ref}
        className={classNames(styles.avatar, styles[size], styles[shape], className)}
        aria-label={name && !src ? name : undefined}
        {...props}
      >
        {src ? (
          <BaseAvatar.Image
            className={styles.image}
            src={src}
            alt={imageAlt}
            onLoadingStatusChange={onLoadingStatusChange}
            {...imageProps}
          />
        ) : null}
        <BaseAvatar.Fallback className={styles.fallback} delay={fallbackDelay}>
          {fallbackContent || <DefaultIcon />}
        </BaseAvatar.Fallback>
        {status ? <span className={styles.status}>{status}</span> : null}
      </BaseAvatar.Root>
    );
  },
);

Avatar.displayName = "Avatar";

function getInitials(name?: string) {
  if (!name) {
    return "";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function DefaultIcon() {
  return (
    <svg className={styles.defaultIcon} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="5.25" r="2.5" />
      <path d="M3.5 14a4.5 4.5 0 0 1 9 0" />
    </svg>
  );
}
