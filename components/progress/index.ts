import Progress from './progress.vue'

import type { ComponentPublicInstance } from 'vue'

export { Progress }
export { progressProps } from './props'

export type ProgressExposed = ComponentPublicInstance & InstanceType<typeof Progress>

export type { ProgressProps, ProgressCProps } from './props'
export type { ProgressInfoType } from './symbol'
