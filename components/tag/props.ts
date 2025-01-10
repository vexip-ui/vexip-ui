import { booleanProp, buildProps, eventProp, sizeProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { TagSlots, TagType } from './symbol'

export const tagProps = buildProps({
  size: sizeProp,
  type: String as PropType<TagType>,
  border: booleanProp,
  closable: booleanProp,
  color: String,
  simple: booleanProp,
  circle: booleanProp,
  prefix: [String, Number],
  prefixBg: String,
  prefixColor: String,
  suffix: [String, Number],
  suffixBg: String,
  suffixColor: String,
  disabled: booleanProp,
  slots: Object as PropType<TagSlots>,
  onClose: eventProp()
})

export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagCProps = ConfigurableProps<TagProps>
