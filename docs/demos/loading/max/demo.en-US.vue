<template>
  <Button type="primary" @click="doLoading(5, 30)">
    加载5-30
  </Button>
  <Button type="primary" @click="doLoading(30, 50)">
    加载30-50
  </Button>
  <Button type="primary" @click="doLoading(50, 95)">
    加载50-95
  </Button>
  <Button type="primary" @click="doLoading(100, 100)">
    加载100
  </Button>
  <Button type="success" @click="doLoading(100, 100, 'success')">
    加载100成功
  </Button>
  <Button type="error" @click="doLoading(100, 100, 'error')">
    加载100失败
  </Button>
  <Button type="warning" @click="doLoading(100, 100, 'warning')">
    加载100异常
  </Button>
</template>

<script setup lang="ts">
import { Loading } from 'vexip-ui'

type LoadingState = 'default' | 'success' | 'error' | 'warning'

function doLoading(percent: number, maxPercent: number, state: LoadingState = 'default') {
  Loading.open({
    percent,
    maxPercent,
    state: percent === 100 ? state : 'default'
  })
}
</script>
