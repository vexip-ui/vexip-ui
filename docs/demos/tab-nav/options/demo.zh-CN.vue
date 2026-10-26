<template>
  <TabNav v-model:active="active" :options="options"></TabNav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { City } from '@vexip-ui/icons'

import type { TabNavOptions } from 'vexip-ui'

const active = ref('标签页1')
const options: TabNavOptions[] = [
  '标签页1',
  {
    label: '标签页2',
    disabled: true,
  },
  {
    label: '标签页3',
    content: '标签页3',
    icon: City,
  },
]
</script>
