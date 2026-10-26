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
        随便放点东西
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
        随便放点东西
      </div>
    </template>
  </Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ['选项1', '选项2', '选项3']
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
