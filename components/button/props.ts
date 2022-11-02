import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const buttonProps = buildProps({
  //
})

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonCProps = ConfigurableProps<ButtonProps, 'viewer'>
