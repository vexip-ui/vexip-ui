<template>
  <Spin :active="active" tip="Loading..." delay>
    <Alert icon type="info" title="Alert Title">
      Some content of info type Alert
    </Alert>
  </Spin>
  <Spin :active="active" tip="Loading..." :delay="1000">
    <Alert icon type="success" title="Alert Title">
      Some content of success type Alert
    </Alert>
  </Spin>
  <Spin :active="active" tip="Loading..." :delay="[300, 0]">
    <Alert icon type="error" title="Alert Title">
      Some content of error type Alert
    </Alert>
  </Spin>
  <p>Switch the loading state: <Switch v-model:value="active"></Switch></p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
</script>
