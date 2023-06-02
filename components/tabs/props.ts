import { tabNavItemProps, tabNavProps } from '@/components/tab-nav/props'

import { omitProps, wrapProps } from '@vexip-ui/config'

import type { ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const tabsProps = omitProps(tabNavProps, ['options'])

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsCProps = ConfigurableProps<TabsProps>

export const tabPanelProps = wrapProps({
  ...tabNavItemProps,
  name: {
    type: String,
    default: ''
  }
})

export type TabPanelProps = ExtractPropTypes<typeof tabPanelProps>
