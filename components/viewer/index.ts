import Viewer from './viewer.vue'

import type { ComponentPublicInstance } from 'vue'

export { Viewer }
export { viewerProps } from './props'

export type ViewerExposed = ComponentPublicInstance & InstanceType<typeof Viewer>

export type { ViewerProps, ViewerCProps } from './props'
export type { ViewerToolbarPlacement, ViewerState } from './symbol'
