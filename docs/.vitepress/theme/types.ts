export interface NavMenuItem extends Record<string, any> {
  key: string,
  link: string,
  i18n?: string,
  activeMatch?: string
}

export type AsideMenuItem = {
  key: string,
  link?: string,
  i18n?: string,
  since?: string,
  origin?: string,
  count?: boolean,
  items: AsideMenuItem[]
}
