import { useState } from "react";
import { InlineAlert } from "../components/InlineAlert";

const auditItems = [
  { label: "Org ID", value: "cw-1982-ops" },
  { label: "Region", value: "Frankfurt / EU" },
  { label: "Updated", value: "2 minutes ago" },
];

const queueRows = [
  { flow: "Identity verification", owner: "Risk Ops", state: "Blocked" },
  { flow: "VAT document review", owner: "Compliance", state: "Needs review" },
  { flow: "Billing profile sync", owner: "Platform", state: "Healthy" },
];

export function AdminAlertsDemoPage() {
  const [showError, setShowError] = useState(true);
  const [showWarning, setShowWarning] = useState(true);

  return (
    <main className="admin-shell">
      <section className="hero-card">
        <div className="hero-card__copy">
          <p className="eyebrow">C4S Flow Playground</p>
          <h1>Dark admin panel with DS inline alerts.</h1>
          <p className="hero-card__lede">
            The alert block now tracks the Figma default variant more closely: compact width,
            muted semantic fill, 16/14 typography, inline text action, and dismiss affordance.
          </p>
        </div>
        <div className="hero-card__stats" aria-label="Workspace metadata">
          {auditItems.map((item) => (
            <div key={item.label} className="hero-card__stat">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-grid">
        <article className="admin-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Design system preview</p>
              <h2>InlineAlert default variants</h2>
            </div>
            <span className="status-pill status-pill--critical">Exact node tuned</span>
          </div>

          <div className="alert-demo-grid">
            {showError ? (
              <InlineAlert
                variant="error"
                title="{Title}"
                description="{Description}"
                actionLabel="Button"
                onClose={() => setShowError(false)}
              />
            ) : (
              <button type="button" className="alert-reset" onClick={() => setShowError(true)}>
                Restore error alert
              </button>
            )}

            {showWarning ? (
              <InlineAlert
                variant="warning"
                title="{Title}"
                description="{Description}"
                actionLabel="Button"
                onClose={() => setShowWarning(false)}
              />
            ) : (
              <button type="button" className="alert-reset" onClick={() => setShowWarning(true)}>
                Restore warning alert
              </button>
            )}
          </div>
        </article>

        <article className="admin-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Admin usage</p>
              <h2>Section-level workflow state</h2>
            </div>
            <span className="status-pill status-pill--warning">Reusable</span>
          </div>

          <InlineAlert
            variant="error"
            title="Primary payout account failed verification."
            description="Update the beneficiary record before the April 1 payout batch to avoid an automatic hold."
            actionLabel="Review"
          />

          <InlineAlert
            variant="warning"
            title="Three onboarding flows need manual review."
            description="Existing submissions remain valid, but stale tax attachments must be cleared before Friday export."
            actionLabel="Open queue"
          />

          <div className="queue-list" role="table" aria-label="Review queue">
            {queueRows.map((row) => (
              <div key={row.flow} className="queue-row" role="row">
                <span role="cell">{row.flow}</span>
                <span role="cell">{row.owner}</span>
                <span role="cell">{row.state}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}