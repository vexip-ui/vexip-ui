<template>
  <div style="position: relative; width: 400px; padding-top: 60px;">
    <Spin :active="active" inner></Spin>
  </div>
  <div v-loading="{ active, tip: 'Loading...' }">
    <Alert icon type="success" title="警告标题">
      警告提示的内容
    </Alert>
  </div>
  <Spin :active="active" tip="Loading..." delay>
    <Alert icon type="success" title="警告标题">
      警告提示的内容
    </Alert>
  </Spin>
  <Button type="primary" @on-click="active = !active">
    切换
  </Button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Alert } from '@/components/alert'
import { Button } from '@/components/button'
import { Spin } from '..'

import { loading } from '../directive'

export default defineComponent({
  name: 'App',
  components: {
    Alert,
    Button,
    Spin
  },
  directives: {
    loading
  },
  setup() {
    const active = ref(true)

    return {
      active
    }
  }
})
</script>
