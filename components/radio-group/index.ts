import RadioGroup from '../radio/radio-group.vue'

import type { ComponentPublicInstance } from 'vue'

export { RadioGroup }
export { radioGroupProps } from '../radio/props'

export type RadioGroupExposed = ComponentPublicInstance & InstanceType<typeof RadioGroup>

export type { RadioGroupProps, RadioGroupCProps } from '../radio/props'
