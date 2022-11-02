import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const dividerProps = buildProps({
  //
})

export type DividerProps = ExtractPropTypes<typeof dividerProps>
export type DividerCProps = ConfigurableProps<DividerProps, 'viewer'>
