<template>
  <div>
    <Overflow>
      <div v-for="n in 15" :key="n" class="item">
        元素 {{ n }}
      </div>
      <template #counter="{ count }">
        <div class="item">
          {{ `+${count}` }}
        </div>
      </template>
    </Overflow>
  </div>
</template>

<style scoped>
:deep(.vxp-overflow) {
  max-width: 360px;
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
