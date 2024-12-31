import Result from './result.vue'

import type { ComponentPublicInstance } from 'vue'

export { Result }
export { resultProps } from './props'

export type ResultExposed = ComponentPublicInstance & InstanceType<typeof Result>

export type { ResultProps, ResultCProps } from './props'
export type { ResultType, ResultSlots } from './symbol'
