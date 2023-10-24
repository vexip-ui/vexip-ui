import { booleanProp, booleanStringProp, buildProps, eventProp, stateProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { SliderMarker } from './symbol'

export const sliderProps = buildProps({
  state: stateProp,
  value: [Number, Array] as PropType<number | number[]>,
  min: Number,
  max: Number,
  step: Number,
  vertical: booleanProp,
  hideTip: booleanProp,
  tipTransfer: booleanStringProp,
  disabled: booleanProp,
  loading: booleanProp,
  loadingLock: booleanProp,
  reverse: booleanProp,
  range: booleanProp,
  markers: Object as PropType<Record<string | number, string | SliderMarker>>,
  markerOnly: booleanProp,
  tipHover: booleanProp,
  onChange: eventProp<(value: number | number[]) => void>(),
  onInput: eventProp<(value: number | number[]) => void>()
})

export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderCProps = ConfigurableProps<SliderProps>
