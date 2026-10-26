<template>
  <div>
    <Overflow :items="items" :max-count="3">
      <template #default="{ item }">
        <div class="item">
          Item {{ item.index }}
        </div>
      </template>
      <template #counter="{ count }">
        <div class="item">
          {{ `+${count}` }}
        </div>
      </template>
    </Overflow>
  </div>
</template>

<script setup lang="ts">
const items = Array.from({ length: 15 }, (_, index) => ({ index: index + 1 }))
</script>

<style scoped>
:deep(.vxp-overflow) {
  display: inline-flex;
  width: auto;
  padding: 10px;
  border: var(--vxp-border-base);
  border-radius: var(--vxp-radius-base);
}

.item {
  padding: 4px 10px;
  margin-inline-end: 4px;
  white-space: nowrap;
  border: var(--vxp-border-base);
  border-radius: var(--vxp-radius-base);
}
</style>
