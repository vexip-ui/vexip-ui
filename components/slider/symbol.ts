import type { ClassType, StyleType } from '@vexip-ui/config'
import type { TooltipProps } from '@/components/tooltip'

export interface SliderMarker {
  label?: string,
  class?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>
}

export type SliderRawMarkers =
  | Record<string | number, string | SliderMarker>
  | Array<number | (SliderMarker & { value: number })>

export type SliderTipProps = Omit<
  TooltipProps,
  'trigger' | 'transfer' | 'visible' | 'disabled' | 'noHover'
>

export interface SliderSlotParams {
  values: number[],
  sliding: boolean[],
  percent: number[],
  disabled: boolean,
  loading: boolean
}

export interface SliderMarkerSlotParams extends SliderSlotParams {
  markerValue: number,
  marker: SliderMarker,
  inRange: boolean
}

export interface SliderTriggerParams {
  type: 'start' | 'end',
  value: number,
  sliding: boolean,
  percent: number,
  disabled: boolean,
  loading: boolean
}

export type SliderCommonSlot = (params: SliderSlotParams) => any
export type SliderTriggerSlot = (params: SliderTriggerParams) => any
export type SliderMarkerSlot = (params: SliderMarkerSlotParams) => any
