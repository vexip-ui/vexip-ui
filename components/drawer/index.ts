import Drawer from './drawer.vue'

import type { ComponentPublicInstance } from 'vue'

export { Drawer }
export { drawerProps } from './props'

export type DrawerExposed = ComponentPublicInstance & InstanceType<typeof Drawer>

export type { DrawerProps, DrawerCProps } from './props'
export type { DrawerPlacement } from './symbol'
