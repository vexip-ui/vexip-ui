<template>
  <Button type="primary" :loading="loading" @click="doLoading">
    加载结束
  </Button>
  <Button type="success" :loading="loading" @click="doLoading('success')">
    加载成功
  </Button>
  <Button type="error" :loading="loading" @click="doLoading('error')">
    加载失败
  </Button>
  <Button type="warning" :loading="loading" @click="doLoading('warning')">
    加载异常
  </Button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Loading } from 'vexip-ui'

type LoadingState = 'default' | 'success' | 'error' | 'warning'

export default defineComponent({
  setup() {
    const loading = ref(false)

    let timer: number

    function doLoading(state: LoadingState = 'default') {
      window.clearTimeout(timer)

      loading.value = true
      Loading.open(30)

      timer = window.setTimeout(() => {
        Loading.open({ percent: 100, state })
        loading.value = false
      }, 3000)
    }

    return { loading, doLoading }
  }
})
</script>
