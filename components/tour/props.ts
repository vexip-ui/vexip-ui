import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { TourStepOptions, TourStepRenderFn, TourTarget } from './symbol'

export const tourProps = buildProps({
  active: booleanProp,
  index: Number,
  steps: Array as PropType<TourStepOptions[]>,
  hideMask: booleanProp,
  onChange: eventProp<(index: number, step: TourStepOptions) => void>(),
  onStart: eventProp(),
  onPrev: eventProp<(index: number, step: TourStepOptions) => void>(),
  onNext: eventProp<(index: number, step: TourStepOptions) => void>(),
  onFinish: eventProp()
})

export type TourProps = ExtractPropTypes<typeof tourProps>
export type TourCProps = ConfigurableProps<ExtractPropTypes<typeof tourProps>>

export const tourStepProps = buildProps({
  title: String,
  content: String,
  target: [String, Object, Function] as PropType<TourTarget>,
  renderer: Function as PropType<TourStepRenderFn>,
  onPrev: eventProp(),
  onNext: eventProp()
})

export type TourStepProps = ExtractPropTypes<typeof tourStepProps>
export type TourStepCProps = ConfigurableProps<ExtractPropTypes<typeof tourStepProps>>
