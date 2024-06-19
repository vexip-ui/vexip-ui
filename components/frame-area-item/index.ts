import FrameAreaItem from '../frame-area/frame-area-item'

import type { ComponentPublicInstance } from 'vue'

export { FrameAreaItem }
export { frameAreaItemProps } from '../frame-area/props'

export type FrameAreaItemExposed = ComponentPublicInstance & InstanceType<typeof FrameAreaItem>

export type { FrameAreaItemProps, FrameAreaItemCProps } from '../frame-area/props'
