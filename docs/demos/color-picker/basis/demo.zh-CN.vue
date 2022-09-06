<template>
  <ColorPicker v-model:value="color"></ColorPicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { Color } from 'vexip-ui'

const color = ref<Color | null>(null)
</script>
