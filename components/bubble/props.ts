import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const bubbleProps = buildProps({
  //
})

export type BubbleProps = ExtractPropTypes<typeof bubbleProps>
export type BubbleCProps = ConfigurableProps<BubbleProps, 'viewer'>
