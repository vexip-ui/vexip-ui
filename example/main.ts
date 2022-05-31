import '../style/index.scss'
import '../style/dark/preset.scss'

import { createApp } from 'vue'

const isDark = localStorage.getItem('vexip-docs-theme-prefer-dark')

if (isDark === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark')
}

if (__THEME__) {
  import('./theme.vue').then(m => {
    createApp(m.default).mount('#app')
  })
} else {
  Promise.all([import('./router'), import('./app.vue')]).then(([r, m]) => {
    createApp(m.default).use(r.router).mount('#app')
  })
}
