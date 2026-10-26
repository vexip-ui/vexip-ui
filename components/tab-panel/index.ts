import TabPanel from '../tabs/tab-panel.vue'

import type { ComponentPublicInstance } from 'vue'

export { TabPanel }
export { tabPanelProps } from '../tabs/props'

export type TabPanelExposed = ComponentPublicInstance & InstanceType<typeof TabPanel>
export type { TabPanelProps } from '../tabs/props'
