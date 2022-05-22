import '../style/index.scss'
import '../themes/dark/preset.scss'

import { createApp } from 'vue'
import { install } from '../components'
import App from './app.vue'
import { router } from './router'

createApp(App).use(install).use(router).mount('#app')
