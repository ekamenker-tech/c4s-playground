import type { ReactNode, ButtonHTMLAttributes } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant  = "contained" | "outlined" | "text" | "linkButton";
export type ButtonColor    = "primary" | "secondary" | "error" | "destructive";
export type ButtonSize     = "medium" | "small";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:   ButtonVariant;
  color?:     ButtonColor;
  size?:      ButtonSize;
  startIcon?: ReactNode;
  endIcon?:   ReactNode;
  children?:  ReactNode;
  className?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Button({
  variant   = "contained",
  color     = "primary",
  size      = "medium",
  startIcon,
  endIcon,
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = [
    "cw-btn",
    `cw-btn--${variant}`,
    `cw-btn--${color}`,
    `cw-btn--${size}`,
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
      {startIcon && (
        <span className="cw-btn__icon cw-btn__icon--start" aria-hidden="true">
          {startIcon}
        </span>
      )}
      {children && (
        <span className="cw-btn__label">{children}</span>
      )}
      {endIcon && (
        <span className="cw-btn__icon cw-btn__icon--end" aria-hidden="true">
          {endIcon}
        </span>
      )}
    </button>
  );
}
