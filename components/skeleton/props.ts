import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const skeletonProps = buildProps({
  //
})

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
export type SkeletonCProps = ConfigurableProps<SkeletonProps, 'viewer'>
