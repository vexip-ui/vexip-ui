import { booleanProp, booleanStringProp, buildProps, eventProp, localeProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { MenuOptions } from '@/components/menu'
import type {
  LayoutConfig,
  LayoutFooterLink,
  LayoutHeaderAction,
  LayoutInnerClass,
  LayoutMenuProps,
  LayoutSignType,
  LayoutUser
} from './symbol'

export const layoutProps = buildProps({
  locale: localeProp('layout'),
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
  expanded: booleanProp,
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
  darkMode: booleanProp,
  fixedMain: booleanProp,
  fitWindow: booleanProp,
  innerClasses: Object as PropType<LayoutInnerClass>,
  onExpandedChange: eventProp<(expanded: boolean) => void>(),
  onReducedChange: eventProp<(reduced: boolean) => void>(),
  onSignClick: eventProp<(event: MouseEvent) => void>(),
  onMenuSelect: eventProp<(label: string, meta: any) => void>(),
  onUserAction: eventProp<(label: string, meta: any) => void>(),
  onNavChange: eventProp<(type: LayoutSignType) => void>(),
  onColorChange: eventProp<(color: string) => void>(),
  onToggleTheme: eventProp<(isDark: boolean) => void>(),
  onContentResize: eventProp<() => void>()
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
  signType: String as PropType<LayoutSignType>,
  onExpandedChange: eventProp<(expanded: boolean) => void>(),
  onReducedChange: eventProp<(reduced: boolean) => void>(),
  onSignClick: eventProp<(event: MouseEvent) => void>(),
  onMenuSelect: eventProp<(label: string, meta: any) => void>()
})

export type LayoutAsideProps = ExtractPropTypes<typeof layoutAsideProps>
export type LayoutAsideCProps = ConfigurableProps<LayoutAsideProps, 'menus'>

export const layoutHeaderProps = buildProps({
  locale: localeProp('layout'),
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
  darkMode: booleanProp,
  onNavChange: eventProp<(type: LayoutSignType) => void>(),
  onColorChange: eventProp<(color: string) => void>(),
  onUserAction: eventProp<(label: string, meta: any) => void>(),
  onSignClick: eventProp<(event: MouseEvent) => void>(),
  onDroppedChange: eventProp<(target: boolean) => void>(),
  onExpandedChange: eventProp<(expanded: boolean) => void>(),
  onReducedChange: eventProp<(reduced: boolean) => void>(),
  onMenuSelect: eventProp<(label: string, meta: any) => void>(),
  onToggleTheme: eventProp<(isDark: boolean) => void>()
})

export type LayoutHeaderProps = ExtractPropTypes<typeof layoutHeaderProps>
export type LayoutHeaderCProps = ConfigurableProps<LayoutHeaderProps, 'user' | 'menus'>

export const layoutMainProps = buildProps({
  tag: String,
  fixed: booleanProp
})

export type LayoutMainProps = ExtractPropTypes<typeof layoutMainProps>
export type LayoutMainCProps = ConfigurableProps<LayoutMainProps>

export const layoutFooterProps = buildProps({
  tag: String,
  copyright: String,
  links: Array as PropType<LayoutFooterLink[]>,
  verticalLinks: booleanStringProp
})

export type LayoutFooterProps = ExtractPropTypes<typeof layoutFooterProps>
export type LayoutFooterCProps = ConfigurableProps<LayoutFooterProps>
