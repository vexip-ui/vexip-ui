<template>
  <div style="max-width: 500px; text-indent: 2em;">
    <Highlight :content="content" :key-words="keyWords">
      <template #light="{ text }">
        <Linker type="primary">
          {{ text }}
        </Linker>
      </template>
    </Highlight>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const content = ref(
      '一个整数，限定返回的分割片段数量。当提供此参数时，split 方法会在指定分隔符的' +
        '每次出现时分割该字符串，但在限制条目已放入数组时停止。如果在达到指定限制之前' +
        '达到字符串的末尾，它可能仍然包含少于限制的条目。新数组中不返回剩下的文本。'
    )
    const keyWords = ref(['指定分隔符', '达到指定限制', '末尾', '仍然包含'])

    return {
      content,
      keyWords
    }
  }
})
</script>
