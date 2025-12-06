import type { ErrorLevel, QRSettings } from '../types/qr'

type ControlsPanelProps = {
  settings: QRSettings
  onChange: <K extends keyof QRSettings>(key: K, value: QRSettings[K]) => void
}

const levelOptions: Array<{ value: ErrorLevel; title: string; helper: string }> = [
  { value: 'L', title: 'Level L', helper: 'Best for long text' },
  { value: 'M', title: 'Level M', helper: 'Balanced default' },
  { value: 'Q', title: 'Level Q', helper: 'Handles more damage' },
  { value: 'H', title: 'Level H', helper: 'For tiny, dense codes' },
]

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

function ControlsPanel({ settings, onChange }: ControlsPanelProps) {
  return (
    <section className="panel controls" aria-labelledby="controls-heading">
      <div className="panel__header">
        <p className="tag">Input</p>
        <p className="muted">Build your QR content and fine-tune the specs.</p>
      </div>

      <div className="field">
        <div className="field__label">
          <span id="controls-heading">Content</span>
          <span className="muted">{settings.text.length}/240</span>
        </div>
        <p className="muted help-text">Paste the full link—https:// will be trimmed automatically.</p>
        <textarea
          className="input input--area"
          maxLength={240}
          value={settings.text}
          placeholder="Paste a full URL, note, or Wi-Fi password."
          onChange={(event) => onChange('text', event.target.value)}
        />
      </div>

      <div className="grid two">
        <div className="field">
          <div className="field__label">
            <span>Size</span>
            <span className="pill pill--subtle">{settings.size}px</span>
          </div>
          <input
            className="input input--range"
            type="range"
            min={180}
            max={520}
            step={10}
            value={settings.size}
            onChange={(event) => onChange('size', clamp(Number(event.target.value), 180, 520))}
          />
        </div>

        <div className="field">
          <div className="field__label">
            <span>Quiet zone</span>
            <span className="pill pill--subtle">{settings.margin}px</span>
          </div>
          <input
            className="input input--range"
            type="range"
            min={0}
            max={10}
            step={1}
            value={settings.margin}
            onChange={(event) => onChange('margin', clamp(Number(event.target.value), 0, 10))}
          />
        </div>
      </div>

      <div className="field">
        <div className="field__label">
          <span>Error correction</span>
          <span className="muted">Increase if the code will be resized or worn.</span>
        </div>
        <div className="level-grid" role="group" aria-label="Error correction level">
          {levelOptions.map((option) => {
            const isActive = settings.level === option.value
            return (
              <button
                key={option.value}
                type="button"
                className={`chip ${isActive ? 'chip--active' : ''}`}
                aria-pressed={isActive}
                onClick={() => onChange('level', option.value)}
              >
                <span className="chip__title">{option.title}</span>
                <span className="chip__hint">{option.helper}</span>
              </button>
            )
          })}
        </div>
      </div>

      <label className="switch">
        <input
          type="checkbox"
          checked={settings.inverted}
          onChange={(event) => onChange('inverted', event.target.checked)}
        />
        <span className="switch__control" aria-hidden="true">
          <span className="switch__thumb" />
        </span>
        <div className="switch__text">
          <span>Invert black/white</span>
          <span className="muted">Better for dark print or screens.</span>
        </div>
      </label>
    </section>
  )
}

export default ControlsPanel
