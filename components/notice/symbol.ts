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
  type?: NoticeType | null,
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

export interface NoticeInstance extends ComponentPublicInstance {
  placement: NoticePlacement,
  add: (options: NoticeOptions) => void,
  remove: (key: string | number) => void,
  clear: () => void
}

export const effectiveTypes = Object.freeze(['info', 'success', 'warning', 'error'])
export const assertiveTypes = Object.freeze(['success', 'warning', 'error'])
