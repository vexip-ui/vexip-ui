import { tabNavItemProps, tabNavProps } from '@/components/tab-nav/props'

import { booleanProp, omitProps, wrapProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { TabsSlots } from './symbol'

export const tabsProps = wrapProps({
  ...omitProps(tabNavProps, ['options']),
  lazy: booleanProp,
  slots: Object as PropType<TabsSlots>,
})

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsCProps = ConfigurableProps<TabsProps>

export const tabPanelProps = wrapProps({
  ...tabNavItemProps,
  lazy: booleanProp,
  name: {
    type: String,
    default: '',
  },
})

export type TabPanelProps = ExtractPropTypes<typeof tabPanelProps>
