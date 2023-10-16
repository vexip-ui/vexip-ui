import type { ComponentPublicInstance } from 'vue'

export type CaptchaType = 'slide' | 'point'

export interface CaptchaExposed extends ComponentPublicInstance {
  dragging: boolean,
  imageLoading: boolean,
  imagePromise: Promise<void>,
  reset: () => void
}
