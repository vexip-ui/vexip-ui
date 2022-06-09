import { configProps, configLocale } from '@vexip-ui/config'

import type { App } from 'vue'
import type { PropOptions, LocaleOptions } from '@vexip-ui/config'

export interface InstallOptions {
  prefix?: string,
  props?: Partial<PropOptions>,
  locale?: LocaleOptions
}

export function buildInstall(
  components: any[] = [],
  defaultLocale: 'zh-CN' | 'en-US' = 'zh-CN'
) {
  return function install(app: App, options: InstallOptions = {}) {
    debugger
    const { prefix = '', props = {}, locale = { locale: defaultLocale } } = options

    if (!locale.locale) {
      locale.locale = defaultLocale
    }

    configProps(props, app)
    configLocale(locale, app)

    const formatName =
      typeof prefix === 'string' && prefix.charAt(0).match(/[a-z]/)
        ? (name: string) => name.replace(/([A-Z])/g, '-$1').toLowerCase()
        : (name: string) => name

    components.forEach(component => {
      if (typeof component.install === 'function') {
        app.use(component)
      } else {
        app.component(`${prefix || ''}${formatName(component.name)}`, component)

        if (typeof component.installDirective === 'function') {
          component.installDirective(app)
        }
      }
    })
  }
}
