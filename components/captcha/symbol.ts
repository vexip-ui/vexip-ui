import type { ComponentPublicInstance } from 'vue'
import type { CaptchaSliderExposed } from '@/components/captcha-slider'

export type CaptchaType = 'slide' | 'point'

export type CaptchaBeforeTest =
  | ((percent: number, matched: boolean) => unknown)
  | ((positions: number[]) => unknown)

export interface CaptchaExposed extends ComponentPublicInstance {
  dragging: boolean,
  resetting: boolean,
  isSuccess: boolean,
  imageLoading: boolean,
  imagePromise: Promise<void>,
  wrapper?: HTMLElement | null,
  canvas?: HTMLCanvasElement | null,
  subCanvas?: HTMLCanvasElement | null,
  slider?: CaptchaSliderExposed | null,
  reset: (image?: string | (() => Promise<string>)) => void
}

export type SuccessEvent = (value: number | number[]) => void
