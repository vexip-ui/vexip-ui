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
import type { TagType } from '@/components/tag'
import type { CascaderKeyConfig, CascaderValue, Data } from './symbol'

type ChangeEvent =
  | ((value: CascaderValue, data: Data[] | Data[][]) => void)
  | ((value: (string | number)[], data: Data[]) => void)
  | ((value: string[], data: Data[]) => void)
  | ((value: number[], data: Data[]) => void)
  | ((value: (string | number)[][], data: Data[][]) => void)
  | ((value: string[][], data: Data[][]) => void)
  | ((value: number[][], data: Data[][]) => void)

export const cascaderProps = buildProps({
  size: sizeProp,
  state: stateProp,
  locale: localeProp('select'),
  value: Array as PropType<CascaderValue>,
  visible: booleanProp,
  options: Array as PropType<Data[]>,
  placeholder: String,
  prefix: iconProp,
  prefixColor: String,
  suffix: iconProp,
  suffixColor: String,
  noCascaded: booleanProp,
  multiple: booleanProp,
  disabled: booleanProp,
  clearable: booleanProp,
  placement: String as PropType<Placement>,
  transfer: booleanStringProp,
  staticSuffix: booleanProp,
  noSuffix: booleanProp,
  transitionName: String,
  outsideClose: booleanProp,
  keyConfig: Object as PropType<CascaderKeyConfig>,
  separator: String,
  hoverTrigger: booleanProp,
  maxTagCount: Number,
  briefLabel: booleanProp,
  noRestTip: booleanProp,
  onAsyncLoad: Function as PropType<(data: Data) => any[] | Promise<any[]>>,
  mergeTags: booleanProp,
  tagType: String as PropType<TagType>,
  emptyText: String,
  loading: booleanProp,
  loadingIcon: iconProp,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  transparent: booleanProp,
  popperAlive: booleanProp,
  onToggle: eventProp<(visible: boolean) => void>(),
  onSelect: eventProp<(fullValue: string, data: Data) => void>(),
  onCancel: eventProp<(fullValue: string, data: Data) => void>(),
  onChange: eventProp<ChangeEvent>(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp(),
  onClear: eventProp()
})

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>
export type CascaderCProps = ConfigurableProps<CascaderProps, never, 'onAsyncLoad'>
