<template>
  <Spin :active="active" tip="Loading...">
    <Alert icon type="warning" title="Alert Title">
      Some content to alert
    </Alert>
  </Spin>
  <p>Switch the loading state: <Switch v-model:value="active"></Switch></p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref(true)

    return {
      active
    }
  }
})
</script>
