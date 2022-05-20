import type { ComponentPublicInstance } from 'vue'

export type Key = string | number
export type NoticeType = 'info' | 'success' | 'warning' | 'error'
export type NoticePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export interface NoticeOptions extends Record<string, unknown> {
  title?: string,
  content?: string,
  key?: Key,
  icon?: Record<string, unknown> | (() => any),
  iconColor?: string,
  type?: NoticeType,
  duration?: number,
  className?: string | Record<string, unknown>,
  background?: boolean | string,
  color?: boolean | string,
  closable?: boolean,
  renderer?: () => any
}

export interface NoticeInstance extends ComponentPublicInstance {
  placement: NoticePlacement,
  add: (options: NoticeOptions) => void,
  remove: (key: string | number) => void,
  clear: () => void
}
