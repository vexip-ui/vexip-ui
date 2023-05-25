import Drawer from './drawer.vue'

export { Drawer }
export { drawerProps } from './props'

export type DrawerExposed = InstanceType<typeof Drawer>

export type { DrawerProps, DrawerCProps } from './props'
export type { DrawerPlacement } from './symbol'
