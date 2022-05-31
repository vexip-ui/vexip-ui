<template>
  <Tag
    v-for="type in tags"
    :key="type"
    :type="type"
    simple
    closable
  >
    标签
  </Tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      tags: ['default', 'info', 'primary', 'success', 'error', 'warning'] as const
    }
  }
})
</script>
