import type { ReactNode } from "react";

export type InlineAlertVariant = "error" | "warning";

type InlineAlertProps = {
  variant: InlineAlertVariant;
  title?: ReactNode;
  description?: ReactNode;
  actionLabel?: string;
  onClose?: () => void;
  className?: string;
};

const variantConfig: Record<
  InlineAlertVariant,
  {
    actionLabelClass: string;
    closeLabel: string;
  }
> = {
  error: {
    actionLabelClass: "inline-alert__action-label",
    closeLabel: "Dismiss error alert",
  },
  warning: {
    actionLabelClass: "inline-alert__action-label",
    closeLabel: "Dismiss warning alert",
  },
};

export function InlineAlert({
  variant,
  title = "{Title}",
  description = "{Description}",
  actionLabel = "Button",
  onClose,
  className,
}: InlineAlertProps) {
  const config = variantConfig[variant];

  return (
    <section className={["inline-alert", `inline-alert--${variant}`, className].filter(Boolean).join(" ")}>
      <div className="inline-alert__icon-wrap" aria-hidden="true">
        <AlertGlyph variant={variant} />
      </div>

      <div className="inline-alert__content">
        <p className="inline-alert__title">{title}</p>
        <p className="inline-alert__description">{description}</p>
      </div>

      <button type="button" className={config.actionLabelClass}>
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

function AlertGlyph({ variant }: { variant: InlineAlertVariant }) {
  if (variant === "error") {
    return (
      <svg viewBox="0 0 20 20" fill="none" role="presentation">
        <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 5.9V10.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="10" cy="13.55" r="1" fill="currentColor" />
      </svg>
    );
  }

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

function CloseGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="none" role="presentation">
      <path d="M5.5 5.5L14.5 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14.5 5.5L5.5 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}