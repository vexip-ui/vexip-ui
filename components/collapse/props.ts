import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const collapseProps = buildProps({
  //
})

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseCProps = ConfigurableProps<CollapseProps, 'viewer'>
