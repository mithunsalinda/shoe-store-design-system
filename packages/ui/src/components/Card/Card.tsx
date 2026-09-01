import { forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Card.module.css";
import type {
  CardDescriptionProps,
  CardMediaProps,
  CardProps,
  CardSectionProps,
  CardTitleProps,
} from "./Card.types";

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { children, className, interactive = false, padding = "md", variant = "outlined", ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(
          styles.card,
          styles[variant],
          styles[`padding-${padding}`],
          interactive && styles.interactive,
          className,
        )}
        data-interactive={interactive ? "" : undefined}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={classNames(styles.header, className)} {...props}>
      {children}
    </div>
  ),
);

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, ...props }, ref) => (
    <h3 ref={ref} className={classNames(styles.title, className)} {...props}>
      {children}
    </h3>
  ),
);

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <p ref={ref} className={classNames(styles.description, className)} {...props}>
      {children}
    </p>
  ),
);

CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={classNames(styles.content, className)} {...props}>
      {children}
    </div>
  ),
);

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={classNames(styles.footer, className)} {...props}>
      {children}
    </div>
  ),
);

CardFooter.displayName = "CardFooter";

export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={classNames(styles.media, className)} {...props}>
      {children}
    </div>
  ),
);

CardMedia.displayName = "CardMedia";
