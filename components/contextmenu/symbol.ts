import type { ComponentPublicInstance } from 'vue'

export type Key = string | number

export interface MenuConfig {
  key: Key,
  label?: string,
  icon?: Record<string, unknown> | (() => any),
  color?: string,
  iconColor?: string,
  shortcut?: string,
  divided?: boolean,
  disabled?: boolean,
  children?: MenuConfig[]
}

export interface MenuOptions {
  clientX: number,
  clientY: number,
  appear?: boolean,
  configs: MenuConfig[]
}

export interface ContextmenuInstance extends ComponentPublicInstance {
  openContextmenu: (options: MenuOptions) => Promise<Key | null>,
  handleCancel: () => void
}
