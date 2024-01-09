import type { ComponentPublicInstance, MaybeRef } from 'vue'
import type { MaybeInstance } from '@vexip-ui/hooks'

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
  children?: ContextmenuConfig[],
  renderer?: () => any
}

export interface ContextmenuOptions {
  clientX: number,
  clientY: number,
  configs: ContextmenuConfig[],
  target?: MaybeRef<string | MaybeInstance>,
  appear?: boolean
}

export interface ContextmenuInstance extends ComponentPublicInstance {
  openContextmenu: (options: ContextmenuOptions) => Promise<Key[] | null>,
  handleCancel: () => void
}
