import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const spinProps = buildProps({
  //
})

export type SpinProps = ExtractPropTypes<typeof spinProps>
export type SpinCProps = ConfigurableProps<SpinProps, 'viewer'>
