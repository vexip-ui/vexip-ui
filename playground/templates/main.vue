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
const app = getCurrentInstance()!.appContext.app

app.use(install)

const link = document.createElement('link')

link.rel = 'stylesheet'
link.href = '/style.css'
link.onload = () => {
  loaded.value = true
}

document.head.insertBefore(link, document.head.firstChild)
</script>
