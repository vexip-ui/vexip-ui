import ObjectFit from './object-fit.vue'

import type { ComponentPublicInstance } from 'vue'

export { ObjectFit }
export { objectFitProps } from './props'

export type ObjectFitExposed = ComponentPublicInstance & InstanceType<typeof ObjectFit>

export type { ObjectFitProps, ObjectFitCProps } from './props'
export type { ObjectFitSlots } from './symbol'
