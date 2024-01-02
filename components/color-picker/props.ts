import {
  booleanProp,
  booleanStringProp,
  buildProps,
  eventProp,
  iconProp,
  localeProp,
  sizeProp,
  stateProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { Color, HSLAColor, HSVAColor, RGBAColor } from '@vexip-ui/utils'
import type { ColorFormat } from './symbol'

type FormattedColor = string | RGBAColor | HSLAColor | HSVAColor

export const colorPickerProps = buildProps({
  size: sizeProp,
  state: stateProp,
  locale: localeProp('colorPicker'),
  value: [String, Object] as PropType<Color | null>,
  visible: booleanProp,
  format: String as PropType<ColorFormat>,
  alpha: booleanProp,
  disabled: booleanProp,
  transitionName: String,
  noInput: booleanProp,
  shortcut: {
    type: [Boolean, Array] as PropType<boolean | string[]>,
    default: null
  },
  placement: String as PropType<Placement>,
  transfer: booleanStringProp,
  outsideClose: booleanProp,
  clearable: booleanProp,
  cancelText: String,
  confirmText: String,
  prefix: iconProp,
  prefixColor: String,
  suffix: iconProp,
  suffixColor: String,
  noSuffix: booleanProp,
  staticSuffix: booleanProp,
  loading: booleanProp,
  loadingIcon: iconProp,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  popperAlive: booleanProp,
  showLabel: booleanProp,
  labelFormat: String as PropType<ColorFormat>,
  onToggle: eventProp<(visible: boolean) => void>(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp(),
  onClear: eventProp(),
  onChange: eventProp<(color: FormattedColor) => void>(),
  onShortcut: eventProp<(color: FormattedColor) => void>()
})

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerCProps = ConfigurableProps<ColorPickerProps>
