import { configProp, configLocale } from '@vexip-ui/config'

import type { App } from 'vue'
import type { PropOptions, LocaleOptions } from '@vexip-ui/config'

export interface InstallOptions {
  prefix?: string,
  prop?: Partial<PropOptions>,
  locale?: LocaleOptions
}

export function buildInstall(components: any[] = []) {
  return function install(app: App, options: InstallOptions = {}) {
    const { prefix = '', prop = {}, locale = {} } = options

    configProp(prop)
    configLocale(locale)

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
