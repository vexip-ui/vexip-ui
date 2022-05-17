import type { ComponentPublicInstance } from 'vue'

export type Key = string | number
export type MessageType = 'info' | 'success' | 'warning' | 'error'
export type MessagePlacement = 'top' | 'bottom'

export interface MessageOptions extends Record<string, unknown> {
  content?: string,
  key?: Key,
  icon?: string | Record<string, unknown> | (() => any),
  iconColor?: string,
  type?: MessageType,
  duration?: number,
  className?: string | Record<string, unknown>,
  background?: boolean | string,
  color?: boolean | string,
  closable?: boolean,
  renderer?: () => any
}

export interface MessageInstance extends ComponentPublicInstance {
  placement: MessagePlacement,
  add: (options: MessageOptions) => void,
  remove: (key: string | number) => void,
  clear: () => void
}
