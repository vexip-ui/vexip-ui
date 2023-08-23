import TabNavItem from '../tab-nav/tab-nav-item.vue'

import type { ComponentPublicInstance } from 'vue'

export { TabNavItem }
export { tabNavItemProps } from '../tab-nav/props'

export type TabNavItemExposed = ComponentPublicInstance & InstanceType<typeof TabNavItem>
export type { TabNavItemProps } from '../tab-nav/props'
