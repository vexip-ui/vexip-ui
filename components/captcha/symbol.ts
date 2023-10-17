import type { ComponentPublicInstance } from 'vue'

export type CaptchaType = 'slide' | 'point'

export interface CaptchaBeforeTest {
  (percent: number, matched: boolean): unknown,
  (positions: number[]): unknown
}

export interface CaptchaExposed extends ComponentPublicInstance {
  dragging: boolean,
  imageLoading: boolean,
  imagePromise: Promise<void>,
  reset: () => void
}

export type SuccessEvent = (value: number | number[]) => void
