import Wheel from './wheel.vue'

import type { ComponentPublicInstance } from 'vue'

export { Wheel }
export { wheelProps } from './props'

export type WheelExposed = ComponentPublicInstance & InstanceType<typeof Wheel>

export type { WheelProps, WheelCProps } from './props'
export type { WheelRawOption } from './symbol'
