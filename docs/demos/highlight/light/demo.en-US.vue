<template>
  <div style="max-width: 500px; text-indent: 2em">
    <Highlight :content="content" :key-words="keyWords">
      <template #light="{ text }">
        <Linker type="primary">
          {{ text }}
        </Linker>
      </template>
    </Highlight>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const content = ref(
  'A non-negative integer specifying a limit on the number of substrings to be ' +
    'included in the array. If provided, splits the string at each occurrence ' +
    'of the specified separator, but stops when limit entries have been placed in' +
    ' the array. Any leftover text is not included in the array at all.'
)
const keyWords = ref(['the array', 'included', 'separator'])
</script>
