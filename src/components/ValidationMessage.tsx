import type { ReactNode } from "react";
import { Icon } from "./Icon";

export type ValidationSeverity = "error" | "warning" | "info" | "success";
export type ValidationVariant  = "default" | "compact";

type ValidationMessageProps = {
  /** The validation message text */
  message: ReactNode;
  severity?: ValidationSeverity;
  /**
   * default — bordered pill, used below dropzones and file upload blocks
   * compact — no border, inline use within dense UI
   */
  variant?: ValidationVariant;
  className?: string;
};

/**
 * Icon mapping verified against Figma node 5153:17862–17865:
 *   error   → exclamation-triangle  (NOT warning-circle — both error and warning use triangle)
 *   warning → exclamation-triangle
 *   info    → info-circle
 *   success → done-check
 */
const severityIconName: Record<ValidationSeverity, "exclamation-triangle" | "info-circle" | "done-check"> = {
  error:   "exclamation-triangle",
  warning: "exclamation-triangle",
  info:    "info-circle",
  success: "done-check",
};

/**
 * ValidationMessage — compact component-level validation feedback.
 *
 * Rules (Confluence Feedback System):
 *   - Component-level scope only (dropzones, file upload blocks, grouped inputs)
 *   - NOT dismissible — no close button
 *   - NO action buttons
 *   - Short, direct text — one constraint per message
 *   - Disappears when condition is resolved
 *   - Never use for cross-section issues → use InlineAlert instead
 *
 * Source: Figma node 5153:17866, Confluence page 2807988258
 */
export function ValidationMessage({
  message,
  severity = "error",
  variant  = "default",
  className,
}: ValidationMessageProps) {
  return (
    <div
      role="alert"
      className={[
        "cw-validation-msg",
        `cw-validation-msg--${severity}`,
        variant === "compact" ? "cw-validation-msg--compact" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="cw-validation-msg__icon" aria-hidden="true">
        <Icon name={severityIconName[severity]} iconSize="medium" />
      </span>
      <p className="cw-validation-msg__text">{message}</p>
    </div>
  );
}
