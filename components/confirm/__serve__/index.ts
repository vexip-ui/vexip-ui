import '@/themes/common.scss'

import { createApp } from 'vue'
import { Confirm } from '..'
import App from './app.vue'

createApp(App).use(Confirm).mount('#app')
