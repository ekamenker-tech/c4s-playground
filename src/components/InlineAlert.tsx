import type { ReactNode } from "react";

export type InlineAlertSeverity = "error" | "warning" | "info" | "success";
export type InlineAlertStyle = "default" | "filled";

type InlineAlertProps = {
  severity: InlineAlertSeverity;
  style?: InlineAlertStyle;
  title?: ReactNode;
  description?: ReactNode;
  actionLabel?: string;
  onClose?: () => void;
  className?: string;
};

const variantConfig: Record<
  InlineAlertSeverity,
  {
    closeLabel: string;
  }
> = {
  error: { closeLabel: "Dismiss error alert" },
  warning: { closeLabel: "Dismiss warning alert" },
  info: { closeLabel: "Dismiss info alert" },
  success: { closeLabel: "Dismiss success alert" },
};

export function InlineAlert({
  severity,
  style = "default",
  title = "{Title}",
  description = "{Description}",
  actionLabel = "Button",
  onClose,
  className,
}: InlineAlertProps) {
  const config = variantConfig[severity];

  return (
    <section
      className={[
        "inline-alert",
        `inline-alert--${severity}`,
        `inline-alert--${style}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="inline-alert__icon-wrap" aria-hidden="true">
        <AlertGlyph severity={severity} />
      </div>

      <div className="inline-alert__content">
        <p className="inline-alert__title">{title}</p>
        <p className="inline-alert__description">{description}</p>
      </div>

      <button type="button" className="inline-alert__action-label">
        {actionLabel}
      </button>

      <button
        type="button"
        className="inline-alert__close"
        aria-label={config.closeLabel}
        onClick={onClose}
      >
        <CloseGlyph />
      </button>
    </section>
  );
}

function AlertGlyph({ severity }: { severity: InlineAlertSeverity }) {
  if (severity === "error") {
    return (
      <svg viewBox="0 0 20 20" fill="none" role="presentation">
        <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 5.9V10.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="10" cy="13.55" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (severity === "warning") {
    return (
      <svg viewBox="0 0 20 20" fill="none" role="presentation">
        <path
          d="M10 3.1L17 15.9H3L10 3.1Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M10 7V10.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="10" cy="13.25" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (severity === "info") {
    return (
      <svg viewBox="0 0 20 20" fill="none" role="presentation">
        <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 8.5V13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="10" cy="6.1" r="1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="none" role="presentation">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 10.1L8.9 12.5L13.7 7.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="none" role="presentation">
      <path d="M5.5 5.5L14.5 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14.5 5.5L5.5 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}