"use client";

import { forwardRef, useEffect, useId, useMemo, useState } from "react";
import type { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { classNames } from "../../utils/classNames";
import { Dialog } from "../Dialog";
import styles from "./Command.module.css";
import type {
  CommandAction,
  CommandDialogProps,
  CommandGroup,
  CommandProps,
} from "./Command.types";

export const Command = forwardRef<HTMLDivElement, CommandProps>(
  (
    {
      ariaLabel = "Command menu",
      className,
      defaultQuery = "",
      emptyMessage = "No commands found.",
      groups,
      inputLabel = "Search commands",
      onActionSelect,
      onQueryChange,
      placeholder = "Search commands...",
      query,
      size = "md",
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const [internalQuery, setInternalQuery] = useState(defaultQuery);
    const [activeId, setActiveId] = useState<string | null>(null);
    const searchQuery = query ?? internalQuery;
    const filteredGroups = useMemo(() => filterGroups(groups, searchQuery), [groups, searchQuery]);
    const enabledActions = useMemo(
      () => filteredGroups.flatMap((group) => group.actions).filter((action) => !action.disabled),
      [filteredGroups],
    );
    const activeAction = enabledActions.find((action) => action.id === activeId) ?? null;
    const activeOptionId = activeAction ? getOptionId(generatedId, activeAction.id) : undefined;

    useEffect(() => {
      if (enabledActions.length === 0) {
        setActiveId(null);
        return;
      }

      if (!activeId || !enabledActions.some((action) => action.id === activeId)) {
        setActiveId(enabledActions[0]?.id ?? null);
      }
    }, [activeId, enabledActions]);

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
      const nextQuery = event.target.value;
      setInternalQuery(nextQuery);
      onQueryChange?.(nextQuery);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (enabledActions.length === 0) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveId(getNextActionId(enabledActions, activeId, 1));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveId(getNextActionId(enabledActions, activeId, -1));
      }

      if (event.key === "Enter" && activeAction) {
        event.preventDefault();
        selectAction(activeAction, onActionSelect);
      }
    };

    return (
      <div
        ref={ref}
        className={classNames(styles.root, styles[size], className)}
        role="combobox"
        aria-expanded="true"
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        aria-owns={`${generatedId}-listbox`}
        {...props}
      >
        <div className={styles.search}>
          <SearchIcon />
          <label className={styles.visuallyHidden} htmlFor={`${generatedId}-input`}>
            {inputLabel}
          </label>
          <input
            aria-activedescendant={activeOptionId}
            aria-autocomplete="list"
            aria-controls={`${generatedId}-listbox`}
            className={styles.input}
            id={`${generatedId}-input`}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            role="searchbox"
            value={searchQuery}
          />
        </div>

        <div className={styles.results} id={`${generatedId}-listbox`} role="listbox">
          {enabledActions.length === 0 ? (
            <div className={styles.empty} role="status">
              {emptyMessage}
            </div>
          ) : (
            filteredGroups.map((group, groupIndex) => (
              <div className={styles.group} key={getGroupKey(group, groupIndex)}>
                {group.heading ? <div className={styles.heading}>{group.heading}</div> : null}
                <div className={styles.items}>{group.actions.map(renderAction)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    );

    function renderAction(action: CommandAction) {
      const isActive = action.id === activeId;

      return (
        <button
          key={action.id}
          aria-disabled={action.disabled ? "true" : undefined}
          aria-selected={isActive}
          className={styles.item}
          disabled={action.disabled}
          id={getOptionId(generatedId, action.id)}
          onClick={() => selectAction(action, onActionSelect)}
          onMouseEnter={() => {
            if (!action.disabled) {
              setActiveId(action.id);
            }
          }}
          role="option"
          type="button"
        >
          <span className={styles.itemText}>
            <span className={styles.itemLabel}>{action.label}</span>
            {action.description ? (
              <span className={styles.itemDescription}>{action.description}</span>
            ) : null}
          </span>
          {action.shortcut ? <span className={styles.shortcut}>{action.shortcut}</span> : null}
        </button>
      );
    }
  },
);

Command.displayName = "Command";

export const CommandDialog = forwardRef<HTMLDivElement, CommandDialogProps>(
  (
    {
      className,
      closeLabel,
      contentClassName,
      defaultOpen,
      description,
      disablePointerDismissal,
      modal,
      onOpenChange,
      open,
      showCloseButton,
      title,
      trigger,
      triggerClassName,
      ...commandProps
    },
    ref,
  ) => (
    <Dialog
      className={classNames(styles.dialog, className)}
      contentClassName={classNames(styles.dialogContent, contentClassName)}
      size="lg"
      title={title}
      {...(closeLabel !== undefined ? { closeLabel } : {})}
      {...(defaultOpen !== undefined ? { defaultOpen } : {})}
      {...(description !== undefined ? { description } : {})}
      {...(disablePointerDismissal !== undefined ? { disablePointerDismissal } : {})}
      {...(modal !== undefined ? { modal } : {})}
      {...(onOpenChange !== undefined ? { onOpenChange } : {})}
      {...(open !== undefined ? { open } : {})}
      {...(showCloseButton !== undefined ? { showCloseButton } : {})}
      {...(trigger !== undefined ? { trigger } : {})}
      {...(triggerClassName !== undefined ? { triggerClassName } : {})}
    >
      <Command ref={ref} {...commandProps} />
    </Dialog>
  ),
);

CommandDialog.displayName = "CommandDialog";

function filterGroups(groups: CommandGroup[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return groups;
  }

  return groups
    .map((group) => ({
      ...group,
      actions: group.actions.filter((action) =>
        getActionSearchText(action).includes(normalizedQuery),
      ),
    }))
    .filter((group) => group.actions.length > 0);
}

function getActionSearchText(action: CommandAction) {
  return [
    getNodeText(action.label),
    getNodeText(action.description),
    action.id,
    ...(action.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

function getNodeText(value: ReactNode) {
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function getNextActionId(actions: CommandAction[], activeId: string | null, direction: 1 | -1) {
  const activeIndex = Math.max(
    actions.findIndex((action) => action.id === activeId),
    0,
  );
  const nextIndex = (activeIndex + direction + actions.length) % actions.length;

  return actions[nextIndex]?.id ?? null;
}

function selectAction(action: CommandAction, onActionSelect: CommandProps["onActionSelect"]) {
  if (action.disabled) {
    return;
  }

  action.onSelect?.();
  onActionSelect?.(action);
}

function getOptionId(rootId: string, actionId: string) {
  return `${rootId}-option-${actionId}`;
}

function getGroupKey(group: CommandGroup, index: number) {
  return typeof group.heading === "string" ? `${group.heading}-${index}` : index;
}

function SearchIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      <path d="m11.25 11.25 2.5 2.5" />
      <circle cx="7" cy="7" r="4.25" />
    </svg>
  );
}
