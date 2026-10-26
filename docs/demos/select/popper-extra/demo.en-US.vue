<template>
  <Select v-model:value="value" :options="options">
    <template #prepend>
      <div
        style="
          width: 100%;
          padding: 4px 16px 8px;
          margin-bottom: 8px;
          border-bottom: var(--vxp-border-light-2);
        "
      >
        Put something here
      </div>
    </template>
    <template #append>
      <div
        style="
          width: 100%;
          padding: 8px 16px 4px;
          margin-top: 8px;
          border-top: var(--vxp-border-light-2);
        "
      >
        Put something here
      </div>
    </template>
  </Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ['Option 1', 'Option 2', 'Option 3']
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
