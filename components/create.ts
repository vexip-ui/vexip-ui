import { computed, unref } from 'vue'

import {
  configIcons,
  configLocale,
  configNamespace,
  configProps,
  configZIndex
} from '@vexip-ui/config'
import { isEmpty, toCapitalCase } from '@vexip-ui/utils'

import type { App, Ref } from 'vue'
import type { IconsOptions, LocaleConfig, LocaleOptions } from '@vexip-ui/config'
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

export function buildInstall(components: any[] = [], defaultLocale?: LocaleConfig) {
  return function install(app: App, options: InstallOptions = {}) {
    const {
      prefix = '',
      namespace = '',
      props = {},
      locale = defaultLocale,
      zIndex,
      icons = {}
    } = options

    const withDefaultLocale = computed(() => {
      return { ...defaultLocale, ...unref(locale) }
    })

    configNamespace(namespace, app)
    configProps(props, app)
    configLocale(withDefaultLocale, app)
    configIcons(icons, app)

    if (typeof unref(zIndex) === 'number') {
      configZIndex(zIndex!, app)
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

/**
 * Provide a props config for under components.
 *
 * @param props props config
 * @param app the app of Vue, will use app.provide if specify
 */
function proxyConfigProps(props: MaybeRef<PropsOptions>, app?: App) {
  !isEmpty(props) && configProps(props, app)
}

/**
 * Provide supported config for under components.
 *
 * @param config supported config
 * @param app the app of Vue, will use app.provide if specify
 */
export function provideConfig(
  config: Omit<InstallOptions, 'prefix' | 'namespace'> = {},
  app?: App
) {
  const { props = {}, locale = {}, zIndex, icons = {} } = config

  proxyConfigProps(props, app)
  !isEmpty(locale) && configLocale(locale, app)
  !isEmpty(icons) && configIcons(icons, app)

  if (typeof unref(zIndex) === 'number') {
    configZIndex(zIndex!, app)
  }
}

export { proxyConfigProps as configProps, configLocale, configZIndex, configIcons }
