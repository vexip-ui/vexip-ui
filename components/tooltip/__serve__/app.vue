<template>
  <div style="padding: 60px;">
    <Tooltip>
      <Button> 气泡提示 </Button>
      <template #tip>
        一些提示的内容
      </template>
    </Tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '@/components/button'
import { Tooltip } from '..'

export default defineComponent({
  name: 'App',
  components: {
    Button,
    Tooltip
  },
  data() {
    return {}
  }
})
</script>

<style lang="scss"></style>
