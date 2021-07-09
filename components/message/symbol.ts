import type { ComponentPublicInstance } from 'vue'

export type Key = string | number
export type MessageType = 'info' | 'success' | 'warning' | 'error'
export type MessagePlacement = 'top' | 'bottom'

export interface MessageOptions extends Record<string, unknown> {
  content?: string,
  key?: Key,
  icon?: string | Record<string, unknown> | (() => any),
  type?: MessageType,
  duration?: number,
  renderer?: () => any
  // className: string | any[] | { [x: string]: any }
  // background?: boolean
  // color?: boolean
  // closable?: boolean
  // icon?: string
  // iconColor?: string
}

export interface MessageInstance extends ComponentPublicInstance {
  placement: MessagePlacement,
  add: (options: MessageOptions) => void,
  remove: (key: string | number) => void,
  clear: () => void
}
