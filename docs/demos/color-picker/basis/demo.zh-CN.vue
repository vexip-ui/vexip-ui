<template>
  <ColorPicker v-model:value="color"></ColorPicker>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import type { Color } from 'vexip-ui/es/color-picker'

export default defineComponent({
  setup() {
    const color = ref<Color | null>(null)

    return { color }
  }
})
</script>
