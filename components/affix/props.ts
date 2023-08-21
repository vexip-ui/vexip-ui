import { buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { AffixPositionType } from './symbol'

export const affixProps = buildProps({
  offset: Number,
  zIndex: Number,
  position: String as PropType<AffixPositionType>,
  target: [String, Object, Function] as PropType<unknown>,

  onScroll: eventProp(),
  onChange: eventProp()
})

export type AffixProps = ExtractPropTypes<typeof affixProps>
export type AffixCProps = ConfigurableProps<ExtractPropTypes<typeof affixProps>>
