import { useEffect, useState } from 'react'
import * as QRCode from 'qrcode'
import ControlsPanel from './components/ControlsPanel'
import PreviewPanel from './components/PreviewPanel'
import type { QRSettings } from './types/qr'
import './App.css'

type CopyState = 'idle' | 'copied' | 'error'

const defaultSettings: QRSettings = {
  text: 'https://',
  size: 320,
  margin: 2,
  level: 'M',
  inverted: false,
}

function App() {
  const [settings, setSettings] = useState<QRSettings>(defaultSettings)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [copyState, setCopyState] = useState<CopyState>('idle')

  useEffect(() => {
    let cancelled = false

    const generate = async () => {
      if (!settings.text.trim()) {
        setQrDataUrl('')
        setError('Enter text or a URL to generate a QR code.')
        return
      }

      setBusy(true)
      setError('')

      try {
        const dataUrl = await QRCode.toDataURL(settings.text, {
          width: settings.size,
          margin: settings.margin,
          errorCorrectionLevel: settings.level,
          color: {
            dark: settings.inverted ? '#ffffff' : '#0b0b0b',
            light: settings.inverted ? '#0b0b0b' : '#ffffff',
          },
        })

        if (!cancelled) {
          setQrDataUrl(dataUrl)
        }
      } catch (generationError) {
        console.error('QR generation failed', generationError)
        if (!cancelled) {
          setError('We could not render that QR code. Try shorter content.')
          setQrDataUrl('')
        }
      } finally {
        if (!cancelled) {
          setBusy(false)
        }
      }
    }

    void generate()

    return () => {
      cancelled = true
    }
  }, [settings])

  const updateSetting = <K extends keyof QRSettings>(key: K, value: QRSettings[K]) => {
    setCopyState('idle')
    setSettings((previous) => ({ ...previous, [key]: value }))
  }

  const handleDownload = () => {
    if (!qrDataUrl) return

    const link = document.createElement('a')
    link.href = qrDataUrl
    link.download = 'qr-bolt.png'
    link.click()
  }

  const handleCopy = async () => {
    if (!qrDataUrl) return
    if (!navigator?.clipboard) {
      setCopyState('error')
      return
    }

    try {
      await navigator.clipboard.writeText(qrDataUrl)
      setCopyState('copied')
      window.setTimeout(() => setCopyState('idle'), 1600)
    } catch (copyError) {
      console.error('Clipboard error', copyError)
      setCopyState('error')
      window.setTimeout(() => setCopyState('idle'), 1600)
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <div className="tag">QR Bolt</div>
        <h1 className="headline">Generate sharp black + white QR codes on the fly.</h1>
        <p className="lede">
          Local, instant generation with adjustable size, quiet zone, and error correction. Perfect for print or
          digital screens.
        </p>
        <div className="meta">
          <span className="pill">Client-side only</span>
          <span className="pill">PNG export</span>
          <span className="pill">Live preview</span>
        </div>
      </header>

      <main className="layout">
        <ControlsPanel settings={settings} onChange={updateSetting} />
        <PreviewPanel
          dataUrl={qrDataUrl}
          error={error}
          busy={busy}
          settings={settings}
          onCopy={handleCopy}
          onDownload={handleDownload}
          copyState={copyState}
        />
      </main>
    </div>
  )
}

export default App
