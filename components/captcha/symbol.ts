import type { ComponentPublicInstance } from 'vue'

export type CaptchaType = 'slide' | 'point'

export interface CaptchaExposed extends ComponentPublicInstance {
  dragging: boolean,
  reset: () => void
}
