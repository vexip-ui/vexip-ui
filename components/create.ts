import { computed, unref } from 'vue'
import {
  configNamespace,
  configProps,
  configLocale,
  configZIndex,
  configIcons
} from '@vexip-ui/config'
import { toCapitalCase } from '@vexip-ui/utils'

import type { Ref, App } from 'vue'
import type { LocaleOptions, IconsOptions } from '@vexip-ui/config'
import type { PropsOptions } from './props'

type MaybeRef<T> = T | Ref<T>

export interface InstallOptions {
  prefix?: string,
  namespace?: MaybeRef<string>,
  props?: MaybeRef<PropsOptions>,
  locale?: MaybeRef<LocaleOptions>,
  zIndex?: MaybeRef<number>,
  icons?: MaybeRef<IconsOptions>
}

export function buildInstall(components: any[] = [], defaultLocale?: 'zh-CN' | 'en-US') {
  return function install(app: App, options: InstallOptions = {}) {
    const {
      prefix = '',
      namespace = '',
      props = {},
      locale = { locale: defaultLocale },
      zIndex,
      icons = {}
    } = options

    const withDefaultLocale = computed(() => {
      return { locale: defaultLocale, ...unref(locale) }
    })

    configNamespace(namespace, app)
    configProps(props, app)
    configLocale(withDefaultLocale, app)
    configIcons(icons, app)

    if (typeof zIndex === 'number') {
      configZIndex(zIndex, app)
    }

    const normalizedPrefix = toCapitalCase(prefix || '')

    components.forEach(component => {
      if (typeof component === 'function' || typeof component.install === 'function') {
        app.use(component)
      } else {
        app.component(`${normalizedPrefix}${component.name}`, component)
      }
    })
  }
}
