<template>
  <Tag
    v-for="type in states"
    :key="type"
    :type="type"
    closable
  >
    Tag
  </Tag>
  <br />
  <br />
  <Tag
    v-for="type in colors"
    :key="type"
    :type="type"
    closable
  >
    Tag
  </Tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      // state type
      states: [
        'default',
        'primary',
        'info',
        'success',
        'error',
        'warning'
      ] as const,
      // color type
      colors: [
        'lime',
        'pink',
        'magenta',
        'tomato',
        'orange',
        'cyan',
        'navy',
        'gold',
        'purple'
      ] as const
    }
  }
})
</script>
