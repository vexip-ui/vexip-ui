<template>
  <App v-if="loaded"></App>
  <ThemeSwitch v-if="loaded"></ThemeSwitch>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import App from './App.vue'
import ThemeSwitch from './ThemeSwitch.vue'
import { install } from 'vexip-ui'

const loaded = ref(false)
const instance = getCurrentInstance()

if (instance) {
  instance.appContext.app.use(install)
}

const link = document.createElement('link')

link.rel = 'stylesheet'

if (import.meta.resolve) {
  link.href = import.meta.resolve('vexip-ui/style.css') as any
} else {
  link.href = '__VEXIP_UI_STYLE__'
}

link.onload = () => {
  loaded.value = true
}

document.head.insertBefore(link, document.head.firstChild)
</script>
