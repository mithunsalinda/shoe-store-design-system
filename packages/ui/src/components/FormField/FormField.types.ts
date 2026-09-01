import type { ReactElement, ReactNode } from "react";

export interface FormFieldControlProps {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "false" | "true";
  invalid?: boolean;
}

export interface FormFieldProps {
  children: ReactElement<FormFieldControlProps>;
  id?: string;
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
}
