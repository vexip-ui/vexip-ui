import type { IconMinorProps } from '@/components/icon'
import type { MenuMarkerType, MenuGroupType, MenuTheme } from '@/components/menu'
import type { TooltipTheme } from '@/components/tooltip'
export interface AsideMenuProps {
  accordion: boolean,
  markerType: MenuMarkerType,
  groupType: MenuGroupType,
  theme: MenuTheme,
  tooltipTheme: TooltipTheme
}

export interface HeaderUserActions {
  label: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  name?: string,
  disabled?: boolean,
  divided?: boolean,
  meta?: Record<string, any>
}

export interface HeaderUser {
  name: string,
  email?: string,
  avatar?: string | Record<string, any>,
  actions?: HeaderUserActions[]
}
