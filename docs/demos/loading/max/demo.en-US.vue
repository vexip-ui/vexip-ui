<template>
  <Button type="primary" @click="doLoading(5, 30)">
    Loading 5-30
  </Button>
  <Button type="primary" @click="doLoading(30, 50)">
    Loading 30-50
  </Button>
  <Button type="primary" @click="doLoading(50, 95)">
    Loading 50-95
  </Button>
  <Button type="primary" @click="doLoading(100, 100)">
    Loading 100
  </Button>
  <Button type="success" @click="doLoading(100, 100, 'success')">
    Loading 100(Success)
  </Button>
  <Button type="error" @click="doLoading(100, 100, 'error')">
    Loading 100(Error)
  </Button>
  <Button type="warning" @click="doLoading(100, 100, 'warning')">
    Loading 100(Warning)
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
