import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const gridProps = buildProps({
  //
})

export type GridProps = ExtractPropTypes<typeof gridProps>
export type GridCProps = ConfigurableProps<GridProps, 'viewer'>
