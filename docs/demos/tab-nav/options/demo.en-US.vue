<template>
  <TabNav v-model:active="active" :options="options"></TabNav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { City } from '@vexip-ui/icons'

import type { TabNavOptions } from 'vexip-ui'

const active = ref('Tab 1')
const options: TabNavOptions[] = [
  'Tab 1',
  {
    label: 'Tab 2',
    disabled: true
  },
  {
    label: 'Tab 3',
    content: 'Tab 3',
    icon: City
  }
]
</script>
