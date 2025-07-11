import type { ComponentPublicInstance } from 'vue'

export type Key = string | number
export type NoticeType = 'primary' | 'info' | 'success' | 'warning' | 'error'
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

export interface NoticeConfig {
  placement?: NoticePlacement,
  startOffset?: number,
  itemGap?: number
}

export interface NoticeInstance extends ComponentPublicInstance {
  add: (options: NoticeOptions) => void,
  remove: (key: string | number) => void,
  clear: () => void,
  config: (config: NoticeConfig) => void
}

export const effectiveTypes = Object.freeze(['primary', 'info', 'success', 'warning', 'error'])
// For a11n
export const assertiveTypes = Object.freeze(['success', 'warning', 'error'])
