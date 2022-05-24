import '../style/index.scss'
import '../themes/dark/preset.scss'

import { createApp } from 'vue'
import { install } from '../components'

if (__THEME__) {
  import('./theme.vue').then(m => {
    createApp(m.default).use(install).mount('#app')
  })
} else {
  Promise.all([import('./router'), import('./app.vue')]).then(([r, m]) => {
    createApp(m.default).use(install).use(r.router).mount('#app')
  })
}
