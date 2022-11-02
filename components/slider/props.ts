import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const sliderProps = buildProps({
  //
})

export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderCProps = ConfigurableProps<SliderProps, 'viewer'>
