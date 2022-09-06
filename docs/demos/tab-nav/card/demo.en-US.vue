<template>
  <TabNav v-model:active="active" card>
    <TabNavItem label="Tab 1">
      Tab 1
    </TabNavItem>
    <TabNavItem label="Tab 2">
      Tab 2
    </TabNavItem>
    <TabNavItem label="Tab 3">
      Tab 3
    </TabNavItem>
  </TabNav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('Tab 1')
</script>
