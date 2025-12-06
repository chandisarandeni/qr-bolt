# QR Bolt

Single-page QR code generator with a black-and-white aesthetic. Everything renders client-side: paste a full URL (no need to strip `https://`), tune size, quiet zone, error correction, invert colors, and export a framed PNG that matches the on-screen preview.

## Features
- Live preview of your QR code with adjustable size and quiet zone
- Error correction levels L/M/Q/H and optional color inversion for dark surfaces
- PNG download with a clean white frame that mirrors the preview
- Copy the PNG data URL to the clipboard for reuse
- Responsive layout and monochrome styling built for focus and clarity

## Quick start
1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev` (open the shown localhost URL)
3. Build for production: `npm run build`
4. Preview the build: `npm run preview`

## Using the app
- Paste your content or full link into the Content box (keep the `https://` prefix if present).
- Adjust Size, Quiet zone, and Error correction to fit your use case.
- Toggle “Invert black/white” if the QR will sit on a dark background.
- Download PNG to get the framed QR exactly as shown in the preview, or Copy data URL to reuse it elsewhere.

## Project structure
- `src/App.tsx`: Main page and generation logic using the `qrcode` library
- `src/components/ControlsPanel.tsx`: Inputs for content and QR settings
- `src/components/PreviewPanel.tsx`: Live preview, status, and export actions
- `src/App.css`, `src/index.css`: Monochrome theme and layout styles

## Tech stack
- React + TypeScript + Vite
- `qrcode` for generating QR code PNGs
