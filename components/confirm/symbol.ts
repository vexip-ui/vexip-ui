import type { ComponentPublicInstance } from 'vue'
import type { ButtonType } from '@/components/button'
import type { IconMinorProps } from '@/components/icon'

export type ConfirmButtonType = ButtonType
export type ConfirmAlign = 'left' | 'center' | 'right'

export interface ConfirmState {
  visible: boolean,
  loading: boolean,
  title: string,
  content: string,
  icon: Record<string, any> | (() => any) | null | boolean,
  iconProps: IconMinorProps,
  className: string | Record<string, any>,
  style: string | Record<string, any>,
  confirmType: ConfirmButtonType,
  cancelType: ConfirmButtonType,
  confirmText: string,
  cancelText: string,
  maskClose: boolean,
  parseHtml: boolean,
  closable: boolean,
  contentAlign: ConfirmAlign,
  actionsAlign: ConfirmAlign,
  raw: Record<any, any>
}

export type ConfirmRenderFn = (
  options: ConfirmState,
  handleConfirm: () => Promise<void>,
  handleCancel: () => void
) => any

export interface ConfirmOptions extends Record<any, any> {
  title?: string,
  content?: string,
  confirmType?: ConfirmButtonType,
  cancelType?: ConfirmButtonType,
  confirmText?: string,
  cancelText?: string,
  icon?: Record<string, any> | (() => any) | null | boolean,
  iconProps?: IconMinorProps,
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
