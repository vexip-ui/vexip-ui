import type { I18nConfig } from './i18n/helper'

declare module 'vue-i18n' {
  import { DefineLocaleMessage } from 'vue-i18n'

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefineLocaleMessage extends I18nConfig {}
}
