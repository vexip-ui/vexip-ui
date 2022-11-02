import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const menuProps = buildProps({
  //
})

export type MenuProps = ExtractPropTypes<typeof menuProps>
export type MenuCProps = ConfigurableProps<MenuProps, 'viewer'>
