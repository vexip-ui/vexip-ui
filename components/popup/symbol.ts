import type { InjectionKey } from 'vue'

export type Key = string | number
export type PopupPlacement =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left'

export interface PopupItemState extends Record<string, unknown> {
  key: Key,
  content: string,
  closable: boolean,
  height: number,
  visible: boolean,
  verticalPosition: number,
  type?: string,
  className?: any,
  style?: any,
  icon?: Record<string, any> | (() => any),
  iconColor?: string,
  onOpen: (key: Key) => void,
  onClose: (result: boolean) => void,
  onEnter: () => void,
  onLeave: () => void
}

export const DELETE_HANDLER: InjectionKey<(key: Key) => void> = Symbol('DELETE_HANDLER')

export const popupPlacements = Object.freeze<PopupPlacement[]>([
  'top-right',
  'top-center',
  'top-left',
  'bottom-right',
  'bottom-center',
  'bottom-left'
])
