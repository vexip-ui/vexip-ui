<template>
  <div style="display: flex">
    <Tag
      v-for="tag in tags"
      :key="tag.key"
      closable
      :type="tag.type"
      @close="removeTag(tag.key)"
    >
      标签
    </Tag>
    <Button
      dashed
      size="small"
      style="height: auto; margin-inline-start: 6px; line-height: 1.5"
      :icon="Plus"
      @click="addTag"
    >
      添加标签
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Plus } from '@vexip-ui/icons'

const types = ['default', 'primary', 'info', 'success', 'error', 'warning'] as const
const tags = ref(types.map((type, index) => ({ key: index, type })))

function addTag() {
  tags.value.push({
    key: tags.value.length ? tags.value[tags.value.length - 1].key + 1 : 0,
    type: types[Math.round(Math.random() * 5)],
  })
}

function removeTag(key: number) {
  const index = tags.value.findIndex(tag => tag.key === key)

  if (~index) {
    tags.value.splice(index, 1)
  }
}
</script>
