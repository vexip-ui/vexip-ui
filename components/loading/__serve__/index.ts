import '@/themes/common.scss'

import { createApp } from 'vue'
import { Loading } from '..'
import App from './app.vue'

createApp(App).use(Loading).mount('#app')
