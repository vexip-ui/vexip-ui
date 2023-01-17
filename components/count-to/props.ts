import { buildProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { CountToTimingName, CountToTiming } from './symbol'

export const countToProps = buildProps({
  start: Number,
  end: Number,
  duration: Number,
  decimals: Number,
  decimal: String,
  separator: String,
  prefix: String,
  suffix: String,
  autoplay: Boolean,
  appear: Boolean,
  timing: [String, Function] as PropType<CountToTimingName | CountToTiming>
})

export type CountToProps = ExtractPropTypes<typeof countToProps>
export type CountToCProps = ConfigurableProps<CountToProps>
