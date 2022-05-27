<template>
  <VirtualList :items="items" use-bar-track style="height: 200px;">
    <template #default="{ item }">
      <li class="virtual-list__item" :style="{ minHeight: `${item.height}px` }">
        {{ item.value }}
      </li>
    </template>
  </VirtualList>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref(Array.from({ length: 100 }, (_, index) => {
  return {
    id: index,
    value: `选项${index}`,
    height: Math.round(Math.random() * 36 + 36)
  }
}))
</script>

<style>
.virtual-list__item {
  min-height: 36px;
  border-bottom: var(--vxp-border-base);
}
</style>
