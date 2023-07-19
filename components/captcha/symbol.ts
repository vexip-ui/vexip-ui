import type { ComponentPublicInstance } from 'vue'

export interface CaptchaExposed extends ComponentPublicInstance {
  dragging: boolean,
  reset: () => void
}
