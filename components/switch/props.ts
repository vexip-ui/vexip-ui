import { booleanProp, buildProps, eventProp, sizeProp, stateProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
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
  loadingEffect: String as PropType<IconEffect>,
  openIcon: Object,
  closeIcon: Object,
  openText: String,
  closeText: String,
  onBeforeChange: Function as PropType<(checked: boolean) => unknown>,
  rectangle: booleanProp,
  name: String,
  onChange: eventProp<(value: boolean) => void>()
})

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchCProps = ConfigurableProps<SwitchProps, never, 'onBeforeChange'>
