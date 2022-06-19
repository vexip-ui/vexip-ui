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
  zIndex: number,
  height: number,
  visible: boolean,
  verticalPosition: number,
  type?: string,
  className?: any,
  style?: any,
  icon?:
    | string
    | ({
        name: string,
        scale?: number | string,
        title?: string,
        label?: string,
        spin?: boolean | string,
        pulse?: boolean | string,
        flip?: string
      } & Record<string, unknown>),
  iconColor?: string,
  onOpen: (key: Key) => void,
  onClose: (result: boolean) => void
}

export const DELETE_HANDLER: InjectionKey<(key: Key) => void> = Symbol('DELETE_HANDLER')
