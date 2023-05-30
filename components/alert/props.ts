import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { AlertType } from './symbol'

export const alertProps = buildProps({
  type: String as PropType<AlertType>,
  title: String,
  colorfulText: booleanProp,
  icon: {
    type: [Boolean, Object],
    default: null
  },
  closable: booleanProp,
  iconColor: String,
  noBorder: booleanProp,
  banner: booleanProp,
  manual: booleanProp,
  scroll: booleanProp,
  scrollSpeed: Number,
  onClose: eventProp(),
  onHide: eventProp(),
  onScrollEnd: eventProp()
})

export type AlertProps = ExtractPropTypes<typeof alertProps>
export type AlertCProps = ConfigurableProps<ExtractPropTypes<typeof alertProps>>
