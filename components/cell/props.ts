import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const cellProps = buildProps({
  //
})

export type CellProps = ExtractPropTypes<typeof cellProps>
export type CellCProps = ConfigurableProps<CellProps, 'viewer'>
