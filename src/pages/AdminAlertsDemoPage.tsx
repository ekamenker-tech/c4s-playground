import { InlineAlert, type InlineAlertSeverity, type InlineAlertStyle } from "../components/InlineAlert";

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

const previewVariants: Array<{ severity: InlineAlertSeverity; style: InlineAlertStyle }> = [
  { severity: "error", style: "default" },
  { severity: "error", style: "filled" },
  { severity: "warning", style: "default" },
  { severity: "warning", style: "filled" },
  { severity: "info", style: "default" },
  { severity: "info", style: "filled" },
  { severity: "success", style: "default" },
  { severity: "success", style: "filled" },
];

export function AdminAlertsDemoPage() {
  return (
    <main className="admin-shell">
      <section className="hero-card">
        <div className="hero-card__copy">
          <p className="eyebrow">C4S Flow Playground</p>
          <h1>Dark admin panel with all DS inline alerts.</h1>
          <p className="hero-card__lede">
            The preview now covers the full Figma set: error, warning, info, and success in both
            default and filled styles.
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
        <article className="admin-panel admin-panel--wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Design system preview</p>
              <h2>InlineAlert variants</h2>
            </div>
            <span className="status-pill status-pill--critical">8 variants</span>
          </div>

          <div className="alert-demo-grid">
            {previewVariants.map((item) => (
              <InlineAlert
                key={`${item.severity}-${item.style}`}
                severity={item.severity}
                style={item.style}
                title="{Title}"
                description="{Description}"
                actionLabel="Button"
              />
            ))}
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
            severity="error"
            title="Primary payout account failed verification."
            description="Update the beneficiary record before the April 1 payout batch to avoid an automatic hold."
            actionLabel="Review"
          />

          <InlineAlert
            severity="warning"
            title="Three onboarding flows need manual review."
            description="Existing submissions remain valid, but stale tax attachments must be cleared before Friday export."
            actionLabel="Open queue"
          />

          <InlineAlert
            severity="info"
            title="Weekly export window starts in 3 hours."
            description="No action is required yet, but the queue will become read-only while the export job is running."
            actionLabel="Details"
          />

          <InlineAlert
            severity="success"
            title="Banking profile synced successfully."
            description="The latest beneficiary details are now available across payouts, invoicing, and tax workflows."
            actionLabel="View log"
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