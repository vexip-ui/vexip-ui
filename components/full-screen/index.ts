import FullScreen from './full-screen.vue'

import type { ComponentPublicInstance } from 'vue'

export { FullScreen }
export type FullScreenExposed = ComponentPublicInstance & InstanceType<typeof FullScreen>

export type { FullScreenType } from './symbol'
