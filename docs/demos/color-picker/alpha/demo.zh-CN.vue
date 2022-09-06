<template>
  <ColorPicker v-model:value="color" alpha></ColorPicker>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import type { Color } from 'vexip-ui'

export default defineComponent({
  setup() {
    const color = ref<Color | null>('rgba(51, 154, 240, 0.6)')

    return { color }
  }
})
</script>
