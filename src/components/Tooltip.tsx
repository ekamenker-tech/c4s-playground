import type { ReactNode } from "react";

type TooltipContentProps = {
  /** The tooltip bubble itself — positioned by parent or a positioning lib */
  content: ReactNode;
  /** Constrain to 240px and allow text to wrap (default: single line) */
  multiline?: boolean;
  className?: string;
};

/**
 * Tooltip — minimal text bubble for contextual hints.
 *
 * Rules (from Confluence Tooltip doc):
 *   - Text only — no titles, icons, actions, or close button
 *   - Keep content short (typically one sentence)
 *   - Triggered by hover or focus — never click
 *   - No backdrop, no z-index management here — pair with a positioning utility
 *   - Use Popover when content needs a title, link, or action
 *
 * Surface: overlay (#312c38)
 * Shadow:  elevation/overlay
 * Radius:  4px (radius-base)
 *
 * Positioning is NOT handled here. Use a library (Floating UI, Popper)
 * or CSS to position `.cw-tooltip` relative to its trigger.
 *
 * Source: Figma node 5789:2017
 *
 * Usage:
 *   <div className="cw-tooltip-wrapper">
 *     <button aria-describedby="tip-1">Hover me</button>
 *     <div className="cw-tooltip" role="tooltip" id="tip-1">
 *       Short hint text
 *     </div>
 *   </div>
 */
export function Tooltip({ content, multiline = false, className }: TooltipContentProps) {
  return (
    <div
      role="tooltip"
      className={[
        "cw-tooltip",
        multiline ? "cw-tooltip--multiline" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {content}
    </div>
  );
}
