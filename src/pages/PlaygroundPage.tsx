import { useState } from "react";
import { Button } from "../components/Button";
import { ButtonDropdown } from "../components/ButtonDropdown";
import { ButtonWithLoader, Spinner } from "../components/ButtonWithLoader";
import { Icon, iconNames, type IconName } from "../components/Icon";
import { IconButton } from "../components/IconButton";
import { InlineAlert, type InlineAlertSeverity } from "../components/InlineAlert";
import { Modal, type ModalType } from "../components/Modal";
import { Backdrop } from "../components/Backdrop";
import { Popover } from "../components/Popover";
import { Snackbar, type SnackbarSeverity } from "../components/Snackbar";
import { Tooltip } from "../components/Tooltip";
import { ValidationMessage } from "../components/ValidationMessage";

type SnackState = { severity: SnackbarSeverity; message: string; actionLabel?: string } | null;
type Section = "buttons" | "icons" | "alerts" | "modals" | "overlays" | "feedback";

const sections: Array<{ id: Section; label: string }> = [
  { id: "buttons",  label: "Buttons" },
  { id: "icons",    label: "Icons" },
  { id: "alerts",   label: "Alerts" },
  { id: "modals",   label: "Modals" },
  { id: "overlays", label: "Tooltip · Popover" },
  { id: "feedback", label: "Validation · Snackbar" },
];

