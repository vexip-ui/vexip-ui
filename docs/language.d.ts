import type { I18nConfig } from './i18n/helper'

declare module 'vue-i18n' {
  import { DefineLocaleMessage } from 'vue-i18n'

  export interface DefineLocaleMessage extends I18nConfig {}
}
