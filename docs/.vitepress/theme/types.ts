import type { TagType } from 'vexip-ui'

export interface NavMenuItem extends Record<string, any> {
  key: string,
  link?: string,
  text?: string,
  i18n?: string,
  activeMatch?: string,
  items?: NavMenuItem[]
}

export interface AsideMenuTag {
  text: string,
  type?: TagType
}

export interface AsideMenuItem {
  key: string,
  link?: string,
  text?: string,
  i18n?: string,
  tags?: AsideMenuTag[],
  subtext?: string,
  subI18n?: string,
  noSub?: string[],
  count?: boolean,
  items?: Omit<AsideMenuItem, 'items'>[]
}

export interface EditLink {
  i18n?: string,
  pattern?: string | ((path: string) => string)
}

export interface FooterLink {
  link: string,
  text?: string,
  subtext?: string,
  i18n?: string,
  subI18n?: string
}

export interface FooterLinkGroup {
  text?: string,
  i18n?: string,
  items: FooterLink[]
}

export interface ThemeConfig {
  nav?: NavMenuItem[],
  asideMenus?: Record<string, AsideMenuItem[]>,
  outline?: Record<string, number | number[]>,
  editLink?: EditLink,
  footerLinks?: FooterLinkGroup[]
}
