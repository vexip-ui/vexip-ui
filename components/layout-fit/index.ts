import LayoutFit from './layout-fit.vue'

import type { ComponentPublicInstance } from 'vue'

export { LayoutFit }
export { layoutFitProps } from './props'

export type LayoutFitExposed = ComponentPublicInstance & InstanceType<typeof LayoutFit>

export type { LayoutFitProps, LayoutFitCProps } from './props'
export type { LayoutFitSlots } from './symbol'
