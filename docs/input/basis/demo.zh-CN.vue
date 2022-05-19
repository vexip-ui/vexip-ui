<template>
  <Input
    v-model:value="value"
    placeholder="基础用法"
    style="width: 220px;"
  ></Input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')

    return { value }
  }
})
</script>
