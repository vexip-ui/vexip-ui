import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const timePickerProps = buildProps({
  //
})

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>
export type TimePickerCProps = ConfigurableProps<TimePickerProps, 'viewer'>
