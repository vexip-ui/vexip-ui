import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const linkerProps = buildProps({
  //
})

export type LinkerProps = ExtractPropTypes<typeof linkerProps>
export type LinkerCProps = ConfigurableProps<LinkerProps, 'viewer'>
