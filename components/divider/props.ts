import { booleanProp, buildProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { DividerTextPosition } from './symbol'

export const dividerProps = buildProps({
  vertical: booleanProp,
  textPosition: String as PropType<DividerTextPosition>,
  /**
   * 字体增大加粗
   */
  primary: booleanProp,
  dashed: booleanProp
})

export type DividerProps = ExtractPropTypes<typeof dividerProps>
export type DividerCProps = ConfigurableProps<DividerProps>
