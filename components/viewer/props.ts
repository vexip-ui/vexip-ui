import { booleanNumberProp, booleanProp, buildProps, eventProp, localeProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type {
  ViewerActionLayout,
  ViewerState,
  ViewerToolbarAction,
  ViewerToolbarPlacement,
} from './symbol'

export const viewerProps = buildProps({
  locale: localeProp('viewer'),
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
  actions: Array as PropType<ViewerToolbarAction[]>,
  toolbarFade: booleanNumberProp,
  noTransition: booleanProp,
  centerScale: booleanProp,
  actionLayout: Array as PropType<ViewerActionLayout>,
  onMoveStart: eventProp<(state: ViewerState) => void>(),
  onMove: eventProp<(state: ViewerState) => void>(),
  onMoveEnd: eventProp<(state: ViewerState) => void>(),
  onWheel: eventProp<(sign: 1 | -1, state: ViewerState) => void>(),
  onRotate: eventProp<(deg: number, state: ViewerState) => void>(),
  onFlipX: eventProp<(flip: boolean, state: ViewerState) => void>(),
  onFlipY: eventProp<(flip: boolean, state: ViewerState) => void>(),
  onZoom: eventProp<(zoom: number, state: ViewerState) => void>(),
  onFull: eventProp<(full: boolean, state: ViewerState) => void>(),
  onReset: eventProp<(state: ViewerState) => void>(),
})

export type ViewerProps = ExtractPropTypes<typeof viewerProps>
export type ViewerCProps = ConfigurableProps<ViewerProps>
