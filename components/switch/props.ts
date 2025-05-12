import { booleanProp, buildProps, eventProp, iconProp, sizeProp, stateProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { SwitchSlots } from './symbol'

export const switchProps = buildProps({
  size: sizeProp,
  state: stateProp,
  value: booleanProp,
  disabled: booleanProp,
  openColor: String,
  closeColor: String,
  loading: booleanProp,
  loadingIcon: iconProp,
  loadingEffect: String as PropType<IconEffect>,
  openIcon: iconProp,
  closeIcon: iconProp,
  openText: String,
  closeText: String,
  onBeforeChange: Function as PropType<(checked: boolean) => unknown>,
  rectangle: booleanProp,
  name: String,
  slots: Object as PropType<SwitchSlots>,
  onChange: eventProp<(value: boolean) => void>(),
})

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchCProps = ConfigurableProps<SwitchProps, never, 'onBeforeChange'>
