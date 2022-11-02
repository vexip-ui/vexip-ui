import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const selectProps = buildProps({
  //
})

export type SelectProps = ExtractPropTypes<typeof selectProps>
export type SelectCProps = ConfigurableProps<SelectProps, 'viewer'>
