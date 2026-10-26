import '../style/index.scss'
import '../style/dark/preset.scss'

import { createApp } from 'vue'

const isDark = localStorage.getItem('vexip-docs-theme-prefer-dark')
const isRtl = localStorage.getItem('vexip-docs-direction-prefer-rtl')
const noPadding = localStorage.getItem('vexip-dev-prefer-no-padding')

if (isDark === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark')
}

if (isRtl === 'true') {
  document.documentElement.classList.add('rtl')
  document.documentElement.dir = 'rtl'
} else {
  document.documentElement.dir = 'ltr'
}

if (noPadding !== 'true') {
  document.documentElement.classList.add('padding')
}

if (__THEME__) {
  import('./theme.vue').then(m => {
    createApp(m.default).mount('#app')
  })
} else {
  Promise.all([
    import(`./router/port-${__PORT__}.ts`),
    import('./app.vue'),
    import('../components/confirm'),
    import('../components/contextmenu'),
    import('../components/loading'),
    import('../components/message'),
    import('../components/notice'),
    import('../components/toast'),
  ]).then(
    ([
      { router },
      { default: App },
      { Confirm },
      { Contextmenu },
      { Loading },
      { Message },
      { Notice },
      { Toast },
    ]) => {
      createApp(App)
        .use(router)
        .use(Confirm)
        .use(Contextmenu)
        .use(Loading)
        .use(Message)
        .use(Notice)
        .use(Toast)
        .mount('#app')
    },
  )
}
