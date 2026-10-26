import type { ComponentPublicInstance } from 'vue'

export type LoadingState = 'default' | 'success' | 'error' | 'warning'
export type LoadingPosition = 'top' | 'bottom'

export interface LoadingOptions {
  percent: number,
  strokeWidth?: number,
  state?: LoadingState,
  position?: LoadingPosition,
  maxPercent?: number,
}

export interface LoadingInstance extends ComponentPublicInstance {
  startLoading: (options: LoadingOptions) => void,
}
