import { cloneElement, useId } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./FormField.module.css";
import type { FormFieldProps } from "./FormField.types";

export function FormField({
  children,
  className,
  description,
  error,
  id,
  label,
  required = false,
}: FormFieldProps) {
  const generatedId = useId();
  const controlId = id ?? children.props.id ?? `field-${generatedId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [children.props["aria-describedby"], descriptionId, errorId]
    .filter(Boolean)
    .join(" ");
  const invalid =
    Boolean(error) || children.props.invalid || children.props["aria-invalid"] === true;
  const controlProps = {
    id: controlId,
    invalid,
    ...(describedBy ? { "aria-describedby": describedBy } : {}),
    ...(invalid ? { "aria-invalid": true } : {}),
  };

  return (
    <div className={classNames(styles.field, className)}>
      <label className={styles.label} htmlFor={controlId}>
        <span>{label}</span>
        {required ? (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {description ? (
        <div className={styles.description} id={descriptionId}>
          {description}
        </div>
      ) : null}
      {cloneElement(children, controlProps)}
      {error ? (
        <div className={styles.error} id={errorId} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
