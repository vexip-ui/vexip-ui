import Renderer from './renderer'

import type { ComponentPublicInstance } from 'vue'

export { Renderer }
export { rendererProps } from './props'

export type RendererExposed = ComponentPublicInstance & InstanceType<typeof Renderer>
export type { RendererProps } from './props'
