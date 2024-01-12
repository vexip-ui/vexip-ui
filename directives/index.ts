import { vLoading } from './loading'
import { vResize } from './resize'

import type { App } from 'vue'

export function installDirectives(app: App) {
  app.directive('loading', vLoading)
  app.directive('resize', vResize)
}

export * from './loading'
export * from './resize'
