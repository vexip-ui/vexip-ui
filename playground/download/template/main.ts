import 'vexip-ui/dist/style.css'

import { createApp } from 'vue'

import App from './App.vue'
import { install } from 'vexip-ui'

createApp(App).use(install).mount('#app')
