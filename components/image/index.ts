import Image from './image.vue'

export { Image }
export { imageProps } from './props'

export type ImageExposed = InstanceType<typeof Image>

export type { ImageProps, ImageCProps } from './props'
export type { ImageObjectFit, ImageSkeletonProps } from './symbol'
