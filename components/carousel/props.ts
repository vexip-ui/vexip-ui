import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const carouselProps = buildProps({
  //
})

export type CarouselProps = ExtractPropTypes<typeof carouselProps>
export type CarouselCProps = ConfigurableProps<CarouselProps, 'viewer'>
