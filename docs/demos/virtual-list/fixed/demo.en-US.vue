<template>
  <VirtualList
    :items="items"
    use-bar-track
    item-fixed
    :item-size="36"
    style="height: 200px"
  >
    <template #default="{ item }">
      <li class="virtual-list__item">
        {{ item.value }}
      </li>
    </template>
  </VirtualList>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref(
  Array.from({ length: 10000 }, (_, index) => {
    return {
      id: index,
      value: `Element ${index}`,
    }
  }),
)
</script>

<style scoped>
.virtual-list__item {
  height: 36px;
  border-bottom: var(--vxp-border-base);
}
</style>
