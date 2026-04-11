import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { Icon } from "./Icon";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SnackbarSeverity = "error" | "warning" | "info" | "success";

/**
 * Duration presets per Confluence spec:
 *   success/info: 3000–4000ms
 *   warning:      4000–6000ms
 *   error:        6000–8000ms
 *   0 = persistent (progress state — no auto-dismiss)
 */
export const SNACKBAR_DURATION: Record<SnackbarSeverity, number> = {
  success: 4000,
  info:    4000,
  warning: 5000,
  error:   7000,
};

type SnackbarProps = {
  /** The message text — one short sentence, no title */
  message: ReactNode;
  severity?: SnackbarSeverity;
  /** Optional single action label */
  actionLabel?: string;
  onAction?: () => void;
  /** Omit to hide close button (e.g. progress states) */
  onClose?: () => void;
  /**
   * Auto-dismiss duration in ms.
   * 0 = persistent (progress state).
   * Defaults to SNACKBAR_DURATION[severity].
   */
  duration?: number;
  className?: string;
};

const severityIconName: Record<SnackbarSeverity, "warning-circle" | "exclamation-triangle" | "info-circle" | "done-check"> = {
  error:   "warning-circle",
  warning: "exclamation-triangle",
  info:    "info-circle",
  success: "done-check",
};

/**
 * Snackbar — global transient feedback for action outcomes.
 *
 * Rules (Confluence Snackbar doc, page 2808250380):
 *   - No title — one short sentence only
 *   - Max one action, max one snackbar visible at a time
 *   - role="alert" for error/warning, role="status" for success/info
 *   - Auto-dismiss pauses on hover or focus
 *   - Progress state: duration=0, no onClose
 *   - Close required when: error severity, action present, long duration
 *   - Never use for validation errors — use InlineAlert instead
 *
 * Surface: overlay (#312c38), shadow: elevation/toast, z-index: 600
 * Width: 320px desktop, full-width mobile
 *
 * Source: Figma node 5323:6526
 */
export function Snackbar({
  message,
  severity    = "info",
  actionLabel,
  onAction,
  onClose,
  duration,
  className,
}: SnackbarProps) {
  const resolvedDuration = duration ?? SNACKBAR_DURATION[severity];
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const paused    = useRef(false);
  const remaining = useRef(resolvedDuration);
  const startedAt = useRef<number>(0);

  const startTimer = useCallback(() => {
    if (resolvedDuration === 0 || !onClose) return;
    startedAt.current = Date.now();
    timerRef.current = setTimeout(onClose, remaining.current);
  }, [resolvedDuration, onClose]);

  const pauseTimer = useCallback(() => {
    if (!timerRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current = null;
    remaining.current -= Date.now() - startedAt.current;
    paused.current = true;
  }, []);

  const resumeTimer = useCallback(() => {
    if (!paused.current) return;
    paused.current = false;
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [startTimer]);

  const role = severity === "error" || severity === "warning" ? "alert" : "status";

  return (
    <div
      role={role}
      aria-live={role === "alert" ? "assertive" : "polite"}
      className={["cw-snackbar", `cw-snackbar--${severity}`, className].filter(Boolean).join(" ")}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      onFocus={pauseTimer}
      onBlur={resumeTimer}
    >
      {/* Icon */}
      <span className="cw-snackbar__icon" aria-hidden="true">
        <Icon name={severityIconName[severity]} />
      </span>

      {/* Message + action stacked vertically */}
      <div className="cw-snackbar__body">
        <p className="cw-snackbar__message">{message}</p>
        {actionLabel && (
          <button type="button" className="cw-snackbar__action" onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>

      {/* Close */}
      {onClose && (
        <button
          type="button"
          className="cw-snackbar__close"
          aria-label="Dismiss notification"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
      )}
    </div>
  );
}
