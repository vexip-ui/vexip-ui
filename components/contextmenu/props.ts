import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const contextmenuProps = buildProps({
  //
})

export type ContextmenuProps = ExtractPropTypes<typeof contextmenuProps>
export type ContextmenuCProps = ConfigurableProps<ContextmenuProps, 'viewer'>
