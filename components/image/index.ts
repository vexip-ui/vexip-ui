import Image from './image.vue'

import type { ComponentPublicInstance } from 'vue'

export { Image }
export { imageProps } from './props'

export type ImageExposed = ComponentPublicInstance & InstanceType<typeof Image>

export type { ImageProps, ImageCProps } from './props'
export type { ImageObjectFit, ImageSkeletonProps } from './symbol'
