import { booleanProp, buildProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ProgressInfoType, ProgressStrokeColor } from './symbol'

export const progressProps = buildProps({
  percentage: Number,
  strokeWidth: Number,
  infoType: String as PropType<ProgressInfoType>,
  precision: Number,
  activated: booleanProp,
  strokeColor: [String, Array, Function] as PropType<ProgressStrokeColor>
})

export type ProgressProps = ExtractPropTypes<typeof progressProps>
export type ProgressCProps = ConfigurableProps<ProgressProps, 'percentage'>
