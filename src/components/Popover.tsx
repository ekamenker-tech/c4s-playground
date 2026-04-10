import type { ReactNode } from "react";

type PopoverProps = {
  /**
   * Optional header text — subtitle1 (16px/medium)
   * If omitted, only body content is shown
   */
  title?: ReactNode;
  /**
   * Body text — body2 (14px/regular/text-secondary)
   * Shown below title when provided
   */
  description?: ReactNode;
  /**
   * Optional link or low-emphasis action at the bottom
   * Renders with text-link color
   */
  action?: ReactNode;
  /**
   * Fully custom content — replaces title/description/action slot
   * Use when the Popover needs non-standard layout
   */
  children?: ReactNode;
  className?: string;
};

/**
 * Popover — click-triggered contextual panel with rich content.
 *
 * Rules (from Confluence Popover doc):
 *   - Click-triggered, not hover (use Tooltip for hover)
 *   - Compact and focused — avoid long scrollable content
 *   - No backdrop
 *   - May include: text, lists, media, links, or a single action
 *   - Use Modal when user needs to complete a task or make a decision
 *   - Clear separation: Tooltip (hover, text only) vs Popover (click, rich)
 *
 * Surface: overlay (#312c38)
 * Shadow:  elevation/overlay
 * Radius:  8px (radius-lg)
 * Width:   340px fixed
 *
 * Positioning is NOT handled here — pair with Floating UI or Popper.
 *
 * Source: Figma node 5785:6287
 */
export function Popover({ title, description, action, children, className }: PopoverProps) {
  return (
    <div className={["cw-popover", className].filter(Boolean).join(" ")}>
      {children ?? (
        <div className="cw-popover__content">
          {title && (
            <p className="cw-popover__title">{title}</p>
          )}
          {description && (
            <p className="cw-popover__description">{description}</p>
          )}
          {action && (
            <div className="cw-popover__action">{action}</div>
          )}
        </div>
      )}
    </div>
  );
}
