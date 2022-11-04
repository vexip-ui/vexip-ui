import { buildProps, booleanProp, booleanStringProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { MenuOptions } from '@/components/menu'
import type {
  LayoutConfig,
  LayoutMenuProps,
  LayoutSignType,
  LayoutHeaderAction,
  LayoutUser,
  LayoutFooterLink
} from './symbol'

export const layoutProps = buildProps({
  noAside: booleanProp,
  footer: booleanProp,
  tag: String,
  menus: Object as PropType<MenuOptions[]>,
  menuProps: Object as PropType<LayoutMenuProps>,
  logo: String,
  signName: String,
  config: Array as PropType<LayoutConfig[]>,
  user: Object as PropType<LayoutUser>,
  actions: Array as PropType<LayoutHeaderAction[]>,
  reduced: booleanProp,
  avatarCircle: booleanProp,
  signType: String as PropType<LayoutSignType>,
  headerFixed: booleanStringProp,
  asideFixed: booleanStringProp,
  copyright: String,
  links: Array as PropType<LayoutFooterLink[]>,
  colors: Array as PropType<string[]>,
  color: String,
  miniHeaderSign: booleanStringProp,
  verticalLinks: booleanStringProp,
  onReducedChange: eventProp<(target: boolean) => void>(),
  onSignClick: eventProp<(event: MouseEvent) => void>(),
  onMenuSelect: eventProp<(label: string, meta: Record<string, any>) => void>(),
  onUserAction: eventProp<(label: string, meta: Record<string, any>) => void>(),
  onNavChange: eventProp<(type: LayoutSignType) => void>(),
  onColorChange: eventProp<(color: string) => void>()
})

export type LayoutProps = ExtractPropTypes<typeof layoutProps>
export type LayoutCProps = ConfigurableProps<LayoutProps, 'menus'>

export const layoutAsideProps = buildProps({
  tag: String,
  expanded: booleanProp,
  reduced: booleanProp,
  menus: Array as PropType<MenuOptions[]>,
  menuProps: Object as PropType<LayoutMenuProps>,
  logo: String,
  signName: String,
  fixed: booleanStringProp,
  onReducedChange: eventProp<(reduced: boolean) => void>(),
  onExpandedChange: eventProp<(expanded: boolean) => void>(),
  onSignClick: eventProp<(event: MouseEvent) => void>(),
  onMenuSelect: eventProp<(label: string, meta: Record<string, any>) => void>()
})

export type LayoutAsideProps = ExtractPropTypes<typeof layoutAsideProps>
export type LayoutAsideCProps = ConfigurableProps<LayoutAsideProps, 'menus'>

export const layoutHeaderProps = buildProps({
  tag: String,
  logo: String,
  signName: String,
  user: Object as PropType<LayoutUser>,
  userDropped: booleanProp,
  avatarCircle: booleanProp,
  config: Array as PropType<LayoutConfig[]>,
  actions: Array as PropType<LayoutHeaderAction[]>,
  signType: String as PropType<LayoutSignType>,
  colors: Array as PropType<string[]>,
  color: String,
  menus: Object as PropType<MenuOptions[]>,
  menuProps: Object as PropType<LayoutMenuProps>,
  onNavChange: eventProp<(type: LayoutSignType) => void>(),
  onColorChange: eventProp<(color: string) => void>(),
  onUserAction: eventProp<(label: string, meta: Record<string, any>) => void>(),
  onSignClick: eventProp<(event: MouseEvent) => void>(),
  onDropChange: eventProp<(target: boolean) => void>(),
  onReducedChange: eventProp<(reduced: boolean) => void>(),
  onMenuSelect: eventProp<(label: string, meta: Record<string, any>) => void>()
})

export type LayoutHeaderProps = ExtractPropTypes<typeof layoutHeaderProps>
export type LayoutHeaderCProps = ConfigurableProps<LayoutHeaderProps, 'user' | 'menus'>

export const layoutFooterProps = buildProps({
  tag: String,
  copyright: String,
  links: Array as PropType<LayoutFooterLink[]>,
  verticalLinks: booleanStringProp
})

export type LayoutFooterProps = ExtractPropTypes<typeof layoutFooterProps>
export type LayoutFooterCProps = ConfigurableProps<LayoutFooterProps>
