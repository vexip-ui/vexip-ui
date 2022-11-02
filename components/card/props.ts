import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const cardProps = buildProps({
  //
})

export type CardProps = ExtractPropTypes<typeof cardProps>
export type CardCProps = ConfigurableProps<CardProps, 'viewer'>
