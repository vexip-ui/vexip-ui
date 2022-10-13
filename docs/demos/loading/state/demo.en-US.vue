<template>
  <Button type="primary" :loading="loading" @click="doLoading">
    Loading(Normal)
  </Button>
  <Button type="success" :loading="loading" @click="doLoading('success')">
    Loading(Success)
  </Button>
  <Button type="error" :loading="loading" @click="doLoading('error')">
    Loading(Error)
  </Button>
  <Button type="warning" :loading="loading" @click="doLoading('warning')">
    Loading(Warning)
  </Button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Loading } from 'vexip-ui'

type LoadingState = 'default' | 'success' | 'error' | 'warning'

const loading = ref(false)

let timer: ReturnType<typeof setTimeout>

function doLoading(state: LoadingState = 'default') {
  clearTimeout(timer)

  loading.value = true
  Loading.open(30)

  timer = setTimeout(() => {
    Loading.open({ percent: 100, state })
    loading.value = false
  }, 3000)
}
</script>
