import type { ComponentPublicInstance } from 'vue'

export type Key = string | number
export type MessageType = 'info' | 'success' | 'warning' | 'error'
export type MessagePlacement = 'top' | 'bottom'

export interface MessageOptions extends Record<string, any> {
  content?: string,
  key?: Key,
  icon?: Record<string, any> | (() => any),
  iconColor?: string,
  type?: MessageType | null,
  duration?: number,
  className?: string | Record<string, any>,
  style?: string | Record<string, any>,
  zIndex?: number,
  background?: boolean | string,
  color?: boolean | string,
  closable?: boolean,
  parseHtml?: boolean,
  liveOnEnter?: boolean,
  renderer?: () => any
}

export interface MessageInstance extends ComponentPublicInstance {
  placement: MessagePlacement,
  add: (options: MessageOptions) => void,
  remove: (key: string | number) => void,
  clear: () => void
}
