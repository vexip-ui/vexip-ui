import { buildProps, booleanProp, booleanNumberProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { CarouselArrowType, CarouselArrowTrigger, CarouselPointerType } from './symbol'

export const carouselProps = buildProps({
  active: Number,
  viewSize: Number,
  vertical: booleanProp,
  disabled: booleanProp,
  loop: booleanProp,
  arrow: String as PropType<CarouselArrowType>,
  arrowTrigger: String as PropType<CarouselArrowTrigger>,
  autoplay: booleanNumberProp,
  pointer: String as PropType<CarouselPointerType>,
  speed: Number,
  activeOffset: Number,
  height: [Number, String],
  ignoreHover: booleanProp,
  onChange: eventProp<(active: number) => void>(),
  onPrev: eventProp<(active: number) => void>(),
  onNext: eventProp<(active: number) => void>(),
  onSelect: eventProp<(active: number) => void>()
})

export type CarouselProps = ExtractPropTypes<typeof carouselProps>
export type CarouselCProps = ConfigurableProps<CarouselProps>
