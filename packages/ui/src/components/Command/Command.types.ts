import type { HTMLAttributes, ReactNode } from "react";
import type { DialogProps } from "../Dialog";

export type CommandSize = "sm" | "md";

export interface CommandAction {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  keywords?: string[];
  shortcut?: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandGroup {
  heading?: ReactNode;
  actions: CommandAction[];
}

export interface CommandProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  groups: CommandGroup[];
  ariaLabel?: string;
  defaultQuery?: string;
  emptyMessage?: ReactNode;
  inputLabel?: string;
  onActionSelect?: (action: CommandAction) => void;
  onQueryChange?: (query: string) => void;
  placeholder?: string;
  query?: string;
  size?: CommandSize;
}

export interface CommandDialogProps
  extends
    Omit<CommandProps, "className" | "title">,
    Pick<
      DialogProps,
      | "closeLabel"
      | "defaultOpen"
      | "description"
      | "disablePointerDismissal"
      | "modal"
      | "onOpenChange"
      | "open"
      | "showCloseButton"
      | "title"
      | "trigger"
      | "triggerClassName"
    > {
  className?: string | undefined;
  contentClassName?: string | undefined;
}
