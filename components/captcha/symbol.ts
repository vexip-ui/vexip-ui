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
  reset: (image?: string | (() => Promise<string>)) => void,
}

export interface CaptchaSliderSlots {
  tip?: (params: { success: boolean }) => any,
  trigger?: (params: { success: boolean }) => any,
}

export interface CaptchaSlots {
  title?: (params: { success: boolean }) => any,
  tip?: (params: { success: boolean }) => any,
  texts?: (params: { tests: string[] }) => any,
  refresh?: () => any,
  loadingIcon?: () => any,
  trigger?: (params: { visible: boolean, success: boolean }) => any,
}

export type SuccessEvent = (value: number | number[]) => void
