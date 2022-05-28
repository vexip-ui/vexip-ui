import './style/index.scss'

import { createApp } from 'vue'
import prismjs from 'prismjs'
import { install } from 'vexip-ui'
import App from './app.vue'
import { router } from './router'
import Markdown from './common/markdown.vue'

import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords'

;(prismjs as any).manual = false

createApp(App).component('Markdown', Markdown).use(install).use(router).mount('#app')
