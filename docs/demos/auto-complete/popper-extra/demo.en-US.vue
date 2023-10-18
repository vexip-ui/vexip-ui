<template>
  <AutoComplete
    v-model:value="value"
    style="max-width: 400px"
    :options="options"
    @input="setOptions"
  >
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
  </AutoComplete>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ref<string[]>([])

function setOptions(value: string) {
  options.value = value ? [value, value + value, value + value + value] : []
}
</script>
