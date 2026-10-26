import Skeleton from './skeleton'

import type { ComponentPublicInstance } from 'vue'

export { Skeleton }
export { skeletonProps } from './props'

export type SkeletonExposed = ComponentPublicInstance & InstanceType<typeof Skeleton>

export type { SkeletonProps, SkeletonCProps } from './props'
