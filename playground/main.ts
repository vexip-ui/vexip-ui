import '@vue/repl/style.css'
import '../style/index.scss'
import '../style/dark/preset.scss'

import { createApp } from 'vue'

import { install } from 'vexip-ui'
import App from './app.vue'

// @ts-expect-error Custom window property
window.VUE_DEVTOOLS_CONFIG = {
  defaultSelectedAppId: 'repl',
}

createApp(App).use(install).mount('#app')