export function PlaygroundPage() {
  const [activeSection, setActiveSection] = useState<Section>("buttons");
  const [loadingIdx, setLoadingIdx]       = useState<number | null>(null);
  const [modalOpen, setModalOpen]         = useState(false);
  const [modalType, setModalType]         = useState<ModalType>("simple");
  const [popover1Open, setPopover1Open]   = useState(false);
  const [popover2Open, setPopover2Open]   = useState(false);
  const [snack, setSnack]                 = useState<SnackState>(null);
  const [iconQuery, setIconQuery]         = useState("");

  function triggerLoad(idx: number) {
    setLoadingIdx(idx);
    setTimeout(() => setLoadingIdx(null), 2000);
  }

  function openModal(type: ModalType) {
    setModalType(type);
    setModalOpen(true);
  }

  function showSnack(severity: SnackbarSeverity, message: string, actionLabel?: string) {
    setSnack({ severity, message, actionLabel });
  }

  const filteredIcons = iconNames.filter((n) =>
    n.toLowerCase().includes(iconQuery.toLowerCase())
  );

  return (
    <div className="pg-layout">

      {/* ── Sidebar nav ── */}
      <aside className="pg-sidebar">
        <p className="pg-sidebar__label">Components</p>
        <nav>
          {sections.map((s) => (
            <button
              key={s.id}
              className={`pg-nav-item${activeSection === s.id ? " pg-nav-item--active" : ""}`}
              onClick={() => setActiveSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Content ── */}
      <main className="pg-content">

        {/* ══════════════════════════════════ BUTTONS */}
        {activeSection === "buttons" && (
          <div className="pg-sections">
            <header className="pg-section-header">
              <h1 className="pg-section-title">Buttons</h1>
              <p className="pg-section-desc">All button variants, colors, sizes, and states. Loaders simulate async actions.</p>
            </header>

            <section className="pg-card">
              <h2 className="pg-card__title">Button — variants × colors</h2>
              <div className="pg-grid pg-grid--auto">
                {(["contained","outlined","text","linkButton"] as const).map((variant) =>
                  (["primary","secondary","error","destructive"] as const).map((color) => (
                    <Button key={`${variant}-${color}`} variant={variant} color={color} size="medium">
                      {variant} · {color}
                    </Button>
                  ))
                )}
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">Button — small size</h2>
              <div className="pg-row">
                <Button variant="contained" color="primary"   size="small">Contained</Button>
                <Button variant="outlined"  color="secondary" size="small">Outlined</Button>
                <Button variant="text"      color="primary"   size="small">Text</Button>
                <Button variant="outlined"  color="error"     size="small">Error</Button>
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">Button — with icons</h2>
              <div className="pg-row">
                <Button variant="contained" color="primary"   startIcon={<Icon name="plus" />}>Add clip</Button>
                <Button variant="outlined"  color="secondary" endIcon={<Icon name="chevron-down-small" />}>Export</Button>
                <Button variant="contained" color="destructive" startIcon={<Icon name="trash" />}>Delete</Button>
                <Button variant="outlined"  color="primary"   startIcon={<Icon name="upload" />} endIcon={<Icon name="chevron-down-small" />}>Upload</Button>
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">Button — disabled</h2>
              <div className="pg-row">
                <Button variant="contained" color="primary"   disabled>Contained</Button>
                <Button variant="outlined"  color="secondary" disabled>Outlined</Button>
                <Button variant="text"      color="primary"   disabled>Text</Button>
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">ButtonWithLoader — click to simulate async</h2>
              <div className="pg-row">
                {([
                  { label: "Save",   color: "primary"     as const },
                  { label: "Submit", color: "secondary"   as const },
                  { label: "Delete", color: "destructive" as const },
                ]).map((item, idx) => (
                  <ButtonWithLoader key={idx} color={item.color} loading={loadingIdx === idx} onClick={() => triggerLoad(idx)}>
                    {item.label}
                  </ButtonWithLoader>
                ))}
                <ButtonWithLoader
                  color="primary" variant="outlined" iconOnly
                  loading={loadingIdx === 3} onClick={() => triggerLoad(3)} aria-label="Refresh"
                >
                  <Icon name="reload" />
                </ButtonWithLoader>
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">Spinner — standalone</h2>
              <div className="pg-row pg-row--center">
                <Spinner size="sm" />
                <Spinner size="md" />
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">IconButton — variants × colors</h2>
              <div className="pg-row pg-row--wrap">
                {(["contained","outlined","text"] as const).map((variant) =>
                  (["primary","secondary","error","destructive"] as const).map((color) => (
                    <IconButton key={`${variant}-${color}`} icon={<Icon name="settings" />} variant={variant} color={color} aria-label={`${variant} ${color}`} />
                  ))
                )}
                <IconButton icon={<Icon name="trash" />} color="destructive" variant="outlined" aria-label="Delete" disabled />
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">ButtonDropdown — variants</h2>
              <div className="pg-row pg-row--wrap">
                <ButtonDropdown variant="label" label="Label only" />
                <ButtonDropdown variant="label-icon" label="With icon" startIcon={<Icon name="plus" />} />
                <ButtonDropdown variant="label-dropdown" label="With dropdown" onDropdownClick={() => showSnack("info", "Dropdown clicked")} />
                <ButtonDropdown variant="label-icon-dropdown" label="Full split" startIcon={<Icon name="upload" />} onDropdownClick={() => showSnack("info", "Dropdown clicked")} />
                <ButtonDropdown variant="label" label="Disabled" disabled />
              </div>
            </section>
          </div>
        )}

        {/* ══════════════════════════════════ ICONS */}
        {activeSection === "icons" && (
          <div className="pg-sections">
            <header className="pg-section-header">
              <h1 className="pg-section-title">Icons</h1>
              <p className="pg-section-desc">{iconNames.length} icons · small (16px) · medium (20px, default) · large (24px)</p>
            </header>

            <section className="pg-card">
              <h2 className="pg-card__title">Icon sizes</h2>
              <div className="pg-row pg-row--center">
                <div className="pg-icon-demo"><Icon name="star" iconSize="small"  /><span>small · 16px</span></div>
                <div className="pg-icon-demo"><Icon name="star" iconSize="medium" /><span>medium · 20px</span></div>
                <div className="pg-icon-demo"><Icon name="star" iconSize="large"  /><span>large · 24px</span></div>
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">All icons — search to filter</h2>
              <input
                className="pg-search"
                type="text"
                placeholder="Search icons…"
                value={iconQuery}
                onChange={(e) => setIconQuery(e.target.value)}
              />
              <div className="pg-icon-grid">
                {filteredIcons.map((name) => (
                  <button
                    key={name}
                    className="pg-icon-tile"
                    title={name}
                    onClick={() => showSnack("info", `Copied: ${name}`)}
                  >
                    <Icon name={name as IconName} iconSize="medium" />
                    <span>{name}</span>
                  </button>
                ))}
                {filteredIcons.length === 0 && (
                  <p style={{ color: "var(--cw-text-helper)", gridColumn: "1/-1" }}>No icons match "{iconQuery}"</p>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ══════════════════════════════════ ALERTS */}
        {activeSection === "alerts" && (
          <div className="pg-sections">
            <header className="pg-section-header">
              <h1 className="pg-section-title">Alerts</h1>
              <p className="pg-section-desc">InlineAlert — section-level feedback. 4 severities × 2 styles.</p>
            </header>

            <section className="pg-card">
              <h2 className="pg-card__title">InlineAlert — default style</h2>
              <div className="pg-stack">
                {(["error","warning","info","success"] as InlineAlertSeverity[]).map((s) => (
                  <InlineAlert key={s} severity={s} style="default" title={`${s} title`} description="Supporting description text for this alert." actionLabel="Action" onClose={() => {}} />
                ))}
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">InlineAlert — filled style</h2>
              <div className="pg-stack">
                {(["error","warning","info","success"] as InlineAlertSeverity[]).map((s) => (
                  <InlineAlert key={s} severity={s} style="filled" title={`${s} title`} description="Supporting description text for this alert." actionLabel="Action" onClose={() => {}} />
                ))}
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">InlineAlert — title only · no actions</h2>
              <div className="pg-stack">
                <InlineAlert severity="error"   title="Payout account failed verification." />
                <InlineAlert severity="warning" title="Three onboarding flows need manual review." />
                <InlineAlert severity="info"    title="Weekly export window starts in 3 hours." />
                <InlineAlert severity="success" title="Banking profile synced successfully." />
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">InlineAlert — with actions + close</h2>
              <div className="pg-stack">
                <InlineAlert severity="error"   title="Upload failed." description="All 3 files failed format validation." actionLabel="Retry" onAction={() => showSnack("info", "Retry triggered")} />
                <InlineAlert severity="warning" title="Draft expires in 24 hours." description="Save or publish before the deadline." actionLabel="Publish" onAction={() => showSnack("success", "Published")} onClose={() => {}} />
              </div>
            </section>
          </div>
        )}

        {/* ══════════════════════════════════ MODALS */}
        {activeSection === "modals" && (
          <div className="pg-sections">
            <header className="pg-section-header">
              <h1 className="pg-section-title">Modal · Backdrop</h1>
              <p className="pg-section-desc">3 types (simple, form, scrollable) · 4 sizes (xs, sm, md, lg). Backdrop always wraps Modal.</p>
            </header>

            <section className="pg-card">
              <h2 className="pg-card__title">Modal — types (xs size)</h2>
              <div className="pg-row">
                {(["simple","form","scrollable"] as ModalType[]).map((type) => (
                  <Button key={type} variant="outlined" color="secondary" onClick={() => openModal(type)}>
                    Open {type}
                  </Button>
                ))}
              </div>
              <p className="pg-hint">simple = no dividers · form = dividers · scrollable = scrollable content</p>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">Modal — with icon in title</h2>
              <div className="pg-row">
                <Button variant="outlined" color="error" onClick={() => { setModalType("simple"); setModalOpen(true); }}>
                  Open with icon
                </Button>
              </div>
            </section>
          </div>
        )}

        {/* ══════════════════════════════════ OVERLAYS */}
        {activeSection === "overlays" && (
          <div className="pg-sections">
            <header className="pg-section-header">
              <h1 className="pg-section-title">Tooltip · Popover</h1>
              <p className="pg-section-desc">Tooltip = hover, text only. Popover = click, rich content. No backdrop on either.</p>
            </header>

            <section className="pg-card">
              <h2 className="pg-card__title">Tooltip — hover to reveal (top · bottom · left · right)</h2>
              <div className="pg-row pg-row--center pg-row--gap-xl">
                {(["top","bottom","left","right"] as const).map((placement) => (
                  <div key={placement} className={`pg-tooltip-wrap pg-tooltip-wrap--${placement}`}>
                    <Button variant="outlined" color="secondary" size="small">{placement}</Button>
                    <Tooltip content={`Tooltip ${placement}`} />
                  </div>
                ))}
              </div>
            </section>

            {/* Popover 1 — default slot API */}
            <section className="pg-card">
              <h2 className="pg-card__title">Popover — title / description / action slots</h2>
              <div className="pg-row pg-row--center">
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Button
                    variant="outlined" color="secondary"
                    onClick={() => { setPopover1Open((v) => !v); setPopover2Open(false); }}
                    endIcon={<Icon name="chevron-down-small" />}
                  >
                    {popover1Open ? "Close" : "Open"} popover
                  </Button>
                  {popover1Open && (
                    <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 300 }}>
                      <Popover
                        title="Clip details"
                        description="This clip was uploaded on April 10 and is currently under review. Approval usually takes 24–48 hours."
                        action={
                          <button
                            onClick={() => { setPopover1Open(false); showSnack("info", "View log opened"); }}
                            style={{ color: "var(--cw-text-link-default)", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem" }}
                          >
                            View full log
                          </button>
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Popover 2 — custom children */}
            <section className="pg-card">
              <h2 className="pg-card__title">Popover — custom children</h2>
              <div className="pg-row pg-row--center">
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Button
                    variant="text" color="primary"
                    startIcon={<Icon name="info-circle" />}
                    onClick={() => { setPopover2Open((v) => !v); setPopover1Open(false); }}
                  >
                    More info
                  </Button>
                  {popover2Open && (
                    <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 300 }}>
                      <Popover>
                        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                          <p style={{ color: "var(--cw-text-primary)", fontWeight: 500, margin: 0 }}>Custom content</p>
                          <p style={{ color: "var(--cw-text-secondary)", fontSize: "0.875rem", margin: 0 }}>Popover accepts any React children for non-standard layouts.</p>
                          <Button size="small" color="primary" onClick={() => setPopover2Open(false)}>Got it</Button>
                        </div>
                      </Popover>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ══════════════════════════════════ FEEDBACK */}
        {activeSection === "feedback" && (
          <div className="pg-sections">
            <header className="pg-section-header">
              <h1 className="pg-section-title">Validation · Snackbar</h1>
              <p className="pg-section-desc">Field-level messages and global transient feedback.</p>
            </header>

            <section className="pg-card">
              <h2 className="pg-card__title">ValidationMessage — default (bordered)</h2>
              <div className="pg-stack">
                <ValidationMessage severity="error"   message="All files must be the same format." />
                <ValidationMessage severity="warning" message="Image resolution may be too low for verification." />
                <ValidationMessage severity="info"    message="You may upload front and back separately." />
                <ValidationMessage severity="success" message="File uploaded successfully." />
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">ValidationMessage — compact (inline)</h2>
              <div className="pg-stack">
                <ValidationMessage severity="error"   variant="compact" message="Performer ID is required." />
                <ValidationMessage severity="warning" variant="compact" message="This file is already attached." />
                <ValidationMessage severity="info"    variant="compact" message="Multiple pages can be merged after upload." />
                <ValidationMessage severity="success" variant="compact" message="Files merged into a single document." />
              </div>
            </section>

            <section className="pg-card">
              <h2 className="pg-card__title">Snackbar — click to trigger</h2>
              <p className="pg-hint">Auto-dismisses. Pauses on hover. Max one visible at a time.</p>
              <div className="pg-row pg-row--wrap">
                <Button variant="outlined" color="primary"   size="small" onClick={() => showSnack("success", "Changes saved.", "View")}>Success</Button>
                <Button variant="outlined" color="secondary" size="small" onClick={() => showSnack("info",    "New pricing suggestions available.", "View details")}>Info</Button>
                <Button variant="outlined" color="secondary" size="small" onClick={() => showSnack("warning", "2 files failed to upload.", "Retry")}>Warning</Button>
                <Button variant="outlined" color="error"     size="small" onClick={() => showSnack("error",   "Upload failed. Please try again.", "Retry")}>Error</Button>
              </div>
            </section>
          </div>
        )}

      </main>

      {/* ── Global overlays ── */}
      <Backdrop open={modalOpen} onClick={() => setModalOpen(false)} />
      <Modal
        open={modalOpen}
        title="Example modal"
        titleIcon={modalType === "simple" ? <Icon name="warning-circle" /> : undefined}
        type={modalType}
        size="xs"
        onClose={() => setModalOpen(false)}
        actions={[
          { label: "Cancel",  onClick: () => setModalOpen(false), variant: "secondary" },
          { label: "Confirm", onClick: () => { setModalOpen(false); showSnack("success", "Action confirmed."); }, variant: "primary" },
        ]}
      >
        <p style={{ color: "var(--cw-text-secondary)", fontSize: "14px", lineHeight: "20px", margin: 0 }}>
          This is a <strong style={{ color: "var(--cw-text-primary)" }}>{modalType}</strong> modal at xs size.
          {modalType === "scrollable" && " The content area can overflow and scroll independently."}
          {modalType === "form"       && " The form type adds dividers between sections."}
          {modalType === "simple"     && " The simple type has no dividers — best for confirmations."}
        </p>
      </Modal>

      {snack && (
        <Snackbar
          severity={snack.severity}
          message={snack.message}
          actionLabel={snack.actionLabel}
          onAction={() => setSnack(null)}
          onClose={() => setSnack(null)}
        />
      )}

    </div>
  );
}
