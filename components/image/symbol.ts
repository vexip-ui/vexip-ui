import type { InjectionKey } from 'vue'
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

export interface ImageState {
  src: string,
  index: number,
  total: number
}

export interface GroupState {
  showAll: boolean,
  preview: boolean,
  increaseItem: (item: ImageState) => void,
  decreaseItem: (item: ImageState) => void,
  handlePreview: (item: ImageState) => void
}

export const GROUP_STATE: InjectionKey<GroupState> = Symbol('IMAGE_GROUP_STATE')
