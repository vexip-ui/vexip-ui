import type { ComponentPublicInstance } from 'vue'

export type CaptchaType = 'slide' | 'slide-image' | 'rotate-image' | 'point' | 'select'

export interface CaptchaExposed extends ComponentPublicInstance {
  refresh: () => void
}
