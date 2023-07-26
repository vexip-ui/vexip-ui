import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { TourStepConfig, TourTarget } from './symbol'

export const tourProps = buildProps({
  steps: Array as PropType<TourStepConfig[]>,
  hideMask: booleanProp,
  onChange: eventProp<(index: number, step: TourStepConfig) => void>(),
  onStart: eventProp(),
  onPrev: eventProp<(index: number, step: TourStepConfig) => void>(),
  onNext: eventProp<(index: number, step: TourStepConfig) => void>(),
  onFinish: eventProp()
})

export type TourProps = ExtractPropTypes<typeof tourProps>
export type TourCProps = ConfigurableProps<ExtractPropTypes<typeof tourProps>>

export const tourStepProps = buildProps({
  title: String,
  content: String,
  target: [String, Object, Function] as PropType<TourTarget>,
  onPrev: eventProp(),
  onNext: eventProp()
})

export type TourStepProps = ExtractPropTypes<typeof tourStepProps>
export type TourStepCProps = ConfigurableProps<ExtractPropTypes<typeof tourStepProps>>
