<template>
  <ColorPicker v-model:value="color" alpha></ColorPicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { Color } from 'vexip-ui'

const color = ref<Color | null>('rgba(51, 154, 240, 0.6)')
</script>
