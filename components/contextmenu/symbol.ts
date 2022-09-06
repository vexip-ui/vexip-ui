import type { ComponentPublicInstance } from 'vue'

export type Key = string | number

export interface ContextmenuConfig {
  key: Key,
  label?: string,
  icon?: Record<string, unknown> | (() => any),
  color?: string,
  iconColor?: string,
  shortcut?: string,
  divided?: boolean,
  disabled?: boolean,
  children?: ContextmenuConfig[]
}

export interface ContextmenuOptions {
  clientX: number,
  clientY: number,
  appear?: boolean,
  configs: ContextmenuConfig[]
}

export interface ContextmenuInstance extends ComponentPublicInstance {
  openContextmenu: (options: ContextmenuOptions) => Promise<Key[] | null>,
  handleCancel: () => void
}
