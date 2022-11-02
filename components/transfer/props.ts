import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const transferProps = buildProps({
  //
})

export type TransferProps = ExtractPropTypes<typeof transferProps>
export type TransferCProps = ConfigurableProps<TransferProps, 'viewer'>
