import type { ReactNode, ButtonHTMLAttributes } from "react";
import type { ButtonVariant, ButtonColor } from "./Button";

// ─── Types ────────────────────────────────────────────────────────────────────

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** The icon to render — use <Icon name="..." /> */
  icon: ReactNode;
  variant?: ButtonVariant;
  color?:   ButtonColor;
  /** Accessible label — required since there is no visible text */
  "aria-label": string;
  className?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * IconButton — square 44×44px button containing a single icon.
 * Shares all color/state tokens with Button via button.css.
 * Always medium size (44px) — no small variant per design system spec.
 *
 * Usage:
 *   <IconButton icon={<Icon name="trash" />} color="destructive"
 *               variant="outlined" aria-label="Delete item" />
 */
export function IconButton({
  icon,
  variant  = "contained",
  color    = "primary",
  className,
  disabled,
  ...rest
}: IconButtonProps) {
  const classes = [
    "cw-btn",
    "cw-icon-btn",
    `cw-btn--${variant}`,
    `cw-btn--${color}`,
    disabled ? "cw-btn--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled}
      {...rest}
    >
      <span className="cw-btn__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
