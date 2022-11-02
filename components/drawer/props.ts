import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const drawerProps = buildProps({
  //
})

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
export type DrawerCProps = ConfigurableProps<DrawerProps, 'viewer'>
