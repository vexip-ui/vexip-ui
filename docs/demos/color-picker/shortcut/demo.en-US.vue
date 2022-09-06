<template>
  <ColorPicker v-model:value="color1" shortcut style="margin-right: 25px;"></ColorPicker>
  <ColorPicker v-model:value="color2" shortcut :shortcut-list="shortcuts"></ColorPicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { Color } from 'vexip-ui'

const color1 = ref<Color | null>('#339af0')
const color2 = ref<Color | null>('#339af0')
const shortcuts = [
  '#e7f5ff',
  '#d0ebff',
  '#a5d8ff',
  '#74c0fc',
  '#4dabf7',
  '#339af0',
  '#228be6',
  '#1c7ed6',
  '#1971c2',
  '#1864ab'
]
</script>
