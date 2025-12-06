import type { QRSettings } from '../types/qr'

type CopyState = 'idle' | 'copied' | 'error'

type PreviewPanelProps = {
  dataUrl: string
  error?: string
  busy: boolean
  settings: QRSettings
  onDownload: () => void
  onCopy: () => Promise<void>
  copyState: CopyState
}

const copyLabel = (state: CopyState) => {
  if (state === 'copied') return 'Copied'
  if (state === 'error') return 'Copy failed'
  return 'Copy data URL'
}

function PreviewPanel({ dataUrl, error, busy, settings, onCopy, onDownload, copyState }: PreviewPanelProps) {
  return (
    <section className="panel preview" aria-live="polite">
      <div className="panel__header">
        <p className="tag">Preview</p>
        <div className={`status ${busy ? 'status--active' : ''}`}>{busy ? 'Rendering' : 'Ready'}</div>
      </div>

      <div className={`qr-frame ${!dataUrl ? 'qr-frame--empty' : ''}`}>
        {dataUrl ? (
          <img src={dataUrl} alt="Generated QR code" draggable="false" />
        ) : (
          <div className="placeholder">
            <div className="placeholder__ring" />
            <p className="muted">Type above to see your QR code.</p>
          </div>
        )}
      </div>

      <div className="settings-bar">
        <span className="pill pill--subtle">Level {settings.level}</span>
        <span className="pill pill--subtle">{settings.size}px</span>
        <span className="pill pill--subtle">Margin {settings.margin}px</span>
        {settings.inverted ? <span className="pill pill--subtle">Inverted</span> : null}
      </div>

      {error ? <p className="error">{error}</p> : <p className="muted">High-contrast PNG exports instantly.</p>}

      <div className="actions">
        <button className="button" type="button" disabled={!dataUrl || busy} onClick={onDownload}>
          Download PNG
        </button>
        <button
          className="button button--ghost"
          type="button"
          disabled={!dataUrl || busy}
          onClick={() => onCopy()}
        >
          {copyLabel(copyState)}
        </button>
      </div>
    </section>
  )
}

export default PreviewPanel
