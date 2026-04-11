import type { ReactNode } from "react";
import { Icon } from "./Icon";

export type InlineAlertSeverity = "error" | "warning" | "info" | "success";
export type InlineAlertStyle   = "default" | "filled";

type InlineAlertProps = {
  severity:     InlineAlertSeverity;
  style?:       InlineAlertStyle;
  title?:       ReactNode;
  description?: ReactNode;
  /** Label for the action button. Omit to hide the button entirely. */
  actionLabel?: string;
  onAction?:    () => void;
  /** Omit to hide the close button (use for blocking errors) */
  onClose?:     () => void;
  className?:   string;
};

const severityIconName: Record<InlineAlertSeverity, "warning-circle" | "exclamation-triangle" | "info-circle" | "done-check"> = {
  error:   "warning-circle",
  warning: "exclamation-triangle",
  info:    "info-circle",
  success: "done-check",
};

/**
 * InlineAlert — section-level or workflow-level contextual alert.
 *
 * Rules (Confluence Feedback System):
 *   - Use when an issue affects more than one field or blocks progression
 *   - Blocking errors (error severity): omit onClose — not dismissible
 *   - Warning/Info: may include onClose
 *   - Max one action button, verb-first label (Retry, Review, Fix)
 *   - Never duplicate the same issue shown in a ValidationMessage
 *
 * Severities: error | warning | info | success
 * Styles:     default (tinted bg) | filled (solid bg)
 *
 * Source: Figma node 5322:4038, Confluence page 2807988258
 */
export function InlineAlert({
  severity,
  style     = "default",
  title,
  description,
  actionLabel,
  onAction,
  onClose,
  className,
}: InlineAlertProps) {
  return (
    <section
      role="alert"
      className={[
        "cw-inline-alert",
        `cw-inline-alert--${severity}`,
        `cw-inline-alert--${style}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Icon */}
      <span className="cw-inline-alert__icon" aria-hidden="true">
        <Icon name={severityIconName[severity]} />
      </span>

      {/* Text content */}
      <div className="cw-inline-alert__body">
        {title       && <p className="cw-inline-alert__title">{title}</p>}
        {description && <p className="cw-inline-alert__description">{description}</p>}
      </div>

      {/* Optional action */}
      {actionLabel && (
        <button
          type="button"
          className="cw-inline-alert__action"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}

      {/* Optional close */}
      {onClose && (
        <button
          type="button"
          className="cw-inline-alert__close"
          aria-label={`Dismiss ${severity} alert`}
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
      )}
    </section>
  );
}
