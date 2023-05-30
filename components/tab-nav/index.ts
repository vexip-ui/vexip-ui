import TabNav from './tab-nav.vue'

export { TabNav }
export { tabNavProps } from './props'

export type TabNavExposed = InstanceType<typeof TabNav>

export type { TabNavProps, TabNavCProps } from './props'
export type { TabNavAlign, TabNavPlacement, TabNavOptions } from './symbol'
