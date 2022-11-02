import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const spaceProps = buildProps({
  //
})

export type SpaceProps = ExtractPropTypes<typeof spaceProps>
export type SpaceCProps = ConfigurableProps<SpaceProps, 'viewer'>
