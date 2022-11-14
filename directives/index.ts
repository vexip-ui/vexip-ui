import { vLoading } from './loading'

import type { App } from 'vue'

export function install(app: App) {
  app.directive('loading', vLoading)
}
