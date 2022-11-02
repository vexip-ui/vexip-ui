import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const optionProps = buildProps({
  //
})

export type OptionProps = ExtractPropTypes<typeof optionProps>
export type OptionCProps = ConfigurableProps<OptionProps, 'viewer'>
