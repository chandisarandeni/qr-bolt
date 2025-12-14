# QR Bolt

A slick, single-page QR code generator focused on crisp black-and-white output. Everything runs client-side: paste a link or note, tune the specs, and export a framed PNG that matches the live preview.

## Highlights
- Local-only generation with the `qrcode` library; nothing leaves the browser.
- Live preview with adjustable size (180-520px), quiet zone (0-10px), and error correction (L/M/Q/H).
- Optional invert toggle for dark backgrounds and a framed PNG export with extra white padding.
- Copy the PNG data URL to the clipboard for reuse in docs, design tools, or CMS entries.
- Responsive monochrome UI that keeps attention on the QR itself.

## How to use
1. Paste your content into **Content**. `https://` is trimmed automatically; up to 240 characters are supported.
2. Adjust **Size** and **Quiet zone** with the sliders to fit print or screen needs.
3. Pick an **Error correction** level (L/M/Q/H) based on how much resizing or wear the code will see.
4. Toggle **Invert black/white** if the code will sit on a dark surface or UI.
5. Choose **Download PNG** for a framed export, or **Copy data URL** to embed the image elsewhere.

## Development
- Install: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Preview production build: `npm run preview`

## Project layout
- `src/App.tsx`: Page shell, QR generation, download/copy handlers.
- `src/components/ControlsPanel.tsx`: Inputs for content, sizing, quiet zone, error correction, and inversion.
- `src/components/PreviewPanel.tsx`: Live preview, status display, and export actions.
- `src/App.css`, `src/index.css`: Monochrome theme, layout, and typography.

## Stack
- React + TypeScript + Vite
- `qrcode` for PNG generation
