import Highlight from './highlight.vue'

import type { ComponentPublicInstance } from 'vue'

export { Highlight }
export { highlightProps } from './props'

export type HighlightExposed = ComponentPublicInstance & InstanceType<typeof Highlight>

export type { HighlightProps, HighlightCProps } from './props'
