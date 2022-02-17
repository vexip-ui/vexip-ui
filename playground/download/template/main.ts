import 'vexip-ui/dist/style.css'

import { createApp } from 'vue'
import { install } from 'vexip-ui'
import App from './App.vue'

createApp(App).use(install).mount('#app')
