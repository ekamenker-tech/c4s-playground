import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";

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


const severityIcons: Record<SnackbarSeverity, ReactNode> = {
  error: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5.9V10.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="10" cy="13.55" r="1" fill="currentColor" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3.1L17 15.9H3L10 3.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 7V10.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="10" cy="13.25" r="1" fill="currentColor" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.5V13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="10" cy="6.1" r="1" fill="currentColor" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10.1L8.9 12.5L13.7 7.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
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
        {severityIcons[severity]}
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
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
