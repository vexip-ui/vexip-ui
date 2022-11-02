import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const scrollProps = buildProps({
  //
})

export type ScrollProps = ExtractPropTypes<typeof scrollProps>
export type ScrollCProps = ConfigurableProps<ScrollProps, 'viewer'>
