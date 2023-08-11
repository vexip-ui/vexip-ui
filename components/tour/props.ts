import { booleanProp, buildProps, eventProp, localeProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { TourSignType, TourStepOptions, TourStepRenderFn } from './symbol'

export const tourProps = buildProps({
  locale: localeProp('tour'),
  active: booleanProp,
  index: Number,
  steps: Array as PropType<TourStepOptions[]>,
  hideMask: booleanProp,
  signType: String as PropType<TourSignType>,
  padding: [Number, Array] as PropType<number | number[]>,
  closable: booleanProp,
  permeable: booleanProp,
  onChange: eventProp<(index: number, step: TourStepOptions) => void>(),
  onStart: eventProp(),
  onPrev: eventProp<(index: number, step: TourStepOptions) => void>(),
  onNext: eventProp<(index: number, step: TourStepOptions) => void>(),
  onFinish: eventProp()
})

export type TourProps = ExtractPropTypes<typeof tourProps>
export type TourCProps = ConfigurableProps<ExtractPropTypes<typeof tourProps>>

export const tourStepProps = buildProps({
  target: [String, Object, Function] as PropType<string | object | (() => any)>,
  placement: String as PropType<Placement>,
  title: String,
  content: String,
  order: Number,
  renderer: Function as PropType<TourStepRenderFn>,
  onPrev: eventProp(),
  onNext: eventProp()
})

export type TourStepProps = ExtractPropTypes<typeof tourStepProps>
export type TourStepCProps = ConfigurableProps<ExtractPropTypes<typeof tourStepProps>>
