import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const numberInputProps = buildProps({
  //
})

export type NumberInputProps = ExtractPropTypes<typeof numberInputProps>
export type NumberInputCProps = ConfigurableProps<NumberInputProps, 'viewer'>
