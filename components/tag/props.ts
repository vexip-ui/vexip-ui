import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const tagProps = buildProps({
  //
})

export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagCProps = ConfigurableProps<TagProps, 'viewer'>
