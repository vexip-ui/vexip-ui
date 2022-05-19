import Spin from './spin.vue'
import { loading } from './directive'

import type { App } from 'vue'

Spin.installDirective = (app: App) => {
  app.directive('loading', loading)
}

export { Spin, loading }
