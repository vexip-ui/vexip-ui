import type { ClassType, StyleType } from '@vexip-ui/config'

export interface SliderMarker {
  label?: string,
  class?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>
}

export type SliderRawMarkers =
  | Record<string | number, string | SliderMarker>
  | Array<number | (SliderMarker & { value: number })>

export interface SliderSlotParams {
  disabled: boolean,
  loading: boolean
}

export interface SliderTriggerParams extends SliderSlotParams {
  type: 'start' | 'end',
  value: number,
  sliding: boolean
}

export interface SliderMarkerSlotParams extends SliderSlotParams {
  values: number[],
  sliding: boolean[],
  markerValue: number,
  marker: SliderMarker,
  inRange: boolean
}

export type SliderTriggerSlot = (params: SliderTriggerParams) => any
export type SliderMarkerSlot = (params: SliderMarkerSlotParams) => any
