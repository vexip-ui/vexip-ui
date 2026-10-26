import { booleanProp, buildProps, stateProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ProgressInfoType, ProgressSlots, ProgressStrokeColor } from './symbol'

export const progressProps = buildProps({
  percentage: Number,
  state: stateProp,
  strokeWidth: Number,
  infoType: String as PropType<ProgressInfoType>,
  precision: Number,
  activated: booleanProp,
  strokeColor: [String, Array, Function] as PropType<ProgressStrokeColor>,
  slots: Object as PropType<ProgressSlots>,
})

export type ProgressProps = ExtractPropTypes<typeof progressProps>
export type ProgressCProps = ConfigurableProps<ProgressProps, 'percentage'>
