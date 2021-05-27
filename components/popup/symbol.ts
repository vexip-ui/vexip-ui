export type Key = string | number
export type ClassType = string | Record<string, boolean>
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
  onOpen: (key: Key) => void,
  onClose: (result: boolean) => void
}

export const DELETE_HANDLER = Symbol('DELETE_HANDLER')
