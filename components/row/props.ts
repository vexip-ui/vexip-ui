import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const rowProps = buildProps({
  //
})

export type RowProps = ExtractPropTypes<typeof rowProps>
export type RowCProps = ConfigurableProps<RowProps, 'viewer'>
