import type { ComponentPublicInstance } from 'vue'
import type { ClassType, StyleType } from '@vexip-ui/config'
import type { IconMinorProps } from '@/components/icon'

export type ToastType = 'success' | 'warning' | 'error' | 'loading'
export type ToastPosition = 'top' | 'center' | 'bottom'

export interface ToastOptions extends Record<string, any> {
  type?: ToastType | null,
  content?: string,
  icon?: Record<string, any> | (() => any) | null,
  iconProps?: IconMinorProps,
  position?: ToastPosition,
  transitionName?: string,
  closable?: boolean,
  maskClose?: boolean,
  showMask?: boolean,
  maskClass?: ClassType,
  maskStyle?: StyleType,
  parseHtml?: boolean,
  onClose?: () => void
}

export interface ToastInstance extends ComponentPublicInstance {
  openToast: (options: ToastOptions) => Promise<void>,
  cloasToast: () => void
}
