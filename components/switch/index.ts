import Switch from './switch.vue'

import type { ComponentPublicInstance } from 'vue'

export { Switch }
export { switchProps } from './props'

export type SwitchExposed = ComponentPublicInstance & InstanceType<typeof Switch>

export type { SwitchProps, SwitchCProps } from './props'
export type { SwitchSlots } from './symbol'
