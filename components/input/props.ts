import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const inputProps = buildProps({
  //
})

export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputCProps = ConfigurableProps<InputProps, 'viewer'>
