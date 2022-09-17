import { createApp } from './main'

createApp().then(({ app, router }) => {
  router.isReady().then(() => {
    app.mount('#app')
  })
})
