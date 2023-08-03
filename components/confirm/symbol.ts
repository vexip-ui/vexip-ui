import type { ComponentPublicInstance } from 'vue'
import type { ButtonType } from '@/components/button'

export type ConfirmButtonType = ButtonType
export type ConfirmAlign = 'left' | 'center' | 'right'
export type ConfirmRenderFn = (
  options: ConfirmOptions,
  confirm: () => Promise<void>,
  cancel: () => void
) => any

export interface ConfirmOptions extends Record<string, any> {
  title?: string,
  content?: string,
  confirmType?: ConfirmButtonType,
  cancelType?: ConfirmButtonType,
  confirmText?: string,
  cancelText?: string,
  icon?: Record<string, any> | (() => any) | null,
  iconColor?: string,
  className?: string | Record<string, any>,
  style?: string | Record<string, any>,
  closable?: boolean,
  maskClose?: boolean,
  parseHtml?: boolean,
  contentAlign?: ConfirmAlign,
  actionsAlign?: ConfirmAlign,
  renderer?: ConfirmRenderFn,
  onBeforeConfirm?: () => unknown
}

export interface ConfirmInstance extends ComponentPublicInstance {
  openConfirm: (options: ConfirmOptions) => Promise<boolean>,
  handleReset: () => void
}
