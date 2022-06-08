export interface GuideConfig {
  label: string,
  i18n: string
}

export function getGuideConfig(): GuideConfig[] {
  return [
    { label: 'setup', i18n: 'introduction' },
    { label: 'started', i18n: 'gettingStart' },
    { label: 'global', i18n: 'globalConfig' },
    { label: 'style', i18n: 'styleConfig' }
  ]
}
