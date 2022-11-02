import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const datePickerProps = buildProps({
  //
})

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export type DatePickerCProps = ConfigurableProps<DatePickerProps, 'viewer'>
