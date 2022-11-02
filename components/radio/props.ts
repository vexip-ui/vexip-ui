import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const radioProps = buildProps({
  //
})

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioCProps = ConfigurableProps<RadioProps, 'viewer'>
