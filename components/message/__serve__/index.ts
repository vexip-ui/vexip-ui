import '@/themes/common.scss'

import { createApp } from 'vue'
import { Message } from '..'
import App from './app.vue'

createApp(App).use(Message).mount('#app')
