import '@vue/repl/style.css'
import '../style/index.scss'
import '../style/dark/preset.scss'

import { createApp } from 'vue'
import App from './app.vue'
import { install } from 'vexip-ui'

// @ts-expect-error Custom window property
window.VUE_DEVTOOLS_CONFIG = {
  defaultSelectedAppId: 'id:repl'
}

createApp(App).use(install).mount('#app')
