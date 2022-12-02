import { buildProps, booleanProp, booleanStringProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { Router, RouteLocationRaw } from 'vue-router'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { IconMinorProps } from '@/components/icon'
import type { MenuOptions, MenuMarkerType, MenuGroupType } from './symbol'

export const menuProps = buildProps({
  active: String,
  accordion: booleanProp,
  markerType: String as PropType<MenuMarkerType>,
  reduced: booleanProp,
  horizontal: booleanProp,
  transfer: booleanStringProp,
  trigger: String as PropType<'hover' | 'click'>,
  groupType: String as PropType<MenuGroupType>,
  tooltipReverse: booleanProp,
  options: Array as PropType<MenuOptions[]>,
  router: Object as PropType<Router>,
  manualRoute: booleanProp,
  onSelect: eventProp<(label: string, meta: Record<string, any>) => void>(),
  onExpand: eventProp<(label: string, meta: Record<string, any>) => void>(),
  onReduce: eventProp<(label: string, meta: Record<string, any>) => void>()
})

export type MenuProps = ExtractPropTypes<typeof menuProps>
export type MenuCProps = ConfigurableProps<MenuProps>

export const menuItemProps = buildProps({
  label: String,
  icon: [Object, Function],
  iconProps: Object as PropType<IconMinorProps>,
  disabled: booleanProp,
  transfer: booleanStringProp,
  trigger: String as PropType<'hover' | 'click'>,
  transitionName: String,
  meta: Object,
  children: Array as PropType<MenuOptions[]>,
  route: [String, Object] as PropType<RouteLocationRaw>,
  onSelect: eventProp()
})

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>
export type MenuItemCProps = ConfigurableProps<MenuItemProps, 'children'>

export const menuGroupProps = buildProps({
  label: String,
  children: Array as PropType<MenuOptions[]>
})

export type MenuGroupProps = ExtractPropTypes<typeof menuGroupProps>
