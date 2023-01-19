import {
  buildProps,
  booleanProp,
  booleanStringProp,
  sizeProp,
  stateProp,
  eventProp
} from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { TagType } from '@/components/tag'
import type { CascaderValue, CascaderKeyConfig } from './symbol'

type MaybeArrayData = Record<string, any> | Array<Record<string, any>>

export const cascaderProps = buildProps({
  size: sizeProp,
  state: stateProp,
  value: Array as PropType<CascaderValue>,
  visible: booleanProp,
  options: Array as PropType<Array<Record<string, any>>>,
  placeholder: String,
  prefix: Object,
  prefixColor: String,
  suffix: Object,
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
  onAsyncLoad: Function as PropType<(data: Record<string, any>) => any[] | Promise<any[]>>,
  mergeTags: booleanProp,
  tagType: String as PropType<TagType>,
  emptyText: String,
  loading: booleanProp,
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  transparent: booleanProp,
  onToggle: eventProp<(visible: boolean) => void>(),
  onSelect: eventProp<(fullValue: string, data: Record<string, any>) => void>(),
  onCancel: eventProp<(fullValue: string, data: Record<string, any>) => void>(),
  onChange: eventProp<(value: CascaderValue, data: MaybeArrayData) => void>(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp(),
  onClear: eventProp()
})

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>
export type CascaderCProps = ConfigurableProps<CascaderProps, never, 'onAsyncLoad'>
