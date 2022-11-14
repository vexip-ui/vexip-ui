<template>
  <Spin :active="active" tip="Loading...">
    <Alert icon type="warning" title="Alert Title">
      Some content to alert
    </Alert>
  </Spin>
  <p>Switch the loading state: <Switch v-model:value="active"></Switch></p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
</script>
