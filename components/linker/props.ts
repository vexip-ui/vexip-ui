import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { LinkerType } from './symbol'

export const linkerProps = buildProps({
  to: String,
  type: String as PropType<LinkerType>,
  icon: Object,
  underline: booleanProp,
  disabled: booleanProp,
  target: String,
  onClick: eventProp<(event: MouseEvent) => void>()
})

export type LinkerProps = ExtractPropTypes<typeof linkerProps>
export type LinkerCProps = ConfigurableProps<LinkerProps, 'to'>
