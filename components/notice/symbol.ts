import type { ComponentPublicInstance } from 'vue'

export type Key = string | number
export type NoticeType = 'info' | 'success' | 'warning' | 'error'
export type NoticePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export interface NoticeOptions extends Record<string, any> {
  title?: string,
  content?: string,
  key?: Key,
  icon?: Record<string, any> | (() => any),
  iconColor?: string,
  type?: NoticeType,
  duration?: number,
  className?: string | Record<string, any>,
  style?: string | Record<string, any>,
  background?: boolean | string,
  color?: boolean | string,
  closable?: boolean,
  parseHtml?: boolean,
  renderer?: () => any
}

export interface NoticeInstance extends ComponentPublicInstance {
  placement: NoticePlacement,
  add: (options: NoticeOptions) => void,
  remove: (key: string | number) => void,
  clear: () => void
}
