import Radio from './radio.vue'

import type { ComponentPublicInstance } from 'vue'

export { Radio }
export { radioProps } from './props'

export type RadioExposed = ComponentPublicInstance & InstanceType<typeof Radio>

export type { RadioProps, RadioCProps } from './props'
export type { RadioGroupShape, RadioRawOption, RadioShape } from './symbol'
