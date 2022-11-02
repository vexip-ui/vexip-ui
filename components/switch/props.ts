import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const switchProps = buildProps({
  //
})

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchCProps = ConfigurableProps<SwitchProps, 'viewer'>
