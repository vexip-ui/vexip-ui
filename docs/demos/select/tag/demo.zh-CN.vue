<template>
  <Select
    v-model:value="values"
    multiple
    clearable
    option-check
    :max-tag-count="3"
    :options="options"
  >
    <template #tag="{ value, option, handleClose }">
      <Tag
        inherit
        class="vxp-select__tag"
        closable
        :type="(option?.data as Option).type"
        @close="handleClose"
      >
        {{ option?.label ?? value }}
      </Tag>
    </template>
    <template #restTag="{ restCount }">
      <Tag inherit class="vxp-select__tag" type="info">
        {{ `+${restCount}` }}
      </Tag>
    </template>
  </Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TagType } from 'vexip-ui'

const values = ref([1, 2, 3, 4])

const tagTypes: TagType[] = ['error', 'magenta', 'primary']

const options = Array.from({ length: 12 }, (_, i) => ({
  label: `选项${i + 1}`,
  value: i + 1,
  type: tagTypes[i % tagTypes.length],
}))

type Option = (typeof options)[0]
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
