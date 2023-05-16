import { booleanStringProp, buildProps, classProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'

export const bubbleProps = buildProps({
  placement: String as PropType<Placement>,
  background: String,
  shadow: booleanStringProp,
  contentClass: classProp
})

export type BubbleProps = ExtractPropTypes<typeof bubbleProps>
export type BubbleCProps = ConfigurableProps<BubbleProps>
