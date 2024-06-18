import FrameArea from './frame-area.vue'

import type { ComponentPublicInstance } from 'vue'

export { FrameArea }
export { frameAreaProps } from './props'

export type FrameAreaExposed = ComponentPublicInstance & InstanceType<typeof FrameArea>

export type { FrameAreaProps, FrameAreaCProps } from './props'
