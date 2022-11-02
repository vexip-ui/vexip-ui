import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const messageProps = buildProps({
  //
})

export type MessageProps = ExtractPropTypes<typeof messageProps>
export type MessageCProps = ConfigurableProps<MessageProps, 'viewer'>
