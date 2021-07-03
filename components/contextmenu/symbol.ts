import type { ComponentPublicInstance, VNodeChild } from 'vue'

export type Key = string | number

export interface MenuOptions {
  key: Key,
  label?: string,
  icon?: string | Record<string, unknown> | (() => VNodeChild),
  color?: string,
  iconColor?: string,
  disabled?: boolean,
  children?: MenuOptions[]
}

export interface ContextmenuInstance extends ComponentPublicInstance {
  openContextmenu: (menus: MenuOptions[]) => Promise<Key | null>
}
