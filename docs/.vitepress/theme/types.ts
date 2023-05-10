export interface NavMenuItem extends Record<string, any> {
  key: string,
  link: string,
  i18n?: string,
  activeMatch?: string,
  items?: NavMenuItem
}

export interface AsideMenuItem {
  key: string,
  link?: string,
  i18n?: string,
  since?: string,
  origin?: string,
  count?: boolean,
  items?: AsideMenuItem[]
}

export interface EditLink {
  i18n?: string,
  pattern?: string | ((path: string) => string)
}

export interface ThemeConfig {
  nav: NavMenuItem[],
  asideMenus: Record<string, AsideMenuItem[]>,
  outline?: Record<string, number>,
  editLink?: EditLink
}
