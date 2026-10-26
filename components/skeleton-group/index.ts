import SkeletonGroup from '../skeleton/skeleton-group'

import type { ComponentPublicInstance } from 'vue'

export { SkeletonGroup }
export { skeletonGroupProps } from '../skeleton/props'

export type SkeletonGroupExposed = ComponentPublicInstance & InstanceType<typeof SkeletonGroup>

export type { SkeletonGroupProps, SkeletonGroupCProps } from '../skeleton/props'
