import type { ComponentPublicInstance } from 'vue'

export type Key = string | number
export type MessageType = 'primary' | 'info' | 'success' | 'warning' | 'error'
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

export interface MessageConfig {
  placement?: MessagePlacement
}

export interface MessageInstance extends ComponentPublicInstance {
  add: (options: MessageOptions) => void,
  remove: (key: string | number) => void,
  clear: () => void,
  config: (config: MessageConfig) => void
}

export const effectiveTypes = Object.freeze(['primary', 'info', 'success', 'warning', 'error'])
// For a11n
export const assertiveTypes = Object.freeze(['success', 'warning', 'error'])
