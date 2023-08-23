import TimePicker from '../date-picker/time-picker.vue'

import type { ComponentPublicInstance } from 'vue'

export { TimePicker }
export { timePickerProps } from '../date-picker/props'

export type TimePickerExposed = ComponentPublicInstance & InstanceType<typeof TimePicker>

export type { TimePickerProps, TimePickerCProps } from '../date-picker/props'
