import type { ClassType, StyleType } from '@vexip-ui/config'

export type ViewerToolbarPlacement =
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
export type ViewerPresetAction =
  | 'rotate-right'
  | 'rotate-left'
  | 'flip-x'
  | 'flip-y'
  | 'zoom-in'
  | 'zoom-out'
  | 'full-screen'
  | 'full-screen-exit'
  | 'reset'
// eslint-disable-next-line @typescript-eslint/ban-types
export type ViewerActionName = ViewerPresetAction | (string & {})
export type ViewerActionLayout = ViewerActionName[][]

export interface ViewerState {
  x: number,
  y: number,
  zoom: number,
  rotate: number,
  flipX: boolean,
  flipY: boolean,
  full: boolean,
  moving: boolean,
  [custom: string]: unknown
}

export interface ViewerToolbarAction {
  name: string,
  process: (state: ViewerState) => void,
  icon?: Record<string, any> | (() => any),
  iconRenderer?: (data: { state: ViewerState }) => any,
  class?: ClassType | ((state: ViewerState) => string),
  title?: string | ((state: ViewerState) => string),
  iconScale?: number | ((state: ViewerState) => number),
  iconStyle?: StyleType | ((state: ViewerState) => StyleType),
  /** @deprecated */
  divided?: boolean | ((state: ViewerState) => boolean),
  hidden?: boolean | ((state: ViewerState) => boolean),
  disabled?: boolean | ((state: ViewerState) => boolean)
}

export const enum InternalActionName {
  RotateRight = 'rotate-right',
  RotateLeft = 'rotate-left',
  FlipX = 'flip-x',
  FlipY = 'flip-y',
  ZoomIn = 'zoom-in',
  ZoomOut = 'zoom-out',
  FullScreen = 'full-screen',
  Reset = 'reset'
}

const defaultActionLayout: ViewerActionLayout = [
  ['rotate-right', 'rotate-left'],
  ['flip-x', 'flip-y'],
  ['zoom-in', 'zoom-out'],
  ['full-screen'],
  ['reset']
]

for (let i = 0, len = defaultActionLayout.length; i < len; ++i) {
  defaultActionLayout[i] = Object.freeze(defaultActionLayout[i]) as any
}

export const viewerDefaultActionLayout = Object.freeze(defaultActionLayout) as ViewerActionLayout
