import Fence from './fence.vue'

import type { ComponentPublicInstance } from 'vue'

export { Fence }
export { fenceProps } from './props'

export type FenceExposed = ComponentPublicInstance & InstanceType<typeof Fence>

export type { FenceProps, FenceCProps } from './props'
