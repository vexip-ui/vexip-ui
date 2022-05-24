<template>
  <Select v-model:value="value" prefix="user">
    <Option>选项1</Option>
    <Option>选项2</Option>
    <Option>选项3</Option>
  </Select>
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
