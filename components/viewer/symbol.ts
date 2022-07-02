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
  MirrorFlip = 'mirrorFlip',
  ZoomIn = 'zoomIn',
  ZoomOut = 'zoomOut',
  FullScreen = 'fullScreen',
  FullScreenExit = 'fullScreenExit',
  Reset = 'reset'
}

export interface ViewerState {
  x: number,
  y: number,
  zoom: number,
  rotate: number,
  full: boolean,
  moving: boolean,
  [custom: string]: unknown
}

export interface ToolbarAction {
  name: string,
  icon: Record<string, any> | ((data: { state: ViewerState }) => any),
  process: (state: ViewerState) => void,
  title?: string | ((state: ViewerState) => string),
  iconScale?: number | ((state: ViewerState) => number),
  divided?: boolean | ((state: ViewerState) => boolean),
  hidden?: boolean | ((state: ViewerState) => boolean),
  disabled?: boolean | ((state: ViewerState) => boolean)
}
