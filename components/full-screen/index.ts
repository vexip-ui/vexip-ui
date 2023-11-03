import FullScreen from './full-screen.vue'

import type { ComponentPublicInstance } from 'vue'

export { FullScreen }
export { fullScreenProps } from './props'

export type FullScreenExposed = ComponentPublicInstance & InstanceType<typeof FullScreen>

export type { FullScreenProps, FullScreenCProps } from './props'
export type { FullScreenType, FullScreenSlotParams } from './symbol'
