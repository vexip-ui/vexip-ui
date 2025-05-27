<template>
  <Pagination :total="200" :page-size="10">
    <template #prev="{ disabled }">
      {{ disabled ? '⛔' : '⬅' }}
    </template>
    <template #next="{ disabled }">
      {{ disabled ? '⛔' : '➡' }}
    </template>
    <template #item="{ page, active }">
      <template v-if="active">
        💓
      </template>
      <span v-else :style="{ color: colors[(page - 1) % colors.length] }">
        {{ page }}
      </span>
    </template>
  </Pagination>
</template>

<script setup lang="ts">
const colors = [
  'var(--vxp-color-primary-base)',
  'var(--vxp-color-info-base)',
  'var(--vxp-color-success-base)',
  'var(--vxp-color-warning-base)',
  'var(--vxp-color-error-base)',
]
</script>
