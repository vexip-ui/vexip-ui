export interface GuideConfig {
  name: string,
  i18n: string
}

export interface GuideGroup {
  name: string,
  guides: GuideConfig[]
}

export function getGuideConfig(): GuideGroup[] {
  return [
    {
      name: 'introduction',
      guides: [
        { name: 'vexip-ui', i18n: 'vexipui' },
        { name: 'getting-started', i18n: 'gettingStarted' },
        { name: 'name-origin', i18n: 'nameOrigin' },
        { name: 'logo-origin', i18n: 'logoOrigin' }
      ]
    },
    {
      name: 'further',
      guides: [
        { name: 'global-config', i18n: 'globalConfig' },
        { name: 'style-config', i18n: 'styleConfig' },
        { name: 'i18n', i18n: 'i18n' },
        { name: 'ssr', i18n: 'ssr' }
      ]
    }
  ]
}
