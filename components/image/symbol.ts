import type { InjectionKey } from 'vue'
import type { ClassType, StyleType } from '@vexip-ui/config'
import type { SkeletonProps } from '@/components/skeleton'

export type ImageObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
export type ImageSkeletonProps = Pick<
  SkeletonProps,
  'tag' | 'activated' | 'iconScale' | 'imageIcon'
> & {
  class?: ClassType,
  StyleType?: StyleType,
}

export interface ImageState {
  src: string,
  index: number,
  total: number,
}

export interface GroupState {
  showAll: boolean,
  preview: boolean,
  increaseItem: (item: ImageState) => void,
  decreaseItem: (item: ImageState) => void,
  handlePreview: (item: ImageState) => void,
}

export interface ImageSlots {
  placeholder?: () => any,
  error?: () => any,
  preview?: (params: { src: string }) => any,
}

export interface ImageGroupSlots {
  /**
   * @internal
   */
  default?: () => any,
  preview?: (params: { src: string }) => any,
}

export interface ImageViewerSlots {
  default?: (params: { src: string }) => any,
  prev?: (params: { disabled: boolean }) => any,
  next?: (params: { disabled: boolean }) => any,
  close?: () => any,
}

export const GROUP_STATE = '__VXP_IMAGE_GROUP_STATE' as unknown as InjectionKey<GroupState>

export const objectFitValues = Object.freeze<ImageObjectFit[]>([
  'fill',
  'contain',
  'cover',
  'none',
  'scale-down',
])
