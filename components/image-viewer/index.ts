import ImageViewer from '../image/image-viewer.vue'

import type { ComponentPublicInstance } from 'vue'

export { ImageViewer }
export { imageViewerProps } from '../image/props'

export type ImageViewerExposed = ComponentPublicInstance & InstanceType<typeof ImageViewer>

export type { ImageViewerProps, ImageViewerCProps } from '../image/props'
