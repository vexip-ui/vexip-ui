import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const loadingProps = buildProps({
  //
})

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
export type LoadingCProps = ConfigurableProps<LoadingProps, 'viewer'>
