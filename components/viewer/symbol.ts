export type ToolbarPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export enum InternalActionName {
  RotateRight = 'rotateRight',
  RotateLeft = 'rotateLeft',
  ScalePlus = 'scalePlus',
  ScaleMinus = 'scaleMinus',
  ScreenFull = 'screenFull',
  ScreenFullExit = 'screenFullExit'
}

export interface ViewerState {
  x: number,
  y: number,
  scale: number,
  rotate: number,
  full: boolean,
  moving: boolean,
  transiting: boolean,
  [custom: string]: unknown
}

export interface ToolbarAction {
  name: string,
  icon: Record<string, any> | ((data: { state: ViewerState }) => any),
  process: (state: ViewerState) => void,
  iconScale?: number,
  divided?: boolean,
  hidden?: (state: ViewerState) => boolean,
  disabled?: (state: ViewerState) => boolean
}
