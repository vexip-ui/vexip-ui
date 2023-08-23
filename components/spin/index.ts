import Spin from './spin.vue'

import type { ComponentPublicInstance } from 'vue'

export { Spin }
export { spinProps } from './props'

export type SpinExposed = ComponentPublicInstance & InstanceType<typeof Spin>

export type { SpinProps, SpinCProps } from './props'
