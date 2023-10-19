import type { ComponentPublicInstance } from 'vue'

export type CaptchaType = 'slide' | 'point'

export type CaptchaBeforeTest =
  | ((percent: number, matched: boolean) => unknown)
  | ((positions: number[]) => unknown)

export interface CaptchaExposed extends ComponentPublicInstance {
  dragging: boolean,
  imageLoading: boolean,
  imagePromise: Promise<void>,
  reset: (image?: string | (() => Promise<string>)) => void
}

export type SuccessEvent = (value: number | number[]) => void
