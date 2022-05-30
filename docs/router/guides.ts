export interface GuideConfig {
  name: string,
  cname: string,
  label: string
}

export function getGuideConfig(): GuideConfig[] {
  return [
    { name: 'Introduction', cname: '介绍', label: 'setup' },
    { name: 'Getting Start', cname: '快速上手', label: 'started' },
    { name: 'Global Config', cname: '配置项', label: 'global' },
    { name: 'Style', cname: '样式', label: 'style' }
  ]
}
