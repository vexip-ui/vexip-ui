import Split from './split.vue'

import type { ComponentPublicInstance } from 'vue'

export { Split }
export { splitProps } from './props'

export type SplitExposed = ComponentPublicInstance & InstanceType<typeof Split>

export type { SplitProps, SplitCProps } from './props'
