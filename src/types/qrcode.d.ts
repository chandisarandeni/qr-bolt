declare module 'qrcode' {
  export type QRCodeErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

  export type QRCodeToDataURLOptions = {
    width?: number
    margin?: number
    errorCorrectionLevel?: QRCodeErrorCorrectionLevel
    color?: {
      dark?: string
      light?: string
    }
  }

  export function toDataURL(text: string | Buffer, options?: QRCodeToDataURLOptions): Promise<string>
}
