<template>
  <Tag
    v-for="(type) in tags"
    :key="type"
    :type="type"
    closable
    size="small"
  >
    Tag
  </Tag>
  <br />
  <br />
  <Tag
    v-for="(type) in tags"
    :key="type"
    :type="type"
    closable
    size="default"
  >
    Tag
  </Tag>
  <br />
  <br />
  <Tag
    v-for="(type) in tags"
    :key="type"
    :type="type"
    closable
    size="large"
  >
    Tag
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
