import '@vue/repl/style.css'
import '../themes/common.scss'
import '../style/index.scss'

import { createApp } from 'vue'
import App from './app.vue'

// @ts-expect-error Custom window property
window.VUE_DEVTOOLS_CONFIG = {
  defaultSelectedAppId: 'id:repl'
}

createApp(App).mount('#app')
