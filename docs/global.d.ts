import '../types'

import type { I18nConfig } from './i18n/helper'

declare global {
  declare const __ROLLBACK_LANG__: string
  declare const __VERSION__: string
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}

declare module '*.md' {
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}

declare module 'vue-i18n' {
  import { DefineLocaleMessage } from 'vue-i18n'

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefineLocaleMessage extends I18nConfig {}
}
