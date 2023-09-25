import ImageGroup from '../image/image-group.vue'

import type { ComponentPublicInstance } from 'vue'

export { ImageGroup }
export { imageGroupProps } from '../image/props'

export type ImageGroupExposed = ComponentPublicInstance & InstanceType<typeof ImageGroup>

export type { ImageGroupProps, ImageGroupCProps } from '../image/props'
