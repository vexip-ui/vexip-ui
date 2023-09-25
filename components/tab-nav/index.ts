import TabNav from './tab-nav.vue'

import type { ComponentPublicInstance } from 'vue'

export { TabNav }
export { tabNavProps } from './props'

export type TabNavExposed = ComponentPublicInstance & InstanceType<typeof TabNav>

export type { TabNavProps, TabNavCProps } from './props'
export type { TabNavAlign, TabNavPlacement, TabNavOptions } from './symbol'
