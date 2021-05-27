import '@/themes/common.scss'

import { createApp } from 'vue'
import { Notice } from '..'
import App from './app.vue'

createApp(App).use(Notice).mount('#app')
