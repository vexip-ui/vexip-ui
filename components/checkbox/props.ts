import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const checkboxProps = buildProps({
  //
})

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxCProps = ConfigurableProps<CheckboxProps, 'viewer'>
