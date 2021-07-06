<template>
  <Button type="primary" @on-click="loading(5, 30)">
    加载5
  </Button>
  <Button type="primary" @on-click="loading(30, 50)">
    加载30
  </Button>
  <Button type="primary" @on-click="loading(50, 95)">
    加载50
  </Button>
  <Button type="primary" @on-click="loading(100, 100)">
    加载100
  </Button>
  <Button type="success" @on-click="loading(100, 100, 'success')">
    加载100成功
  </Button>
  <Button type="error" @on-click="loading(100, 100, 'error')">
    加载100失败
  </Button>
  <Button type="warning" @on-click="loading(100, 100, 'warning')">
    加载100异常
  </Button>
  <Button type="primary" @on-click="destory">
    销毁
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '@/components/button'

import type { LoadingManager } from '..'
import type { LoadingState } from '../symbol'

interface Context {
  $loading: LoadingManager
}

export default defineComponent({
  name: 'App',
  components: {
    Button
  },
  methods: {
    loading(percent: number, maxPercent: number, state: LoadingState = 'default') {
      (this as unknown as Context).$loading.open({
        percent,
        maxPercent,
        state: percent === 100 ? state : 'default'
      })
    },
    destory() {
      (this as unknown as Context).$loading.destroy()
    }
  }
})
</script>
