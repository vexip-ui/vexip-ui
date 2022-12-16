import type { ClassType, StyleType } from '@vexip-ui/config'
import type { SkeletonProps } from '@/components/skeleton'

export type ImageObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
export type ImageSkeletonProps = Pick<
  SkeletonProps,
  'tag' | 'activated' | 'iconScale' | 'imageIcon'
> & {
  class?: ClassType,
  StyleType?: StyleType
}
