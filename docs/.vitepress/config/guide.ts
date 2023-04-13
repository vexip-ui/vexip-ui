export interface GuideConfig {
  name: string,
  i18n: string
}

export function getGuideConfig(): GuideConfig[] {
  return [
    { name: 'setup', i18n: 'introduction' },
    { name: 'started', i18n: 'gettingStart' },
    { name: 'global', i18n: 'globalConfig' },
    { name: 'style', i18n: 'styleConfig' },
    { name: 'name', i18n: 'nameOrigin' },
    { name: 'logo', i18n: 'logoOrigin' }
  ]
}
