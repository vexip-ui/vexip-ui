import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const dropdownProps = buildProps({
  //
})

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
export type DropdownCProps = ConfigurableProps<DropdownProps, 'viewer'>
