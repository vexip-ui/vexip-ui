import { booleanProp, booleanStringProp, buildProps, eventProp, localeProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { TourSignType, TourSlots, TourStepOptions, TourStepRenderFn, TourType } from './symbol'

export const tourProps = buildProps({
  locale: localeProp('tour'),
  active: booleanProp,
  index: Number,
  steps: Array as PropType<TourStepOptions[]>,
  type: String as PropType<TourType>,
  hideMask: booleanProp,
  signType: String as PropType<TourSignType>,
  padding: [Number, Array] as PropType<number | number[]>,
  closable: booleanProp,
  permeable: booleanProp,
  transfer: booleanStringProp,
  slots: Object as PropType<TourSlots>,
  onToggle: eventProp<(active: boolean) => void>(),
  onChange: eventProp<(index: number, step: TourStepOptions) => void>(),
  onClose: eventProp(),
  onMaskClick: eventProp<(event: MouseEvent) => void>()
})

export type TourProps = ExtractPropTypes<typeof tourProps>
export type TourCProps = ConfigurableProps<ExtractPropTypes<typeof tourProps>>

export const tourStepProps = buildProps({
  target: [String, Object, Function] as PropType<string | object | (() => any)>,
  placement: String as PropType<Placement>,
  title: String,
  content: String,
  order: Number,
  type: String as PropType<TourType>,
  renderer: Function as PropType<TourStepRenderFn>,
  onPrev: eventProp(),
  onNext: eventProp()
})

export type TourStepProps = ExtractPropTypes<typeof tourStepProps>
export type TourStepCProps = ConfigurableProps<ExtractPropTypes<typeof tourStepProps>>
