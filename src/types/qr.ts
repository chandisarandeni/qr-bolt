export type ErrorLevel = 'L' | 'M' | 'Q' | 'H'

export type QRSettings = {
  text: string
  size: number
  margin: number
  level: ErrorLevel
  inverted: boolean
}
