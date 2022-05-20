import type { ComponentPublicInstance, CSSProperties } from 'vue'

export type ConfirmType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

export interface ConfirmOptions extends Record<string, unknown> {
  content?: string,
  confirmType?: ConfirmType,
  confirmText?: string,
  cancelText?: string,
  icon?: Record<string, unknown> | (() => any) | null,
  iconColor?: string,
  style?: CSSProperties,
  maskClose?: boolean,
  renderer?: () => any,
  beforeConfirm?: () => unknown
}

export interface ConfirmInstance extends ComponentPublicInstance {
  openConfirm: (options: ConfirmOptions) => Promise<boolean>,
  handleReset: () => void
}
