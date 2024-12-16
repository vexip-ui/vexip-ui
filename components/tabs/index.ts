import Tabs from './tabs.vue'

import type { ComponentPublicInstance } from 'vue'

export { Tabs }
export { tabsProps } from './props'

export type TabsExposed = ComponentPublicInstance & InstanceType<typeof Tabs>

export type { TabsProps, TabsCProps } from './props'
export type { TabsSlots } from './symbol'
