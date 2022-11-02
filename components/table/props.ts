import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const tableProps = buildProps({
  //
})

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableCProps = ConfigurableProps<TableProps, 'viewer'>
