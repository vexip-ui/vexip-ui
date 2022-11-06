import { buildProps, booleanProp, booleanNumberProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ViewerState, ViewerToolbarPlacement, ToolbarAction } from './symbol'

export const viewerProps = buildProps({
  width: [String, Number],
  height: [String, Number],
  moveDisabled: booleanProp,
  zoomDisabled: booleanProp,
  zoomDelta: Number,
  zoomMin: Number,
  zoomMax: Number,
  flipDisabled: booleanProp,
  rotateDisabled: booleanProp,
  rotateDelta: Number,
  fullDisabled: booleanProp,
  toolbarPlacement: String as PropType<ViewerToolbarPlacement>,
  actions: Array as PropType<ToolbarAction[]>,
  toolbarFade: booleanNumberProp,
  noTransition: booleanProp,
  onMoveStart: eventProp<(state: ViewerState) => void>(),
  onMove: eventProp<(state: ViewerState) => void>(),
  onMoveEnd: eventProp<(state: ViewerState) => void>(),
  onWheel: eventProp<(sign: 1 | -1, state: ViewerState) => void>(),
  onRotate: eventProp<(deg: number, state: ViewerState) => void>(),
  onFlipX: eventProp<(flip: boolean, state: ViewerState) => void>(),
  onFlipY: eventProp<(flip: boolean, state: ViewerState) => void>(),
  onZoom: eventProp<(zoom: number, state: ViewerState) => void>(),
  onFull: eventProp<(full: boolean, state: ViewerState) => void>(),
  onReset: eventProp<(state: ViewerState) => void>()
})

export type ViewerProps = ExtractPropTypes<typeof viewerProps>
export type ViewerCProps = ConfigurableProps<ViewerProps>
