import CollapsePanel from '../collapse/collapse-panel.vue'

import type { ComponentPublicInstance } from 'vue'

export { CollapsePanel }
export { collapsePanelProps } from '../collapse/props'

export type CollapsePanelExposed = ComponentPublicInstance & InstanceType<typeof CollapsePanel>

export type { CollapsePanelProps, CollapsePanelCProps } from '../collapse/props'
