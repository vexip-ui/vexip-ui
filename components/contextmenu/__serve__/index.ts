import '@/themes/common.scss'

import { createApp } from 'vue'
import { Contextmenu } from '..'
import App from './app.vue'

createApp(App).use(Contextmenu).mount('#app')
