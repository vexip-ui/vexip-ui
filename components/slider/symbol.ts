import type { ClassType, StyleType } from '@vexip-ui/config'

export interface SliderSlotParams {
  value: number,
  disabled: boolean,
  loading: boolean,
  sliding: boolean
}

export type SliderCommonSlot = (params: SliderSlotParams) => any

export interface SliderMarker {
  label?: string,
  class?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>
}
