import { buildProps, localeProp, booleanNumberProp, booleanStringProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Dateable } from '@vexip-ui/utils'

export const timeAgoProps = buildProps({
  locale: localeProp('timeAgo'),
  datetime: [String, Number, Date] as PropType<Dateable>,
  interval: booleanNumberProp,
  title: booleanStringProp,
  titleFormat: String
})

export type TimeAgoProps = ExtractPropTypes<typeof timeAgoProps>
export type TimeAgoCProps = ConfigurableProps<TimeAgoProps, 'datetime'>
