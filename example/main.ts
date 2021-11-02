import '../themes/common.scss'
import '../style/index.scss'

import { createApp } from 'vue'
import { install } from '../components'
import App from './app.vue'

createApp(App)
  .use(install, {
    button: {
      size: 'large'
    }
  })
  .mount('#app')
