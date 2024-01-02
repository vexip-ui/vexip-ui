import { booleanProp, booleanStringProp, buildProps, eventProp, iconProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { RouteLocationRaw, Router } from 'vue-router'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { IconMinorProps } from '@/components/icon'
import type { MenuGroupType, MenuMarkerType, MenuOptions } from './symbol'

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
  indent: [String, Number],
  onSelect: eventProp<(label: string, meta: any) => void>(),
  onExpand: eventProp<(label: string, meta: any) => void>(),
  onReduce: eventProp<(label: string, meta: any) => void>()
})

export type MenuProps = ExtractPropTypes<typeof menuProps>
export type MenuCProps = ConfigurableProps<MenuProps>

export const menuItemProps = buildProps({
  label: String,
  icon: iconProp,
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
