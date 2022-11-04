import { buildProps, booleanProp, sizeProp, stateProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const switchProps = buildProps({
  size: sizeProp,
  state: stateProp,
  value: booleanProp,
  disabled: booleanProp,
  openColor: String,
  closeColor: String,
  loading: booleanProp,
  loadingIcon: Object,
  loadingSpin: booleanProp,
  openIcon: Object,
  closeIcon: Object,
  openText: String,
  closeText: String,
  onBeforeChange: Function as PropType<(checked: boolean) => unknown>,
  onChange: eventProp<(value: boolean) => void>()
})

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchCProps = ConfigurableProps<SwitchProps, never, 'onBeforeChange'>
