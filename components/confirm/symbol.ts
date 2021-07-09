import type { ComponentPublicInstance, CSSProperties } from 'vue'

export type ConfirmType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

export interface ConfirmOptions extends Record<string, unknown> {
  content?: string,
  confirmType?: ConfirmType,
  confirmText?: string,
  cancelText?: string,
  icon?: string | Record<string, unknown> | (() => any),
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
