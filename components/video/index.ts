import Video from './video.vue'

import type { ComponentPublicInstance } from 'vue'

export { Video }
export { videoProps } from './props'

export type VideoExposed = ComponentPublicInstance & InstanceType<typeof Video>

export type { VideoProps, VideoCProps } from './props'
