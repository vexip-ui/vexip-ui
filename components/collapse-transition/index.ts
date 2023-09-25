import CollapseTransition from '../collapse/collapse-transition'

import type { ComponentPublicInstance } from 'vue'

export { CollapseTransition }
export { collapseTransitionProps } from '../collapse/props'

export type CollapseTransitionExposed = ComponentPublicInstance &
InstanceType<typeof CollapseTransition>

export type { CollapseTransitionProps, CollapseTransitionCProps } from '../collapse/props'
