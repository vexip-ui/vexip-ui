import Popper from './popper.vue'

import type { ComponentPublicInstance } from 'vue'

export { Popper }
export { popperProps } from './props'

export type PopperExposed = ComponentPublicInstance & InstanceType<typeof Popper>

export type { PopperProps, PopperCProps } from './props'
